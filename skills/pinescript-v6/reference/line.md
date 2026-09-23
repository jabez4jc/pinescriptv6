# `line.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### line.all

Returns an array filled with all the current lines drawn by the script.

Type: `array<line>`

**Remarks**

The array is read-only. Index zero of the array is the ID of the oldest object on the chart.

```pine
//@version=6
indicator("line.all")
//delete all lines
line.new(bar_index - 10, close, bar_index, close)
a_allLines = line.all
if array.size(a_allLines) > 0
	for i = 0 to array.size(a_allLines) - 1
		line.delete(array.get(a_allLines, i))
```

**See also:** `line.new()`, `label.all`, `box.all`, `table.all`

## Functions

### line()

Casts na to line

```pine
line(x) → series line
```

**Arguments**

- `x` (series line): The value to convert to the specified type, usually `na`.

**Returns:** The value of the argument after casting to line.

**See also:** `float()`, `int()`, `bool()`, `color()`, `string()`, `label()`

### line.copy()

Clones the line object.

```pine
line.copy(id) → series line
```

**Arguments**

- `id` (series line): Line object.

**Returns:** New line ID object which may be passed to line.setXXX and line.getXXX functions.

```pine
//@version=6
indicator('Last 100 bars price range', overlay = true)
LOOKBACK = 100
highest = ta.highest(LOOKBACK)
lowest = ta.lowest(LOOKBACK)
if barstate.islastconfirmedhistory
	var lineTop = line.new(bar_index[LOOKBACK], highest, bar_index, highest, color = color.green)
	var lineBottom = line.copy(lineTop)
	line.set_y1(lineBottom, lowest)
	line.set_y2(lineBottom, lowest)
	line.set_color(lineBottom, color.red)
```

**See also:** `line.new()`, `line.delete()`

### line.delete()

Deletes the specified line object. If it has already been deleted, does nothing.

```pine
line.delete(id) → void
```

**Arguments**

- `id` (series line): Line object to delete.

**See also:** `line.new()`

### line.get_price()

Returns the price level of a line at a given bar index.

```pine
line.get_price(id, x) → series float
```

**Arguments**

- `id` (series line): Line object.
- `x` (series int): Bar index for which price is required.

**Returns:** Price value of line 'id' at bar index 'x'.

**Remarks**

The line is considered to have been created using 'extend=extend.both'.

This function can only be called for lines created using 'xloc.bar_index'. If you try to call it for a line created with 'xloc.bar_time', it will generate an error.

```pine
//@version=6
indicator("GetPrice", overlay=true)
var line l = na
if bar_index == 10
    l := line.new(0, high[5], bar_index, high)
plot(line.get_price(l, bar_index), color=color.green)
```

**See also:** `line.new()`

### line.get_x1()

Returns UNIX time or bar index (depending on the last xloc value set) of the first point of the line.

```pine
line.get_x1(id) → series int
```

**Arguments**

- `id` (series line): Line object.

**Returns:** UNIX timestamp (in milliseconds) or bar index.

```pine
//@version=6
indicator("line.get_x1")
my_line = line.new(time, open, time + 60 * 60 * 24, close, xloc=xloc.bar_time)
a = line.get_x1(my_line)
plot(time - line.get_x1(my_line)) //draws zero plot
```

**See also:** `line.new()`

### line.get_x2()

Returns UNIX time or bar index (depending on the last xloc value set) of the second point of the line.

```pine
line.get_x2(id) → series int
```

**Arguments**

- `id` (series line): Line object.

**Returns:** UNIX timestamp (in milliseconds) or bar index.

**See also:** `line.new()`

### line.get_y1()

Returns price of the first point of the line.

```pine
line.get_y1(id) → series float
```

**Arguments**

- `id` (series line): Line object.

**Returns:** Price value.

**See also:** `line.new()`

### line.get_y2()

Returns price of the second point of the line.

```pine
line.get_y2(id) → series float
```

**Arguments**

- `id` (series line): Line object.

**Returns:** Price value.

**See also:** `line.new()`

### line.new()

Creates new line object.

```pine
line.new(x1, y1, x2, y2, xloc, extend, color, style, width, force_overlay) → series line
line.new(first_point, second_point, xloc, extend, color, style, width, force_overlay) → series line
```

**Arguments**

- `x1` (series int): Bar index (if xloc = `xloc.bar_index`) or bar UNIX time (if xloc = `xloc.bar_time`) of the first point of the line. Note that objects positioned using `xloc.bar_index` cannot be drawn further than 500 bars into the future.
- `y1` (series int/float): Price of the first point of the line.
- `x2` (series int): Bar index (if xloc = `xloc.bar_index`) or bar UNIX time (if xloc = `xloc.bar_time`) of the second point of the line. Note that objects positioned using `xloc.bar_index` cannot be drawn further than 500 bars into the future.
- `y2` (series int/float): Price of the second point of the line.
- `xloc` (series string, optional): See description of **x1** argument. Possible values: `xloc.bar_index` and `xloc.bar_time`. Default is `xloc.bar_index`.
- `extend` (series string, optional): If extend=`extend.none`, draws segment starting at point (x1, y1) and ending at point (x2, y2). If extend is equal to `extend.right` or `extend.left`, draws a ray starting at point (x1, y1) or (x2, y2), respectively. If extend=`extend.both`, draws a straight line that goes through these points. Default value is `extend.none`.
- `color` (series color, optional): Line color.
- `style` (series string, optional): Line style. Possible values: `line.style_solid`, `line.style_dotted`, `line.style_dashed`, `line.style_arrow_left`, `line.style_arrow_right`, `line.style_arrow_both`.
- `width` (series int, optional): Line width in pixels.
- `force_overlay` (const bool, optional): If `true`, the drawing will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is `false`.
- `first_point` (chart.point): A `chart.point` object that specifies the line's starting coordinate.
- `second_point` (chart.point): A `chart.point` object that specifies the line's ending coordinate.

**Returns:** Line ID object which may be passed to line.setXXX and line.getXXX functions.

```pine
//@version=6
indicator("line.new")
var line1 = line.new(0, low, bar_index, high, extend=extend.right)
var line2 = line.new(time, open, time + 60 * 60 * 24, close, xloc=xloc.bar_time, style=line.style_dashed)
line.set_x2(line1, 0)
line.set_xloc(line1, time, time + 60 * 60 * 24, xloc.bar_time)
line.set_color(line2, color.green)
line.set_width(line2, 5)
```

**See also:** `line.delete()`, `line.set_x1()`, `line.set_y1()`, `line.set_xy1()`, `line.set_x2()`, `line.set_y2()`, `line.set_xy2()`, `line.set_xloc()`, `line.set_color()`, `line.set_extend()`, `line.set_style()`, `line.set_width()`

### line.set_color()

Sets the line color

```pine
line.set_color(id, color) → void
```

**Arguments**

- `id` (series line): Line object.
- `color` (series color): New line color

**See also:** `line.new()`

### line.set_extend()

Sets extending type of this line object. If extend=`extend.none`, draws segment starting at point (x1, y1) and ending at point (x2, y2). If extend is equal to `extend.right` or `extend.left`, draws a ray starting at point (x1, y1) or (x2, y2), respectively. If extend=`extend.both`, draws a straight line that goes through these points.

```pine
line.set_extend(id, extend) → void
```

**Arguments**

- `id` (series line): Line object.
- `extend` (series string): New extending type.

**See also:** `extend.none`, `extend.right`, `extend.left`, `extend.both`, `line.new()`

### line.set_first_point()

Sets the first point of the `id` line to `point`.

```pine
line.set_first_point(id, point) → void
```

**Arguments**

- `id` (series line): A `line` object.
- `point` (chart.point): A `chart.point` object.

### line.set_second_point()

Sets the second point of the `id` line to `point`.

```pine
line.set_second_point(id, point) → void
```

**Arguments**

- `id` (series line): A `line` object.
- `point` (chart.point): A `chart.point` object.

### line.set_style()

Sets the line style

```pine
line.set_style(id, style) → void
```

**Arguments**

- `id` (series line): Line object.
- `style` (series string): New line style.

**See also:** `line.style_solid`, `line.style_dotted`, `line.style_dashed`, `line.style_arrow_left`, `line.style_arrow_right`, `line.style_arrow_both`, `line.new()`

### line.set_width()

Sets the line width.

```pine
line.set_width(id, width) → void
```

**Arguments**

- `id` (series line): Line object.
- `width` (series int): New line width in pixels.

**See also:** `line.new()`

### line.set_x1()

Sets bar index or bar time (depending on the xloc) of the first point.

```pine
line.set_x1(id, x) → void
```

**Arguments**

- `id` (series line): Line object.
- `x` (series int): Bar index or bar time. Note that objects positioned using `xloc.bar_index` cannot be drawn further than 500 bars into the future.

**See also:** `line.new()`

### line.set_x2()

Sets bar index or bar time (depending on the xloc) of the second point.

```pine
line.set_x2(id, x) → void
```

**Arguments**

- `id` (series line): Line object.
- `x` (series int): Bar index or bar time. Note that objects positioned using `xloc.bar_index` cannot be drawn further than 500 bars into the future.

**See also:** `line.new()`

### line.set_xloc()

Sets x-location and new bar index/time values.

```pine
line.set_xloc(id, x1, x2, xloc) → void
```

**Arguments**

- `id` (series line): Line object.
- `x1` (series int): Bar index or bar time of the first point.
- `x2` (series int): Bar index or bar time of the second point.
- `xloc` (series string): New x-location value.

**See also:** `xloc.bar_index`, `xloc.bar_time`, `line.new()`

### line.set_xy1()

Sets bar index/time and price of the first point.

```pine
line.set_xy1(id, x, y) → void
```

**Arguments**

- `id` (series line): Line object.
- `x` (series int): Bar index or bar time. Note that objects positioned using `xloc.bar_index` cannot be drawn further than 500 bars into the future.
- `y` (series int/float): Price.

**See also:** `line.new()`

### line.set_xy2()

Sets bar index/time and price of the second point

```pine
line.set_xy2(id, x, y) → void
```

**Arguments**

- `id` (series line): Line object.
- `x` (series int): Bar index or bar time.
- `y` (series int/float): Price.

**See also:** `line.new()`

### line.set_y1()

Sets price of the first point

```pine
line.set_y1(id, y) → void
```

**Arguments**

- `id` (series line): Line object.
- `y` (series int/float): Price.

**See also:** `line.new()`

### line.set_y2()

Sets price of the second point.

```pine
line.set_y2(id, y) → void
```

**Arguments**

- `id` (series line): Line object.
- `y` (series int/float): Price.

**See also:** `line.new()`
