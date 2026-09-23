# Plotting functions (plot, plotshape, plotchar, fill, hline, bgcolor, barcolor, ...)

Source: https://www.tradingview.com/pine-script-reference/v6/

## Functions

### barcolor()

Set color of bars.

```pine
barcolor(color, offset, editable, show_last, title, display) → void
```

**Arguments**

- `color` (series color): Color of bars. You can use constants like 'red' or '#ff001a' as well as complex expressions like 'close >= open ? color.green : color.red'. Required argument.
- `offset` (simple int, optional): Shifts the color series to the left or to the right on the given number of bars. Default is 0.
- `editable` (input bool, optional): If true then barcolor style will be editable in Format dialog. Default is true.
- `show_last` (input int, optional): Optional. The number of bars, counting backwards from the most recent bar, on which the function can draw.
- `title` (const string, optional): Title of the barcolor. Optional argument.
- `display` (input plot_simple_display, optional): Controls where the barcolor is displayed. Possible values are: `display.none`, `display.all`. Default is `display.all`.

```pine
//@version=6
indicator("barcolor example", overlay=true)
barcolor(close < open ? color.black : color.white)
```

**See also:** `bgcolor()`, `plot()`, `fill()`

### bgcolor()

Fill background of bars with specified color.

```pine
bgcolor(color, offset, editable, show_last, title, display, force_overlay) → void
```

**Arguments**

- `color` (series color): Color of the filled background. You can use constants like 'red' or '#ff001a' as well as complex expressions like 'close >= open ? color.green : color.red'. Required argument.
- `offset` (simple int, optional): Shifts the color series to the left or to the right on the given number of bars. Default is 0.
- `editable` (input bool, optional): If true then bgcolor style will be editable in Format dialog. Default is true.
- `show_last` (input int, optional): Optional. The number of bars, counting backwards from the most recent bar, on which the function can draw.
- `title` (const string, optional): Title of the bgcolor. Optional argument.
- `display` (input plot_simple_display, optional): Controls where the bgcolor is displayed. Possible values are: `display.none`, `display.all`. Default is `display.all`.
- `force_overlay` (const bool, optional): If `true`, the plotted results will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is `false`.

```pine
//@version=6
indicator("bgcolor example", overlay=true)
bgcolor(close < open ? color.new(color.red,70) : color.new(color.green, 70))
```

**See also:** `barcolor()`, `plot()`, `fill()`

### fill()

Fills background between two plots or hlines with a given color.

```pine
fill(plot1, plot2, top_value, bottom_value, top_color, bottom_color, title, display, fillgaps, editable) → void
fill(hline1, hline2, color, title, editable, fillgaps, display) → void
fill(plot1, plot2, color, title, editable, show_last, fillgaps, display) → void
```

**Arguments**

- `plot1` (plot): The first plot object. Required argument.
- `plot2` (plot): The second plot object. Required argument.
- `top_value` (series int/float, optional): Value where the gradient uses the `top_color`.
- `bottom_value` (series int/float, optional): Value where the gradient uses the `bottom_color`.
- `top_color` (series color, optional): Color of the gradient at the topmost value.
- `bottom_color` (series color, optional): Color of the gradient at the bottommost value.
- `title` (const string, optional): Title of the created fill object. Optional argument.
- `display` (input plot_simple_display, optional): Controls where the fill is displayed. Possible values are: `display.none`, `display.all`. Default is `display.all`.
- `fillgaps` (const bool, optional): Controls continuing fills on gaps, i.e., when one of the plot() calls returns an na value. When true, the last fill will continue on gaps. The default is false.
- `editable` (input bool, optional): If true then fill style will be editable in Format dialog. Default is true.
- `hline1` (hline): The first hline object. Required argument.
- `hline2` (hline): The second hline object. Required argument.
- `color` (series color, optional): Color of the background fill. You can use constants like 'color=color.red' or 'color=#ff001a' as well as complex expressions like 'color = close >= open ? color.green : color.red'. Optional argument.
- `show_last` (input int, optional): Optional. The number of bars, counting backwards from the most recent bar, on which the function can draw.

Fill between two horizontal lines

```pine
//@version=6
indicator("Fill between hlines", overlay = false)
h1 = hline(20)
h2 = hline(10)
fill(h1, h2, color = color.new(color.blue, 90))
```

Fill between two plots

```pine
//@version=6
indicator("Fill between plots", overlay = true)
p1 = plot(open)
p2 = plot(close)
fill(p1, p2, color = color.new(color.green, 90))
```

Gradient fill between two horizontal lines

```pine
//@version=6
indicator("Gradient Fill between hlines", overlay = false)
topVal = input.int(100)
botVal = input.int(0)
topCol = input.color(color.red)
botCol = input.color(color.blue)
topLine = hline(100, color = topCol, linestyle = hline.style_solid)
botLine = hline(0,   color = botCol, linestyle = hline.style_solid)
fill(topLine, botLine, topVal, botVal, topCol, botCol)
```

Fill between two horizontal lines

```pine
//@version=6
indicator("Fill between hlines", overlay = false)
h1 = hline(20)
h2 = hline(10)
fill(h1, h2, color = color.new(color.blue, 90))
```

Fill between two plots

```pine
//@version=6
indicator("Fill between plots", overlay = true)
p1 = plot(open)
p2 = plot(close)
fill(p1, p2, color = color.new(color.green, 90))
```

Gradient fill between two horizontal lines

```pine
//@version=6
indicator("Gradient Fill between hlines", overlay = false)
topVal = input.int(100)
botVal = input.int(0)
topCol = input.color(color.red)
botCol = input.color(color.blue)
topLine = hline(100, color = topCol, linestyle = hline.style_solid)
botLine = hline(0,   color = botCol, linestyle = hline.style_solid)
fill(topLine, botLine, topVal, botVal, topCol, botCol)
```

Fill between two horizontal lines

```pine
//@version=6
indicator("Fill between hlines", overlay = false)
h1 = hline(20)
h2 = hline(10)
fill(h1, h2, color = color.new(color.blue, 90))
```

Fill between two plots

```pine
//@version=6
indicator("Fill between plots", overlay = true)
p1 = plot(open)
p2 = plot(close)
fill(p1, p2, color = color.new(color.green, 90))
```

Gradient fill between two horizontal lines

```pine
//@version=6
indicator("Gradient Fill between hlines", overlay = false)
topVal = input.int(100)
botVal = input.int(0)
topCol = input.color(color.red)
botCol = input.color(color.blue)
topLine = hline(100, color = topCol, linestyle = hline.style_solid)
botLine = hline(0,   color = botCol, linestyle = hline.style_solid)
fill(topLine, botLine, topVal, botVal, topCol, botCol)
```

**See also:** `plot()`, `barcolor()`, `bgcolor()`, `hline()`, `color.new()`

### hline()

Renders a horizontal line at a given fixed price level.

```pine
hline(price, title, color, linestyle, linewidth, editable, display) → hline
```

**Arguments**

- `price` (input int/float): Price value at which the object will be rendered. Required argument.
- `title` (const string, optional): Title of the object.
- `color` (input color, optional): Color of the rendered line. Must be a constant value (not an expression). Optional argument.
- `linestyle` (input hline_style, optional): Style of the rendered line. Possible values are: `hline.style_solid`, `hline.style_dotted`, `hline.style_dashed`. Optional argument.
- `linewidth` (input int, optional): Width of the rendered line. Default value is 1.
- `editable` (input bool, optional): If true then hline style will be editable in Format dialog. Default is true.
- `display` (input plot_simple_display, optional): Controls where the hline is displayed. Possible values are: `display.none`, `display.all`. Default is `display.all`.

**Returns:** An hline object, that can be used in `fill()`

```pine
//@version=6
indicator("input.hline", overlay=true)
hline(3.14, title='Pi', color=color.blue, linestyle=hline.style_dotted, linewidth=2)

// You may fill the background between any two hlines with a fill() function:
h1 = hline(20)
h2 = hline(10)
fill(h1, h2, color=color.new(color.green, 90))
```

**See also:** `fill()`

### plot()

Plots a series of data on the chart.

```pine
plot(series, title, color, linewidth, style, trackprice, histbase, offset, join, editable, show_last, display, format, precision, force_overlay, linestyle) → plot
```

**Arguments**

- `series` (series int/float): Series of data to be plotted. Required argument.
- `title` (const string, optional): Title of the plot.
- `color` (series color, optional): Color of the plot. You can use constants like 'color=color.red' or 'color=#ff001a' as well as complex expressions like 'color = close >= open ? color.green : color.red'. Optional argument.
- `linewidth` (input int, optional): Width of the plotted line. Default value is 1. Not applicable to every style.
- `style` (input plot_style, optional): Type of plot. Possible values are: `plot.style_line`, `plot.style_stepline`, `plot.style_stepline_diamond`, `plot.style_histogram`, `plot.style_cross`, `plot.style_area`, `plot.style_columns`, `plot.style_circles`, `plot.style_linebr`, `plot.style_areabr`, `plot.style_steplinebr`. Default value is `plot.style_line`.
- `trackprice` (input bool, optional): If true then a horizontal price line will be shown at the level of the last indicator value. Default is false.
- `histbase` (input int/float, optional): The price value used as the reference level when rendering plot with `plot.style_histogram`, `plot.style_columns` or `plot.style_area` style. Default is 0.0.
- `offset` (simple int, optional): Shifts the plot to the left or to the right on the given number of bars. Default is 0.
- `join` (input bool, optional): If true then plot points will be joined with line, applicable only to `plot.style_cross` and `plot.style_circles` styles. Default is false.
- `editable` (input bool, optional): If true then plot style will be editable in Format dialog. Default is true.
- `show_last` (input int, optional): Optional. The number of bars, counting backwards from the most recent bar, on which the function can draw.
- `display` (input plot_display, optional): Controls where the plot's information is displayed. Display options support addition and subtraction, meaning that using `display.all - display.status_line` will display the plot's information everywhere except in the script's status line. `display.price_scale + display.status_line` will display the plot only in the price scale and status line. When `display` arguments such as `display.price_scale` have user-controlled chart settings equivalents, the relevant plot information will only appear when all settings allow for it. Possible values: `display.none`, `display.pane`, `display.data_window`, `display.price_scale`, `display.status_line`, `display.all`. Optional. The default is `display.all`.
- `format` (input string, optional): Determines whether the script formats the plot's values as prices, percentages, or volume values. The argument passed to this parameter supersedes the `format` parameter of the `indicator()`, and `strategy()` functions. Optional. The default is the `format` value used by the `indicator()`/`strategy()` function. Possible values: `format.price`, `format.percent`, `format.volume`.
- `precision` (input int, optional): The number of digits after the decimal point the plot's values show on the chart pane's y-axis, the script's status line, and the Data Window. Accepts a non-negative integer less than or equal to 16. The argument passed to this parameter supersedes the `precision` parameter of the `indicator()` and `strategy()` functions. When the function's `format` parameter uses `format.volume`, the `precision` parameter will not affect the result, as the decimal precision rules defined by `format.volume` supersede other precision settings. Optional. The default is the `precision` value used by the `indicator()`/`strategy()` function.
- `force_overlay` (const bool, optional): If `true`, the plotted results will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is `false`.
- `linestyle` (input plot_line_style, optional): Optional. A modifier for plot styles that display lines. It specifies whether the plotted line is solid (`plot.linestyle_solid`), dashed (`plot.linestyle_dashed`), or dotted (`plot.linestyle_dotted`). The modifier applies only when the function uses one of the following `style` arguments: `plot.style_line`, `plot.style_linebr`, `plot.style_stepline`, `plot.style_stepline_diamond`, and `plot.style_area`. The default is `plot.linestyle_solid`.

**Returns:** A plot object, that can be used in `fill()`

```pine
//@version=6
indicator("plot")
plot(high+low, title='Title', color=color.new(#00ffaa, 70), linewidth=2, style=plot.style_area, offset=15, trackprice=true)

// You may fill the background between any two plots with a fill() function:
p1 = plot(open)
p2 = plot(close)
fill(p1, p2, color=color.new(color.green, 90))
```

**See also:** `plotshape()`, `plotchar()`, `plotarrow()`, `barcolor()`, `bgcolor()`, `fill()`

### plotarrow()

Plots up and down arrows on the chart. Up arrow is drawn at every indicator positive value, down arrow is drawn at every negative value. If indicator returns `na` then no arrow is drawn. Arrows has different height, the more absolute indicator value the longer arrow is drawn.

```pine
plotarrow(series, title, colorup, colordown, offset, minheight, maxheight, editable, show_last, display, format, precision, force_overlay) → void
```

**Arguments**

- `series` (series int/float): Series of data to be plotted as arrows. Required argument.
- `title` (const string, optional): Title of the plot.
- `colorup` (series color, optional): Color of the up arrows. Optional argument.
- `colordown` (series color, optional): Color of the down arrows. Optional argument.
- `offset` (simple int, optional): Shifts arrows to the left or to the right on the given number of bars. Default is 0.
- `minheight` (input int, optional): Minimal possible arrow height in pixels. Default is 5.
- `maxheight` (input int, optional): Maximum possible arrow height in pixels. Default is 100.
- `editable` (input bool, optional): If true then plotarrow style will be editable in Format dialog. Default is true.
- `show_last` (input int, optional): Optional. The number of bars, counting backwards from the most recent bar, on which the function can draw.
- `display` (input plot_display, optional): Controls where the plot's information is displayed. Display options support addition and subtraction, meaning that using `display.all - display.status_line` will display the plot's information everywhere except in the script's status line. `display.price_scale + display.status_line` will display the plot only in the price scale and status line. When `display` arguments such as `display.price_scale` have user-controlled chart settings equivalents, the relevant plot information will only appear when all settings allow for it. Possible values: `display.none`, `display.pane`, `display.data_window`, `display.price_scale`, `display.status_line`, `display.all`. Optional. The default is `display.all`.
- `format` (input string, optional): Determines whether the script formats the plot's values as prices, percentages, or volume values. The argument passed to this parameter supersedes the `format` parameter of the `indicator()`, and `strategy()` functions. Optional. The default is the `format` value used by the `indicator()`/`strategy()` function. Possible values: `format.price`, `format.percent`, `format.volume`.
- `precision` (input int, optional): The number of digits after the decimal point the plot's values show on the chart pane's y-axis, the script's status line, and the Data Window. Accepts a non-negative integer less than or equal to 16. The argument passed to this parameter supersedes the `precision` parameter of the `indicator()` and `strategy()` functions. When the function's `format` parameter uses `format.volume`, the `precision` parameter will not affect the result, as the decimal precision rules defined by `format.volume` supersede other precision settings. Optional. The default is the `precision` value used by the `indicator()`/`strategy()` function.
- `force_overlay` (const bool, optional): If `true`, the plotted results will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is `false`.

**Remarks**

Use `plotarrow()` function in conjunction with 'overlay=true' `indicator()` parameter!

```pine
//@version=6
indicator("plotarrow example", overlay=true)
codiff = close - open
plotarrow(codiff, colorup=color.new(color.teal,40), colordown=color.new(color.orange, 40))
```

**See also:** `plot()`, `plotshape()`, `plotchar()`, `barcolor()`, `bgcolor()`

### plotbar()

Plots ohlc bars on the chart.

```pine
plotbar(open, high, low, close, title, color, editable, show_last, display, format, precision, force_overlay) → void
```

**Arguments**

- `open` (series int/float): Open series of data to be used as open values of bars. Required argument.
- `high` (series int/float): High series of data to be used as high values of bars. Required argument.
- `low` (series int/float): Low series of data to be used as low values of bars. Required argument.
- `close` (series int/float): Close series of data to be used as close values of bars. Required argument.
- `title` (const string, optional): Title of the plotbar. Optional argument.
- `color` (series color, optional): Color of the ohlc bars. You can use constants like 'color=color.red' or 'color=#ff001a' as well as complex expressions like 'color = close >= open ? color.green : color.red'. Optional argument.
- `editable` (input bool, optional): If true then plotbar style will be editable in Format dialog. Default is true.
- `show_last` (input int, optional): Optional. The number of bars, counting backwards from the most recent bar, on which the function can draw.
- `display` (input plot_display, optional): Controls where the plot's information is displayed. Display options support addition and subtraction, meaning that using `display.all - display.status_line` will display the plot's information everywhere except in the script's status line. `display.price_scale + display.status_line` will display the plot only in the price scale and status line. When `display` arguments such as `display.price_scale` have user-controlled chart settings equivalents, the relevant plot information will only appear when all settings allow for it. Possible values: `display.none`, `display.pane`, `display.data_window`, `display.price_scale`, `display.status_line`, `display.all`. Optional. The default is `display.all`.
- `format` (input string, optional): Determines whether the script formats the plot's values as prices, percentages, or volume values. The argument passed to this parameter supersedes the `format` parameter of the `indicator()`, and `strategy()` functions. Optional. The default is the `format` value used by the `indicator()`/`strategy()` function. Possible values: `format.price`, `format.percent`, `format.volume`.
- `precision` (input int, optional): The number of digits after the decimal point the plot's values show on the chart pane's y-axis, the script's status line, and the Data Window. Accepts a non-negative integer less than or equal to 16. The argument passed to this parameter supersedes the `precision` parameter of the `indicator()` and `strategy()` functions. When the function's `format` parameter uses `format.volume`, the `precision` parameter will not affect the result, as the decimal precision rules defined by `format.volume` supersede other precision settings. Optional. The default is the `precision` value used by the `indicator()`/`strategy()` function.
- `force_overlay` (const bool, optional): If `true`, the plotted results will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is `false`.

**Remarks**

Even if one value of open, high, low or close equal NaN then bar no draw.

The maximal value of open, high, low or close will be set as 'high', and the minimal value will be set as 'low'.

```pine
//@version=6
indicator("plotbar example", overlay=true)
plotbar(open, high, low, close, title='Title', color = open < close ? color.green : color.red)
```

**See also:** `plotcandle()`

### plotcandle()

Plots candles on the chart.

```pine
plotcandle(open, high, low, close, title, color, wickcolor, editable, show_last, bordercolor, display, format, precision, force_overlay) → void
```

**Arguments**

- `open` (series int/float): Open series of data to be used as open values of candles. Required argument.
- `high` (series int/float): High series of data to be used as high values of candles. Required argument.
- `low` (series int/float): Low series of data to be used as low values of candles. Required argument.
- `close` (series int/float): Close series of data to be used as close values of candles. Required argument.
- `title` (const string, optional): Title of the plotcandles. Optional argument.
- `color` (series color, optional): Color of the candles. You can use constants like 'color=color.red' or 'color=#ff001a' as well as complex expressions like 'color = close >= open ? color.green : color.red'. Optional argument.
- `wickcolor` (series color, optional): The color of the wick of candles. An optional argument.
- `editable` (input bool, optional): If true then plotcandle style will be editable in Format dialog. Default is true.
- `show_last` (input int, optional): Optional. The number of bars, counting backwards from the most recent bar, on which the function can draw.
- `bordercolor` (series color, optional): The border color of candles. An optional argument.
- `display` (input plot_display, optional): Controls where the plot's information is displayed. Display options support addition and subtraction, meaning that using `display.all - display.status_line` will display the plot's information everywhere except in the script's status line. `display.price_scale + display.status_line` will display the plot only in the price scale and status line. When `display` arguments such as `display.price_scale` have user-controlled chart settings equivalents, the relevant plot information will only appear when all settings allow for it. Possible values: `display.none`, `display.pane`, `display.data_window`, `display.price_scale`, `display.status_line`, `display.all`. Optional. The default is `display.all`.
- `format` (input string, optional): Determines whether the script formats the plot's values as prices, percentages, or volume values. The argument passed to this parameter supersedes the `format` parameter of the `indicator()`, and `strategy()` functions. Optional. The default is the `format` value used by the `indicator()`/`strategy()` function. Possible values: `format.price`, `format.percent`, `format.volume`.
- `precision` (input int, optional): The number of digits after the decimal point the plot's values show on the chart pane's y-axis, the script's status line, and the Data Window. Accepts a non-negative integer less than or equal to 16. The argument passed to this parameter supersedes the `precision` parameter of the `indicator()` and `strategy()` functions. When the function's `format` parameter uses `format.volume`, the `precision` parameter will not affect the result, as the decimal precision rules defined by `format.volume` supersede other precision settings. Optional. The default is the `precision` value used by the `indicator()`/`strategy()` function.
- `force_overlay` (const bool, optional): If `true`, the plotted results will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is `false`.

**Remarks**

Even if one value of open, high, low or close equal NaN then bar no draw.

The maximal value of open, high, low or close will be set as 'high', and the minimal value will be set as 'low'.

```pine
//@version=6
indicator("plotcandle example", overlay=true)
plotcandle(open, high, low, close, title='Title', color = open < close ? color.green : color.red, wickcolor=color.black)
```

**See also:** `plotbar()`

### plotchar()

Plots visual shapes using any given one Unicode character on the chart.

```pine
plotchar(series, title, char, location, color, offset, text, textcolor, editable, size, show_last, display, format, precision, force_overlay) → void
```

**Arguments**

- `series` (series int/float/bool): Series of data to be plotted as shapes. Series is treated as a series of boolean values for all location values except `location.absolute`. Required argument.
- `title` (const string, optional): Title of the plot.
- `char` (input string, optional): Character to use as a visual shape.
- `location` (input string, optional): Location of shapes on the chart. Possible values are: `location.abovebar`, `location.belowbar`, `location.top`, `location.bottom`, `location.absolute`. Default value is `location.abovebar`.
- `color` (series color, optional): Color of the shapes. You can use constants like 'color=color.red' or 'color=#ff001a' as well as complex expressions like 'color = close >= open ? color.green : color.red'. Optional argument.
- `offset` (simple int, optional): Shifts shapes to the left or to the right on the given number of bars. Default is 0.
- `text` (const string, optional): Text to display with the shape. You can use multiline text, to separate lines use '\n' escape sequence. Example: 'line one\nline two'.
- `textcolor` (series color, optional): Color of the text. You can use constants like 'textcolor=color.red' or 'textcolor=#ff001a' as well as complex expressions like 'textcolor = close >= open ? color.green : color.red'. Optional argument.
- `editable` (input bool, optional): If true then plotchar style will be editable in Format dialog. Default is true.
- `size` (const string, optional): Size of characters on the chart. Possible values are: `size.auto`, `size.tiny`, `size.small`, `size.normal`, `size.large`, `size.huge`. Default is `size.auto`.
- `show_last` (input int, optional): Optional. The number of bars, counting backwards from the most recent bar, on which the function can draw.
- `display` (input plot_display, optional): Controls where the plot's information is displayed. Display options support addition and subtraction, meaning that using `display.all - display.status_line` will display the plot's information everywhere except in the script's status line. `display.price_scale + display.status_line` will display the plot only in the price scale and status line. When `display` arguments such as `display.price_scale` have user-controlled chart settings equivalents, the relevant plot information will only appear when all settings allow for it. Possible values: `display.none`, `display.pane`, `display.data_window`, `display.price_scale`, `display.status_line`, `display.all`. Optional. The default is `display.all`.
- `format` (input string, optional): Determines whether the script formats the plot's values as prices, percentages, or volume values. The argument passed to this parameter supersedes the `format` parameter of the `indicator()`, and `strategy()` functions. Optional. The default is the `format` value used by the `indicator()`/`strategy()` function. Possible values: `format.price`, `format.percent`, `format.volume`.
- `precision` (input int, optional): The number of digits after the decimal point the plot's values show on the chart pane's y-axis, the script's status line, and the Data Window. Accepts a non-negative integer less than or equal to 16. The argument passed to this parameter supersedes the `precision` parameter of the `indicator()` and `strategy()` functions. When the function's `format` parameter uses `format.volume`, the `precision` parameter will not affect the result, as the decimal precision rules defined by `format.volume` supersede other precision settings. Optional. The default is the `precision` value used by the `indicator()`/`strategy()` function.
- `force_overlay` (const bool, optional): If `true`, the plotted results will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is `false`.

**Remarks**

Use `plotchar()` function in conjunction with 'overlay=true' `indicator()` parameter!

```pine
//@version=6
indicator("plotchar example", overlay=true)
data = close >= open
plotchar(data, char='❄')
```

**See also:** `plot()`, `plotshape()`, `plotarrow()`, `barcolor()`, `bgcolor()`

### plotshape()

Plots visual shapes on the chart.

```pine
plotshape(series, title, style, location, color, offset, text, textcolor, editable, size, show_last, display, format, precision, force_overlay) → void
```

**Arguments**

- `series` (series int/float/bool): Series of data to be plotted as shapes. Series is treated as a series of boolean values for all location values except `location.absolute`. Required argument.
- `title` (const string, optional): Title of the plot.
- `style` (input string, optional): Type of plot. Possible values are: `shape.xcross`, `shape.cross`, `shape.triangleup`, `shape.triangledown`, `shape.flag`, `shape.circle`, `shape.arrowup`, `shape.arrowdown`, `shape.labelup`, `shape.labeldown`, `shape.square`, `shape.diamond`. Default value is `shape.xcross`.
- `location` (input string, optional): Location of shapes on the chart. Possible values are: `location.abovebar`, `location.belowbar`, `location.top`, `location.bottom`, `location.absolute`. Default value is `location.abovebar`.
- `color` (series color, optional): Color of the shapes. You can use constants like 'color=color.red' or 'color=#ff001a' as well as complex expressions like 'color = close >= open ? color.green : color.red'. Optional argument.
- `offset` (simple int, optional): Shifts shapes to the left or to the right on the given number of bars. Default is 0.
- `text` (const string, optional): Text to display with the shape. You can use multiline text, to separate lines use '\n' escape sequence. Example: 'line one\nline two'.
- `textcolor` (series color, optional): Color of the text. You can use constants like 'textcolor=color.red' or 'textcolor=#ff001a' as well as complex expressions like 'textcolor = close >= open ? color.green : color.red'. Optional argument.
- `editable` (input bool, optional): If true then plotshape style will be editable in Format dialog. Default is true.
- `size` (const string, optional): Size of shapes on the chart. Possible values are: `size.auto`, `size.tiny`, `size.small`, `size.normal`, `size.large`, `size.huge`. Default is `size.auto`.
- `show_last` (input int, optional): Optional. The number of bars, counting backwards from the most recent bar, on which the function can draw.
- `display` (input plot_display, optional): Controls where the plot's information is displayed. Display options support addition and subtraction, meaning that using `display.all - display.status_line` will display the plot's information everywhere except in the script's status line. `display.price_scale + display.status_line` will display the plot only in the price scale and status line. When `display` arguments such as `display.price_scale` have user-controlled chart settings equivalents, the relevant plot information will only appear when all settings allow for it. Possible values: `display.none`, `display.pane`, `display.data_window`, `display.price_scale`, `display.status_line`, `display.all`. Optional. The default is `display.all`.
- `format` (input string, optional): Determines whether the script formats the plot's values as prices, percentages, or volume values. The argument passed to this parameter supersedes the `format` parameter of the `indicator()`, and `strategy()` functions. Optional. The default is the `format` value used by the `indicator()`/`strategy()` function. Possible values: `format.price`, `format.percent`, `format.volume`.
- `precision` (input int, optional): The number of digits after the decimal point the plot's values show on the chart pane's y-axis, the script's status line, and the Data Window. Accepts a non-negative integer less than or equal to 16. The argument passed to this parameter supersedes the `precision` parameter of the `indicator()` and `strategy()` functions. When the function's `format` parameter uses `format.volume`, the `precision` parameter will not affect the result, as the decimal precision rules defined by `format.volume` supersede other precision settings. Optional. The default is the `precision` value used by the `indicator()`/`strategy()` function.
- `force_overlay` (const bool, optional): If `true`, the plotted results will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is `false`.

**Remarks**

Use `plotshape()` function in conjunction with 'overlay=true' `indicator()` parameter!

```pine
//@version=6
indicator("plotshape example 1", overlay=true)
data = close >= open
plotshape(data, style=shape.xcross)
```

**See also:** `plot()`, `plotchar()`, `plotarrow()`, `barcolor()`, `bgcolor()`
