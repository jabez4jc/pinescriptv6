# `math.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Functions

### math.abs()

Absolute value of `number` is `number` if `number` >= 0, or -`number` otherwise.

```pine
math.abs(number) → simple int
math.abs(number) → input int
math.abs(number) → const int
math.abs(number) → series int
math.abs(number) → simple float
math.abs(number) → input float
math.abs(number) → const float
math.abs(number) → series float
```

**Arguments**

- `number` (simple int | input int | const int | series int | simple int/float | input int/float | const int/float | series int/float): The number to use in the calculation.

**Returns:** The absolute value of `number`.

### math.acos()

The acos function returns the arccosine (in radians) of number such that cos(acos(y)) = y for y in range [-1, 1].

```pine
math.acos(angle) → simple float
math.acos(angle) → input float
math.acos(angle) → const float
math.acos(angle) → series float
```

**Arguments**

- `angle` (simple int/float | input int/float | const int/float | series int/float): The value, in radians, to use in the calculation.

**Returns:** The arc cosine of a value; the returned angle is in the range [0, Pi], or `na` if y is outside of range [-1, 1].

### math.asin()

The asin function returns the arcsine (in radians) of number such that sin(asin(y)) = y for y in range [-1, 1].

```pine
math.asin(angle) → simple float
math.asin(angle) → input float
math.asin(angle) → const float
math.asin(angle) → series float
```

**Arguments**

- `angle` (simple int/float | input int/float | const int/float | series int/float): The value, in radians, to use in the calculation.

**Returns:** The arcsine of a value; the returned angle is in the range [-Pi/2, Pi/2], or `na` if y is outside of range [-1, 1].

### math.atan()

The atan function returns the arctangent (in radians) of number such that tan(atan(y)) = y for any y.

```pine
math.atan(angle) → simple float
math.atan(angle) → input float
math.atan(angle) → const float
math.atan(angle) → series float
```

**Arguments**

- `angle` (simple int/float | input int/float | const int/float | series int/float): The value, in radians, to use in the calculation.

**Returns:** The arc tangent of a value; the returned angle is in the range [-Pi/2, Pi/2].

### math.avg()

Calculates average of all given series (elementwise).

```pine
math.avg(number0, number1, ...) → simple float
math.avg(number0, number1, ...) → series float
```

**Arguments**

- `number0, number1, ...` (simple int/float | series int/float): A sequence of numbers to use in the calculation.

**Returns:** Average.

**See also:** `math.sum()`, `ta.cum()`, `ta.sma()`

### math.ceil()

Rounds the specified `number` up to the smallest whole number ("int" value) that is greater than or equal to it.

```pine
math.ceil(number) → simple int
math.ceil(number) → input int
math.ceil(number) → const int
math.ceil(number) → series int
```

**Arguments**

- `number` (simple int/float | input int/float | const int/float | series int/float): The number to round.

**Returns:** The smallest "int" value that is greater than or equal to the `number`.

**See also:** `math.floor()`, `math.round()`

### math.cos()

The cos function returns the trigonometric cosine of an angle.

```pine
math.cos(angle) → simple float
math.cos(angle) → input float
math.cos(angle) → const float
math.cos(angle) → series float
```

**Arguments**

- `angle` (simple int/float | input int/float | const int/float | series int/float): Angle, in radians.

**Returns:** The trigonometric cosine of an angle.

### math.exp()

The exp function of `number` is e raised to the power of `number`, where e is Euler's number.

```pine
math.exp(number) → simple float
math.exp(number) → input float
math.exp(number) → const float
math.exp(number) → series float
```

**Arguments**

- `number` (simple int/float | input int/float | const int/float | series int/float): The number to use in the calculation.

**Returns:** A value representing e raised to the power of `number`.

**See also:** `math.pow()`

### math.floor()

Rounds the specified `number` down to the largest whole number ("int" value) that is less than or equal to it.

```pine
math.floor(number) → simple int
math.floor(number) → input int
math.floor(number) → const int
math.floor(number) → series int
```

**Arguments**

- `number` (simple int/float | input int/float | const int/float | series int/float): The number to round.

**Returns:** The largest "int" value that is less than or equal to the `number`.

**See also:** `math.ceil()`, `math.round()`

### math.log()

Natural logarithm of any `number` > 0 is the unique y such that e^y = `number`.

```pine
math.log(number) → simple float
math.log(number) → input float
math.log(number) → const float
math.log(number) → series float
```

**Arguments**

- `number` (simple int/float | input int/float | const int/float | series int/float): The number to use in the calculation.

**Returns:** The natural logarithm of `number`.

**See also:** `math.log10()`

### math.log10()

The common (or base 10) logarithm of `number` is the power to which 10 must be raised to obtain the `number`. 10^y = `number`.

```pine
math.log10(number) → simple float
math.log10(number) → input float
math.log10(number) → const float
math.log10(number) → series float
```

**Arguments**

- `number` (simple int/float | input int/float | const int/float | series int/float): The number to use in the calculation.

**Returns:** The base 10 logarithm of `number`.

**See also:** `math.log()`

### math.max()

Returns the greatest of multiple values.

```pine
math.max(number0, number1, ...) → const int
math.max(number0, number1, ...) → const float
math.max(number0, number1, ...) → simple int
math.max(number0, number1, ...) → simple float
math.max(number0, number1, ...) → input int
math.max(number0, number1, ...) → input float
math.max(number0, number1, ...) → series int
math.max(number0, number1, ...) → series float
```

**Arguments**

- `number0, number1, ...` (const int | const int/float | simple int | simple int/float | input int | input int/float | series int | series int/float): A sequence of numbers to use in the calculation.

**Returns:** The greatest of multiple given values.

```pine
//@version=6
indicator("math.max", overlay=true)
plot(math.max(close, open))
plot(math.max(close, math.max(open, 42)))
```

**See also:** `math.min()`

### math.min()

Returns the smallest of multiple values.

```pine
math.min(number0, number1, ...) → const int
math.min(number0, number1, ...) → const float
math.min(number0, number1, ...) → simple int
math.min(number0, number1, ...) → simple float
math.min(number0, number1, ...) → input int
math.min(number0, number1, ...) → input float
math.min(number0, number1, ...) → series int
math.min(number0, number1, ...) → series float
```

**Arguments**

- `number0, number1, ...` (const int | const int/float | simple int | simple int/float | input int | input int/float | series int | series int/float): A sequence of numbers to use in the calculation.

**Returns:** The smallest of multiple given values.

```pine
//@version=6
indicator("math.min", overlay=true)
plot(math.min(close, open))
plot(math.min(close, math.min(open, 42)))
```

**See also:** `math.max()`

### math.pow()

Mathematical power function.

```pine
math.pow(base, exponent) → simple float
math.pow(base, exponent) → input float
math.pow(base, exponent) → const float
math.pow(base, exponent) → series float
```

**Arguments**

- `base` (simple int/float | input int/float | const int/float | series int/float): Specify the base to use.
- `exponent` (simple int/float | input int/float | const int/float | series int/float): Specifies the exponent.

**Returns:** `base` raised to the power of `exponent`. If `base` is a series, it is calculated elementwise.

```pine
//@version=6
indicator("math.pow", overlay=true)
plot(math.pow(close, 2))
```

**See also:** `math.sqrt()`, `math.exp()`

### math.random()

Returns a pseudo-random value. The function will generate a different sequence of values for each script execution. Using the same value for the optional seed argument will produce a repeatable sequence.

```pine
math.random(min, max, seed) → series float
```

**Arguments**

- `min` (series int/float, optional): The lower bound of the range of random values. The value is not included in the range. The default is 0.
- `max` (series int/float, optional): The upper bound of the range of random values. The value is not included in the range. The default is 1.
- `seed` (series int, optional): Optional argument. When the same seed is used, allows successive calls to the function to produce a repeatable set of values.

**Returns:** A random value.

### math.round()

Returns the value of `number` rounded to the nearest integer, with ties rounding up. If the `precision` parameter is used, returns a float value rounded to that amount of decimal places.

```pine
math.round(number) → simple int
math.round(number) → input int
math.round(number) → const int
math.round(number) → series int
math.round(number, precision) → simple float
math.round(number, precision) → input float
math.round(number, precision) → const float
math.round(number, precision) → series float
```

**Arguments**

- `number` (simple int/float | input int/float | const int/float | series int/float): The value to be rounded.
- `precision` (simple int | series int): Optional argument. Decimal places to which `number` will be rounded. When no argument is supplied, rounding is to the nearest integer.

**Returns:** The value of `number` rounded to the nearest integer, or according to precision.

**Remarks**

Note that for 'na' values function returns 'na'.

**See also:** `math.ceil()`, `math.floor()`

### math.round_to_mintick()

Returns the value rounded to the symbol's mintick, i.e. the nearest value that can be divided by `syminfo.mintick`, without the remainder, with ties rounding up.

```pine
math.round_to_mintick(number) → simple float
math.round_to_mintick(number) → series float
```

**Arguments**

- `number` (simple int/float | series int/float): The value to be rounded.

**Returns:** The `number` rounded to tick precision.

**Remarks**

Note that for 'na' values function returns 'na'.

**See also:** `math.ceil()`, `math.floor()`

### math.sign()

Sign (signum) of `number` is zero if `number` is zero, 1.0 if `number` is greater than zero, -1.0 if `number` is less than zero.

```pine
math.sign(number) → simple float
math.sign(number) → input float
math.sign(number) → const float
math.sign(number) → series float
```

**Arguments**

- `number` (simple int/float | input int/float | const int/float | series int/float): The number to use in the calculation.

**Returns:** The sign of the argument.

### math.sin()

The sin function returns the trigonometric sine of an angle.

```pine
math.sin(angle) → simple float
math.sin(angle) → input float
math.sin(angle) → const float
math.sin(angle) → series float
```

**Arguments**

- `angle` (simple int/float | input int/float | const int/float | series int/float): Angle, in radians.

**Returns:** The trigonometric sine of an angle.

### math.sqrt()

Square root of any `number` >= 0 is the unique y >= 0 such that y^2 = `number`.

```pine
math.sqrt(number) → simple float
math.sqrt(number) → input float
math.sqrt(number) → const float
math.sqrt(number) → series float
```

**Arguments**

- `number` (simple int/float | input int/float | const int/float | series int/float): The number to use in the calculation.

**Returns:** The square root of `number`.

**See also:** `math.pow()`

### math.sum()

The sum function returns the sliding sum of last y values of x.

```pine
math.sum(source, length) → series float
```

**Arguments**

- `source` (series int/float): Series of values to process.
- `length` (series int): Number of bars (length).

**Returns:** Sum of `source` for `length` bars back.

**Remarks**

`na` values in the `source` series are ignored; the function calculates on the `length` quantity of non-`na` values.

**See also:** `ta.cum()`, `for`

### math.tan()

The tan function returns the trigonometric tangent of an angle.

```pine
math.tan(angle) → simple float
math.tan(angle) → input float
math.tan(angle) → const float
math.tan(angle) → series float
```

**Arguments**

- `angle` (simple int/float | input int/float | const int/float | series int/float): Angle, in radians.

**Returns:** The trigonometric tangent of an angle.

### math.todegrees()

Returns an approximately equivalent angle in degrees from an angle measured in radians.

```pine
math.todegrees(radians) → series float
```

**Arguments**

- `radians` (series int/float): Angle in radians.

**Returns:** The angle value in degrees.

### math.toradians()

Returns an approximately equivalent angle in radians from an angle measured in degrees.

```pine
math.toradians(degrees) → series float
```

**Arguments**

- `degrees` (series int/float): Angle in degrees.

**Returns:** The angle value in radians.
