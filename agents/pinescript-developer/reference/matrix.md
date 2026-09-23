# `matrix.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Functions

### matrix.add_col()

Inserts a new column at the `column` index of the `id` matrix.

```pine
matrix.add_col(id, column, array_id) → void
```

**Arguments**

- `id` (any matrix type): The matrix object's ID (reference).
- `column` (series int, optional): Optional. The index of the new column. Must be a value from 0 to `matrix.columns(id)`. All existing columns with indices that are greater than or equal to this value increase their index by one. The default is `matrix.columns(id)`.
- `array_id` (any array type): Optional. The ID of an array to use as the new column. If the matrix is empty, the array can be of any size. Otherwise, its size must equal `matrix.rows(id)`. By default, the function inserts a column of `na` values.

Adding a column to the matrix

```pine
//@version=6
indicator("`matrix.add_col()` Example 1")

// Create a 2x3 "int" matrix containing values `0`.
m = matrix.new<int>(2, 3, 0)

// Add a column with `na` values to the matrix.
matrix.add_col(m)

// Display matrix elements.
if barstate.islastconfirmedhistory
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Matrix elements:")
	table.cell(t, 0, 1, str.tostring(m))
```

Adding an array as a column to the matrix

```pine
//@version=6
indicator("`matrix.add_col()` Example 2")

if barstate.islastconfirmedhistory
	// Create an empty matrix object.
	var m = matrix.new<int>()

	// Create an array with values `1` and `3`.
	var a = array.from(1, 3)

	// Add the `a` array as the first column of the empty matrix.
	matrix.add_col(m, 0, a)

	// Display matrix elements.
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Matrix elements:")
	table.cell(t, 0, 1, str.tostring(m))
```

**Remarks**

Rather than add columns to an empty matrix, it is far more efficient to declare a matrix with explicit dimensions and fill it with values. Adding a column is also much slower than adding a row with the `matrix.add_row()` function.

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.columns()`, `matrix.rows()`, `matrix.add_row()`

### matrix.add_row()

Inserts a new row at the `row` index of the `id` matrix.

```pine
matrix.add_row(id, row, array_id) → void
```

**Arguments**

- `id` (any matrix type): The matrix object's ID (reference).
- `row` (series int, optional): Optional. The index of the new row. Must be a value from 0 to `matrix.rows(id)`. All existing rows with indices that are greater than or equal to this value increase their index by one. The default is `matrix.rows(id)`.
- `array_id` (any array type): Optional. The ID of an array to use as the new row. If the matrix is empty, the array can be of any size. Otherwise, its size must equal `matrix.columns(id)`. By default, the function inserts a row of `na` values.

Adding a row to the matrix

```pine
//@version=6
indicator("`matrix.add_row()` Example 1")

// Create a 2x3 "int" matrix containing values `0`.
m = matrix.new<int>(2, 3, 0)

// Add a row with `na` values to the matrix.
matrix.add_row(m)

// Display matrix elements.
if barstate.islastconfirmedhistory
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Matrix elements:")
	table.cell(t, 0, 1, str.tostring(m))
```

Adding an array as a row to the matrix

```pine
//@version=6
indicator("`matrix.add_row()` Example 2")

if barstate.islastconfirmedhistory
	// Create an empty matrix object.
	var m = matrix.new<int>()

	// Create an array with values `1` and `2`.
	var a = array.from(1, 2)

	// Add the `a` array as the first row of the empty matrix.
	matrix.add_row(m, 0, a)

	// Display matrix elements.
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Matrix elements:")
	table.cell(t, 0, 1, str.tostring(m))
```

**Remarks**

Indexing of rows and columns starts at zero. Rather than add rows to an empty matrix, it is far more efficient to declare a matrix with explicit dimensions and fill it with values.

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.columns()`, `matrix.rows()`, `matrix.add_col()`

### matrix.avg()

The function calculates the average of all elements in the matrix.

```pine
matrix.avg(id) → series float
matrix.avg(id) → series int
```

**Arguments**

- `id` (matrix<int/float> | matrix<int>): A matrix object.

**Returns:** The average value from the `id` matrix.

```pine
//@version=6
indicator("`matrix.avg()` Example")

// Create a 2x2 matrix.
var m = matrix.new<int>(2, 2, na)
// Fill the matrix with values.
matrix.set(m, 0, 0, 1)
matrix.set(m, 0, 1, 2)
matrix.set(m, 1, 0, 3)
matrix.set(m, 1, 1, 4)

// Get the average value of the matrix.
var x = matrix.avg(m)

plot(x, 'Matrix average value')
```

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.columns()`, `matrix.rows()`

### matrix.col()

The function creates a one-dimensional array from the elements of a matrix column.

```pine
matrix.col(id, column) → array<type>
```

**Arguments**

- `id` (any matrix type): A matrix object.
- `column` (series int): Index of the required column.

**Returns:** An array ID containing the `column` values of the `id` matrix.

**Remarks**

Indexing of rows starts at 0.

```pine
//@version=6
indicator("`matrix.col()` Example", "", true)

// Create a 2x3 "float" matrix from `hlc3` values.
m = matrix.new<float>(2, 3, hlc3)

// Return an array with the values of the first column of matrix `m`.
a = matrix.col(m, 0)

// Plot the first value from the array `a`.
plot(array.get(a, 0))
```

**See also:** `matrix.new<type>()`, `matrix.get()`, `array.get()`, `matrix.col()`, `matrix.columns()`

### matrix.columns()

The function returns the number of columns in the matrix.

```pine
matrix.columns(id) → series int
```

**Arguments**

- `id` (any matrix type): A matrix object.

**Returns:** The number of columns in the matrix `id`.

```pine
//@version=6
indicator("`matrix.columns()` Example")

// Create a 2x6 matrix with values `0`.
var m = matrix.new<int>(2, 6, 0)

// Get the quantity of columns in matrix `m`.
var x = matrix.columns(m)

// Display using a label.
if barstate.islastconfirmedhistory
	label.new(bar_index, high, "Columns: " + str.tostring(x) + "\n" + str.tostring(m))
```

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.col()`, `matrix.row()`, `matrix.rows()`

### matrix.concat()

The function appends the `m2` matrix to the `m1` matrix.

```pine
matrix.concat(id1, id2) → matrix<type>
```

**Arguments**

- `id1` (any matrix type): Matrix object to concatenate into.
- `id2` (any matrix type): Matrix object whose elements will be appended to `id1`.

**Returns:** Returns the `id1` matrix concatenated with the `id2` matrix.

**Remarks**

The number of columns in both matrices must be identical.

```pine
//@version=6
indicator("`matrix.concat()` Example")

// Create a 2x4 "int" matrix containing values `0`.
m1 = matrix.new<int>(2, 4, 0)
// Create a 2x4 "int" matrix containing values `1`.
m2 = matrix.new<int>(2, 4, 1)

// Append matrix `m2` to `m1`.
matrix.concat(m1, m2)

// Display matrix elements.
if barstate.islastconfirmedhistory
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Matrix Elements:")
	table.cell(t, 0, 1, str.tostring(m1))
```

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.columns()`, `matrix.rows()`

### matrix.copy()

The function creates a new matrix which is a copy of the original.

```pine
matrix.copy(id) → matrix<type>
```

**Arguments**

- `id` (any matrix type): A matrix object to copy.

**Returns:** A new matrix object of the copied `id` matrix.

```pine
//@version=6
indicator("`matrix.copy()` Example")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 "float" matrix with `1` values.
	var m1 = matrix.new<float>(2, 3, 1)

	// Copy the matrix to a new one.
	// Note that unlike what `matrix.copy()` does,
	// the simple assignment operation `m2 = m1`
	// would NOT create a new copy of the `m1` matrix.
	// It would merely create a copy of its ID referencing the same matrix.
	var m2 = matrix.copy(m1)

	// Display using a table.
	var t = table.new(position.top_right, 5, 2, color.green)
	table.cell(t, 0, 0, "Original Matrix:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 0, "Matrix Copy:")
	table.cell(t, 1, 1, str.tostring(m2))
```

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.columns()`, `matrix.rows()`

### matrix.det()

The function returns the [determinant](https://en.wikipedia.org/wiki/Determinant) of a square matrix.

```pine
matrix.det(id) → series float
matrix.det(id) → series int
```

**Arguments**

- `id` (matrix<int/float> | matrix<int>): A matrix object.

**Returns:** The determinant value of the `id` matrix.

**Remarks**

Function calculation based on the [LU decomposition](https://en.wikipedia.org/wiki/LU_decomposition) algorithm.

```pine
//@version=6
indicator("`matrix.det` Example")

// Create a 2x2 matrix.
var m = matrix.new<float>(2, 2, na)
// Fill the matrix with values.
matrix.set(m, 0, 0,  3)
matrix.set(m, 0, 1,  7)
matrix.set(m, 1, 0,  1)
matrix.set(m, 1, 1, -4)

// Get the determinant of the matrix.
var x = matrix.det(m)

plot(x, 'Matrix determinant')
```

**See also:** `matrix.new<type>()`, `matrix.set()`, `matrix.is_square()`

### matrix.diff()

The function returns a new matrix resulting from the subtraction between matrices `id1` and `id2`, or of matrix `id1` and an `id2` scalar (a numerical value).

```pine
matrix.diff(id1, id2) → matrix<int>
matrix.diff(id1, id2) → matrix<float>
```

**Arguments**

- `id1` (matrix<int> | matrix<int/float>): Matrix to subtract from.
- `id2` (series int/float/matrix<int> | series int/float/matrix<int/float>): Matrix object or a scalar value to be subtracted.

Difference between two matrices

```pine
//@version=6
indicator("`matrix.diff()` Example 1")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix containing values `5`.
	var m1 = matrix.new<float>(2, 3, 5)
	// Create a 2x3 matrix containing values `4`.
	var m2 = matrix.new<float>(2, 3, 4)
	// Create a new matrix containing the difference between matrices `m1` and `m2`.
	var m3 = matrix.diff(m1, m2)

	// Display using a table.
	var t = table.new(position.top_right, 1, 2, color.green)
	table.cell(t, 0, 0, "Difference between two matrices:")
	table.cell(t, 0, 1, str.tostring(m3))
```

Difference between a matrix and a scalar value

```pine
//@version=6
indicator("`matrix.diff()` Example 2")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix with values `4`.
	var m1 = matrix.new<float>(2, 3, 4)

	// Create a new matrix containing the difference between the `m1` matrix and the "int" value `1`.
	var m2 = matrix.diff(m1, 1)

	// Display using a table.
	var t = table.new(position.top_right, 1, 2, color.green)
	table.cell(t, 0, 0, "Difference between a matrix and a scalar:")
	table.cell(t, 0, 1, str.tostring(m2))
```

Difference between two matrices

```pine
//@version=6
indicator("`matrix.diff()` Example 1")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix containing values `5`.
	var m1 = matrix.new<float>(2, 3, 5)
	// Create a 2x3 matrix containing values `4`.
	var m2 = matrix.new<float>(2, 3, 4)
	// Create a new matrix containing the difference between matrices `m1` and `m2`.
	var m3 = matrix.diff(m1, m2)

	// Display using a table.
	var t = table.new(position.top_right, 1, 2, color.green)
	table.cell(t, 0, 0, "Difference between two matrices:")
	table.cell(t, 0, 1, str.tostring(m3))
```

Difference between a matrix and a scalar value

```pine
//@version=6
indicator("`matrix.diff()` Example 2")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix with values `4`.
	var m1 = matrix.new<float>(2, 3, 4)

	// Create a new matrix containing the difference between the `m1` matrix and the "int" value `1`.
	var m2 = matrix.diff(m1, 1)

	// Display using a table.
	var t = table.new(position.top_right, 1, 2, color.green)
	table.cell(t, 0, 0, "Difference between a matrix and a scalar:")
	table.cell(t, 0, 1, str.tostring(m2))
```

**Returns:** A new matrix object containing the difference between `id2` and `id1`.

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.columns()`, `matrix.rows()`

### matrix.eigenvalues()

The function returns an array containing the [eigenvalues](https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors) of a square matrix.

```pine
matrix.eigenvalues(id) → array<float>
matrix.eigenvalues(id) → array<int>
```

**Arguments**

- `id` (matrix<int/float> | matrix<int>): A matrix object.

**Returns:** An array containing the eigenvalues of the `id` matrix.

**Remarks**

The function is calculated using "The Implicit QL Algorithm".

```pine
//@version=6
indicator("`matrix.eigenvalues()` Example")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x2 matrix.
	var m1 = matrix.new<int>(2, 2, na)
	// Fill the matrix with values.
	matrix.set(m1, 0, 0, 2)
	matrix.set(m1, 0, 1, 4)
	matrix.set(m1, 1, 0, 6)
	matrix.set(m1, 1, 1, 8)

	// Get the eigenvalues of the matrix.
	tr = matrix.eigenvalues(m1)

	// Display matrix elements.
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Matrix elements:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 0, "Array of Eigenvalues:")
	table.cell(t, 1, 1, str.tostring(tr))
```

**See also:** `matrix.new<type>()`, `matrix.set()`, `matrix.eigenvectors()`

### matrix.eigenvectors()

Returns a matrix of [eigenvectors](https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors), in which each column is an eigenvector of the `id` matrix.

```pine
matrix.eigenvectors(id) → matrix<float>
matrix.eigenvectors(id) → matrix<int>
```

**Arguments**

- `id` (matrix<int/float> | matrix<int>): A matrix object.

**Returns:** A new matrix containing the eigenvectors of the `id` matrix.

**Remarks**

The function is calculated using "The Implicit QL Algorithm".

```pine
//@version=6
indicator("`matrix.eigenvectors()` Example")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x2 matrix
	var m1 = matrix.new<int>(2, 2, 1)
	// Fill the matrix with values.
	matrix.set(m1, 0, 0, 2)
	matrix.set(m1, 0, 1, 4)
	matrix.set(m1, 1, 0, 6)
	matrix.set(m1, 1, 1, 8)

	// Get the eigenvectors of the matrix.
	m2 = matrix.eigenvectors(m1)

	// Display matrix elements.
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Matrix Elements:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 0, "Matrix Eigenvectors:")
	table.cell(t, 1, 1, str.tostring(m2))
```

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.eigenvalues()`

### matrix.elements_count()

The function returns the total number of all matrix elements.

```pine
matrix.elements_count(id) → series int
```

**Arguments**

- `id` (any matrix type): A matrix object.

**See also:** `matrix.new<type>()`, `matrix.columns()`, `matrix.rows()`

### matrix.fill()

The function fills a rectangular area of the `id` matrix defined by the indices `from_column` to `to_column` (not including it) and `from_row` to `to_row`(not including it) with the `value`.

```pine
matrix.fill(id, value, from_row, to_row, from_column, to_column) → void
```

**Arguments**

- `id` (any matrix type): A matrix object.
- `value` (series <type of the matrix's elements>): The value to fill with.
- `from_row` (series int, optional): Row index from which the fill will begin (inclusive). Optional. The default value is 0.
- `to_row` (series int, optional): Row index where the fill will end (not inclusive). Optional. The default value is `matrix.rows()`.
- `from_column` (series int, optional): Column index from which the fill will begin (inclusive). Optional. The default value is 0.
- `to_column` (series int, optional): Column index where the fill will end (non inclusive). Optional. The default value is `matrix.columns()`.

```pine
//@version=6
indicator("`matrix.fill()` Example")

// Create a 4x5 "int" matrix containing values `0`.
m = matrix.new<float>(4, 5, 0)

// Fill the intersection of rows 1 to 2 and columns 2 to 3 of the matrix with `hl2` values.
matrix.fill(m, hl2, 0, 2, 1, 3)

// Display using a label.
if barstate.islastconfirmedhistory
	label.new(bar_index, high, str.tostring(m))
```

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.columns()`, `matrix.rows()`

### matrix.get()

The function returns the element with the specified index of the matrix.

```pine
matrix.get(id, row, column) → <matrix_type>
```

**Arguments**

- `id` (any matrix type): A matrix object.
- `row` (series int): Index of the required row.
- `column` (series int): Index of the required column.

**Returns:** The value of the element at the `row` and `column` index of the `id` matrix.

**Remarks**

Indexing of the rows and columns starts at zero.

```pine
//@version=6
indicator("`matrix.get()` Example", "", true)

// Create a 2x3 "float" matrix from the `hl2` values.
m = matrix.new<float>(2, 3, hl2)

// Return the value of the element at index [0, 0] of matrix `m`.
x = matrix.get(m, 0, 0)

plot(x)
```

**See also:** `matrix.new<type>()`, `matrix.set()`, `matrix.columns()`, `matrix.rows()`

### matrix.inv()

The function returns the [inverse](https://en.wikipedia.org/wiki/Invertible_matrix) of a square matrix.

```pine
matrix.inv(id) → matrix<float>
matrix.inv(id) → matrix<int>
```

**Arguments**

- `id` (matrix<int/float> | matrix<int>): A matrix object.

**Returns:** A new matrix, which is the inverse of the `id` matrix.

**Remarks**

The function is calculated using the [LU decomposition](https://en.wikipedia.org/wiki/LU_decomposition) algorithm.

```pine
//@version=6
indicator("`matrix.inv()` Example")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x2 matrix.
	var m1 = matrix.new<int>(2, 2, na)
	// Fill the matrix with values.
	matrix.set(m1, 0, 0, 1)
	matrix.set(m1, 0, 1, 2)
	matrix.set(m1, 1, 0, 3)
	matrix.set(m1, 1, 1, 4)

	// Inverse of the matrix.
	var m2 = matrix.inv(m1)

	// Display matrix elements.
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Original Matrix:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 0, "Inverse matrix:")
	table.cell(t, 1, 1, str.tostring(m2))
```

**See also:** `matrix.new<type>()`, `matrix.set()`, `matrix.pinv()`, `matrix.copy()`, `str.tostring()`

### matrix.is_antidiagonal()

The function determines if the matrix is [anti-diagonal](https://en.wikipedia.org/wiki/Anti-diagonal_matrix) (all elements outside the secondary diagonal are zero).

```pine
matrix.is_antidiagonal(id) → series bool
```

**Arguments**

- `id` (matrix<int/float>): Matrix object to test.

**Returns:** Returns true if the `id` matrix is ​​anti-diagonal, false otherwise.

**Remarks**

Returns false with non-square matrices.

**See also:** `matrix.new<type>()`, `matrix.set()`, `matrix.is_square()`, `matrix.is_identity()`, `matrix.is_diagonal()`

### matrix.is_antisymmetric()

The function determines if a matrix is [antisymmetric](https://en.wikipedia.org/wiki/Skew-symmetric_matrix) (its [transpose](https://en.wikipedia.org/wiki/Transpose) equals its negative).

```pine
matrix.is_antisymmetric(id) → series bool
```

**Arguments**

- `id` (matrix<int/float>): Matrix object to test.

**Returns:** Returns true, if the `id` matrix is antisymmetric, false otherwise.

**Remarks**

Returns false with non-square matrices.

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.is_square()`

### matrix.is_binary()

The function determines if the matrix is [binary](https://en.wikipedia.org/wiki/Logical_matrix) (when all elements of the matrix are 0 or 1).

```pine
matrix.is_binary(id) → series bool
```

**Arguments**

- `id` (matrix<int/float>): Matrix object to test.

**Returns:** Returns true if the `id` matrix is binary, false otherwise.

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`

### matrix.is_diagonal()

The function determines if the matrix is [diagonal](https://en.wikipedia.org/wiki/Diagonal_matrix) (all elements outside the main diagonal are zero).

```pine
matrix.is_diagonal(id) → series bool
```

**Arguments**

- `id` (matrix<int/float>): Matrix object to test.

**Returns:** Returns true if the `id` matrix is diagonal, false otherwise.

**Remarks**

Returns false with non-square matrices.

**See also:** `matrix.new<type>()`, `matrix.set()`, `matrix.is_square()`, `matrix.is_identity()`, `matrix.is_antidiagonal()`

### matrix.is_identity()

The function determines if a matrix is an [identity matrix](https://en.wikipedia.org/wiki/Identity_matrix) (elements with ones on the [main diagonal](https://en.wikipedia.org/wiki/Main_diagonal) and zeros elsewhere).

```pine
matrix.is_identity(id) → series bool
```

**Arguments**

- `id` (matrix<int/float>): Matrix object to test.

**Returns:** Returns true if `id` is an identity matrix, false otherwise.

**Remarks**

Returns false with non-square matrices.

**See also:** `matrix.new<type>()`, `matrix.is_square()`, `matrix.is_diagonal()`

### matrix.is_square()

The function determines if the matrix is [square](https://en.wikipedia.org/wiki/Square_matrix) (it has the same number of rows and columns).

```pine
matrix.is_square(id) → series bool
```

**Arguments**

- `id` (any matrix type): Matrix object to test.

**Returns:** Returns true if the `id` matrix is square, false otherwise.

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.columns()`, `matrix.rows()`

### matrix.is_stochastic()

The function determines if the matrix is [stochastic](https://en.wikipedia.org/wiki/Stochastic_matrix).

```pine
matrix.is_stochastic(id) → series bool
```

**Arguments**

- `id` (matrix<int/float>): Matrix object to test.

**Returns:** Returns true if the `id` matrix is stochastic, false otherwise.

**See also:** `matrix.new<type>()`, `matrix.set()`

### matrix.is_symmetric()

The function determines if a [square matrix](https://en.wikipedia.org/wiki/Square_matrix) is [symmetric](https://en.wikipedia.org/wiki/Symmetric_matrix) (elements are symmetric with respect to the [main diagonal](https://en.wikipedia.org/wiki/Main_diagonal)).

```pine
matrix.is_symmetric(id) → series bool
```

**Arguments**

- `id` (matrix<int/float>): Matrix object to test.

**Returns:** Returns true if the `id` matrix is symmetric, false otherwise.

**Remarks**

Returns false with non-square matrices.

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.is_square()`

### matrix.is_triangular()

The function determines if the matrix is [triangular](https://en.wikipedia.org/wiki/Triangular_matrix) (if all elements above or below the [main diagonal](https://en.wikipedia.org/wiki/Main_diagonal) are zero).

```pine
matrix.is_triangular(id) → series bool
```

**Arguments**

- `id` (matrix<int/float>): Matrix object to test.

**Returns:** Returns true if the `id` matrix is triangular, false otherwise.

**Remarks**

Returns false with non-square matrices.

**See also:** `matrix.new<type>()`, `matrix.set()`, `matrix.is_square()`

### matrix.is_zero()

The function determines if all elements of the matrix are zero.

```pine
matrix.is_zero(id) → series bool
```

**Arguments**

- `id` (matrix<int/float>): Matrix object to check.

**Returns:** Returns true if all elements of the `id` matrix are zero, false otherwise.

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`

### matrix.kron()

The function returns the [Kronecker product](https://en.wikipedia.org/wiki/Kronecker_product) for the `id1` and `id2` matrices.

```pine
matrix.kron(id1, id2) → matrix<float>
matrix.kron(id1, id2) → matrix<int>
```

**Arguments**

- `id1` (matrix<int/float> | matrix<int>): First matrix object.
- `id2` (matrix<int/float> | matrix<int>): Second matrix object.

**Returns:** A new matrix containing the [Kronecker product](https://en.wikipedia.org/wiki/Kronecker_product) of `id1` and `id2`.

```pine
//@version=6
indicator("`matrix.kron()` Example")

// Display using a table.
if barstate.islastconfirmedhistory
	// Create two matrices with default values `1` and `2`.
	var m1 = matrix.new<float>(2, 2, 1)
	var m2 = matrix.new<float>(2, 2, 2)

	// Calculate the Kronecker product of the matrices.
	var m3 = matrix.kron(m1, m2)

	// Display matrix elements.
	var t = table.new(position.top_right, 5, 2, color.green)
	table.cell(t, 0, 0, "Matrix 1:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 1, "⊗")
	table.cell(t, 2, 0, "Matrix 2:")
	table.cell(t, 2, 1, str.tostring(m2))
	table.cell(t, 3, 1, "=")
	table.cell(t, 4, 0, "Kronecker product:")
	table.cell(t, 4, 1, str.tostring(m3))
```

**See also:** `matrix.new<type>()`, `matrix.mult()`, `str.tostring()`, `table.new()`

### matrix.max()

The function returns the largest value from the matrix elements.

```pine
matrix.max(id) → series float
matrix.max(id) → series int
```

**Arguments**

- `id` (matrix<int/float> | matrix<int>): A matrix object.

**Returns:** The maximum value from the `id` matrix.

```pine
//@version=6
indicator("`matrix.max()` Example")

// Create a 2x2 matrix.
var m = matrix.new<int>(2, 2, na)
// Fill the matrix with values.
matrix.set(m, 0, 0, 1)
matrix.set(m, 0, 1, 2)
matrix.set(m, 1, 0, 3)
matrix.set(m, 1, 1, 4)

// Get the maximum value in the matrix.
var x = matrix.max(m)

plot(x, 'Matrix maximum value')
```

**See also:** `matrix.new<type>()`, `matrix.min()`, `matrix.avg()`, `matrix.sort()`

### matrix.median()

The function calculates the [median](https://en.wikipedia.org/wiki/Median) ("the middle" value) of matrix elements.

```pine
matrix.median(id) → series float
matrix.median(id) → series int
```

**Arguments**

- `id` (matrix<int/float> | matrix<int>): A matrix object.

**Remarks**

Note that `na` elements of the matrix are not considered when calculating the median.

```pine
//@version=6
indicator("`matrix.median()` Example")

// Create a 2x2 matrix.
m = matrix.new<int>(2, 2, na)
// Fill the matrix with values.
matrix.set(m, 0, 0, 1)
matrix.set(m, 0, 1, 2)
matrix.set(m, 1, 0, 3)
matrix.set(m, 1, 1, 4)

// Get the median of the matrix.
x = matrix.median(m)

plot(x, 'Median of the matrix')
```

**See also:** `matrix.new<type>()`, `matrix.mode()`, `matrix.sort()`, `matrix.avg()`

### matrix.min()

The function returns the smallest value from the matrix elements.

```pine
matrix.min(id) → series float
matrix.min(id) → series int
```

**Arguments**

- `id` (matrix<int/float> | matrix<int>): A matrix object.

**Returns:** The smallest value from the `id` matrix.

```pine
//@version=6
indicator("`matrix.min()` Example")

// Create a 2x2 matrix.
var m = matrix.new<int>(2, 2, na)
// Fill the matrix with values.
matrix.set(m, 0, 0, 1)
matrix.set(m, 0, 1, 2)
matrix.set(m, 1, 0, 3)
matrix.set(m, 1, 1, 4)

// Get the minimum value from the matrix.
var x = matrix.min(m)

plot(x, 'Matrix minimum value')
```

**See also:** `matrix.new<type>()`, `matrix.max()`, `matrix.avg()`, `matrix.sort()`

### matrix.mode()

The function calculates the [mode](https://en.wikipedia.org/wiki/Mode_(statistics)) of the matrix, which is the most frequently occurring value from the matrix elements. When there are multiple values occurring equally frequently, the function returns the smallest of those values.

```pine
matrix.mode(id) → series float
matrix.mode(id) → series int
```

**Arguments**

- `id` (matrix<int/float> | matrix<int>): A matrix object.

**Returns:** The most frequently occurring value from the `id` matrix. If none exists, returns the smallest value instead.

**Remarks**

Note that `na` elements of the matrix are not considered when calculating the mode.

```pine
//@version=6
indicator("`matrix.mode()` Example")

// Create a 2x2 matrix.
var m = matrix.new<int>(2, 2, na)
// Fill the matrix with values.
matrix.set(m, 0, 0, 0)
matrix.set(m, 0, 1, 0)
matrix.set(m, 1, 0, 1)
matrix.set(m, 1, 1, 1)

// Get the mode of the matrix.
var x = matrix.mode(m)

plot(x, 'Mode of the matrix')
```

**See also:** `matrix.new<type>()`, `matrix.set()`, `matrix.median()`, `matrix.sort()`, `matrix.avg()`

### matrix.mult()

The function returns a new matrix resulting from the [product](https://en.wikipedia.org/wiki/Matrix_multiplication) between the matrices `id1` and `id2`, or between an `id1` matrix and an `id2` scalar (a numerical value), or between an `id1` matrix and an `id2` vector (an array of values).

```pine
matrix.mult(id1, id2) → matrix<int>
matrix.mult(id1, id2) → matrix<float>
matrix.mult(id1, id2) → array<int>
matrix.mult(id1, id2) → array<float>
```

**Arguments**

- `id1` (matrix<int> | matrix<int/float>): First matrix object.
- `id2` (series int/float/matrix<int> | series int/float/matrix<int/float> | array<int> | array<int/float>): Second matrix object, value or array.

Product of two matrices

```pine
//@version=6
indicator("`matrix.mult()` Example 1")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 6x2 matrix containing values `5`.
	var m1 = matrix.new<float>(6, 2, 5)
	// Create a 2x3 matrix containing values `4`.
	// Note that it must have the same quantity of rows as there are columns in the first matrix.
	var m2 = matrix.new<float>(2, 3, 4)
	// Create a new matrix from the multiplication of the two matrices.
	var m3 = matrix.mult(m1, m2)

	// Display using a table.
	var t = table.new(position.top_right, 1, 2, color.green)
	table.cell(t, 0, 0, "Product of two matrices:")
	table.cell(t, 0, 1, str.tostring(m3))
```

Product of a matrix and a scalar

```pine
//@version=6
indicator("`matrix.mult()` Example 2")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix containing values `4`.
	var m1 = matrix.new<float>(2, 3, 4)

	// Create a new matrix from the product of the two matrices.
	scalar = 5
	var m2 = matrix.mult(m1, scalar)

	// Display using a table.
	var t = table.new(position.top_right, 5, 2, color.green)
	table.cell(t, 0, 0, "Matrix 1:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 1, "x")
	table.cell(t, 2, 0, "Scalar:")
	table.cell(t, 2, 1, str.tostring(scalar))
	table.cell(t, 3, 1, "=")
	table.cell(t, 4, 0, "Matrix 2:")
	table.cell(t, 4, 1, str.tostring(m2))
```

Product of a matrix and an array vector

```pine
//@version=6
indicator("`matrix.mult()` Example 3")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix containing values `4`.
	var m1 = matrix.new<int>(2, 3, 4)

	// Create an array of three elements.
	var array<int> a = array.from(1, 1, 1)

	// Create a new matrix containing the product of the `m1` matrix and the `a` array.
	var m3 = matrix.mult(m1, a)

	// Display using a table.
	var t = table.new(position.top_right, 5, 2, color.green)
	table.cell(t, 0, 0, "Matrix 1:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 1, "x")
	table.cell(t, 2, 0, "Value:")
	table.cell(t, 2, 1, str.tostring(a, " "))
	table.cell(t, 3, 1, "=")
	table.cell(t, 4, 0, "Matrix 3:")
	table.cell(t, 4, 1, str.tostring(m3))
```

Product of two matrices

```pine
//@version=6
indicator("`matrix.mult()` Example 1")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 6x2 matrix containing values `5`.
	var m1 = matrix.new<float>(6, 2, 5)
	// Create a 2x3 matrix containing values `4`.
	// Note that it must have the same quantity of rows as there are columns in the first matrix.
	var m2 = matrix.new<float>(2, 3, 4)
	// Create a new matrix from the multiplication of the two matrices.
	var m3 = matrix.mult(m1, m2)

	// Display using a table.
	var t = table.new(position.top_right, 1, 2, color.green)
	table.cell(t, 0, 0, "Product of two matrices:")
	table.cell(t, 0, 1, str.tostring(m3))
```

Product of a matrix and a scalar

```pine
//@version=6
indicator("`matrix.mult()` Example 2")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix containing values `4`.
	var m1 = matrix.new<float>(2, 3, 4)

	// Create a new matrix from the product of the two matrices.
	scalar = 5
	var m2 = matrix.mult(m1, scalar)

	// Display using a table.
	var t = table.new(position.top_right, 5, 2, color.green)
	table.cell(t, 0, 0, "Matrix 1:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 1, "x")
	table.cell(t, 2, 0, "Scalar:")
	table.cell(t, 2, 1, str.tostring(scalar))
	table.cell(t, 3, 1, "=")
	table.cell(t, 4, 0, "Matrix 2:")
	table.cell(t, 4, 1, str.tostring(m2))
```

Product of a matrix and an array vector

```pine
//@version=6
indicator("`matrix.mult()` Example 3")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix containing values `4`.
	var m1 = matrix.new<int>(2, 3, 4)

	// Create an array of three elements.
	var array<int> a = array.from(1, 1, 1)

	// Create a new matrix containing the product of the `m1` matrix and the `a` array.
	var m3 = matrix.mult(m1, a)

	// Display using a table.
	var t = table.new(position.top_right, 5, 2, color.green)
	table.cell(t, 0, 0, "Matrix 1:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 1, "x")
	table.cell(t, 2, 0, "Value:")
	table.cell(t, 2, 1, str.tostring(a, " "))
	table.cell(t, 3, 1, "=")
	table.cell(t, 4, 0, "Matrix 3:")
	table.cell(t, 4, 1, str.tostring(m3))
```

Product of two matrices

```pine
//@version=6
indicator("`matrix.mult()` Example 1")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 6x2 matrix containing values `5`.
	var m1 = matrix.new<float>(6, 2, 5)
	// Create a 2x3 matrix containing values `4`.
	// Note that it must have the same quantity of rows as there are columns in the first matrix.
	var m2 = matrix.new<float>(2, 3, 4)
	// Create a new matrix from the multiplication of the two matrices.
	var m3 = matrix.mult(m1, m2)

	// Display using a table.
	var t = table.new(position.top_right, 1, 2, color.green)
	table.cell(t, 0, 0, "Product of two matrices:")
	table.cell(t, 0, 1, str.tostring(m3))
```

Product of a matrix and a scalar

```pine
//@version=6
indicator("`matrix.mult()` Example 2")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix containing values `4`.
	var m1 = matrix.new<float>(2, 3, 4)

	// Create a new matrix from the product of the two matrices.
	scalar = 5
	var m2 = matrix.mult(m1, scalar)

	// Display using a table.
	var t = table.new(position.top_right, 5, 2, color.green)
	table.cell(t, 0, 0, "Matrix 1:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 1, "x")
	table.cell(t, 2, 0, "Scalar:")
	table.cell(t, 2, 1, str.tostring(scalar))
	table.cell(t, 3, 1, "=")
	table.cell(t, 4, 0, "Matrix 2:")
	table.cell(t, 4, 1, str.tostring(m2))
```

Product of a matrix and an array vector

```pine
//@version=6
indicator("`matrix.mult()` Example 3")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix containing values `4`.
	var m1 = matrix.new<int>(2, 3, 4)

	// Create an array of three elements.
	var array<int> a = array.from(1, 1, 1)

	// Create a new matrix containing the product of the `m1` matrix and the `a` array.
	var m3 = matrix.mult(m1, a)

	// Display using a table.
	var t = table.new(position.top_right, 5, 2, color.green)
	table.cell(t, 0, 0, "Matrix 1:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 1, "x")
	table.cell(t, 2, 0, "Value:")
	table.cell(t, 2, 1, str.tostring(a, " "))
	table.cell(t, 3, 1, "=")
	table.cell(t, 4, 0, "Matrix 3:")
	table.cell(t, 4, 1, str.tostring(m3))
```

Product of two matrices

```pine
//@version=6
indicator("`matrix.mult()` Example 1")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 6x2 matrix containing values `5`.
	var m1 = matrix.new<float>(6, 2, 5)
	// Create a 2x3 matrix containing values `4`.
	// Note that it must have the same quantity of rows as there are columns in the first matrix.
	var m2 = matrix.new<float>(2, 3, 4)
	// Create a new matrix from the multiplication of the two matrices.
	var m3 = matrix.mult(m1, m2)

	// Display using a table.
	var t = table.new(position.top_right, 1, 2, color.green)
	table.cell(t, 0, 0, "Product of two matrices:")
	table.cell(t, 0, 1, str.tostring(m3))
```

Product of a matrix and a scalar

```pine
//@version=6
indicator("`matrix.mult()` Example 2")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix containing values `4`.
	var m1 = matrix.new<float>(2, 3, 4)

	// Create a new matrix from the product of the two matrices.
	scalar = 5
	var m2 = matrix.mult(m1, scalar)

	// Display using a table.
	var t = table.new(position.top_right, 5, 2, color.green)
	table.cell(t, 0, 0, "Matrix 1:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 1, "x")
	table.cell(t, 2, 0, "Scalar:")
	table.cell(t, 2, 1, str.tostring(scalar))
	table.cell(t, 3, 1, "=")
	table.cell(t, 4, 0, "Matrix 2:")
	table.cell(t, 4, 1, str.tostring(m2))
```

Product of a matrix and an array vector

```pine
//@version=6
indicator("`matrix.mult()` Example 3")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix containing values `4`.
	var m1 = matrix.new<int>(2, 3, 4)

	// Create an array of three elements.
	var array<int> a = array.from(1, 1, 1)

	// Create a new matrix containing the product of the `m1` matrix and the `a` array.
	var m3 = matrix.mult(m1, a)

	// Display using a table.
	var t = table.new(position.top_right, 5, 2, color.green)
	table.cell(t, 0, 0, "Matrix 1:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 1, "x")
	table.cell(t, 2, 0, "Value:")
	table.cell(t, 2, 1, str.tostring(a, " "))
	table.cell(t, 3, 1, "=")
	table.cell(t, 4, 0, "Matrix 3:")
	table.cell(t, 4, 1, str.tostring(m3))
```

**Returns:** A new matrix object containing the product of `id2` and `id1`.

**See also:** `matrix.new<type>()`, `matrix.sum()`, `matrix.diff()`

### matrix.new<type>

The function creates a new matrix object. A matrix is a two-dimensional data structure containing rows and columns. All elements in the matrix must be of the type specified in the type template ("<type>").

```pine
matrix.new<type>(rows, columns, initial_value) → matrix<type>
```

**Arguments**

- `rows` (series int, optional): Initial row count of the matrix. Optional. The default value is 0.
- `columns` (series int, optional): Initial column count of the matrix. Optional. The default value is 0.
- `initial_value` (<matrix_type>, optional): Initial value of all matrix elements. Optional. The default is 'na'.

Create a matrix of elements with the same initial value

```pine
//@version=6
indicator("`matrix.new<type>()` Example 1")

// Create a 2x3 (2 rows x 3 columns) "int" matrix with values zero.
var m = matrix.new<int>(2, 3, 0)

// Display using a label.
if barstate.islastconfirmedhistory
	label.new(bar_index, high, str.tostring(m))
```

Create a matrix from array values

```pine
//@version=6
indicator("`matrix.new<type>()` Example 2")

// Function to create a matrix whose rows are filled with array values.
matrixFromArray(int rows, int columns, array<float> data) =>
	m = matrix.new<float>(rows, columns)
	for i = 0 to rows <= 0 ? na : rows - 1
		for j = 0 to columns <= 0 ? na : columns - 1
			matrix.set(m, i, j, array.get(data, i * columns + j))
	m

// Create a 3x3 matrix from an array of values.
var m1 = matrixFromArray(3, 3, array.from(1, 2, 3, 4, 5, 6, 7, 8, 9))
// Display using a label.
if barstate.islastconfirmedhistory
	label.new(bar_index, high, str.tostring(m1))
```

Create a matrix from an `input.text_area()` field

```pine
//@version=6
indicator("`matrix.new<type>()` Example 3")

// Function to create a matrix from a text string.
// Values in a row must be separated by a space. Each line is one row.
matrixFromInputArea(stringOfValues) =>
	var rowsArray = str.split(stringOfValues, "\n")
	var rows = array.size(rowsArray)
	var cols = array.size(str.split(array.get(rowsArray, 0), " "))
	var matrix = matrix.new<float>(rows, cols, na)
	row = 0
	for rowString in rowsArray
		col = 0
		values = str.split(rowString, " ")
		for val in values
			matrix.set(matrix, row, col, str.tonumber(val))
			col += 1
		row += 1
	matrix

stringInput = input.text_area("1 2 3\n4 5 6\n7 8 9")
var m = matrixFromInputArea(stringInput)

// Display using a label.
if barstate.islastconfirmedhistory
	label.new(bar_index, high, str.tostring(m))
```

Create matrix from random values

```pine
//@version=6
indicator("`matrix.new<type>()` Example 4")

// Function to create a matrix with random values (0.0 to 1.0).
matrixRandom(int rows, int columns)=>
	result = matrix.new<float>(rows, columns)
	for i = 0 to rows - 1
		for j = 0 to columns - 1
			matrix.set(result, i, j, math.random())
	result

// Create a 2x3 matrix with random values.
var m = matrixRandom(2, 3)

// Display using a label.
if barstate.islastconfirmedhistory
	label.new(bar_index, high, str.tostring(m))
```

**Returns:** The ID of the new matrix object.

**See also:** `matrix.set()`, `matrix.fill()`, `matrix.columns()`, `matrix.rows()`, `array.new<type>()`

### matrix.pinv()

The function returns the [pseudoinverse](https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_inverse) of a matrix.

```pine
matrix.pinv(id) → matrix<float>
matrix.pinv(id) → matrix<int>
```

**Arguments**

- `id` (matrix<int/float> | matrix<int>): A matrix object.

**Returns:** A new matrix containing the pseudoinverse of the `id` matrix.

**Remarks**

The function is calculated using a [Moore–Penrose](https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_inverse#Definition) inverse formula based on singular-value decomposition of a matrix. For non-singular square matrices this function returns the result of `matrix.inv()`.

```pine
//@version=6
indicator("`matrix.pinv()` Example")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x2 matrix.
	var m1 = matrix.new<int>(2, 2, na)
	// Fill the matrix with values.
	matrix.set(m1, 0, 0, 1)
	matrix.set(m1, 0, 1, 2)
	matrix.set(m1, 1, 0, 3)
	matrix.set(m1, 1, 1, 4)

	// Pseudoinverse of the matrix.
	var m2 = matrix.pinv(m1)

	// Display matrix elements.
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Original Matrix:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 0, "Pseudoinverse matrix:")
	table.cell(t, 1, 1, str.tostring(m2))
```

**See also:** `matrix.new<type>()`, `matrix.set()`, `matrix.inv()`

### matrix.pow()

The function calculates the product of the matrix by itself `power` times.

```pine
matrix.pow(id, power) → matrix<float>
matrix.pow(id, power) → matrix<int>
```

**Arguments**

- `id` (matrix<int/float> | matrix<int>): A matrix object.
- `power` (series int): The number of times the matrix will be multiplied by itself.

**Returns:** The product of the `id` matrix by itself `power` times.

```pine
//@version=6
indicator("`matrix.pow()` Example")

// Display using a table.
if barstate.islastconfirmedhistory
	// Create a 2x2 matrix.
	var m1 = matrix.new<int>(2, 2, 2)
	// Calculate the power of three of the matrix.
	var m2 = matrix.pow(m1, 3)

	// Display matrix elements.
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Original Matrix:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 0, "Matrix³:")
	table.cell(t, 1, 1, str.tostring(m2))
```

**See also:** `matrix.new<type>()`, `matrix.set()`, `matrix.mult()`

### matrix.rank()

The function calculates the [rank](https://en.wikipedia.org/wiki/Rank_(linear_algebra)) of the matrix.

```pine
matrix.rank(id) → series int
```

**Arguments**

- `id` (any matrix type): A matrix object.

**Returns:** The rank of the `id` matrix.

```pine
//@version=6
indicator("`matrix.rank()` Example")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x2 matrix.
	var m1 = matrix.new<int>(2, 2, na)
	// Fill the matrix with values.
	matrix.set(m1, 0, 0, 1)
	matrix.set(m1, 0, 1, 2)
	matrix.set(m1, 1, 0, 3)
	matrix.set(m1, 1, 1, 4)

	// Get the rank of the matrix.
	r = matrix.rank(m1)

	// Display matrix elements.
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Matrix elements:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 0, "Rank of the matrix:")
	table.cell(t, 1, 1, str.tostring(r))
```

**See also:** `matrix.new<type>()`, `matrix.set()`, `str.tostring()`

### matrix.remove_col()

The function removes the column at `column` index of the `id` matrix and returns an array containing the removed column's values.

```pine
matrix.remove_col(id, column) → array<type>
```

**Arguments**

- `id` (any matrix type): A matrix object.
- `column` (series int, optional): The index of the column to be removed. Optional. The default value is `matrix.columns()`.

**Returns:** An array containing the elements of the column removed from the `id` matrix.

**Remarks**

Indexing of rows and columns starts at zero. It is far more efficient to declare matrices with explicit dimensions than to build them by adding or removing columns. Deleting a column is also much slower than deleting a row with the `matrix.remove_row()` function.

```pine
//@version=6
indicator("matrix_remove_col", overlay = true)

// Create a 2x2 matrix with ones.
var matrixOrig = matrix.new<int>(2, 2, 1)

// Set values to the 'matrixOrig' matrix.
matrix.set(matrixOrig, 0, 1, 2)
matrix.set(matrixOrig, 1, 0, 3)
matrix.set(matrixOrig, 1, 1, 4)

// Create a copy of the 'matrixOrig' matrix.
matrixCopy = matrix.copy(matrixOrig)

// Remove the first column from the `matrixCopy` matrix.
arr = matrix.remove_col(matrixCopy, 0)

// Display matrix elements.
if barstate.islastconfirmedhistory
	var t = table.new(position.top_right, 3, 2, color.green)
	table.cell(t, 0, 0, "Original Matrix:")
	table.cell(t, 0, 1, str.tostring(matrixOrig))
	table.cell(t, 1, 0, "Removed Elements:")
	table.cell(t, 1, 1, str.tostring(arr))
	table.cell(t, 2, 0, "Result Matrix:")
	table.cell(t, 2, 1, str.tostring(matrixCopy))
```

**See also:** `matrix.new<type>()`, `matrix.set()`, `matrix.copy()`, `matrix.remove_row()`

### matrix.remove_row()

The function removes the row at `row` index of the `id` matrix and returns an array containing the removed row's values.

```pine
matrix.remove_row(id, row) → array<type>
```

**Arguments**

- `id` (any matrix type): A matrix object.
- `row` (series int, optional): The index of the row to be deleted. Optional. The default value is `matrix.rows()`.

**Returns:** An array containing the elements of the row removed from the `id` matrix.

**Remarks**

Indexing of rows and columns starts at zero. It is far more efficient to declare matrices with explicit dimensions than to build them by adding or removing rows.

```pine
//@version=6
indicator("matrix_remove_row", overlay = true)

// Create a 2x2 "int" matrix containing values `1`.
var matrixOrig = matrix.new<int>(2, 2, 1)

// Set values to the 'matrixOrig' matrix.
matrix.set(matrixOrig, 0, 1, 2)
matrix.set(matrixOrig, 1, 0, 3)
matrix.set(matrixOrig, 1, 1, 4)

// Create a copy of the 'matrixOrig' matrix.
matrixCopy = matrix.copy(matrixOrig)

// Remove the first row from the matrix `matrixCopy`.
arr = matrix.remove_row(matrixCopy, 0)

// Display matrix elements.
if barstate.islastconfirmedhistory
	var t = table.new(position.top_right, 3, 2, color.green)
	table.cell(t, 0, 0, "Original Matrix:")
	table.cell(t, 0, 1, str.tostring(matrixOrig))
	table.cell(t, 1, 0, "Removed Elements:")
	table.cell(t, 1, 1, str.tostring(arr))
	table.cell(t, 2, 0, "Result Matrix:")
	table.cell(t, 2, 1, str.tostring(matrixCopy))
```

**See also:** `matrix.new<type>()`, `matrix.set()`, `matrix.copy()`, `matrix.remove_col()`

### matrix.reshape()

The function rebuilds the `id` matrix to `rows` x `cols` dimensions.

```pine
matrix.reshape(id, rows, columns) → void
```

**Arguments**

- `id` (any matrix type): A matrix object.
- `rows` (series int): The number of rows of the reshaped matrix.
- `columns` (series int): The number of columns of the reshaped matrix.

```pine
//@version=6
indicator("`matrix.reshape()` Example")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix.
	var m1 = matrix.new<float>(2, 3)
	// Fill the matrix with values.
	matrix.set(m1, 0, 0, 1)
	matrix.set(m1, 0, 1, 2)
	matrix.set(m1, 0, 2, 3)
	matrix.set(m1, 1, 0, 4)
	matrix.set(m1, 1, 1, 5)
	matrix.set(m1, 1, 2, 6)

	// Copy the matrix to a new one.
	var m2 = matrix.copy(m1)

	// Reshape the copy to a 3x2.
	matrix.reshape(m2, 3, 2)

	// Display using a table.
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Original matrix:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 0, "Reshaped matrix:")
	table.cell(t, 1, 1, str.tostring(m2))
```

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.add_row()`, `matrix.add_col()`

### matrix.reverse()

The function reverses the order of rows and columns in the matrix `id`. The first row and first column become the last, and the last become the first.

```pine
matrix.reverse(id) → void
```

**Arguments**

- `id` (any matrix type): A matrix object.

```pine
//@version=6
indicator("`matrix.reverse()` Example")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Copy the matrix to a new one.
	var m1 = matrix.new<int>(2, 2, na)
	// Fill the matrix with values.
	matrix.set(m1, 0, 0, 1)
	matrix.set(m1, 0, 1, 2)
	matrix.set(m1, 1, 0, 3)
	matrix.set(m1, 1, 1, 4)

	// Copy matrix elements to a new matrix.
	var m2 = matrix.copy(m1)

	// Reverse the `m2` copy of the original matrix.
	matrix.reverse(m2)

	// Display using a table.
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Original matrix:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 0, "Reversed matrix:")
	table.cell(t, 1, 1, str.tostring(m2))
```

**See also:** `matrix.new<type>()`, `matrix.set()`, `matrix.columns()`, `matrix.rows()`, `matrix.reshape()`

### matrix.row()

The function creates a one-dimensional array from the elements of a matrix row.

```pine
matrix.row(id, row) → array<type>
```

**Arguments**

- `id` (any matrix type): A matrix object.
- `row` (series int): Index of the required row.

**Returns:** An array ID containing the `row` values of the `id` matrix.

**Remarks**

Indexing of rows starts at 0.

```pine
//@version=6
indicator("`matrix.row()` Example", "", true)

// Create a 2x3 "float" matrix from `hlc3` values.
m = matrix.new<float>(2, 3, hlc3)

// Return an array with the values of the first row of the matrix.
a = matrix.row(m, 0)

// Plot the first value from the array `a`.
plot(array.get(a, 0))
```

**See also:** `matrix.new<type>()`, `matrix.get()`, `array.get()`, `matrix.col()`, `matrix.rows()`

### matrix.rows()

The function returns the number of rows in the matrix.

```pine
matrix.rows(id) → series int
```

**Arguments**

- `id` (any matrix type): A matrix object.

**Returns:** The number of rows in the matrix `id`.

```pine
//@version=6
indicator("`matrix.rows()` Example")

// Create a 2x6 matrix with values `0`.
var m = matrix.new<int>(2, 6, 0)

// Get the quantity of rows in the matrix.
var x = matrix.rows(m)

// Display using a label.
if barstate.islastconfirmedhistory
	label.new(bar_index, high, "Rows: " + str.tostring(x) + "\n" + str.tostring(m))
```

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.columns()`, `matrix.row()`

### matrix.set()

The function assigns `value` to the element at the `row` and `column` of the `id` matrix.

```pine
matrix.set(id, row, column, value) → void
```

**Arguments**

- `id` (any matrix type): A matrix object.
- `row` (series int): The row index of the element to be modified.
- `column` (series int): The column index of the element to be modified.
- `value` (series <type of the matrix's elements>): The new value to be set.

```pine
//@version=6
indicator("`matrix.set()` Example")

// Create a 2x3 "int" matrix containing values `4`.
m = matrix.new<int>(2, 3, 4)

// Replace the value of element at row 1 and column 2 with value `3`.
matrix.set(m, 0, 1, 3)

// Display using a label.
if barstate.islastconfirmedhistory
	label.new(bar_index, high, str.tostring(m))
```

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.columns()`, `matrix.rows()`

### matrix.sort()

The function rearranges the rows in the `id` matrix following the sorted order of the values in the `column`.

```pine
matrix.sort(id, column, order) → void
matrix.sort(id, column, order, sort_field) → void
```

**Arguments**

- `id` (matrix<int/float/string> | any matrix type): A matrix object to be sorted.
- `column` (series int, optional): Index of the column whose sorted values determine the new order of rows. Optional. The default value is 0.
- `order` (series sort_order, optional): The sort order. Possible values: `order.ascending` (default), `order.descending`.
- `sort_field` (const int/string, optional): If the `id` collection contains elements of a user-defined type, this parameter specifies which of the type's fields the function uses to sort the elements. The function can sort elements using any field of the type "int", "float", or "string". An "int" `sort_field` argument specifies a field by its index, where 0 refers to the first field in the type declaration. A "string" argument specifies a field by its name. Optional. The default is 0.

```pine
//@version=6
indicator("`matrix.sort()` Example")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x2 matrix.
	var m1 = matrix.new<float>(2, 2, na)
	// Fill the matrix with values.
	matrix.set(m1, 0, 0, 3)
	matrix.set(m1, 0, 1, 4)
	matrix.set(m1, 1, 0, 1)
	matrix.set(m1, 1, 1, 2)

	// Copy the matrix to a new one.
	var m2 = matrix.copy(m1)
	// Sort the rows of `m2` using the default arguments (first column and ascending order).
	matrix.sort(m2)

	// Display using a table.
	if barstate.islastconfirmedhistory
		var t = table.new(position.top_right, 2, 2, color.green)
		table.cell(t, 0, 0, "Original matrix:")
		table.cell(t, 0, 1, str.tostring(m1))
		table.cell(t, 1, 0, "Sorted matrix:")
		table.cell(t, 1, 1, str.tostring(m2))
```

**See also:** `matrix.new<type>()`, `matrix.max()`, `matrix.min()`, `matrix.avg()`

### matrix.submatrix()

The function extracts a submatrix of the `id` matrix within the specified indices.

```pine
matrix.submatrix(id, from_row, to_row, from_column, to_column) → matrix<type>
```

**Arguments**

- `id` (any matrix type): A matrix object.
- `from_row` (series int, optional): Index of the row from which the extraction will begin (inclusive). Optional. The default value is 0.
- `to_row` (series int, optional): Index of the row where the extraction will end (non inclusive). Optional. The default value is `matrix.rows()`.
- `from_column` (series int, optional): Index of the column from which the extraction will begin (inclusive). Optional. The default value is 0.
- `to_column` (series int, optional): Index of the column where the extraction will end (non inclusive). Optional. The default value is `matrix.columns()`.

**Returns:** A new matrix object containing the submatrix of the `id` matrix defined by the `from_row`, `to_row`, `from_column` and `to_column` indices.

**Remarks**

Indexing of the rows and columns starts at zero.

```pine
//@version=6
indicator("`matrix.submatrix()` Example")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix matrix with values `0`.
	var m1 = matrix.new<int>(2, 3, 0)
	// Fill the matrix with values.
	matrix.set(m1, 0, 0, 1)
	matrix.set(m1, 0, 1, 2)
	matrix.set(m1, 0, 2, 3)
	matrix.set(m1, 1, 0, 4)
	matrix.set(m1, 1, 1, 5)
	matrix.set(m1, 1, 2, 6)

	// Create a 2x2 submatrix of the `m1` matrix.
	var m2 = matrix.submatrix(m1, 0, 2, 1, 3)

	// Display using a table.
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Original Matrix:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 0, "Submatrix:")
	table.cell(t, 1, 1, str.tostring(m2))
```

**See also:** `matrix.new<type>()`, `matrix.set()`, `matrix.row()`, `matrix.col()`, `matrix.reshape()`

### matrix.sum()

The function returns a new matrix resulting from the [sum](https://en.wikipedia.org/wiki/Matrix_addition) of two matrices `id1` and `id2`, or of an `id1` matrix and an `id2` scalar (a numerical value).

```pine
matrix.sum(id1, id2) → matrix<int>
matrix.sum(id1, id2) → matrix<float>
```

**Arguments**

- `id1` (matrix<int> | matrix<int/float>): First matrix object.
- `id2` (series int/float/matrix<int> | series int/float/matrix<int/float>): Second matrix object, or scalar value.

Sum of two matrices

```pine
//@version=6
indicator("`matrix.sum()` Example 1")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix containing values `5`.
	var m1 = matrix.new<float>(2, 3, 5)
	// Create a 2x3 matrix containing values `4`.
	var m2 = matrix.new<float>(2, 3, 4)
	// Create a new matrix that sums matrices `m1` and `m2`.
	var m3 = matrix.sum(m1, m2)

	// Display using a table.
	var t = table.new(position.top_right, 1, 2, color.green)
	table.cell(t, 0, 0, "Sum of two matrices:")
	table.cell(t, 0, 1, str.tostring(m3))
```

Sum of a matrix and scalar

```pine
//@version=6
indicator("`matrix.sum()` Example 2")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix with values `4`.
	var m1 = matrix.new<float>(2, 3, 4)

	// Create a new matrix containing the sum of the `m1` matrix with the "int" value `1`.
	var m2 = matrix.sum(m1, 1)

	// Display using a table.
	var t = table.new(position.top_right, 1, 2, color.green)
	table.cell(t, 0, 0, "Sum of a matrix and a scalar:")
	table.cell(t, 0, 1, str.tostring(m2))
```

Sum of two matrices

```pine
//@version=6
indicator("`matrix.sum()` Example 1")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix containing values `5`.
	var m1 = matrix.new<float>(2, 3, 5)
	// Create a 2x3 matrix containing values `4`.
	var m2 = matrix.new<float>(2, 3, 4)
	// Create a new matrix that sums matrices `m1` and `m2`.
	var m3 = matrix.sum(m1, m2)

	// Display using a table.
	var t = table.new(position.top_right, 1, 2, color.green)
	table.cell(t, 0, 0, "Sum of two matrices:")
	table.cell(t, 0, 1, str.tostring(m3))
```

Sum of a matrix and scalar

```pine
//@version=6
indicator("`matrix.sum()` Example 2")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x3 matrix with values `4`.
	var m1 = matrix.new<float>(2, 3, 4)

	// Create a new matrix containing the sum of the `m1` matrix with the "int" value `1`.
	var m2 = matrix.sum(m1, 1)

	// Display using a table.
	var t = table.new(position.top_right, 1, 2, color.green)
	table.cell(t, 0, 0, "Sum of a matrix and a scalar:")
	table.cell(t, 0, 1, str.tostring(m2))
```

**Returns:** A new matrix object containing the sum of `id2` and `id1`.

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.columns()`, `matrix.rows()`

### matrix.swap_columns()

The function swaps the columns at the index `column1` and `column2` in the `id` matrix.

```pine
matrix.swap_columns(id, column1, column2) → void
```

**Arguments**

- `id` (any matrix type): A matrix object.
- `column1` (series int): Index of the first column to be swapped.
- `column2` (series int): Index of the second column to be swapped.

**Remarks**

Indexing of the rows and columns starts at zero.

```pine
//@version=6
indicator("`matrix.swap_columns()` Example")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x2 matrix with ‘na’ values.
	var m1 = matrix.new<int>(2, 2, na)
	// Fill the matrix with values.
	matrix.set(m1, 0, 0, 1)
	matrix.set(m1, 0, 1, 2)
	matrix.set(m1, 1, 0, 3)
	matrix.set(m1, 1, 1, 4)

	// Copy the matrix to a new one.
	var m2 = matrix.copy(m1)

	// Swap the first and second columns of the matrix copy.
	matrix.swap_columns(m2, 0, 1)

	// Display using a table.
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Original matrix:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 0, "Swapped columns in copy:")
	table.cell(t, 1, 1, str.tostring(m2))
```

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.columns()`, `matrix.rows()`

### matrix.swap_rows()

The function swaps the rows at the index `row1` and `row2` in the `id` matrix.

```pine
matrix.swap_rows(id, row1, row2) → void
```

**Arguments**

- `id` (any matrix type): A matrix object.
- `row1` (series int): Index of the first row to be swapped.
- `row2` (series int): Index of the second row to be swapped.

**Remarks**

Indexing of the rows and columns starts at zero.

```pine
//@version=6
indicator("`matrix.swap_rows()` Example")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 3x2 matrix with ‘na’ values.
	var m1 = matrix.new<int>(3, 2, na)
	// Fill the matrix with values.
	matrix.set(m1, 0, 0, 1)
	matrix.set(m1, 0, 1, 2)
	matrix.set(m1, 1, 0, 3)
	matrix.set(m1, 1, 1, 4)
	matrix.set(m1, 2, 0, 5)
	matrix.set(m1, 2, 1, 6)

	// Copy the matrix to a new one.
	var m2 = matrix.copy(m1)

	// Swap the first and second rows of the matrix copy.
	matrix.swap_rows(m2, 0, 1)

	// Display using a table.
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Original matrix:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 0, "Swapped rows in copy:")
	table.cell(t, 1, 1, str.tostring(m2))
```

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.columns()`, `matrix.swap_columns()`

### matrix.trace()

The function calculates the [trace](https://en.wikipedia.org/wiki/Trace_(linear_algebra)) of a matrix (the sum of the main diagonal's elements).

```pine
matrix.trace(id) → series float
matrix.trace(id) → series int
```

**Arguments**

- `id` (matrix<int/float> | matrix<int>): A matrix object.

**Returns:** The trace of the `id` matrix.

```pine
//@version=6
indicator("`matrix.trace()` Example")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x2 matrix.
	var m1 = matrix.new<int>(2, 2, na)
	// Fill the matrix with values.
	matrix.set(m1, 0, 0, 1)
	matrix.set(m1, 0, 1, 2)
	matrix.set(m1, 1, 0, 3)
	matrix.set(m1, 1, 1, 4)

	// Get the trace of the matrix.
	tr = matrix.trace(m1)

	// Display matrix elements.
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Matrix elements:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 0, "Trace of the matrix:")
	table.cell(t, 1, 1, str.tostring(tr))
```

**See also:** `matrix.new<type>()`, `matrix.get()`, `matrix.set()`, `matrix.columns()`, `matrix.rows()`

### matrix.transpose()

The function creates a new, [transposed](https://en.wikipedia.org/wiki/Transpose#Transpose_of_a_matrix) version of the `id`. This interchanges the row and column index of each element.

```pine
matrix.transpose(id) → matrix<type>
```

**Arguments**

- `id` (any matrix type): A matrix object.

**Returns:** A new matrix containing the transposed version of the `id` matrix.

```pine
//@version=6
indicator("`matrix.transpose()` Example")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
	// Create a 2x2 matrix.
	var m1 = matrix.new<float>(2, 2, na)
	// Fill the matrix with values.
	matrix.set(m1, 0, 0, 1)
	matrix.set(m1, 0, 1, 2)
	matrix.set(m1, 1, 0, 3)
	matrix.set(m1, 1, 1, 4)

	// Create a transpose of the matrix.
	var m2 = matrix.transpose(m1)

	// Display using a table.
	var t = table.new(position.top_right, 2, 2, color.green)
	table.cell(t, 0, 0, "Original matrix:")
	table.cell(t, 0, 1, str.tostring(m1))
	table.cell(t, 1, 0, "Transposed matrix:")
	table.cell(t, 1, 1, str.tostring(m2))
```

**See also:** `matrix.new<type>()`, `matrix.set()`, `matrix.columns()`, `matrix.rows()`, `matrix.reshape()`, `matrix.reverse()`
