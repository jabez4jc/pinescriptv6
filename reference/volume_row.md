# `volume_row.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Functions

### volume_row.buy_volume()

Calculates the total "buy" volume for the volume footprint row represented by a `volume_row` object.

```pine
volume_row.buy_volume(id) → series float
```

**Arguments**

- `id` (volume_row): The reference (ID) of the `volume_row` object to analyze.

**Returns:** The total "buy" volume for the footprint row.

### volume_row.delta()

Calculates the volume delta for the volume footprint row represented by a `volume_row` object. The value represents the difference between the row's "buy" volume and "sell" volume. A positive value indicates that the "buy" volume for the row exceeds the "sell" volume, and a negative value indicates the opposite.

```pine
volume_row.delta(id) → series float
```

**Arguments**

- `id` (volume_row): The reference (ID) of the `volume_row` object to analyze.

**Returns:** The volume delta for the footprint row.

### volume_row.down_price()

Retrieves the lower price level of the volume footprint row represented by a `volume_row` object.

```pine
volume_row.down_price(id) → series float
```

**Arguments**

- `id` (volume_row): The reference (ID) of the `volume_row` object to analyze.

**Returns:** The lower boundary of the footprint row's price range.

### volume_row.has_buy_imbalance()

Checks whether the volume footprint row represented by a `volume_row` object has a "buy" imbalance, based on the `imbalance_percent` argument of the `request.footprint()` call that the object depends on. Returns `true` if the row's "buy" volume exceeds the "sell" volume of the row below it in the footprint by the specified percentage, and `false` otherwise.

```pine
volume_row.has_buy_imbalance(id) → series bool
```

**Arguments**

- `id` (volume_row): The reference (ID) of the `volume_row` object to analyze.

**Returns:** A value of `true` if the footprint row has a detected buy imbalance, and `false` otherwise.

### volume_row.has_sell_imbalance()

Checks whether the volume footprint row represented by a `volume_row` object has a sell imbalance, based on the `imbalance_percent` argument of the `request.footprint()` call that the object depends on. Returns `true` if the row's "sell" volume exceeds the "buy" volume of the row above it in the footprint by the specified percentage, and `false` otherwise.

```pine
volume_row.has_sell_imbalance(id) → series bool
```

**Arguments**

- `id` (volume_row): The reference (ID) of the `volume_row` object to analyze.

**Returns:** A value of `true` if the footprint row has a detected sell imbalance, and `false` otherwise.

### volume_row.sell_volume()

Calculates the total "sell" volume for the volume footprint row represented by a `volume_row` object.

```pine
volume_row.sell_volume(id) → series float
```

**Arguments**

- `id` (volume_row): The reference (ID) of the `volume_row` object to analyze.

**Returns:** The total "sell" volume for the footprint row.

### volume_row.total_volume()

Calculates the sum of the "buy" and "sell" volume for the volume footprint row represented by a `volume_row` object.

```pine
volume_row.total_volume(id) → series float
```

**Arguments**

- `id` (volume_row): The reference (ID) of the `volume_row` object to analyze.

**Returns:** The total volume for the footprint row.

### volume_row.up_price()

Retrieves the upper price level of the volume footprint row represented by a `volume_row` object.

```pine
volume_row.up_price(id) → series float
```

**Arguments**

- `id` (volume_row): The reference (ID) of the `volume_row` object to analyze.

**Returns:** The upper boundary of the footprint row's price range.
