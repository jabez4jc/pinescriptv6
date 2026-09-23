# `timeframe.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### timeframe.isdaily

Returns true if current resolution is a daily resolution, false otherwise.

Type: `simple bool`

**See also:** `timeframe.isdwm`, `timeframe.isintraday`, `timeframe.isminutes`, `timeframe.isseconds`, `timeframe.isticks`, `timeframe.isweekly`, `timeframe.ismonthly`

### timeframe.isdwm

Returns true if current resolution is a daily or weekly or monthly resolution, false otherwise.

Type: `simple bool`

**See also:** `timeframe.isintraday`, `timeframe.isminutes`, `timeframe.isseconds`, `timeframe.isticks`, `timeframe.isdaily`, `timeframe.isweekly`, `timeframe.ismonthly`

### timeframe.isintraday

Returns true if current resolution is an intraday (minutes or seconds) resolution, false otherwise.

Type: `simple bool`

**See also:** `timeframe.isminutes`, `timeframe.isseconds`, `timeframe.isticks`, `timeframe.isdwm`, `timeframe.isdaily`, `timeframe.isweekly`, `timeframe.ismonthly`

### timeframe.isminutes

Returns true if current resolution is a minutes resolution, false otherwise.

Type: `simple bool`

**See also:** `timeframe.isdwm`, `timeframe.isintraday`, `timeframe.isseconds`, `timeframe.isticks`, `timeframe.isdaily`, `timeframe.isweekly`, `timeframe.ismonthly`

### timeframe.ismonthly

Returns true if current resolution is a monthly resolution, false otherwise.

Type: `simple bool`

**See also:** `timeframe.isdwm`, `timeframe.isintraday`, `timeframe.isminutes`, `timeframe.isseconds`, `timeframe.isticks`, `timeframe.isdaily`, `timeframe.isweekly`

### timeframe.isseconds

Returns true if current resolution is a seconds resolution, false otherwise.

Type: `simple bool`

**See also:** `timeframe.isdwm`, `timeframe.isintraday`, `timeframe.isminutes`, `timeframe.isticks`, `timeframe.isdaily`, `timeframe.isweekly`, `timeframe.ismonthly`

### timeframe.isticks

Returns true if current resolution is a ticks resolution, false otherwise.

Type: `simple bool`

**See also:** `timeframe.isdwm`, `timeframe.isintraday`, `timeframe.isminutes`, `timeframe.isseconds`, `timeframe.isdaily`, `timeframe.isweekly`, `timeframe.ismonthly`

### timeframe.isweekly

Returns true if current resolution is a weekly resolution, false otherwise.

Type: `simple bool`

**See also:** `timeframe.isdwm`, `timeframe.isintraday`, `timeframe.isminutes`, `timeframe.isseconds`, `timeframe.isticks`, `timeframe.isdaily`, `timeframe.ismonthly`

### timeframe.main_period

A string representation of the script's main timeframe. If the script is an `indicator()` that specifies a `timeframe` value in its declaration statement, this variable holds that value. Otherwise, its value represents the chart's timeframe. Unlike `timeframe.period`, this variable's value does not change when used in the `expression` argument of a `request.*()` function call.

The string's format is "<quantity>[<unit>]", where <unit> is "T" for ticks, "S" for seconds, "D" for days, "W" for weeks, and "M" for months, but is absent for minutes. No <unit> exists for hours: hourly timeframes are expressed in minutes.

The variable's value is: "10S" for 10 seconds, "30" for 30 minutes, "240" for four hours, "1D" for one day, "2W" for two weeks, and "3M" for one quarter.

Type: `simple string`

**See also:** `timeframe.period`, `syminfo.main_tickerid`, `syminfo.ticker`, `syminfo.tickerid`, `timeframe.multiplier`

### timeframe.multiplier

Multiplier of resolution, e.g. '60' - 60, 'D' - 1, '5D' - 5, '12M' - 12.

Type: `simple int`

**See also:** `syminfo.ticker`, `syminfo.tickerid`, `timeframe.period`

### timeframe.period

A string representation of the script's main timeframe or a requested timeframe, depending on how the script uses it. The variable's value represents the timeframe of a requested dataset when used in the `expression` argument of a `request.*()` function call. Otherwise, its value represents the script's main timeframe (`timeframe.main_period`), which equals either the `timeframe` argument of the `indicator()` declaration statement or the chart's timeframe.

The string's format is "<quantity>[<unit>]", where <unit> is "T" for ticks, "S" for seconds, "D" for days, "W" for weeks, and "M" for months, but is absent for minutes. No <unit> exists for hours: hourly timeframes are expressed in minutes.

The variable's value is: "10S" for 10 seconds, "30" for 30 minutes, "240" for four hours, "1D" for one day, "2W" for two weeks, and "3M" for one quarter.

Type: `simple string`

**Remarks**

To always access the script's main timeframe, even within another context, use the `timeframe.main_period` variable.

**See also:** `timeframe.main_period`, `syminfo.main_tickerid`, `syminfo.ticker`, `syminfo.tickerid`, `timeframe.multiplier`

## Functions

### timeframe.change()

Detects changes in the specified `timeframe`.

```pine
timeframe.change(timeframe) → series bool
```

**Arguments**

- `timeframe` (series string, optional): String formatted according to the [User manual's timeframe string specifications](../concepts/timeframes.md#timeframe-string-specifications).

**Returns:** Returns `true` on the first bar of a new `timeframe`, `false` otherwise.

```pine
//@version=6
// Run this script on an intraday chart.
indicator("New day started", overlay = true)
// Highlights the first bar of the new day.
isNewDay = timeframe.change("1D")
bgcolor(isNewDay ? color.new(color.green, 80) : na)
```

### timeframe.from_seconds()

Converts a number of seconds into a valid timeframe string.

```pine
timeframe.from_seconds(seconds) → simple string
timeframe.from_seconds(seconds) → series string
```

**Arguments**

- `seconds` (simple int | series int): The number of seconds in the timeframe.

**Returns:** A timeframe string compliant with [timeframe string specifications](../concepts/timeframes.md#timeframe-string-specifications).

**Remarks**

If no valid timeframe exists for the quantity of seconds supplied, the next higher valid timeframe will be returned. Accordingly, one second or less will return "1S", 2-5 seconds will return "5S", and 604,799 seconds (one second less than 7 days) will return "7D".

If the seconds exactly represent two or more valid timeframes, the one with the larger base unit will be used. Thus 604,800 seconds (7 days) returns "1W", not "7D".

All values above 31,622,400 (366 days) return "12M".

```pine
//@version=6
indicator("HTF Close", "", true)
int chartTf = timeframe.in_seconds()
string tfTimes5 = timeframe.from_seconds(chartTf * 5)
float htfClose = request.security(syminfo.tickerid, tfTimes5, close)
plot(htfClose)
```

**See also:** `timeframe.in_seconds()`, `request.security`, `request.security_lower_tf`

### timeframe.in_seconds()

Converts a timeframe string into seconds.

```pine
timeframe.in_seconds(timeframe) → simple int
timeframe.in_seconds(timeframe) → series int
```

**Arguments**

- `timeframe` (simple string | series string, optional): Timeframe string in [timeframe string specifications](../concepts/timeframes.md#timeframe-string-specifications) format. Optional. The default is `timeframe.period`.

**Returns:** The "int" representation of the number of seconds in the timeframe string.

**Remarks**

When the timeframe is "1M" or more, calculations use 2628003 as the number of seconds in one month, which represents 30.4167 (365/12) days.

```pine
//@version=6
indicator("`timeframe_in_seconds()`"),

// Get a user-selected timeframe.
tfInput = input.timeframe("1D")

// Convert it into an "int" number of seconds.
secondsInTf = timeframe.in_seconds(tfInput)

plot(secondsInTf)
```

**See also:** `input.timeframe()`, `timeframe.period`, `timeframe.from_seconds()`
