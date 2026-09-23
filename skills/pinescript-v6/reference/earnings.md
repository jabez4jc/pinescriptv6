# `earnings.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### earnings.future_eps

Returns the estimated Earnings per Share of the next earnings report in the currency of the instrument, or `na` if this data isn't available.

Type: `series float`

**Remarks**

This value is only fetched once during the script's initial calculation. The variable will return the same value until the script is recalculated, even after the expected time of the next earnings report.

**See also:** `request.earnings()`

### earnings.future_period_end_time

Checks the data for the next earnings report and returns the UNIX timestamp of the day when the financial period covered by those earnings ends, or `na` if this data isn't available.

Type: `series int`

**Returns:** UNIX time, expressed in milliseconds.

**Remarks**

This value is only fetched once during the script's initial calculation. The variable will return the same value until the script is recalculated, even after the expected time of the next earnings report.

**See also:** `request.earnings()`

### earnings.future_revenue

Returns the estimated Revenue of the next earnings report in the currency of the instrument, or `na` if this data isn't available.

Type: `series float`

**Remarks**

This value is only fetched once during the script's initial calculation. The variable will return the same value until the script is recalculated, even after the expected time of the next earnings report.

**See also:** `request.earnings()`

### earnings.future_time

Returns a UNIX timestamp indicating the expected time of the next earnings report, or `na` if this data isn't available.

Type: `series int`

**Returns:** UNIX time, expressed in milliseconds.

**Remarks**

This value is only fetched once during the script's initial calculation. The variable will return the same value until the script is recalculated, even after the expected time of the next earnings report.

**See also:** `request.earnings()`
