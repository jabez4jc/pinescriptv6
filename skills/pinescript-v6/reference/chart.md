# `chart.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### chart.bg_color

Returns the color of the chart's background from the "Chart settings/Appearance/Background" field. When a gradient is selected, the middle point of the gradient is returned.

Type: `input color`

**See also:** `chart.fg_color`

### chart.fg_color

Returns a color providing optimal contrast with `chart.bg_color`.

Type: `input color`

**See also:** `chart.bg_color`

### chart.is_heikinashi

Type: `simple bool`

**Returns:** Returns `true` if the chart type is Heikin Ashi, `false` otherwise.

**See also:** `chart.is_renko`, `chart.is_linebreak`, `chart.is_kagi`, `chart.is_pnf`, `chart.is_range`

### chart.is_kagi

Type: `simple bool`

**Returns:** Returns `true` if the chart type is Kagi, `false` otherwise.

**See also:** `chart.is_renko`, `chart.is_linebreak`, `chart.is_heikinashi`, `chart.is_pnf`, `chart.is_range`

### chart.is_linebreak

Type: `simple bool`

**Returns:** Returns `true` if the chart type is Line break, `false` otherwise.

**See also:** `chart.is_renko`, `chart.is_heikinashi`, `chart.is_kagi`, `chart.is_pnf`, `chart.is_range`

### chart.is_pnf

Type: `simple bool`

**Returns:** Returns `true` if the chart type is Point & figure, `false` otherwise.

**See also:** `chart.is_renko`, `chart.is_linebreak`, `chart.is_kagi`, `chart.is_heikinashi`, `chart.is_range`

### chart.is_range

Type: `simple bool`

**Returns:** Returns `true` if the chart type is Range, `false` otherwise.

**See also:** `chart.is_renko`, `chart.is_linebreak`, `chart.is_kagi`, `chart.is_pnf`, `chart.is_heikinashi`

### chart.is_renko

Type: `simple bool`

**Returns:** Returns `true` if the chart type is Renko, `false` otherwise.

**See also:** `chart.is_heikinashi`, `chart.is_linebreak`, `chart.is_kagi`, `chart.is_pnf`, `chart.is_range`

### chart.is_standard

Type: `simple bool`

**Returns:** Returns `true` if the chart type is not one of the following: Renko, Kagi, Line break, Point & figure, Range, Heikin Ashi; `false` otherwise.

**See also:** `chart.is_renko`, `chart.is_linebreak`, `chart.is_kagi`, `chart.is_pnf`, `chart.is_range`, `chart.is_heikinashi`

### chart.left_visible_bar_time

The `time` of the leftmost bar currently visible on the chart.

Type: `input int`

**Remarks**

Scripts using this variable will automatically re-execute when its value updates to reflect changes in the chart, which can be caused by users scrolling the chart, or new real-time bars.

Alerts created on a script that includes this variable will only use the value assigned to the variable at the moment of the alert's creation, regardless of whether the value changes afterward, which may lead to repainting.

**See also:** `chart.right_visible_bar_time`

### chart.right_visible_bar_time

The `time` of the rightmost bar currently visible on the chart.

Type: `input int`

**Remarks**

Scripts using this variable will automatically re-execute when its value updates to reflect changes in the chart, which can be caused by users scrolling the chart, or new real-time bars.

Alerts created on a script that includes this variable will only use the value assigned to the variable at the moment of the alert's creation, regardless of whether the value changes afterward, which may lead to repainting.

**See also:** `chart.left_visible_bar_time`

## Functions

### chart.point.copy()

Creates a copy of a `chart.point` object with the specified `id`.

```pine
chart.point.copy(id) → chart.point
```

**Arguments**

- `id` (chart.point): A `chart.point` object.

### chart.point.from_index()

Returns a `chart.point` object with `index` as its x-coordinate and `price` as its y-coordinate.

```pine
chart.point.from_index(index, price) → chart.point
```

**Arguments**

- `index` (series int): The x-coordinate of the point, expressed as a bar index value.
- `price` (series int/float): The y-coordinate of the point.

**Remarks**

The `time` field values of `chart.point` instances returned from this function will be `na`, meaning drawing objects with `xloc` values set to `xloc.bar_time` will not work with them.

### chart.point.from_time()

Returns a `chart.point` object with `time` as its x-coordinate and `price` as its y-coordinate.

```pine
chart.point.from_time(time, price) → chart.point
```

**Arguments**

- `time` (series int): The x-coordinate of the point, expressed as a UNIX time value, in milliseconds.
- `price` (series int/float): The y-coordinate of the point.

**Remarks**

The `index` field values of `chart.point` instances returned from this function will be `na`, meaning drawing objects with `xloc` values set to `xloc.bar_index` will not work with them.

### chart.point.new()

Creates a new `chart.point` object with the specified `time`, `index`, and `price`.

```pine
chart.point.new(time, index, price) → chart.point
```

**Arguments**

- `time` (series int): The x-coordinate of the point, expressed as a UNIX time value, in milliseconds.
- `index` (series int): The x-coordinate of the point, expressed as a bar index value.
- `price` (series int/float): The y-coordinate of the point.

**Remarks**

Whether a drawing object uses a point's `time` or `index` field as an x-coordinate depends on the `xloc` type used in the function call that returned the drawing.

It's important to note that this function does not verify that the `time` and `index` values refer to the same bar.

**See also:** `polyline.new()`

### chart.point.now()

Returns a `chart.point` object with `price` as the y-coordinate

```pine
chart.point.now(price) → chart.point
```

**Arguments**

- `price` (series int/float, optional): The y-coordinate of the point. Optional. The default is `close`.

**Remarks**

The `chart.point` instance returned from this function records values for its `index` and `time` fields on the bar it executed on, making it suitable for use with drawing objects of any `xloc` type.
