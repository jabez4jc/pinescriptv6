# `array.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Functions

### array.abs()

Returns an array containing the absolute value of each element in the original array.

```pine
array.abs(id) → array<float>
array.abs(id) → array<int>
```

**Arguments**

- `id` (array<int/float> | array<int>): An array object.

**See also:** `array.new_float()`, `array.insert()`, `array.slice()`, `array.reverse()`, `order.ascending`, `order.descending`

### array.avg()

The function returns the mean of an array's elements.

```pine
array.avg(id) → series float
array.avg(id) → series int
```

**Arguments**

- `id` (array<int/float> | array<int>): An array object.

**Returns:** Mean of array's elements.

**Remarks**

Returns `na` if the `id` array is empty.

```pine
//@version=6
indicator("array.avg example")
a = array.new_float(0)
for i = 0 to 9
	array.push(a, close[i])
plot(array.avg(a))
```

**See also:** `array.new_float()`, `array.max()`, `array.min()`, `array.stdev()`

### array.binary_search()

Performs a [binary search](https://en.wikipedia.org/wiki/Binary_search) through a sorted array to locate an element corresponding to a target value. The function returns an element's index if the value from that element equals the target value. Otherwise, it returns -1.

```pine
array.binary_search(id, val) → series int
array.binary_search(id, val, sort_field) → series int
```

**Arguments**

- `id` (array<int/float> | any array type): The ID of the array to search. The function can search an array of "int" or "float" values, or an array with elements of any user-defined type that contains at least one "int" or "float" field. The array's elements must be sorted in ascending order by numeric value for correct results.
- `val` (series int/float | series int/float/string): The target value to locate in the array. If the array contains elements of the "int" or "float" type, the function searches the elements for the value directly. If the array contains elements of a user-defined type, the function searches for the value in the specified "int" or "float" field from the objects referenced by the array's elements.
- `sort_field` (const int/string, optional): Optional. If the array contains elements of a user-defined type, this parameter specifies which of the type's fields the function uses to search the elements. The function can search the array using any of the type's "int" or "float" fields. An "int" `sort_field` argument specifies a field by its index, where 0 refers to the first field in the type declaration. A "string" argument specifies a field by its name. For correct results, the array's elements must be sorted in ascending order by the specified field. The default is 0.

**Remarks**

Unlike `array.indexof()` and `array.lastindexof()`, this function searches an array by repeatedly checking the middle element in the index range and dividing the search range in half. First, it checks if the value from the element at the middle index equals the target value, then returns that index immediately if the two values are equal. If the values are not equal, the function then reduces the search range to the first half of the current range if the target value is less than the middle value, and to the second half otherwise. This process repeats until the function either finds an element corresponding to the target value or reduces the search range to a single index.

If a sorted array contains multiple elements whose values match the target value, the index returned by this function does not necessarily correspond to the first or last occurrence of that value. To perform a binary search on an array and then retrieve the index for the first or last occurrence of a value, use the `array.binary_search_leftmost()` or `array.binary_search_rightmost()` function, respectively.

```pine
//@version=6
indicator("array.binary_search")
a = array.from(5, -2, 0, 9, 1)
array.sort(a) // [-2, 0, 1, 5, 9]
position = array.binary_search(a, 0) // 1
plot(position)
```

**See also:** `array.new_float()`, `array.insert()`, `array.slice()`, `array.reverse()`, `order.ascending`, `order.descending`

### array.binary_search_leftmost()

Performs a [binary search](https://en.wikipedia.org/wiki/Binary_search) through a sorted array to locate an element corresponding to a target value. If the function locates the target value in the array's elements or referenced object fields, it returns the index of the first element whose retrieved value equals that value. Otherwise, it returns the index of the last element whose retrieved value is less than the target value, or 0 if the target value is less than the value from the first element.

```pine
array.binary_search_leftmost(id, val) → series int
array.binary_search_leftmost(id, val, sort_field) → series int
```

**Arguments**

- `id` (array<int/float> | any array type): The ID of the array to search. The function can search an array of "int" or "float" values, or an array with elements of any user-defined type that contains at least one "int" or "float" field. The array's elements must be sorted in ascending order by numeric value for correct results.
- `val` (series int/float | series int/float/string): The target value to locate in the array. If the array contains elements of the "int" or "float" type, the function searches the elements for the value directly. If the array contains elements of a user-defined type, the function searches for the value in the specified "int" or "float" field from the objects referenced by the array's elements.
- `sort_field` (const int/string, optional): Optional. If the array contains elements of a user-defined type, this parameter specifies which of the type's fields the function uses to search the elements. The function can search the array using any of the type's "int" or "float" fields. An "int" `sort_field` argument specifies a field by its index, where 0 refers to the first field in the type declaration. A "string" argument specifies a field by its name. For correct results, the array's elements must be sorted in ascending order by the specified field. The default is 0.

```pine
//@version=6
indicator("array.binary_search_leftmost")
a = array.from(5, -2, 0, 9, 1)
array.sort(a) // [-2, 0, 1, 5, 9]
position = array.binary_search_leftmost(a, 3) // 2
plot(position)
```

```pine
//@version=6
indicator("array.binary_search_leftmost, repetitive elements")
a = array.from(4, 5, 5, 5)
// Returns the index of the first instance.
position = array.binary_search_leftmost(a, 5)
plot(position) // Plots 1
```

```pine
//@version=6
indicator("array.binary_search_leftmost")
a = array.from(5, -2, 0, 9, 1)
array.sort(a) // [-2, 0, 1, 5, 9]
position = array.binary_search_leftmost(a, 3) // 2
plot(position)
```

```pine
//@version=6
indicator("array.binary_search_leftmost, repetitive elements")
a = array.from(4, 5, 5, 5)
// Returns the index of the first instance.
position = array.binary_search_leftmost(a, 5)
plot(position) // Plots 1
```

**Remarks**

Unlike `array.indexof()` and `array.lastindexof()`, this function searches an array by repeatedly checking the middle element in the index range and dividing the search range in half. First, it checks if the value from the element at the middle index equals the target value, then returns that index immediately if the two values are equal. If the values are not equal, the function then reduces the search range to the first half of the current range if the target value is less than the middle value, and to the second half otherwise. This process repeats until the function either finds an element corresponding to the target value or reduces the search range to a single index.

**See also:** `array.new_float()`, `array.insert()`, `array.slice()`, `array.reverse()`, `order.ascending`, `order.descending`

### array.binary_search_rightmost()

Performs a [binary search](https://en.wikipedia.org/wiki/Binary_search) through a sorted array to locate an element corresponding to a target value. If the function locates the target value in the array's elements or referenced object fields, it returns the index of the last element whose retrieved value equals that value. Otherwise, it returns the index of the first element whose retrieved value is greater than the target value, or the array's last index plus one if the target value is greater than the value from the last element.

```pine
array.binary_search_rightmost(id, val) → series int
array.binary_search_rightmost(id, val, sort_field) → series int
```

**Arguments**

- `id` (array<int/float> | any array type): The ID of the array to search. The function can search an array of "int" or "float" values, or an array with elements of any user-defined type that contains at least one "int" or "float" field. The array's elements must be sorted in ascending order by numeric value for correct results.
- `val` (series int/float | series int/float/string): The target value to locate in the array. If the array contains elements of the "int" or "float" type, the function searches the elements for the value directly. If the array contains elements of a user-defined type, the function searches for the value in the specified "int" or "float" field from the objects referenced by the array's elements.
- `sort_field` (const int/string, optional): Optional. If the array contains elements of a user-defined type, this parameter specifies which of the type's fields the function uses to search the elements. The function can search the array using any of the type's "int" or "float" fields. An "int" `sort_field` argument specifies a field by its index, where 0 refers to the first field in the type declaration. A "string" argument specifies a field by its name. For correct results, the array's elements must be sorted in ascending order by the specified field. The default is 0.

```pine
//@version=6
indicator("array.binary_search_rightmost")
a = array.from(5, -2, 0, 9, 1)
array.sort(a) // [-2, 0, 1, 5, 9]
position = array.binary_search_rightmost(a, 3) // 3
plot(position)
```

```pine
//@version=6
indicator("array.binary_search_rightmost, repetitive elements")
a = array.from(4, 5, 5, 5)
// Returns the index of the last instance.
position = array.binary_search_rightmost(a, 5)
plot(position) // Plots 3
```

```pine
//@version=6
indicator("array.binary_search_rightmost")
a = array.from(5, -2, 0, 9, 1)
array.sort(a) // [-2, 0, 1, 5, 9]
position = array.binary_search_rightmost(a, 3) // 3
plot(position)
```

```pine
//@version=6
indicator("array.binary_search_rightmost, repetitive elements")
a = array.from(4, 5, 5, 5)
// Returns the index of the last instance.
position = array.binary_search_rightmost(a, 5)
plot(position) // Plots 3
```

**Remarks**

Unlike `array.indexof()` and `array.lastindexof()`, this function searches an array by repeatedly checking the middle element in the index range and dividing the search range in half. First, it checks if the value from the element at the middle index equals the target value, then returns that index immediately if the two values are equal. If the values are not equal, the function then reduces the search range to the first half of the current range if the target value is less than the middle value, and to the second half otherwise. This process repeats until the function either finds an element corresponding to the target value or reduces the search range to a single index.

**See also:** `array.new_float()`, `array.insert()`, `array.slice()`, `array.reverse()`, `order.ascending`, `order.descending`

### array.clear()

The function removes all elements from an array.

```pine
array.clear(id) → void
```

**Arguments**

- `id` (any array type): An array object.

```pine
//@version=6
indicator("array.clear example")
a = array.new_float(5,high)
array.clear(a)
array.push(a, close)
plot(array.get(a,0))
plot(array.size(a))
```

**See also:** `array.new_float()`, `array.insert()`, `array.push()`, `array.remove()`, `array.pop()`

### array.concat()

The function is used to merge two arrays. It pushes all elements from the second array to the first array, and returns the first array.

```pine
array.concat(id1, id2) → array<type>
```

**Arguments**

- `id1` (any array type): The first array object.
- `id2` (any array type): The second array object.

**Returns:** The first array with merged elements from the second array.

```pine
//@version=6
indicator("array.concat example")
a = array.new_float(0,0)
b = array.new_float(0,0)
for i = 0 to 4
    array.push(a, high[i])
    array.push(b, low[i])
c = array.concat(a,b)
plot(array.size(a))
plot(array.size(b))
plot(array.size(c))
```

**See also:** `array.new_float()`, `array.insert()`, `array.slice()`

### array.copy()

The function creates a copy of an existing array.

```pine
array.copy(id) → array<type>
```

**Arguments**

- `id` (any array type): An array object.

**Returns:** A copy of an array.

```pine
//@version=6
indicator("array.copy example")
length = 5
a = array.new_float(length, close)
b = array.copy(a)
a := array.new_float(length, open)
plot(array.sum(a) / length)
plot(array.sum(b) / length)
```

**See also:** `array.new_float()`, `array.get()`, `array.slice()`, `array.sort()`

### array.covariance()

The function returns the covariance of two arrays.

```pine
array.covariance(id1, id2, biased) → series float
```

**Arguments**

- `id1` (array<int/float>): An array object.
- `id2` (array<int/float>): An array object.
- `biased` (series bool, optional): Determines which estimate should be used. Optional. The default is true.

**Returns:** The covariance of two arrays.

**Remarks**

If `biased` is `true`, function will calculate using a biased estimate of the entire population, if `false` - unbiased estimate of a sample. Returns `na` if both arrays are empty.

```pine
//@version=6
indicator("array.covariance example")
a = array.new_float(0)
b = array.new_float(0)
for i = 0 to 9
	array.push(a, close[i])
	array.push(b, open[i])
plot(array.covariance(a, b))
```

**See also:** `array.new_float()`, `array.max()`, `array.stdev()`, `array.avg()`, `array.variance()`

### array.every()

Returns `true` if all elements of the `id` array are `true`, `false` otherwise.

```pine
array.every(id) → series bool
```

**Arguments**

- `id` (array<bool>): An array object.

**Remarks**

This function also works with arrays of `int` and `float` types, in which case zero values are considered `false`, and all others `true`.

**See also:** `array.some()`, `array.get()`

### array.fill()

The function sets elements of an array to a single value. If no index is specified, all elements are set. If only a start index (default 0) is supplied, the elements starting at that index are set. If both index parameters are used, the elements from the starting index up to but not including the end index (default na) are set.

```pine
array.fill(id, value, index_from, index_to) → void
```

**Arguments**

- `id` (any array type): An array object.
- `value` (series <type of the array's elements>): Value to fill the array with.
- `index_from` (series int, optional): Start index, default is 0.
- `index_to` (series int, optional): End index, default is na. Must be one greater than the index of the last element to set.

```pine
//@version=6
indicator("array.fill example")
a = array.new_float(10)
array.fill(a, close)
plot(array.sum(a))
```

**See also:** `array.new_float()`, `array.set()`, `array.slice()`

### array.first()

Returns the array's first element. Throws a runtime error if the array is empty.

```pine
array.first(id) → series <type>
```

**Arguments**

- `id` (any array type): An array object.

```pine
//@version=6
indicator("array.first example")
arr = array.new_int(3, 10)
plot(array.first(arr))
```

**See also:** `array.last()`, `array.get()`

### array.from()

The function takes a variable number of arguments with one of the types: int, float, bool, string, label, line, color, box, table, linefill, and returns an array of the corresponding type.

```pine
array.from(arg0, arg1, ...) → array<type>
array.from(arg0, arg1, ...) → array<int>
array.from(arg0, arg1, ...) → array<float>
array.from(arg0, arg1, ...) → array<bool>
array.from(arg0, arg1, ...) → array<string>
array.from(arg0, arg1, ...) → array<label>
array.from(arg0, arg1, ...) → array<line>
array.from(arg0, arg1, ...) → array<color>
array.from(arg0, arg1, ...) → array<enum>
array.from(arg0, arg1, ...) → array<box>
array.from(arg0, arg1, ...) → array<table>
array.from(arg0, arg1, ...) → array<linefill>
```

**Arguments**

- `arg0, arg1, ...` (<arg..._type> | series int | series int/float | series bool | series string | series label | series line | series color | series enum | series box | series table | series linefill): Array arguments.

**Returns:** The array element's value.

**Remarks**

This function can accept up to 4,000 'int', 'float', 'bool', or 'color' arguments. For all other types, including user-defined types, the limit is 999.

```pine
//@version=6
indicator("array.from_example", overlay = false)
arr = array.from("Hello", "World!") // arr (array<string>) will contain 2 elements: {Hello}, {World!}.
plot(close)
```

### array.get()

The function returns the value of the element at the specified index.

```pine
array.get(id, index) → series <type>
```

**Arguments**

- `id` (any array type): An array object.
- `index` (series int): The index of the element whose value is to be returned.

**Returns:** The array element's value.

**Remarks**

If the index is positive, the function counts forwards from the beginning of the array to the end. The index of the first element is 0, and the index of the last element is `array.size() - 1`. If the index is negative, the function counts backwards from the end of the array to the beginning. In this case, the index of the last element is -1, and the index of the first element is negative `array.size()`. For example, for an array that contains three elements, all of the following are valid arguments for the `index` parameter: 0, 1, 2, -1, -2, -3.

```pine
//@version=6
indicator("array.get example")
a = array.new_float(0)
for i = 0 to 9
	array.push(a, close[i] - open[i])
plot(array.get(a, 9))
```

**See also:** `array.new_float()`, `array.set()`, `array.slice()`, `array.sort()`

### array.includes()

The function returns true if the value was found in an array, false otherwise.

```pine
array.includes(id, value) → series bool
```

**Arguments**

- `id` (any array type): An array object.
- `value` (series <type of the array's elements>): The value to search in the array.

**Returns:** True if the value was found in the array, false otherwise.

```pine
//@version=6
indicator("array.includes example")
a = array.new_float(5,high)
p = close
if array.includes(a, high)
	p := open
plot(p)
```

**See also:** `array.new_float()`, `array.indexof()`, `array.shift()`, `array.remove()`, `array.insert()`

### array.indexof()

The function returns the index of the first occurrence of the value, or -1 if the value is not found.

```pine
array.indexof(id, value) → series int
```

**Arguments**

- `id` (any array type): An array object.
- `value` (series <type of the array's elements>): The value to search in the array.

**Returns:** The index of an element.

```pine
//@version=6
indicator("array.indexof example")
a = array.new_float(5,high)
index = array.indexof(a, high)
plot(index)
```

**See also:** `array.lastindexof()`, `array.get()`, `array.remove()`, `array.insert()`

### array.insert()

The function changes the contents of an array by adding new elements in place.

```pine
array.insert(id, index, value) → void
```

**Arguments**

- `id` (any array type): An array object.
- `index` (series int, optional): The index at which to insert the value.
- `value` (series <type of the array's elements>): The value to add to the array.

**Remarks**

If the index is positive, the function counts forwards from the beginning of the array to the end. The index of the first element is 0, and the index of the last element is `array.size() - 1`. If the index is negative, the function counts backwards from the end of the array to the beginning. In this case, the index of the last element is -1, and the index of the first element is negative `array.size()`. For example, for an array that contains three elements, all of the following are valid arguments for the `index` parameter: 0, 1, 2, -1, -2, -3.

```pine
//@version=6
indicator("array.insert example")
a = array.new_float(5, close)
array.insert(a, 0, open)
plot(array.get(a, 5))
```

**See also:** `array.new_float()`, `array.set()`, `array.push()`, `array.remove()`, `array.pop()`, `array.unshift()`

### array.join()

The function creates and returns a new string by concatenating all the elements of an array, separated by the specified separator string.

```pine
array.join(id, separator) → series string
```

**Arguments**

- `id` (array<int/float/string>): An array object.
- `separator` (series string, optional): The string used to separate each array element.

```pine
//@version=6
indicator("array.join example")
a = array.new_float(5, 5)
label.new(bar_index, close, array.join(a, ","))
```

**See also:** `array.new_float()`, `array.set()`, `array.insert()`, `array.remove()`, `array.pop()`, `array.unshift()`

### array.last()

Returns the array's last element. Throws a runtime error if the array is empty.

```pine
array.last(id) → series <type>
```

**Arguments**

- `id` (any array type): An array object.

```pine
//@version=6
indicator("array.last example")
arr = array.new_int(3, 10)
plot(array.last(arr))
```

**See also:** `array.first()`, `array.get()`

### array.lastindexof()

The function returns the index of the last occurrence of the value, or -1 if the value is not found.

```pine
array.lastindexof(id, value) → series int
```

**Arguments**

- `id` (any array type): An array object.
- `value` (series <type of the array's elements>): The value to search in the array.

**Returns:** The index of an element.

```pine
//@version=6
indicator("array.lastindexof example")
a = array.new_float(5,high)
index = array.lastindexof(a, high)
plot(index)
```

**See also:** `array.new_float()`, `array.set()`, `array.push()`, `array.remove()`, `array.insert()`

### array.max()

The function returns the greatest value, or the nth greatest value in a given array.

```pine
array.max(id, nth) → series float
array.max(id, nth) → series int
```

**Arguments**

- `id` (array<int/float> | array<int>): An array object.
- `nth` (series int): The nth greatest value to return, where zero is the greatest. Optional. The default is zero.

**Returns:** The greatest or the nth greatest value in the array.

**Remarks**

Returns `na` if the `id` array is empty.

```pine
//@version=6
indicator("array.max")
a = array.from(5, -2, 0, 9, 1)
thirdHighest = array.max(a, 2) // 1
plot(thirdHighest)
```

**See also:** `array.new_float()`, `array.min()`, `array.sum()`

### array.median()

The function returns the median of an array's elements.

```pine
array.median(id) → series float
array.median(id) → series int
```

**Arguments**

- `id` (array<int/float> | array<int>): An array object.

**Returns:** The median of the array's elements.

**Remarks**

Returns `na` if the `id` array is empty.

```pine
//@version=6
indicator("array.median example")
a = array.new_float(0)
for i = 0 to 9
	array.push(a, close[i])
plot(array.median(a))
```

**See also:** `array.median()`, `array.avg()`, `array.variance()`, `array.min()`

### array.min()

The function returns the smallest value, or the nth smallest value in a given array.

```pine
array.min(id, nth) → series float
array.min(id, nth) → series int
```

**Arguments**

- `id` (array<int/float> | array<int>): An array object.
- `nth` (series int): The nth smallest value to return, where zero is the smallest. Optional. The default is zero.

**Returns:** The smallest or the nth smallest value in the array.

**Remarks**

Returns `na` if the `id` array is empty.

```pine
//@version=6
indicator("array.min")
a = array.from(5, -2, 0, 9, 1)
secondLowest = array.min(a, 1) // 0
plot(secondLowest)
```

**See also:** `array.new_float()`, `array.max()`, `array.sum()`

### array.mode()

The function returns the mode of an array's elements. If there are several values with the same frequency, it returns the smallest value.

```pine
array.mode(id) → series float
array.mode(id) → series int
```

**Arguments**

- `id` (array<int/float> | array<int>): An array object.

**Returns:** The most frequently occurring value from the `id` array. If none exists, returns the smallest value instead.

**Remarks**

Returns `na` if the `id` array is empty.

```pine
//@version=6
indicator("array.mode example")
a = array.new_float(0)
for i = 0 to 9
	array.push(a, close[i])
plot(array.mode(a))
```

**See also:** `array.new_float()`, `ta.mode()`, `matrix.mode()`, `array.avg()`, `array.variance()`, `array.min()`

### array.new_bool()

The function creates a new array object of bool type elements.

```pine
array.new_bool(size, initial_value) → array<bool>
```

**Arguments**

- `size` (series int, optional): Initial size of an array. Optional. The default is 0.
- `initial_value` (series bool, optional): Initial value of all array elements. Optional. The default is 'false'.

**Returns:** The ID of an array object which may be used in other array.*() functions.

**Remarks**

An array index starts from 0.

```pine
//@version=6
indicator("array.new_bool example")
length = 5
a = array.new_bool(length, close > open)
plot(array.get(a, 0) ? close : open)
```

**See also:** `array.new_float()`, `array.get()`, `array.slice()`, `array.sort()`

### array.new_box()

The function creates a new array object of box type elements.

```pine
array.new_box(size, initial_value) → array<box>
```

**Arguments**

- `size` (series int, optional): Initial size of an array. Optional. The default is 0.
- `initial_value` (series box, optional): Initial value of all array elements. Optional. The default is 'na'.

**Returns:** The ID of an array object which may be used in other array.*() functions.

**Remarks**

An array index starts from 0.

```pine
//@version=6
indicator("array.new_box example")
boxes = array.new_box()
array.push(boxes, box.new(time, close, time+2, low, xloc=xloc.bar_time))
plot(1)
```

**See also:** `array.new_float()`, `array.get()`, `array.slice()`

### array.new_color()

The function creates a new array object of color type elements.

```pine
array.new_color(size, initial_value) → array<color>
```

**Arguments**

- `size` (series int, optional): Initial size of an array. Optional. The default is 0.
- `initial_value` (series color, optional): Initial value of all array elements. Optional. The default is 'na'.

**Returns:** The ID of an array object which may be used in other array.*() functions.

**Remarks**

An array index starts from 0.

```pine
//@version=6
indicator("array.new_color example")
length = 5
a = array.new_color(length, color.red)
plot(close, color = array.get(a, 0))
```

**See also:** `array.new_float()`, `array.get()`, `array.slice()`, `array.sort()`

### array.new_float()

The function creates a new array object of float type elements.

```pine
array.new_float(size, initial_value) → array<float>
```

**Arguments**

- `size` (series int, optional): Initial size of an array. Optional. The default is 0.
- `initial_value` (series int/float, optional): Initial value of all array elements. Optional. The default is 'na'.

**Returns:** The ID of an array object which may be used in other array.*() functions.

**Remarks**

An array index starts from 0.

```pine
//@version=6
indicator("array.new_float example")
length = 5
a = array.new_float(length, close)
plot(array.sum(a) / length)
```

**See also:** `array.new_color()`, `array.new_bool()`, `array.get()`, `array.slice()`, `array.sort()`

### array.new_int()

The function creates a new array object of int type elements.

```pine
array.new_int(size, initial_value) → array<int>
```

**Arguments**

- `size` (series int, optional): Initial size of an array. Optional. The default is 0.
- `initial_value` (series int, optional): Initial value of all array elements. Optional. The default is 'na'.

**Returns:** The ID of an array object which may be used in other array.*() functions.

**Remarks**

An array index starts from 0.

```pine
//@version=6
indicator("array.new_int example")
length = 5
a = array.new_int(length, int(close))
plot(array.sum(a) / length)
```

**See also:** `array.new_float()`, `array.get()`, `array.slice()`, `array.sort()`

### array.new_label()

The function creates a new array object of label type elements.

```pine
array.new_label(size, initial_value) → array<label>
```

**Arguments**

- `size` (series int, optional): Initial size of an array. Optional. The default is 0.
- `initial_value` (series label, optional): Initial value of all array elements. Optional. The default is 'na'.

**Returns:** The ID of an array object which may be used in other array.*() functions.

**Remarks**

An array index starts from 0.

```pine
//@version=6
indicator("array.new_label example", overlay = true, max_labels_count = 500)

//@variable The number of labels to show on the chart.
int labelCount = input.int(50, "Labels to show", 1, 500)

//@variable An array of `label` objects.
var array<label> labelArray = array.new_label()

//@variable A `chart.point` for the new label.
labelPoint = chart.point.from_index(bar_index, close)
//@variable The text in the new label.
string labelText = na
//@variable The color of the new label.
color labelColor = na
//@variable The style of the new label.
string labelStyle = na

// Set the label attributes for rising bars.
if close > open
    labelText  := "Rising"
    labelColor := color.green
    labelStyle := label.style_label_down
// Set the label attributes for falling bars.
else if close < open
    labelText  := "Falling"
    labelColor := color.red
    labelStyle := label.style_label_up

// Add a new label to the `labelArray` when the chart bar closed at a new value.
if close != open
    labelArray.push(label.new(labelPoint, labelText, color = labelColor, style = labelStyle))
// Remove the first element and delete its label when the size of the `labelArray` exceeds the `labelCount`.
if labelArray.size() > labelCount
    label.delete(labelArray.shift())
```

**See also:** `array.new_float()`, `array.get()`, `array.slice()`

### array.new_line()

The function creates a new array object of line type elements.

```pine
array.new_line(size, initial_value) → array<line>
```

**Arguments**

- `size` (series int, optional): Initial size of an array. Optional. The default is 0.
- `initial_value` (series line, optional): Initial value of all array elements. Optional. The default is 'na'.

**Returns:** The ID of an array object which may be used in other array.*() functions.

**Remarks**

An array index starts from 0.

```pine
//@version=6
indicator("array.new_line example")
// draw last 15 lines
var a = array.new_line()
array.push(a, line.new(bar_index - 1, close[1], bar_index, close))
if array.size(a) > 15
	ln = array.shift(a)
	line.delete(ln)
```

**See also:** `array.new_float()`, `array.get()`, `array.slice()`

### array.new_linefill()

The function creates a new array object of linefill type elements.

```pine
array.new_linefill(size, initial_value) → array<linefill>
```

**Arguments**

- `size` (series int, optional): Initial size of an array.
- `initial_value` (series linefill, optional): Initial value of all array elements.

**Returns:** The ID of an array object which may be used in other array.*() functions.

**Remarks**

An array index starts from 0.

### array.new_string()

The function creates a new array object of string type elements.

```pine
array.new_string(size, initial_value) → array<string>
```

**Arguments**

- `size` (series int, optional): Initial size of an array. Optional. The default is 0.
- `initial_value` (series string, optional): Initial value of all array elements. Optional. The default is 'na'.

**Returns:** The ID of an array object which may be used in other array.*() functions.

**Remarks**

An array index starts from 0.

```pine
//@version=6
indicator("array.new_string example")
length = 5
a = array.new_string(length, "text")
label.new(bar_index, close, array.get(a, 0))
```

**See also:** `array.new_float()`, `array.get()`, `array.slice()`

### array.new_table()

The function creates a new array object of table type elements.

```pine
array.new_table(size, initial_value) → array<table>
```

**Arguments**

- `size` (series int, optional): Initial size of an array. Optional. The default is 0.
- `initial_value` (series table, optional): Initial value of all array elements. Optional. The default is 'na'.

**Returns:** The ID of an array object which may be used in other array.*() functions.

**Remarks**

An array index starts from 0.

```pine
//@version=6
indicator("table array")
tables = array.new_table()
array.push(tables, table.new(position = position.top_left, rows = 1, columns = 2, bgcolor = color.yellow, border_width=1))
plot(1)
```

**See also:** `array.new_float()`, `array.get()`, `array.slice()`

### array.new<type>

The function creates a new array object of <type> elements.

```pine
array.new<type>(size, initial_value) → array<type>
```

**Arguments**

- `size` (series int, optional): Initial size of an array. Optional. The default is 0.
- `initial_value` (<array_type>, optional): Initial value of all array elements. Optional. The default is 'na'.

```pine
//@version=6
indicator("array.new<color> example")
a = array.new<color>()
array.push(a, color.red)
array.push(a, color.green)
plot(close, color = array.get(a, close > open ? 1 : 0))
```

```pine
//@version=6
indicator("array.new<float> example")
length = 5
var a = array.new<float>(length, close)
if array.size(a) == length
	array.remove(a, 0)
	array.push(a, close)
plot(array.sum(a) / length, "SMA")
```

```pine
//@version=6
indicator("array.new<line> example")
// draw last 15 lines
var a = array.new<line>()
array.push(a, line.new(bar_index - 1, close[1], bar_index, close))
if array.size(a) > 15
    ln = array.shift(a)
    line.delete(ln)
```

**Returns:** The ID of an array object which may be used in other array.*() functions.

**Remarks**

An array index starts from 0.

If you want to initialize an array and specify all its elements at the same time, then use the function array.from.

```pine
//@version=6
indicator("array.new<string> example")
a = array.new<string>(1, "Hello, World!")
label.new(bar_index, close, array.get(a, 0))
```

**See also:** `array.from()`, `array.push()`, `array.get()`, `array.size()`, `array.remove()`, `array.shift()`, `array.sum()`

### array.percentile_linear_interpolation()

Returns the value for which the specified percentage of array values (percentile) are less than or equal to it, using linear interpolation.

```pine
array.percentile_linear_interpolation(id, percentage) → series float
array.percentile_linear_interpolation(id, percentage) → series int
```

**Arguments**

- `id` (array<int/float> | array<int>): An array object.
- `percentage` (series int/float): The percentage of values that must be equal or less than the returned value.

**Remarks**

In statistics, the percentile is the percent of ranking items that appear at or below a certain score. This measurement shows the percentage of scores within a standard frequency distribution that is lower than the percentile rank being measured. Linear interpolation estimates the value between two ranks.

Returns `na` if the `id` array is empty.

**See also:** `array.new_float()`, `array.insert()`, `array.slice()`, `array.reverse()`, `order.ascending`, `order.descending`

### array.percentile_nearest_rank()

Returns the value for which the specified percentage of array values (percentile) are less than or equal to it, using the nearest-rank method.

```pine
array.percentile_nearest_rank(id, percentage) → series float
array.percentile_nearest_rank(id, percentage) → series int
```

**Arguments**

- `id` (array<int/float> | array<int>): An array object.
- `percentage` (series int/float): The percentage of values that must be equal or less than the returned value.

**Remarks**

In statistics, the percentile is the percent of ranking items that appear at or below a certain score. This measurement shows the percentage of scores within a standard frequency distribution that is lower than the percentile rank you're measuring.

Returns `na` if the `id` array is empty.

**See also:** `array.new_float()`, `array.insert()`, `array.slice()`, `array.reverse()`, `order.ascending`, `order.descending`

### array.percentrank()

Returns the percentile rank of the element at the specified `index`.

```pine
array.percentrank(id, index) → series float
array.percentrank(id, index) → series int
```

**Arguments**

- `id` (array<int/float> | array<int>): An array object.
- `index` (series int): The index of the element for which the percentile rank should be calculated.

**Remarks**

Percentile rank is the number of elements in the array that are less than or equal to the reference value, expressed as a percentage.

Returns `na` if the `id` array is empty.

**See also:** `array.new_float()`, `array.insert()`, `array.slice()`, `array.reverse()`, `order.ascending`, `order.descending`

### array.pop()

The function removes the last element from an array and returns its value.

```pine
array.pop(id) → series <type>
```

**Arguments**

- `id` (any array type): An array object.

**Returns:** The value of the removed element.

```pine
//@version=6
indicator("array.pop example")
a = array.new_float(5,high)
removedEl = array.pop(a)
plot(array.size(a))
plot(removedEl)
```

**See also:** `array.new_float()`, `array.set()`, `array.push()`, `array.remove()`, `array.insert()`, `array.shift()`

### array.push()

The function appends a value to an array.

```pine
array.push(id, value) → void
```

**Arguments**

- `id` (any array type): An array object.
- `value` (series <type of the array's elements>): The value of the element added to the end of the array.

```pine
//@version=6
indicator("array.push example")
a = array.new_float(5, 0)
array.push(a, open)
plot(array.get(a, 5))
```

**See also:** `array.new_float()`, `array.set()`, `array.insert()`, `array.remove()`, `array.pop()`, `array.unshift()`

### array.range()

The function returns the difference between the min and max values from a given array.

```pine
array.range(id) → series float
array.range(id) → series int
```

**Arguments**

- `id` (array<int/float> | array<int>): An array object.

**Returns:** The difference between the min and max values in the array.

**Remarks**

Returns `na` if the `id` array is empty.

```pine
//@version=6
indicator("array.range example")
a = array.new_float(0)
for i = 0 to 9
	array.push(a, close[i])
plot(array.range(a))
```

**See also:** `array.new_float()`, `array.min()`, `array.max()`, `array.sum()`

### array.remove()

The function changes the contents of an array by removing the element with the specified index.

```pine
array.remove(id, index) → series <type>
```

**Arguments**

- `id` (any array type): An array object.
- `index` (series int): The index of the element to remove.

**Returns:** The value of the removed element.

**Remarks**

If the index is positive, the function counts forwards from the beginning of the array to the end. The index of the first element is 0, and the index of the last element is `array.size() - 1`. If the index is negative, the function counts backwards from the end of the array to the beginning. In this case, the index of the last element is -1, and the index of the first element is negative `array.size()`. For example, for an array that contains three elements, all of the following are valid arguments for the `index` parameter: 0, 1, 2, -1, -2, -3.

```pine
//@version=6
indicator("array.remove example")
a = array.new_float(5,high)
removedEl = array.remove(a, 0)
plot(array.size(a))
plot(removedEl)
```

**See also:** `array.new_float()`, `array.set()`, `array.push()`, `array.insert()`, `array.pop()`, `array.shift()`

### array.reverse()

The function reverses an array. The first array element becomes the last, and the last array element becomes the first.

```pine
array.reverse(id) → void
```

**Arguments**

- `id` (any array type): An array object.

```pine
//@version=6
indicator("array.reverse example")
a = array.new_float(0)
for i = 0 to 9
	array.push(a, close[i])
plot(array.get(a, 0))
array.reverse(a)
plot(array.get(a, 0))
```

**See also:** `array.new_float()`, `array.sort()`, `array.push()`, `array.set()`, `array.avg()`

### array.set()

The function sets the value of the element at the specified index.

```pine
array.set(id, index, value) → void
```

**Arguments**

- `id` (any array type): An array object.
- `index` (series int): The index of the element to be modified.
- `value` (series <type of the array's elements>): The new value to be set.

**Remarks**

If the index is positive, the function counts forwards from the beginning of the array to the end. The index of the first element is 0, and the index of the last element is `array.size() - 1`. If the index is negative, the function counts backwards from the end of the array to the beginning. In this case, the index of the last element is -1, and the index of the first element is negative `array.size()`. For example, for an array that contains three elements, all of the following are valid arguments for the `index` parameter: 0, 1, 2, -1, -2, -3.

```pine
//@version=6
indicator("array.set example")
a = array.new_float(10)
for i = 0 to 9
	array.set(a, i, close[i])
plot(array.sum(a) / 10)
```

**See also:** `array.new_float()`, `array.get()`, `array.slice()`

### array.shift()

The function removes an array's first element and returns its value.

```pine
array.shift(id) → series <type>
```

**Arguments**

- `id` (any array type): An array object.

**Returns:** The value of the removed element.

```pine
//@version=6
indicator("array.shift example")
a = array.new_float(5,high)
removedEl = array.shift(a)
plot(array.size(a))
plot(removedEl)
```

**See also:** `array.unshift()`, `array.set()`, `array.push()`, `array.remove()`, `array.includes()`

### array.size()

The function returns the number of elements in an array.

```pine
array.size(id) → series int
```

**Arguments**

- `id` (any array type): An array object.

**Returns:** The number of elements in the array.

```pine
//@version=6
indicator("array.size example")
a = array.new_float(0)
for i = 0 to 9
	array.push(a, close[i])
// note that changes in slice also modify original array
slice = array.slice(a, 0, 5)
array.push(slice, open)
// size was changed in slice and in original array
plot(array.size(a))
plot(array.size(slice))
```

**See also:** `array.new_float()`, `array.sum()`, `array.slice()`, `array.sort()`

### array.slice()

Creates an array representing a slice of an existing array. Setting a slice's element to a new value changes the corresponding element in the original array to that value. Likewise, inserting or removing an element in the slice inserts or removes an element in the original array at the index range covered by the slice.

```pine
array.slice(id, index_from, index_to) → array<type>
```

**Arguments**

- `id` (any array type): The reference (ID) of the array from which to create a new slice.
- `index_from` (series int, optional): The `id` array index corresponding to the start of the slice.
- `index_to` (series int, optional): The `id` array index corresponding to the end of the slice. The index is non-inclusive; the resulting slice contains all the original array's elements from `index_from` to `index_to - 1`.

**Returns:** The ID of an array representing a slice of the `id` array.

**Remarks**

The indices in the resulting slice range from zero to one less than the slice's size. These indices do not directly represent the same element indices as the original array. For example, if the `index_from` value is 5, the slice's element at index 1 refers to the `id` array's element at index 6.

Scripts cannot modify the elements of a historical array. Therefore, they cannot modify historical array slices created by this function. Instead of modifying an array referenced by an ID retrieved with the [[]](#op_[]) operator, use `array.copy()` to create a shallow copy of the historical array, then modify the copy or a slice of that copy instead.

```pine
//@version=6
indicator("array.slice example")
a = array.new_float(0)
for i = 0 to 9
	array.push(a, close[i])
// take elements from 0 to 4
// *note that changes in slice also modify original array
slice = array.slice(a, 0, 5)
plot(array.sum(a) / 10)
plot(array.sum(slice) / 5)
```

**See also:** `array.new_float()`, `array.get()`, `array.sort()`

### array.some()

Returns `true` if at least one element of the `id` array is `true`, `false` otherwise.

```pine
array.some(id) → series bool
```

**Arguments**

- `id` (array<bool>): An array object.

**Remarks**

This function also works with arrays of `int` and `float` types, in which case zero values are considered `false`, and all others `true`.

**See also:** `array.every()`, `array.get()`

### array.sort()

The function sorts the elements of an array.

```pine
array.sort(id, order) → void
array.sort(id, order, sort_field) → void
```

**Arguments**

- `id` (array<int/float/string> | any array type): An array object.
- `order` (series sort_order, optional): The sort order: order.ascending (default) or order.descending.
- `sort_field` (const int/string, optional): If the `id` collection contains elements of a user-defined type, this parameter specifies which of the type's fields the function uses to sort the elements. The function can sort elements using any field of the type "int", "float", or "string". An "int" `sort_field` argument specifies a field by its index, where 0 refers to the first field in the type declaration. A "string" argument specifies a field by its name. Optional. The default is 0.

```pine
//@version=6
indicator("array.sort example")
a = array.new_float(0,0)
for i = 0 to 5
	array.push(a, high[i])
array.sort(a, order.descending)
if barstate.islast
	label.new(bar_index, close, str.tostring(a))
```

**See also:** `array.new_float()`, `array.insert()`, `array.slice()`, `array.reverse()`, `order.ascending`, `order.descending`

### array.sort_indices()

Returns an array of indices which, when used to index the original array, will access its elements in their sorted order. It does not modify the original array.

```pine
array.sort_indices(id, order) → array<int>
array.sort_indices(id, order, sort_field) → array<int>
```

**Arguments**

- `id` (array<int/float/string> | any array type): An array object.
- `order` (series sort_order, optional): The sort order: order.ascending or order.descending. Optional. The default is order.ascending.
- `sort_field` (const int/string, optional): If the `id` collection contains elements of a user-defined type, this parameter specifies which of the type's fields the function uses to sort the elements. The function can sort elements using any field of the type "int", "float", or "string". An "int" `sort_field` argument specifies a field by its index, where 0 refers to the first field in the type declaration. A "string" argument specifies a field by its name. Optional. The default is 0.

```pine
//@version=6
indicator("array.sort_indices")
a = array.from(5, -2, 0, 9, 1)
sortedIndices = array.sort_indices(a) // [1, 2, 4, 0, 3]
indexOfSmallestValue = array.get(sortedIndices, 0) // 1
smallestValue = array.get(a, indexOfSmallestValue) // -2
plot(smallestValue)
```

**See also:** `array.new_float()`, `array.insert()`, `array.slice()`, `array.reverse()`, `order.ascending`, `order.descending`

### array.standardize()

The function returns the array of standardized elements.

```pine
array.standardize(id) → array<float>
array.standardize(id) → array<int>
```

**Arguments**

- `id` (array<int/float> | array<int>): An array object.

**Returns:** The array of standardized elements.

```pine
//@version=6
indicator("array.standardize example")
a = array.new_float(0)
for i = 0 to 9
	array.push(a, close[i])
b = array.standardize(a)
plot(array.min(b))
plot(array.max(b))
```

**See also:** `array.max()`, `array.min()`, `array.mode()`, `array.avg()`, `array.variance()`, `array.stdev()`

### array.stdev()

The function returns the standard deviation of an array's elements.

```pine
array.stdev(id, biased) → series float
array.stdev(id, biased) → series int
```

**Arguments**

- `id` (array<int/float> | array<int>): An array object.
- `biased` (series bool, optional): Determines which estimate should be used. Optional. The default is true.

**Returns:** The standard deviation of the array's elements.

**Remarks**

If `biased` is true, the function calculates using a biased estimate of the entire population. If `biased` is false, it uses an unbiased estimate of a sample.

Returns `na` if the `id` array is empty.

```pine
//@version=6
indicator("array.stdev example")
a = array.new_float(0)
for i = 0 to 9
	array.push(a, close[i])
plot(array.stdev(a))
```

**See also:** `array.new_float()`, `array.max()`, `array.min()`, `array.avg()`

### array.sum()

The function returns the sum of an array's elements.

```pine
array.sum(id) → series float
array.sum(id) → series int
```

**Arguments**

- `id` (array<int/float> | array<int>): An array object.

**Returns:** The sum of the array's elements.

**Remarks**

Returns `na` if the `id` array is empty.

```pine
//@version=6
indicator("array.sum example")
a = array.new_float(0)
for i = 0 to 9
	array.push(a, close[i])
plot(array.sum(a))
```

**See also:** `array.new_float()`, `array.max()`, `array.min()`

### array.unshift()

The function inserts the value at the beginning of the array.

```pine
array.unshift(id, value) → void
```

**Arguments**

- `id` (any array type): An array object.
- `value` (series <type of the array's elements>): The value to add to the start of the array.

```pine
//@version=6
indicator("array.unshift example")
a = array.new_float(5, 0)
array.unshift(a, open)
plot(array.get(a, 0))
```

**See also:** `array.shift()`, `array.set()`, `array.insert()`, `array.remove()`, `array.indexof()`

### array.variance()

The function returns the variance of an array's elements.

```pine
array.variance(id, biased) → series float
array.variance(id, biased) → series int
```

**Arguments**

- `id` (array<int/float> | array<int>): An array object.
- `biased` (series bool, optional): Determines which estimate should be used. Optional. The default is true.

**Returns:** The variance of the array's elements.

**Remarks**

If `biased` is true, function will calculate using a biased estimate of the entire population, if false - unbiased estimate of a sample.

Returns `na` if the `id` array is empty.

```pine
//@version=6
indicator("array.variance example")
a = array.new_float(0)
for i = 0 to 9
	array.push(a, close[i])
plot(array.variance(a))
```

**See also:** `array.new_float()`, `array.stdev()`, `array.min()`, `array.avg()`, `array.covariance()`
