# Time and date built-ins (time, timestamp, year, month, dayofweek, ...)

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### dayofmonth

The day number of the month, in the exchange time zone, calculated from the bar's opening UNIX timestamp.

Type: `series int`

**Remarks**

This variable always references the day number corresponding to the bar's opening time. Consequently, for symbols with overnight sessions (e.g., "EURUSD", where the "Monday" session starts on Sunday at 17:00 in exchange time), the value may represent a day from the previous week rather than the session's primary trading day.

**See also:** `dayofmonth()`, `dayofweek`, `weekofyear`, `time`, `year`, `month`, `hour`, `minute`, `second`

### dayofweek

The day number of the week, in the exchange time zone, calculated from the bar's opening UNIX timestamp.

Type: `series int`

**Remarks**

This variable always references the day number corresponding to the bar's opening time. Consequently, for symbols with overnight sessions (e.g., "EURUSD", where the "Monday" session starts on Sunday at 17:00 in exchange time), the value may represent a day from the previous week rather than the session's primary trading day.

You can use `dayofweek.sunday`, `dayofweek.monday`, `dayofweek.tuesday`, `dayofweek.wednesday`, `dayofweek.thursday`, `dayofweek.friday` and `dayofweek.saturday` variables for comparisons.

**See also:** `dayofweek()`, `time`, `year`, `month`, `weekofyear`, `dayofmonth`, `hour`, `minute`, `second`

### hour

Current bar hour in exchange timezone.

Type: `series int`

**See also:** `hour()`, `time`, `year`, `month`, `weekofyear`, `dayofmonth`, `dayofweek`, `minute`, `second`

### minute

Current bar minute in exchange timezone.

Type: `series int`

**See also:** `minute()`, `time`, `year`, `month`, `weekofyear`, `dayofmonth`, `dayofweek`, `hour`, `second`

### month

Current bar month in exchange timezone.

Type: `series int`

**Remarks**

Note that this variable returns the month based on the time of the bar's open. For overnight sessions (e.g. EURUSD, where Monday session starts on Sunday, 17:00) this value can be lower by 1 than the month of the trading day.

**See also:** `month()`, `time`, `year`, `weekofyear`, `dayofmonth`, `dayofweek`, `hour`, `minute`, `second`

### second

Current bar second in exchange timezone.

Type: `series int`

**See also:** `second()`, `time`, `year`, `month`, `weekofyear`, `dayofmonth`, `dayofweek`, `hour`, `minute`

### time

Current bar time in UNIX format. It is the number of milliseconds that have elapsed since 00:00:00 UTC, 1 January 1970.

Type: `series int`

**Remarks**

Note that this variable returns the timestamp based on the time of the bar's open. Because of that, for overnight sessions (e.g. EURUSD, where Monday session starts on Sunday, 17:00) this variable can return time before the specified date of the trading day. For example, on EURUSD, `dayofmonth(time)` can be lower by 1 than the date of the trading day, because the bar for the current day actually opens one day prior.

**See also:** `time()`, `time_close`, `timenow`, `year`, `month`, `weekofyear`, `dayofmonth`, `dayofweek`, `hour`, `minute`, `second`

### time_close

The time of the current bar's close in UNIX format. It represents the number of milliseconds elapsed since 00:00:00 UTC, 1 January 1970. On tick charts and price-based charts such as Renko, line break, Kagi, point & figure, and range, this variable's series holds an `na` timestamp for the latest realtime bar (because the future closing time is unpredictable), but valid timestamps for all previous bars.

Type: `series int`

**See also:** `time`, `timenow`, `year`, `month`, `weekofyear`, `dayofmonth`, `dayofweek`, `hour`, `minute`, `second`

### time_tradingday

The timestamp that represents 00:00 UTC of the trading day the current bar belongs to, in UNIX format (the number of milliseconds that have elapsed since 00:00:00 UTC, 1 January 1970).

Type: `series int`

**Remarks**

This variable is helpful when working with overnight sessions, where the day's session can begin on the previous calendar day. For example, on the "FXCM:EURUSD" symbol, the Monday session starts on Sunday, 17:00, exchange time. Unlike `time`, which returns the timestamp for Sunday at 17:00 on the Monday daily bar, `time_tradingday` returns the timestamp for Monday at 00:00 UTC. When used on timeframes higher than "1D", `time_tradingday` returns the timestamp of the last trading day inside that bar (e.g., on "1W", it returns the timestamp of the final trading day within the week).

```pine
//@version=6
indicator("Friday session")

//@variable The day of week, based on the current `time_tradingday` value.
//          Uses "UTC+0" to return the daily session's timestamp at 00:00 UTC.
int tradingDayOfWeek = dayofweek(time_tradingday, "UTC+0")

//@variable Returns `true` if the `dayofweek` represents Friday, in exchange time.
//          It might never return `true` on overnight symbols, depending on the timeframe, since the Friday session
//          starts on Thursday.
bool isFriday = dayofweek == dayofweek.friday
//@variable Returns `true` if the `tradingDayOfWeek` is Friday.
//          Differs from `isFriday` on symbols with overnight sessions and for timeframes > "1D" on others.
bool isFridaySession = tradingDayOfWeek == dayofweek.friday

// Create a horizontal line at the `dayofweek.friday` value.
hline(dayofweek.friday, "Friday value", color.gray, hline.style_dashed, 2)
// Plot the `dayofweek` and `tradingDayOfWeek` for comparison.
plot(dayofweek, "Day of week", color.blue, 2)
plot(tradingDayOfWeek, "Trading day", color.teal, 3)
// Highlight the background when `isFriday` and `isFridaySession` occur.
bgcolor(isFriday ? color.new(color.blue, 90) : na, title = "isFriday highlight")
bgcolor(isFridaySession ? color.new(color.teal, 80) : na, title = "isFridaySession highlight")
```

**See also:** `time`, `time_close`

### timenow

Current time in UNIX format. It is the number of milliseconds that have elapsed since 00:00:00 UTC, 1 January 1970.

Type: `series int`

**Remarks**

Please note that using this variable/function can cause [indicator repainting](../concepts/repainting.md).

**See also:** `timestamp()`, `time`, `time_close`, `year`, `month`, `weekofyear`, `dayofmonth`, `dayofweek`, `hour`, `minute`, `second`

### weekofyear

The week number of the year, in the exchange time zone, calculated from the bar's opening UNIX timestamp.

Type: `series int`

**Remarks**

This variable always references the week number corresponding to the bar's opening time. Consequently, for symbols with overnight sessions (e.g., "EURUSD", where the "Monday" session starts on Sunday at 17:00 in exchange time), the value may represent a previous calendar week rather than the week of the session's primary trading day.

**See also:** `weekofyear()`, `dayofmonth`, `dayofweek`, `time`, `year`, `month`, `hour`, `minute`, `second`

### year

Current bar year in exchange timezone.

Type: `series int`

**Remarks**

Note that this variable returns the year based on the time of the bar's open. For overnight sessions (e.g. EURUSD, where Monday session starts on Sunday, 17:00) this value can be lower by 1 than the year of the trading day.

**See also:** `year()`, `time`, `month`, `weekofyear`, `dayofmonth`, `dayofweek`, `hour`, `minute`, `second`

## Functions

### dayofmonth()

Calculates the day number of the month, in a specified time zone, from a UNIX timestamp.

```pine
dayofmonth(time, timezone) → series int
```

**Arguments**

- `time` (series int): A UNIX timestamp in milliseconds.
- `timezone` (series string): Optional. Specifies the time zone of the returned day number. The value can be a time zone string in UTC/GMT offset notation (e.g., "UTC-5") or IANA time zone database notation (e.g., "America/New_York"). The default is `syminfo.timezone`.

**Returns:** The calculated day of the month, expressed in the specified time zone.

**Remarks**

A [UNIX timestamp](../concepts/time.md#unix-timestamps) represents the number of milliseconds elapsed since 00:00 UTC on 1970-01-01. The meaning of a UNIX timestamp does not change relative to any time zone.

**See also:** `dayofmonth`, `dayofweek()`, `weekofyear()`, `time()`, `year()`, `month()`, `hour()`, `minute()`, `second()`

### dayofweek()

Calculates the day number of the week, in a specified time zone, from a UNIX timestamp.

```pine
dayofweek(time, timezone) → series int
```

**Arguments**

- `time` (series int): A UNIX timestamp in milliseconds.
- `timezone` (series string): Optional. Specifies the time zone of the returned day number. The value can be a time zone string in UTC/GMT offset notation (e.g., "UTC-5") or IANA time zone database notation (e.g., "America/New_York"). The default is `syminfo.timezone`.

**Returns:** The calculated day number, expressed in the specified time zone.

**Remarks**

A [UNIX timestamp](../concepts/time.md#unix-timestamps) represents the number of milliseconds elapsed since 00:00 UTC on 1970-01-01. The meaning of a UNIX timestamp does not change relative to any time zone.

**See also:** `dayofweek`, `dayofmonth()`, `weekofyear()`, `time()`, `year()`, `month()`, `hour()`, `minute()`, `second()`

### hour()

```pine
hour(time, timezone) → series int
```

**Arguments**

- `time` (series int): UNIX time in milliseconds.
- `timezone` (series string): Allows adjusting the returned value to a time zone specified in either UTC/GMT notation (e.g., "UTC-5", "GMT+0530") or as an IANA time zone database name (e.g., "America/New_York"). Optional. The default is `syminfo.timezone`.

**Returns:** Hour (in exchange timezone) for provided UNIX time.

**Remarks**

UNIX time is the number of milliseconds that have elapsed since 00:00:00 UTC, 1 January 1970.

**See also:** `hour`, `time()`, `year()`, `month()`, `dayofmonth()`, `dayofweek()`, `minute()`, `second()`

### minute()

```pine
minute(time, timezone) → series int
```

**Arguments**

- `time` (series int): UNIX time in milliseconds.
- `timezone` (series string): Allows adjusting the returned value to a time zone specified in either UTC/GMT notation (e.g., "UTC-5", "GMT+0530") or as an IANA time zone database name (e.g., "America/New_York"). Optional. The default is `syminfo.timezone`.

**Returns:** Minute (in exchange timezone) for provided UNIX time.

**Remarks**

UNIX time is the number of milliseconds that have elapsed since 00:00:00 UTC, 1 January 1970.

**See also:** `minute`, `time()`, `year()`, `month()`, `dayofmonth()`, `dayofweek()`, `hour()`, `second()`

### month()

```pine
month(time, timezone) → series int
```

**Arguments**

- `time` (series int): UNIX time in milliseconds.
- `timezone` (series string): Allows adjusting the returned value to a time zone specified in either UTC/GMT notation (e.g., "UTC-5", "GMT+0530") or as an IANA time zone database name (e.g., "America/New_York"). Optional. The default is `syminfo.timezone`.

**Returns:** Month (in exchange timezone) for provided UNIX time.

**Remarks**

UNIX time is the number of milliseconds that have elapsed since 00:00:00 UTC, 1 January 1970.

Note that this function returns the month based on the time of the bar's open. For overnight sessions (e.g. EURUSD, where Monday session starts on Sunday, 17:00 UTC-4) this value can be lower by 1 than the month of the trading day.

**See also:** `month`, `time()`, `year()`, `dayofmonth()`, `dayofweek()`, `hour()`, `minute()`, `second()`

### second()

```pine
second(time, timezone) → series int
```

**Arguments**

- `time` (series int): UNIX time in milliseconds.
- `timezone` (series string): Allows adjusting the returned value to a time zone specified in either UTC/GMT notation (e.g., "UTC-5", "GMT+0530") or as an IANA time zone database name (e.g., "America/New_York"). Optional. The default is `syminfo.timezone`.

**Returns:** Second (in exchange timezone) for provided UNIX time.

**Remarks**

UNIX time is the number of milliseconds that have elapsed since 00:00:00 UTC, 1 January 1970.

**See also:** `second`, `time()`, `year()`, `month()`, `dayofmonth()`, `dayofweek()`, `hour()`, `minute()`

### time()

Returns the opening UNIX timestamp for the specified timeframe and session, or `na` if the time point is outside the session.

```pine
time(timeframe, session, bars_back, timeframe_bars_back) → series int
time(timeframe, session, timezone, bars_back, timeframe_bars_back) → series int
```

**Arguments**

- `timeframe` (series string): The timeframe of the timestamp calculation. If the value is an empty string, the function uses the script's main timeframe.
- `session` (series string): Optional. The [session string](../concepts/sessions.md#creating-time-based-sessions) for filtering times. The function returns a timestamp if the time is in the specified session, or `na` if the time is outside the session. If the argument is an empty string, the function uses the default, which is the symbol's session.
- `bars_back` (series int, optional): Optional. The bar offset on the script's main timeframe. If the value is positive, the function finds the bar that is N bars before the current bar on the main timeframe, then retrieves the timestamp of the corresponding bar on the timeframe specified by the `timeframe` argument. If the value is a negative number from -1 to -500, the function calculates the expected timestamp of the `timeframe` bar corresponding to N bars after the current bar on the main timeframe. The default is 0.
- `timeframe_bars_back` (series int, optional): Optional. The additional bar offset on the timeframe specified by the `timeframe` argument. If the value is positive, the function retrieves the timestamp of the bar that is N `timeframe` bars before the one corresponding to the `bars_back` offset. If the value is a negative number from -1 to -500, the function calculates the expected timestamp of the `timeframe` bar that is N `timeframe` bars after the one corresponding to the `bars_back` offset. The default is 0.
- `timezone` (series string): Optional. The time zone of the session calculation. Usable only if the call includes a `session` argument. Accepts a [time zone string](../concepts/time.md#time-zone-strings) in UTC/GMT offset notation (e.g., `"UTC-5"`) or a string containing a valid identifier from the [IANA time zone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g., `"America/New_York"`). The default is `syminfo.timezone`.

```pine
//@version=6
indicator("Time", overlay=true)
// Try this on chart AAPL,1
timeinrange(res, sess) => not na(time(res, sess, "America/New_York")) ? 1 : 0
plot(timeinrange("1", "1300-1400"), color=color.red)

// This plots 1.0 at every start of 10 minute bar on a 1 minute chart:
newbar(res) => ta.change(time(res)) == 0 ? 0 : 1
plot(newbar("10"))
```

While setting up a session you can specify not just the hours and minutes but also the days of the week that will be included in that session.

If the days aren't specified, the session is considered to have been set from Sunday (1) to Saturday (7), i.e. "1100-2000" is the same as "1100-1200:1234567".

You can change that by specifying the days. For example, on a symbol that is traded seven days a week with the 24-hour trading session the following script will not color Saturdays and Sundays:

```pine
//@version=6
indicator("Time", overlay=true)
t1 = time(timeframe.period, "0000-0000:23456")
bgcolor(not na(t1) ? color.new(color.blue, 90) : na)
```

One `session` argument can include several different sessions, separated by commas. For example, the following script will highlight the bars from 10:00 to 11:00 and from 14:00 to 15:00 (workdays only):

```pine
//@version=6
indicator("Time", overlay=true)
t1 = time(timeframe.period, "1000-1100,1400-1500:23456")
bgcolor(not na(t1) ? color.new(color.blue, 90) : na)
```

```pine
//@version=6
indicator("Time", overlay=true)
// Try this on chart AAPL,1
timeinrange(res, sess) => not na(time(res, sess, "America/New_York")) ? 1 : 0
plot(timeinrange("1", "1300-1400"), color=color.red)

// This plots 1.0 at every start of 10 minute bar on a 1 minute chart:
newbar(res) => ta.change(time(res)) == 0 ? 0 : 1
plot(newbar("10"))
```

While setting up a session you can specify not just the hours and minutes but also the days of the week that will be included in that session.

If the days aren't specified, the session is considered to have been set from Sunday (1) to Saturday (7), i.e. "1100-2000" is the same as "1100-1200:1234567".

You can change that by specifying the days. For example, on a symbol that is traded seven days a week with the 24-hour trading session the following script will not color Saturdays and Sundays:

```pine
//@version=6
indicator("Time", overlay=true)
t1 = time(timeframe.period, "0000-0000:23456")
bgcolor(not na(t1) ? color.new(color.blue, 90) : na)
```

One `session` argument can include several different sessions, separated by commas. For example, the following script will highlight the bars from 10:00 to 11:00 and from 14:00 to 15:00 (workdays only):

```pine
//@version=6
indicator("Time", overlay=true)
t1 = time(timeframe.period, "1000-1100,1400-1500:23456")
bgcolor(not na(t1) ? color.new(color.blue, 90) : na)
```

**Returns:** The opening UNIX timestamp.

**Remarks**

UNIX time is a standardized date and time representation that measures the number of non-leap seconds elapsed since January 1, 1970 at 00:00:00 UTC. Pine Script expresses UNIX time values in milliseconds. See the [UNIX timestamps](../concepts/time.md#unix-timestamps) section of the User Manual's [Time](../concepts/time.md#time) page to learn more.

**See also:** `time`

### time_close()

Returns the closing UNIX timestamp for the specified timeframe and session, or `na` if the time point is outside the session. On tick charts and price-based charts such as Renko, line break, Kagi, point & figure, and range, the function returns `na` on the latest realtime bar because the future closing time is unpredictable. However, it returns a valid timestamp for any previous bar.

```pine
time_close(timeframe, session, bars_back, timeframe_bars_back) → series int
time_close(timeframe, session, timezone, bars_back, timeframe_bars_back) → series int
```

**Arguments**

- `timeframe` (series string): The timeframe of the timestamp calculation. If the value is an empty string, the function uses the script's main timeframe.
- `session` (series string): Optional. The [session string](../concepts/sessions.md#creating-time-based-sessions) for filtering times. The function returns a timestamp if the time is in the specified session, or `na` if the time is outside the session. If the argument is an empty string, the function uses the default, which is the symbol's session.
- `bars_back` (series int, optional): Optional. The bar offset on the script's main timeframe. If the value is positive, the function finds the bar that is N bars before the current bar on the main timeframe, then retrieves the timestamp of the corresponding bar on the timeframe specified by the `timeframe` argument. If the value is a negative number from -1 to -500, the function calculates the expected timestamp of the `timeframe` bar corresponding to N bars after the current bar on the main timeframe. The default is 0.
- `timeframe_bars_back` (series int, optional): Optional. The additional bar offset on the timeframe specified by the `timeframe` argument. If the value is positive, the function retrieves the timestamp of the bar that is N `timeframe` bars before the one corresponding to the `bars_back` offset. If the value is a negative number from -1 to -500, the function calculates the expected timestamp of the `timeframe` bar that is N `timeframe` bars after the one corresponding to the `bars_back` offset. The default is 0.
- `timezone` (series string): Optional. The time zone of the session calculation. Usable only if the call includes a `session` argument. Accepts a [time zone string](../concepts/time.md#time-zone-strings) in UTC/GMT offset notation (e.g., `"UTC-5"`) or a string containing a valid identifier from the [IANA time zone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g., `"America/New_York"`). The default is `syminfo.timezone`.

```pine
//@version=6
indicator("Time", overlay=true)
t1 = time_close(timeframe.period, "1200-1300", "America/New_York")
bgcolor(not na(t1) ? color.new(color.blue, 90) : na)
```

```pine
//@version=6
indicator("Time", overlay=true)
t1 = time_close(timeframe.period, "1200-1300", "America/New_York")
bgcolor(not na(t1) ? color.new(color.blue, 90) : na)
```

**Returns:** The closing UNIX timestamp.

**Remarks**

UNIX time is a standardized date and time representation that measures the number of non-leap seconds elapsed since January 1, 1970 at 00:00:00 UTC. Pine Script expresses UNIX time values in milliseconds. See the [UNIX timestamps](../concepts/time.md#unix-timestamps) section of the User Manual's [Time](../concepts/time.md#time) page to learn more.

**See also:** `time_close`

### timestamp()

Function timestamp returns UNIX time of specified date and time.

```pine
timestamp(dateString) → const int
timestamp(dateString) → series int
timestamp(year, month, day, hour, minute, second) → simple int
timestamp(year, month, day, hour, minute, second) → series int
timestamp(timezone, year, month, day, hour, minute, second) → simple int
timestamp(timezone, year, month, day, hour, minute, second) → series int
```

**Arguments**

- `dateString` (const string | series string): A string containing the date and, optionally, the time and time zone. Its format must comply with either the [IETF RFC 2822](https://tools.ietf.org/html/rfc2822#section-3.3) or [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standards ("DD MMM YYYY hh:mm:ss ±hhmm" or "YYYY-MM-DDThh:mm:ss±hh:mm", so "20 Feb 2020" or "2020-02-20"). If no time is supplied, "00:00" is used. If no time zone is supplied, GMT+0 will be used. Note that this diverges from the usual behavior of the function where it returns time in the exchange's timezone.
- `year` (simple int | series int): Year.
- `month` (simple int | series int): Month.
- `day` (simple int | series int): Day.
- `hour` (simple int | series int, optional): (Optional argument) Hour. Default is 0.
- `minute` (simple int | series int, optional): (Optional argument) Minute. Default is 0.
- `second` (simple int | series int, optional): (Optional argument) Second. Default is 0.
- `timezone` (simple string | series string): Allows adjusting the returned value to a time zone specified in either UTC/GMT notation (e.g., "UTC-5", "GMT+0530") or as an IANA time zone database name (e.g., "America/New_York"). Optional. The default is `syminfo.timezone`.

**Returns:** UNIX time.

**Remarks**

UNIX time is the number of milliseconds that have elapsed since 00:00:00 UTC, 1 January 1970.

```pine
//@version=6
indicator("timestamp")
plot(timestamp(2016, 01, 19, 09, 30), linewidth=3, color=color.green)
plot(timestamp(syminfo.timezone, 2016, 01, 19, 09, 30), color=color.blue)
plot(timestamp(2016, 01, 19, 09, 30), color=color.yellow)
plot(timestamp("GMT+6", 2016, 01, 19, 09, 30))
plot(timestamp(2019, 06, 19, 09, 30, 15), color=color.lime)
plot(timestamp("GMT+3", 2019, 06, 19, 09, 30, 15), color=color.fuchsia)
plot(timestamp("Feb 01 2020 22:10:05"))
plot(timestamp("2011-10-10T14:48:00"))
plot(timestamp("04 Dec 1995 00:12:00 GMT+5"))
```

**See also:** `time()`, `time`, `timenow`, `syminfo.timezone`

### weekofyear()

Calculates the week number of the year, in a specified time zone, from a UNIX timestamp.

```pine
weekofyear(time, timezone) → series int
```

**Arguments**

- `time` (series int): A UNIX timestamp in milliseconds.
- `timezone` (series string): Optional. Specifies the time zone of the returned week number. The value can be a time zone string in UTC/GMT offset notation (e.g., "UTC-5") or IANA time zone database notation (e.g., "America/New_York"). The default is `syminfo.timezone`.

**Returns:** The calculated week number, expressed in the specified time zone.

**Remarks**

A [UNIX timestamp](../concepts/time.md#unix-timestamps) represents the number of milliseconds elapsed since 00:00 UTC on 1970-01-01. The meaning of a UNIX timestamp does not change relative to any time zone.

**See also:** `weekofyear`, `dayofmonth()`, `dayofweek()`, `time()`, `year()`, `month()`, `hour()`, `minute()`, `second()`

### year()

```pine
year(time, timezone) → series int
```

**Arguments**

- `time` (series int): UNIX time in milliseconds.
- `timezone` (series string): Allows adjusting the returned value to a time zone specified in either UTC/GMT notation (e.g., "UTC-5", "GMT+0530") or as an IANA time zone database name (e.g., "America/New_York"). Optional. The default is `syminfo.timezone`.

**Returns:** Year (in exchange timezone) for provided UNIX time.

**Remarks**

UNIX time is the number of milliseconds that have elapsed since 00:00:00 UTC, 1 January 1970.

Note that this function returns the year based on the time of the bar's open. For overnight sessions (e.g. EURUSD, where Monday session starts on Sunday, 17:00 UTC-4) this value can be lower by 1 than the year of the trading day.

**See also:** `year`, `time()`, `month()`, `dayofmonth()`, `dayofweek()`, `hour()`, `minute()`, `second()`
