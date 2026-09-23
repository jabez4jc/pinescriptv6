# `session.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### session.isfirstbar

Returns `true` if the current bar is the first bar of the day's session, `false` otherwise. If extended session information is used, only returns `true` on the first bar of the pre-market bars.

Type: `series bool`

```pine
//@version=6
strategy("`session.isfirstbar` Example", overlay = true)
longCondition = year >= 2022
// Place a long order at the `close` of the trading session's first bar.
if session.isfirstbar and longCondition
    strategy.entry("Long", strategy.long)

// Close the long position at the `close` of the trading session's last bar.
if session.islastbar and barstate.isconfirmed
    strategy.close("Long", immediately = true)
```

**See also:** `session.isfirstbar_regular`, `session.islastbar`, `session.islastbar_regular`

### session.isfirstbar_regular

Returns `true` on the first regular session bar of the day, `false` otherwise. The result is the same whether extended session information is used or not.

Type: `series bool`

```pine
//@version=6
strategy("`session.isfirstbar_regular` Example", overlay = true)
longCondition = year >= 2022
// Place a long order at the `close` of the trading session's first bar.
if session.isfirstbar and longCondition
    strategy.entry("Long", strategy.long)
// Close the long position at the `close` of the trading session's last bar.
if session.islastbar_regular and barstate.isconfirmed
    strategy.close("Long", immediately = true)
```

**See also:** `session.isfirstbar`, `session.islastbar`

### session.islastbar

Returns `true` if the current bar is the last bar of the day's session, `false` otherwise. If extended session information is used, only returns `true` on the last bar of the post-market bars.

Type: `series bool`

**Remarks**

This variable is not guaranteed to return `true` once in every session because the last bar of the session might not exist if no trades occur during what should be the session's last bar.

This variable is not guaranteed to work as expected on non-standard chart types, e.g., Renko.

```pine
//@version=6
strategy("`session.islastbar` Example", overlay = true)
longCondition = year >= 2022
// Place a long order at the `close` of the trading session's last bar.
// The position will enter on the `open` of next session's first bar.
if session.islastbar and longCondition
    strategy.entry("Long", strategy.long)
 // Close 'Long' position at the close of the last bar of the trading session
if session.islastbar and barstate.isconfirmed
    strategy.close("Long", immediately = true)
```

**See also:** `session.isfirstbar`, `session.islastbar_regular`

### session.islastbar_regular

Returns `true` on the last regular session bar of the day, `false` otherwise. The result is the same whether extended session information is used or not.

Type: `series bool`

**Remarks**

This variable is not guaranteed to return `true` once in every session because the last bar of the session might not exist if no trades occur during what should be the session's last bar.

This variable is not guaranteed to work as expected on non-standard chart types, e.g., Renko.

```pine
//@version=6
strategy("`session.islastbar_regular` Example", overlay = true)
longCondition = year >= 2022
// Place a long order at the `close` of the trading session's first bar.
if session.isfirstbar and longCondition
    strategy.entry("Long", strategy.long)
// Close the long position at the `close` of the trading session's last bar.
if session.islastbar_regular and barstate.isconfirmed
    strategy.close("Long", immediately = true)
```

**See also:** `session.isfirstbar`, `session.islastbar`, `session.isfirstbar_regular`

### session.ismarket

Returns `true` if the current bar is a part of the regular trading hours (i.e. market hours), `false` otherwise.

Type: `series bool`

**See also:** `session.ispremarket`, `session.ispostmarket`

### session.ispostmarket

Returns `true` if the current bar is a part of the post-market, `false` otherwise. On non-intraday charts always returns `false`.

Type: `series bool`

**See also:** `session.ismarket`, `session.ispremarket`

### session.ispremarket

Returns `true` if the current bar is a part of the pre-market, `false` otherwise. On non-intraday charts always returns `false`.

Type: `series bool`

**See also:** `session.ismarket`, `session.ispostmarket`
