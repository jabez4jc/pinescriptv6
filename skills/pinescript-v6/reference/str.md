# `str.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Functions

### str.contains()

Returns true if the `source` string contains the `str` substring, false otherwise.

```pine
str.contains(source, str) → const bool
str.contains(source, str) → simple bool
str.contains(source, str) → series bool
```

**Arguments**

- `source` (const string | simple string | series string): Source string.
- `str` (const string | simple string | series string): The substring to search for.

**Returns:** True if the `str` was found in the `source` string, false otherwise.

```pine
//@version=6
indicator("str.contains")
// If the current chart is a continuous futures chart, e.g “BTC1!”, then the function will return true, false otherwise.
var isFutures = str.contains(syminfo.tickerid, "!")
plot(isFutures ? 1 : 0)
```

**See also:** `str.pos()`, `str.match()`

### str.endswith()

Returns true if the `source` string ends with the substring specified in `str`, false otherwise.

```pine
str.endswith(source, str) → const bool
str.endswith(source, str) → simple bool
str.endswith(source, str) → series bool
```

**Arguments**

- `source` (const string | simple string | series string): Source string.
- `str` (const string | simple string | series string): The substring to search for.

**Returns:** True if the `source` string ends with the substring specified in `str`, false otherwise.

**See also:** `str.startswith()`

### str.format()

Creates a formatted string using a specified formatting string (`formatString`) and one or more additional arguments (`arg0`, `arg1`, etc.). The formatting string defines the structure of the returned string, where all placeholders in curly brackets (`{}`) refer to the additional arguments. Each placeholder requires a number representing an argument's position, starting from 0. For instance, the placeholder `{0}` refers to the first argument after `formatString` (`arg0`), `{1}` refers to the second (`arg1`), and so on. The function replaces each placeholder with a string representation of the corresponding argument.

```pine
str.format(formatString, arg0, arg1, ...) → simple string
str.format(formatString, arg0, arg1, ...) → series string
```

**Arguments**

- `formatString` (simple string | series string): Format string.
- `arg0, arg1, ...` (simple int/float/bool/string | series int/float/bool/string/array<int/float/bool/string>): Values to format.

```pine
//@version=6
indicator("Simple `str.format()` demo")

//@variable A formatted string that includes representations of the current `bar_index` and `close` values.
//          The placeholder `{0}` refers to the first argument after the formatting string (`bar_index`), and
//          `{1}` refers to the second (`close`).
string labelText = str.format("Current bar index: {0}\nCurrent bar close: {1}", bar_index, close)

// Draw a label to display the `labelText` string at the current bar's `high` price.
label.new(bar_index, high, labelText)
```

```pine
//@version=6
indicator("Extensive `str.format()` demo", overlay=true)
// The format specifier inside the curly braces accepts certain modifiers:
// - Specify the number of decimals to display:
s1 = str.format("{0,number,#.#}", 1.34) // returns: 1.3
label.new(bar_index, close, text=s1)
// - Round a float value to an integer:
s2 = str.format("{0,number,integer}", 1.34) // returns: 1
label.new(bar_index - 1, close, text=s2)
// - Display a number in currency:
s3 = str.format("{0,number,currency}", 1.34) // returns: $1.34
label.new(bar_index - 2, close, text=s3)
// - Display a number as a percentage:
s4 = str.format("{0,number,percent}", 0.5) // returns: 50%
label.new(bar_index - 3, close, text=s4)
// EXAMPLES WITH SEVERAL ARGUMENTS
// returns: Number 1 is not equal to 4
s5 = str.format("Number {0} is not {1} to {2}", 1, "equal", 4)
label.new(bar_index - 4, close, text=s5)
// returns: 1.34 != 1.3
s6 = str.format("{0} != {0, number, #.#}", 1.34)
label.new(bar_index - 5, close, text=s6)
// returns: 1 is equal to 1, but 2 is equal to 2
s7 = str.format("{0, number, integer} is equal to 1, but {1, number, integer} is equal to 2", 1.34, 1.52)
label.new(bar_index - 6, close, text=s7)
// returns: The cash turnover amounted to $1,340,000.00
s8 = str.format("The cash turnover amounted to {0, number, currency}", 1340000)
label.new(bar_index - 7, close, text=s8)
// returns: Expected return is 10% - 20%
s9 = str.format("Expected return is {0, number, percent} - {1, number, percent}", 0.1, 0.2)
label.new(bar_index - 8, close, text=s9)
```

```pine
//@version=6
indicator("Simple `str.format()` demo")

//@variable A formatted string that includes representations of the current `bar_index` and `close` values.
//          The placeholder `{0}` refers to the first argument after the formatting string (`bar_index`), and
//          `{1}` refers to the second (`close`).
string labelText = str.format("Current bar index: {0}\nCurrent bar close: {1}", bar_index, close)

// Draw a label to display the `labelText` string at the current bar's `high` price.
label.new(bar_index, high, labelText)
```

```pine
//@version=6
indicator("Extensive `str.format()` demo", overlay=true)
// The format specifier inside the curly braces accepts certain modifiers:
// - Specify the number of decimals to display:
s1 = str.format("{0,number,#.#}", 1.34) // returns: 1.3
label.new(bar_index, close, text=s1)
// - Round a float value to an integer:
s2 = str.format("{0,number,integer}", 1.34) // returns: 1
label.new(bar_index - 1, close, text=s2)
// - Display a number in currency:
s3 = str.format("{0,number,currency}", 1.34) // returns: $1.34
label.new(bar_index - 2, close, text=s3)
// - Display a number as a percentage:
s4 = str.format("{0,number,percent}", 0.5) // returns: 50%
label.new(bar_index - 3, close, text=s4)
// EXAMPLES WITH SEVERAL ARGUMENTS
// returns: Number 1 is not equal to 4
s5 = str.format("Number {0} is not {1} to {2}", 1, "equal", 4)
label.new(bar_index - 4, close, text=s5)
// returns: 1.34 != 1.3
s6 = str.format("{0} != {0, number, #.#}", 1.34)
label.new(bar_index - 5, close, text=s6)
// returns: 1 is equal to 1, but 2 is equal to 2
s7 = str.format("{0, number, integer} is equal to 1, but {1, number, integer} is equal to 2", 1.34, 1.52)
label.new(bar_index - 6, close, text=s7)
// returns: The cash turnover amounted to $1,340,000.00
s8 = str.format("The cash turnover amounted to {0, number, currency}", 1340000)
label.new(bar_index - 7, close, text=s8)
// returns: Expected return is 10% - 20%
s9 = str.format("Expected return is {0, number, percent} - {1, number, percent}", 0.1, 0.2)
label.new(bar_index - 8, close, text=s9)
```

**Returns:** The formatted string.

**Remarks**

The string used as the `formatString` argument can contain single quote characters ('). However, programmers must pair all single quotes in that string to avoid unexpected formatting results.

All non-quoted left curly brackets must have corresponding right curly brackets in the formatting string. If the string contains imbalanced left curly brackets, it causes a runtime error. For example, "ab {0} de" and "ab }{0} de" are valid formatting strings, but "ab {0'}' de", "ab }{0}{ de" and "''{''{0}" are not.

The placeholders for "int" or "float" values or arrays can include modifiers and formatting tokens to customize how the resulting string represents them.

For example, the placeholder `{0,number,#.#)` specifies that the result inserts characters representing the `arg0` number rounded to one fractional digit.

For detailed information about placeholders and supported formats, refer to the [Formatting strings](../concepts/strings.md#formatting-strings) section of our User Manual's [Strings](../concepts/strings.md) page.

The apostrophe (`'`) acts as a quote character rather than a literal character inside formatting strings. If a formatting string has a sequence of characters between two apostrophes, the function's result includes those characters literally. For instance, the substring `'{'` adds a literal `{` character to the result instead of treating it as the start of a placeholder. Note that if a formatting string uses apostrophes instead of quotation marks for its enclosing characters, the string must escape any apostrophes within the character sequence using the backslash.

### str.format_time()

Converts the `time` timestamp into a string formatted according to `format` and `timezone`.

```pine
str.format_time(time, format, timezone) → series string
```

**Arguments**

- `time` (series int): UNIX time, in milliseconds.
- `format` (series string, optional): A format string specifying the date/time representation of the `time` in the returned string. All letters used in the string, except those escaped by single quotation marks `'`, are considered formatting tokens and will be used as a formatting instruction. Refer to the Remarks section for a list of the most useful tokens. Optional. The default is "yyyy-MM-dd'T'HH:mm:ssZ", which represents the ISO 8601 standard.
- `timezone` (series string, optional): Allows adjusting the returned value to a time zone specified in either UTC/GMT notation (e.g., "UTC-5", "GMT+0530") or as an [IANA time zone database name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g., "America/New_York"). Optional. The default is `syminfo.timezone`.

**Returns:** The formatted string.

**Remarks**

The `M`, `d`, `h`, `H`, `m` and `s` tokens can all be doubled to generate leading zeros. For example, the month of January will display as `1` with `M`, or `01` with `MM`.

The most frequently used formatting tokens are:

y - Year. Use `yy` to output the last two digits of the year or `yyyy` to output all four. Year 2000 will be `00` with `yy` or `2000` with `yyyy`.

M - Month. Not to be confused with lowercase `m`, which stands for minute.

d - Day of the month.

a - AM/PM postfix.

h - Hour in the 12-hour format. The last hour of the day will be `11` in this format.

H - Hour in the 24-hour format. The last hour of the day will be `23` in this format.

m - Minute.

s - Second.

S - Fractions of a second.

Z - Timezone, the HHmm offset from UTC, preceded by either `+` or `-`.

```pine
//@version=6
indicator("str.format_time")
if timeframe.change("1D")
	formattedTime = str.format_time(time, "yyyy-MM-dd HH:mm", syminfo.timezone)
	label.new(bar_index, high, formattedTime)
```

### str.length()

Returns an integer corresponding to the amount of chars in that string.

```pine
str.length(string) → const int
str.length(string) → simple int
str.length(string) → series int
```

**Arguments**

- `string` (const string | simple string | series string): Source string.

**Returns:** The number of chars in source string.

### str.lower()

Returns a new string with all letters converted to lowercase.

```pine
str.lower(source) → const string
str.lower(source) → simple string
str.lower(source) → series string
```

**Arguments**

- `source` (const string | simple string | series string): String to be converted.

**Returns:** A new string with all letters converted to lowercase.

**See also:** `str.upper()`

### str.match()

Returns the new substring of the `source` string if it matches a `regex` regular expression, an empty string otherwise.

```pine
str.match(source, regex) → simple string
str.match(source, regex) → series string
```

**Arguments**

- `source` (simple string | series string): Source string.
- `regex` (simple string | series string): The regular expression to which this string is to be matched.

**Returns:** The new substring of the `source` string if it matches a `regex` regular expression, an empty string otherwise.

**Remarks**

Function returns first occurrence of the [regular expression](https://en.wikipedia.org/wiki/Regular_expression#Perl_and_PCRE) in the `source` string.

The backslash "&#92;" symbol in the`regex` string needs to be escaped with additional backslash, e.g. "&#92;&#92;d" stands for regular expression "&#92;d".

```pine
//@version=6
indicator("str.match")

s = input.string("It's time to sell some NASDAQ:AAPL!")

// finding first substring that matches regular expression "[\w]+:[\w]+"
var string tickerid = str.match(s, "[\\w]+:[\\w]+")

if barstate.islastconfirmedhistory
	label.new(bar_index, high, text = tickerid) // "NASDAQ:AAPL"
```

**See also:** `str.contains()`, `str.substring()`

### str.pos()

Returns the position of the first occurrence of the `str` string in the `source` string, 'na' otherwise.

```pine
str.pos(source, str) → const int
str.pos(source, str) → simple int
str.pos(source, str) → series int
```

**Arguments**

- `source` (const string | simple string | series string): Source string.
- `str` (const string | simple string | series string): The substring to search for.

**Returns:** Position of the `str` string in the `source` string.

**Remarks**

Strings indexing starts at 0.

**See also:** `str.contains()`, `str.match()`, `str.substring()`

### str.repeat()

Constructs a new string containing the `source` string repeated `repeat` times with the `separator` injected between each repeated instance.

```pine
str.repeat(source, repeat, separator) → const string
str.repeat(source, repeat, separator) → input string
str.repeat(source, repeat, separator) → simple string
str.repeat(source, repeat, separator) → series string
```

**Arguments**

- `source` (const string | input string | simple string | series string): String to repeat.
- `repeat` (const int | input int | simple int | series int): Number of times to repeat the `source` string. Must be greater than or equal to 0.
- `separator` (const string | input string | simple string | series string, optional): String to inject between repeated values. Optional. The default is empty string.

**Remarks**

Returns `na` if the `source` is `na`.

```pine
//@version=6
indicator("str.repeat")
repeat = str.repeat("?", 3, ",") // Returns "?,?,?"
label.new(bar_index,close,repeat)
```

### str.replace()

Returns a new string with the Nth occurrence of the `target` string replaced by the `replacement` string, where N is specified in `occurrence`.

```pine
str.replace(source, target, replacement, occurrence) → const string
str.replace(source, target, replacement, occurrence) → simple string
str.replace(source, target, replacement, occurrence) → series string
```

**Arguments**

- `source` (const string | simple string | series string): Source string.
- `target` (const string | simple string | series string): String to be replaced.
- `replacement` (const string | simple string | series string): String to be inserted instead of the target string.
- `occurrence` (const int | simple int | series int, optional): N-th occurrence of the target string to replace. Indexing starts at 0 for the first match. Optional. Default value is 0.

**Returns:** Processed string.

```pine
//@version=6
indicator("str.replace")
var source = "FTX:BTCUSD / FTX:BTCEUR"

// Replace first occurrence of "FTX" with "BINANCE" replacement string
var newSource = str.replace(source, "FTX", "BINANCE", 0)

if barstate.islastconfirmedhistory
	// Display "BINANCE:BTCUSD / FTX:BTCEUR"
	label.new(bar_index, high, text = newSource)
```

**See also:** `str.replace_all()`, `str.match()`

### str.replace_all()

Replaces each occurrence of the target string in the source string with the replacement string.

```pine
str.replace_all(source, target, replacement) → simple string
str.replace_all(source, target, replacement) → series string
```

**Arguments**

- `source` (simple string | series string): Source string.
- `target` (simple string | series string): String to be replaced.
- `replacement` (simple string | series string): String to be substituted for each occurrence of target string.

**Returns:** Processed string.

### str.split()

Divides a string into an array of substrings and returns its array id.

```pine
str.split(string, separator) → array<string>
```

**Arguments**

- `string` (series string): Source string.
- `separator` (series string): The string separating each substring.

**Returns:** The id of an array of strings.

### str.startswith()

Returns true if the `source` string starts with the substring specified in `str`, false otherwise.

```pine
str.startswith(source, str) → const bool
str.startswith(source, str) → simple bool
str.startswith(source, str) → series bool
```

**Arguments**

- `source` (const string | simple string | series string): Source string.
- `str` (const string | simple string | series string): The substring to search for.

**Returns:** True if the `source` string starts with the substring specified in `str`, false otherwise.

**See also:** `str.endswith()`

### str.substring()

Returns a new string that is a substring of the `source` string. The substring begins with the character at the index specified by `begin_pos` and extends to 'end_pos - 1' of the `source` string.

```pine
str.substring(source, begin_pos, end_pos) → const string
str.substring(source, begin_pos, end_pos) → simple string
str.substring(source, begin_pos, end_pos) → series string
```

**Arguments**

- `source` (const string | simple string | series string): Source string from which to extract the substring.
- `begin_pos` (const int | simple int | series int): The beginning position of the extracted substring. It is inclusive (the extracted substring includes the character at that position).
- `end_pos` (const int | simple int | series int): The ending position. It is exclusive (the extracted string does NOT include that position's character). Optional. The default is the length of the `source` string.

**Returns:** The substring extracted from the source string.

**Remarks**

Strings indexing starts from 0. If `begin_pos` is equal to `end_pos`, the function returns an empty string.

```pine
//@version=6
indicator("str.substring", overlay = true)
sym= input.symbol("NASDAQ:AAPL")
pos = str.pos(sym, ":") // Get position of ":" character
tkr= str.substring(sym, pos+1) // "AAPL"
if barstate.islastconfirmedhistory
	label.new(bar_index, high, text = tkr)
```

**See also:** `str.contains()`, `str.pos()`, `str.match()`

### str.tonumber()

Converts a value represented in `string` to its "float" equivalent.

```pine
str.tonumber(string) → series float
str.tonumber(string) → const float
str.tonumber(string) → input float
str.tonumber(string) → simple float
```

**Arguments**

- `string` (series string | const string | input string | simple string): String containing the representation of an integer or floating point value.

**Returns:** A "float" equivalent of the value in `string`. If the value is not a properly formed integer or floating point value, the function returns `na`.

### str.tostring()

```pine
str.tostring(value) → series string
str.tostring(value) → simple string
str.tostring(value) → const string
str.tostring(value, format) → series string
str.tostring(value, format) → simple string
```

**Arguments**

- `value` (series int/float/bool/string/enum/array<int/float/bool/string>/matrix<int/float/bool/string> | simple int/float/bool/string/enum | const enum | series int/float/array<int/float>/matrix<int/float> | simple int/float): Value or array ID whose elements are converted to a string.
- `format` (series string | simple string): Format string. Accepts these format.* constants: `format.mintick`, `format.percent`, `format.volume`. Optional. The default value is '#.##########'.

**Returns:** The string representation of the `value` argument. If the `value` argument is a string, it is returned as is. When the `value` is na, the function returns the string "NaN".

**Remarks**

The formatting of float values will also round those values when necessary, e.g. str.tostring(3.99, '#') will return "4".

To display trailing zeros, use '0' instead of '#'. For example, '#.000'.

When using `format.mintick`, the value will be rounded to the nearest number that can be divided by `syminfo.mintick` without the remainder. The string is returned with trailing zeros.

If the x argument is a string, the same string value will be returned.

Bool type arguments return "true" or "false".

When x is na, the function returns "NaN".

### str.trim()

Constructs a new string with all consecutive whitespaces and other control characters (e.g., “\n”, “\t”, etc.) removed from the left and right of the `source`.

```pine
str.trim(source) → const string
str.trim(source) → input string
str.trim(source) → simple string
str.trim(source) → series string
```

**Arguments**

- `source` (const string | input string | simple string | series string): String to trim.

**Remarks**

Returns an empty string ("") if the result is empty after the trim or if the `source` is `na`.

```pine
//@version=6
indicator("str.trim")
trim = str.trim("    abc    ") // Returns "abc"
label.new(bar_index,close,trim)
```

### str.upper()

Returns a new string with all letters converted to uppercase.

```pine
str.upper(source) → const string
str.upper(source) → simple string
str.upper(source) → series string
```

**Arguments**

- `source` (const string | simple string | series string): String to be converted.

**Returns:** A new string with all letters converted to uppercase.

**See also:** `str.lower()`
