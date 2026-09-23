# `color.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Functions

### color()

Casts na to color

```pine
color(x) → const color
color(x) → input color
color(x) → simple color
color(x) → series color
```

**Arguments**

- `x` (const color | input color | simple color | series color): The value to convert to the specified type, usually `na`.

**Returns:** The value of the argument after casting to color.

**See also:** `float()`, `int()`, `bool()`, `string()`, `line()`, `label()`

### color.b()

Retrieves the value of the color's blue component.

```pine
color.b(color) → series float
color.b(color) → const float
color.b(color) → input float
color.b(color) → simple float
```

**Arguments**

- `color` (series color | const color | input color | simple color): Color.

**Returns:** The value (0 to 255) of the color's blue component.

```pine
//@version=6
indicator("color.b", overlay=true)
plot(color.b(color.blue))
```

### color.from_gradient()

Based on the relative position of value in the bottom_value to top_value range, the function returns a color from the gradient defined by bottom_color to top_color.

```pine
color.from_gradient(value, bottom_value, top_value, bottom_color, top_color) → series color
```

**Arguments**

- `value` (series int/float): Value to calculate the position-dependent color.
- `bottom_value` (series int/float): Bottom position value corresponding to bottom_color.
- `top_value` (series int/float): Top position value corresponding to top_color.
- `bottom_color` (series color): Bottom position color.
- `top_color` (series color): Top position color.

**Returns:** A color calculated from the linear gradient between bottom_color to top_color.

**Remarks**

Using this function will have an impact on the colors displayed in the script's "Settings/Style" tab. See the [User Manual](https://www.tradingview.com/pine-script-docs/concepts/colors/#color-selection-through-script-settings) for more information.

```pine
//@version=6
indicator("color.from_gradient", overlay=true)
color1 = color.from_gradient(close, low, high, color.yellow, color.lime)
color2 = color.from_gradient(ta.rsi(close, 7), 0, 100, color.rgb(255, 0, 0), color.rgb(0, 255, 0, 50))
plot(close, color=color1)
plot(ta.rsi(close,7), color=color2)
```

### color.g()

Retrieves the value of the color's green component.

```pine
color.g(color) → series float
color.g(color) → const float
color.g(color) → input float
color.g(color) → simple float
```

**Arguments**

- `color` (series color | const color | input color | simple color): Color.

**Returns:** The value (0 to 255) of the color's green component.

```pine
//@version=6
indicator("color.g", overlay=true)
plot(color.g(color.green))
```

### color.new()

Function color applies the specified transparency to the given color.

```pine
color.new(color, transp) → const color
color.new(color, transp) → series color
color.new(color, transp) → input color
color.new(color, transp) → simple color
```

**Arguments**

- `color` (const color | series color | input color | simple color): Color to apply transparency to.
- `transp` (const int/float | series int/float | input int/float | simple int/float): Possible values are from 0 (not transparent) to 100 (invisible).

**Returns:** Color with specified transparency.

**Remarks**

Using arguments that are not constants (e.g., 'simple', 'input' or 'series') will have an impact on the colors displayed in the script's "Settings/Style" tab. See the [User Manual](https://www.tradingview.com/pine-script-docs/concepts/colors/#color-selection-through-script-settings) for more information.

```pine
//@version=6
indicator("color.new", overlay=true)
plot(close, color=color.new(color.red, 50))
```

### color.r()

Retrieves the value of the color's red component.

```pine
color.r(color) → series float
color.r(color) → const float
color.r(color) → input float
color.r(color) → simple float
```

**Arguments**

- `color` (series color | const color | input color | simple color): Color.

**Returns:** The value (0 to 255) of the color's red component.

```pine
//@version=6
indicator("color.r", overlay=true)
plot(color.r(color.red))
```

### color.rgb()

Creates a new color with transparency using the RGB color model.

```pine
color.rgb(red, green, blue, transp) → series color
color.rgb(red, green, blue, transp) → const color
color.rgb(red, green, blue, transp) → input color
color.rgb(red, green, blue, transp) → simple color
```

**Arguments**

- `red` (series int/float | const int/float | input int/float | simple int/float): Red color component. Possible values are from 0 to 255.
- `green` (series int/float | const int/float | input int/float | simple int/float): Green color component. Possible values are from 0 to 255.
- `blue` (series int/float | const int/float | input int/float | simple int/float): Blue color component. Possible values are from 0 to 255.
- `transp` (series int/float | const int/float | input int/float | simple int/float, optional): Optional. Color transparency. Possible values are from 0 (opaque) to 100 (invisible). Default value is 0.

**Returns:** Color with specified transparency.

**Remarks**

Using arguments that are not constants (e.g., 'simple', 'input' or 'series') will have an impact on the colors displayed in the script's "Settings/Style" tab. See the [User Manual](https://www.tradingview.com/pine-script-docs/concepts/colors/#color-selection-through-script-settings) for more information.

```pine
//@version=6
indicator("color.rgb", overlay=true)
plot(close, color=color.rgb(255, 0, 0, 50))
```

### color.t()

Retrieves the color's transparency.

```pine
color.t(color) → series float
color.t(color) → const float
color.t(color) → input float
color.t(color) → simple float
```

**Arguments**

- `color` (series color | const color | input color | simple color): Color.

**Returns:** The value (0-100) of the color's transparency.

```pine
//@version=6
indicator("color.t", overlay=true)
plot(color.t(color.new(color.red, 50)))
```
