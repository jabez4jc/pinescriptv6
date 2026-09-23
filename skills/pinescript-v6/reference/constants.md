# Built-in constants (color.*, shape.*, plot.style_*, strategy.*, currency.*, ...)

Source: https://www.tradingview.com/pine-script-reference/v6/

## adjustment

- `adjustment.dividends` (const string): Constant for dividends adjustment type (dividends adjustment is applied).
- `adjustment.none` (const string): Constant for none adjustment type (no adjustment is applied).
- `adjustment.splits` (const string): Constant for splits adjustment type (splits adjustment is applied).

## alert

- `alert.freq_all` (const string): A named constant for use with the `freq` parameter of the alert() function. All function calls trigger the alert.
- `alert.freq_once_per_bar` (const string): A named constant for use with the `freq` parameter of the alert() function. The first function call during the bar triggers the alert.
- `alert.freq_once_per_bar_close` (const string): A named constant for use with the `freq` parameter of the alert() function. The function call triggers the alert only when it occurs during the last script iteration of the real-time bar, when it closes.

## backadjustment

- `backadjustment.inherit` (const backadjustment): A constant to specify the value of the `backadjustment` parameter in `ticker.new()` and `ticker.modify()` functions.
- `backadjustment.off` (const backadjustment): A constant to specify the value of the `backadjustment` parameter in `ticker.new()` and `ticker.modify()` functions.
- `backadjustment.on` (const backadjustment): A constant to specify the value of the `backadjustment` parameter in `ticker.new()` and `ticker.modify()` functions.

## barmerge

- `barmerge.gaps_off` (const barmerge_gaps): Merge strategy for requested data. Data is merged continuously without gaps, all the gaps are filled with the previous nearest existing value.
- `barmerge.gaps_on` (const barmerge_gaps): Merge strategy for requested data. Data is merged with possible gaps (`na` values).
- `barmerge.lookahead_off` (const barmerge_lookahead): Merge strategy for the requested data position. Requested barset is merged with current barset in the order of sorting bars by their close time. This merge strategy disables effect of getting data from "future" on calculation on history.
- `barmerge.lookahead_on` (const barmerge_lookahead): Merge strategy for the requested data position. Requested barset is merged with current barset in the order of sorting bars by their opening time. This merge strategy can lead to undesirable effect of getting data from "future" on calculation on history. This is unacceptable in backtesting strategies, but can be useful in indicators.

## color

- `color.aqua` (const color): Is a named constant for #00BCD4 color.
- `color.black` (const color): Is a named constant for #363A45 color.
- `color.blue` (const color): Is a named constant for #2962ff color.
- `color.fuchsia` (const color): Is a named constant for #E040FB color.
- `color.gray` (const color): Is a named constant for #787B86 color.
- `color.green` (const color): Is a named constant for #4CAF50 color.
- `color.lime` (const color): Is a named constant for #00E676 color.
- `color.maroon` (const color): Is a named constant for #880E4F color.
- `color.navy` (const color): Is a named constant for #311B92 color.
- `color.olive` (const color): Is a named constant for #808000 color.
- `color.orange` (const color): Is a named constant for #FF9800 color.
- `color.purple` (const color): Is a named constant for #9C27B0 color.
- `color.red` (const color): Is a named constant for #F23645 color.
- `color.silver` (const color): Is a named constant for #B2B5BE color.
- `color.teal` (const color): Is a named constant for #089981 color.
- `color.white` (const color): Is a named constant for #FFFFFF color.
- `color.yellow` (const color): Is a named constant for #FDD835 color.

## currency

- `currency.AED` (const string): Arab Emirates Dirham.
- `currency.ARS` (const string): Argentine Pesos.
- `currency.AUD` (const string): Australian dollar.
- `currency.BDT` (const string): Bangladeshi Taka.
- `currency.BHD` (const string): Bahraini Dinar.
- `currency.BRL` (const string): Brazilian real.
- `currency.BTC` (const string): Bitcoin.
- `currency.CAD` (const string): Canadian dollar.
- `currency.CHF` (const string): Swiss franc.
- `currency.CLP` (const string): Chilean Peso.
- `currency.CNY` (const string): Chinese Yuan.
- `currency.COP` (const string): Colombian Peso.
- `currency.CZK` (const string): Czech Koruna.
- `currency.DKK` (const string): Danish Krone.
- `currency.EGP` (const string): Egyptian pound.
- `currency.ETH` (const string): Ethereum.
- `currency.EUR` (const string): Euro.
- `currency.GBP` (const string): Pound sterling.
- `currency.HKD` (const string): Hong Kong dollar.
- `currency.HUF` (const string): Hungarian Forint.
- `currency.IDR` (const string): Indonesian Rupiah.
- `currency.ILS` (const string): Israeli New Shekel.
- `currency.INR` (const string): Indian rupee.
- `currency.ISK` (const string): Icelandic Krona.
- `currency.JPY` (const string): Japanese yen.
- `currency.KES` (const string): Kenyan Shilling.
- `currency.KRW` (const string): South Korean won.
- `currency.KWD` (const string): Kuwaiti Dinar.
- `currency.LKR` (const string): Sri Lankan Rupee.
- `currency.MAD` (const string): Moroccan Dirham.
- `currency.MXN` (const string): Mexican Peso.
- `currency.MYR` (const string): Malaysian ringgit.
- `currency.NGN` (const string): Nigerian Naira.
- `currency.NOK` (const string): Norwegian krone.
- `currency.NONE` (const string): Unspecified currency.
- `currency.NZD` (const string): New Zealand dollar.
- `currency.PEN` (const string): Peruvian sol.
- `currency.PHP` (const string): Philippine Peso.
- `currency.PKR` (const string): Pakistani rupee.
- `currency.PLN` (const string): Polish zloty.
- `currency.QAR` (const string): Qatari Riyal.
- `currency.RON` (const string): Romanian Leu.
- `currency.RSD` (const string): Serbian Dinar.
- `currency.RUB` (const string): Russian ruble.
- `currency.SAR` (const string): Saudi Riyal.
- `currency.SEK` (const string): Swedish krona.
- `currency.SGD` (const string): Singapore dollar.
- `currency.THB` (const string): Thai Baht.
- `currency.TND` (const string): Tunisian Dinar.
- `currency.TRY` (const string): Turkish lira.
- `currency.TWD` (const string): New Taiwan Dollar.
- `currency.USD` (const string): United States dollar.
- `currency.USDT` (const string): Tether.
- `currency.VES` (const string): Venezuelan Bolivar.
- `currency.VND` (const string): Vietnamese Dong.
- `currency.ZAR` (const string): South African rand.

## dayofweek

- `dayofweek.friday` (const int): Is a named constant for return value of `dayofweek()` function and value of `dayofweek` variable.
- `dayofweek.monday` (const int): Is a named constant for return value of `dayofweek()` function and value of `dayofweek` variable.
- `dayofweek.saturday` (const int): Is a named constant for return value of `dayofweek()` function and value of `dayofweek` variable.
- `dayofweek.sunday` (const int): Is a named constant for return value of `dayofweek()` function and value of `dayofweek` variable.
- `dayofweek.thursday` (const int): Is a named constant for return value of `dayofweek()` function and value of `dayofweek` variable.
- `dayofweek.tuesday` (const int): Is a named constant for return value of `dayofweek()` function and value of `dayofweek` variable.
- `dayofweek.wednesday` (const int): Is a named constant for return value of `dayofweek()` function and value of `dayofweek` variable.

## display

- `display.all` (const plot_simple_display): A named constant for use with the `display` parameter of the `plot*()`, `input*()`, `fill()`, `bgcolor()`, `barcolor()`, and `hline()` functions. Specifies that the values or visuals appear in all possible locations by default.
- `display.data_window` (const plot_display): A named constant for use with the `display` parameter of the `plot*()` and `input*()` functions. Specifies that the values are available in the Data Window by default. The Data Window tab is accessible by clicking the "Object Tree and Data Window" icon in the chart's right sidebar.
- `display.none` (const plot_simple_display): A named constant for use with the `display` parameter of the `plot*()`, `input*()`, `fill()`, `bgcolor()`, `barcolor()`, and `hline()` functions. Specifies that the values or visuals are not displayed anywhere by default.
- `display.pane` (const plot_display): A named constant for use with the `display` parameter of the `plot*()` functions. Specifies that the plotted values are displayed in a chart pane by default.
- `display.pine_screener` (const plot_display): A named constant for use with the `display` parameter of the `plot()` function. Specifies that, by default, the [Pine Screener](https://www.tradingview.com/support/solutions/43000742436/) displays a column for the plot's values when the user applies the indicator to the chosen watchlist.
- `display.price_scale` (const plot_display): A named constant for use with the `display` parameter of the `plot*()` functions. Specifies that the price scale displays a label for the plot's data, but only if the chart's settings allow it.
- `display.status_line` (const plot_display): A named constant for use with the `display` parameter of the `plot*()` and `input*()` functions. Specifies that the values are available in the script's status line, but only if the chart's settings allow it.

## dividends

- `dividends.gross` (const string): A named constant for the `request.dividends()` function. Is used to request the dividends return on a stock before deductions.
- `dividends.net` (const string): A named constant for the `request.dividends()` function. Is used to request the dividends return on a stock after deductions.

## earnings

- `earnings.actual` (const string): A named constant for the `request.earnings()` function. Is used to request the earnings value as it was reported.
- `earnings.estimate` (const string): A named constant for the `request.earnings()` function. Is used to request the estimated earnings value.
- `earnings.standardized` (const string): A named constant for the `request.earnings()` function. Is used to request the standardized earnings value.

## extend

- `extend.both` (const string): A named constant for `line.new()` and `line.set_extend()` functions.
- `extend.left` (const string): A named constant for `line.new()` and `line.set_extend()` functions.
- `extend.none` (const string): A named constant for `line.new()` and `line.set_extend()` functions.
- `extend.right` (const string): A named constant for `line.new()` and `line.set_extend()` functions.

## (global)

- `false` (undefined): Literal representing a `bool` value, and result of a comparison operation.
- `true` (undefined): Literal representing one of the values a `bool` variable can hold, or an expression can evaluate to when it uses comparison or logical operators.

## font

- `font.family_default` (const string): Default text font for `box.new()`, `box.set_text_font_family()`, `label.new()`, `label.set_text_font_family()`, `table.cell()` and `table.cell_set_text_font_family()` functions.
- `font.family_monospace` (const string): Monospace text font for `box.new()`, `box.set_text_font_family()`, `label.new()`, `label.set_text_font_family()`, `table.cell()` and `table.cell_set_text_font_family()` functions.

## format

- `format.inherit` (const string): Is a named constant for selecting the formatting of the script output values from the parent series in the `indicator()` function.
- `format.mintick` (const string): Is a named constant to use with the `str.tostring()` function. Passing a number to `str.tostring()` with this argument rounds the number to the nearest value that can be divided by `syminfo.mintick`, without the remainder, with ties rounding up, and returns the string version of said value with trailing zeros.
- `format.percent` (const string): Is a named constant for selecting the formatting of the script output values as a percentage in the indicator function. It adds a percent sign after values.
- `format.price` (const string): Is a named constant for selecting the formatting of the script output values as prices in the `indicator()` function.
- `format.volume` (const string): Is a named constant for selecting the formatting of the script output values as volume in the `indicator()` function, e.g. '5183' will be formatted as '5.183K'. The decimal precision rules defined by this variable take precedence over other precision settings. When an `indicator()`, `strategy()`, or `plot*()` call uses this `format` option, the function's `precision` parameter will not affect the result.

## hline

- `hline.style_dashed` (const hline_style): Is a named constant for dashed linestyle of `hline()` function.
- `hline.style_dotted` (const hline_style): Is a named constant for dotted linestyle of `hline()` function.
- `hline.style_solid` (const hline_style): Is a named constant for solid linestyle of `hline()` function.

## label

- `label.style_arrowdown` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_arrowup` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_circle` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_cross` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_diamond` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_flag` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_label_center` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_label_down` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_label_left` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_label_lower_left` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_label_lower_right` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_label_right` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_label_up` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_label_upper_left` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_label_upper_right` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_none` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_square` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_text_outline` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_triangledown` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_triangleup` (const string): Label style for `label.new()` and `label.set_style()` functions.
- `label.style_xcross` (const string): Label style for `label.new()` and `label.set_style()` functions.

## line

- `line.style_arrow_both` (const string): Line style for `line.new()` and `line.set_style()` functions. Solid line with arrows on both points.
- `line.style_arrow_left` (const string): Line style for `line.new()` and `line.set_style()` functions. Solid line with arrow on the first point.
- `line.style_arrow_right` (const string): Line style for `line.new()` and `line.set_style()` functions. Solid line with arrow on the second point.
- `line.style_dashed` (const string): Line style for `line.new()` and `line.set_style()` functions.
- `line.style_dotted` (const string): Line style for `line.new()` and `line.set_style()` functions.
- `line.style_solid` (const string): Line style for `line.new()` and `line.set_style()` functions.

## location

- `location.abovebar` (const string): Location value for `plotshape()`, `plotchar()` functions. Shape is plotted above main series bars.
- `location.absolute` (const string): Location value for `plotshape()`, `plotchar()` functions. Shape is plotted on chart using indicator value as a price coordinate.
- `location.belowbar` (const string): Location value for `plotshape()`, `plotchar()` functions. Shape is plotted below main series bars.
- `location.bottom` (const string): Location value for `plotshape()`, `plotchar()` functions. Shape is plotted near the bottom chart border.
- `location.top` (const string): Location value for `plotshape()`, `plotchar()` functions. Shape is plotted near the top chart border.

## math

- `math.e` (const float): Is a named constant for [Euler's number](https://en.wikipedia.org/wiki/E_(mathematical_constant)). It is equal to 2.7182818284590452.
- `math.phi` (const float): Is a named constant for the [golden ratio](https://en.wikipedia.org/wiki/Golden_ratio). It is equal to 1.6180339887498948.
- `math.pi` (const float): Is a named constant for [Archimedes' constant](https://en.wikipedia.org/wiki/Pi). It is equal to 3.1415926535897932.
- `math.rphi` (const float): Is a named constant for the [golden ratio conjugate](https://en.wikipedia.org/wiki/Golden_ratio#Golden_ratio_conjugate). It is equal to 0.6180339887498948.

## order

- `order.ascending` (const sort_order): Determines the sort order of the array from the smallest to the largest value.
- `order.descending` (const sort_order): Determines the sort order of the array from the largest to the smallest value.

## plot

- `plot.linestyle_dashed` (const plot_line_style): A named constant for use with the `plot()` function's `linestyle` parameter, which modifies the appearance of plotted lines. If the `style` argument of the function call specifies a plot style that displays a line, using this constant as the `linestyle` argument specifies that the plotted line is dashed.
- `plot.linestyle_dotted` (const plot_line_style): A named constant for use with the `plot()` function's `linestyle` parameter, which modifies the appearance of plotted lines. If the `style` argument of the function call specifies a plot style that displays a line, using this constant as the `linestyle` argument specifies that the plotted line is dotted.
- `plot.linestyle_solid` (const plot_line_style): A named constant for use with the `plot()` function's `linestyle` parameter, which modifies the appearance of plotted lines. If the `style` argument of the function call specifies a plot style that displays a line, using this constant as the `linestyle` argument specifies that the plotted line is solid.
- `plot.style_area` (const plot_style): A named constant for the 'Area' style, to be used as an argument for the `style` parameter in the `plot()` function.
- `plot.style_areabr` (const plot_style): A named constant for the 'Area With Breaks' style, to be used as an argument for the `style` parameter in the `plot()` function. Similar to `plot.style_area`, except the gaps in the data are not filled.
- `plot.style_circles` (const plot_style): A named constant for the 'Circles' style, to be used as an argument for the `style` parameter in the `plot()` function.
- `plot.style_columns` (const plot_style): A named constant for the 'Columns' style, to be used as an argument for the `style` parameter in the `plot()` function.
- `plot.style_cross` (const plot_style): A named constant for the 'Cross' style, to be used as an argument for the `style` parameter in the `plot()` function.
- `plot.style_histogram` (const plot_style): A named constant for the 'Histogram' style, to be used as an argument for the `style` parameter in the `plot()` function.
- `plot.style_line` (const plot_style): A named constant for the 'Line' style, to be used as an argument for the `style` parameter in the `plot()` function.
- `plot.style_linebr` (const plot_style): A named constant for the 'Line With Breaks' style, to be used as an argument for the `style` parameter in the `plot()` function. Similar to `plot.style_line`, except the gaps in the data are not filled.
- `plot.style_stepline` (const plot_style): A named constant for the 'Step Line' style, to be used as an argument for the `style` parameter in the `plot()` function.
- `plot.style_stepline_diamond` (const plot_style): A named constant for the 'Step Line With Diamonds' style, to be used as an argument for the `style` parameter in the `plot()` function. Similar to `plot.style_stepline`, except the data changes are also marked with the Diamond shapes.
- `plot.style_steplinebr` (const plot_style): A named constant for the 'Step line with Breaks' style, to be used as an argument for the `style` parameter in the `plot()` function.

## position

- `position.bottom_center` (const string): Table position is used in `table.new()`, `table.cell()` functions. Binds the table to the bottom edge in the center.
- `position.bottom_left` (const string): Table position is used in `table.new()`, `table.cell()` functions. Binds the table to the bottom left of the screen.
- `position.bottom_right` (const string): Table position is used in `table.new()`, `table.cell()` functions. Binds the table to the bottom right of the screen.
- `position.middle_center` (const string): Table position is used in `table.new()`, `table.cell()` functions. Binds the table to the center of the screen.
- `position.middle_left` (const string): Table position is used in `table.new()`, `table.cell()` functions. Binds the table to the left side of the screen.
- `position.middle_right` (const string): Table position is used in `table.new()`, `table.cell()` functions. Binds the table to the right side of the screen.
- `position.top_center` (const string): Table position is used in `table.new()`, `table.cell()` functions. Binds the table to the top edge in the center.
- `position.top_left` (const string): Table position is used in `table.new()`, `table.cell()` functions. Binds the table to the upper-left edge.
- `position.top_right` (const string): Table position is used in `table.new()`, `table.cell()` functions. Binds the table to the upper-right edge.

## scale

- `scale.left` (const scale_type): A named constant for use as the `scale` argument in `indicator()` and `strategy()` declaration statements. Specifies that the script's price scale is on the left side of the pane. If the script overlays on the main chart pane or another script's pane, it adds a new price scale on the left side of the pane and scales its visuals independently to fit the pane's visual space.
- `scale.none` (const scale_type): A named constant for use as the `scale` argument in `indicator()` and `strategy()` declaration statements. A declaration statement can use this constant only if its `overlay` argument is `true`. Specifies that the script scales its visuals independently to fit the visual space of the main chart pane or another script's pane without displaying a separate scale. The script displays plotted numbers directly on the pane's existing price scale if the chart's settings allow it. If the user moves the script to a new pane, the script displays the values on a new scale to the left or right of that pane, depending on the chart's "Scales placement" setting.
- `scale.right` (const scale_type): A named constant for use as the `scale` argument in `indicator()` and `strategy()` declaration statements. Specifies that the script's price scale is on the right side of the pane. If the script overlays on the main chart pane or another script's pane, it adds a new price scale on the right side of the pane and scales its visuals independently to fit the pane's visual space.

## session

- `session.extended` (const string): Constant for extended session type (with extended hours data).
- `session.regular` (const string): Constant for regular session type (no extended hours data).

## settlement_as_close

- `settlement_as_close.inherit` (const settlement): A constant to specify the value of the `settlement_as_close` parameter in `ticker.new()` and `ticker.modify()` functions.
- `settlement_as_close.off` (const settlement): A constant to specify the value of the `settlement_as_close` parameter in `ticker.new()` and `ticker.modify()` functions.
- `settlement_as_close.on` (const settlement): A constant to specify the value of the `settlement_as_close` parameter in `ticker.new()` and `ticker.modify()` functions.

## shape

- `shape.arrowdown` (const string): Shape style for `plotshape()` function.
- `shape.arrowup` (const string): Shape style for `plotshape()` function.
- `shape.circle` (const string): Shape style for `plotshape()` function.
- `shape.cross` (const string): Shape style for `plotshape()` function.
- `shape.diamond` (const string): Shape style for `plotshape()` function.
- `shape.flag` (const string): Shape style for `plotshape()` function.
- `shape.labeldown` (const string): Shape style for `plotshape()` function.
- `shape.labelup` (const string): Shape style for `plotshape()` function.
- `shape.square` (const string): Shape style for `plotshape()` function.
- `shape.triangledown` (const string): Shape style for `plotshape()` function.
- `shape.triangleup` (const string): Shape style for `plotshape()` function.
- `shape.xcross` (const string): Shape style for `plotshape()` function.

## size

- `size.auto` (const string): A constant to specify the size of the graphics drawn by `plotchar()`, `plotshape()`, `label.new()`, and `box.new()`. Adjusts the size of the graphics automatically.
- `size.huge` (const string): A constant to specify the size of the graphics drawn by `plotchar()`, `plotshape()`, `label.new()`, `box.new()`, and `table.cell()`. Sets the size to huge.
- `size.large` (const string): A constant to specify the size of the graphics drawn by `plotchar()`, `plotshape()`, `label.new()`, `box.new()`, and `table.cell()`. Sets the size to large.
- `size.normal` (const string): A constant to specify the size of the graphics drawn by `plotchar()`, `plotshape()`, `label.new()`, `box.new()`, and `table.cell()`. Sets the size to normal.
- `size.small` (const string): A constant to specify the size of the graphics drawn by `plotchar()`, `plotshape()`, `label.new()`, `box.new()`, and `table.cell()`. Sets the size to small.
- `size.tiny` (const string): A constant to specify the size of the graphics drawn by `plotchar()`, `plotshape()`, `label.new()`, `box.new()`, and `table.cell()`. Sets the size to tiny.

## splits

- `splits.denominator` (const string): A named constant for the `request.splits()` function. Is used to request the denominator (the number below the line in a fraction) of a splits.
- `splits.numerator` (const string): A named constant for the `request.splits()` function. Is used to request the numerator (the number above the line in a fraction) of a splits.

## strategy

- `strategy.cash` (const string): This is one of the arguments that can be supplied to the `default_qty_type` parameter in the `strategy()` declaration statement. It is only relevant when no value is used for the ‘qty’ parameter in `strategy.entry()` or `strategy.order()` function calls. It specifies that an amount of cash in the `strategy.account_currency` will be used to enter trades.
- `strategy.commission.cash_per_contract` (const string): Commission type for an order. Money displayed in the account currency per contract.
- `strategy.commission.cash_per_order` (const string): Commission type for an order. Money displayed in the account currency per order.
- `strategy.commission.percent` (const string): Commission type for an order. A percentage of the cash volume of order.
- `strategy.direction.all` (const string): It allows strategy to open both long and short positions.
- `strategy.direction.long` (const string): It allows strategy to open only long positions.
- `strategy.direction.short` (const string): It allows strategy to open only short positions.
- `strategy.fixed` (const string): This is one of the arguments that can be supplied to the `default_qty_type` parameter in the `strategy()` declaration statement. It is only relevant when no value is used for the ‘qty’ parameter in `strategy.entry()` or `strategy.order()` function calls. It specifies that a number of contracts/shares/lots will be used to enter trades.
- `strategy.long` (const strategy_direction): A named constant for use with the `direction` parameter of the `strategy.entry()` and `strategy.order()` commands. It specifies that the command creates a buy order.
- `strategy.oca.cancel` (const string): A named constant for use with the `oca_type` parameter of the `strategy.entry()` and `strategy.order()` commands. It specifies that the strategy cancels the unfilled order when another order with the same `oca_name` and `oca_type` executes.
- `strategy.oca.none` (const string): A named constant for use with the `oca_type` parameter of the `strategy.entry()` and `strategy.order()` commands. It specifies that the order executes independently of all other orders, including those with the same `oca_name`.
- `strategy.oca.reduce` (const string): A named constant for use with the `oca_type` parameter of the `strategy.entry()` and `strategy.order()` commands. It specifies that when another order with the same `oca_name` and `oca_type` executes, the strategy reduces the unfilled order by that order's size. If the unfilled order's size reaches 0 after reduction, it is the same as canceling the order entirely.
- `strategy.percent_of_equity` (const string): This is one of the arguments that can be supplied to the `default_qty_type` parameter in the `strategy()` declaration statement. It is only relevant when no value is used for the ‘qty’ parameter in `strategy.entry()` or `strategy.order()` function calls. It specifies that a percentage (0-100) of equity will be used to enter trades.
- `strategy.short` (const strategy_direction): A named constant for use with the `direction` parameter of the `strategy.entry()` and `strategy.order()` commands. It specifies that the command creates a sell order.

## text

- `text.align_bottom` (const string): Vertical text alignment for `box.new()`, `box.set_text_valign()`, `table.cell()` and `table.cell_set_text_valign()` functions.
- `text.align_center` (const string): Text alignment for `box.new()`, `box.set_text_halign()`, `box.set_text_valign()`, `label.new()` and `label.set_textalign()` functions.
- `text.align_left` (const string): Horizontal text alignment for `box.new()`, `box.set_text_halign()`, `label.new()` and `label.set_textalign()` functions.
- `text.align_right` (const string): Horizontal text alignment for `box.new()`, `box.set_text_halign()`, `label.new()` and `label.set_textalign()` functions.
- `text.align_top` (const string): Vertical text alignment for `box.new()`, `box.set_text_valign()`, `table.cell()` and `table.cell_set_text_valign()` functions.
- `text.format_bold` (const text_format): A named constant for use with the `text_formatting` parameter of the `label.new()`, `box.new()`, `table.cell()`, and `*set_text_formatting()` functions. Makes the text bold.
- `text.format_italic` (const text_format): A named constant for use with the `text_formatting` parameter of the `label.new()`, `box.new()`, `table.cell()`, and `*set_text_formatting()` functions. Italicizes the text.
- `text.format_none` (const text_format): A named constant for use with the `text_formatting` parameter of the `label.new()`, `box.new()`, `table.cell()`, and `*set_text_formatting()` functions. Signifies no special text formatting.
- `text.wrap_auto` (const string): Automatic wrapping mode for `box.new()` and `box.set_text_wrap()` functions.
- `text.wrap_none` (const string): Disabled wrapping mode for `box.new()` and `box.set_text_wrap()` functions.

## xloc

- `xloc.bar_index` (const string): A constant that specifies how functions that create and modify Pine drawings interpret x-coordinates. If `xloc = xloc.bar_index`, the drawing object treats each x-coordinate as a `bar_index` value.
- `xloc.bar_time` (const string): A constant that specifies how functions that create and modify Pine drawings interpret x-coordinates. If `xloc = xloc.bar_time`, the drawing object treats each x-coordinate as a UNIX timestamp, expressed in milliseconds.

## yloc

- `yloc.abovebar` (const string): A named constant that specifies the algorithm of interpretation of y-value in function `label.new()`.
- `yloc.belowbar` (const string): A named constant that specifies the algorithm of interpretation of y-value in function `label.new()`.
- `yloc.price` (const string): A named constant that specifies the algorithm of interpretation of y-value in function `label.new()`.
