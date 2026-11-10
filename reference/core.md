# Core built-ins (indicator, library, alert, alertcondition, na, nz, fixnan, casts, ...)

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### na

A keyword signifying "not available", indicating that a variable has no assigned value.

Type: `simple na`

**Remarks**

Do not use this variable with [comparison operators](../language/operators.md#comparison-operators) to test values for `na`, as it might lead to unexpected behavior. Instead, use the `na()` function. Note that `na` can be used to initialize variables when the initialization statement also specifies the variable's type.

```pine
//@version=6
indicator("na")
// CORRECT
// Plot no value when on bars zero to nine. Plot `close` on other bars.
plot(bar_index < 10 ? na : close)
// CORRECT ALTERNATIVE
// Initialize `a` to `na`. Reassign `close` to `a` on bars 10 and later.
float a = na
if bar_index >= 10
	a := close
plot(a)

// INCORRECT
// Trying to test the preceding bar's `close` for `na`.
// The next line, if uncommented, will cause a compilation error, because direct comparison with `na` is not allowed.
// plot(close[1] == na ? close : close[1])
// CORRECT
// Use the `na()` function to test for `na`.
plot(na(close[1]) ? close : close[1])
// CORRECT ALTERNATIVE
// `nz()` tests `close[1]` for `na`. It returns `close[1]` if it is not `na`, and `close` if it is.
plot(nz(close[1], close))
```

**See also:** `na()`, `nz()`, `fixnan()`

## Functions

### alert()

Creates an alert trigger for an indicator or strategy, with a specified frequency, when called on the latest realtime bar. To activate alerts for a script containing calls to this function, open the "Create Alert" dialog box, then select the script name and "Any alert() function call" in the "Condition" section.

```pine
alert(message, freq) → void
```

**Arguments**

- `message` (series string): The message to send when the alert occurs.
- `freq` (input string, optional): Optional. Determines the allowed frequency of the alert trigger. Possible values are: `alert.freq_all` (allows an alert on any realtime update), `alert.freq_once_per_bar` (allows an alert only on the first execution for each realtime bar), or `alert.freq_once_per_bar_close` (allows an alert only when a realtime bar closes). The default is `alert.freq_once_per_bar`.

**Remarks**

The `alert()` function does not display information on the chart.

In contrast to `alertcondition()`, calls to this function do not count toward a script's plot count. Additionally, `alert()` calls are allowed in local scopes, including the scopes of exported library functions.

See [this article](https://www.tradingview.com/chart/?solution=43000597494) in our Help Center to learn more about activating alerts from `alert()` calls.

```pine
//@version=6
indicator("`alert()` example", "", true)
ma = ta.sma(close, 14)
xUp = ta.crossover(close, ma)
if xUp
    // Trigger the alert the first time a cross occurs during the real-time bar.
    alert("Price (" + str.tostring(close) + ") crossed over MA (" + str.tostring(ma) + ").", alert.freq_once_per_bar)
plot(ma)
plotchar(xUp, "xUp", "▲", location.top, size = size.tiny)
```

**See also:** `alertcondition()`

### alertcondition()

Creates alert condition, that is available in Create Alert dialog. Please note, that `alertcondition()` does NOT create an alert, it just gives you more options in Create Alert dialog. Also, `alertcondition()` effect is invisible on chart.

```pine
alertcondition(condition, title, message) → void
```

**Arguments**

- `condition` (series bool): Series of boolean values that is used for alert. True values mean alert fire, false - no alert. Required argument.
- `title` (const string, optional): Title of the alert condition. Optional argument.
- `message` (const string, optional): Message to display when alert fires. Optional argument.

**Remarks**

Please note that an alertcondition call generates an additional plot. All such calls are taken into account when we calculate the number of the output series per script.

```pine
//@version=6
indicator("alertcondition", overlay=true)
alertcondition(close >= open, title='Alert on Green Bar', message='Green Bar!')
```

**See also:** `alert()`

### bool()

Converts the `x` value to a `bool` value. Returns `false` if `x` is `na`, `false`, or an `int`/`float` value equal to 0. Returns `true` for all other possible values.

```pine
bool(x) → const bool
bool(x) → input bool
bool(x) → simple bool
bool(x) → series bool
```

**Arguments**

- `x` (simple int/float/bool | input bool | simple bool | series int/float/bool): The value to convert to the specified type, usually `na`.

**Returns:** The value of the argument after casting to bool.

**See also:** `float()`, `int()`, `color()`, `string()`, `line()`, `label()`

### fixnan()

For a given series replaces NaN values with previous nearest non-NaN value.

```pine
fixnan(source) → series float
fixnan(source) → series int
fixnan(source) → series color
```

**Arguments**

- `source` (series int/float | series int | series color): Source used for the calculation.

**Returns:** Series without na gaps.

**See also:** `na()`, `na`, `nz()`

### float()

Casts na to float

```pine
float(x) → const float
float(x) → input float
float(x) → simple float
float(x) → series float
```

**Arguments**

- `x` (const int/float | input int/float | simple int/float | series int/float): The value to convert to the specified type, usually `na`.

**Returns:** The value of the argument after casting to float.

**See also:** `int()`, `bool()`, `color()`, `string()`, `line()`, `label()`

### indicator()

A declaration statement that identifies the script as an indicator and sets specific script-wide properties.

```pine
indicator(title, shorttitle, overlay, format, precision, scale, max_bars_back, timeframe, timeframe_gaps, explicit_plot_zorder, max_lines_count, max_labels_count, max_boxes_count, calc_bars_count, max_polylines_count, dynamic_requests, behind_chart) → void
```

**Arguments**

- `title` (const string): A string representing the script's title. The script displays the string's text in all possible locations if the declaration statement does not include a `shorttitle` argument. Additionally, the "Publish script" window uses the text as the default title for a [script publication](../writing_scripts/publishing.md).
- `shorttitle` (const string, optional): Optional. A string representing the script's display name on charts. If specified and not an empty string, the value's text replaces the `title` string in most chart locations, including the "Settings" window, the script's status line, the Data Window, and the "Create alert" dialog box. Otherwise, the `title` string appears as the script's title in all locations. The default is an empty string.
- `overlay` (const bool, optional): Optional. If `true`, the script's visuals appear on the main chart pane if the user adds it to the chart directly, or in another script's pane if the user applies it to that script. If `false`, the script's visuals appear in a separate pane. However, if a function call that creates [visuals](../visuals/overview.md) includes `force_overlay = true`, its output always appears on the main chart pane, even if the script occupies a separate pane. Changes to this argument apply only after the user adds the script to the chart again. Additionally, if the user moves the script to another pane by selecting a "Move to" option in the script's "More" menu, the script does not move back to its original pane after any updates to the source code. The default is `false`.
- `format` (const string, optional): Optional. Specifies the format of the script's plotted values. Possible values are `format.inherit`, `format.price`, `format.volume`, and `format.percent`. The default is `format.inherit`.
- `precision` (const int, optional): Optional. Specifies the number of fractional digits that the script shows for plotted numbers. The value must be an integer from 0 to 16. If specified and the `format` argument is `format.inherit`, the script uses `format.price` as the formatting option instead. If the `format` argument is {format.volume}, the script ignores the `precision` value, because the decimal precision rules specified by `format.volume` supersede other precision settings. By default, the script inherits the precision settings of the chart.
- `scale` (const scale_type, optional): Optional. Determines the location of the script's price scale and the scaling behavior of the script's visuals. Possible values are `scale.right`, `scale.left`, and `scale.none`. If specified and the script overlays on the main chart pane or another script's pane, the script scales its visuals independently to fit the pane's visual space. If the script occupies the same pane as the main chart or another script, `scale.right` or `scale.left` adds a separate price scale for the script to the left or right side of that pane. If the script occupies a separate pane, either argument positions the price scale for that pane on the left or right side without adding a new scale. If the argument is `scale.none`, which is valid only if the `overlay` argument is `true`, the script displays plotted numbers directly on the scale of the existing pane, or displays values on a new price scale if the user moves it to a new pane. Changes to the argument apply only after the user adds the script to the chart again. If not specified, the script uses the main price scale for the pane it occupies, and it does not scale its visuals separately if it overlays on an existing pane.
- `max_bars_back` (const int, optional): Optional. Sets the minimum length of all the script's historical buffers, which determine the number of bars back that the script can reference for each series using the [[]](#op_[]) operator or the functions that retrieve history internally. The value must be an integer from 0 to 5000. By default, Pine's runtime system automatically calculates appropriate historical buffer sizes for each series while loading a script. Manually setting buffer sizes is necessary only in rare cases where automatic size detection fails. See the [Historical buffers](../language/execution_model.md#historical-buffers) section of our User Manual for advanced details.
- `timeframe` (const string, optional): Optional. A valid [timeframe string](../concepts/timeframes.md#timeframe-string-specifications) that determines the main timeframe the script uses for its calculations. If specified, the script automatically adds a "Timeframe" input to the "Settings/Inputs" tab. The input's displayed default in the tab represents the same timeframe as the specified argument. If the value is an empty string or not specified, the script uses the same timeframe as the chart. An argument is allowed for this parameter only if the script does not use [drawing types](../language/type_system.md#drawing-types) or `alert()` function calls.
- `timeframe_gaps` (const bool, optional): Optional. Controls how the script displays plotted values if the `timeframe` value represents a higher timeframe than the chart's timeframe. An argument for this parameter is allowed only if the call includes a `timeframe` argument. If specified, the script adds a "Wait for timeframe closes" input, where users can change the setting, below the generated "Timeframe" input in the "Settings/Inputs" tab. If `true`, the indicator displays values only on the chart bars where new higher-timeframe data is available, and `na` on all other bars. If `false`, the indicator displays the last retrieved values on all chart bars where new data is not available. The default is `true`.
- `explicit_plot_zorder` (const bool, optional): Optional. Specifies which rules the script uses to determine the visual order of plots from `plot*()` calls, levels from `hline()` calls, and fills from `fill()` calls on the chart. If `true`, the indicator displays these visuals in the order of their function calls in the code. If `false`, the script uses the default [z-index](../visuals/overview.md#z-index) rules to determine the order of the visuals. The default is `false`.
- `max_lines_count` (const int, optional): Optional. Determines the maximum number of `line` objects that remain available to the script. The system automatically deletes the oldest `line` objects when the number of lines exceeds the limit. The limit specified by the argument is approximate; the script might display more drawings than specified. The default is ~50 lines.
- `max_labels_count` (const int, optional): Optional. Determines the maximum number of `label` objects that remain available to the script. The system automatically deletes the oldest `label` objects when the number of labels exceeds the limit. The limit specified by the argument is approximate; the script might display more drawings than specified. The default is ~50 labels.
- `max_boxes_count` (const int, optional): Optional. Determines the maximum number of `box` objects that remain available to the script. The system automatically deletes the oldest `box` objects when the number of boxes exceeds the limit. The limit specified by the argument is approximate; the script might display more drawings than specified. The default is ~50 boxes.
- `calc_bars_count` (const int, optional): Optional. Determines how many of the most recent historical bars are available to the script. If specified, the script automatically adds a "Calculated bars" input to the "Settings/Inputs" tab. If the value is positive and less than the number of historical bars in the dataset, the script starts its calculations that number of bars before the most recent bar. If the value is 0, the script's calculations start on the dataset's first bar. The default is 0.
- `max_polylines_count` (const int, optional): Optional. Determines the maximum number of `polyline` objects that remain available to the script. The system automatically deletes the oldest `polyline` objects when the number of polylines exceeds the limit. The limit specified by the argument is approximate; the script might display more drawings than specified. The default is ~50 polylines.
- `dynamic_requests` (const bool, optional): Optional. Specifies whether the script can use dynamic `request.*()` function calls. Dynamic `request.*()` calls are allowed within the local scopes of conditional structures (e.g., `if`), loops (e.g., `for`), and exported functions. Additionally, such calls allow "series" arguments for several parameters that otherwise require values with "simple" or weaker qualifiers. See the [Dynamic requests](../concepts/other_timeframes_and_data.md#dynamic-requests) section of our User Manual for more information. The default is `true`.
- `behind_chart` (const bool, optional): Optional. Controls whether all plots and drawings appear behind the chart display (if `true`) or in front of it (if `false`). This parameter takes effect only when the `overlay` argument is `true`. Changes to the argument apply only after the user adds the script to the chart again. The default is `true`.

**Remarks**

Every indicator script must include exactly one `indicator()` statement in the code.

```pine
//@version=6
indicator("My script", shorttitle="Script")
plot(close)
```

**See also:** `strategy()`, `library()`

### int()

Casts na or truncates float value to int

```pine
int(x) → simple int
int(x) → input int
int(x) → const int
int(x) → series int
```

**Arguments**

- `x` (simple int/float | input int/float | const int/float | series int/float): The value to convert to the specified type, usually `na`.

**Returns:** The value of the argument after casting to int.

**See also:** `float()`, `bool()`, `color()`, `string()`, `line()`, `label()`

### library()

Declaration statement identifying a script as a [library](../concepts/libraries.md).

```pine
library(title, overlay, dynamic_requests) → void
```

**Arguments**

- `title` (const string): The title of the library and its identifier. It cannot contain spaces, special characters or begin with a digit. It is used as the publication's default title, and to uniquely identify the library in the `import` statement, when another script uses it. It is also used as the script's name on the chart.
- `overlay` (const bool, optional): If `true`, the script's visuals appear on the main chart pane if the user adds it to the chart directly, or in another script's pane if the user applies it to that script. If `false`, the script's visuals appear in a separate pane. Changes to the `overlay` value apply only after the user adds the script to the chart again. Additionally, if the user moves the script to another pane by selecting a "Move to" option in the script's "More" menu, it does not move back to its original pane after any updates to the source code. The default is `false`.  Strategy-specific labels that display entries and exits will be displayed over the main chart regardless of this setting.
- `dynamic_requests` (const bool, optional): Specifies whether the script can dynamically call functions from the `request.*()` namespace. Dynamic `request.*()` calls are allowed within the local scopes of conditional structures (e.g., `if`), loops (e.g., `for`), and exported functions. Additionally, such calls allow "series" arguments for many of their parameters. Optional. The default is `true`. See the User Manual's [Dynamic requests](../concepts/other_timeframes_and_data.md#dynamic-requests) section for more information.

```pine
//@version=6
// @description Math library
library("num_methods", overlay = true)
// Calculate "sinh()" from the float parameter `x`
export sinh(float x) =>
	(math.exp(x) - math.exp(-x)) / 2.0
plot(sinh(0))
```

**See also:** `indicator()`, `strategy()`

### max_bars_back()

Explicitly sets the minimum length of the [historical buffer](../language/execution_model.md#historical-buffers) for a built-in or user-defined variable. The historical buffer determines the maximum span of past values that the script can access from the variable's series by using the [[]](#op_[]) history-referencing operator or functions that reference past values internally.

By default, the runtime system automatically sizes the buffer for each series based on the script's references to past values across historical bars. It sets an initial buffer size based on the historical references across early bars of the dataset. If the references on later historical bars exceed the initial buffer's limit, the system restarts the script and increases the buffer size to accommodate those references. In the rare case that it fails to find an appropriate buffer size after restarting the script several times, it raises a runtime error.

This automatic sizing process applies only while the script loads on historical bars. The system does not continue to resize buffers on realtime bars. If a historical reference on a realtime bar exceeds the buffer's limit, the same runtime error occurs.

Therefore, this function is useful if the system cannot determine an appropriate buffer size for a series after several attempts on historical bars, or if the script references a larger depth of past values on realtime bars. Using it in other cases is typically unnecessary. Refer to the [RE10143 error page](../errors/RE10143.md#the-requested-historical-offset-x-is-beyond-the-historical-buffers-limit-y) in our User Manual to learn more about buffer sizing and how to use this function effectively.

```pine
max_bars_back(var, num) → void
```

**Arguments**

- `var` (any type that is compatible with the `[]` operator): The variable for which to set the buffer size. The parameter accepts most built-in and user-defined variables whose history can be referenced by the [[]](#op_[]) operator.
- `num` (const int): Specifies the maximum number of past values that the buffer stores for the variable. The largest possible argument is 5000.

**Returns:** void

**Remarks**

When using this function or other manual buffer-sizing techniques, specify the smallest possible buffer size that accommodates the required historical references. Avoid using a size that is too small or too large. Using a larger buffer size than necessary can significantly increase a script's memory use. In some cases, excessive buffers can even cause a script to [exceed its memory limits](../errors/RE10139.md#memory-limits-exceeded).

The `indicator()` and `strategy()` functions also include a `max_bars_back` parameter, which sets the default buffer size for every series in a script if it has a specified argument. This parameter offers a more concise way to manually size historical buffers. However, setting each buffer to the same size can substantially increase memory use. Therefore, unless most or all series in a script actually require buffers of the same size, using the `max_bars_back()` function to set the sizes for only the specific buffers that require manual sizing is typically more optimal.

This function cannot set the buffer sizes for some built-in variables that are derived from other built-ins (`hl2`, `hlc3`, etc.). To work around this limitation, use this function to set the buffers for the underlying series instead. For example, rather than directly using `hl2` in a single `max_bars_back()` call, use two separate calls with `high` and `low` as `var` arguments.

```pine
//@version=6
indicator("`max_bars_back()` demo")

if barstate.isrealtime
    //@variable References an array of chart points for the polyline.
    var array<chart.point> points = array.new<chart.point>()
    //@variable Stores the ID of a `polyline` object.
    var polyline p = na

    // Clear all chart points in the array and delete the existing polyline.
    points.clear()
    polyline.delete(p)

    // Populate the array with new points. Each point shows the change in `close` values over a specific length.
    for i = 1 to 500
        chart.point point = chart.point.from_index(bar_index - i + 1, close - close[i])
        points.push(point)
    // Create a new polyline with the new points and assign its ID to `p`.
    p := polyline.new(points)

//#region
// The two calls below enable the script to run. If either is removed, the script causes an error,
// because it performs all historical references on realtime bars -- where the system cannot size buffers automatically.

// This call sets the `close` buffer to contain 500 past values (the maximum amount that the script requires).
max_bars_back(close, 500)

// This call sets the `time` buffer to also contain 500 past values.
// Although the script does not explicitly use `time` in its calculations, drawing calculations convert bar indices
// to `time` values internally.
max_bars_back(time, 500)
//#endregion
```

**See also:** Param 'max_bars_back' of `indicator()` and `strategy()` functions.

### na()

Tests if `x` is `na`.

```pine
na(x) → simple bool
na(x) → series bool
```

**Arguments**

- `x` (simple int/float | series int/float/color/string/label/line/box/table/linefill/polyline/array<>/matrix<>/map<>): Value to be tested.

**Returns:** Returns `true` if `x` is `na`, `false` otherwise.

```pine
//@version=6
indicator("na")
// Use the `na()` function to test for `na`.
plot(na(close[1]) ? close : close[1])
// ALTERNATIVE
// `nz()` also tests `close[1]` for `na`. It returns `close[1]` if it is not `na`, and `close` if it is.
plot(nz(close[1], close))
```

**See also:** `na`, `fixnan()`, `nz()`

### nz()

Replaces `na` (undefined) values with either a type-specific default value or a specified replacement.

```pine
nz(source, replacement) → simple int
nz(source, replacement) → simple float
nz(source, replacement) → simple color
nz(source, replacement) → series int
nz(source, replacement) → series float
nz(source, replacement) → series color
```

**Arguments**

- `source` (simple int | simple int/float | simple color | series int | series int/float | series color): The source series to process.
- `replacement` (simple int | simple int/float | simple color | series int | series int/float | series color): Optional. The value the function uses to replace `na` values in the `source` series. The default depends on the `source` type: `0` for "int", `0.0` for "float", or `#00000000` for "color".

**Returns:** The value of `source` if it is not `na`. If the value of `source` is `na`, returns zero, or the `replacement` argument when one is used.

```pine
//@version=6
indicator("nz", overlay=true)
plot(nz(ta.sma(close, 100)))
```

**See also:** `na`, `na()`, `fixnan()`

### string()

Casts na to string

```pine
string(x) → const string
string(x) → input string
string(x) → simple string
string(x) → series string
```

**Arguments**

- `x` (const string | input string | simple string | series string): The value to convert to the specified type, usually `na`.

**Returns:** The value of the argument after casting to string.

**See also:** `float()`, `int()`, `bool()`, `color()`, `line()`, `label()`
