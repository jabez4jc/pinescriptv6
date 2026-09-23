# `strategy.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### strategy.account_currency

Returns the currency used to calculate results, which can be set in the strategy's properties.

Type: `simple string`

**See also:** `strategy()`, `strategy.convert_to_account()`, `strategy.convert_to_symbol()`

### strategy.avg_losing_trade

Returns the average amount of money lost per losing trade. Calculated as the sum of losses divided by the number of losing trades.

Type: `series float`

**See also:** `strategy.avg_losing_trade_percent`

### strategy.avg_losing_trade_percent

Returns the average percentage loss per losing trade. Calculated as the sum of loss percentages divided by the number of losing trades.

Type: `series float`

**See also:** `strategy.avg_losing_trade`

### strategy.avg_trade

Returns the average amount of money gained or lost per trade. Calculated as the sum of all profits and losses divided by the number of closed trades.

Type: `series float`

**See also:** `strategy.avg_trade_percent`

### strategy.avg_trade_percent

Returns the average percentage gain or loss per trade. Calculated as the sum of all profit and loss percentages divided by the number of closed trades.

Type: `series float`

**See also:** `strategy.avg_trade`

### strategy.avg_winning_trade

Returns the average amount of money gained per winning trade. Calculated as the sum of profits divided by the number of winning trades.

Type: `series float`

**See also:** `strategy.avg_winning_trade_percent`

### strategy.avg_winning_trade_percent

Returns the average percentage gain per winning trade. Calculated as the sum of profit percentages divided by the number of winning trades.

Type: `series float`

**See also:** `strategy.avg_winning_trade`

### strategy.closedtrades

Number of trades, which were closed for the whole trading range.

Type: `series int`

**See also:** `strategy.position_size`, `strategy.opentrades`, `strategy.wintrades`, `strategy.losstrades`, `strategy.eventrades`

### strategy.closedtrades.first_index

The index, or trade number, of the first (oldest) trade listed in the List of Trades. This number is usually zero. If more trades than the allowed limit have been closed, the oldest trades are removed, and this number is the index of the oldest remaining trade.

Type: `series int`

**See also:** `strategy.position_size`, `strategy.opentrades`, `strategy.wintrades`, `strategy.losstrades`, `strategy.eventrades`

### strategy.equity

Current equity (`strategy.initial_capital` + `strategy.netprofit` + `strategy.openprofit`).

Type: `series float`

**See also:** `strategy.netprofit`, `strategy.openprofit`, `strategy.position_size`

### strategy.eventrades

Number of breakeven trades for the whole trading range.

Type: `series int`

**See also:** `strategy.position_size`, `strategy.opentrades`, `strategy.closedtrades`, `strategy.wintrades`, `strategy.losstrades`

### strategy.grossloss

Total currency value of all completed losing trades.

Type: `series float`

**See also:** `strategy.netprofit`, `strategy.grossprofit`

### strategy.grossloss_percent

The total value of all completed losing trades, expressed as a percentage of the initial capital.

Type: `series float`

**See also:** `strategy.grossloss`

### strategy.grossprofit

Total currency value of all completed winning trades.

Type: `series float`

**See also:** `strategy.netprofit`, `strategy.grossloss`

### strategy.grossprofit_percent

The total currency value of all completed winning trades, expressed as a percentage of the initial capital.

Type: `series float`

**See also:** `strategy.grossprofit`

### strategy.initial_capital

The amount of initial capital set in the strategy properties.

Type: `series float`

**See also:** `strategy()`

### strategy.losstrades

Number of unprofitable trades for the whole trading range.

Type: `series int`

**See also:** `strategy.position_size`, `strategy.opentrades`, `strategy.closedtrades`, `strategy.wintrades`, `strategy.eventrades`

### strategy.margin_liquidation_price

When margin is used in a strategy, returns the price point where a simulated margin call will occur and liquidate enough of the position to meet the margin requirements.

Type: `series float`

**Remarks**

The variable returns `na` if the strategy does not use margin, i.e., the `strategy()` declaration statement does not specify an argument for the `margin_long` or `margin_short` parameter.

```pine
//@version=6
strategy("Margin call management", overlay = true, margin_long = 25, margin_short = 25,
  default_qty_type = strategy.percent_of_equity, default_qty_value = 395)

float maFast = ta.sma(close, 14)
float maSlow = ta.sma(close, 28)

if ta.crossover(maFast, maSlow)
    strategy.entry("Long", strategy.long)

if ta.crossunder(maFast, maSlow)
    strategy.entry("Short", strategy.short)

changePercent(v1, v2) =>
    float result = (v1 - v2) * 100 / math.abs(v2)

// exit when we're 10% away from a margin call, to prevent it.
if math.abs(changePercent(close, strategy.margin_liquidation_price)) <= 10
    strategy.close("Long")
    strategy.close("Short")
```

### strategy.max_contracts_held_all

Maximum number of contracts/shares/lots/units in one trade for the whole trading range.

Type: `series float`

**See also:** `strategy.position_size`, `strategy.max_contracts_held_long`, `strategy.max_contracts_held_short`

### strategy.max_contracts_held_long

Maximum number of contracts/shares/lots/units in one long trade for the whole trading range.

Type: `series float`

**See also:** `strategy.position_size`, `strategy.max_contracts_held_all`, `strategy.max_contracts_held_short`

### strategy.max_contracts_held_short

Maximum number of contracts/shares/lots/units in one short trade for the whole trading range.

Type: `series float`

**See also:** `strategy.position_size`, `strategy.max_contracts_held_all`, `strategy.max_contracts_held_long`

### strategy.max_drawdown

Maximum equity drawdown value for the whole trading range.

Type: `series float`

**See also:** `strategy.netprofit`, `strategy.equity`, `strategy.max_runup`

### strategy.max_drawdown_percent

The maximum equity drawdown value for the whole trading range, expressed as a percentage and calculated by formula: `Lowest Value During Trade / (Entry Price x Quantity) * 100`.

Type: `series float`

**See also:** `strategy.max_drawdown`

### strategy.max_runup

Maximum equity run-up value for the whole trading range.

Type: `series float`

**See also:** `strategy.netprofit`, `strategy.equity`, `strategy.max_drawdown`

### strategy.max_runup_percent

The maximum equity run-up value for the whole trading range, expressed as a percentage and calculated by formula: `Highest Value During Trade / (Entry Price x Quantity) * 100`.

Type: `series float`

**See also:** `strategy.max_runup`

### strategy.netprofit

Total currency value of all completed trades.

Type: `series float`

**See also:** `strategy.openprofit`, `strategy.position_size`, `strategy.grossprofit`, `strategy.grossloss`

### strategy.netprofit_percent

The total value of all completed trades, expressed as a percentage of the initial capital.

Type: `series float`

**See also:** `strategy.netprofit`

### strategy.openprofit

Current unrealized profit or loss for all open positions.

Type: `series float`

**See also:** `strategy.netprofit`, `strategy.position_size`

### strategy.openprofit_percent

The current unrealized profit or loss for all open positions, expressed as a percentage and calculated by formula: `openPL / realizedEquity * 100`.

Type: `series float`

**See also:** `strategy.openprofit`

### strategy.opentrades

Number of market position entries, which were not closed and remain opened. If there is no open market position, 0 is returned.

Type: `series int`

**See also:** `strategy.position_size`

### strategy.opentrades.capital_held

Returns the capital amount currently held by open trades.

Type: `series float`

**Remarks**

This variable returns `na` if the strategy does not simulate funding trades with a portion of the hypothetical account, i.e., if the `strategy()` function does not include nonzero `margin_long` or `margin_short` arguments.

```pine
//@version=6
strategy(
   "strategy.opentrades.capital_held example", overlay=false, margin_long=50, margin_short=50,
   default_qty_type = strategy.percent_of_equity, default_qty_value = 100
 )

// Enter a short position on the first bar.
if barstate.isfirst
    strategy.entry("Short", strategy.short)

// Plot the capital held by the short position.
plot(strategy.opentrades.capital_held, "Capital held")
// Highlight the chart background if the position is completely closed by margin calls.
bgcolor(bar_index > 0 and strategy.opentrades.capital_held == 0 ? color.new(color.red, 60) : na)
```

### strategy.position_avg_price

Average entry price of current market position. If the market position is flat, 'NaN' is returned.

Type: `series float`

**See also:** `strategy.position_size`

### strategy.position_entry_name

Name of the order that initially opened current market position.

Type: `series string`

**See also:** `strategy.position_size`

### strategy.position_size

Direction and size of the current market position. If the value is > 0, the market position is long. If the value is < 0, the market position is short. The absolute value is the number of contracts/shares/lots/units in trade (position size).

Type: `series float`

**See also:** `strategy.position_avg_price`

### strategy.wintrades

Number of profitable trades for the whole trading range.

Type: `series int`

**See also:** `strategy.position_size`, `strategy.opentrades`, `strategy.closedtrades`, `strategy.losstrades`, `strategy.eventrades`

## Functions

### strategy()

This declaration statement designates the script as a strategy and sets a number of strategy-related properties.

```pine
strategy(title, shorttitle, overlay, format, precision, scale, pyramiding, calc_on_order_fills, calc_on_every_tick, max_bars_back, backtest_fill_limits_assumption, default_qty_type, default_qty_value, initial_capital, currency, slippage, commission_type, commission_value, process_orders_on_close, close_entries_rule, margin_long, margin_short, explicit_plot_zorder, max_lines_count, max_labels_count, max_boxes_count, calc_bars_count, risk_free_rate, use_bar_magnifier, fill_orders_on_standard_ohlc, max_polylines_count, dynamic_requests, behind_chart, calc_on_every_history_tick) → void
```

**Arguments**

- `title` (const string): The title of the script. It is displayed on the chart when no `shorttitle` argument is used, and becomes the publication's default title when publishing the script.
- `shorttitle` (const string, optional): The script's display name on charts. If specified, it will replace the `title` argument in most chart-related windows. Optional. The default is the argument used for `title`.
- `overlay` (const bool, optional): If `true`, the script's visuals appear on the main chart pane if the user adds it to the chart directly, or in another script's pane if the user applies it to that script. If `false`, the script's visuals appear in a separate pane. Changes to the `overlay` value apply only after the user adds the script to the chart again. Additionally, if the user moves the script to another pane by selecting a "Move to" option in the script's "More" menu, it does not move back to its original pane after any updates to the source code. The default is `false`.  Strategy-specific labels that display entries and exits will be displayed over the main chart regardless of this setting.
- `format` (const string, optional): Specifies the formatting of the script's displayed values. Possible values: `format.inherit`, `format.price`, `format.volume`, `format.percent`. Optional. The default is `format.inherit`.
- `precision` (const int, optional): Specifies the number of digits after the floating point of the script's displayed values. Must be a non-negative integer no greater than 16. If `format` is set to `format.inherit` and `precision` is specified, the format will instead be set to `format.price`. When the function's `format` parameter uses `format.volume`, the `precision` parameter will not affect the result, as the decimal precision rules defined by `format.volume` supersede other precision settings. Optional. The default is inherited from the precision of the chart's symbol.
- `scale` (const scale_type, optional): Optional. Determines the location of the script's price scale and the scaling behavior of the script's visuals. Possible values are `scale.right`, `scale.left`, and `scale.none`. If specified and the script overlays on the main chart pane or another script's pane, the script scales its visuals independently to fit the pane's visual space. If the script occupies the same pane as the main chart or another script, `scale.right` or `scale.left` adds a separate price scale for the script to the left or right side of that pane. If the script occupies a separate pane, either argument positions the price scale for that pane on the left or right side without adding a new scale. If the argument is `scale.none`, which is valid only if the `overlay` argument is `true`, the script displays plotted numbers directly on the scale of the existing pane, or displays values on a new price scale if the user moves it to a new pane. Changes to the argument apply only after the user adds the script to the chart again. If not specified, the script uses the main price scale for the pane it occupies, and it does not scale its visuals separately if it overlays on an existing pane.
- `pyramiding` (const int, optional): The maximum number of entries allowed in the same direction. If the value is 0, only one entry order in the same direction can be opened, and additional entry orders are rejected. This setting can also be changed in the strategy's "Settings/Properties" tab. Optional. The default is 0.
- `calc_on_order_fills` (const bool, optional): Optional. Modifies the strategy's default calculation behavior on historical and realtime bars. Users can change the behavior by selecting the "On order fill" checkbox from the "Script executions" dropdown menu in the "Settings/Properties" tab. If `true`, the strategy performs a new execution to update its calculations on each tick where an order fill occurs. On historical bars, ticks refer to bar OHLC prices or intrabar prices from a lower timeframe, depending on the selected level of historical bar detail. On realtime bars, ticks refer to new price updates from the data feed. If the argument is `false`, the strategy executes only on the closing tick of each bar, and on any other ticks allowed by the selected "Script executions" settings. The default is `false`.
- `calc_on_every_tick` (const bool, optional): Optional. Modifies the strategy's default calculation behavior on realtime bars. Users can change the behavior by selecting the "On realtime bar tick" checkbox from the "Script executions" dropdown menu in the "Settings/Properties" tab. If `true`, the strategy performs a new execution to update its calculations on every available tick in each realtime bar, where a tick refers to a new price update from the data feed. If `false`, the strategy executes only on the closing tick of each bar, and on any other ticks allowed by the selected "Script executions" settings. The default is `false`.
- `max_bars_back` (const int, optional): The length of the historical buffer the script keeps for every variable and function, which determines how many past values can be referenced using the `[]` history-referencing operator. The required buffer size is automatically detected by the Pine Script® runtime. Using this parameter is only necessary when a runtime error occurs because automatic detection fails. More information on the underlying mechanics of the historical buffer can be found [in our Help Center](https://www.tradingview.com/chart/?solution=43000587849). Optional. The default is 0.
- `backtest_fill_limits_assumption` (const int, optional): Limit order execution threshold in ticks. When it is used, limit orders are only filled if the market price exceeds the order's limit level by the specified number of ticks. Optional. The default is 0.
- `default_qty_type` (const string, optional): Specifies the units used for `default_qty_value`. Possible values are: `strategy.fixed` for contracts/shares/lots, `strategy.cash` for currency amounts, or `strategy.percent_of_equity` for a percentage of available equity. This setting can also be changed in the strategy's "Settings/Properties" tab. Optional. The default is `strategy.fixed`.
- `default_qty_value` (const int/float, optional): The default quantity to trade, in units determined by the argument used with the `default_qty_type` parameter. This setting can also be changed in the strategy's "Settings/Properties" tab. Optional. The default is 1.
- `initial_capital` (const int/float, optional): The amount of funds initially available for the strategy to trade, in units of `currency`. Optional. The default is 1000000.
- `currency` (const string, optional): Currency used by the strategy in currency-related calculations. Market positions are still opened by converting `currency` into the chart symbol's currency. The conversion rate depends on the previous daily value of a corresponding currency pair from the most popular exchange. A spread symbol is used if no exchange provides the rate directly. Possible values: a "string" representing a valid currency code (e.g., "USD" or "USDT") or a constant from the `currency.*` namespace (e.g., `currency.USD` or `currency.USDT`). The default is `syminfo.currency`.
- `slippage` (const int, optional): Slippage expressed in ticks. This value is added to or subtracted from the fill price of market/stop orders to make the fill price less favorable for the strategy. E.g., if `syminfo.mintick` is 0.01 and `slippage` is set to 5, a long market order will enter at 5 * 0.01 = 0.05 points above the actual price. This setting can also be changed in the strategy's "Settings/Properties" tab. Optional. The default is 0.
- `commission_type` (const string, optional): Determines what the number passed to the `commission_value` expresses: `strategy.commission.percent` for a percentage of the cash volume of the order, `strategy.commission.cash_per_contract` for currency per contract, `strategy.commission.cash_per_order` for currency per order. This setting can also be changed in the strategy's "Settings/Properties" tab. Optional. The default is `strategy.commission.percent`.
- `commission_value` (const int/float, optional): Commission applied to the strategy's orders in units determined by the argument passed to the `commission_type` parameter. This setting can also be changed in the strategy's "Settings/Properties" tab. Optional. The default is 0.
- `process_orders_on_close` (const bool, optional): When set to `true`, generates an additional attempt to execute orders after a bar closes and strategy calculations are completed. If the orders are market orders, the broker emulator executes them before the next bar's open. If the orders are price-dependent, they will only be filled if the price conditions are met. This option is useful if you wish to close positions on the current bar. This setting can also be changed in the strategy's "Settings/Properties" tab. Optional. The default is `false`.
- `close_entries_rule` (const string, optional): Determines the order in which trades are closed. Possible values are: "FIFO" (First-In, First-Out) if the earliest exit order must close the earliest entry order, or "ANY" if the orders are closed based on the `from_entry` parameter of the `strategy.exit()` function. "FIFO" can only be used with stocks, futures and US forex (NFA Compliance Rule 2-43b), while "ANY" is allowed in non-US forex. Optional. The default is "FIFO".
- `margin_long` (const int/float, optional): Margin long is the percentage of the purchase price of a security that must be covered by cash or collateral for long positions. Must be a non-negative number. The logic used to simulate margin calls is explained in the [Help Center](https://www.tradingview.com/chart/?solution=43000628599). This setting can also be changed in the strategy's "Settings/Properties" tab. Optional. If the value is 0, the strategy does not enforce any limits on position size. The default is 100, in which case the strategy only uses its own funds and the long positions cannot be margin called.
- `margin_short` (const int/float, optional): Margin short is the percentage of the purchase price of a security that must be covered by cash or collateral for short positions. Must be a non-negative number. The logic used to simulate margin calls is explained in the [Help Center](https://www.tradingview.com/chart/?solution=43000628599). This setting can also be changed in the strategy's "Settings/Properties" tab. Optional. If the value is 0, the strategy does not enforce any limits on position size. The default is 100, in which case the strategy only uses its own funds. Note that even with no margin used, short positions *can* be margin called if the loss exceeds available funds.
- `explicit_plot_zorder` (const bool, optional): Specifies the order in which the script's plots, fills, and hlines are rendered. If `true`, plots are drawn in the order in which they appear in the script's code, each newer plot being drawn above the previous ones. This only applies to `plot*()` functions, `fill()`, and `hline()`. Optional. The default is `false`.
- `max_lines_count` (const int, optional): The number of last `line` drawings displayed. Possible values: 1-500. Optional. The default is 50.
- `max_labels_count` (const int, optional): The number of last `label` drawings displayed. Possible values: 1-500. Optional. The default is 50.
- `max_boxes_count` (const int, optional): The number of last `box` drawings displayed. Possible values: 1-500. Optional. The default is 50.
- `calc_bars_count` (const int, optional): Limits the initial calculation of a script to the last number of bars specified. When specified, a "Calculated bars" field will be included in the "Calculation" section of the script's "Settings/Inputs" tab. Optional. The default is 0, in which case the script executes on all available bars.
- `risk_free_rate` (const int/float, optional): The risk-free rate of return is the annual percentage change in the value of an investment with minimal or zero risk. It is used to calculate the [Sharpe](https://www.tradingview.com/support/solutions/43000681694) and [Sortino](https://www.tradingview.com/support/solutions/43000681697) ratios. Optional. The default is 2.
- `use_bar_magnifier` (const bool, optional): Optional. When `true`, the [Broker Emulator](../concepts/strategies.md#broker-emulator) uses lower timeframe data during backtesting on historical bars to achieve more realistic results. The default is `false`. Only [Premium](https://www.tradingview.com/gopro/) and higher-tier plans have access to this feature.
- `fill_orders_on_standard_ohlc` (const bool, optional): When `true`, forces strategies running on Heikin Ashi charts to fill orders using actual OHLC prices, for more realistic results. Optional. The default is `false`.
- `max_polylines_count` (const int, optional): The number of last `polyline` drawings displayed. Possible values: 1-100. The count is approximate; more drawings than the specified count may be displayed. Optional. The default is 50.
- `dynamic_requests` (const bool, optional): Specifies whether the script can dynamically call functions from the `request.*()` namespace. Dynamic `request.*()` calls are allowed within the local scopes of conditional structures (e.g., `if`), loops (e.g., `for`), and exported functions. Additionally, such calls allow "series" arguments for many of their parameters. Optional. The default is `true`. See the User Manual's [Dynamic requests](../concepts/other_timeframes_and_data.md#dynamic-requests) section for more information.
- `behind_chart` (const bool, optional):  Optional. Controls whether all plots and drawings appear behind the chart display (if `true`) or in front of it (if `false`). This parameter only takes effect when the `overlay` parameter is `true`. The default is `true`.
- `calc_on_every_history_tick` (const bool, optional): Optional. Modifies the strategy's default calculation behavior on historical bars. Users can change the behavior by selecting the "On history bar tick" checkbox from the "Script executions" dropdown menu in the "Settings/Properties" tab. An argument for this parameter must include the parameter's name (e.g., `calc_on_every_history_tick = true`). If the value is `true`, the strategy performs a new execution to update its calculations on every available tick in each historical bar. Historical ticks refer to bar OHLC prices or intrabar prices from a lower timeframe, depending on the selected level of historical bar detail. If `false`, the strategy executes only on the closing tick of each bar, and on any other ticks allowed by the selected "Script executions" settings. The default is `false`.

**Remarks**

You can learn more about strategies in our [User Manual](../concepts/strategies.md).

Every strategy script must have one `strategy()` call.

Strategies using `calc_on_every_tick = true` parameter may calculate differently on historical and realtime bars, which causes [repainting](../concepts/repainting.md).

Strategies always use the chart's prices to enter and exit positions. Using them on non-standard chart types (Heikin Ashi, Renko, etc.) will produce misleading results, as their prices are synthetic. Backtesting on non-standard charts is thus not recommended.

The maximum number of orders a strategy can open, unless it uses Deep Backtesting mode, is 9000. If the strategy exceeds this limit, it removes the oldest order's information when a new entry appears in the "List of Trades" tab. The `strategy.closedtrades.*()` functions return `na` for trades opened or closed by removed orders. To retrieve the index of the oldest available closed trade, use the `strategy.closedtrades.first_index` variable.

```pine
//@version=6
strategy("My strategy", overlay = true)

// Enter long by market if current open is greater than previous high.
if open > high[1]
	strategy.entry("Long", strategy.long, 1)
// Generate a full exit bracket (profit 10 points, loss 5 points per contract) from the entry named "Long".
strategy.exit("Exit", "Long", profit = 10, loss = 5)
```

**See also:** `indicator()`, `library()`

### strategy.cancel()

Cancels a pending or unfilled order with a specific identifier. If multiple unfilled orders share the same ID, calling this command with that ID as the `id` argument cancels all of them. If a script calls this command with an `id` representing the ID of a filled order, it has no effect.

This command is most useful when working with price-based orders (e.g., [limit orders](../concepts/strategies.md#limit-orders)). Calls to this command can also cancel [market orders](../concepts/strategies.md#market-orders), but only if they execute on the same ticks as the order placement commands.

```pine
strategy.cancel(id) → void
```

**Arguments**

- `id` (series string): The identifier of the unfilled order to cancel.

```pine
//@version=6
strategy(title = "Order cancellation demo")

conditionForBuy = open > high[1]
if conditionForBuy
    strategy.entry("Long", strategy.long, 1, limit = low) // Enter long using limit order at low price of current bar if `conditionForBuy` is `true`.
if not conditionForBuy
    strategy.cancel("Long") // Cancel the entry order with name "Long" if `conditionForBuy` is `false`.
```

### strategy.cancel_all

Cancels all pending or unfilled orders, regardless of their identifiers.

This command is most useful when working with price-based orders (e.g., [limit orders](../concepts/strategies.md#limit-orders)). Calls to this command can also cancel [market orders](../concepts/strategies.md#market-orders), but only if they execute on the same ticks as the order placement commands.

```pine
strategy.cancel_all() → void
```

```pine
//@version=6
strategy(title = "Cancel all orders demo")
conditionForBuy1 = open > high[1]
if conditionForBuy1
    strategy.entry("Long entry 1", strategy.long, 1, limit = low) // Enter long using a limit order if `conditionForBuy1` is `true`.
conditionForBuy2 = conditionForBuy1 and open[1] > high[2]
float lowest2 = ta.lowest(low, 2)
if conditionForBuy2
    strategy.entry("Long entry 2", strategy.long, 1, limit = lowest2) // Enter long using a limit order if `conditionForBuy2` is `true`.
conditionForStopTrading = open < lowest2
if conditionForStopTrading
    strategy.cancel_all() // Cancel both limit orders if `conditionForStopTrading` is `true`.
```

### strategy.close()

Creates an order to exit from the part of a position opened by entry orders with a specific identifier. If multiple entries in the position share the same ID, the orders from this command apply to all those entries, starting from the first open trade, when its calls use that ID as the `id` argument.

This command always generates [market orders](../concepts/strategies.md#market-orders). To exit from a position using price-based orders (e.g., [stop-loss](../concepts/strategies.md#take-profit-and-stop-loss) orders), use the `strategy.exit()` command.

```pine
strategy.close(id, comment, qty, qty_percent, alert_message, immediately, disable_alert) → void
```

**Arguments**

- `id` (series string): The entry identifier of the open trades to close.
- `comment` (series string, optional): Optional. Additional notes on the filled order. If the value is not an empty string, the Strategy Tester and the chart show this text for the order instead of the automatically generated exit identifier. The default is an empty string.
- `qty` (series int/float, optional): Optional. The number of contracts/lots/shares/units to close when an exit order fills. If specified, the command uses this value instead of `qty_percent` to determine the order size. The default is `na`, which means the order size depends on the `qty_percent` value.
- `qty_percent` (series int/float, optional): Optional. A value between 0 and 100 representing the percentage of the open trade quantity to close when an exit order fills. The percentage calculation depends on the total size of the open trades with the `id` entry identifier. The command ignores this parameter if the `qty` value is not `na`. The default is 100.
- `alert_message` (series string, optional): Optional. Custom text for the alert that fires when an order fills. If the "Message" field of the "Create Alert" dialog box contains the `{{strategy.order.alert_message}}` placeholder, the alert message replaces the placeholder with this text. The default is an empty string.
- `immediately` (series bool, optional): Optional. If `true`, the closing order executes on the same tick when the strategy places it, ignoring the strategy properties that restrict execution to the opening tick of the following bar. The default is `false`.
- `disable_alert` (series bool, optional): Optional. If `true` when the command creates an order, the strategy does not trigger an alert when that order fills. This parameter accepts a "series" value, meaning users can control which orders trigger alerts when they execute. The default is `false`.

**Remarks**

When a position consists of several open trades and the `close_entries_rule` in the `strategy()` declaration statement is "FIFO" (default), a `strategy.close()` call exits from the position starting with the first open trade. This behavior applies even if the `id` value is the entry ID of different open trades. However, in that case, the maximum exit order size still depends on the trades opened by orders with the `id` identifier. For more information, see [this](../concepts/strategies.md#closing-a-market-position) section of our User Manual.

```pine
//@version=6
strategy("Partial close strategy")

// Calculate a 14-bar and 28-bar moving average of `close` prices.
float sma14 = ta.sma(close, 14)
float sma28 = ta.sma(close, 28)

// Place a market order to enter a long position when `sma14` crosses over `sma28`.
if ta.crossover(sma14, sma28)
    strategy.entry("My Long Entry ID", strategy.long)

// Place a market order to close the long trade when `sma14` crosses under `sma28`.
if ta.crossunder(sma14, sma28)
    strategy.close("My Long Entry ID", "50% market close", qty_percent = 50)

// Plot the position size.
plot(strategy.position_size)
```

### strategy.close_all()

Creates an order to close an open position completely, regardless of the identifiers of the entry orders that opened or added to it.

This command always generates [market orders](../concepts/strategies.md#market-orders). To exit from a position using price-based orders (e.g., [stop-loss](../concepts/strategies.md#take-profit-and-stop-loss) orders), use the `strategy.exit()` command.

```pine
strategy.close_all(comment, alert_message, immediately, disable_alert) → void
```

**Arguments**

- `comment` (series string, optional): Optional. Additional notes on the filled order. If the value is not an empty string, the Strategy Tester and the chart show this text for the order instead of the automatically generated exit identifier. The default is an empty string.
- `alert_message` (series string, optional): Optional. Custom text for the alert that fires when an order fills. If the "Message" field of the "Create Alert" dialog box contains the `{{strategy.order.alert_message}}` placeholder, the alert message replaces the placeholder with this text. The default is an empty string.
- `immediately` (series bool, optional): Optional. If `true`, the closing order executes on the same tick when the strategy places it, ignoring the strategy properties that restrict execution to the opening tick of the following bar. The default is `false`.
- `disable_alert` (series bool, optional): Optional. If `true` when the command creates an order, the strategy does not trigger an alert when that order fills. This parameter accepts a "series" value, meaning users can control which orders trigger alerts when they execute. The default is `false`.

```pine
//@version=6
strategy("Multi-entry close strategy")

// Calculate a 14-bar and 28-bar moving average of `close` prices.
float sma14 = ta.sma(close, 14)
float sma28 = ta.sma(close, 28)

// Place a market order to enter a long trade every time `sma14` crosses over `sma28`.
if ta.crossover(sma14, sma28)
    strategy.order("My Long Entry ID " + str.tostring(strategy.opentrades), strategy.long)

// Place a market order to close the entire position every 500 bars.
if bar_index % 500 == 0
    strategy.close_all()

// Plot the position size.
plot(strategy.position_size)
```

### strategy.closedtrades.commission()

Returns the sum of entry and exit fees paid in the closed trade, expressed in `strategy.account_currency`.

```pine
strategy.closedtrades.commission(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

```pine
//@version=6
strategy("`strategy.closedtrades.commission` Example", commission_type = strategy.commission.percent, commission_value = 0.1)

// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars.
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long)
if bar_index % 20 == 0
    strategy.close("Long")

// Plot total fees for the latest closed trade.
plot(strategy.closedtrades.commission(strategy.closedtrades - 1))
```

**See also:** `strategy()`, `strategy.opentrades.commission()`

### strategy.closedtrades.entry_bar_index()

Returns the bar_index of the closed trade's entry.

```pine
strategy.closedtrades.entry_bar_index(trade_num) → series int
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

```pine
//@version=6
strategy("strategy.closedtrades.entry_bar_index Example")
// Enter long trades on three rising bars; exit on two falling bars.
if ta.rising(close, 3)
    strategy.entry("Long", strategy.long)
if ta.falling(close, 2)
    strategy.close("Long")
// Function that calculates the average amount of bars in a trade.
avgBarsPerTrade() =>
	sumBarsPerTrade = 0
	for tradeNo = 0 to strategy.closedtrades - 1
		// Loop through all closed trades, starting with the oldest.
		sumBarsPerTrade += strategy.closedtrades.exit_bar_index(tradeNo) - strategy.closedtrades.entry_bar_index(tradeNo) + 1
	result = nz(sumBarsPerTrade / strategy.closedtrades)
plot(avgBarsPerTrade())
```

**See also:** `strategy.closedtrades.exit_bar_index()`, `strategy.opentrades.entry_bar_index()`

### strategy.closedtrades.entry_comment()

Returns the comment message of the closed trade's entry, or `na` if there is no entry with this `trade_num`.

```pine
strategy.closedtrades.entry_comment(trade_num) → series string
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

```pine
//@version=6
strategy("`strategy.closedtrades.entry_comment()` Example", overlay = true)

stopPrice = open * 1.01

longCondition = ta.crossover(ta.sma(close, 14), ta.sma(close, 28))

if (longCondition)
    strategy.entry("Long", strategy.long, stop = stopPrice, comment = str.tostring(stopPrice, "#.####"))
    strategy.exit("EXIT", trail_points = 1000, trail_offset = 0)

var testTable = table.new(position.top_right, 1, 3, color.orange, border_width = 1)

if barstate.islastconfirmedhistory or barstate.isrealtime
    table.cell(testTable, 0, 0, 'Last closed trade:')
    table.cell(testTable, 0, 1, "Order stop price value: " + strategy.closedtrades.entry_comment(strategy.closedtrades - 1))
    table.cell(testTable, 0, 2, "Actual Entry Price: " + str.tostring(strategy.closedtrades.entry_price(strategy.closedtrades - 1)))
```

**See also:** `strategy()`, `strategy.entry()`, `strategy.closedtrades`

### strategy.closedtrades.entry_id()

Returns the id of the closed trade's entry.

```pine
strategy.closedtrades.entry_id(trade_num) → series string
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

**Returns:** Returns the id of the closed trade's entry.

**Remarks**

The function returns na if trade_num is not in the range: 0 to strategy.closedtrades-1.

```pine
//@version=6
strategy("strategy.closedtrades.entry_id Example", overlay = true)

// Enter a short position and close at the previous to last bar.
if bar_index == 1
    strategy.entry("Short at bar #" + str.tostring(bar_index), strategy.short)
if bar_index == last_bar_index - 2
    strategy.close_all()

// Display ID of the last entry position.
if barstate.islastconfirmedhistory
    label.new(last_bar_index, high, "Last Entry ID is: " + strategy.closedtrades.entry_id(strategy.closedtrades - 1))
```

**See also:** `strategy.closedtrades.entry_bar_index()`, `strategy.closedtrades.entry_price()`, `strategy.closedtrades.entry_time()`

### strategy.closedtrades.entry_price()

Returns the price of the closed trade's entry.

```pine
strategy.closedtrades.entry_price(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

```pine
//@version=6
strategy("strategy.closedtrades.entry_price Example 1")

// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars.
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long)
if bar_index % 20 == 0
    strategy.close("Long")

// Return the entry price for the latest entry.
entryPrice = strategy.closedtrades.entry_price(strategy.closedtrades - 1)

plot(entryPrice, "Long entry price")
```

```pine
// Calculates the average profit percentage for all closed trades.
//@version=6
strategy("strategy.closedtrades.entry_price Example 2")

// Strategy calls to create single short and long trades
if bar_index == last_bar_index - 15
    strategy.entry("Long Entry", strategy.long)
else if bar_index == last_bar_index - 10
    strategy.close("Long Entry")
    strategy.entry("Short", strategy.short)
else if bar_index == last_bar_index - 5
    strategy.close("Short")

// Calculate profit for both closed trades.
profitPct = 0.0
for tradeNo = 0 to strategy.closedtrades - 1
    entryP = strategy.closedtrades.entry_price(tradeNo)
    exitP = strategy.closedtrades.exit_price(tradeNo)
    profitPct += (exitP - entryP) / entryP * strategy.closedtrades.size(tradeNo) * 100

// Calculate average profit percent for both closed trades.
avgProfitPct = nz(profitPct / strategy.closedtrades)

plot(avgProfitPct)
```

**See also:** `strategy.closedtrades.entry_price()`, `strategy.closedtrades.exit_price()`, `strategy.closedtrades.size()`, `strategy.closedtrades`

### strategy.closedtrades.entry_time()

Returns the UNIX time of the closed trade's entry, expressed in milliseconds..

```pine
strategy.closedtrades.entry_time(trade_num) → series int
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

```pine
//@version=6
strategy("strategy.closedtrades.entry_time Example", overlay = true)

// Enter long trades on three rising bars; exit on two falling bars.
if ta.rising(close, 3)
    strategy.entry("Long", strategy.long)
if ta.falling(close, 2)
    strategy.close("Long")

// Calculate the average trade duration
avgTradeDuration() =>
    sumTradeDuration = 0
    for i = 0 to strategy.closedtrades - 1
        sumTradeDuration += strategy.closedtrades.exit_time(i) - strategy.closedtrades.entry_time(i)
    result = nz(sumTradeDuration / strategy.closedtrades)

// Display average duration converted to seconds and formatted using 2 decimal points
if barstate.islastconfirmedhistory
    label.new(bar_index, high, str.tostring(avgTradeDuration() / 1000, "#.##") + " seconds")
```

**See also:** `strategy.opentrades.entry_time()`, `strategy.closedtrades.exit_time()`, `time`

### strategy.closedtrades.exit_bar_index()

Returns the bar_index of the closed trade's exit.

```pine
strategy.closedtrades.exit_bar_index(trade_num) → series int
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

```pine
//@version=6
strategy("strategy.closedtrades.exit_bar_index Example 1")

// Strategy calls to place a single short trade. We enter the trade at the first bar and exit the trade at 10 bars before the last chart bar.
if bar_index == 0
    strategy.entry("Short", strategy.short)
if bar_index == last_bar_index - 10
    strategy.close("Short")

// Calculate the amount of bars since the last closed trade.
barsSinceClosed = strategy.closedtrades > 0 ? bar_index - strategy.closedtrades.exit_bar_index(strategy.closedtrades - 1) : na

plot(barsSinceClosed, "Bars since last closed trade")
```

```pine
// Calculates the average amount of bars per trade.
//@version=6
strategy("strategy.closedtrades.exit_bar_index Example 2")

// Enter long trades on three rising bars; exit on two falling bars.
if ta.rising(close, 3)
    strategy.entry("Long", strategy.long)
if ta.falling(close, 2)
    strategy.close("Long")

// Function that calculates the average amount of bars per trade.
avgBarsPerTrade() =>
    sumBarsPerTrade = 0
    for tradeNo = 0 to strategy.closedtrades - 1
        // Loop through all closed trades, starting with the oldest.
        sumBarsPerTrade += strategy.closedtrades.exit_bar_index(tradeNo) - strategy.closedtrades.entry_bar_index(tradeNo) + 1
    result = nz(sumBarsPerTrade / strategy.closedtrades)

plot(avgBarsPerTrade())
```

**See also:** `bar_index`, `last_bar_index`

### strategy.closedtrades.exit_comment()

Returns the comment message of the closed trade's exit, or `na` if there is no entry with this `trade_num`.

```pine
strategy.closedtrades.exit_comment(trade_num) → series string
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

```pine
//@version=6
strategy("`strategy.closedtrades.exit_comment()` Example", overlay = true)

longCondition = ta.crossover(ta.sma(close, 14), ta.sma(close, 28))
if (longCondition)
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit", stop = open * 0.95, limit = close * 1.05, trail_points = 100, trail_offset = 0, comment_profit = "TP", comment_loss = "SL", comment_trailing = "TRAIL")

exitStats() =>
    int slCount = 0
    int tpCount = 0
    int trailCount = 0

    if strategy.closedtrades > 0
        for i = 0 to strategy.closedtrades - 1
            switch strategy.closedtrades.exit_comment(i)
                "TP"    => tpCount    += 1
                "SL"    => slCount    += 1
                "TRAIL" => trailCount += 1
    [slCount, tpCount, trailCount]

var testTable = table.new(position.top_right, 1, 4, color.orange, border_width = 1)

if barstate.islastconfirmedhistory
    [slCount, tpCount, trailCount] = exitStats()
    table.cell(testTable, 0, 0, "Closed trades (" + str.tostring(strategy.closedtrades) +") stats:")
    table.cell(testTable, 0, 1, "Stop Loss: " + str.tostring(slCount))
    table.cell(testTable, 0, 2, "Take Profit: " + str.tostring(tpCount))
    table.cell(testTable, 0, 3, "Trailing Stop: " + str.tostring(trailCount))
```

**See also:** `strategy()`, `strategy.exit()`, `strategy.close()`, `strategy.closedtrades()`

### strategy.closedtrades.exit_id()

Returns the id of the closed trade's exit.

```pine
strategy.closedtrades.exit_id(trade_num) → series string
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

**Returns:** Returns the id of the closed trade's exit.

**Remarks**

The function returns na if trade_num is not in the range: 0 to strategy.closedtrades-1.

```pine
//@version=6
strategy("strategy.closedtrades.exit_id Example", overlay = true)

// Strategy calls to create single short and long trades
if bar_index == last_bar_index - 15
    strategy.entry("Long Entry", strategy.long)
else if bar_index == last_bar_index - 10
    strategy.entry("Short Entry", strategy.short)

// When a new open trade is detected then we create the exit strategy corresponding with the matching entry id
// We detect the correct entry id by determining if a position is long or short based on the position quantity
if ta.change(strategy.opentrades) != 0
    posSign = strategy.opentrades.size(strategy.opentrades - 1)
    strategy.exit(posSign > 0 ? "SL Long Exit" : "SL Short Exit", strategy.opentrades.entry_id(strategy.opentrades - 1), stop = posSign > 0 ? high - ta.tr : low + ta.tr)

// When a new closed trade is detected then we place a label above the bar with the exit info
if ta.change(strategy.closedtrades) != 0
    msg = "Trade closed by: " + strategy.closedtrades.exit_id(strategy.closedtrades - 1)
    label.new(bar_index, high + (3 * ta.tr), msg)
```

**See also:** `strategy.closedtrades.exit_bar_index()`, `strategy.closedtrades.exit_price()`, `strategy.closedtrades.exit_time()`

### strategy.closedtrades.exit_price()

Returns the price of the closed trade's exit.

```pine
strategy.closedtrades.exit_price(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

```pine
//@version=6
strategy("strategy.closedtrades.exit_price Example 1")

// We are creating a long trade every 5 bars
if bar_index % 5 == 0
    strategy.entry("Long", strategy.long)
strategy.close("Long")

// Return the exit price from the latest closed trade.
exitPrice = strategy.closedtrades.exit_price(strategy.closedtrades - 1)

plot(exitPrice, "Long exit price")
```

```pine
// Calculates the average profit percentage for all closed trades.
//@version=6
strategy("strategy.closedtrades.exit_price Example 2")

// Strategy calls to create single short and long trades.
if bar_index == last_bar_index - 15
    strategy.entry("Long Entry", strategy.long)
else if bar_index == last_bar_index - 10
    strategy.close("Long Entry")
    strategy.entry("Short", strategy.short)
else if bar_index == last_bar_index - 5
    strategy.close("Short")

// Calculate profit for both closed trades.
profitPct = 0.0
for tradeNo = 0 to strategy.closedtrades - 1
    entryP = strategy.closedtrades.entry_price(tradeNo)
    exitP = strategy.closedtrades.exit_price(tradeNo)
    profitPct += (exitP - entryP) / entryP * strategy.closedtrades.size(tradeNo) * 100

// Calculate average profit percent for both closed trades.
avgProfitPct = nz(profitPct / strategy.closedtrades)

plot(avgProfitPct)
```

**See also:** `strategy.closedtrades.entry_price()`

### strategy.closedtrades.exit_time()

Returns the UNIX time of the closed trade's exit, expressed in milliseconds.

```pine
strategy.closedtrades.exit_time(trade_num) → series int
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

```pine
//@version=6
strategy("strategy.closedtrades.exit_time Example 1")

// Enter long trades on three rising bars; exit on two falling bars.
if ta.rising(close, 3)
    strategy.entry("Long", strategy.long)
if ta.falling(close, 2)
    strategy.close("Long")

// Calculate the average trade duration.
avgTradeDuration() =>
    sumTradeDuration = 0
    for i = 0 to strategy.closedtrades - 1
        sumTradeDuration += strategy.closedtrades.exit_time(i) - strategy.closedtrades.entry_time(i)
    result = nz(sumTradeDuration / strategy.closedtrades)

// Display average duration converted to seconds and formatted using 2 decimal points.
if barstate.islastconfirmedhistory
    label.new(bar_index, high, str.tostring(avgTradeDuration() / 1000, "#.##") + " seconds")
```

```pine
// Reopens a closed trade after X seconds.
//@version=6
strategy("strategy.closedtrades.exit_time Example 2")

// Strategy calls to emulate a single long trade at the first bar.
if bar_index == 0
    strategy.entry("Long", strategy.long)

reopenPositionAfter(timeSec) =>
    if strategy.closedtrades > 0
        if time - strategy.closedtrades.exit_time(strategy.closedtrades - 1) >= timeSec * 1000
            strategy.entry("Long", strategy.long)

// Reopen last closed position after 120 sec.
reopenPositionAfter(120)

if ta.change(strategy.opentrades) != 0
    strategy.exit("Long", stop = low * 0.9, profit = high * 2.5)
```

**See also:** `strategy.closedtrades.entry_time()`

### strategy.closedtrades.max_drawdown()

Returns the maximum drawdown of the closed trade, i.e., the maximum possible loss during the trade, expressed in `strategy.account_currency`.

```pine
strategy.closedtrades.max_drawdown(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

**Remarks**

The function returns na if trade_num is not in the range: 0 to strategy.closedtrades - 1.

```pine
//@version=6
strategy("`strategy.closedtrades.max_drawdown` Example")

// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars.
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long)
if bar_index % 20 == 0
    strategy.close("Long")

// Get the biggest max trade drawdown value from all of the closed trades.
maxTradeDrawDown() =>
    maxDrawdown = 0.0
    for tradeNo = 0 to strategy.closedtrades - 1
        maxDrawdown := math.max(maxDrawdown, strategy.closedtrades.max_drawdown(tradeNo))
    result = maxDrawdown

plot(maxTradeDrawDown(), "Biggest max drawdown")
```

**See also:** `strategy.opentrades.max_drawdown()`, `strategy.max_drawdown`

### strategy.closedtrades.max_drawdown_percent()

Returns the maximum drawdown of the closed trade, i.e., the maximum possible loss during the trade, expressed as a percentage and calculated by formula: `Lowest Value During Trade / (Entry Price x Quantity) * 100`.

```pine
strategy.closedtrades.max_drawdown_percent(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

**See also:** `strategy.closedtrades.max_drawdown()`, `strategy.max_drawdown`

### strategy.closedtrades.max_runup()

Returns the maximum run up of the closed trade, i.e., the maximum possible profit during the trade, expressed in `strategy.account_currency`.

```pine
strategy.closedtrades.max_runup(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

```pine
//@version=6
strategy("`strategy.closedtrades.max_runup` Example")

// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars.
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long)
if bar_index % 20 == 0
    strategy.close("Long")

// Get the biggest max trade runup value from all of the closed trades.
maxTradeRunUp() =>
    maxRunup = 0.0
    for tradeNo = 0 to strategy.closedtrades - 1
        maxRunup := math.max(maxRunup, strategy.closedtrades.max_runup(tradeNo))
    result = maxRunup

plot(maxTradeRunUp(), "Max trade runup")
```

**See also:** `strategy.opentrades.max_runup()`, `strategy.max_runup`

### strategy.closedtrades.max_runup_percent()

Returns the maximum run-up of the closed trade, i.e., the maximum possible profit during the trade, expressed as a percentage and calculated by formula: `Highest Value During Trade / (Entry Price x Quantity) * 100`.

```pine
strategy.closedtrades.max_runup_percent(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

**See also:** `strategy.closedtrades.max_runup()`, `strategy.max_runup`

### strategy.closedtrades.profit()

Returns the profit/loss of the closed trade in the strategy's account currency, reduced by the trade's commissions. A positive returned value represents a profit, and a negative value represents a loss.

```pine
strategy.closedtrades.profit(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

```pine
//@version=6
strategy("`strategy.closedtrades.profit()` example")

// Enter a long trade every 15 bars, and close a long trade every 20 bars.
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long)
if bar_index % 20 == 0
    strategy.close("Long")

//@function Calculates the average gross profit from all available closed trades.
avgGrossProfit() =>
    var float result = 0.0
    if result == 0.0 or strategy.closedtrades > strategy.closedtrades[1]
        float sumGrossProfit = 0.0
        for tradeNo = 0 to strategy.closedtrades - 1
            sumGrossProfit += strategy.closedtrades.profit(tradeNo)
        result := nz(sumGrossProfit / strategy.closedtrades)
    result

plot(avgGrossProfit(), "Average gross profit")
```

**See also:** `strategy.account_currency`, `strategy.opentrades.profit()`, `strategy.closedtrades.commission()`

### strategy.closedtrades.profit_percent()

Returns the profit/loss value of the closed trade, expressed as a percentage. Losses are expressed as negative values.

```pine
strategy.closedtrades.profit_percent(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

**See also:** `strategy.closedtrades.profit()`

### strategy.closedtrades.size()

Returns the direction and the number of contracts traded in the closed trade. If the value is > 0, the market position was long. If the value is < 0, the market position was short.

```pine
strategy.closedtrades.size(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

```pine
//@version=6
strategy("`strategy.closedtrades.size` Example 1")

// We calculate the max amt of shares we can buy.
amtShares = math.floor(strategy.equity / close)
// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long, qty = amtShares)
if bar_index % 20 == 0
    strategy.close("Long")

// Plot the number of contracts traded in the last closed trade.
plot(strategy.closedtrades.size(strategy.closedtrades - 1), "Number of contracts traded")
```

```pine
// Calculates the average profit percentage for all closed trades.
//@version=6
strategy("`strategy.closedtrades.size` Example 2")

// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars.
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long)
if bar_index % 20 == 0
    strategy.close("Long")

// Calculate profit for both closed trades.
profitPct = 0.0
for tradeNo = 0 to strategy.closedtrades - 1
    entryP = strategy.closedtrades.entry_price(tradeNo)
    exitP = strategy.closedtrades.exit_price(tradeNo)
    profitPct += (exitP - entryP) / entryP * strategy.closedtrades.size(tradeNo) * 100

// Calculate average profit percent for both closed trades.
avgProfitPct = nz(profitPct / strategy.closedtrades)

plot(avgProfitPct)
```

**See also:** `strategy.opentrades.size()`, `strategy.position_size`, `strategy.closedtrades`, `strategy.opentrades`

### strategy.convert_to_account()

Converts the value from the currency that the symbol on the chart is traded in (`syminfo.currency`) to the currency used by the strategy (`strategy.account_currency`).

```pine
strategy.convert_to_account(value) → series float
```

**Arguments**

- `value` (series int/float): The value to be converted.

```pine
//@version=6
strategy("`strategy.convert_to_account` Example 1", currency = currency.EUR)

plot(close, "Close price using default currency")
plot(strategy.convert_to_account(close), "Close price converted to strategy currency")
```

```pine
// Calculates the "Buy and hold return" using your account's currency.
//@version=6
strategy("`strategy.convert_to_account` Example 2", currency = currency.EUR)

dateInput = input.time(timestamp("20 Jul 2021 00:00 +0300"), "From Date", confirm = true)

buyAndHoldReturnPct(fromDate) =>
    if time >= fromDate
        money = close * syminfo.pointvalue
        var initialBal = strategy.convert_to_account(money)
        (strategy.convert_to_account(money) - initialBal) / initialBal * 100

plot(buyAndHoldReturnPct(dateInput))
```

**See also:** `strategy()`, `strategy.convert_to_symbol()`

### strategy.convert_to_symbol()

Converts the value from the currency used by the strategy (`strategy.account_currency`) to the currency that the symbol on the chart is traded in (`syminfo.currency`).

```pine
strategy.convert_to_symbol(value) → series float
```

**Arguments**

- `value` (series int/float): The value to be converted.

```pine
//@version=6
strategy("`strategy.convert_to_symbol` Example", currency = currency.EUR)

// Calculate the max qty we can buy using current chart's currency.
calcContracts(accountMoney) =>
    math.floor(strategy.convert_to_symbol(accountMoney) / syminfo.pointvalue / close)

// Return max qty we can buy using 300 euros
qt = calcContracts(300)

// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars using our custom qty.
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long, qty = qt)
if bar_index % 20 == 0
    strategy.close("Long")
```

**See also:** `strategy()`, `strategy.convert_to_account()`

### strategy.default_entry_qty()

Calculates the default quantity, in units, of an entry order from `strategy.entry()` or `strategy.order()` if it were to fill at the specified `fill_price` value. The calculation depends on several strategy properties, including `default_qty_type`, `default_qty_value`, `currency`, and other parameters in the `strategy()` function and their representation in the "Properties" tab of the strategy's settings.

```pine
strategy.default_entry_qty(fill_price) → series float
```

**Arguments**

- `fill_price` (series int/float): The fill price for which to calculate the default order quantity.

**Remarks**

This function does not consider open positions simulated by a strategy. For example, if a strategy script has an open position from a long order with a `qty` of 10 units, using the `strategy.entry()` function to simulate a short order with a `qty` of 5 will prompt the script to sell 15 units to reverse the position. This function will still return 5 in such a case since it doesn't consider an open trade.

This value represents the default calculated quantity of an order.

Order placement commands can override the default value by explicitly passing a new `qty` value in the function call.

```pine
//@version=6
strategy("Supertrend Strategy", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 15)

//@variable The length of the ATR calculation.
atrPeriod = input(10, "ATR Length")
//@variable The ATR multiplier.
factor = input.float(3.0, "Factor", step = 0.01)
//@variable The tick offset of the stop order.
stopOffsetInput = input.int(100, "Tick offset for entry stop")

// Get the direction of the SuperTrend.
[_, direction] = ta.supertrend(factor, atrPeriod)

if ta.change(direction) < 0
	//@variable The stop price of the entry order.
	stopPrice = close + syminfo.mintick * stopOffsetInput
	//@variable The expected default fill quantity at the `stopPrice`. This value may not reflect actual qty of the filled order, because fill price may be different.
	calculatedQty = strategy.default_entry_qty(stopPrice)
	strategy.entry("My Long Entry Id", strategy.long, stop = stopPrice)
	label.new(bar_index, stopPrice, str.format("Stop set at {0}\nExpected qty at {0}: {1}", math.round_to_mintick(stopPrice), calculatedQty))

if ta.change(direction) > 0
	strategy.close_all()
```

### strategy.entry()

Creates a new order to open or add to a position. If an unfilled order with the same `id` exists, a call to this command modifies that order.

The resulting order's type depends on the `limit` and `stop` parameters. If the call does not contain `limit` or `stop` arguments, it creates a [market order](../concepts/strategies.md#market-orders) that executes on the next tick. If the call specifies a `limit` value but no `stop` value, it places a [limit order](../concepts/strategies.md#limit-orders) that executes after the market price reaches the `limit` value or a better price (lower for buy orders and higher for sell orders). If the call specifies a `stop` value but no `limit` value, it places a [stop order](../concepts/strategies.md#stop-and-stop-limit-orders) that executes after the market price reaches the `stop` value or a worse price (higher for buy orders and lower for sell orders). If the call contains `limit` and `stop` arguments, it creates a [stop-limit](../concepts/strategies.md#stop-and-stop-limit-orders) order, which generates a limit order at the `limit` price only after the market price reaches the `stop` value or a worse price.

Orders from this command, unlike those from `strategy.order()`, are affected by the `pyramiding` parameter of the `strategy()` declaration statement. Pyramiding specifies the number of concurrent open entries allowed per position. For example, with `pyramiding = 3`, the strategy can have up to three open trades, and the command cannot create orders to open additional trades until at least one existing trade closes.

By default, when a strategy executes an order from this command in the opposite direction of the current market position, it reverses that position. For example, if there is an open long position of five shares, an order from this command with a `qty` of 5 and a `direction` of `strategy.short` triggers the sale of 10 shares to close the long position and open a new five-share short position. Users can change this behavior by specifying an allowed direction with the `strategy.risk_allow_entry_in()` function.

```pine
strategy.entry(id, direction, qty, limit, stop, oca_name, oca_type, comment, alert_message, disable_alert) → void
```

**Arguments**

- `id` (series string): The identifier of the order, which corresponds to an entry ID in the strategy's trades after the order fills. If the strategy opens a new position after filling the order, the order's ID becomes the `strategy.position_entry_name` value. Strategy commands can reference the order ID to cancel or modify pending orders and generate exit orders for specific open trades. The Strategy Tester and the chart display the order ID unless the command specifies a `comment` value.
- `direction` (series strategy_direction): The direction of the trade. Possible values: `strategy.long` for a long trade, `strategy.short` for a short one.
- `qty` (series int/float, optional): Optional. The number of contracts/shares/lots/units in the resulting open trade when the order fills. The default is `na`, which means that the command uses the `default_qty_type` and `default_qty_value` parameters of the `strategy()` declaration statement to determine the quantity.
- `limit` (series int/float, optional): Optional. The limit price of the order. If specified, the command creates a limit or stop-limit order, depending on whether the `stop` value is also specified. The default is `na`, which means the resulting order is not of the limit or stop-limit type.
- `stop` (series int/float, optional): Optional. The stop price of the order. If specified, the command creates a stop or stop-limit order, depending on whether the `limit` value is also specified. The default is `na`, which means the resulting order is not of the stop or stop-limit type.
- `oca_name` (series string, optional): Optional. The name of the order's One-Cancels-All (OCA) group. When a pending order with the same `oca_name` and `oca_type` parameters executes, that order affects all unfilled orders in the group. The default is an empty string, which means the order does not belong to an OCA group.
- `oca_type` (input string, optional): Optional. Specifies how an unfilled order behaves when another pending order with the same `oca_name` and `oca_type` values executes. Possible values: `strategy.oca.cancel`, `strategy.oca.reduce`, `strategy.oca.none`. The default is `strategy.oca.none`.
- `comment` (series string, optional): Optional. Additional notes on the filled order. If the value is not an empty string, the Strategy Tester and the chart show this text for the order instead of the specified `id`. The default is an empty string.
- `alert_message` (series string, optional): Optional. Custom text for the alert that fires when an order fills. If the "Message" field of the "Create Alert" dialog box contains the `{{strategy.order.alert_message}}` placeholder, the alert message replaces the placeholder with this text. The default is an empty string.
- `disable_alert` (series bool, optional): Optional. If `true` when the command creates an order, the strategy does not trigger an alert when that order fills. This parameter accepts a "series" value, meaning users can control which orders trigger alerts when they execute. The default is `false`.

```pine
//@version=6
strategy("Market order strategy", overlay = true)

// Calculate a 14-bar and 28-bar moving average of `close` prices.
float sma14 = ta.sma(close, 14)
float sma28 = ta.sma(close, 28)

// Place a market order to close the short trade and enter a long position when `sma14` crosses over `sma28`.
if ta.crossover(sma14, sma28)
    strategy.entry("My Long Entry ID", strategy.long)

// Place a market order to close the long trade and enter a short position when `sma14` crosses under `sma28`.
if ta.crossunder(sma14, sma28)
    strategy.entry("My Short Entry ID", strategy.short)
```

```pine
//@version=6
strategy("Limit order strategy", overlay=true, margin_long=100, margin_short=100)

//@variable The distance from the `close` price for each limit order.
float limitOffsetInput = input.int(100, "Limit offset, in ticks", 1) * syminfo.mintick

//@function Draws a label and line at the specified `price` to visualize a limit order's level.
drawLimit(float price, bool isLong) =>
    color col = isLong ? color.blue : color.red
    label.new(
         bar_index, price, (isLong ? "Long" : "Short") + " limit order created",
         style = label.style_label_right, color = col, textcolor = color.white
     )
    line.new(bar_index, price, bar_index + 1, price, extend = extend.right, style = line.style_dashed, color = col)

//@function Stops the `l` line from extending further.
method stopExtend(line l) =>
    l.set_x2(bar_index)
    l.set_extend(extend.none)

// Initialize two `line` variables to reference limit line IDs.
var line longLimit  = na
var line shortLimit = na

// Calculate a 14-bar and 28-bar moving average of `close` prices.
float sma14 = ta.sma(close, 14)
float sma28 = ta.sma(close, 28)

if ta.crossover(sma14, sma28)
    // Cancel any unfilled sell orders with the specified ID.
    strategy.cancel("My Short Entry ID")
    //@variable The limit price level. Its value is `limitOffsetInput` ticks below the current `close`.
    float limitLevel = close - limitOffsetInput
    // Place a long limit order to close the short trade and enter a long position at the `limitLevel`.
    strategy.entry("My Long Entry ID", strategy.long, limit = limitLevel)
    // Make new drawings for the long limit and stop extending the `shortLimit` line.
    longLimit := drawLimit(limitLevel, isLong = true)
    shortLimit.stopExtend()

if ta.crossunder(sma14, sma28)
    // Cancel any unfilled buy orders with the specified ID.
    strategy.cancel("My Long Entry ID")
    //@variable The limit price level. Its value is `limitOffsetInput` ticks above the current `close`.
    float limitLevel = close + limitOffsetInput
    // Place a short limit order to close the long trade and enter a short position at the `limitLevel`.
    strategy.entry("My Short Entry ID", strategy.short, limit = limitLevel)
    // Make new drawings for the short limit and stop extending the `shortLimit` line.
    shortLimit := drawLimit(limitLevel, isLong = false)
    longLimit.stopExtend()
```

### strategy.exit()

Creates price-based orders to exit from an open position. If unfilled exit orders with the same `id` exist, calls to this command modify those orders. This command can generate more than one type of exit order, depending on the specified parameters. However, it does not create [market orders](../concepts/strategies.md#market-orders). To exit from a position with a market order, use `strategy.close()` or `strategy.close_all()`.

If a call to this command contains a `profit` or `limit` argument, it creates [take-profit](../concepts/strategies.md#take-profit-and-stop-loss) orders to exit from applicable trades at the determined price levels or better values (higher for long trades and lower for short ones). If the call contains `loss` or `stop` arguments, it creates [stop-loss](../concepts/strategies.md#take-profit-and-stop-loss) orders to exit from applicable trades at the determined levels or worse values (lower for long trades and higher for short ones). Calling this command with `profit` or `limit` and `loss` or `stop` arguments creates an order bracket with both order types.

This command can create [trailing stop](../concepts/strategies.md#trailing-stops) orders when its call specifies a `trail_price` or `trail_points` argument and a `trail_offset` argument. A trailing stop order activates when the price moves `trail_points` ticks past the entry price or touches the `trail_price` level. Once activated, the stop follows `trail_offset` ticks behind the market price each time the trade's profit reaches a new high. The stop does not move when the trade does not achieve a new best value.

Each call to this command reserves a portion of the position to close until the strategy fills or cancels its orders. For example, if there is an open position of 50 contracts and a `strategy.exit()` call specifies a `qty` of 20, that call's orders reserve 20 contracts out of the position. A second call can close a maximum of 30 contracts, even if its `qty` is 50 and one of its orders executes first. This behavior does not affect the orders from other commands, such as `strategy.close()` or `strategy.order()`.

If a call to this command occurs before a created entry order's execution, the strategy waits and does not create the exit orders until after the entry order executes.

```pine
strategy.exit(id, from_entry, qty, qty_percent, profit, limit, loss, stop, trail_price, trail_points, trail_offset, oca_name, comment, comment_profit, comment_loss, comment_trailing, alert_message, alert_profit, alert_loss, alert_trailing, disable_alert) → void
```

**Arguments**

- `id` (series string): The identifier of the orders, which corresponds to an exit ID in the strategy's trades after an order fills. Strategy commands can reference the order ID to cancel or modify pending exit orders. The Strategy Tester and the chart display the order ID unless the command includes a `comment*` argument that applies to the filled order.
- `from_entry` (series string, optional): Optional. The entry order ID of the trade to exit from. If there is more than one open trade with the specified entry ID, the command generates exit orders for all the entries from before or at the time of the call. The default is an empty string, which means the command generates exit orders for all open trades until the position closes.
- `qty` (series int/float, optional): Optional. The number of contracts/lots/shares/units to close when an exit order fills. If specified, the command uses this value instead of `qty_percent` to determine the order size. The exit orders reserve this quantity from the position, meaning other calls to this command cannot close this portion until the strategy fills or cancels those orders. The default is `na`, which means the order size depends on the `qty_percent` value.
- `qty_percent` (series int/float, optional): Optional. A value between 0 and 100 representing the percentage of the open trade quantity to close when an exit order fills. The exit orders reserve this percentage from the applicable open trades, meaning other calls to this command cannot close this portion until the strategy fills or cancels those orders. The percentage calculation depends on the total size of the applicable open trades without considering the reserved amount from other `strategy.exit()` calls. The command ignores this parameter if the `qty` value is not `na`. The default is 100.
- `profit` (series int/float, optional): Optional. The take-profit distance, expressed in ticks. If specified, the command creates a limit order to exit the trade `profit` ticks away from the entry price in the favorable direction. The order executes at the calculated price or a better value. If this parameter and `limit` are not `na`, the command places a take-profit order only at the price level expected to trigger an exit first. The default is `na`.
- `limit` (series int/float, optional): Optional. The take-profit price. If this parameter and `profit` are not `na`, the command places a take-profit order only at the price level expected to trigger an exit first. The default is `na`.
- `loss` (series int/float, optional): Optional. The stop-loss distance, expressed in ticks. If specified, the command creates a stop order to exit the trade `loss` ticks away from the entry price in the unfavorable direction. The order executes at the calculated price or a worse value. If this parameter and `stop` are not `na`, the command places a stop-loss order only at the price level expected to trigger an exit first. The default is `na`.
- `stop` (series int/float, optional): Optional. The stop-loss price. If this parameter and `loss` are not `na`, the command places a stop-loss order only at the price level expected to trigger an exit first. The default is `na`.
- `trail_price` (series int/float, optional): Optional. The price of the trailing stop activation level. If the value is more favorable than the entry price, the command creates a trailing stop when the market price reaches that value. If less favorable than the entry price, the command creates the trailing stop immediately when the current market price is equal to or more favorable than the value. If this parameter and `trail_points` are not `na`, the command sets the activation level using the value expected to activate the stop first. The default is `na`.
- `trail_points` (series int/float, optional): Optional. The trailing stop activation distance, expressed in ticks. If the value is positive, the command creates a trailing stop order when the market price moves `trail_points` ticks away from the trade's entry price in the favorable direction. If the value is negative, the command creates the trailing stop immediately when the market price is equal to or more favorable than the level `trail_points` ticks away from the entry price in the unfavorable direction. The default is `na`.
- `trail_offset` (series int/float, optional): Optional. The trailing stop offset. When the market price reaches the activation level determined by the `trail_price` or `trail_points` parameter, or exceeds the level in the favorable direction, the command creates a trailing stop with an initial value `trail_offset` ticks away from that level in the unfavorable direction. After activation, the trailing stop moves toward the market price each time the trade's profit reaches a better value, maintaining the specified distance behind the best price. The default is `na`.
- `oca_name` (series string, optional): Optional. The name of the One-Cancels-All (OCA) group that the command's take-profit, stop-loss, and trailing stop orders belong to. All orders from this command are of the `strategy.oca.reduce` OCA type. When an order of this OCA type with the same `oca_name` executes, the strategy reduces the sizes of other unfilled orders in the OCA group by the filled quantity. The default is an empty string, which means the strategy assigns the OCA name automatically, and the resulting orders cannot reduce or be reduced by the orders from other commands.
- `comment` (series string, optional): Optional. Additional notes on the filled order. If the value is not an empty string, the Strategy Tester and the chart show this text for the order instead of the specified `id`. The command ignores this value if the call includes an argument for a `comment_*` parameter that applies to the order. The default is an empty string.
- `comment_profit` (series string, optional): Optional. Additional notes on the filled order. If the value is not an empty string, the Strategy Tester and the chart show this text for the order instead of the specified `id` or `comment`. This comment applies only to the command's take-profit orders created using the `profit` or `limit` parameter. The default is an empty string.
- `comment_loss` (series string, optional): Optional. Additional notes on the filled order. If the value is not an empty string, the Strategy Tester and the chart show this text for the order instead of the specified `id` or `comment`. This comment applies only to the command's stop-loss orders created using the `loss` or `stop` parameter. The default is an empty string.
- `comment_trailing` (series string, optional): Optional. Additional notes on the filled order. If the value is not an empty string, the Strategy Tester and the chart show this text for the order instead of the specified `id` or `comment`. This comment applies only to the command's trailing stop orders created using the `trail_price` or `trail_points` and `trail_offset` parameters. The default is an empty string.
- `alert_message` (series string, optional): Optional. Custom text for the alert that fires when an order fills. If the "Message" field of the "Create Alert" dialog box contains the `{{strategy.order.alert_message}}` placeholder, the alert message replaces the placeholder with this text. The command ignores this value if the call includes an argument for the other `alert_*` parameter that applies to the order. The default is an empty string.
- `alert_profit` (series string, optional): Optional. Custom text for the alert that fires when an order fills. If the "Message" field of the "Create Alert" dialog box contains the `{{strategy.order.alert_message}}` placeholder, the alert message replaces the placeholder with this text. This message applies only to the command's take-profit orders created using the `profit` or `limit` parameter. The default is an empty string.
- `alert_loss` (series string, optional): Optional. Custom text for the alert that fires when an order fills. If the "Message" field of the "Create Alert" dialog box contains the `{{strategy.order.alert_message}}` placeholder, the alert message replaces the placeholder with this text. This message applies only to the command's stop-loss orders created using the `loss` or `stop` parameter. The default is an empty string.
- `alert_trailing` (series string, optional): Optional. Custom text for the alert that fires when an order fills. If the "Message" field of the "Create Alert" dialog box contains the `{{strategy.order.alert_message}}` placeholder, the alert message replaces the placeholder with this text. This message applies only to the command's trailing stop orders created using the `trail_price` or `trail_points` and `trail_offset` parameters. The default is an empty string.
- `disable_alert` (series bool, optional): Optional. If `true` when the command creates an order, the strategy does not trigger an alert when that order fills. This parameter accepts a "series" value, meaning users can control which orders trigger alerts when they execute. The default is `false`.

```pine
//@version=6
strategy("Exit bracket strategy", overlay = true)

// Inputs that define the profit and loss amount of each trade as a tick distance from the entry price.
int profitDistanceInput = input.int(100, "Profit distance, in ticks", 1)
int lossDistanceInput   = input.int(100, "Loss distance, in ticks", 1)

// Variables to track the take-profit and stop-loss price.
var float takeProfit = na
var float stopLoss   = na

// Calculate a 14-bar and 28-bar moving average of `close` prices.
float sma14 = ta.sma(close, 14)
float sma28 = ta.sma(close, 28)

if ta.crossover(sma14, sma28) and strategy.opentrades == 0
    // Place a market order to enter a long position.
    strategy.entry("My Long Entry ID", strategy.long)
    // Place a take-profit and stop-loss order when the entry order fills.
    strategy.exit("My Long Exit ID", "My Long Entry ID", profit = profitDistanceInput, loss = lossDistanceInput)

if ta.change(strategy.opentrades) == 1
    //@variable The long entry price.
    float entryPrice = strategy.opentrades.entry_price(0)
    // Update the `takeProfit` and `stopLoss` values.
    takeProfit := entryPrice + profitDistanceInput * syminfo.mintick
    stopLoss   := entryPrice - lossDistanceInput * syminfo.mintick

if ta.change(strategy.closedtrades) == 1
    // Reset the `takeProfit` and `stopLoss`.
    takeProfit := na
    stopLoss   := na

// Plot the `takeProfit` and `stopLoss`.
plot(takeProfit, "Take-profit level", color.green, 2, plot.style_linebr)
plot(stopLoss, "Stop-loss level", color.red, 2, plot.style_linebr)
```

```pine
//@version=6
strategy("Trailing stop strategy", overlay = true)

//@variable The distance required to activate the trailing stop.
float activationDistanceInput = input.int(100, "Trail activation distance, in ticks") * syminfo.mintick
//@variable The number of ticks the trailing stop follows behind the price as it reaches new peaks.
int trailDistanceInput = input.int(100, "Trail distance, in ticks")

//@function Draws a label and line at the specified `price` to visualize a trailing stop order's activation level.
drawActivation(float price) =>
    label.new(
         bar_index, price, "Activation level", style = label.style_label_right,
         color = color.gray, textcolor = color.white
     )
    line.new(
         bar_index, price, bar_index + 1, price, extend = extend.right, style = line.style_dashed, color = color.gray
     )

//@function Stops the `l` line from extending further.
method stopExtend(line l) =>
    l.set_x2(bar_index)
    l.set_extend(extend.none)

// The activation line, active trailing stop price, and active trailing stop flag.
var line activationLine     = na
var float trailingStopPrice = na
var bool isActive           = false

if bar_index % 100 == 0 and strategy.opentrades == 0
    trailingStopPrice := na
    isActive          := false
    // Place a market order to enter a long position.
    strategy.entry("My Long Entry ID", strategy.long)
    //@variable The activation level's price.
    float activationPrice = close + activationDistanceInput
    // Create a trailing stop order that activates the defined number of ticks above the entry price.
    strategy.exit(
         "My Long Exit ID", "My Long Entry ID", trail_price = activationPrice, trail_offset = trailDistanceInput,
         oca_name = "Exit"
     )
    // Create new drawings at the `activationPrice`.
    activationLine := drawActivation(activationPrice)

// Logic for trailing stop visualization.
if strategy.opentrades == 1
    // Stop extending the `activationLine` when the stop activates.
    if not isActive and high > activationLine.get_price(bar_index)
        isActive := true
        activationLine.stopExtend()
    // Update the `trailingStopPrice` while the trailing stop is active.
    if isActive
        float offsetPrice = high - trailDistanceInput * syminfo.mintick
        trailingStopPrice := math.max(nz(trailingStopPrice, offsetPrice), offsetPrice)

// Close the trade with a market order if the trailing stop does not activate before the next 300th bar.
if not isActive and bar_index % 300 == 0
    strategy.close_all("Market close")

// Reset the `trailingStopPrice` and `isActive` flags when the trade closes, and stop extending the `activationLine`.
if ta.change(strategy.closedtrades) > 0
    if not isActive
        activationLine.stopExtend()
    trailingStopPrice := na
    isActive          := false

// Plot the `trailingStopPrice`.
plot(trailingStopPrice, "Trailing stop", color.red, 3, plot.style_linebr)
```

**Remarks**

A single call to the `strategy.exit()` command can generate exit orders for several entries in an open position, depending on the call's `from_entry` value. If the call does not include a `from_entry` argument, it creates exit orders for all open trades, even the ones opened after the call, until the position closes. See [this](../concepts/strategies.md#exits-for-multiple-entries) section of our User Manual to learn more.

When a position consists of several open trades, and the `close_entries_rule` in the `strategy()` declaration statement is "FIFO" (default), the orders from a `strategy.exit()` call exit from the position starting with the first open trade. This behavior applies even if the `from_entry` value is the entry ID of different open trades. However, in that case, the maximum size of the exit orders still depends on the trades opened by orders with the `from_entry` ID. For more information, see [this](../concepts/strategies.md#closing-a-market-position) section of our User Manual.

If a `strategy.exit()` call includes arguments for creating stop-loss and trailing stop orders, the command places only the order that is supposed to fill first, because both orders are of the "stop" type.

### strategy.opentrades.commission()

Returns the sum of entry and exit fees paid in the open trade, expressed in `strategy.account_currency`.

```pine
strategy.opentrades.commission(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the open trade. The number of the first trade is zero.

```pine
// Calculates the gross profit or loss for the current open position.
//@version=6
strategy("`strategy.opentrades.commission` Example", commission_type = strategy.commission.percent, commission_value = 0.1)

// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars.
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long)
if bar_index % 20 == 0
    strategy.close("Long")

// Calculate gross profit or loss for open positions only.
tradeOpenGrossPL() =>
    sumOpenGrossPL = 0.0
    for tradeNo = 0 to strategy.opentrades - 1
        sumOpenGrossPL += strategy.opentrades.profit(tradeNo) - strategy.opentrades.commission(tradeNo)
    result = sumOpenGrossPL

plot(tradeOpenGrossPL())
```

**See also:** `strategy()`, `strategy.closedtrades.commission()`

### strategy.opentrades.entry_bar_index()

Returns the bar_index of the open trade's entry.

```pine
strategy.opentrades.entry_bar_index(trade_num) → series int
```

**Arguments**

- `trade_num` (series int): The trade number of the open trade. The number of the first trade is zero.

```pine
// Wait 10 bars and then close the position.
//@version=6
strategy("`strategy.opentrades.entry_bar_index` Example")

barsSinceLastEntry() =>
    strategy.opentrades > 0 ? bar_index - strategy.opentrades.entry_bar_index(strategy.opentrades - 1) : na

// Enter a long position if there are no open positions.
if strategy.opentrades == 0
    strategy.entry("Long", strategy.long)

// Close the long position after 10 bars.
if barsSinceLastEntry() >= 10
    strategy.close("Long")
```

**See also:** `strategy.closedtrades.entry_bar_index()`, `strategy.closedtrades.exit_bar_index()`

### strategy.opentrades.entry_comment()

Returns the comment message of the open trade's entry, or `na` if there is no entry with this `trade_num`.

```pine
strategy.opentrades.entry_comment(trade_num) → series string
```

**Arguments**

- `trade_num` (series int): The trade number of the open trade. The number of the first trade is zero.

```pine
//@version=6
strategy("`strategy.opentrades.entry_comment()` Example", overlay = true)

stopPrice = open * 1.01

longCondition = ta.crossover(ta.sma(close, 14), ta.sma(close, 28))

if (longCondition)
    strategy.entry("Long", strategy.long, stop = stopPrice, comment = str.tostring(stopPrice, "#.####"))

var testTable = table.new(position.top_right, 1, 3, color.orange, border_width = 1)

if barstate.islastconfirmedhistory or barstate.isrealtime
    table.cell(testTable, 0, 0, 'Last entry stats')
    table.cell(testTable, 0, 1, "Order stop price value: " + strategy.opentrades.entry_comment(strategy.opentrades - 1))
    table.cell(testTable, 0, 2, "Actual Entry Price: " + str.tostring(strategy.opentrades.entry_price(strategy.opentrades - 1)))
```

**See also:** `strategy()`, `strategy.entry()`, `strategy.opentrades`

### strategy.opentrades.entry_id()

Returns the id of the open trade's entry.

```pine
strategy.opentrades.entry_id(trade_num) → series string
```

**Arguments**

- `trade_num` (series int): The trade number of the open trade. The number of the first trade is zero.

**Returns:** Returns the id of the open trade's entry.

**Remarks**

The function returns na if trade_num is not in the range: 0 to strategy.opentrades-1.

```pine
//@version=6
strategy("`strategy.opentrades.entry_id` Example", overlay = true)

// We enter a long position when 14 period sma crosses over 28 period sma.
// We enter a short position when 14 period sma crosses under 28 period sma.
longCondition = ta.crossover(ta.sma(close, 14), ta.sma(close, 28))
shortCondition = ta.crossunder(ta.sma(close, 14), ta.sma(close, 28))

// Strategy calls to enter a long or short position when the corresponding condition is met.
if longCondition
    strategy.entry("Long entry at bar #" + str.tostring(bar_index), strategy.long)
if shortCondition
    strategy.entry("Short entry at bar #" + str.tostring(bar_index), strategy.short)

// Display ID of the latest open position.
if barstate.islastconfirmedhistory
    label.new(bar_index, high + (2 * ta.tr), "Last opened position is \n " + strategy.opentrades.entry_id(strategy.opentrades - 1))
```

**See also:** `strategy.opentrades.entry_bar_index()`, `strategy.opentrades.entry_price()`, `strategy.opentrades.entry_time()`

### strategy.opentrades.entry_price()

Returns the price of the open trade's entry.

```pine
strategy.opentrades.entry_price(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the open trade. The number of the first trade is zero.

```pine
//@version=6
strategy("strategy.opentrades.entry_price Example 1", overlay = true)

// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars.
if ta.crossover(close, ta.sma(close, 14))
	strategy.entry("Long", strategy.long)

// Return the entry price for the latest closed trade.
currEntryPrice = strategy.opentrades.entry_price(strategy.opentrades - 1)
currExitPrice = currEntryPrice * 1.05

if high >= currExitPrice
	strategy.close("Long")

plot(currEntryPrice, "Long entry price", style = plot.style_linebr)
plot(currExitPrice, "Long exit price", color.green, style = plot.style_linebr)
```

```pine
// Calculates the average price for the open position.
//@version=6
strategy("strategy.opentrades.entry_price Example 2", pyramiding = 2)

// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars.
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long)
if bar_index % 20 == 0
    strategy.close("Long")

// Calculates the average price for the open position.
avgOpenPositionPrice() =>
    sumOpenPositionPrice = 0.0
    for tradeNo = 0 to strategy.opentrades - 1
        sumOpenPositionPrice += strategy.opentrades.entry_price(tradeNo) * strategy.opentrades.size(tradeNo) / strategy.position_size
    result = nz(sumOpenPositionPrice / strategy.opentrades)

plot(avgOpenPositionPrice())
```

**See also:** `strategy.closedtrades.exit_price()`

### strategy.opentrades.entry_time()

Returns the UNIX time of the open trade's entry, expressed in milliseconds.

```pine
strategy.opentrades.entry_time(trade_num) → series int
```

**Arguments**

- `trade_num` (series int): The trade number of the open trade. The number of the first trade is zero.

```pine
//@version=6
strategy("strategy.opentrades.entry_time Example")

// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars.
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long)
if bar_index % 20 == 0
    strategy.close("Long")

// Calculates duration in milliseconds since the last position was opened.
timeSinceLastEntry()=>
    strategy.opentrades > 0 ? (time - strategy.opentrades.entry_time(strategy.opentrades - 1)) : na

plot(timeSinceLastEntry() / 1000 * 60 * 60 * 24, "Days since last entry")
```

**See also:** `strategy.closedtrades.entry_time()`, `strategy.closedtrades.exit_time()`

### strategy.opentrades.max_drawdown()

Returns the maximum drawdown of the open trade, i.e., the maximum possible loss during the trade, expressed in `strategy.account_currency`.

```pine
strategy.opentrades.max_drawdown(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the open trade. The number of the first trade is zero.

```pine
//@version=6
strategy("strategy.opentrades.max_drawdown Example 1")

// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars.
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long)
if bar_index % 20 == 0
    strategy.close("Long")

// Plot the max drawdown of the latest open trade.
plot(strategy.opentrades.max_drawdown(strategy.opentrades - 1), "Max drawdown of the latest open trade")
```

```pine
// Calculates the max trade drawdown value for all open trades.
//@version=6
strategy("`strategy.opentrades.max_drawdown` Example 2", pyramiding = 100)

// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars.
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long)
if bar_index % 20 == 0
    strategy.close("Long")

// Get the biggest max trade drawdown value from all of the open trades.
maxTradeDrawDown() =>
    maxDrawdown = 0.0
    for tradeNo = 0 to strategy.opentrades - 1
        maxDrawdown := math.max(maxDrawdown, strategy.opentrades.max_drawdown(tradeNo))
    result = maxDrawdown

plot(maxTradeDrawDown(), "Biggest max drawdown")
```

**Remarks**

The function returns na if trade_num is not in the range: 0 to strategy.closedtrades - 1.

**See also:** `strategy.closedtrades.max_drawdown()`, `strategy.max_drawdown`

### strategy.opentrades.max_drawdown_percent()

Returns the maximum drawdown of the open trade, i.e., the maximum possible loss during the trade, expressed as a percentage and calculated by formula: `Lowest Value During Trade / (Entry Price x Quantity) * 100`.

```pine
strategy.opentrades.max_drawdown_percent(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

**See also:** `strategy.opentrades.max_drawdown()`, `strategy.max_drawdown`

### strategy.opentrades.max_runup()

Returns the maximum run up of the open trade, i.e., the maximum possible profit during the trade, expressed in `strategy.account_currency`.

```pine
strategy.opentrades.max_runup(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the open trade. The number of the first trade is zero.

```pine
//@version=6
strategy("strategy.opentrades.max_runup Example 1")

// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars.
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long)
if bar_index % 20 == 0
    strategy.close("Long")

// Plot the max runup of the latest open trade.
plot(strategy.opentrades.max_runup(strategy.opentrades - 1), "Max runup of the latest open trade")
```

```pine
// Calculates the max trade runup value for all open trades.
//@version=6
strategy("strategy.opentrades.max_runup Example 2", pyramiding = 100)

// Enter a long position every 30 bars.
if bar_index % 30 == 0
    strategy.entry("Long", strategy.long)

// Calculate biggest max trade runup value from all of the open trades.
maxOpenTradeRunUp() =>
    maxRunup = 0.0
    for tradeNo = 0 to strategy.opentrades - 1
        maxRunup := math.max(maxRunup, strategy.opentrades.max_runup(tradeNo))
    result = maxRunup

plot(maxOpenTradeRunUp(), "Biggest max runup of all open trades")
```

**See also:** `strategy.closedtrades.max_runup()`, `strategy.max_drawdown`

### strategy.opentrades.max_runup_percent()

Returns the maximum run-up of the open trade, i.e., the maximum possible profit during the trade, expressed as a percentage and calculated by formula: `Highest Value During Trade / (Entry Price x Quantity) * 100`.

```pine
strategy.opentrades.max_runup_percent(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

**See also:** `strategy.opentrades.max_runup()`, `strategy.max_runup`

### strategy.opentrades.profit()

Returns the profit/loss of the open trade, expressed in `strategy.account_currency`. Losses are expressed as negative values.

```pine
strategy.opentrades.profit(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the open trade. The number of the first trade is zero.

```pine
// Returns the profit of the last open trade.
//@version=6
strategy("`strategy.opentrades.profit` Example 1", commission_type = strategy.commission.percent, commission_value = 0.1)

// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars.
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long)
if bar_index % 20 == 0
    strategy.close("Long")

plot(strategy.opentrades.profit(strategy.opentrades - 1), "Profit of the latest open trade")
```

```pine
// Calculates the profit for all open trades.
//@version=6
strategy("`strategy.opentrades.profit` Example 2", pyramiding = 5)

// Strategy calls to enter 5 long positions every 2 bars.
if bar_index % 2 == 0
    strategy.entry("Long", strategy.long, qty = 5)

// Calculate open profit or loss for the open positions.
tradeOpenPL() =>
    sumProfit = 0.0
    for tradeNo = 0 to strategy.opentrades - 1
        sumProfit += strategy.opentrades.profit(tradeNo)
    result = sumProfit

plot(tradeOpenPL(), "Profit of all open trades")
```

**See also:** `strategy.closedtrades.profit()`, `strategy.openprofit`, `strategy.netprofit`, `strategy.grossprofit`

### strategy.opentrades.profit_percent()

Returns the profit/loss of the open trade, expressed as a percentage. Losses are expressed as negative values.

```pine
strategy.opentrades.profit_percent(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the closed trade. The number of the first trade is zero.

**See also:** `strategy.opentrades.profit()`

### strategy.opentrades.size()

Returns the direction and the number of contracts traded in the open trade. If the value is > 0, the market position was long. If the value is < 0, the market position was short.

```pine
strategy.opentrades.size(trade_num) → series float
```

**Arguments**

- `trade_num` (series int): The trade number of the open trade. The number of the first trade is zero.

```pine
//@version=6
strategy("`strategy.opentrades.size` Example 1")

// We calculate the max amt of shares we can buy.
amtShares = math.floor(strategy.equity / close)
// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long, qty = amtShares)
if bar_index % 20 == 0
    strategy.close("Long")

// Plot the number of contracts in the latest open trade.
plot(strategy.opentrades.size(strategy.opentrades - 1), "Amount of contracts in latest open trade")
```

```pine
// Calculates the average profit percentage for all open trades.
//@version=6
strategy("`strategy.opentrades.size` Example 2")

// Strategy calls to enter long trades every 15 bars and exit long trades every 20 bars.
if bar_index % 15 == 0
    strategy.entry("Long", strategy.long)
if bar_index % 20 == 0
    strategy.close("Long")

// Calculate profit for all open trades.
profitPct = 0.0
for tradeNo = 0 to strategy.opentrades - 1
    entryP = strategy.opentrades.entry_price(tradeNo)
    exitP = close
    profitPct += (exitP - entryP) / entryP * strategy.opentrades.size(tradeNo) * 100

// Calculate average profit percent for all open trades.
avgProfitPct = nz(profitPct / strategy.opentrades)
plot(avgProfitPct)
```

**See also:** `strategy.closedtrades.size()`, `strategy.position_size`, `strategy.opentrades`, `strategy.closedtrades`

### strategy.order()

Creates a new order to open, add to, or exit from a position. If an unfilled order with the same `id` exists, a call to this command modifies that order.

The resulting order's type depends on the `limit` and `stop` parameters. If the call does not contain `limit` or `stop` arguments, it creates a [market order](../concepts/strategies.md#market-orders) that executes on the next tick. If the call specifies a `limit` value but no `stop` value, it places a [limit order](../concepts/strategies.md#limit-orders) that executes after the market price reaches the `limit` value or a better price (lower for buy orders and higher for sell orders). If the call specifies a `stop` value but no `limit` value, it places a [stop order](../concepts/strategies.md#stop-and-stop-limit-orders) that executes after the market price reaches the `stop` value or a worse price (higher for buy orders and lower for sell orders). If the call contains `limit` and `stop` arguments, it creates a [stop-limit](../concepts/strategies.md#stop-and-stop-limit-orders) order, which generates a limit order at the `limit` price only after the market price reaches the `stop` value or a worse price.

Orders from this command, unlike those from `strategy.entry()`, are not affected by the `pyramiding` parameter of the `strategy()` declaration statement. Strategies can open any number of trades in the same direction with calls to this function.

This command does not automatically reverse open positions because it does not exclusively create entry orders like `strategy.entry()` does. For example, if there is an open long position of five shares, an order from this command with a `qty` of 5 and a `direction` of `strategy.short` triggers the sale of five shares, which closes the position.

```pine
strategy.order(id, direction, qty, limit, stop, oca_name, oca_type, comment, alert_message, disable_alert) → void
```

**Arguments**

- `id` (series string): The identifier of the order, which corresponds to an entry or exit ID in the strategy's trades after the order fills. If the strategy opens a new position after filling the order, the order's ID becomes the `strategy.position_entry_name` value. Strategy commands can reference the order ID to cancel or modify pending orders and generate exit orders for specific open trades. The Strategy Tester and the chart display the order ID unless the command specifies a `comment` value.
- `direction` (series strategy_direction): The direction of the trade. Possible values: `strategy.long` for a long trade, `strategy.short` for a short one.
- `qty` (series int/float, optional): Optional. The number of contracts/shares/lots/units to trade when the order fills. The default is `na`, which means that the command uses the `default_qty_type` and `default_qty_value` parameters of the `strategy()` declaration statement to determine the quantity.
- `limit` (series int/float, optional): Optional. The limit price of the order. If specified, the command creates a limit or stop-limit order, depending on whether the `stop` value is also specified. The default is `na`, which means the resulting order is not of the limit or stop-limit type.
- `stop` (series int/float, optional): Optional. The stop price of the order. If specified, the command creates a stop or stop-limit order, depending on whether the `limit` value is also specified. The default is `na`, which means the resulting order is not of the stop or stop-limit type.
- `oca_name` (series string, optional): Optional. The name of the order's One-Cancels-All (OCA) group. When a pending order with the same `oca_name` and `oca_type` parameters executes, that order affects all unfilled orders in the group. The default is an empty string, which means the order does not belong to an OCA group.
- `oca_type` (input string, optional): Optional. Specifies how an unfilled order behaves when another pending order with the same `oca_name` and `oca_type` values executes. Possible values: `strategy.oca.cancel`, `strategy.oca.reduce`, `strategy.oca.none`. The default is `strategy.oca.none`.
- `comment` (series string, optional): Optional. Additional notes on the filled order. If the value is not an empty string, the Strategy Tester and the chart show this text for the order instead of the specified `id`. The default is an empty string.
- `alert_message` (series string, optional): Optional. Custom text for the alert that fires when an order fills. If the "Message" field of the "Create Alert" dialog box contains the `{{strategy.order.alert_message}}` placeholder, the alert message replaces the placeholder with this text. The default is an empty string.
- `disable_alert` (series bool, optional): Optional. If `true` when the command creates an order, the strategy does not trigger an alert when that order fills. This parameter accepts a "series" value, meaning users can control which orders trigger alerts when they execute. The default is `false`.

```pine
//@version=6
strategy("Market order strategy", overlay = true)

// Calculate a 14-bar and 28-bar moving average of `close` prices.
float sma14 = ta.sma(close, 14)
float sma28 = ta.sma(close, 28)

// Place a market order to enter a long position when `sma14` crosses over `sma28`.
if ta.crossover(sma14, sma28) and strategy.position_size == 0
    strategy.order("My Long Entry ID", strategy.long)

// Place a market order to sell the same quantity as the long trade when `sma14` crosses under `sma28`,
// effectively closing the long position.
if ta.crossunder(sma14, sma28) and strategy.position_size > 0
    strategy.order("My Long Exit ID", strategy.short)
```

```pine
//@version=6
strategy("Limit and stop exit strategy", overlay = true)

//@variable The distance from the long entry price for each short limit order.
float shortOffsetInput = input.int(200, "Sell limit/stop offset, in ticks", 1) * syminfo.mintick

//@function Draws a label and line at the specified `price` to visualize a limit order's level.
drawLimit(float price, bool isLong, bool isStop = false) =>
    color col = isLong ? color.blue : color.red
    label.new(
         bar_index, price, (isLong ? "Long " : "Short ") + (isStop ? "stop" : "limit") + " order created",
         style = label.style_label_right, color = col, textcolor = color.white
     )
    line.new(bar_index, price, bar_index + 1, price, extend = extend.right, style = line.style_dashed, color = col)

//@function Stops the `l` line from extending further.
method stopExtend(line l) =>
    l.set_x2(bar_index)
    l.set_extend(extend.none)

// Initialize two `line` variables to reference limit and stop line IDs.
var line profitLimit = na
var line lossStop    = na

// Calculate a 14-bar and 28-bar moving average of `close` prices.
float sma14 = ta.sma(close, 14)
float sma28 = ta.sma(close, 28)

if ta.crossover(sma14, sma28) and strategy.position_size == 0
    // Place a market order to enter a long position.
    strategy.order("My Long Entry ID", strategy.long)

if strategy.position_size > 0 and strategy.position_size[1] == 0
    //@variable The entry price of the long trade.
    float entryPrice = strategy.opentrades.entry_price(0)
    // Calculate short limit and stop levels above and below the `entryPrice`.
    float profitLevel = entryPrice + shortOffsetInput
    float lossLevel   = entryPrice - shortOffsetInput
    // Place short limit and stop orders at the `profitLevel` and `lossLevel`.
    strategy.order("Profit", strategy.short, limit = profitLevel, oca_name = "Bracket", oca_type = strategy.oca.cancel)
    strategy.order("Loss", strategy.short, stop = lossLevel, oca_name = "Bracket", oca_type = strategy.oca.cancel)
    // Make new drawings for the `profitLimit` and `lossStop` lines.
    profitLimit := drawLimit(profitLevel, isLong = false)
    lossStop    := drawLimit(lossLevel, isLong = false, isStop = true)

if ta.change(strategy.closedtrades) > 0
    // Stop extending the `profitLimit` and `lossStop` lines.
    profitLimit.stopExtend()
    lossStop.stopExtend()
```

### strategy.risk.allow_entry_in()

This function can be used to specify in which market direction the `strategy.entry()` function is allowed to open positions.

```pine
strategy.risk.allow_entry_in(value) → void
```

**Arguments**

- `value` (simple string): The allowed direction. Possible values: `strategy.direction.all`, `strategy.direction.long`, `strategy.direction.short`

```pine
//@version=6
strategy("strategy.risk.allow_entry_in")

strategy.risk.allow_entry_in(strategy.direction.long)
if open > close
	strategy.entry("Long", strategy.long)
// Instead of opening a short position with 10 contracts, this command will close long entries.
if open < close
	strategy.entry("Short", strategy.short, qty = 10)
```

### strategy.risk.max_cons_loss_days()

The purpose of this rule is to cancel all pending orders, close all open positions and stop placing orders after a specified number of consecutive days with losses. The rule affects the whole strategy.

```pine
strategy.risk.max_cons_loss_days(count, alert_message) → void
```

**Arguments**

- `count` (simple int): A required parameter. The allowed number of consecutive days with losses.
- `alert_message` (simple string, optional): An optional parameter which replaces the {{strategy.order.alert_message}} placeholder when it is used in the "Create Alert" dialog box's "Message" field.

```pine
//@version=6
strategy("risk.max_cons_loss_days Demo 1")
strategy.risk.max_cons_loss_days(3) // No orders will be placed after 3 days, if each day is with loss.
plot(strategy.position_size)
```

### strategy.risk.max_drawdown()

The purpose of this rule is to determine maximum drawdown. The rule affects the whole strategy. Once the maximum drawdown value is reached, all pending orders are cancelled, all open positions are closed and no new orders can be placed.

```pine
strategy.risk.max_drawdown(value, type, alert_message) → void
```

**Arguments**

- `value` (simple int/float): A required parameter. The maximum drawdown value. It is specified either in money (base currency), or in percentage of maximum equity. For % of equity the range of allowed values is from 0 to 100.
- `type` (simple string): A required parameter. The type of the value. Please specify one of the following values: `strategy.percent_of_equity` or `strategy.cash`. Note: if equity drops down to zero or to a negative and the 'strategy.percent_of_equity' is specified, all pending orders are cancelled, all open positions are closed and no new orders can be placed for good.
- `alert_message` (simple string, optional): An optional parameter which replaces the {{strategy.order.alert_message}} placeholder when it is used in the "Create Alert" dialog box's "Message" field.

```pine
//@version=6
strategy("risk.max_drawdown Demo 1")
strategy.risk.max_drawdown(50, strategy.percent_of_equity) // set maximum drawdown to 50% of maximum equity
plot(strategy.position_size)
```

```pine
//@version=6
strategy("risk.max_drawdown Demo 2", currency = "EUR")
strategy.risk.max_drawdown(2000, strategy.cash) // set maximum drawdown to 2000 EUR from maximum equity
plot(strategy.position_size)
```

### strategy.risk.max_intraday_filled_orders()

The purpose of this rule is to determine maximum number of filled orders per 1 day (per 1 bar, if chart resolution is higher than 1 day). The rule affects the whole strategy. Once the maximum number of filled orders is reached, all pending orders are cancelled, all open positions are closed and no new orders can be placed till the end of the current trading session.

```pine
strategy.risk.max_intraday_filled_orders(count, alert_message) → void
```

**Arguments**

- `count` (simple int): A required parameter. The maximum number of filled orders per 1 day.
- `alert_message` (simple string, optional): An optional parameter which replaces the {{strategy.order.alert_message}} placeholder when it is used in the "Create Alert" dialog box's "Message" field.

```pine
//@version=6
strategy("risk.max_intraday_filled_orders Demo")
strategy.risk.max_intraday_filled_orders(10) // After 10 orders are filled, no more strategy orders will be placed (except for a market order to exit current open market position, if there is any).
if open > close
	strategy.entry("buy", strategy.long)
if open < close
	strategy.entry("sell", strategy.short)
```

### strategy.risk.max_intraday_loss()

The maximum loss value allowed during a day. It is specified either in money (base currency), or in percentage of maximum intraday equity (0 -100).

```pine
strategy.risk.max_intraday_loss(value, type, alert_message) → void
```

**Arguments**

- `value` (simple int/float): A required parameter. The maximum loss value. It is specified either in money (base currency), or in percentage of maximum intraday equity. For % of equity the range of allowed values is from 0 to 100.
- `type` (simple string): A required parameter. The type of the value. Please specify one of the following values: `strategy.percent_of_equity` or `strategy.cash`. Note: if equity drops down to zero or to a negative and the `strategy.percent_of_equity` is specified, all pending orders are cancelled, all open positions are closed and no new orders can be placed for good.
- `alert_message` (simple string, optional): An optional parameter which replaces the {{strategy.order.alert_message}} placeholder when it is used in the "Create Alert" dialog box's "Message" field.

```pine
// Sets the maximum intraday loss using the strategy's equity value.
//@version=6
strategy("strategy.risk.max_intraday_loss Example 1", overlay = false, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

// Input for maximum intraday loss %.
lossPct = input.float(10)

// Set maximum intraday loss to our lossPct input
strategy.risk.max_intraday_loss(lossPct, strategy.percent_of_equity)

// Enter Short at bar_index zero.
if bar_index == 0
	strategy.entry("Short", strategy.short)

// Store equity value from the beginning of the day
eqFromDayStart = ta.valuewhen(ta.change(dayofweek) > 0, strategy.equity, 0)

// Calculate change of the current equity from the beginning of the current day.
eqChgPct = 100 * ((strategy.equity - eqFromDayStart) / strategy.equity)

// Plot it
plot(eqChgPct)
hline(-lossPct)
```

```pine
// Sets the maximum intraday loss using the strategy's cash value.
//@version=6
strategy("strategy.risk.max_intraday_loss Example 2", overlay = false)

// Input for maximum intraday loss in absolute cash value of the symbol.
absCashLoss = input.float(5)

// Set maximum intraday loss to `absCashLoss` in account currency.
strategy.risk.max_intraday_loss(absCashLoss, strategy.cash)

// Enter Short at bar_index zero.
if bar_index == 0
	strategy.entry("Short", strategy.short)

// Store the open price value from the beginning of the day.
beginPrice = ta.valuewhen(ta.change(dayofweek) > 0, open, 0)

// Calculate the absolute price change for the current period.
priceChg = (close - beginPrice)

hline(absCashLoss)
plot(priceChg)
```

**See also:** `strategy()`, `strategy.percent_of_equity`, `strategy.cash`

### strategy.risk.max_position_size()

The purpose of this rule is to determine maximum size of a market position. The rule affects the following function: `strategy.entry()`. The 'entry' quantity can be reduced (if needed) to such number of contracts/shares/lots/units, so the total position size doesn't exceed the value specified in 'strategy.risk.max_position_size'. If minimum possible quantity still violates the rule, the order will not be placed.

```pine
strategy.risk.max_position_size(contracts) → void
```

**Arguments**

- `contracts` (simple int/float): A required parameter. Maximum number of contracts/shares/lots/units in a position.

```pine
//@version=6
strategy("risk.max_position_size Demo", default_qty_value = 100)
strategy.risk.max_position_size(10)
if open > close
	strategy.entry("buy", strategy.long)
plot(strategy.position_size) // max plot value will be 10
```
