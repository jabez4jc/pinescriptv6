# `syminfo.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### syminfo.basecurrency

Returns a string containing the code representing the symbol's base currency (i.e., the traded currency or coin) if the instrument is a Forex or Crypto pair or a derivative based on such a pair. Otherwise, it returns an empty string. For example, this variable returns "EUR" for "EURJPY", "BTC" for "BTCUSDT", "CAD" for "CME:6C1!", and "" for "NASDAQ:AAPL".

Type: `simple string`

**See also:** `syminfo.currency`, `syminfo.ticker`

### syminfo.country

Returns the two-letter code of the country where the symbol is traded, in the [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format, or `na` if the exchange is not directly tied to a specific country. For example, on "NASDAQ:AAPL" it will return "US", on "LSE:AAPL" it will return "GB", and on "BITSTAMP:BTCUSD it will return `na`.

Type: `simple string`

### syminfo.currency

Returns a string containing the code representing the currency of the symbol's prices. For example, this variable returns "USD" for "NASDAQ:AAPL" and "JPY" for "EURJPY".

Type: `simple string`

**See also:** `syminfo.basecurrency`, `syminfo.ticker`, `currency.USD`, `currency.EUR`

### syminfo.current_contract

The ticker identifier of the underlying contract, if the current symbol is a continuous futures contract; `na` otherwise.

Type: `simple string`

**See also:** `syminfo.ticker`, `syminfo.description`

### syminfo.description

Description for the current symbol.

Type: `simple string`

**See also:** `syminfo.ticker`, `syminfo.prefix`

### syminfo.employees

The number of employees the company has.

Type: `simple int`

```pine
//@version=6
indicator("syminfo simple")
//@variable A table containing information about a company's employees, shareholders, and shares.
var result_table = table.new(position = position.top_right, columns = 2, rows = 5, border_width = 1)
if barstate.islastconfirmedhistory
	// Add header cells
	table.cell(table_id = result_table, column = 0, row = 0, text = "name")
	table.cell(table_id = result_table, column = 1, row = 0, text = "value")
	// Add employee info cells.
	table.cell(table_id = result_table, column = 0, row = 1, text = "employees")
	table.cell(table_id = result_table, column = 1, row = 1, text = str.tostring(syminfo.employees))
	// Add shareholder cells.
	table.cell(table_id = result_table, column = 0, row = 2, text = "shareholders")
	table.cell(table_id = result_table, column = 1, row = 2, text = str.tostring(syminfo.shareholders))
	// Add float shares outstanding cells.
	table.cell(table_id = result_table, column = 0, row = 3, text = "shares_outstanding_float")
	table.cell(table_id = result_table, column = 1, row = 3, text = str.tostring(syminfo.shares_outstanding_float))
	// Add total shares outstanding cells.
	table.cell(table_id = result_table, column = 0, row = 4, text = "shares_outstanding_total")
	table.cell(table_id = result_table, column = 1, row = 4, text = str.tostring(syminfo.shares_outstanding_total))
```

**See also:** `syminfo.shareholders`, `syminfo.shares_outstanding_float`, `syminfo.shares_outstanding_total`

### syminfo.expiration_date

A UNIX timestamp representing the start of the last day of the current futures contract. This variable is only compatible with non-continuous futures symbols. On other symbols, it returns `na`.

Type: `simple int`

### syminfo.industry

Returns the industry of the symbol, or `na` if the symbol has no industry. Example: "Internet Software/Services", "Packaged software", "Integrated Oil", "Motor Vehicles", etc. These are the same values one can see in the chart's "Symbol info" window.

Type: `simple string`

**Remarks**

A sector is a broad section of the economy. An industry is a narrower classification. NASDAQ:CAT (Caterpillar, Inc.) for example, belongs to the "Producer Manufacturing" sector and the "Trucks/Construction/Farm Machinery" industry.

### syminfo.isin

Holds a string representing a symbol's associated International Securities Identification Number (ISIN), or an empty string if there is no ISIN information available for the symbol. An ISIN is a 12-character alphanumeric code that uniquely identifies a security globally. Unlike ticker symbols, which can vary across exchanges, the ISIN for a security is consistent across exchanges. As such, programmers can use the ISIN to identify an underlying financial instrument, regardless of the exchange or the symbol name listed by an exchange.

For example, the ISIN associated with NASDAQ:AAPL and GETTEX:APC is US0378331005, because both symbols refer to the common stock from Apple Inc. In contrast, the ISIN for TSX:AAPL is CA03785Y1007, because the symbol refers to a different instrument: the Apple Inc. Canadian Depositary Receipt (CDR).

Type: `simple string`

**See also:** `syminfo.ticker`, `syminfo.description`

### syminfo.main_tickerid

A ticker identifier representing the current chart's symbol. The value contains an exchange prefix and a symbol name, separated by a colon (e.g., "NASDAQ:AAPL"). It can also include information about data modifications such as dividend adjustment, non-standard chart type, currency conversion, etc. Unlike `syminfo.tickerid`, this variable's value does not change when used in the `expression` argument of a `request.*()` function call.

Type: `simple string`

**See also:** `ticker.new()`, `timeframe.main_period`, `syminfo.tickerid`, `syminfo.ticker`, `timeframe.period`, `timeframe.multiplier`, `syminfo.root`

### syminfo.mincontract

The smallest amount of the current symbol that can be traded. This limit is set by the exchange. For cryptocurrencies, it is often less than 1 token. For most other types of asset, it is often 1.

Type: `simple float`

**See also:** `syminfo.mintick`, `syminfo.pointvalue`

### syminfo.minmove

Returns a whole number used to calculate the smallest increment between a symbol's price movements (`syminfo.mintick`). It is the numerator in the `syminfo.mintick` formula: `syminfo.minmove / syminfo.pricescale = syminfo.mintick`.

Type: `simple int`

**See also:** `ticker.new()`, `syminfo.ticker`, `timeframe.period`, `timeframe.multiplier`, `syminfo.root`

### syminfo.mintick

Min tick value for the current symbol.

Type: `simple float`

**See also:** `syminfo.pointvalue`, `syminfo.mincontract`

### syminfo.pointvalue

The chart price of a security multiplied by the point value equals the actual price of the traded security.

For all types of security except futures, the point value is usually equal to 1 and can therefore be ignored. For futures, the prices shown on the chart are either the cost of a single futures contract, in which case the point value is 1, or the price of a single unit of the underlying commodity, in which case the point value represents the number of units included in a single contract.

For example, the price of the "COMEX:GC1!" gold futures chart reflects the price of a single troy ounce of gold. However, a single GC futures contract comprises 100 troy ounces, as defined by the COMEX exchange. So when the price on the "GC1!" chart is 2000 USD, a single contract costs 2000 USD * 100 troy ounces = 200,000 USD. This calculation is important in backtesting, because the strategy engine takes the point value into account, and does not open a position if there is not enough capital.

The point value is also displayed in the Security Info window for a given asset.

Type: `simple float`

**See also:** `syminfo.mintick`, `syminfo.mincontract`

### syminfo.prefix

Prefix of current symbol name (i.e. for 'CME_EOD:TICKER' prefix is 'CME_EOD').

Type: `simple string`

```pine
//@version=6
indicator("syminfo.prefix")

// If current chart symbol is 'BATS:MSFT' then syminfo.prefix is 'BATS'.
if barstate.islastconfirmedhistory
	label.new(bar_index, high, text=syminfo.prefix)
```

**See also:** `syminfo.ticker`, `syminfo.tickerid`

### syminfo.pricescale

Returns a whole number used to calculate the smallest increment between a symbol's price movements (`syminfo.mintick`). It is the denominator in the `syminfo.mintick` formula: `syminfo.minmove / syminfo.pricescale = syminfo.mintick`.

Type: `simple int`

**See also:** `ticker.new()`, `syminfo.ticker`, `timeframe.period`, `timeframe.multiplier`, `syminfo.root`

### syminfo.recommendations_buy

The number of analysts who gave the current symbol a "Buy" rating.

Type: `series int`

```pine
//@version=6
indicator("syminfo recommendations", overlay = true)
//@variable A table containing information about analyst recommendations.
var table ratings = table.new(position.top_right, 8, 2, frame_color = #000000)
if barstate.islastconfirmedhistory
	//@variable The time value one year from the date of the last analyst recommendations.
	int YTD = syminfo.target_price_date + timeframe.in_seconds("12M") * 1000
	// Add header cells.
	table.cell(ratings, 0, 0, "Start Date", bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 1, 0, "End Date", bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 2, 0, "Buy", bgcolor = color.teal, text_color = #000000, text_size = size.large)
	table.cell(ratings, 3, 0, "Strong Buy", bgcolor = color.lime, text_color = #000000, text_size = size.large)
	table.cell(ratings, 4, 0, "Sell", bgcolor = color.maroon, text_color = #000000, text_size = size.large)
	table.cell(ratings, 5, 0, "Strong Sell", bgcolor = color.red, text_color = #000000, text_size = size.large)
	table.cell(ratings, 6, 0, "Hold", bgcolor = color.orange, text_color = #000000, text_size = size.large)
	table.cell(ratings, 7, 0, "Total", bgcolor = color.silver, text_color = #000000, text_size = size.large)
	// Recommendation strings
	string startDate         = str.format_time(syminfo.recommendations_date, "yyyy-MM-dd")
	string endDate           = str.format_time(YTD, "yyyy-MM-dd")
	string buyRatings        = str.tostring(syminfo.recommendations_buy)
	string strongBuyRatings  = str.tostring(syminfo.recommendations_buy_strong)
	string sellRatings       = str.tostring(syminfo.recommendations_sell)
	string strongSellRatings = str.tostring(syminfo.recommendations_sell_strong)
	string holdRatings       = str.tostring(syminfo.recommendations_hold)
	string totalRatings      = str.tostring(syminfo.recommendations_total)
	// Add value cells
	table.cell(ratings, 0, 1, startDate, bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 1, 1, endDate, bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 2, 1, buyRatings, bgcolor = color.teal, text_color = #000000, text_size = size.large)
	table.cell(ratings, 3, 1, strongBuyRatings, bgcolor = color.lime, text_color = #000000, text_size = size.large)
	table.cell(ratings, 4, 1, sellRatings, bgcolor = color.maroon, text_color = #000000, text_size = size.large)
```

**See also:** `syminfo.recommendations_buy_strong`, `syminfo.recommendations_date`, `syminfo.recommendations_hold`, `syminfo.recommendations_total`, `syminfo.recommendations_sell`, `syminfo.recommendations_sell_strong`

### syminfo.recommendations_buy_strong

The number of analysts who gave the current symbol a "Strong Buy" rating.

Type: `series int`

```pine
//@version=6
indicator("syminfo recommendations", overlay = true)
//@variable A table containing information about analyst recommendations.
var table ratings = table.new(position.top_right, 8, 2, frame_color = #000000)
if barstate.islastconfirmedhistory
	//@variable The time value one year from the date of the last analyst recommendations.
	int YTD = syminfo.target_price_date + timeframe.in_seconds("12M") * 1000
	// Add header cells.
	table.cell(ratings, 0, 0, "Start Date", bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 1, 0, "End Date", bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 2, 0, "Buy", bgcolor = color.teal, text_color = #000000, text_size = size.large)
	table.cell(ratings, 3, 0, "Strong Buy", bgcolor = color.lime, text_color = #000000, text_size = size.large)
	table.cell(ratings, 4, 0, "Sell", bgcolor = color.maroon, text_color = #000000, text_size = size.large)
	table.cell(ratings, 5, 0, "Strong Sell", bgcolor = color.red, text_color = #000000, text_size = size.large)
	table.cell(ratings, 6, 0, "Hold", bgcolor = color.orange, text_color = #000000, text_size = size.large)
	table.cell(ratings, 7, 0, "Total", bgcolor = color.silver, text_color = #000000, text_size = size.large)
	// Recommendation strings
	string startDate         = str.format_time(syminfo.recommendations_date, "yyyy-MM-dd")
	string endDate           = str.format_time(YTD, "yyyy-MM-dd")
	string buyRatings        = str.tostring(syminfo.recommendations_buy)
	string strongBuyRatings  = str.tostring(syminfo.recommendations_buy_strong)
	string sellRatings       = str.tostring(syminfo.recommendations_sell)
	string strongSellRatings = str.tostring(syminfo.recommendations_sell_strong)
	string holdRatings       = str.tostring(syminfo.recommendations_hold)
	string totalRatings      = str.tostring(syminfo.recommendations_total)
	// Add value cells
	table.cell(ratings, 0, 1, startDate, bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 1, 1, endDate, bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 2, 1, buyRatings, bgcolor = color.teal, text_color = #000000, text_size = size.large)
	table.cell(ratings, 3, 1, strongBuyRatings, bgcolor = color.lime, text_color = #000000, text_size = size.large)
	table.cell(ratings, 4, 1, sellRatings, bgcolor = color.maroon, text_color = #000000, text_size = size.large)
```

**See also:** `syminfo.recommendations_buy`, `syminfo.recommendations_date`, `syminfo.recommendations_hold`, `syminfo.recommendations_total`, `syminfo.recommendations_sell`, `syminfo.recommendations_sell_strong`

### syminfo.recommendations_date

The starting date of the last set of recommendations for the current symbol.

Type: `series int`

```pine
//@version=6
indicator("syminfo recommendations", overlay = true)
//@variable A table containing information about analyst recommendations.
var table ratings = table.new(position.top_right, 8, 2, frame_color = #000000)
if barstate.islastconfirmedhistory
	//@variable The time value one year from the date of the last analyst recommendations.
	int YTD = syminfo.target_price_date + timeframe.in_seconds("12M") * 1000
	// Add header cells.
	table.cell(ratings, 0, 0, "Start Date", bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 1, 0, "End Date", bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 2, 0, "Buy", bgcolor = color.teal, text_color = #000000, text_size = size.large)
	table.cell(ratings, 3, 0, "Strong Buy", bgcolor = color.lime, text_color = #000000, text_size = size.large)
	table.cell(ratings, 4, 0, "Sell", bgcolor = color.maroon, text_color = #000000, text_size = size.large)
	table.cell(ratings, 5, 0, "Strong Sell", bgcolor = color.red, text_color = #000000, text_size = size.large)
	table.cell(ratings, 6, 0, "Hold", bgcolor = color.orange, text_color = #000000, text_size = size.large)
	table.cell(ratings, 7, 0, "Total", bgcolor = color.silver, text_color = #000000, text_size = size.large)
	// Recommendation strings
	string startDate         = str.format_time(syminfo.recommendations_date, "yyyy-MM-dd")
	string endDate           = str.format_time(YTD, "yyyy-MM-dd")
	string buyRatings        = str.tostring(syminfo.recommendations_buy)
	string strongBuyRatings  = str.tostring(syminfo.recommendations_buy_strong)
	string sellRatings       = str.tostring(syminfo.recommendations_sell)
	string strongSellRatings = str.tostring(syminfo.recommendations_sell_strong)
	string holdRatings       = str.tostring(syminfo.recommendations_hold)
	string totalRatings      = str.tostring(syminfo.recommendations_total)
	// Add value cells
	table.cell(ratings, 0, 1, startDate, bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 1, 1, endDate, bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 2, 1, buyRatings, bgcolor = color.teal, text_color = #000000, text_size = size.large)
	table.cell(ratings, 3, 1, strongBuyRatings, bgcolor = color.lime, text_color = #000000, text_size = size.large)
	table.cell(ratings, 4, 1, sellRatings, bgcolor = color.maroon, text_color = #000000, text_size = size.large)
```

**See also:** `syminfo.recommendations_buy`, `syminfo.recommendations_buy_strong`, `syminfo.recommendations_hold`, `syminfo.recommendations_total`, `syminfo.recommendations_sell`, `syminfo.recommendations_sell_strong`

### syminfo.recommendations_hold

The number of analysts who gave the current symbol a "Hold" rating.

Type: `series int`

```pine
//@version=6
indicator("syminfo recommendations", overlay = true)
//@variable A table containing information about analyst recommendations.
var table ratings = table.new(position.top_right, 8, 2, frame_color = #000000)
if barstate.islastconfirmedhistory
	//@variable The time value one year from the date of the last analyst recommendations.
	int YTD = syminfo.target_price_date + timeframe.in_seconds("12M") * 1000
	// Add header cells.
	table.cell(ratings, 0, 0, "Start Date", bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 1, 0, "End Date", bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 2, 0, "Buy", bgcolor = color.teal, text_color = #000000, text_size = size.large)
	table.cell(ratings, 3, 0, "Strong Buy", bgcolor = color.lime, text_color = #000000, text_size = size.large)
	table.cell(ratings, 4, 0, "Sell", bgcolor = color.maroon, text_color = #000000, text_size = size.large)
	table.cell(ratings, 5, 0, "Strong Sell", bgcolor = color.red, text_color = #000000, text_size = size.large)
	table.cell(ratings, 6, 0, "Hold", bgcolor = color.orange, text_color = #000000, text_size = size.large)
	table.cell(ratings, 7, 0, "Total", bgcolor = color.silver, text_color = #000000, text_size = size.large)
	// Recommendation strings
	string startDate         = str.format_time(syminfo.recommendations_date, "yyyy-MM-dd")
	string endDate           = str.format_time(YTD, "yyyy-MM-dd")
	string buyRatings        = str.tostring(syminfo.recommendations_buy)
	string strongBuyRatings  = str.tostring(syminfo.recommendations_buy_strong)
	string sellRatings       = str.tostring(syminfo.recommendations_sell)
	string strongSellRatings = str.tostring(syminfo.recommendations_sell_strong)
	string holdRatings       = str.tostring(syminfo.recommendations_hold)
	string totalRatings      = str.tostring(syminfo.recommendations_total)
	// Add value cells
	table.cell(ratings, 0, 1, startDate, bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 1, 1, endDate, bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 2, 1, buyRatings, bgcolor = color.teal, text_color = #000000, text_size = size.large)
	table.cell(ratings, 3, 1, strongBuyRatings, bgcolor = color.lime, text_color = #000000, text_size = size.large)
	table.cell(ratings, 4, 1, sellRatings, bgcolor = color.maroon, text_color = #000000, text_size = size.large)
```

**See also:** `syminfo.recommendations_buy`, `syminfo.recommendations_buy_strong`, `syminfo.recommendations_date`, `syminfo.recommendations_total`, `syminfo.recommendations_sell`, `syminfo.recommendations_sell_strong`

### syminfo.recommendations_sell

The number of analysts who gave the current symbol a "Sell" rating.

Type: `series int`

```pine
//@version=6
indicator("syminfo recommendations", overlay = true)
//@variable A table containing information about analyst recommendations.
var table ratings = table.new(position.top_right, 8, 2, frame_color = #000000)
if barstate.islastconfirmedhistory
	//@variable The time value one year from the date of the last analyst recommendations.
	int YTD = syminfo.target_price_date + timeframe.in_seconds("12M") * 1000
	// Add header cells.
	table.cell(ratings, 0, 0, "Start Date", bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 1, 0, "End Date", bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 2, 0, "Buy", bgcolor = color.teal, text_color = #000000, text_size = size.large)
	table.cell(ratings, 3, 0, "Strong Buy", bgcolor = color.lime, text_color = #000000, text_size = size.large)
	table.cell(ratings, 4, 0, "Sell", bgcolor = color.maroon, text_color = #000000, text_size = size.large)
	table.cell(ratings, 5, 0, "Strong Sell", bgcolor = color.red, text_color = #000000, text_size = size.large)
	table.cell(ratings, 6, 0, "Hold", bgcolor = color.orange, text_color = #000000, text_size = size.large)
	table.cell(ratings, 7, 0, "Total", bgcolor = color.silver, text_color = #000000, text_size = size.large)
	// Recommendation strings
	string startDate         = str.format_time(syminfo.recommendations_date, "yyyy-MM-dd")
	string endDate           = str.format_time(YTD, "yyyy-MM-dd")
	string buyRatings        = str.tostring(syminfo.recommendations_buy)
	string strongBuyRatings  = str.tostring(syminfo.recommendations_buy_strong)
	string sellRatings       = str.tostring(syminfo.recommendations_sell)
	string strongSellRatings = str.tostring(syminfo.recommendations_sell_strong)
	string holdRatings       = str.tostring(syminfo.recommendations_hold)
	string totalRatings      = str.tostring(syminfo.recommendations_total)
	// Add value cells
	table.cell(ratings, 0, 1, startDate, bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 1, 1, endDate, bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 2, 1, buyRatings, bgcolor = color.teal, text_color = #000000, text_size = size.large)
	table.cell(ratings, 3, 1, strongBuyRatings, bgcolor = color.lime, text_color = #000000, text_size = size.large)
	table.cell(ratings, 4, 1, sellRatings, bgcolor = color.maroon, text_color = #000000, text_size = size.large)
```

**See also:** `syminfo.recommendations_buy`, `syminfo.recommendations_buy_strong`, `syminfo.recommendations_date`, `syminfo.recommendations_hold`, `syminfo.recommendations_total`, `syminfo.recommendations_sell_strong`

### syminfo.recommendations_sell_strong

The number of analysts who gave the current symbol a "Strong Sell" rating.

Type: `series int`

```pine
//@version=6
indicator("syminfo recommendations", overlay = true)
//@variable A table containing information about analyst recommendations.
var table ratings = table.new(position.top_right, 8, 2, frame_color = #000000)
if barstate.islastconfirmedhistory
	//@variable The time value one year from the date of the last analyst recommendations.
	int YTD = syminfo.target_price_date + timeframe.in_seconds("12M") * 1000
	// Add header cells.
	table.cell(ratings, 0, 0, "Start Date", bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 1, 0, "End Date", bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 2, 0, "Buy", bgcolor = color.teal, text_color = #000000, text_size = size.large)
	table.cell(ratings, 3, 0, "Strong Buy", bgcolor = color.lime, text_color = #000000, text_size = size.large)
	table.cell(ratings, 4, 0, "Sell", bgcolor = color.maroon, text_color = #000000, text_size = size.large)
	table.cell(ratings, 5, 0, "Strong Sell", bgcolor = color.red, text_color = #000000, text_size = size.large)
	table.cell(ratings, 6, 0, "Hold", bgcolor = color.orange, text_color = #000000, text_size = size.large)
	table.cell(ratings, 7, 0, "Total", bgcolor = color.silver, text_color = #000000, text_size = size.large)
	// Recommendation strings
	string startDate         = str.format_time(syminfo.recommendations_date, "yyyy-MM-dd")
	string endDate           = str.format_time(YTD, "yyyy-MM-dd")
	string buyRatings        = str.tostring(syminfo.recommendations_buy)
	string strongBuyRatings  = str.tostring(syminfo.recommendations_buy_strong)
	string sellRatings       = str.tostring(syminfo.recommendations_sell)
	string strongSellRatings = str.tostring(syminfo.recommendations_sell_strong)
	string holdRatings       = str.tostring(syminfo.recommendations_hold)
	string totalRatings      = str.tostring(syminfo.recommendations_total)
	// Add value cells
	table.cell(ratings, 0, 1, startDate, bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 1, 1, endDate, bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 2, 1, buyRatings, bgcolor = color.teal, text_color = #000000, text_size = size.large)
	table.cell(ratings, 3, 1, strongBuyRatings, bgcolor = color.lime, text_color = #000000, text_size = size.large)
	table.cell(ratings, 4, 1, sellRatings, bgcolor = color.maroon, text_color = #000000, text_size = size.large)
```

**See also:** `syminfo.recommendations_buy`, `syminfo.recommendations_buy_strong`, `syminfo.recommendations_date`, `syminfo.recommendations_hold`, `syminfo.recommendations_total`, `syminfo.recommendations_sell`

### syminfo.recommendations_total

The total number of recommendations for the current symbol.

Type: `series int`

```pine
//@version=6
indicator("syminfo recommendations", overlay = true)
//@variable A table containing information about analyst recommendations.
var table ratings = table.new(position.top_right, 8, 2, frame_color = #000000)
if barstate.islastconfirmedhistory
	//@variable The time value one year from the date of the last analyst recommendations.
	int YTD = syminfo.target_price_date + timeframe.in_seconds("12M") * 1000
	// Add header cells.
	table.cell(ratings, 0, 0, "Start Date", bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 1, 0, "End Date", bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 2, 0, "Buy", bgcolor = color.teal, text_color = #000000, text_size = size.large)
	table.cell(ratings, 3, 0, "Strong Buy", bgcolor = color.lime, text_color = #000000, text_size = size.large)
	table.cell(ratings, 4, 0, "Sell", bgcolor = color.maroon, text_color = #000000, text_size = size.large)
	table.cell(ratings, 5, 0, "Strong Sell", bgcolor = color.red, text_color = #000000, text_size = size.large)
	table.cell(ratings, 6, 0, "Hold", bgcolor = color.orange, text_color = #000000, text_size = size.large)
	table.cell(ratings, 7, 0, "Total", bgcolor = color.silver, text_color = #000000, text_size = size.large)
	// Recommendation strings
	string startDate         = str.format_time(syminfo.recommendations_date, "yyyy-MM-dd")
	string endDate           = str.format_time(YTD, "yyyy-MM-dd")
	string buyRatings        = str.tostring(syminfo.recommendations_buy)
	string strongBuyRatings  = str.tostring(syminfo.recommendations_buy_strong)
	string sellRatings       = str.tostring(syminfo.recommendations_sell)
	string strongSellRatings = str.tostring(syminfo.recommendations_sell_strong)
	string holdRatings       = str.tostring(syminfo.recommendations_hold)
	string totalRatings      = str.tostring(syminfo.recommendations_total)
	// Add value cells
	table.cell(ratings, 0, 1, startDate, bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 1, 1, endDate, bgcolor = color.gray, text_color = #000000, text_size = size.large)
	table.cell(ratings, 2, 1, buyRatings, bgcolor = color.teal, text_color = #000000, text_size = size.large)
	table.cell(ratings, 3, 1, strongBuyRatings, bgcolor = color.lime, text_color = #000000, text_size = size.large)
	table.cell(ratings, 4, 1, sellRatings, bgcolor = color.maroon, text_color = #000000, text_size = size.large)
```

**See also:** `syminfo.recommendations_buy`, `syminfo.recommendations_buy_strong`, `syminfo.recommendations_date`, `syminfo.recommendations_hold`, `syminfo.recommendations_sell`, `syminfo.recommendations_sell_strong`

### syminfo.root

Root for derivatives like futures contract. For other symbols returns the same value as `syminfo.ticker`.

Type: `simple string`

```pine
//@version=6
indicator("syminfo.root")

// If the current chart symbol is continuous futures ('ES1!'), it would display 'ES'.
if barstate.islastconfirmedhistory
	label.new(bar_index, high, syminfo.root)
```

**See also:** `syminfo.ticker`, `syminfo.tickerid`

### syminfo.sector

Returns the sector of the symbol, or `na` if the symbol has no sector. Example: "Electronic Technology", "Technology services", "Energy Minerals", "Consumer Durables", etc. These are the same values one can see in the chart's "Symbol info" window.

Type: `simple string`

**Remarks**

A sector is a broad section of the economy. An industry is a narrower classification. NASDAQ:CAT (Caterpillar, Inc.) for example, belongs to the "Producer Manufacturing" sector and the "Trucks/Construction/Farm Machinery" industry.

### syminfo.session

Session type of the chart main series. Possible values are `session.regular`, `session.extended`.

Type: `simple string`

**See also:** `session.regular`, `session.extended`

### syminfo.shareholders

The number of shareholders the company has.

Type: `simple int`

```pine
//@version=6
indicator("syminfo simple")
//@variable A table containing information about a company's employees, shareholders, and shares.
var result_table = table.new(position = position.top_right, columns = 2, rows = 5, border_width = 1)
if barstate.islastconfirmedhistory
	// Add header cells
	table.cell(table_id = result_table, column = 0, row = 0, text = "name")
	table.cell(table_id = result_table, column = 1, row = 0, text = "value")
	// Add employee info cells.
	table.cell(table_id = result_table, column = 0, row = 1, text = "employees")
	table.cell(table_id = result_table, column = 1, row = 1, text = str.tostring(syminfo.employees))
	// Add shareholder cells.
	table.cell(table_id = result_table, column = 0, row = 2, text = "shareholders")
	table.cell(table_id = result_table, column = 1, row = 2, text = str.tostring(syminfo.shareholders))
	// Add float shares outstanding cells.
	table.cell(table_id = result_table, column = 0, row = 3, text = "shares_outstanding_float")
	table.cell(table_id = result_table, column = 1, row = 3, text = str.tostring(syminfo.shares_outstanding_float))
	// Add total shares outstanding cells.
	table.cell(table_id = result_table, column = 0, row = 4, text = "shares_outstanding_total")
	table.cell(table_id = result_table, column = 1, row = 4, text = str.tostring(syminfo.shares_outstanding_total))
```

**See also:** `syminfo.employees`, `syminfo.shares_outstanding_float`, `syminfo.shares_outstanding_total`

### syminfo.shares_outstanding_float

The total number of shares outstanding a company has available, excluding any of its restricted shares.

Type: `simple float`

```pine
//@version=6
indicator("syminfo simple")
//@variable A table containing information about a company's employees, shareholders, and shares.
var result_table = table.new(position = position.top_right, columns = 2, rows = 5, border_width = 1)
if barstate.islastconfirmedhistory
	// Add header cells
	table.cell(table_id = result_table, column = 0, row = 0, text = "name")
	table.cell(table_id = result_table, column = 1, row = 0, text = "value")
	// Add employee info cells.
	table.cell(table_id = result_table, column = 0, row = 1, text = "employees")
	table.cell(table_id = result_table, column = 1, row = 1, text = str.tostring(syminfo.employees))
	// Add shareholder cells.
	table.cell(table_id = result_table, column = 0, row = 2, text = "shareholders")
	table.cell(table_id = result_table, column = 1, row = 2, text = str.tostring(syminfo.shareholders))
	// Add float shares outstanding cells.
	table.cell(table_id = result_table, column = 0, row = 3, text = "shares_outstanding_float")
	table.cell(table_id = result_table, column = 1, row = 3, text = str.tostring(syminfo.shares_outstanding_float))
	// Add total shares outstanding cells.
	table.cell(table_id = result_table, column = 0, row = 4, text = "shares_outstanding_total")
	table.cell(table_id = result_table, column = 1, row = 4, text = str.tostring(syminfo.shares_outstanding_total))
```

**See also:** `syminfo.employees`, `syminfo.shareholders`, `syminfo.shares_outstanding_total`

### syminfo.shares_outstanding_total

The total number of shares outstanding a company has available, including restricted shares held by insiders, major shareholders, and employees.

Type: `simple int`

```pine
//@version=6
indicator("syminfo simple")
//@variable A table containing information about a company's employees, shareholders, and shares.
var result_table = table.new(position = position.top_right, columns = 2, rows = 5, border_width = 1)
if barstate.islastconfirmedhistory
	// Add header cells
	table.cell(table_id = result_table, column = 0, row = 0, text = "name")
	table.cell(table_id = result_table, column = 1, row = 0, text = "value")
	// Add employee info cells.
	table.cell(table_id = result_table, column = 0, row = 1, text = "employees")
	table.cell(table_id = result_table, column = 1, row = 1, text = str.tostring(syminfo.employees))
	// Add shareholder cells.
	table.cell(table_id = result_table, column = 0, row = 2, text = "shareholders")
	table.cell(table_id = result_table, column = 1, row = 2, text = str.tostring(syminfo.shareholders))
	// Add float shares outstanding cells.
	table.cell(table_id = result_table, column = 0, row = 3, text = "shares_outstanding_float")
	table.cell(table_id = result_table, column = 1, row = 3, text = str.tostring(syminfo.shares_outstanding_float))
	// Add total shares outstanding cells.
	table.cell(table_id = result_table, column = 0, row = 4, text = "shares_outstanding_total")
	table.cell(table_id = result_table, column = 1, row = 4, text = str.tostring(syminfo.shares_outstanding_total))
```

**See also:** `syminfo.employees`, `syminfo.shareholders`, `syminfo.shares_outstanding_float`

### syminfo.target_price_average

The average of the last yearly price targets for the symbol predicted by analysts.

Type: `series float`

**Remarks**

If analysts supply the targets when the market is closed, the variable can return `na` until the market opens.

```pine
//@version=6
indicator("syminfo target_price")
if barstate.islastconfirmedhistory
	//@variable The time value one year from the date of the last analyst recommendations.
	int YTD = syminfo.target_price_date + timeframe.in_seconds("12M") * 1000
	//@variable A line connecting the current `close` to the highest yearly price estimate.
	highLine = line.new(time, close, YTD, syminfo.target_price_high, color = color.green, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the lowest yearly price estimate.
	lowLine = line.new(time, close, YTD, syminfo.target_price_low, color = color.red, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the median yearly price estimate.
	medianLine = line.new(time, close, YTD, syminfo.target_price_median, color = color.gray, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the average yearly price estimate.
	averageLine = line.new(time, close, YTD, syminfo.target_price_average, color = color.orange, xloc = xloc.bar_time)
	// Fill the space between targets
	linefill.new(lowLine, medianLine, color.new(color.red, 90))
	linefill.new(medianLine, highLine, color.new(color.green, 90))
	// Create a label displaying the total number of analyst estimates.
	string estimatesText = str.format("Number of estimates: {0}", syminfo.target_price_estimates)
	label.new(bar_index, close, estimatesText, textcolor = color.white, size = size.large)
```

**See also:** `syminfo.target_price_date`, `syminfo.target_price_estimates`, `syminfo.target_price_high`, `syminfo.target_price_low`, `syminfo.target_price_median`

### syminfo.target_price_date

The starting date of the last price target prediction for the current symbol.

Type: `series int`

**Remarks**

If analysts supply the targets when the market is closed, the variable can return `na` until the market opens.

```pine
//@version=6
indicator("syminfo target_price")
if barstate.islastconfirmedhistory
	//@variable The time value one year from the date of the last analyst recommendations.
	int YTD = syminfo.target_price_date + timeframe.in_seconds("12M") * 1000
	//@variable A line connecting the current `close` to the highest yearly price estimate.
	highLine = line.new(time, close, YTD, syminfo.target_price_high, color = color.green, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the lowest yearly price estimate.
	lowLine = line.new(time, close, YTD, syminfo.target_price_low, color = color.red, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the median yearly price estimate.
	medianLine = line.new(time, close, YTD, syminfo.target_price_median, color = color.gray, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the average yearly price estimate.
	averageLine = line.new(time, close, YTD, syminfo.target_price_average, color = color.orange, xloc = xloc.bar_time)
	// Fill the space between targets
	linefill.new(lowLine, medianLine, color.new(color.red, 90))
	linefill.new(medianLine, highLine, color.new(color.green, 90))
	// Create a label displaying the total number of analyst estimates.
	string estimatesText = str.format("Number of estimates: {0}", syminfo.target_price_estimates)
	label.new(bar_index, close, estimatesText, textcolor = color.white, size = size.large)
```

**See also:** `syminfo.target_price_average`, `syminfo.target_price_estimates`, `syminfo.target_price_high`, `syminfo.target_price_low`, `syminfo.target_price_median`

### syminfo.target_price_estimates

The latest total number of price target predictions for the current symbol.

Type: `series float`

**Remarks**

If analysts supply the targets when the market is closed, the variable can return `na` until the market opens.

```pine
//@version=6
indicator("syminfo target_price")
if barstate.islastconfirmedhistory
	//@variable The time value one year from the date of the last analyst recommendations.
	int YTD = syminfo.target_price_date + timeframe.in_seconds("12M") * 1000
	//@variable A line connecting the current `close` to the highest yearly price estimate.
	highLine = line.new(time, close, YTD, syminfo.target_price_high, color = color.green, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the lowest yearly price estimate.
	lowLine = line.new(time, close, YTD, syminfo.target_price_low, color = color.red, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the median yearly price estimate.
	medianLine = line.new(time, close, YTD, syminfo.target_price_median, color = color.gray, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the average yearly price estimate.
	averageLine = line.new(time, close, YTD, syminfo.target_price_average, color = color.orange, xloc = xloc.bar_time)
	// Fill the space between targets
	linefill.new(lowLine, medianLine, color.new(color.red, 90))
	linefill.new(medianLine, highLine, color.new(color.green, 90))
	// Create a label displaying the total number of analyst estimates.
	string estimatesText = str.format("Number of estimates: {0}", syminfo.target_price_estimates)
	label.new(bar_index, close, estimatesText, textcolor = color.white, size = size.large)
```

**See also:** `syminfo.target_price_average`, `syminfo.target_price_date`, `syminfo.target_price_high`, `syminfo.target_price_low`, `syminfo.target_price_median`

### syminfo.target_price_high

The last highest yearly price target for the symbol predicted by analysts.

Type: `series float`

**Remarks**

If analysts supply the targets when the market is closed, the variable can return `na` until the market opens.

```pine
//@version=6
indicator("syminfo target_price")
if barstate.islastconfirmedhistory
	//@variable The time value one year from the date of the last analyst recommendations.
	int YTD = syminfo.target_price_date + timeframe.in_seconds("12M") * 1000
	//@variable A line connecting the current `close` to the highest yearly price estimate.
	highLine = line.new(time, close, YTD, syminfo.target_price_high, color = color.green, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the lowest yearly price estimate.
	lowLine = line.new(time, close, YTD, syminfo.target_price_low, color = color.red, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the median yearly price estimate.
	medianLine = line.new(time, close, YTD, syminfo.target_price_median, color = color.gray, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the average yearly price estimate.
	averageLine = line.new(time, close, YTD, syminfo.target_price_average, color = color.orange, xloc = xloc.bar_time)
	// Fill the space between targets
	linefill.new(lowLine, medianLine, color.new(color.red, 90))
	linefill.new(medianLine, highLine, color.new(color.green, 90))
	// Create a label displaying the total number of analyst estimates.
	string estimatesText = str.format("Number of estimates: {0}", syminfo.target_price_estimates)
	label.new(bar_index, close, estimatesText, textcolor = color.white, size = size.large)
```

**See also:** `syminfo.target_price_average`, `syminfo.target_price_date`, `syminfo.target_price_estimates`, `syminfo.target_price_low`, `syminfo.target_price_median`

### syminfo.target_price_low

The last lowest yearly price target for the symbol predicted by analysts.

Type: `series float`

**Remarks**

If analysts supply the targets when the market is closed, the variable can return `na` until the market opens.

```pine
//@version=6
indicator("syminfo target_price")
if barstate.islastconfirmedhistory
	//@variable The time value one year from the date of the last analyst recommendations.
	int YTD = syminfo.target_price_date + timeframe.in_seconds("12M") * 1000
	//@variable A line connecting the current `close` to the highest yearly price estimate.
	highLine = line.new(time, close, YTD, syminfo.target_price_high, color = color.green, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the lowest yearly price estimate.
	lowLine = line.new(time, close, YTD, syminfo.target_price_low, color = color.red, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the median yearly price estimate.
	medianLine = line.new(time, close, YTD, syminfo.target_price_median, color = color.gray, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the average yearly price estimate.
	averageLine = line.new(time, close, YTD, syminfo.target_price_average, color = color.orange, xloc = xloc.bar_time)
	// Fill the space between targets
	linefill.new(lowLine, medianLine, color.new(color.red, 90))
	linefill.new(medianLine, highLine, color.new(color.green, 90))
	// Create a label displaying the total number of analyst estimates.
	string estimatesText = str.format("Number of estimates: {0}", syminfo.target_price_estimates)
	label.new(bar_index, close, estimatesText, textcolor = color.white, size = size.large)
```

**See also:** `syminfo.target_price_average`, `syminfo.target_price_date`, `syminfo.target_price_estimates`, `syminfo.target_price_high`, `syminfo.target_price_median`

### syminfo.target_price_median

The median of the last yearly price targets for the symbol predicted by analysts.

Type: `series float`

**Remarks**

If analysts supply the targets when the market is closed, the variable can return `na` until the market opens.

```pine
//@version=6
indicator("syminfo target_price")
if barstate.islastconfirmedhistory
	//@variable The time value one year from the date of the last analyst recommendations.
	int YTD = syminfo.target_price_date + timeframe.in_seconds("12M") * 1000
	//@variable A line connecting the current `close` to the highest yearly price estimate.
	highLine = line.new(time, close, YTD, syminfo.target_price_high, color = color.green, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the lowest yearly price estimate.
	lowLine = line.new(time, close, YTD, syminfo.target_price_low, color = color.red, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the median yearly price estimate.
	medianLine = line.new(time, close, YTD, syminfo.target_price_median, color = color.gray, xloc = xloc.bar_time)
	//@variable A line connecting the current `close` to the average yearly price estimate.
	averageLine = line.new(time, close, YTD, syminfo.target_price_average, color = color.orange, xloc = xloc.bar_time)
	// Fill the space between targets
	linefill.new(lowLine, medianLine, color.new(color.red, 90))
	linefill.new(medianLine, highLine, color.new(color.green, 90))
	// Create a label displaying the total number of analyst estimates.
	string estimatesText = str.format("Number of estimates: {0}", syminfo.target_price_estimates)
	label.new(bar_index, close, estimatesText, textcolor = color.white, size = size.large)
```

**See also:** `syminfo.target_price_average`, `syminfo.target_price_date`, `syminfo.target_price_estimates`, `syminfo.target_price_high`, `syminfo.target_price_low`

### syminfo.ticker

Symbol name without exchange prefix, e.g. 'MSFT'.

Type: `simple string`

**See also:** `syminfo.tickerid`, `timeframe.period`, `timeframe.multiplier`, `syminfo.root`

### syminfo.tickerid

A ticker identifier representing the chart's symbol or a requested symbol, depending on how the script uses it. The variable's value represents a requested dataset's ticker ID when used in the `expression` argument of a `request.*()` function call. Otherwise, it represents the chart's ticker ID. The value contains an exchange prefix and a symbol name, separated by a colon (e.g., "NASDAQ:AAPL"). It can also include information about data modifications such as dividend adjustment, non-standard chart type, currency conversion, etc.

Type: `simple string`

**Remarks**

Because the value of this variable does not always use a simple "prefix:ticker" format, it is a poor candidate for use in boolean comparisons or string manipulation functions. In those contexts, run the variable's result through `ticker.standard()` to purify it. This will remove any extraneous information and return a ticker ID consistently formatted using the "prefix:ticker" structure.

To always access the script's main ticker ID, even within another context, use the `syminfo.main_tickerid` variable.

**See also:** `ticker.new()`, `syminfo.main_tickerid`, `timeframe.main_period`, `syminfo.ticker`, `timeframe.period`, `timeframe.multiplier`, `syminfo.root`

### syminfo.timezone

Timezone of the exchange of the chart main series. Possible values see in `timestamp()`.

Type: `simple string`

**See also:** `timestamp()`

### syminfo.type

The type of market the symbol belongs to. The values are "stock", "fund", "dr", "right", "bond", "warrant", "structured", "index", "forex", "futures", "spread", "economic", "fundamental", "crypto", "spot", "swap", "option", "commodity".

Type: `simple string`

**See also:** `syminfo.ticker`

### syminfo.volumetype

Volume type of the current symbol. Possible values are: "base" for base currency, "quote" for quote currency, "tick" for the number of transactions, and "n/a" when there is no volume or its type is not specified.

Type: `simple string`

**Remarks**

Only some data feed suppliers provide information qualifying volume. As a result, the variable will return a value on some symbols only, mostly in the crypto sector.

**See also:** `syminfo.type`

## Functions

### syminfo.prefix()

Returns exchange prefix of the `symbol`, e.g. "NASDAQ".

```pine
syminfo.prefix(symbol) → simple string
syminfo.prefix(symbol) → series string
```

**Arguments**

- `symbol` (simple string | series string): Symbol. Note that the symbol should be passed with a prefix. For example: "NASDAQ:AAPL" instead of "AAPL".

**Returns:** Returns exchange prefix of the `symbol`, e.g. "NASDAQ".

**Remarks**

The result of the function is used in the `ticker.new()`/`ticker.modify()` and `request.security()`.

```pine
//@version=6
indicator("syminfo.prefix fun", overlay=true)
i_sym = input.symbol("NASDAQ:AAPL")
pref = syminfo.prefix(i_sym)
tick = syminfo.ticker(i_sym)
t = ticker.new(pref, tick, session.extended)
s = request.security(t, "1D", close)
plot(s)
```

**See also:** `syminfo.tickerid`, `syminfo.ticker`, `syminfo.prefix`, `syminfo.ticker()`, `ticker.new()`

### syminfo.ticker()

Returns `symbol` name without exchange prefix, e.g. "AAPL".

```pine
syminfo.ticker(symbol) → simple string
syminfo.ticker(symbol) → series string
```

**Arguments**

- `symbol` (simple string | series string): Symbol. Note that the symbol should be passed with a prefix. For example: "NASDAQ:AAPL" instead of "AAPL".

**Returns:** Returns `symbol` name without exchange prefix, e.g. "AAPL".

**Remarks**

The result of the function is used in the `ticker.new()`/`ticker.modify()` and `request.security()`.

```pine
//@version=6
indicator("syminfo.ticker fun", overlay=true)
i_sym = input.symbol("NASDAQ:AAPL")
pref = syminfo.prefix(i_sym)
tick = syminfo.ticker(i_sym)
t = ticker.new(pref, tick, session.extended)
s = request.security(t, "1D", close)
plot(s)
```

**See also:** `syminfo.tickerid`, `syminfo.ticker`, `syminfo.prefix`, `syminfo.prefix()`, `ticker.new()`
