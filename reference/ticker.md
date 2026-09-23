# `ticker.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Functions

### ticker.heikinashi()

Creates a ticker identifier for requesting Heikin Ashi bar values.

```pine
ticker.heikinashi(symbol) → simple string
ticker.heikinashi(symbol) → series string
```

**Arguments**

- `symbol` (simple string | series string): Symbol ticker identifier.

**Returns:** String value of ticker id, that can be supplied to `request.security()` function.

```pine
//@version=6
indicator("ticker.heikinashi", overlay=true)
heikinashi_close = request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, close)

heikinashi_aapl_60_close = request.security(ticker.heikinashi("AAPL"), "60", close)
plot(heikinashi_close)
plot(heikinashi_aapl_60_close)
```

**See also:** `syminfo.tickerid`, `syminfo.ticker`, `request.security()`, `ticker.renko()`, `ticker.linebreak()`, `ticker.kagi()`, `ticker.pointfigure()`

### ticker.inherit()

Constructs a ticker ID for the specified `symbol` with additional parameters inherited from the ticker ID passed into the function call, allowing the script to request a symbol's data using the same modifiers that the `from_tickerid` has, including extended session, dividend adjustment, currency conversion, non-standard chart types, back-adjustment, settlement-as-close, etc.

```pine
ticker.inherit(from_tickerid, symbol) → simple string
ticker.inherit(from_tickerid, symbol) → series string
```

**Arguments**

- `from_tickerid` (simple string | series string): The ticker ID to inherit modifiers from.
- `symbol` (simple string | series string): The symbol to construct the new ticker ID for.

**Remarks**

If the constructed ticker ID inherits a modifier that doesn't apply to the symbol (e.g., if the `from_tickerid` has Extended Hours enabled, but no such option is available for the `symbol`), the script will ignore the modifier when requesting data using the ID.

```pine
//@version=6
indicator("ticker.inherit")

//@variable A "NASDAQ:AAPL" ticker ID with Extender Hours enabled.
tickerExtHours = ticker.new("NASDAQ", "AAPL", session.extended)
//@variable A Heikin Ashi ticker ID for "NASDAQ:AAPL" with Extended Hours enabled.
HAtickerExtHours = ticker.heikinashi(tickerExtHours)
//@variable The "NASDAQ:MSFT" symbol with no modifiers.
testSymbol = "NASDAQ:MSFT"
//@variable A ticker ID for "NASDAQ:MSFT" with inherited Heikin Ashi and Extended Hours modifiers.
testSymbolHAtickerExtHours = ticker.inherit(HAtickerExtHours, testSymbol)

//@variable The `close` price requested using "NASDAQ:MSFT" with inherited modifiers.
secData = request.security(testSymbolHAtickerExtHours, "60", close, ignore_invalid_symbol = true)
//@variable The `close` price requested using "NASDAQ:MSFT" without modifiers.
compareData = request.security(testSymbol, "60", close, ignore_invalid_symbol = true)

plot(secData, color = color.green)
plot(compareData)
```

### ticker.kagi()

Creates a ticker identifier for requesting Kagi values.

```pine
ticker.kagi(symbol, reversal) → simple string
ticker.kagi(symbol, reversal) → series string
ticker.kagi(symbol, param, style) → simple string
ticker.kagi(symbol, param, style) → series string
```

**Arguments**

- `symbol` (simple string | series string): Symbol ticker identifier.
- `reversal` (simple int/float | series int/float): Reversal amount (absolute price value).
- `param` (simple int/float | series int/float): Represents the ticker's "ATR length" value if the `style` value is "ATR", "Reversal amount" value if the `style` is "Traditional", or "Percentage" value if the `style` is "PercentageLTP".
- `style` (series string): Specifies the ticker's box size assignment method. Possible values: "ATR" for Average True Range sizing, "Traditional" to use a fixed size, or "PercentageLTP" to use a percentage of the last trading price.

**Returns:** String value of ticker id, that can be supplied to `request.security()` function.

```pine
//@version=6
indicator("ticker.kagi", overlay=true)
kagi_tickerid = ticker.kagi(syminfo.tickerid, 3)
kagi_close = request.security(kagi_tickerid, timeframe.period, close)
plot(kagi_close)
```

**See also:** `syminfo.tickerid`, `syminfo.ticker`, `request.security()`, `ticker.heikinashi()`, `ticker.renko()`, `ticker.linebreak()`, `ticker.pointfigure()`

### ticker.linebreak()

Creates a ticker identifier for requesting Line Break values.

```pine
ticker.linebreak(symbol, number_of_lines) → simple string
ticker.linebreak(symbol, number_of_lines) → series string
```

**Arguments**

- `symbol` (simple string | series string): Symbol ticker identifier.
- `number_of_lines` (simple int | series int): Number of line.

**Returns:** String value of ticker id, that can be supplied to `request.security()` function.

```pine
//@version=6
indicator("ticker.linebreak", overlay=true)
linebreak_tickerid = ticker.linebreak(syminfo.tickerid, 3)
linebreak_close = request.security(linebreak_tickerid, timeframe.period, close)
plot(linebreak_close)
```

**See also:** `syminfo.tickerid`, `syminfo.ticker`, `request.security()`, `ticker.heikinashi()`, `ticker.renko()`, `ticker.kagi()`, `ticker.pointfigure()`

### ticker.modify()

Creates a ticker identifier for requesting additional data for the script.

```pine
ticker.modify(tickerid, session, adjustment, backadjustment, settlement_as_close) → simple string
ticker.modify(tickerid, session, adjustment, backadjustment, settlement_as_close) → series string
```

**Arguments**

- `tickerid` (simple string | series string): Symbol name with exchange prefix, e.g. 'BATS:MSFT', 'NASDAQ:MSFT' or tickerid with session and adjustment from the `ticker.new()` function.
- `session` (simple string | series string, optional): Session type. Optional argument. Possible values: `session.regular`, `session.extended`. Session type of the current chart is `syminfo.session`. If session is not given, then `syminfo.session` value is used.
- `adjustment` (simple string | series string, optional): Adjustment type. Optional argument. Possible values: `adjustment.none`, `adjustment.splits`, `adjustment.dividends`. If adjustment is not given, then default adjustment value is used (can be different depending on particular instrument).
- `backadjustment` (simple backadjustment, optional): Specifies whether past contract data on continuous futures symbols is back-adjusted. This setting only affects the data from symbols with this option available on their charts. Optional. The default is `backadjustment.inherit`, meaning that the modified ticker ID inherits the setting from the ticker ID passed to the `tickerid` parameter, or it inherits the symbol's default if the `tickerid` does not specify this setting. Possible values: `backadjustment.inherit`, `backadjustment.on`, `backadjustment.off`.
- `settlement_as_close` (simple settlement, optional): Specifies whether a futures symbol's `close` value represents the actual closing price or the settlement price on "1D" and higher timeframes. This setting only affects the data from symbols with this option available on their charts. Optional. The default is `settlement_as_close.inherit`, meaning that the modified ticker ID inherits the setting from the `tickerid` passed into the function, or it inherits the chart symbol's default if the `tickerid` does not specify this setting. Possible values: `settlement_as_close.inherit`, `settlement_as_close.on`, `settlement_as_close.off`.

**Returns:** String value of ticker id, that can be supplied to `request.security()` function.

```pine
//@version=6
indicator("ticker_modify", overlay=true)
t1 = ticker.new(syminfo.prefix, syminfo.ticker, session.regular, adjustment.splits)
c1 = request.security(t1, "D", close)
t2 = ticker.modify(t1, session.extended)
c2 = request.security(t2, "2D", close)
plot(c1)
plot(c2)
```

**See also:** `syminfo.tickerid`, `syminfo.ticker`, `syminfo.session`, `session.extended`, `session.regular`, `ticker.heikinashi()`, `adjustment.none`, `adjustment.splits`, `adjustment.dividends`, `backadjustment.inherit`, `backadjustment.on`, `backadjustment.off`, `settlement_as_close.inherit`, `settlement_as_close.on`, `settlement_as_close.off`

### ticker.new()

Creates a ticker identifier for requesting additional data for the script.

```pine
ticker.new(prefix, ticker, session, adjustment, backadjustment, settlement_as_close) → simple string
ticker.new(prefix, ticker, session, adjustment, backadjustment, settlement_as_close) → series string
```

**Arguments**

- `prefix` (simple string | series string): Exchange prefix. For example: 'BATS', 'NYSE', 'NASDAQ'. Exchange prefix of main series is `syminfo.prefix`.
- `ticker` (simple string | series string): Ticker name. For example 'AAPL', 'MSFT', 'EURUSD'. Ticker name of the main series is `syminfo.ticker`.
- `session` (simple string | series string, optional): Session type. Optional argument. Possible values: `session.regular`, `session.extended`. Session type of the current chart is `syminfo.session`. If session is not given, then `syminfo.session` value is used.
- `adjustment` (simple string | series string, optional): Adjustment type. Optional argument. Possible values: `adjustment.none`, `adjustment.splits`, `adjustment.dividends`. If adjustment is not given, then default adjustment value is used (can be different depending on particular instrument).
- `backadjustment` (simple backadjustment, optional): Specifies whether past contract data on continuous futures symbols is back-adjusted. This setting only affects the data from symbols with this option available on their charts. Optional. The default is `backadjustment.inherit`, meaning that the new ticker ID inherits the symbol's default setting. Possible values: `backadjustment.inherit`, `backadjustment.on`, `backadjustment.off`.
- `settlement_as_close` (simple settlement, optional): Specifies whether a futures symbol's `close` value represents the actual closing price or the settlement price on "1D" and higher timeframes. This setting only affects the data from symbols with this option available on their charts. Optional. The default is `settlement_as_close.inherit`, meaning that the new ticker ID inherits the chart symbol's default setting. Possible values: `settlement_as_close.inherit`, `settlement_as_close.on`, `settlement_as_close.off`.

**Returns:** String value of ticker id, that can be supplied to `request.security()` function.

**Remarks**

You may use return value of `ticker.new()` function as input argument for `ticker.heikinashi()`, `ticker.renko()`, `ticker.linebreak()`, `ticker.kagi()`, `ticker.pointfigure()` functions.

```pine
//@version=6
indicator("ticker.new", overlay=true)
t = ticker.new(syminfo.prefix, syminfo.ticker, session.regular, adjustment.splits)
t2 = ticker.heikinashi(t)
c = request.security(t2, timeframe.period, low, barmerge.gaps_on)
plot(c, style=plot.style_linebr)
```

**See also:** `syminfo.tickerid`, `syminfo.ticker`, `syminfo.session`, `session.extended`, `session.regular`, `ticker.heikinashi()`, `adjustment.none`, `adjustment.splits`, `adjustment.dividends`, `backadjustment.inherit`, `backadjustment.on`, `backadjustment.off`, `settlement_as_close.inherit`, `settlement_as_close.on`, `settlement_as_close.off`

### ticker.pointfigure()

Creates a ticker identifier for requesting Point & Figure values.

```pine
ticker.pointfigure(symbol, source, style, param, reversal) → simple string
ticker.pointfigure(symbol, source, style, param, reversal) → series string
```

**Arguments**

- `symbol` (simple string | series string): Symbol ticker identifier.
- `source` (simple string | series string): The source for calculating Point & Figure. Possible values are: 'hl', 'close'.
- `style` (simple string | series string): Specifies the ticker's box size assignment method. Possible values: "ATR" for Average True Range sizing, "Traditional" to use a fixed size, or "PercentageLTP" to use a percentage of the last trading price.
- `param` (simple int/float | series int/float): Represents the ticker's "ATR length" value if the `style` value is "ATR", "Box size" value if the `style` is "Traditional", or "Percentage" value if the `style` is "PercentageLTP".
- `reversal` (simple int | series int): Reversal amount.

**Returns:** String value of ticker id, that can be supplied to `request.security()` function.

```pine
//@version=6
indicator("ticker.pointfigure", overlay=true)
pnf_tickerid = ticker.pointfigure(syminfo.tickerid, "hl", "Traditional", 1, 3)
pnf_close = request.security(pnf_tickerid, timeframe.period, close)
plot(pnf_close)
```

**See also:** `syminfo.tickerid`, `syminfo.ticker`, `request.security()`, `ticker.heikinashi()`, `ticker.renko()`, `ticker.linebreak()`, `ticker.kagi()`

### ticker.renko()

Creates a ticker identifier for requesting Renko values.

```pine
ticker.renko(symbol, style, param, request_wicks, source) → simple string
ticker.renko(symbol, style, param, request_wicks, source) → series string
```

**Arguments**

- `symbol` (simple string | series string): Symbol ticker identifier.
- `style` (simple string | series string): Specifies the ticker's box size assignment method. Possible values: "ATR" for Average True Range sizing, "Traditional" to use a fixed size, or "PercentageLTP" to use a percentage of the last trading price.
- `param` (simple int/float | series int/float): Represents the ticker's "ATR length" value if the `style` value is "ATR", "Box size" value if the `style` is "Traditional", or "Percentage" value if the `style` is "PercentageLTP".
- `request_wicks` (simple bool | series bool, optional): Specifies if wick values are returned for Renko bricks. When `true`, `high` and `low` values requested from a symbol using the ticker formed by this function will include wick values when they are present. When `false`, `high` and `low` will always be equal to either `open` or `close`. Optional. The default is `false`. A detailed explanation of how Renko wicks are calculated can be found in our [Help Center](https://www.tradingview.com/support/solutions/43000481040-what-do-renko-wicks-mean/).
- `source` (simple string | series string, optional): The source used to calculate bricks. Optional. Possible values: "Close", "OHLC". The default is "Close".

```pine
//@version=6
indicator("Renko candles", overlay=false)
renko_tickerid = ticker.renko(syminfo.tickerid, "ATR", 10)
[renko_open, renko_high, renko_low, renko_close] = request.security(renko_tickerid, timeframe.period, [open, high, low, close])
plotcandle(renko_open, renko_high, renko_low, renko_close, color = renko_close > renko_open ? color.green : color.red)
```

```pine
//@version=6
indicator("Renko candles", overlay=false)
renko_tickerid = ticker.renko(syminfo.tickerid, "ATR", 10)
[renko_open, renko_high, renko_low, renko_close] = request.security(renko_tickerid, timeframe.period, [open, high, low, close])
plotcandle(renko_open, renko_high, renko_low, renko_close, color = renko_close > renko_open ? color.green : color.red)
```

**Returns:** String value of ticker id, that can be supplied to `request.security()` function.

```pine
//@version=6
indicator("ticker.renko", overlay=true)
renko_tickerid = ticker.renko(syminfo.tickerid, "ATR", 10)
renko_close = request.security(renko_tickerid, timeframe.period, close)
plot(renko_close)
```

**See also:** `syminfo.tickerid`, `syminfo.ticker`, `request.security()`, `ticker.heikinashi()`, `ticker.linebreak()`, `ticker.kagi()`, `ticker.pointfigure()`

### ticker.standard()

Creates a ticker to request data from a standard chart that is unaffected by modifiers like extended session, dividend adjustment, currency conversion, and the calculations of non-standard chart types: Heikin Ashi, Renko, etc. Among other things, this makes it possible to retrieve standard chart values when the script is running on a non-standard chart.

```pine
ticker.standard(symbol) → simple string
ticker.standard(symbol) → series string
```

**Arguments**

- `symbol` (simple string | series string, optional): A ticker ID to be converted into its standard form. Optional. The default is `syminfo.tickerid`.

**Returns:** A string representing the ticker of a standard chart in the "prefix:ticker" format. If the `symbol` argument does not contain the prefix and ticker information, the function returns the supplied argument as is.

```pine
//@version=6
indicator("ticker.standard", overlay = true)
// This script should be run on a non-standard chart such as HA, Renko...

// Requests data from the chart type the script is running on.
chartTypeValue = request.security(syminfo.tickerid, "1D", close)

// Request data from the standard chart type, regardless of the chart type the script is running on.
standardChartValue = request.security(ticker.standard(syminfo.tickerid), "1D", close)

// This will not use a standard ticker ID because the `symbol` argument contains only the ticker — not the prefix (exchange).
standardChartValue2 = request.security(ticker.standard(syminfo.ticker), "1D", close)

plot(chartTypeValue)
plot(standardChartValue, color = color.green)
```

**See also:** `request.security()`
