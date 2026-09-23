# `table.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### table.all

Returns an array filled with all the current tables drawn by the script.

Type: `array<table>`

**Remarks**

The array is read-only. Index zero of the array is the ID of the oldest object on the chart.

```pine
//@version=6
indicator("table.all")
//delete all tables
table.new(position = position.top_right, columns = 2, rows = 1, bgcolor = color.yellow, border_width = 1)
a_allTables = table.all
if array.size(a_allTables) > 0
	for i = 0 to array.size(a_allTables) - 1
		table.delete(array.get(a_allTables, i))
```

**See also:** `table.new()`, `line.all`, `label.all`, `box.all`

## Functions

### table()

Casts na to table

```pine
table(x) → series table
```

**Arguments**

- `x` (series table): The value to convert to the specified type, usually `na`.

**Returns:** The value of the argument after casting to table.

**See also:** `float()`, `int()`, `bool()`, `color()`, `string()`, `line()`, `label()`

### table.cell()

The function defines a cell in the table and sets its attributes.

```pine
table.cell(table_id, column, row, text, width, height, text_color, text_halign, text_valign, text_size, bgcolor, tooltip, text_font_family, text_formatting) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `column` (series int): The index of the cell's column. Numbering starts at 0.
- `row` (series int): The index of the cell's row. Numbering starts at 0.
- `text` (series string, optional): The text to be displayed inside the cell. Optional. The default is empty string.
- `width` (series int/float, optional): The width of the cell as a % of the indicator's visual space. Optional. By default, auto-adjusts the width based on the text inside the cell. Value 0 has the same effect.
- `height` (series int/float, optional): The height of the cell as a % of the indicator's visual space. Optional. By default, auto-adjusts the height based on the text inside of the cell. Value 0 has the same effect.
- `text_color` (series color, optional): The color of the text. Optional. The default is `color.black`.
- `text_halign` (series string, optional): The horizontal alignment of the cell's text. Optional. The default value is `text.align_center`. Possible values: `text.align_left`, `text.align_center`, `text.align_right`.
- `text_valign` (series string, optional): The vertical alignment of the cell's text. Optional. The default value is `text.align_center`. Possible values: `text.align_top`, `text.align_center`, `text.align_bottom`.
- `text_size` (series int/string, optional): Size of the object. The size can be any positive integer, or one of the size.* built-in constant strings. The constant strings and their equivalent integer values are: `size.auto` (0), `size.tiny` (8), `size.small` (10), `size.normal` (14), `size.large` (20), `size.huge` (36). The default value is `size.normal` or 14.
- `bgcolor` (series color, optional): The background color of the text. Optional. The default is no color.
- `tooltip` (series string, optional): The tooltip to be displayed inside the cell. Optional.
- `text_font_family` (series string, optional): The font family of the text. Optional. The default value is `font.family_default`. Possible values: `font.family_default`, `font.family_monospace`.
- `text_formatting` (series text_format, optional): The formatting of the displayed text. Formatting options support addition. For example, `text.format_bold + text.format_italic` will make the text both bold and italicized. Possible values: `text.format_none`, `text.format_bold`, `text.format_italic`. Optional. The default is `text.format_none`.

**Remarks**

This function does not create the table itself, but defines the table’s cells. To use it, you first need to create a table object with `table.new()`.

Each `table.cell()` call overwrites all previously defined properties of a cell. If you call `table.cell()` twice in a row, e.g., the first time with text='Test Text', and the second time with text_color=`color.red` but without a new text argument, the default value of the 'text' being an empty string, it will overwrite 'Test Text', and your cell will display an empty string. If you want, instead, to modify any of the cell's properties, use the table.cell_set_*() functions.

A single script can only display one table in each of the possible locations. If `table.cell()` is used on several bars to change the same attribute of a cell (e.g. change the background color of the cell to red on the first bar, then to yellow on the second bar), only the last change will be reflected in the table, i.e., the cell’s background will be yellow. Avoid unnecessary setting of cell properties by enclosing function calls in an `if` `barstate.islast` block whenever possible, to restrict their execution to the last bar of the series.

**See also:** `table.cell_set_bgcolor()`, `table.cell_set_height()`, `table.cell_set_text()`, `table.cell_set_text_formatting()`, `table.cell_set_text_color()`, `table.cell_set_text_halign()`, `table.cell_set_text_size()`, `table.cell_set_text_valign()`, `table.cell_set_width()`, `table.cell_set_tooltip()`

### table.cell_set_bgcolor()

The function sets the background color of the cell.

```pine
table.cell_set_bgcolor(table_id, column, row, bgcolor) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `column` (series int): The index of the cell's column. Numbering starts at 0.
- `row` (series int): The index of the cell's row. Numbering starts at 0.
- `bgcolor` (series color, optional): The background color of the cell.

**See also:** `table.cell_set_height()`, `table.cell_set_text()`, `table.cell_set_text_color()`, `table.cell_set_text_halign()`, `table.cell_set_text_size()`, `table.cell_set_text_valign()`, `table.cell_set_width()`, `table.cell_set_tooltip()`

### table.cell_set_height()

The function sets the height of cell.

```pine
table.cell_set_height(table_id, column, row, height) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `column` (series int): The index of the cell's column. Numbering starts at 0.
- `row` (series int): The index of the cell's row. Numbering starts at 0.
- `height` (series int/float, optional): The height of the cell as a % of the chart window. Passing 0 auto-adjusts the height based on the text inside of the cell.

**See also:** `table.cell_set_bgcolor()`, `table.cell_set_text()`, `table.cell_set_text_color()`, `table.cell_set_text_halign()`, `table.cell_set_text_size()`, `table.cell_set_text_valign()`, `table.cell_set_width()`, `table.cell_set_tooltip()`

### table.cell_set_text()

The function sets the text in the specified cell.

```pine
table.cell_set_text(table_id, column, row, text) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `column` (series int): The index of the cell's column. Numbering starts at 0.
- `row` (series int): The index of the cell's row. Numbering starts at 0.
- `text` (series string, optional): The text to be displayed inside the cell.

```pine
//@version=6
indicator("TABLE example")
var tLog = table.new(position = position.top_left, rows = 1, columns = 2, bgcolor = color.yellow, border_width=1)
table.cell(tLog, row = 0, column = 0, text = "sometext", text_color = color.blue)
table.cell_set_text(tLog, row = 0, column = 0, text = "sometext")
```

**See also:** `table.cell_set_bgcolor()`, `table.cell_set_height()`, `table.cell_set_text_color()`, `table.cell_set_text_halign()`, `table.cell_set_text_size()`, `table.cell_set_text_valign()`, `table.cell_set_width()`, `table.cell_set_tooltip()`, `table.cell_set_text_formatting()`

### table.cell_set_text_color()

The function sets the color of the text inside the cell.

```pine
table.cell_set_text_color(table_id, column, row, text_color) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `column` (series int): The index of the cell's column. Numbering starts at 0.
- `row` (series int): The index of the cell's row. Numbering starts at 0.
- `text_color` (series color, optional): The color of the text.

**See also:** `table.cell_set_bgcolor()`, `table.cell_set_height()`, `table.cell_set_text()`, `table.cell_set_text_halign()`, `table.cell_set_text_size()`, `table.cell_set_text_valign()`, `table.cell_set_width()`, `table.cell_set_tooltip()`

### table.cell_set_text_font_family()

The function sets the font family of the text inside the cell.

```pine
table.cell_set_text_font_family(table_id, column, row, text_font_family) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `column` (series int): The index of the cell's column. Numbering starts at 0.
- `row` (series int): The index of the cell's row. Numbering starts at 0.
- `text_font_family` (series string): The font family of the text. Possible values: `font.family_default`, `font.family_monospace`.

```pine
//@version=6
indicator("Example of setting the table cell font")
var t = table.new(position.top_left, rows = 1, columns = 1)
table.cell(t, 0, 0, "monospace", text_color = color.blue)
table.cell_set_text_font_family(t, 0, 0, font.family_monospace)
```

**See also:** `table.new()`, `font.family_default`, `font.family_monospace`

### table.cell_set_text_formatting()

Sets the formatting attributes the drawing applies to displayed text.

```pine
table.cell_set_text_formatting(table_id, column, row, text_formatting) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `column` (series int): The index of the cell's column. Numbering starts at 0.
- `row` (series int): The index of the cell's row. Numbering starts at 0.
- `text_formatting` (series text_format): The formatting of the displayed text. Formatting options support addition. For example, `text.format_bold + text.format_italic` will make the text both bold and italicized. Possible values: `text.format_none`, `text.format_bold`, `text.format_italic`. Optional. The default is `text.format_none`.

**See also:** `table.cell_set_bgcolor()`, `table.cell_set_height()`, `table.cell_set_text_color()`, `table.cell_set_text_halign()`, `table.cell_set_text_size()`, `table.cell_set_text_valign()`, `table.cell_set_width()`, `table.cell_set_tooltip()`, `table.cell_set_text()`

### table.cell_set_text_halign()

The function sets the horizontal alignment of the cell's text.

```pine
table.cell_set_text_halign(table_id, column, row, text_halign) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `column` (series int): The index of the cell's column. Numbering starts at 0.
- `row` (series int): The index of the cell's row. Numbering starts at 0.
- `text_halign` (series string, optional): The horizontal alignment of a cell's text. Possible values: `text.align_left`, `text.align_center`, `text.align_right`.

**See also:** `table.cell_set_bgcolor()`, `table.cell_set_height()`, `table.cell_set_text()`, `table.cell_set_text_color()`, `table.cell_set_text_size()`, `table.cell_set_text_valign()`, `table.cell_set_width()`, `table.cell_set_tooltip()`

### table.cell_set_text_size()

The function sets the size of the cell's text.

```pine
table.cell_set_text_size(table_id, column, row, text_size) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `column` (series int): The index of the cell's column. Numbering starts at 0.
- `row` (series int): The index of the cell's row. Numbering starts at 0.
- `text_size` (series int/string, optional): Size of the object. The size can be any positive integer, or one of the size.* built-in constant strings. The constant strings and their equivalent integer values are: `size.auto` (0), `size.tiny` (8), `size.small` (10), `size.normal` (14), `size.large` (20), `size.huge` (36). The default value is `size.normal` or 14.

**See also:** `table.cell_set_bgcolor()`, `table.cell_set_height()`, `table.cell_set_text()`, `table.cell_set_text_color()`, `table.cell_set_text_halign()`, `table.cell_set_text_valign()`, `table.cell_set_width()`, `table.cell_set_tooltip()`

### table.cell_set_text_valign()

The function sets the vertical alignment of a cell's text.

```pine
table.cell_set_text_valign(table_id, column, row, text_valign) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `column` (series int): The index of the cell's column. Numbering starts at 0.
- `row` (series int): The index of the cell's row. Numbering starts at 0.
- `text_valign` (series string, optional): The vertical alignment of the cell's text. Possible values: `text.align_top`, `text.align_center`, `text.align_bottom`.

**See also:** `table.cell_set_bgcolor()`, `table.cell_set_height()`, `table.cell_set_text()`, `table.cell_set_text_color()`, `table.cell_set_text_halign()`, `table.cell_set_text_size()`, `table.cell_set_width()`, `table.cell_set_tooltip()`

### table.cell_set_tooltip()

The function sets the tooltip in the specified cell.

```pine
table.cell_set_tooltip(table_id, column, row, tooltip) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `column` (series int): The index of the cell's column. Numbering starts at 0.
- `row` (series int): The index of the cell's row. Numbering starts at 0.
- `tooltip` (series string, optional): The tooltip to be displayed inside the cell.

```pine
//@version=6
indicator("TABLE example")
var tLog = table.new(position = position.top_left, rows = 1, columns = 2, bgcolor = color.yellow, border_width=1)
table.cell(tLog, row = 0, column = 0, text = "sometext", text_color = color.blue)
table.cell_set_tooltip(tLog, row = 0, column = 0, tooltip = "sometext")
```

**See also:** `table.cell_set_bgcolor()`, `table.cell_set_height()`, `table.cell_set_text_color()`, `table.cell_set_text_halign()`, `table.cell_set_text_size()`, `table.cell_set_text_valign()`, `table.cell_set_width()`, `table.cell_set_text()`

### table.cell_set_width()

The function sets the width of the cell.

```pine
table.cell_set_width(table_id, column, row, width) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `column` (series int): The index of the cell's column. Numbering starts at 0.
- `row` (series int): The index of the cell's row. Numbering starts at 0.
- `width` (series int/float, optional): The width of the cell as a % of the chart window. Passing 0 auto-adjusts the width based on the text inside of the cell.

**See also:** `table.cell_set_bgcolor()`, `table.cell_set_height()`, `table.cell_set_text()`, `table.cell_set_text_color()`, `table.cell_set_text_halign()`, `table.cell_set_text_size()`, `table.cell_set_text_valign()`, `table.cell_set_tooltip()`

### table.clear()

The function removes a cell or a sequence of cells from the table. The cells are removed in a rectangle shape where the start_column and start_row specify the top-left corner, and end_column and end_row specify the bottom-right corner.

```pine
table.clear(table_id, start_column, start_row, end_column, end_row) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `start_column` (series int): The index of the column of the first cell to delete. Numbering starts at 0.
- `start_row` (series int): The index of the row of the first cell to delete. Numbering starts at 0.
- `end_column` (series int, optional): The index of the column of the last cell to delete. Optional. The default is the argument used for start_column. Numbering starts at 0.
- `end_row` (series int, optional): The index of the row of the last cell to delete. Optional. The default is the argument used for start_row. Numbering starts at 0.

```pine
//@version=6
indicator("A donut", overlay=true)
if barstate.islast
    colNum = 8, rowNum = 8
    padding = "◯"
    donutTable = table.new(position.middle_right, colNum, rowNum)
    for c = 0 to colNum - 1
        for r = 0 to rowNum - 1
            table.cell(donutTable, c, r, text=padding, bgcolor=#face6e, text_color=color.new(color.black, 100))
    table.clear(donutTable, 2, 2, 5, 5)
```

**See also:** `table.delete()`, `table.new()`

### table.delete()

The function deletes a table.

```pine
table.delete(table_id) → void
```

**Arguments**

- `table_id` (series table): A table object.

```pine
//@version=6
indicator("table.delete example")
var testTable = table.new(position = position.top_right, columns = 2, rows = 1, bgcolor = color.yellow, border_width = 1)
if barstate.islast
    table.cell(table_id = testTable, column = 0, row = 0, text = "Open is " + str.tostring(open))
    table.cell(table_id = testTable, column = 1, row = 0, text = "Close is " + str.tostring(close), bgcolor=color.teal)
if barstate.isrealtime
    table.delete(testTable)
```

**See also:** `table.new()`, `table.clear()`

### table.merge_cells()

The function merges a sequence of cells in the table into one cell. The cells are merged in a rectangle shape where the start_column and start_row specify the top-left corner, and end_column and end_row specify the bottom-right corner.

```pine
table.merge_cells(table_id, start_column, start_row, end_column, end_row) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `start_column` (series int): The index of the column of the first cell to merge. Numbering starts at 0.
- `start_row` (series int): The index of the row of the first cell to merge. Numbering starts at 0.
- `end_column` (series int): The index of the column of the last cell to merge. Numbering starts at 0.
- `end_row` (series int): The index of the row of the last cell to merge. Numbering starts at 0.

**Remarks**

This function will merge cells, even if their properties are not yet defined with `table.cell()`.

The resulting merged cell inherits all of its values from the cell located at `start_column`:`start_row`, except width and height. The width and height of the resulting merged cell are based on the width/height of other cells in the neighboring columns/rows and cannot be set manually.

To modify the merged cell with any of the `table.cell_set_*` functions, target the cell at the `start_column`:`start_row` coordinates.

An attempt to merge a cell that has already been merged will result in an error.

```pine
//@version=6
indicator("table.merge_cells example")
SMA50  = ta.sma(close, 50)
SMA100 = ta.sma(close, 100)
SMA200 = ta.sma(close, 200)
if barstate.islast
	maTable = table.new(position.bottom_right, 3, 3, bgcolor = color.gray, border_width = 1, border_color = color.black)
	// Header
	table.cell(maTable, 0, 0, text = "SMA Table")
	table.merge_cells(maTable, 0, 0, 2, 0)
	// Cell Titles
	table.cell(maTable, 0, 1, text = "SMA 50")
	table.cell(maTable, 1, 1, text = "SMA 100")
	table.cell(maTable, 2, 1, text = "SMA 200")
	// Values
	table.cell(maTable, 0, 2, bgcolor = color.white, text = str.tostring(SMA50))
	table.cell(maTable, 1, 2, bgcolor = color.white, text = str.tostring(SMA100))
	table.cell(maTable, 2, 2, bgcolor = color.white, text = str.tostring(SMA200))
```

**See also:** `table.delete()`, `table.new()`

### table.new()

The function creates a new table.

```pine
table.new(position, columns, rows, bgcolor, frame_color, frame_width, border_color, border_width, force_overlay) → series table
```

**Arguments**

- `position` (series string): Position of the table. Possible values are: `position.top_left`, `position.top_center`, `position.top_right`, `position.middle_left`, `position.middle_center`, `position.middle_right`, `position.bottom_left`, `position.bottom_center`, `position.bottom_right`.
- `columns` (series int): The number of columns in the table.
- `rows` (series int): The number of rows in the table.
- `bgcolor` (series color, optional): The background color of the table. Optional. The default is no color.
- `frame_color` (series color, optional): The color of the outer frame of the table. Optional. The default is no color.
- `frame_width` (series int, optional): The width of the outer frame of the table. Optional. The default is 0.
- `border_color` (series color, optional): The color of the borders of the cells (excluding the outer frame). Optional. The default is no color.
- `border_width` (series int, optional): The width of the borders of the cells (excluding the outer frame). Optional. The default is 0.
- `force_overlay` (const bool, optional): If `true`, the drawing will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is `false`.

**Returns:** The ID of a table object that can be passed to other table.*() functions.

**Remarks**

This function creates the table object itself, but the table will not be displayed until its cells are populated. To define a cell and change its contents or attributes, use `table.cell()` and other table.cell_*() functions.

One `table.new()` call can only display one table (the last one drawn), but the function itself will be recalculated on each bar it is used on. For performance reasons, it is wise to use `table.new()` in conjunction with either the `var` keyword (so the table object is only created on the first bar) or in an `if` `barstate.islast` block (so the table object is only created on the last bar).

```pine
//@version=6
indicator("table.new example")
var testTable = table.new(position = position.top_right, columns = 2, rows = 1, bgcolor = color.yellow, border_width = 1)
if barstate.islast
    table.cell(table_id = testTable, column = 0, row = 0, text = "Open is " + str.tostring(open))
    table.cell(table_id = testTable, column = 1, row = 0, text = "Close is " + str.tostring(close), bgcolor=color.teal)
```

**See also:** `table.cell()`, `table.clear()`, `table.delete()`, `table.set_bgcolor()`, `table.set_border_color()`, `table.set_border_width()`, `table.set_frame_color()`, `table.set_frame_width()`, `table.set_position()`

### table.set_bgcolor()

The function sets the background color of a table.

```pine
table.set_bgcolor(table_id, bgcolor) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `bgcolor` (series color, optional): The background color of the table. Optional. The default is no color.

**See also:** `table.clear()`, `table.delete()`, `table.new()`, `table.set_border_color()`, `table.set_border_width()`, `table.set_frame_color()`, `table.set_frame_width()`, `table.set_position()`

### table.set_border_color()

The function sets the color of the borders (excluding the outer frame) of the table's cells.

```pine
table.set_border_color(table_id, border_color) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `border_color` (series color, optional): The color of the borders. Optional. The default is no color.

**See also:** `table.clear()`, `table.delete()`, `table.new()`, `table.set_frame_color()`, `table.set_border_width()`, `table.set_bgcolor()`, `table.set_frame_width()`, `table.set_position()`

### table.set_border_width()

The function sets the width of the borders (excluding the outer frame) of the table's cells.

```pine
table.set_border_width(table_id, border_width) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `border_width` (series int, optional): The width of the borders. Optional. The default is 0.

**See also:** `table.clear()`, `table.delete()`, `table.new()`, `table.set_frame_color()`, `table.set_frame_width()`, `table.set_bgcolor()`, `table.set_border_color()`, `table.set_position()`

### table.set_frame_color()

The function sets the color of the outer frame of a table.

```pine
table.set_frame_color(table_id, frame_color) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `frame_color` (series color, optional): The color of the frame of the table. Optional. The default is no color.

**See also:** `table.clear()`, `table.delete()`, `table.new()`, `table.set_border_color()`, `table.set_border_width()`, `table.set_bgcolor()`, `table.set_frame_width()`, `table.set_position()`

### table.set_frame_width()

The function set the width of the outer frame of a table.

```pine
table.set_frame_width(table_id, frame_width) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `frame_width` (series int, optional): The width of the outer frame of the table. Optional. The default is 0.

**See also:** `table.clear()`, `table.delete()`, `table.new()`, `table.set_frame_color()`, `table.set_border_width()`, `table.set_bgcolor()`, `table.set_border_color()`, `table.set_position()`

### table.set_position()

The function sets the position of a table.

```pine
table.set_position(table_id, position) → void
```

**Arguments**

- `table_id` (series table): A table object.
- `position` (series string): Position of the table. Possible values are: `position.top_left`, `position.top_center`, `position.top_right`, `position.middle_left`, `position.middle_center`, `position.middle_right`, `position.bottom_left`, `position.bottom_center`, `position.bottom_right`.

**See also:** `table.clear()`, `table.delete()`, `table.new()`, `table.set_bgcolor()`, `table.set_border_color()`, `table.set_border_width()`, `table.set_frame_color()`, `table.set_frame_width()`
