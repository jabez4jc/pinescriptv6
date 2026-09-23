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

Function sets the maximum number of bars that is available for historical reference of a given built-in or user variable. When operator '[]' is applied to a variable - it is a reference to a historical value of that variable.

If an argument of an operator '[]' is a compile time constant value (e.g. 'v[10]', 'close[500]') then there is no need to use 'max_bars_back' function for that variable. Pine Script® compiler will use that constant value as history buffer size.

If an argument of an operator '[]' is a value, calculated at runtime (e.g. 'v[i]' where 'i' - is a series variable) then Pine Script® attempts to autodetect the history buffer size at runtime. Sometimes it fails and the script crashes at runtime because it eventually refers to historical values that are out of the buffer. In that case you should use 'max_bars_back' to fix that problem manually.

```pine
max_bars_back(var, num) → void
```

**Arguments**

- `var` (series int/float/bool/color/label/line): Series variable identifier for which history buffer should be resized. Possible values are: 'open', 'high', 'low', 'close', 'volume', 'time', or any user defined variable id.
- `num` (const int): History buffer size which is the number of bars that could be referenced for variable 'var'.

**Returns:** void

**Remarks**

At the moment 'max_bars_back' cannot be applied to built-ins like 'hl2', 'hlc3', 'ohlc4'. Please use multiple 'max_bars_back' calls as workaround here (e.g. instead of a single ‘max_bars_back(hl2, 100)’ call you should call the function twice: ‘max_bars_back(high, 100), max_bars_back(low, 100)’).

If the `indicator()` or `strategy()` 'max_bars_back' parameter is used, all variables in the indicator are affected. This may result in excessive memory usage and cause runtime problems. When possible (i.e. when the cause is a variable rather than a function), please use the `max_bars_back()` function instead.

```pine
//@version=6
indicator("max_bars_back")
close_() => close
depth() => 400
d = depth()
v = close_()
max_bars_back(v, 500)
out = if bar_index > 0
	v[d]
else
	v
plot(out)
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
