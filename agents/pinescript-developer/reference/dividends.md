# `dividends.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### dividends.future_amount

Returns the payment amount of the upcoming dividend in the currency of the current instrument, or `na` if this data isn't available.

Type: `series float`

**Remarks**

This value is only fetched once during the script's initial calculation. The variable will return the same value until the script is recalculated, even after the expected Payment date of the next dividend.

### dividends.future_ex_date

Returns the Ex-dividend date (Ex-date) of the current instrument's next dividend payment, or `na` if this data isn't available. Ex-dividend date signifies when investors are no longer entitled to a payout from the most recent dividend. Only those who purchased shares before this day are entitled to the dividend payment.

Type: `series int`

**Returns:** UNIX time, expressed in milliseconds.

**Remarks**

This value is only fetched once during the script's initial calculation. The variable will return the same value until the script is recalculated, even after the expected Payment date of the next dividend.

### dividends.future_pay_date

Returns the Payment date (Pay date) of the current instrument's next dividend payment, or `na` if this data isn't available. Payment date signifies the day when eligible investors will receive the dividend payment.

Type: `series int`

**Returns:** UNIX time, expressed in milliseconds.

**Remarks**

This value is only fetched once during the script's initial calculation. The variable will return the same value until the script is recalculated, even after the expected Payment date of the next dividend.
