# `linefill.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### linefill.all

Returns an array filled with all the current linefill objects drawn by the script.

Type: `array<linefill>`

**Remarks**

The array is read-only. Index zero of the array is the ID of the oldest object on the chart.

## Functions

### linefill()

Casts na to linefill.

```pine
linefill(x) → series linefill
```

**Arguments**

- `x` (series linefill): The value to convert to the specified type, usually `na`.

**Returns:** The value of the argument after casting to linefill.

**See also:** `float()`, `int()`, `bool()`, `color()`, `string()`, `line()`, `label()`

### linefill.delete()

Deletes the specified linefill object. If it has already been deleted, does nothing.

```pine
linefill.delete(id) → void
```

**Arguments**

- `id` (series linefill): A linefill object.

### linefill.get_line1()

Returns the ID of the first line used in the `id` linefill.

```pine
linefill.get_line1(id) → series line
```

**Arguments**

- `id` (series linefill): A linefill object.

### linefill.get_line2()

Returns the ID of the second line used in the `id` linefill.

```pine
linefill.get_line2(id) → series line
```

**Arguments**

- `id` (series linefill): A linefill object.

### linefill.new()

Creates a new linefill object and displays it on the chart, filling the space between `line1` and `line2` with the color specified in `color`.

```pine
linefill.new(line1, line2, color) → series linefill
```

**Arguments**

- `line1` (series line): First line object.
- `line2` (series line): Second line object.
- `color` (series color): The color used to fill the space between the lines.

**Returns:** The ID of a linefill object that can be passed to other linefill.*() functions.

**Remarks**

If any line of the two is deleted, the linefill object is also deleted. If the lines are moved (e.g. via `line.set_xy()` functions), the linefill object is also moved.

If both lines are extended in the same direction relative to the lines themselves (e.g. both have `extend.right` as the value of their `extend=` parameter), the space between line extensions will also be filled.

### linefill.set_color()

The function sets the color of the linefill object passed to it.

```pine
linefill.set_color(id, color) → void
```

**Arguments**

- `id` (series linefill): A linefill object.
- `color` (series color): The color of the linefill object.
