# `input.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Functions

### input()

Adds an input to the Inputs tab of your script's Settings, which allows you to provide configuration options to script users. This function automatically detects the type of the argument used for 'defval' and uses the corresponding input widget.

```pine
input(defval, title, tooltip, inline, group, display, active) → input bool
input(defval, title, tooltip, inline, group, display, active) → input color
input(defval, title, tooltip, inline, group, display, active) → input int
input(defval, title, tooltip, inline, group, display, active) → input float
input(defval, title, tooltip, inline, group, display, active) → input string
input(defval, title, inline, group, tooltip, display, active) → series float
```

**Arguments**

- `defval` (const int/float/bool/string/color or source-type built-ins): Determines the default value of the input variable proposed in the script's "Settings/Inputs" tab, from where script users can change it. Source-type built-ins are built-in series float variables that specify the source of the calculation: `close`, `hlc3`, etc.
- `title` (const string, optional): Title of the input. If not specified, the variable name is used as the input's title. If the title is specified, but it is empty, the name will be an empty string.
- `tooltip` (const string, optional): The string that will be shown to the user when hovering over the tooltip icon.
- `inline` (const string, optional): Combines all the input calls using the same argument in one line. The string used as an argument is not displayed. It is only used to identify inputs belonging to the same line.
- `group` (const string, optional): Creates a header above all inputs using the same group argument string. The string is also used as the header's text.
- `display` (const plot_display, optional): Controls where the script will display the input's information, aside from within the script's settings. This option allows one to remove a specific input from the script's status line or the Data Window to ensure only the most necessary inputs are displayed there. Possible values: `display.none`, `display.data_window`, `display.status_line`, `display.all`. Optional. The default depends on the type of the value passed to `defval`: `display.none` for `bool` and `color` values, `display.all` for everything else.
- `active` (input bool, optional): Optional. Specifies whether users can change the value of the input in the script's "Settings/Inputs" tab. The script can use this parameter to set the state of the input based on the values of other inputs. If `true`, users can change the value of the input. If `false`, the input is grayed out, and users cannot change the value. The default is `true`.

**Returns:** Value of input variable.

**Remarks**

Result of `input()` function always should be assigned to a variable, see examples above.

```pine
//@version=6
indicator("input", overlay=true)
i_switch = input(true, "On/Off")
plot(i_switch ? open : na)

i_len = input(7, "Length")
i_src = input(close, "Source")
plot(ta.sma(i_src, i_len))

i_border = input(142.50, "Price Border")
hline(i_border)
bgcolor(close > i_border ? color.green : color.red)

i_col = input(color.red, "Plot Color")
plot(close, color=i_col)

i_text = input("Hello!", "Message")
l = label.new(bar_index, high, text=i_text)
label.delete(l[1])
```

**See also:** `input.bool()`, `input.color()`, `input.int()`, `input.float()`, `input.string()`, `input.symbol()`, `input.timeframe()`, `input.text_area()`, `input.session()`, `input.source()`, `input.time()`

### input.bool()

Adds an input to the Inputs tab of your script's Settings, which allows you to provide configuration options to script users. This function adds a checkmark to the script's inputs.

```pine
input.bool(defval, title, tooltip, inline, group, confirm, display, active) → input bool
```

**Arguments**

- `defval` (const bool): Determines the default value of the input variable proposed in the script's "Settings/Inputs" tab, from where the user can change it.
- `title` (const string, optional): Title of the input. If not specified, the variable name is used as the input's title. If the title is specified, but it is empty, the name will be an empty string.
- `tooltip` (const string, optional): The string that will be shown to the user when hovering over the tooltip icon.
- `inline` (const string, optional): Combines all the input calls using the same argument in one line. The string used as an argument is not displayed. It is only used to identify inputs belonging to the same line.
- `group` (const string, optional): Creates a header above all inputs using the same group argument string. The string is also used as the header's text.
- `confirm` (const bool, optional): If true, then user will be asked to confirm input value before indicator is added to chart. Default value is false.
- `display` (const plot_display, optional): Controls where the script will display the input's information, aside from within the script's settings. This option allows one to remove a specific input from the script's status line or the Data Window to ensure only the most necessary inputs are displayed there. Possible values: `display.none`, `display.data_window`, `display.status_line`, `display.all`. Optional. The default is `display.none`.
- `active` (input bool, optional): Optional. Specifies whether users can change the value of the input in the script's "Settings/Inputs" tab. The script can use this parameter to set the state of the input based on the values of other inputs. If `true`, users can change the value of the input. If `false`, the input is grayed out, and users cannot change the value. The default is `true`.

**Returns:** Value of input variable.

**Remarks**

Result of `input.bool()` function always should be assigned to a variable, see examples above.

```pine
//@version=6
indicator("input.bool", overlay=true)
i_switch = input.bool(true, "On/Off")
plot(i_switch ? open : na)
```

**See also:** `input.int()`, `input.float()`, `input.string()`, `input.text_area()`, `input.symbol()`, `input.timeframe()`, `input.session()`, `input.source()`, `input.color()`, `input.time()`, `input()`

### input.color()

Adds an input to the Inputs tab of your script's Settings, which allows you to provide configuration options to script users. This function adds a color picker that allows the user to select a color and transparency, either from a palette or a hex value.

```pine
input.color(defval, title, tooltip, inline, group, confirm, display, active) → input color
```

**Arguments**

- `defval` (const color): Determines the default value of the input variable proposed in the script's "Settings/Inputs" tab, from where the user can change it.
- `title` (const string, optional): Title of the input. If not specified, the variable name is used as the input's title. If the title is specified, but it is empty, the name will be an empty string.
- `tooltip` (const string, optional): The string that will be shown to the user when hovering over the tooltip icon.
- `inline` (const string, optional): Combines all the input calls using the same argument in one line. The string used as an argument is not displayed. It is only used to identify inputs belonging to the same line.
- `group` (const string, optional): Creates a header above all inputs using the same group argument string. The string is also used as the header's text.
- `confirm` (const bool, optional): If true, then user will be asked to confirm input value before indicator is added to chart. Default value is false.
- `display` (const plot_display, optional): Controls where the script will display the input's information, aside from within the script's settings. This option allows one to remove a specific input from the script's status line or the Data Window to ensure only the most necessary inputs are displayed there. Possible values: `display.none`, `display.data_window`, `display.status_line`, `display.all`. Optional. The default is `display.none`.
- `active` (input bool, optional): Optional. Specifies whether users can change the value of the input in the script's "Settings/Inputs" tab. The script can use this parameter to set the state of the input based on the values of other inputs. If `true`, users can change the value of the input. If `false`, the input is grayed out, and users cannot change the value. The default is `true`.

**Returns:** Value of input variable.

**Remarks**

Result of `input.color()` function always should be assigned to a variable, see examples above.

```pine
//@version=6
indicator("input.color", overlay=true)
i_col = input.color(color.red, "Plot Color")
plot(close, color=i_col)
```

**See also:** `input.bool()`, `input.int()`, `input.float()`, `input.string()`, `input.text_area()`, `input.symbol()`, `input.timeframe()`, `input.session()`, `input.source()`, `input.time()`, `input()`

### input.enum()

Adds an input to the Inputs tab of your script's Settings, which allows you to provide configuration options to script users. This function adds a dropdown with options based on the `enum` fields passed to its `defval` and `options` parameters.

The text for each option in the resulting dropdown corresponds to the titles of the included fields. If a field's title is not specified in the enum declaration, its title is the string representation of its name.

```pine
input.enum(defval, title, options, tooltip, inline, group, confirm, display, active) → input enum
```

**Arguments**

- `defval` (const enum): Determines the default value of the input, which users can change in the script's "Settings/Inputs" tab. When the `options` parameter has a specified tuple of enum fields, the tuple must include the `defval`.
- `title` (const string, optional): Title of the input. If not specified, the variable name is used as the input's title. If the title is specified, but it is empty, the name will be an empty string.
- `options` (tuple of enum fields: [enumName.field1, enumName.field2, ...], optional): A list of options to choose from. Optional. By default, the titles of all of the enum's fields are available in the dropdown. Passing a tuple as the `options` argument limits the list to only the included fields.
- `tooltip` (const string, optional): The string that will be shown to the user when hovering over the tooltip icon.
- `inline` (const string, optional): Combines all the input calls using the same argument in one line. The string used as an argument is not displayed. It is only used to identify inputs belonging to the same line.
- `group` (const string, optional): Creates a header above all inputs using the same group argument string. The string is also used as the header's text.
- `confirm` (const bool, optional): If `true`, then user will be asked to confirm input value before indicator is added to chart. Default value is `false`.
- `display` (const plot_display, optional): Controls where the script will display the input's information, aside from within the script's settings. This option allows one to remove a specific input from the script's status line or the Data Window to ensure only the most necessary inputs are displayed there. Possible values: `display.none`, `display.data_window`, `display.status_line`, `display.all`. Optional. The default is `display.all`.
- `active` (input bool, optional): Optional. Specifies whether users can change the value of the input in the script's "Settings/Inputs" tab. The script can use this parameter to set the state of the input based on the values of other inputs. If `true`, users can change the value of the input. If `false`, the input is grayed out, and users cannot change the value. The default is `true`.

**Returns:** Value of input variable.

**Remarks**

All fields included in the `defval` and `options` arguments must belong to the same enum.

```pine
//@version=6
indicator("Session highlight", overlay = true)

//@enum        Contains fields with popular timezones as titles.
//@field exch  Has an empty string as the title to represent the chart timezone.
enum tz
	utc  = "UTC"
	exch = ""
	ny   = "America/New_York"
	chi  = "America/Chicago"
	lon  = "Europe/London"
	tok  = "Asia/Tokyo"

//@variable The session string.
selectedSession = input.session("1200-1500", "Session")
//@variable The selected timezone. The input's dropdown contains the fields in the `tz` enum.
selectedTimezone = input.enum(tz.utc, "Session Timezone")

//@variable Is `true` if the current bar's time is in the specified session.
bool inSession = false
if not na(time("", selectedSession, str.tostring(selectedTimezone)))
	inSession := true

// Highlight the background when `inSession` is `true`.
bgcolor(inSession ? color.new(color.green, 90) : na, title = "Active session highlight")
```

**See also:** `input.text_area()`, `input.bool()`, `input.int()`, `input.float()`, `input.symbol()`, `input.timeframe()`, `input.session()`, `input.source()`, `input.color()`, `input.time()`, `input()`

### input.float()

Adds an input to the Inputs tab of your script's Settings, which allows you to provide configuration options to script users. This function adds a field for a float input to the script's inputs.

```pine
input.float(defval, title, minval, maxval, step, tooltip, inline, group, confirm, display, active) → input float
input.float(defval, title, options, tooltip, inline, group, confirm, display, active) → input float
```

**Arguments**

- `defval` (const int/float): Determines the default value of the input variable proposed in the script's "Settings/Inputs" tab, from where script users can change it. When a list of values is used with the `options` parameter, the value must be one of them.
- `title` (const string, optional): Title of the input. If not specified, the variable name is used as the input's title. If the title is specified, but it is empty, the name will be an empty string.
- `minval` (const int/float, optional): Minimal possible value of the input variable. Optional.
- `maxval` (const int/float, optional): Maximum possible value of the input variable. Optional.
- `step` (const int/float, optional): Step value used for incrementing/decrementing the input. Optional. The default is 1.
- `tooltip` (const string, optional): The string that will be shown to the user when hovering over the tooltip icon.
- `inline` (const string, optional): Combines all the input calls using the same argument in one line. The string used as an argument is not displayed. It is only used to identify inputs belonging to the same line.
- `group` (const string, optional): Creates a header above all inputs using the same group argument string. The string is also used as the header's text.
- `confirm` (const bool, optional): If true, then user will be asked to confirm input value before indicator is added to chart. Default value is false.
- `display` (const plot_display, optional): Controls where the script will display the input's information, aside from within the script's settings. This option allows one to remove a specific input from the script's status line or the Data Window to ensure only the most necessary inputs are displayed there. Possible values: `display.none`, `display.data_window`, `display.status_line`, `display.all`. Optional. The default is `display.all`.
- `active` (input bool, optional): Optional. Specifies whether users can change the value of the input in the script's "Settings/Inputs" tab. The script can use this parameter to set the state of the input based on the values of other inputs. If `true`, users can change the value of the input. If `false`, the input is grayed out, and users cannot change the value. The default is `true`.
- `options` (tuple of const int/float values: [val1, val2, ...], optional): A list of options to choose from a dropdown menu, separated by commas and enclosed in square brackets: [val1, val2, ...]. When using this parameter, the `minval`, `maxval` and `step` parameters cannot be used.

**Returns:** Value of input variable.

**Remarks**

Result of `input.float()` function always should be assigned to a variable, see examples above.

```pine
//@version=6
indicator("input.float", overlay=true)
i_angle1 = input.float(0.5, "Sin Angle", minval=-3.14, maxval=3.14, step=0.02)
plot(math.sin(i_angle1) > 0 ? close : open, "sin", color=color.green)

i_angle2 = input.float(0, "Cos Angle", options=[-3.14, -1.57, 0, 1.57, 3.14])
plot(math.cos(i_angle2) > 0 ? close : open, "cos", color=color.red)
```

**See also:** `input.bool()`, `input.int()`, `input.string()`, `input.text_area()`, `input.symbol()`, `input.timeframe()`, `input.session()`, `input.source()`, `input.color()`, `input.time()`, `input()`

### input.int()

Adds an input to the Inputs tab of your script's Settings, which allows you to provide configuration options to script users. This function adds a field for an integer input to the script's inputs.

```pine
input.int(defval, title, minval, maxval, step, tooltip, inline, group, confirm, display, active) → input int
input.int(defval, title, options, tooltip, inline, group, confirm, display, active) → input int
```

**Arguments**

- `defval` (const int): Determines the default value of the input variable proposed in the script's "Settings/Inputs" tab, from where script users can change it. When a list of values is used with the `options` parameter, the value must be one of them.
- `title` (const string, optional): Title of the input. If not specified, the variable name is used as the input's title. If the title is specified, but it is empty, the name will be an empty string.
- `minval` (const int, optional): Minimal possible value of the input variable. Optional.
- `maxval` (const int, optional): Maximum possible value of the input variable. Optional.
- `step` (const int, optional): Step value used for incrementing/decrementing the input. Optional. The default is 1.
- `tooltip` (const string, optional): The string that will be shown to the user when hovering over the tooltip icon.
- `inline` (const string, optional): Combines all the input calls using the same argument in one line. The string used as an argument is not displayed. It is only used to identify inputs belonging to the same line.
- `group` (const string, optional): Creates a header above all inputs using the same group argument string. The string is also used as the header's text.
- `confirm` (const bool, optional): If true, then user will be asked to confirm input value before indicator is added to chart. Default value is false.
- `display` (const plot_display, optional): Controls where the script will display the input's information, aside from within the script's settings. This option allows one to remove a specific input from the script's status line or the Data Window to ensure only the most necessary inputs are displayed there. Possible values: `display.none`, `display.data_window`, `display.status_line`, `display.all`. Optional. The default is `display.all`.
- `active` (input bool, optional): Optional. Specifies whether users can change the value of the input in the script's "Settings/Inputs" tab. The script can use this parameter to set the state of the input based on the values of other inputs. If `true`, users can change the value of the input. If `false`, the input is grayed out, and users cannot change the value. The default is `true`.
- `options` (tuple of const int values: [val1, val2, ...], optional): A list of options to choose from a dropdown menu, separated by commas and enclosed in square brackets: [val1, val2, ...]. When using this parameter, the `minval`, `maxval` and `step` parameters cannot be used.

**Returns:** Value of input variable.

**Remarks**

Result of `input.int()` function always should be assigned to a variable, see examples above.

```pine
//@version=6
indicator("input.int", overlay=true)
i_len1 = input.int(10, "Length 1", minval=5, maxval=21, step=1)
plot(ta.sma(close, i_len1))

i_len2 = input.int(10, "Length 2", options=[5, 10, 21])
plot(ta.sma(close, i_len2))
```

**See also:** `input.bool()`, `input.float()`, `input.string()`, `input.text_area()`, `input.symbol()`, `input.timeframe()`, `input.session()`, `input.source()`, `input.color()`, `input.time()`, `input()`

### input.price()

Adds a price input to the script's "Settings/Inputs" tab. The user can change the price in the settings or by selecting the indicator and dragging the price line.

```pine
input.price(defval, title, tooltip, inline, group, confirm, display, active) → input float
```

**Arguments**

- `defval` (const int/float): Determines the default value of the input variable proposed in the script's "Settings/Inputs" tab, from where the user can change it.
- `title` (const string, optional): Title of the input. If not specified, the variable name is used as the input's title. If the title is specified, but it is empty, the name will be an empty string.
- `tooltip` (const string, optional): The string that will be shown to the user when hovering over the tooltip icon.
- `inline` (const string, optional): Combines all the input calls using the same argument in one line. The string used as an argument is not displayed. It is only used to identify inputs belonging to the same line.
- `group` (const string, optional): Creates a header above all inputs using the same group argument string. The string is also used as the header's text.
- `confirm` (const bool, optional): Optional. If `true`, the script prompts the user to set the input's initial value by clicking a point on the chart. If inputs of other types require confirmation, the "Confirm inputs" dialog box also displays this input's field, allowing final adjustments to the value before the script starts to run. The default is `false`.
- `display` (const plot_display, optional): Controls where the script will display the input's information, aside from within the script's settings. This option allows one to remove a specific input from the script's status line or the Data Window to ensure only the most necessary inputs are displayed there. Possible values: `display.none`, `display.data_window`, `display.status_line`, `display.all`. Optional. The default is `display.all`.
- `active` (input bool, optional): Optional. Specifies whether users can change the value of the input in the script's "Settings/Inputs" tab. The script can use this parameter to set the state of the input based on the values of other inputs. If `true`, users can change the value of the input. If `false`, the input is grayed out, and users cannot change the value. The default is `true`.

**Returns:** Value of input variable.

**Remarks**

The user can change the input's value by specifying a new value in the "Settings/Inputs" tab, or by moving the input's marker on the chart. Alternatively, they can select "Reset points" from the script's "More" menu and set a new input value by clicking a point on the chart.

If an `input.time()` and `input.price()` function call in the script share a unique `inline` argument and have matching `group` arguments, those calls create a single interactive point marker on the chart. The user can move that marker to adjust the input time and price values simultaneously.

```pine
//@version=6
indicator("input.price", overlay=true)
price1 = input.price(title="Date", defval=42)
plot(price1)

price2 = input.price(54, title="Date")
plot(price2)
```

**See also:** `input.bool()`, `input.int()`, `input.float()`, `input.string()`, `input.text_area()`, `input.symbol()`, `input.resolution()`, `input.session()`, `input.source()`, `input.color()`, `input()`

### input.session()

Adds an input to the Inputs tab of your script's Settings, which allows you to provide configuration options to script users. This function adds two dropdowns that allow the user to specify the beginning and the end of a session using the session selector and returns the result as a string.

```pine
input.session(defval, title, options, tooltip, inline, group, confirm, display, active) → input string
```

**Arguments**

- `defval` (const string): Determines the default value of the input variable proposed in the script's "Settings/Inputs" tab, from where the user can change it. When a list of values is used with the `options` parameter, the value must be one of them.
- `title` (const string, optional): Title of the input. If not specified, the variable name is used as the input's title. If the title is specified, but it is empty, the name will be an empty string.
- `options` (tuple of const string values: [val1, val2, ...], optional): A list of options to choose from.
- `tooltip` (const string, optional): The string that will be shown to the user when hovering over the tooltip icon.
- `inline` (const string, optional): Combines all the input calls using the same argument in one line. The string used as an argument is not displayed. It is only used to identify inputs belonging to the same line.
- `group` (const string, optional): Creates a header above all inputs using the same group argument string. The string is also used as the header's text.
- `confirm` (const bool, optional): If true, then user will be asked to confirm input value before indicator is added to chart. Default value is false.
- `display` (const plot_display, optional): Controls where the script will display the input's information, aside from within the script's settings. This option allows one to remove a specific input from the script's status line or the Data Window to ensure only the most necessary inputs are displayed there. Possible values: `display.none`, `display.data_window`, `display.status_line`, `display.all`. Optional. The default is `display.all`.
- `active` (input bool, optional): Optional. Specifies whether users can change the value of the input in the script's "Settings/Inputs" tab. The script can use this parameter to set the state of the input based on the values of other inputs. If `true`, users can change the value of the input. If `false`, the input is grayed out, and users cannot change the value. The default is `true`.

**Returns:** Value of input variable.

**Remarks**

Result of `input.session()` function always should be assigned to a variable, see examples above.

```pine
//@version=6
indicator("input.session", overlay=true)
i_sess = input.session("1300-1700", "Session", options=["0930-1600", "1300-1700", "1700-2100"])
t = time(timeframe.period, i_sess)
bgcolor(time == t ? color.green : na)
```

**See also:** `input.bool()`, `input.int()`, `input.float()`, `input.string()`, `input.text_area()`, `input.symbol()`, `input.timeframe()`, `input.source()`, `input.color()`, `input.time()`, `input()`

### input.source()

Adds an input to the Inputs tab of your script's Settings, which allows you to provide configuration options to script users. This function adds a dropdown that allows the user to select a source for the calculation, e.g. `close`, `hl2`, etc. The user can also select an output from another indicator on their chart as the source.

```pine
input.source(defval, title, tooltip, inline, group, display, active, confirm) → series float
```

**Arguments**

- `defval` (open/high/low/close/hl2/hlc3/ohlc4/hlcc4): Determines the default value of the input variable proposed in the script's "Settings/Inputs" tab, from where the user can change it.
- `title` (const string, optional): Title of the input. If not specified, the variable name is used as the input's title. If the title is specified, but it is empty, the name will be an empty string.
- `tooltip` (const string, optional): The string that will be shown to the user when hovering over the tooltip icon.
- `inline` (const string, optional): Combines all the input calls using the same argument in one line. The string used as an argument is not displayed. It is only used to identify inputs belonging to the same line.
- `group` (const string, optional): Creates a header above all inputs using the same group argument string. The string is also used as the header's text.
- `display` (const plot_display, optional): Controls where the script will display the input's information, aside from within the script's settings. This option allows one to remove a specific input from the script's status line or the Data Window to ensure only the most necessary inputs are displayed there. Possible values: `display.none`, `display.data_window`, `display.status_line`, `display.all`. Optional. The default is `display.all`.
- `active` (input bool, optional): Optional. Specifies whether users can change the value of the input in the script's "Settings/Inputs" tab. The script can use this parameter to set the state of the input based on the values of other inputs. If `true`, users can change the value of the input. If `false`, the input is grayed out, and users cannot change the value. The default is `true`.
- `confirm` (const bool, optional): If true, then user will be asked to confirm input value before indicator is added to chart. Default value is false.

**Returns:** Value of input variable.

**Remarks**

Result of `input.source()` function always should be assigned to a variable, see examples above.

```pine
//@version=6
indicator("input.source", overlay=true)
i_src = input.source(close, "Source")
plot(i_src)
```

**See also:** `input.bool()`, `input.int()`, `input.float()`, `input.string()`, `input.text_area()`, `input.symbol()`, `input.timeframe()`, `input.session()`, `input.color()`, `input.time()`, `input()`

### input.string()

Adds an input to the Inputs tab of your script's Settings, which allows you to provide configuration options to script users. This function adds a field for a string input to the script's inputs.

```pine
input.string(defval, title, options, tooltip, inline, group, confirm, display, active) → input string
```

**Arguments**

- `defval` (const string): Determines the default value of the input variable proposed in the script's "Settings/Inputs" tab, from where the user can change it. When a list of values is used with the `options` parameter, the value must be one of them.
- `title` (const string, optional): Title of the input. If not specified, the variable name is used as the input's title. If the title is specified, but it is empty, the name will be an empty string.
- `options` (tuple of const string values: [val1, val2, ...], optional): A list of options to choose from.
- `tooltip` (const string, optional): The string that will be shown to the user when hovering over the tooltip icon.
- `inline` (const string, optional): Combines all the input calls using the same argument in one line. The string used as an argument is not displayed. It is only used to identify inputs belonging to the same line.
- `group` (const string, optional): Creates a header above all inputs using the same group argument string. The string is also used as the header's text.
- `confirm` (const bool, optional): If true, then user will be asked to confirm input value before indicator is added to chart. Default value is false.
- `display` (const plot_display, optional): Controls where the script will display the input's information, aside from within the script's settings. This option allows one to remove a specific input from the script's status line or the Data Window to ensure only the most necessary inputs are displayed there. Possible values: `display.none`, `display.data_window`, `display.status_line`, `display.all`. Optional. The default is `display.all`.
- `active` (input bool, optional): Optional. Specifies whether users can change the value of the input in the script's "Settings/Inputs" tab. The script can use this parameter to set the state of the input based on the values of other inputs. If `true`, users can change the value of the input. If `false`, the input is grayed out, and users cannot change the value. The default is `true`.

**Returns:** Value of input variable.

**Remarks**

Result of `input.string()` function always should be assigned to a variable, see examples above.

```pine
//@version=6
indicator("input.string", overlay=true)
i_text = input.string("Hello!", "Message")
l = label.new(bar_index, high, i_text)
label.delete(l[1])
```

**See also:** `input.text_area()`, `input.bool()`, `input.int()`, `input.float()`, `input.symbol()`, `input.timeframe()`, `input.session()`, `input.source()`, `input.color()`, `input.time()`, `input()`

### input.symbol()

Adds an input to the Inputs tab of your script's Settings, which allows you to provide configuration options to script users. This function adds a field that allows the user to select a specific symbol using the symbol search and returns that symbol, paired with its exchange prefix, as a string.

```pine
input.symbol(defval, title, tooltip, inline, group, confirm, display, active) → input string
```

**Arguments**

- `defval` (const string): Determines the default value of the input variable proposed in the script's "Settings/Inputs" tab, from where the user can change it.
- `title` (const string, optional): Title of the input. If not specified, the variable name is used as the input's title. If the title is specified, but it is empty, the name will be an empty string.
- `tooltip` (const string, optional): The string that will be shown to the user when hovering over the tooltip icon.
- `inline` (const string, optional): Combines all the input calls using the same argument in one line. The string used as an argument is not displayed. It is only used to identify inputs belonging to the same line.
- `group` (const string, optional): Creates a header above all inputs using the same group argument string. The string is also used as the header's text.
- `confirm` (const bool, optional): If true, then user will be asked to confirm input value before indicator is added to chart. Default value is false.
- `display` (const plot_display, optional): Controls where the script will display the input's information, aside from within the script's settings. This option allows one to remove a specific input from the script's status line or the Data Window to ensure only the most necessary inputs are displayed there. Possible values: `display.none`, `display.data_window`, `display.status_line`, `display.all`. Optional. The default is `display.all`.
- `active` (input bool, optional): Optional. Specifies whether users can change the value of the input in the script's "Settings/Inputs" tab. The script can use this parameter to set the state of the input based on the values of other inputs. If `true`, users can change the value of the input. If `false`, the input is grayed out, and users cannot change the value. The default is `true`.

**Returns:** Value of input variable.

**Remarks**

Result of `input.symbol()` function always should be assigned to a variable, see examples above.

```pine
//@version=6
indicator("input.symbol", overlay=true)
i_sym = input.symbol("DELL", "Symbol")
s = request.security(i_sym, 'D', close)
plot(s)
```

**See also:** `input.bool()`, `input.int()`, `input.float()`, `input.string()`, `input.text_area()`, `input.timeframe()`, `input.session()`, `input.source()`, `input.color()`, `input.time()`, `input()`

### input.text_area()

Adds an input to the Inputs tab of your script's Settings, which allows you to provide configuration options to script users. This function adds a field for a multiline text input.

```pine
input.text_area(defval, title, tooltip, group, confirm, display, active) → input string
```

**Arguments**

- `defval` (const string): Determines the default value of the input variable proposed in the script's "Settings/Inputs" tab, from where the user can change it.
- `title` (const string, optional): Title of the input. If not specified, the variable name is used as the input's title. If the title is specified, but it is empty, the name will be an empty string.
- `tooltip` (const string, optional): The string that will be shown to the user when hovering over the tooltip icon.
- `group` (const string, optional): Creates a header above all inputs using the same group argument string. The string is also used as the header's text.
- `confirm` (const bool, optional): If true, then user will be asked to confirm input value before indicator is added to chart. Default value is false.
- `display` (const plot_display, optional): Controls where the script will display the input's information, aside from within the script's settings. This option allows one to remove a specific input from the script's status line or the Data Window to ensure only the most necessary inputs are displayed there. Possible values: `display.none`, `display.data_window`, `display.status_line`, `display.all`. Optional. The default is `display.none`.
- `active` (input bool, optional): Optional. Specifies whether users can change the value of the input in the script's "Settings/Inputs" tab. The script can use this parameter to set the state of the input based on the values of other inputs. If `true`, users can change the value of the input. If `false`, the input is grayed out, and users cannot change the value. The default is `true`.

**Returns:** Value of input variable.

**Remarks**

Result of `input.text_area()` function always should be assigned to a variable, see examples above.

```pine
//@version=6
indicator("input.text_area")
i_text = input.text_area(defval = "Hello \nWorld!", title = "Message")
plot(close)
```

**See also:** `input.string()`, `input.bool()`, `input.int()`, `input.float()`, `input.symbol()`, `input.timeframe()`, `input.session()`, `input.source()`, `input.color()`, `input.time()`, `input()`

### input.time()

Adds two inputs to the script's "Settings/Inputs" tab on the same line: one for the date and one for the time. The user can change the price in the settings or by selecting the indicator and dragging the price line. The function returns a date/time value in UNIX format.

```pine
input.time(defval, title, tooltip, inline, group, confirm, display, active) → input int
```

**Arguments**

- `defval` (const int): Determines the default value of the input variable proposed in the script's "Settings/Inputs" tab, from where the user can change it. The value can be a `timestamp()` function, but only if it uses a date argument in const string format.
- `title` (const string, optional): Title of the input. If not specified, the variable name is used as the input's title. If the title is specified, but it is empty, the name will be an empty string.
- `tooltip` (const string, optional): The string that will be shown to the user when hovering over the tooltip icon.
- `inline` (const string, optional): Combines all the input calls using the same argument in one line. The string used as an argument is not displayed. It is only used to identify inputs belonging to the same line.
- `group` (const string, optional): Creates a header above all inputs using the same group argument string. The string is also used as the header's text.
- `confirm` (const bool, optional): Optional. If `true`, the script prompts the user to set the input's initial value by clicking a point on the chart. If inputs of other types require confirmation, the "Confirm inputs" dialog box also displays this input's field, allowing final adjustments to the value before the script starts to run. The default is `false`.
- `display` (const plot_display, optional): Controls where the script will display the input's information, aside from within the script's settings. This option allows one to remove a specific input from the script's status line or the Data Window to ensure only the most necessary inputs are displayed there. Possible values: `display.none`, `display.data_window`, `display.status_line`, `display.all`. Optional. The default is `display.none`.
- `active` (input bool, optional): Optional. Specifies whether users can change the value of the input in the script's "Settings/Inputs" tab. The script can use this parameter to set the state of the input based on the values of other inputs. If `true`, users can change the value of the input. If `false`, the input is grayed out, and users cannot change the value. The default is `true`.

**Returns:** Value of input variable.

**Remarks**

The user can change the input's value by specifying a new value in the "Settings/Inputs" tab, or by moving the input's marker on the chart. Alternatively, they can select "Reset points" from the script's "More" menu and set a new input value by clicking a point on the chart.

If an `input.time()` and `input.price()` function call in the script share a unique `inline` argument and have matching `group` arguments, those calls create a single interactive point marker on the chart. The user can move that marker to adjust the input time and price values simultaneously.

```pine
//@version=6
indicator("input.time", overlay=true)
i_date = input.time(timestamp("20 Jul 2021 00:00 +0300"), "Date")
l = label.new(i_date, high, "Date", xloc=xloc.bar_time)
label.delete(l[1])
```

**See also:** `input.bool()`, `input.int()`, `input.float()`, `input.string()`, `input.text_area()`, `input.symbol()`, `input.timeframe()`, `input.session()`, `input.source()`, `input.color()`, `input()`

### input.timeframe()

Adds an input to the Inputs tab of your script's Settings, which allows you to provide configuration options to script users. This function adds a dropdown that allows the user to select a specific timeframe via the timeframe selector and returns it as a string. The selector includes the custom timeframes a user may have added using the chart's Timeframe dropdown.

```pine
input.timeframe(defval, title, options, tooltip, inline, group, confirm, display, active) → input string
```

**Arguments**

- `defval` (const string): Determines the default value of the input variable proposed in the script's "Settings/Inputs" tab, from where the user can change it. When a list of values is used with the `options` parameter, the value must be one of them.
- `title` (const string, optional): Title of the input. If not specified, the variable name is used as the input's title. If the title is specified, but it is empty, the name will be an empty string.
- `options` (tuple of const string values: [val1, val2, ...], optional): A list of options to choose from.
- `tooltip` (const string, optional): The string that will be shown to the user when hovering over the tooltip icon.
- `inline` (const string, optional): Combines all the input calls using the same argument in one line. The string used as an argument is not displayed. It is only used to identify inputs belonging to the same line.
- `group` (const string, optional): Creates a header above all inputs using the same group argument string. The string is also used as the header's text.
- `confirm` (const bool, optional): If true, then user will be asked to confirm input value before indicator is added to chart. Default value is false.
- `display` (const plot_display, optional): Controls where the script will display the input's information, aside from within the script's settings. This option allows one to remove a specific input from the script's status line or the Data Window to ensure only the most necessary inputs are displayed there. Possible values: `display.none`, `display.data_window`, `display.status_line`, `display.all`. Optional. The default is `display.all`.
- `active` (input bool, optional): Optional. Specifies whether users can change the value of the input in the script's "Settings/Inputs" tab. The script can use this parameter to set the state of the input based on the values of other inputs. If `true`, users can change the value of the input. If `false`, the input is grayed out, and users cannot change the value. The default is `true`.

**Returns:** Value of input variable.

**Remarks**

Result of `input.timeframe()` function always should be assigned to a variable, see examples above.

```pine
//@version=6
indicator("input.timeframe", overlay=true)
i_res = input.timeframe('D', "Resolution", options=['D', 'W', 'M'])
s = request.security("AAPL", i_res, close)
plot(s)
```

**See also:** `input.bool()`, `input.int()`, `input.float()`, `input.string()`, `input.text_area()`, `input.symbol()`, `input.session()`, `input.source()`, `input.color()`, `input.time()`, `input()`
