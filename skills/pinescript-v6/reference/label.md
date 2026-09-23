# `label.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### label.all

Returns an array filled with all the current labels drawn by the script.

Type: `array<label>`

**Remarks**

The array is read-only. Index zero of the array is the ID of the oldest object on the chart.

```pine
//@version=6
indicator("label.all")
//delete all labels
label.new(bar_index, close)
a_allLabels = label.all
if array.size(a_allLabels) > 0
	for i = 0 to array.size(a_allLabels) - 1
		label.delete(array.get(a_allLabels, i))
```

**See also:** `label.new()`, `line.all`, `box.all`, `table.all`

## Functions

### label()

Casts na to label

```pine
label(x) → series label
```

**Arguments**

- `x` (series label): The value to convert to the specified type, usually `na`.

**Returns:** The value of the argument after casting to label.

**See also:** `float()`, `int()`, `bool()`, `color()`, `string()`, `line()`

### label.copy()

Clones the label object.

```pine
label.copy(id) → series label
```

**Arguments**

- `id` (series label): Label object.

**Returns:** New label ID object which may be passed to label.setXXX and label.getXXX functions.

```pine
//@version=6
indicator('Last 100 bars highest/lowest', overlay = true)
LOOKBACK = 100
highest = ta.highest(LOOKBACK)
highestBars = ta.highestbars(LOOKBACK)
lowest = ta.lowest(LOOKBACK)
lowestBars = ta.lowestbars(LOOKBACK)
if barstate.islastconfirmedhistory
	var labelHigh = label.new(bar_index + highestBars, highest, str.tostring(highest), color = color.green)
	var labelLow = label.copy(labelHigh)
	label.set_xy(labelLow, bar_index + lowestBars, lowest)
	label.set_text(labelLow, str.tostring(lowest))
	label.set_color(labelLow, color.red)
	label.set_style(labelLow, label.style_label_up)
```

**See also:** `label.new()`, `label.delete()`

### label.delete()

Deletes the specified label object. If it has already been deleted, does nothing.

```pine
label.delete(id) → void
```

**Arguments**

- `id` (series label): Label object to delete.

**See also:** `label.new()`

### label.get_text()

Returns the text of this label object.

```pine
label.get_text(id) → series string
```

**Arguments**

- `id` (series label): Label object.

**Returns:** String object containing the text of this label.

```pine
//@version=6
indicator("label.get_text")
my_label = label.new(time, open, text="Open bar text", xloc=xloc.bar_time)
a = label.get_text(my_label)
label.new(time, close, text = a + " new", xloc=xloc.bar_time)
```

**See also:** `label.new()`

### label.get_x()

Returns UNIX time or bar index (depending on the last xloc value set) of this label's position.

```pine
label.get_x(id) → series int
```

**Arguments**

- `id` (series label): Label object.

**Returns:** UNIX timestamp (in milliseconds) or bar index.

```pine
//@version=6
indicator("label.get_x")
my_label = label.new(time, open, text="Open bar text", xloc=xloc.bar_time)
a = label.get_x(my_label)
plot(time - label.get_x(my_label)) //draws zero plot
```

**See also:** `label.new()`

### label.get_y()

Returns price of this label's position.

```pine
label.get_y(id) → series float
```

**Arguments**

- `id` (series label): Label object.

**Returns:** Floating point value representing price.

**See also:** `label.new()`

### label.new()

Creates new label object.

```pine
label.new(point, text, xloc, yloc, color, style, textcolor, size, textalign, tooltip, text_font_family, force_overlay, text_formatting) → series label
label.new(x, y, text, xloc, yloc, color, style, textcolor, size, textalign, tooltip, text_font_family, force_overlay, text_formatting) → series label
```

**Arguments**

- `point` (chart.point): A `chart.point` object that specifies the label's location.
- `text` (series string, optional): Label text. Default is empty string.
- `xloc` (series string, optional): See description of **x** argument. Possible values: `xloc.bar_index` and `xloc.bar_time`. Default is `xloc.bar_index`.
- `yloc` (series string, optional): Possible values are `yloc.price`, `yloc.abovebar`, `yloc.belowbar`. If yloc=`yloc.price`, **y** argument specifies the price of the label position. If yloc=`yloc.abovebar`, label is located above bar. If yloc=`yloc.belowbar`, label is located below bar. Default is `yloc.price`.
- `color` (series color, optional): Color of the label border and arrow
- `style` (series string, optional): Label style. Possible values: `label.style_none`, `label.style_xcross`, `label.style_cross`, `label.style_triangleup`, `label.style_triangledown`, `label.style_flag`, `label.style_circle`, `label.style_arrowup`, `label.style_arrowdown`, `label.style_label_up`, `label.style_label_down`, `label.style_label_left`, `label.style_label_right`, `label.style_label_lower_left`, `label.style_label_lower_right`, `label.style_label_upper_left`, `label.style_label_upper_right`, `label.style_label_center`, `label.style_square`, `label.style_diamond`, `label.style_text_outline`. Default is `label.style_label_down`.
- `textcolor` (series color, optional): Text color.
- `size` (series int/string, optional): Optional. Size of the label. Accepts a positive `int` value or one of the built-in `size.*` constants. The constants and their equivalent numeric sizes are: `size.auto` (0), `size.tiny` (\~7), `size.small` (\~10), `size.normal` (12), `size.large` (18), `size.huge` (24). The default value is `size.normal`, which represents the numeric size of 12.
- `textalign` (series string, optional): Label text alignment. Possible values: `text.align_left`, `text.align_center`, `text.align_right`. Default value is `text.align_center`.
- `tooltip` (series string, optional): Hover to see tooltip label.
- `text_font_family` (series string, optional): The font family of the text. Optional. The default value is `font.family_default`. Possible values: `font.family_default`, `font.family_monospace`.
- `force_overlay` (const bool, optional): If `true`, the drawing will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is `false`.
- `text_formatting` (series text_format, optional): The formatting of the displayed text. Formatting options support addition. For example, `text.format_bold + text.format_italic` will make the text both bold and italicized. Possible values: `text.format_none`, `text.format_bold`, `text.format_italic`. Optional. The default is `text.format_none`.
- `x` (series int): Bar index (if xloc = `xloc.bar_index`) or bar UNIX time (if xloc = `xloc.bar_time`) of the label position. Note that objects positioned using `xloc.bar_index` cannot be drawn further than 500 bars into the future.
- `y` (series int/float): Price of the label position. It is taken into account only if yloc=`yloc.price`.

**Returns:** Label ID object which may be passed to label.setXXX and label.getXXX functions.

```pine
//@version=6
indicator("label.new")
var label1 = label.new(bar_index, low, text="Hello, world!", style=label.style_circle)
label.set_x(label1, 0)
label.set_xloc(label1, time, xloc.bar_time)
label.set_color(label1, color.red)
label.set_size(label1, size.large)
```

**See also:** `label.delete()`, `label.set_x()`, `label.set_y()`, `label.set_xy()`, `label.set_xloc()`, `label.set_yloc()`, `label.set_color()`, `label.set_textcolor()`, `label.set_style()`, `label.set_size()`, `label.set_textalign()`, `label.set_tooltip()`, `label.set_text()`, `label.set_text_formatting()`

### label.set_color()

Sets label border and arrow color.

```pine
label.set_color(id, color) → void
```

**Arguments**

- `id` (series label): Label object.
- `color` (series color): New label border and arrow color.

**See also:** `label.new()`

### label.set_point()

Sets the location of the `id` label to `point`.

```pine
label.set_point(id, point) → void
```

**Arguments**

- `id` (series label): A `label` object.
- `point` (chart.point): A `chart.point` object.

### label.set_size()

Sets arrow and text size of the specified label object.

```pine
label.set_size(id, size) → void
```

**Arguments**

- `id` (series label): Label object.
- `size` (series int/string): Size of the label. Accepts a positive `int` value or one of the built-in `size.*` constants. The constants and their equivalent numeric sizes are: `size.auto` (0), `size.tiny` (\~7), `size.small` (\~10), `size.normal` (12), `size.large` (18), `size.huge` (24). The default value is `size.normal`, which represents the numeric size of 12.

**See also:** `size.auto`, `size.tiny`, `size.small`, `size.normal`, `size.large`, `size.huge`, `label.new()`

### label.set_style()

Sets label style.

```pine
label.set_style(id, style) → void
```

**Arguments**

- `id` (series label): Label object.
- `style` (series string): New label style. Possible values: `label.style_none`, `label.style_xcross`, `label.style_cross`, `label.style_triangleup`, `label.style_triangledown`, `label.style_flag`, `label.style_circle`, `label.style_arrowup`, `label.style_arrowdown`, `label.style_label_up`, `label.style_label_down`, `label.style_label_left`, `label.style_label_right`, `label.style_label_lower_left`, `label.style_label_lower_right`, `label.style_label_upper_left`, `label.style_label_upper_right`, `label.style_label_center`, `label.style_square`, `label.style_diamond`, `label.style_text_outline`.

**See also:** `label.new()`

### label.set_text()

Sets label text

```pine
label.set_text(id, text) → void
```

**Arguments**

- `id` (series label): Label object.
- `text` (series string): New label text.

**See also:** `label.new()`, `label.set_text_formatting()`

### label.set_text_font_family()

The function sets the font family of the text inside the label.

```pine
label.set_text_font_family(id, text_font_family) → void
```

**Arguments**

- `id` (series label): A label object.
- `text_font_family` (series string): The font family of the text. Possible values: `font.family_default`, `font.family_monospace`.

```pine
//@version=6
indicator("Example of setting the label font")
if barstate.islastconfirmedhistory
    l = label.new(bar_index, 0, "monospace", yloc=yloc.abovebar)
    label.set_text_font_family(l, font.family_monospace)
```

**See also:** `label.new()`, `font.family_default`, `font.family_monospace`

### label.set_text_formatting()

Sets the formatting attributes the drawing applies to displayed text.

```pine
label.set_text_formatting(id, text_formatting) → void
```

**Arguments**

- `id` (series label): Label object.
- `text_formatting` (series text_format): The formatting of the displayed text. Formatting options support addition. For example, `text.format_bold + text.format_italic` will make the text both bold and italicized. Possible values: `text.format_none`, `text.format_bold`, `text.format_italic`. Optional. The default is `text.format_none`.

**See also:** `label.new()`, `label.set_text()`

### label.set_textalign()

Sets the alignment for the label text.

```pine
label.set_textalign(id, textalign) → void
```

**Arguments**

- `id` (series label): Label object.
- `textalign` (series string): Label text alignment. Possible values: `text.align_left`, `text.align_center`, `text.align_right`.

**See also:** `text.align_left`, `text.align_center`, `text.align_right`, `label.new()`

### label.set_textcolor()

Sets color of the label text.

```pine
label.set_textcolor(id, textcolor) → void
```

**Arguments**

- `id` (series label): Label object.
- `textcolor` (series color): New text color.

**See also:** `label.new()`

### label.set_tooltip()

Sets the tooltip text.

```pine
label.set_tooltip(id, tooltip) → void
```

**Arguments**

- `id` (series label): Label object.
- `tooltip` (series string): Tooltip text.

**See also:** `label.new()`

### label.set_x()

Sets bar index or bar time (depending on the xloc) of the label position.

```pine
label.set_x(id, x) → void
```

**Arguments**

- `id` (series label): Label object.
- `x` (series int): New bar index or bar time of the label position. Note that objects positioned using `xloc.bar_index` cannot be drawn further than 500 bars into the future.

**See also:** `label.new()`

### label.set_xloc()

Sets x-location and new bar index/time value.

```pine
label.set_xloc(id, x, xloc) → void
```

**Arguments**

- `id` (series label): Label object.
- `x` (series int): New bar index or bar time of the label position.
- `xloc` (series string): New x-location value.

**See also:** `xloc.bar_index`, `xloc.bar_time`, `label.new()`

### label.set_xy()

Sets bar index/time and price of the label position.

```pine
label.set_xy(id, x, y) → void
```

**Arguments**

- `id` (series label): Label object.
- `x` (series int): New bar index or bar time of the label position. Note that objects positioned using `xloc.bar_index` cannot be drawn further than 500 bars into the future.
- `y` (series int/float): New price of the label position.

**See also:** `label.new()`

### label.set_y()

Sets price of the label position

```pine
label.set_y(id, y) → void
```

**Arguments**

- `id` (series label): Label object.
- `y` (series int/float): New price of the label position.

**See also:** `label.new()`

### label.set_yloc()

Sets new y-location calculation algorithm.

```pine
label.set_yloc(id, yloc) → void
```

**Arguments**

- `id` (series label): Label object.
- `yloc` (series string): New y-location value.

**See also:** `yloc.price`, `yloc.abovebar`, `yloc.belowbar`, `label.new()`
