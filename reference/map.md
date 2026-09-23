# `map.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Functions

### map.clear()

Clears the map, removing all key-value pairs from it.

```pine
map.clear(id) → void
```

**Arguments**

- `id` (any map type): A map object.

```pine
//@version=6
indicator("map.clear example")
oddMap = map.new<int, bool>()
oddMap.put(1, true)
oddMap.put(2, false)
oddMap.put(3, true)
map.clear(oddMap)
plot(oddMap.size())
```

**See also:** `map.new<type,type>()`, `map.put_all()`, `map.keys()`, `map.values()`, `map.remove()`

### map.contains()

Returns `true` if the `key` was found in the `id` map, `false` otherwise.

```pine
map.contains(id, key) → series bool
```

**Arguments**

- `id` (any map type): A map object.
- `key` (series <type of the map's elements>): The key to search in the map.

```pine
//@version=6
indicator("map.includes example")
a = map.new<string, float>()
a.put("open", open)
p = close
if map.contains(a, "open")
	p := a.get("open")
plot(p)
```

**See also:** `map.new<type,type>()`, `map.put()`, `map.keys()`, `map.values()`, `map.size()`

### map.copy()

Creates a copy of an existing map.

```pine
map.copy(id) → map<keyType, valueType>
```

**Arguments**

- `id` (any map type): A map object to copy.

**Returns:** A copy of the `id` map.

```pine
//@version=6
indicator("map.copy example")
a = map.new<string, int>()
a.put("example", 1)
b = map.copy(a)
a := map.new<string, int>()
a.put("example", 2)
plot(a.get("example"))
plot(b.get("example"))
```

**See also:** `map.new<type,type>()`, `map.put()`, `map.keys()`, `map.values()`, `map.get()`, `map.size()`

### map.get()

Returns the value associated with the specified `key` in the `id` map.

```pine
map.get(id, key) → <value_type>
```

**Arguments**

- `id` (any map type): A map object.
- `key` (series <type of the map's elements>): The key of the value to retrieve.

```pine
//@version=6
indicator("map.get example")
a = map.new<int, int>()
size = 10
for i = 0 to size
	a.put(i, size-i)
plot(map.get(a, 1))
```

**See also:** `map.new<type,type>()`, `map.put()`, `map.keys()`, `map.values()`, `map.contains()`

### map.keys()

Returns an array of all the keys in the `id` map. The resulting array is a copy and any changes to it are not reflected in the original map.

```pine
map.keys(id) → array<type>
```

**Arguments**

- `id` (any map type): A map object.

**Remarks**

Maps maintain insertion order. The elements within the array returned by this function will also be in the insertion order.

```pine
//@version=6
indicator("map.keys example")
a = map.new<string, float>()
a.put("open", open)
a.put("high", high)
a.put("low", low)
a.put("close", close)
keys = map.keys(a)
ohlc = 0.0
for key in keys
	ohlc += a.get(key)
plot(ohlc/4)
```

**See also:** `map.new<type,type>()`, `map.put()`, `map.get()`, `map.values()`, `map.size()`

### map.new<type,type>

Creates a new map object: a collection that consists of key-value pairs, where all keys are of the `keyType`, and all values are of the `valueType`.

`keyType` can be a primitive type or enum. For example: `int`, `float`, `bool`, `string`, `color`.

`valueType` can be of any type except `array<>`, `matrix<>`, and `map<>`. User-defined types are allowed, even if they have `array<>`, `matrix<>`, or `map<>` as one of their fields.

```pine
map.new<keyType, valueType>() → map<keyType, valueType>
```

**Returns:** The ID of a map object which may be used in other map.*() functions.

**Remarks**

Each key is unique and can only appear once. When adding a new value with a key that the map already contains, that value replaces the old value associated with the key.

Maps maintain insertion order. Note that the order does not change when inserting a pair with a `key` that's already in the map. The new pair replaces the existing pair with the `key` in such cases.

```pine
//@version=6
indicator("map.new<string, int> example")
a = map.new<string, int>()
a.put("example", 1)
label.new(bar_index, close, str.tostring(a.get("example")))
```

**See also:** `map.put()`, `map.keys()`, `map.values()`, `map.get()`, `array.new<type>()`

### map.put()

Puts a new key-value pair into the `id` map.

```pine
map.put(id, key, value) → <value_type>
```

**Arguments**

- `id` (any map type): A map object.
- `key` (series <type of the map's elements>): The key to put into the map.
- `value` (series <type of the map's elements>): The key value to put into the map.

**Returns:** The previous value associated with `key` if the key was already present in the map, or `na` if the key is new.

**Remarks**

Maps maintain insertion order. Note that the order does not change when inserting a pair with a `key` that's already in the map. The new pair replaces the existing pair with the `key` in such cases.

```pine
//@version=6
indicator("map.put example")
a = map.new<string, float>()
map.put(a, "first", 10)
map.put(a, "second", 15)
prevFirst = map.put(a, "first", 20)
currFirst = a.get("first")
plot(prevFirst)
plot(currFirst)
```

**See also:** `map.new<type,type>()`, `map.put_all()`, `map.keys()`, `map.values()`, `map.remove()`

### map.put_all()

Puts all key-value pairs from the `id2` map into the `id` map.

```pine
map.put_all(id, id2) → void
```

**Arguments**

- `id` (any map type): A map object to append to.
- `id2` (any map type): A map object to be appended.

```pine
//@version=6
indicator("map.put_all example")
a = map.new<string, float>()
b = map.new<string, float>()
a.put("first", 10)
a.put("second", 15)
b.put("third", 20)
map.put_all(a, b)
plot(a.get("third"))
```

**See also:** `map.new<type,type>()`, `map.put()`, `map.keys()`, `map.values()`, `map.remove()`

### map.remove()

Removes a key-value pair from the `id` map.

```pine
map.remove(id, key) → <value_type>
```

**Arguments**

- `id` (any map type): A map object.
- `key` (series <type of the map's elements>): The key of the pair to remove from the map.

**Returns:** The previous value associated with `key` if the key was present in the map, or `na` if there was no such key.

```pine
//@version=6
indicator("map.remove example")
a = map.new<string, color>()
a.put("firstColor", color.green)
oldColorValue = map.remove(a, "firstColor")
plot(close, color = oldColorValue)
```

**See also:** `map.new<type,type>()`, `map.put()`, `map.keys()`, `map.values()`, `map.clear()`

### map.size()

Returns the number of key-value pairs in the `id` map.

```pine
map.size(id) → series int
```

**Arguments**

- `id` (any map type): A map object.

```pine
//@version=6
indicator("map.size example")
a = map.new<int, int>()
size = 10
for i = 0 to size
	a.put(i, size-i)
plot(map.size(a))
```

**See also:** `map.new<type,type>()`, `map.put()`, `map.keys()`, `map.values()`, `map.get()`

### map.values()

Returns an array of all the values in the `id` map. The resulting array is a copy and any changes to it are not reflected in the original map.

```pine
map.values(id) → array<type>
```

**Arguments**

- `id` (any map type): A map object.

**Remarks**

Maps maintain insertion order. The elements within the array returned by this function will also be in the insertion order.

```pine
//@version=6
indicator("map.values example")
a = map.new<string, float>()
a.put("open", open)
a.put("high", high)
a.put("low", low)
a.put("close", close)
values = map.values(a)
ohlc = 0.0
for value in values
	ohlc += value
plot(ohlc/4)
```

**See also:** `map.new<type,type>()`, `map.put()`, `map.get()`, `map.keys()`, `map.size()`
