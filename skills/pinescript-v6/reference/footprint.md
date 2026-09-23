# `footprint.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Functions

### footprint.buy_volume()

Calculates the total "buy" volume for the volume footprint represented by a `footprint` object.

```pine
footprint.buy_volume(id) → series float
```

**Arguments**

- `id` (footprint): The reference (ID) of the `footprint` object to analyze.

**Returns:** The total "buy" volume measured by the footprint.

### footprint.delta()

Calculates the overall volume delta for the volume footprint represented by a `footprint` object. The value represents the difference between the footprint's total "buy" volume and "sell" volume. A positive value indicates that the total "buy" volume in the footprint exceeds the total "sell" volume, and a negative value indicates the opposite.

```pine
footprint.delta(id) → series float
```

**Arguments**

- `id` (footprint): The reference (ID) of the `footprint` object to analyze.

**Returns:** The overall volume delta for the footprint.

### footprint.get_row_by_price()

Analyzes the volume footprint represented by a `footprint` object to find the row whose price range includes the specified price level. If the price belongs to one of the rows, the function returns the ID of the `volume_row` object that contains the data for that row. Otherwise, it returns `na`.

```pine
footprint.get_row_by_price(id, price) → volume_row
```

**Arguments**

- `id` (footprint): The reference (ID) of the `footprint` object to analyze.
- `price` (series int/float): The price value for which to find the corresponding footprint row.

**Returns:** The ID of a `volume_row` object representing the footprint row that contains the specified price, or `na` if the price is outside the footprint's price range.

### footprint.poc()

Finds the Point of Control (POC) row for the volume footprint represented by a `footprint` object, then returns the ID of a `volume_row` object containing the data for that row.

```pine
footprint.poc(id) → volume_row
```

**Arguments**

- `id` (footprint): The reference (ID) of the `footprint` object to analyze.

**Returns:** The ID of a `volume_row` object representing the footprint's POC row.

### footprint.rows()

Creates an array containing all `volume_row` IDs from a `footprint` object. Each `volume_row` object referenced in the array contains data for one row in the calculated volume footprint, where the first object represents the lowest row and the last one represents the highest row.

```pine
footprint.rows(id) → array<volume_row>
```

**Arguments**

- `id` (footprint): The reference (ID) of the `footprint` object to analyze.

**Returns:** The ID of an array containing a `volume_row` ID for each row in the footprint.

### footprint.sell_volume()

Calculates the total "sell" volume for the volume footprint represented by a `footprint` object.

```pine
footprint.sell_volume(id) → series float
```

**Arguments**

- `id` (footprint): The reference (ID) of the `footprint` object to analyze.

**Returns:** The total "sell" volume measured by the footprint.

### footprint.total_volume()

Calculates the sum of the total "buy" volume and "sell" volume for the volume footprint represented by a `footprint` object.

```pine
footprint.total_volume(id) → series float
```

**Arguments**

- `id` (footprint): The reference (ID) of the `footprint` object to analyze.

**Returns:** The total volume measured by the footprint.

### footprint.vah()

Finds the Value Area High (VAH) row for the volume footprint represented by a `footprint` object, then returns the ID of a `volume_row` object containing the data for that row.

```pine
footprint.vah(id) → volume_row
```

**Arguments**

- `id` (footprint): The reference (ID) of the `footprint` object to analyze.

**Returns:** The ID of a `volume_row` object representing the footprint's VAH row.

### footprint.val()

Finds the Value Area Low (VAL) row for the volume footprint represented by a `footprint` object, then returns the ID of a `volume_row` object containing the data for that row.

```pine
footprint.val(id) → volume_row
```

**Arguments**

- `id` (footprint): The reference (ID) of the `footprint` object to analyze.

**Returns:** The ID of a `volume_row` object representing the footprint's VAL row.
