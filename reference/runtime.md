# `runtime.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### runtime.calculation.mode

References the calculation mode that the script is running in, allowing the script to use different logic depending on where it runs.

Possible values are: `runtime.calculation.mode.chart` when the script is running on a chart, `runtime.calculation.mode.alert` when the script is running as part of an alert.

Type: `simple string`

**See also:** `runtime.calculation.mode.chart`, `runtime.calculation.mode.alert`

## Functions

### runtime.error()

When called, causes a runtime error with the error message specified in the `message` argument.

```pine
runtime.error(message) → void
```

**Arguments**

- `message` (series string): Error message.
