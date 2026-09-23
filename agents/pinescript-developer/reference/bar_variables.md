# Bar data variables (open, high, low, close, volume, bar_index, ...)

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### ask

The ask price at the time of the current tick, which represents the lowest price an active seller will accept for the instrument at its current value. This information is available only on the "1T" timeframe. On other timeframes, the variable's value is `na`.

Type: `series float`

**Remarks**

If the bid/ask values change since the last tick but no new trades are made, these changes will not be reflected in the value of this variable. It is only updated on new ticks.

**See also:** `open`, `high`, `low`, `volume`, `time()`, `hl2`, `hlc3`, `hlcc4`, `ohlc4`, `bid`

### bar_index

Current bar index. Numbering is zero-based, index of the first bar is 0.

Type: `series int`

**Remarks**

Note that **bar_index** has replaced **n** variable in version 4.

Note that bar indexing starts from 0 on the first historical bar.

Please note that using this variable/function can cause [indicator repainting](../concepts/repainting.md).

```pine
//@version=6
indicator("bar_index")
plot(bar_index)
plot(bar_index > 5000 ? close : 0)
```

**See also:** `last_bar_index`, `barstate.isfirst`, `barstate.islast`, `barstate.isrealtime`

### bid

The bid price at the time of the current tick, which represents the highest price an active buyer is willing to pay for the instrument at its current value. This information is available only on the "1T" timeframe. On other timeframes, the variable's value is `na`.

Type: `series float`

**Remarks**

If the bid/ask values change since the last tick but no new trades are made, these changes will not be reflected in the value of this variable. It is only updated on new ticks.

**See also:** `open`, `high`, `low`, `volume`, `time()`, `hl2`, `hlc3`, `hlcc4`, `ohlc4`, `ask`

### close

Close price of the current bar when it has closed, or last traded price of a yet incomplete, realtime bar.

Type: `series float`

**Remarks**

Previous values may be accessed with square brackets operator [], e.g. close[1], close[2].

**See also:** `open`, `high`, `low`, `volume`, `time()`, `hl2`, `hlc3`, `hlcc4`, `ohlc4`, `ask`, `bid`

### high

Current high price.

Type: `series float`

**Remarks**

Previous values may be accessed with square brackets operator [], e.g. high[1], high[2].

**See also:** `open`, `low`, `close`, `volume`, `time()`, `hl2`, `hlc3`, `hlcc4`, `ohlc4`, `ask`, `bid`

### hl2

Is a shortcut for (high + low)/2

Type: `series float`

**See also:** `open`, `high`, `low`, `close`, `volume`, `time()`, `hlc3`, `hlcc4`, `ohlc4`, `ask`, `bid`

### hlc3

Is a shortcut for (high + low + close)/3

Type: `series float`

**See also:** `open`, `high`, `low`, `close`, `volume`, `time()`, `hl2`, `hlcc4`, `ohlc4`, `ask`, `bid`

### hlcc4

Is a shortcut for (high + low + close + close)/4

Type: `series float`

**See also:** `open`, `high`, `low`, `close`, `volume`, `time()`, `hl2`, `hlc3`, `ohlc4`, `ask`, `bid`

### last_bar_index

Bar index of the last chart bar. Bar indices begin at zero on the first bar.

Type: `series int`

**Returns:** Last historical bar index for closed markets, or the real-time bar index for open markets.

**Remarks**

Please note that using this variable can cause [indicator repainting](../concepts/repainting.md).

```pine
//@version=6
strategy("Mark Last X Bars For Backtesting", overlay = true, calc_on_every_tick = true)
lastBarsFilterInput = input.int(100, "Bars Count:")
// Here, we store the 'last_bar_index' value that is known from the beginning of the script's calculation.
// The 'last_bar_index' will change when new real-time bars appear, so we declare 'lastbar' with the 'var' keyword.
var lastbar = last_bar_index
// Check if the current bar_index is 'lastBarsFilterInput' removed from the last bar on the chart, or the chart is traded in real-time.
allowedToTrade = (lastbar - bar_index <= lastBarsFilterInput) or barstate.isrealtime
bgcolor(allowedToTrade ? color.new(color.green, 80) : na)
```

**See also:** `bar_index`, `last_bar_time`, `barstate.ishistory`, `barstate.isrealtime`

### last_bar_time

Time in UNIX format of the last chart bar. It is the number of milliseconds that have elapsed since 00:00:00 UTC, 1 January 1970.

Type: `series int`

**Remarks**

Please note that using this variable/function can cause [indicator repainting](../concepts/repainting.md).

Note that this variable returns the timestamp based on the time of the bar's open.

**See also:** `time`, `timenow`, `timestamp()`, `last_bar_index`

### low

Current low price.

Type: `series float`

**Remarks**

Previous values may be accessed with square brackets operator [], e.g. low[1], low[2].

**See also:** `open`, `high`, `close`, `volume`, `time()`, `hl2`, `hlc3`, `hlcc4`, `ohlc4`, `ask`, `bid`

### ohlc4

Is a shortcut for (open + high + low + close)/4

Type: `series float`

**See also:** `open`, `high`, `low`, `close`, `volume`, `time()`, `hl2`, `hlc3`, `hlcc4`

### open

Current open price.

Type: `series float`

**Remarks**

Previous values may be accessed with square brackets operator [], e.g. open[1], open[2].

**See also:** `high`, `low`, `close`, `volume`, `time()`, `hl2`, `hlc3`, `hlcc4`, `ohlc4`, `ask`, `bid`

### volume

Current bar volume.

Type: `series float`

**Remarks**

Previous values may be accessed with square brackets operator [], e.g. volume[1], volume[2].

**See also:** `open`, `high`, `low`, `close`, `time()`, `hl2`, `hlc3`, `hlcc4`, `ohlc4`, `ask`, `bid`
