# `box.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### box.all

Returns an array filled with all the current boxes drawn by the script.

Type: `array<box>`

**Remarks**

The array is read-only. Index zero of the array is the ID of the oldest object on the chart.

```pine
//@version=6
indicator("box.all")
//delete all boxes
box.new(time, open, time + 60 * 60 * 24, close, xloc=xloc.bar_time, border_style=line.style_dashed)
a_allBoxes = box.all
if array.size(a_allBoxes) > 0
	for i = 0 to array.size(a_allBoxes) - 1
		box.delete(array.get(a_allBoxes, i))
```

**See also:** `box.new()`, `line.all`, `label.all`, `table.all`

## Functions

### box()

Casts na to box.

```pine
box(x) → series box
```

**Arguments**

- `x` (series box): The value to convert to the specified type, usually `na`.

**Returns:** The value of the argument after casting to box.

**See also:** `float()`, `int()`, `bool()`, `color()`, `string()`, `line()`, `label()`

### box.copy()

Clones the box object.

```pine
box.copy(id) → series box
```

**Arguments**

- `id` (series box): Box object.

```pine
//@version=6
indicator('Last 50 bars price ranges', overlay = true)
LOOKBACK = 50
highest = ta.highest(LOOKBACK)
lowest = ta.lowest(LOOKBACK)
if barstate.islastconfirmedhistory
	var BoxLast = box.new(bar_index[LOOKBACK], highest, bar_index, lowest, bgcolor = color.new(color.green, 80))
	var BoxPrev = box.copy(BoxLast)
	box.set_lefttop(BoxPrev, bar_index[LOOKBACK * 2], highest[50])
	box.set_rightbottom(BoxPrev, bar_index[LOOKBACK], lowest[50])
	box.set_bgcolor(BoxPrev, color.new(color.red, 80))
```

**See also:** `box.new()`, `box.delete()`

### box.delete()

Deletes the specified box object. If it has already been deleted, does nothing.

```pine
box.delete(id) → void
```

**Arguments**

- `id` (series box): A box object to delete.

**See also:** `box.new()`

### box.get_bottom()

Returns the price value of the bottom border of the box.

```pine
box.get_bottom(id) → series float
```

**Arguments**

- `id` (series box): A box object.

**Returns:** The price value.

**See also:** `box.new()`, `box.set_bottom()`

### box.get_left()

Returns the bar index or the UNIX time (depending on the last value used for 'xloc') of the left border of the box.

```pine
box.get_left(id) → series int
```

**Arguments**

- `id` (series box): A box object.

**Returns:** A bar index or a UNIX timestamp (in milliseconds).

**See also:** `box.new()`, `box.set_left()`

### box.get_right()

Returns the bar index or the UNIX time (depending on the last value used for 'xloc') of the right border of the box.

```pine
box.get_right(id) → series int
```

**Arguments**

- `id` (series box): A box object.

**Returns:** A bar index or a UNIX timestamp (in milliseconds).

**See also:** `box.new()`, `box.set_right()`

### box.get_top()

Returns the price value of the top border of the box.

```pine
box.get_top(id) → series float
```

**Arguments**

- `id` (series box): A box object.

**Returns:** The price value.

**See also:** `box.new()`, `box.set_top()`

### box.new()

Creates a new box object.

```pine
box.new(top_left, bottom_right, border_color, border_width, border_style, extend, xloc, bgcolor, text, text_size, text_color, text_halign, text_valign, text_wrap, text_font_family, force_overlay, text_formatting) → series box
box.new(left, top, right, bottom, border_color, border_width, border_style, extend, xloc, bgcolor, text, text_size, text_color, text_halign, text_valign, text_wrap, text_font_family, force_overlay, text_formatting) → series box
```

**Arguments**

- `top_left` (chart.point): A `chart.point` object that specifies the top-left corner location of the box.
- `bottom_right` (chart.point): A `chart.point` object that specifies the bottom-right corner location of the box.
- `border_color` (series color, optional): Color of the four borders. Optional. The default is `color.blue`.
- `border_width` (series int, optional): Width of the four borders, in pixels. Optional. The default is 1 pixel.
- `border_style` (series string, optional): Style of the four borders. Possible values: `line.style_solid`, `line.style_dotted`, `line.style_dashed`. Optional. The default value is `line.style_solid`.
- `extend` (series string, optional): When `extend.none` is used, the horizontal borders start at the left border and end at the right border. With `extend.left` or `extend.right`, the horizontal borders are extended indefinitely to the left or right of the box, respectively. With `extend.both`, the horizontal borders are extended on both sides. Optional. The default value is `extend.none`.
- `xloc` (series string, optional): Determines whether the arguments to 'left' and 'right' are a bar index or a time value. If xloc = `xloc.bar_index`, the arguments must be a bar index. If xloc = `xloc.bar_time`, the arguments must be a UNIX time. Possible values: `xloc.bar_index` and `xloc.bar_time`. Optional. The default is `xloc.bar_index`.
- `bgcolor` (series color, optional): Background color of the box. Optional. The default is `color.blue`.
- `text` (series string, optional): The text to be displayed inside the box. Optional. The default is empty string.
- `text_size` (series int/string, optional): Optional. Size of the box's text. The size can be any positive integer, or one of the `size.*` built-in constant strings. The constant strings and their equivalent integer values are: `size.auto` (0), `size.tiny` (8), `size.small` (10), `size.normal` (14), `size.large` (20), `size.huge` (36). The default value is `size.auto` or 0.
- `text_color` (series color, optional): The color of the text. Optional. The default is `color.black`.
- `text_halign` (series string, optional): The horizontal alignment of the box's text. Optional. The default value is `text.align_center`. Possible values: `text.align_left`, `text.align_center`, `text.align_right`.
- `text_valign` (series string, optional): The vertical alignment of the box's text. Optional. The default value is `text.align_center`. Possible values: `text.align_top`, `text.align_center`, `text.align_bottom`.
- `text_wrap` (series string, optional): Optional. Whether to wrap text. Wrapped text starts a new line when it reaches the side of the box. Wrapped text lower than the bottom of the box is not displayed. Unwrapped text stays on a single line and *is displayed* past the width of the box if it is too long. If the `text_size` is 0 or `text.wrap_auto`, this setting has no effect. The default value is `text.wrap_none`. Possible values: `text.wrap_none`, `text.wrap_auto`.
- `text_font_family` (series string, optional): The font family of the text. Optional. The default value is `font.family_default`. Possible values: `font.family_default`, `font.family_monospace`.
- `force_overlay` (const bool, optional): If `true`, the drawing will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is `false`.
- `text_formatting` (series text_format, optional): The formatting of the displayed text. Formatting options support addition. For example, `text.format_bold + text.format_italic` will make the text both bold and italicized. Possible values: `text.format_none`, `text.format_bold`, `text.format_italic`. Optional. The default is `text.format_none`.
- `left` (series int): Bar index (if xloc = `xloc.bar_index`) or UNIX time (if xloc = `xloc.bar_time`) of the left border of the box. Note that objects positioned using `xloc.bar_index` cannot be drawn further than 500 bars into the future.
- `top` (series int/float): Price of the top border of the box.
- `right` (series int): Bar index (if xloc = `xloc.bar_index`) or UNIX time (if xloc = `xloc.bar_time`) of the right border of the box. Note that objects positioned using `xloc.bar_index` cannot be drawn further than 500 bars into the future.
- `bottom` (series int/float): Price of the bottom border of the box.

**Returns:** The ID of a box object which may be used in box.set_*() and box.get_*() functions.

```pine
//@version=6
indicator("box.new")
var b = box.new(time, open, time + 60 * 60 * 24, close, xloc=xloc.bar_time, border_style=line.style_dashed)
box.set_lefttop(b, time, 100)
box.set_rightbottom(b, time + 60 * 60 * 24, 500)
box.set_bgcolor(b, color.green)
```

**See also:** `box.delete()`, `box.get_left()`, `box.get_top()`, `box.get_right()`, `box.get_bottom()`, `box.set_top_left_point()`, `box.set_left()`, `box.set_top()`, `box.set_bottom_right_point()`, `box.set_right()`, `box.set_bottom()`, `box.set_border_color()`, `box.set_bgcolor()`, `box.set_border_width()`, `box.set_border_style()`, `box.set_extend()`, `box.set_text()`, `box.set_text_formatting()`, `box.set_xloc()`

### box.set_bgcolor()

Sets the background color of the box.

```pine
box.set_bgcolor(id, color) → void
```

**Arguments**

- `id` (series box): A box object.
- `color` (series color): New background color.

**See also:** `box.new()`

### box.set_border_color()

Sets the border color of the box.

```pine
box.set_border_color(id, color) → void
```

**Arguments**

- `id` (series box): A box object.
- `color` (series color): New border color.

**See also:** `box.new()`

### box.set_border_style()

Sets the border style of the box.

```pine
box.set_border_style(id, style) → void
```

**Arguments**

- `id` (series box): A box object.
- `style` (series string): New border style.

**See also:** `box.new()`, `line.style_solid`, `line.style_dotted`, `line.style_dashed`

### box.set_border_width()

Sets the border width of the box.

```pine
box.set_border_width(id, width) → void
```

**Arguments**

- `id` (series box): A box object.
- `width` (series int): Width of the four borders, in pixels.

**See also:** `box.new()`

### box.set_bottom()

Sets the bottom coordinate of the box.

```pine
box.set_bottom(id, bottom) → void
```

**Arguments**

- `id` (series box): A box object.
- `bottom` (series int/float): Price value of the bottom border.

**See also:** `box.new()`, `box.get_bottom()`

### box.set_bottom_right_point()

Sets the bottom-right corner location of the `id` box to `point`.

```pine
box.set_bottom_right_point(id, point) → void
```

**Arguments**

- `id` (series box): A `box` object.
- `point` (chart.point): A `chart.point` object.

### box.set_extend()

Sets extending type of the border of this box object. When `extend.none` is used, the horizontal borders start at the left border and end at the right border. With `extend.left` or `extend.right`, the horizontal borders are extended indefinitely to the left or right of the box, respectively. With `extend.both`, the horizontal borders are extended on both sides.

```pine
box.set_extend(id, extend) → void
```

**Arguments**

- `id` (series box): A box object.
- `extend` (series string): New extending type.

**See also:** `box.new()`, `extend.none`, `extend.right`, `extend.left`, `extend.both`

### box.set_left()

Sets the left coordinate of the box.

```pine
box.set_left(id, left) → void
```

**Arguments**

- `id` (series box): A box object.
- `left` (series int): Bar index or bar time of the left border. Note that objects positioned using `xloc.bar_index` cannot be drawn further than 500 bars into the future.

**See also:** `box.new()`, `box.get_left()`

### box.set_lefttop()

Sets the left and top coordinates of the box.

```pine
box.set_lefttop(id, left, top) → void
```

**Arguments**

- `id` (series box): A box object.
- `left` (series int): Bar index or bar time of the left border.
- `top` (series int/float): Price value of the top border.

**See also:** `box.new()`, `box.get_left()`, `box.get_top()`

### box.set_right()

Sets the right coordinate of the box.

```pine
box.set_right(id, right) → void
```

**Arguments**

- `id` (series box): A box object.
- `right` (series int): Bar index or bar time of the right border. Note that objects positioned using `xloc.bar_index` cannot be drawn further than 500 bars into the future.

**See also:** `box.new()`, `box.get_right()`

### box.set_rightbottom()

Sets the right and bottom coordinates of the box.

```pine
box.set_rightbottom(id, right, bottom) → void
```

**Arguments**

- `id` (series box): A box object.
- `right` (series int): Bar index or bar time of the right border.
- `bottom` (series int/float): Price value of the bottom border.

**See also:** `box.new()`, `box.get_right()`, `box.get_bottom()`

### box.set_text()

The function sets the text in the box.

```pine
box.set_text(id, text) → void
```

**Arguments**

- `id` (series box): A box object.
- `text` (series string): The text to be displayed inside the box.

**See also:** `box.set_text_color()`, `box.set_text_size()`, `box.set_text_valign()`, `box.set_text_halign()`, `box.set_text_formatting()`

### box.set_text_color()

The function sets the color of the text inside the box.

```pine
box.set_text_color(id, text_color) → void
```

**Arguments**

- `id` (series box): A box object.
- `text_color` (series color): The color of the text.

**See also:** `box.set_text()`, `box.set_text_size()`, `box.set_text_valign()`, `box.set_text_halign()`

### box.set_text_font_family()

The function sets the font family of the text inside the box.

```pine
box.set_text_font_family(id, text_font_family) → void
```

**Arguments**

- `id` (series box): A box object.
- `text_font_family` (series string): The font family of the text. Possible values: `font.family_default`, `font.family_monospace`.

```pine
//@version=6
indicator("Example of setting the box font")
if barstate.islastconfirmedhistory
    b = box.new(bar_index, open-ta.tr, bar_index-50, open-ta.tr*5, text="monospace")
    box.set_text_font_family(b, font.family_monospace)
```

**See also:** `box.new()`, `font.family_default`, `font.family_monospace`

### box.set_text_formatting()

Sets the formatting attributes the drawing applies to displayed text.

```pine
box.set_text_formatting(id, text_formatting) → void
```

**Arguments**

- `id` (series box): A box object.
- `text_formatting` (series text_format): The formatting of the displayed text. Formatting options support addition. For example, `text.format_bold + text.format_italic` will make the text both bold and italicized. Possible values: `text.format_none`, `text.format_bold`, `text.format_italic`. Optional. The default is `text.format_none`.

**See also:** `box.set_text_color()`, `box.set_text_size()`, `box.set_text_valign()`, `box.set_text_halign()`, `box.set_text()`

### box.set_text_halign()

The function sets the horizontal alignment of the box's text.

```pine
box.set_text_halign(id, text_halign) → void
```

**Arguments**

- `id` (series box): A box object.
- `text_halign` (series string): The horizontal alignment of a box's text. Possible values: `text.align_left`, `text.align_center`, `text.align_right`.

**See also:** `box.set_text()`, `box.set_text_size()`, `box.set_text_valign()`, `box.set_text_color()`

### box.set_text_size()

The function sets the size of the box's text.

```pine
box.set_text_size(id, text_size) → void
```

**Arguments**

- `id` (series box): A box object.
- `text_size` (series int/string): Size of the box's text. The size can be any positive integer, or one of the `size.*` built-in constant strings. The constant strings and their equivalent integer values are: `size.auto` (0), `size.tiny` (8), `size.small` (10), `size.normal` (14), `size.large` (20), `size.huge` (36).

**See also:** `box.set_text()`, `box.set_text_color()`, `box.set_text_valign()`, `box.set_text_halign()`

### box.set_text_valign()

The function sets the vertical alignment of a box's text.

```pine
box.set_text_valign(id, text_valign) → void
```

**Arguments**

- `id` (series box): A box object.
- `text_valign` (series string): The vertical alignment of the box's text. Possible values: `text.align_top`, `text.align_center`, `text.align_bottom`.

**See also:** `box.set_text()`, `box.set_text_size()`, `box.set_text_color()`, `box.set_text_halign()`

### box.set_text_wrap()

The function sets the mode of wrapping of the text inside the box.

```pine
box.set_text_wrap(id, text_wrap) → void
```

**Arguments**

- `id` (series box): A box object.
- `text_wrap` (series string): Whether to wrap text. Wrapped text starts a new line when it reaches the side of the box. Wrapped text lower than the bottom of the box is not displayed. Unwrapped text stays on a single line and *is displayed* past the width of the box if it is too long. If the `text_size` is 0 or `text.wrap_auto`, this setting has no effect. Possible values: `text.wrap_none`, `text.wrap_auto`.

**See also:** `box.set_text()`, `box.set_text_size()`, `box.set_text_valign()`, `box.set_text_halign()`, `box.set_text_color()`

### box.set_top()

Sets the top coordinate of the box.

```pine
box.set_top(id, top) → void
```

**Arguments**

- `id` (series box): A box object.
- `top` (series int/float): Price value of the top border.

**See also:** `box.new()`, `box.get_top()`

### box.set_top_left_point()

Sets the top-left corner location of the `id` box to `point`.

```pine
box.set_top_left_point(id, point) → void
```

**Arguments**

- `id` (series box): A `box` object.
- `point` (chart.point): A `chart.point` object.

### box.set_xloc()

Sets the left and right borders of a `box` and updates its `xloc` property.

```pine
box.set_xloc(id, left, right, xloc) → void
```

**Arguments**

- `id` (series box): The ID of the box object to update.
- `left` (series int): The bar index or timestamp for the left border of the box.
- `right` (series int): The bar index or timestamp for the right border of the box.
- `xloc` (series string): Determines whether the box treats the `left` and `right` arguments as bar indices or timestamps. Possible values: `xloc.bar_index` and `xloc.bar_time`. If the value is `xloc.bar_index`, the arguments represent bar indices. If `xloc.bar_time`, the arguments represent [UNIX timestamps](../concepts/time.md#unix-timestamps).

**See also:** `box.new()`, `xloc.bar_index`, `xloc.bar_time`
