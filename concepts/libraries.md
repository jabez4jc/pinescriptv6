# Libraries

Source: https://www.tradingview.com/pine-script-docs/concepts/libraries/

Pine Script® libraries are scripts that *export* reusable [functions](../language/user_defined_functions.md), [methods](../language/methods.md#user-defined-methods), [user-defined types (UDTs)](../language/type_system.md#user-defined-types), [enums](../language/enums.md), or constant [variables](../language/variable_declarations.md) for use in indicators, strategies, or other libraries. Libraries enable programmers to organize reusable code components in one place and import those components into other scripts.

To make a library available to other scripts, the author must [publish](../writing_scripts/publishing.md) it. After the library is published, other scripts can use an `import` statement to access its exported components. This page explains how to create, document, publish, and use libraries. For more details about library syntax, refer to the [`library()`](../language/declaration_statements.md#library) section of the [Declaration statements](../language/declaration_statements.md) page.

> **Tip:** Library programmers should be familiar with the Pine Script [type system](../language/type_system.md), [user-defined functions](../language/user_defined_functions.md), and [function scopes](../language/user_defined_functions.md#function-scopes) before creating libraries.

## Structure of a library

A library script requires the `library()` declaration statement, and it uses the `export` keyword to specify the code components to export. Scripts that import the library can access only the exported components. All other code, such as the code that demonstrates how to use the library’s functions, is available only to the library itself.

The structure of a library’s code must meet the following three criteria:

- It includes the `//@version` [compiler annotation](../language/script_structure.md#compiler-annotations) to specify the Pine Script version.
- It uses the `library()` declaration statement.
- It uses the `export` keyword to export at least one code component.

Additionally, a library’s title acts as an identifier in scripts that import the library. Therefore, the `title` argument of the `library()` declaration statement must follow identifier naming rules:

- It contains only ASCII letters (`a-z` and `A-Z`), digits (`0-9`), and underscores (`_`).
- It does not start with a digit.
- It is not an empty string.

For example, `"Library_for_14_day_averages"` is a valid title, but `"Library for 14-day averages"` causes a compilation error. See the [`title`](../language/declaration_statements.md#title) section of the [Declaration statements](../language/declaration_statements.md) page for more information.

Apart from following these mandatory requirements, programmers can structure their libraries in any way that compiles. However, for clarity, we recommend the following structure:

```
<version>
[<description>]
<declaration_statement>
[<helper_code>]
<exported_code>
[<demonstration_code>]
```

Where:

- `<version>` refers to the required `//@version=6` annotation.
- `<description>` refers to the optional `//@description` annotation, which specifies the library’s default description. See the [Documenting a library](#documenting-a-library) section to learn more.
- `<declaration_statement>` refers to the required `library()` declaration statement.
- `<helper_code>` represents optional *non-exported* functions, types, and variables that the exported code components use.
- `<exported_code>` refers to one or more function definitions, type declarations, or constant variable declarations prefixed by the `export` keyword.
- `<demonstration_code>` represents optional non-exported code that demonstrates the library’s capabilities and how to use its exported components.

The following example script shows a basic library that follows this structure. The script exports a `rangeRatio()` function, which calculates the ratio of a series’ total range to the sum of its absolute one-bar changes over a specified length. The exported function uses a non-exported helper function, `totalAbsChange()`, to calculate the sum of changes. The demonstration code at the end of the script shows how to use the exported function. A script that imports this hypothetical library can call the `rangeRatio()` function, but it *cannot* access the `totalAbsChange()` function or the demonstration code:

```pine
//@version=6

//@description This example script shows the basic structure of a library. The "Publish script" window uses the text
//             from this annotation and the other annotations below to generate a default publication description.
library("LibraryStructureDemo")

//#region --- Functions ---

//@function Calculates the total absolute change in a series over a specified length.
//          This helper function for `rangeRatio()` is *not* exported.
totalAbsChange(float source, int length) =>
    math.sum(math.abs(ta.change(source)), length)

//@function       Calculates the ratio of a series' range to its total absolute change over a specified length.
//                This function *is* exported, because its definition starts with the `export` keyword.
//@param source   The series of values to process.
//@param length   The number of bars in the calculation.
//@returns        The calculated ratio.
export rangeRatio(float source, int length) =>
    ta.range(source, length) / totalAbsChange(source, length)
//#endregion

//#region --- Demonstration code ---

// The code in this region is not exported. It demonstrates how to use the exported function.

//@variable The ratio of the `close` series' range to its total absolute change over 10 bars.
float rr = rangeRatio(close, 10)

// Plot the `rr` series as gradient-colored columns.
color rrColor = color.from_gradient(rr, 0, 1, color.purple, color.orange)
plot(rr, "Range ratio", rrColor, style = plot.style_columns)
//#endregion
```

Note that:

- This script is an unpublished example library. Other scripts cannot import it, because it is not published. See the [Publishing a library](#publishing-a-library) section to learn more.
- The script uses `//#region` and `//#endregion` annotations to create collapsible code regions in the Pine Editor.
- The script defines a default description with the `//@description` annotation, and it documents user-defined functions with the `//@function`, `//@param`, and `//@returns` annotations. To learn more about annotations in libraries, see the [Documenting a library](#documenting-a-library) section.

## Exportable code

A library can prefix any of the following code components with the `export` keyword to make them available to scripts that import the library:

- [User-defined functions and methods](#user-defined-functions-and-methods)
- [User-defined types (UDTs)](#user-defined-types)
- [Enum types](#enums)
- [Constant variables](#constants) of any [fundamental type](../language/type_system.md#types)

The following sections explain the requirements for exporting these components, and the limitations that apply to exported code.

### User-defined functions and methods

One of the most common uses for libraries is exporting [user-defined functions](../language/user_defined_functions.md) and [methods](../language/methods.md#user-defined-methods) for reuse in other scripts. An exported function follows the same general structure and syntax as a non-exported function, with the following additional requirements and limitations:

- Each parameter declaration must include a *type keyword* to specify the parameter type. Non-exported functions do not have this requirement.
- Each parameter declaration can include the `simple` or `series` keyword to specify the parameter’s [type qualifier](../language/type_system.md#qualifiers). However, a declaration *cannot* use the `const` keyword, because exported function parameters cannot have the “const” qualifier. Likewise, an exported function cannot return values qualified as “const” or “input”. See the [Parameter qualifiers](#parameter-qualifiers) section to learn more.
- The function body cannot depend on [inputs](inputs.md) or on global objects of [reference types](../language/type_system.md#reference-types). See the [Outer scope limitations](#outer-scope-limitations) section for more information.
- The function body can contain `request.*()` calls, unless the `dynamic_requests` argument of the `library()` declaration statement is `false`. However, the `expression` argument of each request cannot depend on the exported function’s *parameters*. See the [Exporting `request.*()` calls](#exporting-request-calls) section for more information.
- To call an exported function, a script that imports the library must prefix the function call with the library’s name, or its alias if defined (e.g., `libraryName.functionName()`). To call an exported method, the script can use the same syntax, or method call syntax *without* the namespace (e.g., `variable.methodName()`).

Exported functions also share the following behaviors with non-exported functions:

- Parameter declarations can include default arguments. As with non-exported functions, a default argument cannot be a declared variable or an expression. See the [Structure and syntax](../language/user_defined_functions.md#structure-and-syntax) section of the [User-defined functions](../language/user_defined_functions.md) page.
- Each function call written in a script has a separate local scope. For example, each call has a separate state for the variables that the function declares with the `var` keyword. See the [Scope of a function call](../language/user_defined_functions.md#scope-of-a-function-call) section for more information.
- A library can export several overloads of a function. Exported overloads follow the same rules as non-exported overloads. See the [Function overloading](../language/user_defined_functions.md#function-overloading) section of the [User-defined functions](../language/user_defined_functions.md) page for more information.

#### Parameter types

Exported user-defined functions and methods differ from non-exported functions in how they handle parameter [types](../language/type_system.md#types) and [type qualifiers](../language/type_system.md#qualifiers).

In a non-exported function, type keywords in most parameter declarations are *optional*. If a parameter does not have a specified type, the compiler assigns the parameter the type of its *argument* in each function call. For details about this behavior, refer to the [Type keywords](../language/user_defined_functions.md#type-keywords) section of the [User-defined functions](../language/user_defined_functions.md) page.

By contrast, all parameters in exported functions *require* specified types. Exported function parameters cannot inherit type information from arguments, because libraries compile separately from the scripts that import them.

For example, the following script defines an `angleOfChange()` function that calculates the angle of change in a series over a specified length. The `source` and `length` parameter declarations do not include type keywords. The script compiles successfully, because it does not *export* the function:

```pine
//@version=6
library("ParameterTypesDemo")

//@function       Calculates the angle of change in a series over a specified number of bars.
//                This function is not exported and does not use type keywords in its parameter declarations.
//                Both parameters inherit type information from their arguments.
//@param source   The series of values to process.
//@param length   The number of bars in the calculation.
//@returns        The change angle, in radians.
angleOfChange(source, length) => math.atan(ta.change(source, length) / length)

// This definition is included because libraries require at least one exported component to compile.
export f() => close
```

Adding the `export` keyword to the `angleOfChange()` definition causes a compilation error, because the library cannot export the function without a specified type for each parameter:

```pine
//@version=6
library("ParameterTypesDemo")

// Adding the `export` keyword to this definition causes a compilation error.
// An exported function requires a specified type for each parameter.
export angleOfChange(source, length) => math.atan(ta.change(source, length) / length)
```

Prefixing the parameter declarations with type keywords resolves the error. The following version exports the `angleOfChange()` function without an error, because the function header specifies the parameter types with the `float` and `int` keywords:

```pine
//@version=6
library("ParameterTypesDemo")

//@function       Calculates the angle of change in a series over a specified number of bars.
//                This exported function compiles successfully, because both parameters have specified types.
//@param source   The series of values to process.
//@param length   The number of bars in the calculation.
//@returns        The change angle, in radians.
export angleOfChange(float source, int length) => math.atan(ta.change(source, length) / length)
```

#### Parameter qualifiers

Like non-exported functions, exported functions can prefix a type keyword with the `simple` or `series` keyword to specify the parameter’s qualifier. However, unlike non-exported functions, exported functions *cannot* use the `const` keyword in parameter declarations, because exported parameters cannot have the “const” or “input” qualifier.

If a parameter declaration in an exported function does not include a qualifier keyword, the compiler determines the qualifier based on how the function *uses* the parameter. First, the compiler tests whether the “series” qualifier is compatible. If the function passes the parameter’s value to a local function call that requires a weaker qualifier, the compiler then tests whether the parameter can use the “simple” qualifier. If neither qualifier is compatible with the parameter, the compiler raises an *error*. For details about this behavior, refer to the [Qualifier keywords](../language/user_defined_functions.md#qualifier-keywords) section of the [User-defined functions](../language/user_defined_functions.md) page.

Consider the following example library, which exports a function that passes the value of its `lengthFactor` parameter to a local `ta.atr()` call. The parameter declaration includes a type keyword but no qualifier keyword. After analyzing how the function uses the parameter, the compiler sets the parameter’s qualifier to “simple”. The compiler does *not* assign the “series” qualifier, because the `length` parameter of `ta.atr()` requires a “simple” or weaker value:

```pine
//@version=6
library("ParameterQualifiersDemo")

//@function Calculates the ATR value using a specified length.
//          The `lengthFactor` parameter inherits the "simple" qualifier, because the `length` parameter of
//          `ta.atr()` requires a "simple" or weaker argument.
export myAtr(int lengthFactor) =>
    ta.atr(length = lengthFactor)
```

Adding the `series` keyword to the parameter declaration sets the parameter’s qualifier to “series” instead of letting the compiler infer it. In this example, the keyword causes a *compilation error*, because `ta.atr()` cannot accept a “series int” `length` argument:

```pine
//@version=6
library("ParameterQualifiersDemo")

//@function Calculates the ATR value using a specified length.
export myAtr(series int lengthFactor) =>
    ta.atr(length = lengthFactor) // Causes a compilation error. The `length` parameter cannot accept a "series" value.
```

By contrast, the code compiles successfully if the declaration uses the `simple` keyword, because the “simple” qualifier is compatible with the local function call. For example:

```pine
//@version=6
library("ParameterQualifiersDemo")

//@function Calculates the ATR value using a specified length.
export myAtr(simple int lengthFactor) =>
    ta.atr(length = lengthFactor) // Works as expected.
```

Restricting parameters to “simple” arguments can also help to control the qualifier of the function’s *returned values*. If a function’s result must work with code that requires “simple” or weaker values, prefixing the function’s parameters with the `simple` keyword prevents those parameters from accepting “series” arguments. If the function does not use calculations that depend on other “series” values, it then returns “simple” results.

The following example library exports a `scaledLength()` function that multiplies a length value by a specified factor and rounds the result to an integer. Both parameters use the `simple` keyword, and the function’s calculations do not depend on other “series” values. Therefore, the function returns a “simple int” value:

```pine
//@version=6
library("SimpleResultDemo")

//@function       Scales a length by a specified factor and rounds the result to the nearest integer.
//@param length   The base length.
//@param factor   The scaling factor.
//@returns        The scaled length.
export scaledLength(simple int length, simple float factor) =>
    // Round the product to the nearest whole number.
    // The `math.round()` function returns an "int" result when no `precision` argument is specified.
    math.round(length * factor)
```

Note that:

- Without the keywords, the compiler assigns the “series” qualifier to both parameters, because the function body contains no local function call that requires “simple” values. The function then returns a *“series int”* result.

A script that imports this hypothetical library can use the function’s result as the argument for a `ta.ema()` call’s `length` parameter, which requires a “simple int” value. For example:

```pine
//@version=6
indicator("Simple results demo")

// Import version 1 of the hypothetical library, and set its alias to `sr`.
import userName/SimpleResultDemo/1 as sr

//@variable A "simple int" length, because neither argument of the `scaledLength()` call is stronger than "simple".
int emaLength = sr.scaledLength(20, 1.5)

plot(ta.ema(close, emaLength), "Scaled EMA")
```

Note that:

- This example does not compile, because it imports a hypothetical library. The `userName` path segment is a placeholder.

Because exported functions allow only “simple” or “series” parameters, they also return only “simple” or “series” results. Therefore, values returned by an exported function call are *not compatible* with code that requires “input” or “const” values.

For instance, the `scaledLength()` function from the previous example returns a “simple int” value, even if its arguments are “const” values, because its parameters are qualified as “simple”. A script that imports the library can use the result in calculations that accept “simple” or “series” values, such as the `length` argument of `ta.ema()`. However, the script *cannot* use the result in code that requires a weaker qualifier.

The following example code uses the result of a `scaledLength()` call as the `show_last` argument of a `plot()` call. This argument causes an error, because the `show_last` parameter requires an “input int” or “const int” value:

```pine
int length = sr.scaledLength(20, 1.5)

// This call causes a compilation error, because `length` refers to a "simple int" value.
plot(close, show_last = length)
```

> **Note:** Instances of [reference types](../language/type_system.md#reference-types) automatically inherit the “series” qualifier, regardless of how a script uses them. Therefore, libraries cannot export functions or methods that depend on reference types and return “simple” values, because calculations that use “series” data return “series” results. See the [Type system](../language/type_system.md) page to learn more.

#### Exporting methods

Exported [methods](../language/methods.md#user-defined-methods) follow the same syntax rules as exported functions, except that they include the `method` keyword before the function name. Scripts that import the library can call an exported method with function syntax (e.g., `libraryAlias.methodName(variable)`) or *method call* syntax (e.g., `variable.methodName()` — *without* the library alias).

The following example library exports a `countLessThan()` method that counts the elements in a “float” [array](../language/arrays.md) that are less than a specified value. The library’s demonstration code queues `close` values into an array, calls the method on the array to count the elements that are less than the current `hl2` value, then plots the result:

```pine
//@version=6
library("ExportingMethodsDemo")

//@function           Counts the elements in a "float" array that are less than a specified value.
//@param id           The ID of the array to inspect.
//@param threshold    The threshold value for the comparison.
//@returns            The number of elements less than the specified value.
export method countLessThan(array<float> id, float threshold) =>
    int count = 0
    // Add 1 to the count for each element below the `threshold` value.
    for item in id
        if item < threshold
            count += 1
    count

//#region --- Demonstration code ---

//@variable The ID of an array that stores up to the 50 most recent `close` values.
var array<float> queue = array.new<float>(50, na)
// Queue the latest `close` value: add it to the end of the array, then remove the oldest element.
queue.push(close)
queue.shift()

// Call the exported method with method call syntax.
int countBelow = queue.countLessThan(hl2)
plot(countBelow, "Count below HL2")
//#endregion
```

Note that:

- A script that imports the library can use the same method call syntax to call the `countLessThan()` method, or call the method as a function (e.g., `ExportingMethodsDemo.countLessThan(arrayID, value)`).

User-defined methods can *override* built-in methods if a script calls them with method call syntax. If a script imports a library method whose name and signature match a built-in method, any method calls with that name and signature invoke the *imported* method instead of the built-in method. This behavior can cause unexpected results for library users. To prevent user errors, we recommend giving exported methods names or parameter signatures that *do not* match built-in methods.

To demonstrate this behavior, the following example library exports a custom `sum()` method. The method creates a new array that contains the cumulative sum of a specified array’s elements at each element position, then returns the new array’s ID. The name and signature of this method match the built-in `array.sum()` method, which returns the sum of an array’s elements as a “float” value:

```pine
//@version=6
library("MethodOverrideDemo")

//@function       Overrides the built-in `sum()` method. Creates an array that contains the cumulative sum of the
//                original array's elements at each element position.
//@param id       The ID of the array to process.
//@returns        The ID of a new array containing the cumulative sums.
export method sum(array<float> id) =>
    array<float> result = array.new<float>()
    float cumulative = 0.0
    // Add each element to a running total, and push each total into the `result` array.
    for item in id
        cumulative += item
        result.push(cumulative)
    result
```

If a script imports this hypothetical library, calling the `sum()` method on an array of numbers can cause unexpected results, because the imported method overrides the built-in `array.sum()` method. For instance, the example script below imports the hypothetical library, then passes the result of a `sum()` method call to a `plot()` call. This code causes a *compilation error*. The `sum()` call returns an `array<float>` ID instead of a “float” value, and scripts cannot display the contents of arrays by using the `plot()` function:

```pine
//@version=6
indicator("Overridden method demo")

// Import the hypothetical library.
import userName/MethodOverrideDemo/1

//@variable The ID of an array of queued `close` values.
var array<float> data = array.new<float>(20)
// Queue the latest `close` value.
data.push(close)
data.shift()

// This method call invokes the exported `sum()` method from the `MethodOverrideDemo` library.
// It does *not* invoke the `array.sum()` method. The custom method returns an `array<float>` ID, not a "float" value.
// The compiler therefore infers the type of the `dataSum` variable as `array<float>` instead of the expected "float".
dataSum = data.sum()

// This call causes a compilation error. The `plot()` function cannot plot arrays.
plot(dataSum)
```

Note that:

- If an imported method overrides a built-in method, the script can still access the built-in method by calling it as a *function*. For instance, replacing the `dataSum = data.sum()` variable declaration with `dataSum = array.sum(data)` calls the built-in `array.sum()` function (which returns a “float” value) instead of the imported `sum()` method.
- Even if the above problem is corrected, this example does not compile, because it imports a hypothetical library. The `userName` path segment is a placeholder.

#### Outer scope limitations

Like non-exported functions, exported functions can use code from a library’s global scope. However, unlike non-exported functions, exported functions *cannot* include statements, variables, or expressions that depend on `input.*()` calls or on global objects of any [reference type](../language/type_system.md#reference-types). The values of `input.*()` calls and the IDs or states of objects are *not* available at *compile time*, so other scripts cannot access them from a compiled library. If an exported function or method uses either category of code, a compilation error occurs.

The following example library demonstrates a valid use of global data. The logic of its exported function depends on the `multiplier` global variable. That variable stores a constant value that is available at compile time, so the script compiles successfully:

```pine
//@version=6
library("ValidGlobalCodeDemo")

// A global variable with a constant value. Exported functions can use this variable.
float multiplier = 2.0

//@function       Multiplies a value by the `multiplier` global variable.
//@param value    The value to multiply.
//@returns        The adjusted value.
export multiply(float value) =>
    value * multiplier
```

By contrast, the example library below causes a *compilation error*, because its exported `customMa()` function depends on the value of an [integer input](inputs.md#integer-input):

```pine
//@version=6
library("InvalidInputUseDemo")

// A global input variable. Exported functions cannot depend on its value.
int lengthInput = input.int(20, "Length")

export customMa(float source) =>
    ta.sma(source, lengthInput) // Causes a compilation error.
```

Note that:

- This limitation also applies if the `input.int()` call is inside the exported function’s body. The compiler moves inputs into the global scope, and libraries cannot export variables qualified as “input”.

Instead of using an input, the exported function can *accept* the length value as an argument. For example, the following library version compiles successfully. It adds an “int” parameter named `length` to the `customMa()` function. Scripts that import this hypothetical library can then use integer inputs as the `length` arguments in calls to the function:

```pine
//@version=6
library("ValidParameterLengthDemo")

//@function       Calculates a moving average of a source series over a specified length.
//@param source   The series of values to process.
//@param length   The number of bars in the moving average.
//@returns        The calculated moving average.
export customMa(float source, int length) =>
    ta.sma(source, length)
```

#### Exporting alerts and logs

A library can export functions and methods that contain `alert()` calls. However, users *cannot* create alerts directly from a library on the chart. To use alerts defined by a library, import the library into another script and call the library’s exported alert functions. Then, open the “Create alert” dialog box, and select the other script’s name and “Any alert() function call” in the “Condition” section.

The following example library exports a `maCrossAlert()` function that calls `alert()` on each bar where two moving averages with specified lengths cross:

```pine
//@version=6
library("AlertsDemo")

//@function           Triggers an alert when the fast moving average crosses the slow moving average.
//@param source       The series of values to process.
//@param fastLength   The number of bars for the fast moving average.
//@param slowLength   The number of bars for the slow moving average.
export maCrossAlert(float source, int fastLength, int slowLength) =>
    float fastMa = ta.sma(source, fastLength)
    float slowMa = ta.sma(source, slowLength)
    // Trigger an alert on bars where the moving averages cross.
    if ta.cross(fastMa, slowMa)
        alert("Moving average cross detected", alert.freq_once_per_bar_close)
```

To use the alert from the library, publish the library, import it into an indicator or strategy, then call the `maCrossAlert()` function. The following example script imports the hypothetical library and calls the function. It also plots the two moving averages that the `maCrossAlert()` call uses internally:

```pine
//@version=6
indicator("Importing alert demo", overlay = true)

import userName/AlertsDemo/1 as alertsLib

// Call the exported function on each bar to evaluate the alert condition.
alertsLib.maCrossAlert(close, 10, 20)

// Plot the moving averages that the function uses internally.
plot(ta.sma(close, 10), "Fast SMA", color.teal)
plot(ta.sma(close, 20), "Slow SMA", color.orange)
```

Note that:

- This example does not compile, because it imports a hypothetical library. The `userName` path segment is a placeholder.

A library can also export functions and methods that contain `log.*()` calls, which generate [Pine Logs](../writing_scripts/debugging.md#pine-logs). Scripts that import the library can call these functions to use custom logging routines. However, only *personal* scripts can create logs. Published scripts that import a library can call its logging functions, but they do *not* display the outputs of those calls in the “Pine Logs” pane.

The following example modifies the previous library by adding a `log.info()` call to the `maCrossAlert()` function. The log displays the alert message in the “Pine Logs” pane, enabling programmers to [debug](../writing_scripts/debugging.md) the alert condition in their personal scripts before creating an alert:

```pine
//@version=6
library("AlertsAndLogsDemo")

//@function           Triggers an alert and logs a message in the "Pine Logs" pane on moving average crosses.
//@param source       The series of values to process.
//@param fastLength   The number of bars for the fast moving average.
//@param slowLength   The number of bars for the slow moving average.
export maCrossAlert(float source, int fastLength, int slowLength) =>
    float fastMa = ta.sma(source, fastLength)
    float slowMa = ta.sma(source, slowLength)
    if ta.cross(fastMa, slowMa)
        alert("Moving average cross detected", alert.freq_once_per_bar_close)
        // Log the cross in the "Pine Logs" pane.
        log.info("Moving average cross detected")
```

#### Exporting ​`request.*()`​ calls

Exported library functions and methods can contain `request.*()` calls, enabling programmers to provide custom data requests to library users. Unlike requests in non-exported functions, requests in exported functions have the following constraints:

- The `library()` declaration statement must enable [dynamic requests](other_timeframes_and_data.md#dynamic-requests). If the `dynamic_requests` argument is `false`, the library *cannot* use `request.*()` calls in exported function bodies or other local scopes. It can use `request.*()` calls only in the *global scope* or in the bodies of *non-exported* functions.
- The `expression` argument of a `request.*()` call cannot depend on the *parameters* of the exported function. However, other arguments of the request, such as the ticker ID and timeframe, *can* depend on the function’s parameters.

The following example library exports a function that requests confirmed higher-timeframe open, high, low, and close (OHLC) values for a specified ticker ID. The function’s `tickerID` and `requestTimeframe` parameters define the requested dataset, and the `request.security()` call uses their values as its `symbol` and `timeframe` arguments. The `expression` argument is a [tuple](../language/type_system.md#tuples) that does *not* depend on the function’s parameters:

```pine
//@version=6

//@variable The name of the library, for use in the declaration statement and runtime error.
const string libName = "ExportedRequestDemo"
library(libName)

//@function                Requests confirmed higher-timeframe OHLC values for a specified ticker ID and timeframe.
//                         Raises a runtime error if the requested timeframe is not higher than the chart's timeframe.
//@param tickerID          The ticker ID of the requested dataset.
//@param requestTimeframe  The timeframe of the requested data.
//@returns                 A tuple containing the confirmed open, high, low, and close values.
export htfPrices(string tickerID, string requestTimeframe) =>
    if timeframe.in_seconds(timeframe.main_period) >= timeframe.in_seconds(requestTimeframe)
        runtime.error(libName + ": Requested timeframe must be higher than the chart's timeframe.")
    // Offset the requested values by one bar and use lookahead to retrieve only confirmed values.
    request.security(
        tickerID, requestTimeframe, expression = [open[1], high[1], low[1], close[1]],
        lookahead = barmerge.lookahead_on
    )
```

Note that:

- The `request.security()` call requests confirmed higher-timeframe values by using a one-bar historical offset in the `expression` tuple and `barmerge.lookahead_on` as the `lookahead` argument. See the [Avoiding repainting](other_timeframes_and_data.md#avoiding-repainting) section of the [Other timeframes and data](other_timeframes_and_data.md) page for more information about this technique.
- The function raises a runtime error if the requested timeframe is not higher than the chart’s timeframe. This error prevents the function from returning unintended results for lower timeframes.
- The error text includes the name of the library. Some scripts import multiple libraries, each library might contain multiple error conditions, and script users who are not familiar with the script’s code might report an error. Knowing which library the error came from can help with debugging.

> **Tip:** For an advanced example of a library that exports `request.*()` calls, refer to the [Request](https://www.tradingview.com/script/Rpmobpw5-Request/) publication from the [TradingView](https://www.tradingview.com/u/TradingView/#published-scripts) account.

### User-defined types

Libraries can export [user-defined types](../language/type_system.md#user-defined-types), enabling scripts that import the library to create objects with a predefined structure. Programmers often export UDTs to group related data into single structures, along with [user-defined functions and methods](#user-defined-functions-and-methods) that work with those structures.

To export a UDT, prefix the `type` keyword in the declaration with the `export` keyword.

For example, the following library exports a `RangeInfo` UDT, which defines the structure of objects that store high, low, and midpoint information:

```pine
//@version=6
library("ExportedUserDefinedTypeDemo")

//@type             Defines the structure of objects that store range information for a specified lookback.
//@field hiPrice    The highest value in the range.
//@field loPrice    The lowest value in the range.
//@field midpoint   The midpoint between the high and low values.
export type RangeInfo
    float hiPrice
    float loPrice
    float midpoint
```

Exporting a UDT that a library uses internally is optional if the library exports at least one other code component and no exported component exposes the type to users. By contrast, a library *must* export a UDT if any of the following conditions apply:

- The UDT is the only code component in the library.
- An exported function or method has a parameter that accepts a reference to an object of the type, or the ID of a collection containing such references.
- An exported function or method returns one or more references to objects of the type, or the IDs of collections containing such references.
- Another exported UDT uses the type in its fields.

The example below demonstrates a library that requires an exported UDT. The script exports a `calcRange()` function, which calculates highest, lowest, and midpoint values from two series over a specified length, then returns the ID of a `RangeInfo` object containing the results. It also exports an `isInRange()` method, which checks whether a price is within the range defined by a `RangeInfo` object. Both components directly *expose* the `RangeInfo` type to users. Therefore, the library must also export the type:

```pine
//@version=6
library("UDTLibDemo")

//@type             Defines the structure of objects that store range information for a specified lookback.
//@field hiPrice    The highest value in the range.
//@field loPrice    The lowest value in the range.
//@field midpoint   The midpoint between the high and low values.
export type RangeInfo
    float hiPrice
    float loPrice
    float midpoint

//@function           Calculates range information over a specified number of bars.
//@param sourceHigh   The series to use for the range high.
//@param sourceLow    The series to use for the range low.
//@param length       The number of bars in the range.
//@returns            The ID of a `RangeInfo` object containing the range high, low, and midpoint.
export calcRange(float sourceHigh, float sourceLow, simple int length) =>
    float rangeHigh = ta.highest(sourceHigh, length)
    float rangeLow  = ta.lowest(sourceLow, length)
    float midpoint  = math.avg(rangeHigh, rangeLow)
    // Create a new `RangeInfo` object, and return its ID.
    RangeInfo.new(rangeHigh, rangeLow, midpoint)

//@function           Checks whether a price is within the range of a `RangeInfo` object.
//@param info         The ID of the `RangeInfo` object to inspect.
//@param price        The price to compare with the range.
//@returns            `true` if `price` is between the object's `loPrice` and `hiPrice` values, `false` otherwise.
export method isInRange(RangeInfo info, float price) =>
    price >= info.loPrice and price <= info.hiPrice
```

A script that imports this hypothetical library can call the `calcRange()` function to create a `RangeInfo` object, then call the `isInRange()` method on the object to test whether prices are in a specific range. Because the library exports the `RangeInfo` type, the script can also declare its own variables, functions, and expressions that use objects of the type.

For instance, the following example script imports the hypothetical library and creates a `RangeInfo` object containing range data for the latest 20 bars. The script uses the object’s fields to calculate the distance from the current `close` value to the range midpoint as a fraction of the total range, then plots the result. It also calls the `isInRange()` method on the object to test whether the current `close` value is in range of the highs and lows of the preceding 20 bars, then highlights the chart’s background on each bar where the call returns `true`:

```pine
//@version=6
indicator("Using UDTs demo")

import userName/UDTLibDemo/1 as ranges

//@variable The ID of a `RangeInfo` object that stores range data for the last 20 bars.
var ranges.RangeInfo currentRange = na

// Call the exported `isInRange()` method on the object, with method call syntax.
bool isCloseInRange = not na(currentRange) and currentRange.isInRange(close)

// Update the range object after testing whether the current `close` price is within the range
// from the *preceding* 20 bars.
currentRange := ranges.calcRange(high, low, 20)

//@variable The distance from the `close` value to the range midpoint, as a fraction of the total range.
float oscillator = nz((close - currentRange.midpoint) / (currentRange.hiPrice - currentRange.loPrice))

plot(oscillator, "Oscillator")
bgcolor(isCloseInRange ? color.new(color.orange, 80) : na)
```

Note that:

- This example does not compile, because it imports a hypothetical library. The `userName` path segment is a placeholder.
- The identifier `ranges` is the library’s *alias*. The script uses this alias instead of `UDTLibDemo` to reference the library. See the [Importing and using a library](#importing-and-using-a-library) section below to learn more.
- Because `isInRange()` is an exported method, the script can call it on a `ranges.RangeInfo` object with method call syntax (`currentRange.isInRange(close)`).
- To use an imported UDT name as a type identifier in variable, parameter, or field declarations, a script must include the library’s namespace (name or alias) in the identifier. For instance, our example script uses `ranges.RangeInfo` to refer to the `RangeInfo` type from the hypothetical library.

> **Tip:** If a library exports a UDT, we recommend documenting the type and its fields with the `//@type` and `//@field` compiler annotations. The text from these annotations appears in Pine Editor pop-up windows and in the default publication description. This text helps programmers understand the structure and the data that each object stores. See the [Documenting a library](#documenting-a-library) section for more information.

### Enums

Libraries can export [enums](../language/enums.md) (enumerations), which define fixed groups of named constants (*members*) for strict value control in variables, collections, and conditional logic. Programmers commonly export enums to define limited input choices, named logical states, or strict sets of arguments for exported functions and methods.

To export an enum, prefix the `enum` keyword in the declaration with the `export` keyword. A script that imports the library can then access the enum’s members with the syntax `libraryAlias.enumName.memberName`, where `libraryAlias` is the alias of the imported library, `enumName` is the name of the enum type, and `memberName` is the name of the member.

As with [user-defined types](#user-defined-types), exporting an enum is optional if no exported code component exposes the enum to library users. A library *must* export an enum if any of the following conditions apply:

- The enum is the only code component in the library.
- An exported function or method uses the enum in a parameter declaration or return expression.
- An exported user-defined type uses the enum in one or more of its fields.

The following example library exports a `State` enum with three members — `long`, `short`, and `neutral` — that represent signal states. The library also exports a `calcSignal()` function, which compares two series values and returns the member that indicates whether the first value is above, below, or equal to the second. The other exported function, `signalAlert()`, triggers an alert with a message containing the title of a specified member. The library’s demonstration code uses the exported enum and functions to define alerts for a pair of moving averages:

```pine
//@version=6
library("ExportedEnumDemo")

//#region --- Enums and functions ---

//@enum            Represents signal states for series comparisons.
//@field long      Indicates that the first series is above the second series.
//@field short     Indicates that the first series is below the second series.
//@field neutral   Indicates that the two series are equal or that one or both values are `na`.
export enum State
    long    = "Bullish"
    short   = "Bearish"
    neutral = "Neutral"

//@function        Compares two series values and returns a corresponding signal state.
//@param source1   The first series of values to process.
//@param source2   The second series of values to process.
//@returns         A `State` enum member that indicates the comparison result.
export calcSignal(float source1, float source2) =>
    switch
        source1 > source2 => State.long
        source1 < source2 => State.short
        => State.neutral

//@function        Triggers an alert containing the title of a signal state.
//@param sig       The signal state to evaluate.
export signalAlert(State sig) =>
    string message = "Signal state changed to: " + str.tostring(sig)
    alert(message, alert.freq_once_per_bar_close)
//#endregion

//#region --- Demonstration code ---

float fastMa = ta.sma(close, 10)
float slowMa = ta.sma(close, 20)

//@variable The signal state on the current bar.
State currentSignal = calcSignal(fastMa, slowMa)

// Trigger an alert only on bars where the signal state changes.
if currentSignal != currentSignal[1]
    signalAlert(currentSignal)

plot(fastMa, "Fast SMA", color.teal)
plot(slowMa, "Slow SMA", color.orange)
//#endregion
```

Note that:

- Scripts that import the library can use `ExportedEnumDemo.State` to reference the enum and its members.
- Demonstration code in a library cannot create active alerts on a chart. To trigger alerts from a library, programmers must import the library into an indicator or strategy.

> **Tip:** To help library users understand the meaning of an enum and its members, we recommend documenting the declaration with the `//@enum` and `//@field` compiler annotations. See the [Documenting a library](#documenting-a-library) section below for more information.

### Constants

Libraries can export constant variables of any [fundamental type](../language/type_system.md#types). Programmers often use exported constants to create named presets for inputs, function arguments, and calculations. An exported constant [variable declaration](../language/variable_declarations.md) has the following requirements:

- It must include the `int`, `float`, `bool`, `color`, or `string` keyword to specify the variable’s type.
- It must prefix the type keyword with the `const` qualifier keyword.
- It must start with the `export` keyword.

The following example library exports three constant colors for bullish, bearish, and neutral signals. Scripts that import the library can use these constants to share a consistent palette without repeating the hexadecimal color values:

```pine
//@version=6
library("ExportedConstantsDemo")

//@variable The color for bullish signals.
export const color BULLISH = #2a9d8f

//@variable The color for bearish signals.
export const color BEARISH = #e76f51

//@variable The color for neutral signals.
export const color NEUTRAL = #8d99ae
```

Note that:

- The library documents each exported constant with a `//@variable` annotation. Users who import the library can view the annotation text by hovering over the variable names. See the [Documenting a library](#documenting-a-library) section below to learn more.

A script that imports the library accesses the exported constants in the same way as variables from a built-in namespace. It lists the library’s name (or alias) and the variable’s name, separated by a period (e.g., `ExportedConstantsDemo.BULLISH`).

The following example indicator imports both this library and the `ExportedEnumDemo` library from the [Enums](#enums) section above. The script compares the close price with its 20-bar moving median to get a `State` enum member, then uses a `switch` structure to map the returned member to one of the `ExportedConstantsDemo` library’s exported color constants. It uses the result to set the color of the chart’s bars:

```pine
//@version=6
indicator("Using exported enums and constants demo", overlay = true)

import userName/ExportedEnumDemo/1 as signals
import userName/ExportedConstantsDemo/1 as palette

//@variable The signal state from comparing the `close` price with its 20-bar moving median.
signals.State currentSignal = signals.calcSignal(close, ta.median(close, 20))

//@variable The exported color corresponding to the current signal state.
color barColor = switch currentSignal
    signals.State.long    => palette.BULLISH
    signals.State.short   => palette.BEARISH
    signals.State.neutral => palette.NEUTRAL

barcolor(barColor)
```

Note that:

- This example does not compile, because it imports hypothetical libraries. The `userName` path segments are placeholders.

## Documenting a library

Libraries can use the `@description`, `@function`, `@param`, `@returns`, `@type`, `@enum`, `@field`, and `@variable` *compiler annotations* to document exported code components directly in the source code. These annotations describe functions, methods, types, fields, enums, variables, parameters, and return values, as well as an overview of the library itself, for programmers who use the library. The Pine Editor displays annotation text in pop-up windows as users hover over the library’s identifiers or type calls to exported functions. The “Publish script” window also uses the text to generate the default description for a library publication.

> **Tip:** We recommend using annotations consistently to document exported code. Providing clear annotations helps users understand the library as they work. Documenting non-exported components is also helpful for programmers who read the original source code.

To learn more about annotation syntax, refer to the [Compiler annotations](../language/script_structure.md#compiler-annotations) section of the [Script structure](../language/script_structure.md) page. For details about how the editor formats and displays annotation text from exported functions, refer to the [Documenting functions](../language/user_defined_functions.md#documenting-functions) section of the [User-defined functions](../language/user_defined_functions.md) page.

The following example library exports a `PivotType` enum, a `Pivot` user-defined type, and a `detectPivot()` function. The `PivotType` enum defines named values for identifying a pivot as a high or low. The `Pivot` UDT defines the structure of objects that store the time, price, and type of a detected pivot. The `detectPivot()` function checks for a pivot high or pivot low with the specified numbers of left and right bars. If the function detects a pivot, it returns the ID of a new `Pivot` object containing the pivot’s time, price, and type. Otherwise, it returns `na`. The script documents each exported component — including its members, fields, or parameters and returns — by using the `//@enum`, `//@type`, `//@field`, `//@function`, `//@param`, and `//@returns` annotations:

```pine
//@version=6

//@description Demonstrates how to document exported enums, types, and functions in a library.
library("LibraryDocumentationDemo")

//@enum             Represents the type of a pivot: low or high.
//@field hi         Indicates a high pivot.
//@field lo         Indicates a low pivot.
export enum PivotType
    hi = "High pivot"
    lo = "Low pivot"

//@type             Stores information about a detected pivot.
//@field barTime    The pivot bar's time value.
//@field price      The pivot price.
//@field pivType    Specifies the type of pivot: `PivotType.hi` or `PivotType.lo`.
export type Pivot
    int        barTime
    float      price
    PivotType  pivType

//@function         Detects a pivot high or pivot low and returns its information.
//@param leftBars   The number of bars to the left of the pivot.
//@param rightBars  The number of bars to the right of the pivot.
//@returns          The ID of a `Pivot` object containing the detected pivot's time, price, and type,
//                  or `na` if no pivot is detected.
export detectPivot(simple int leftBars, simple int rightBars) =>
    // The `ta.pivothigh()` and `ta.pivotlow()` calls return `na` on bars without a detected pivot.
    float hi = ta.pivothigh(leftBars, rightBars)
    float lo = ta.pivotlow(leftBars, rightBars)
    // The pivot occurred `rightBars` bars ago, so the new object stores the time from that bar.
    Pivot result = switch
        not na(hi) => Pivot.new(time[rightBars], hi, PivotType.hi)
        not na(lo) => Pivot.new(time[rightBars], lo, PivotType.lo)
        => na
```

## Publishing a library

Before a script can import a library, the author must **publish** the library. Library publications can be public or private, but they are always *open-source*. Unlike [indicators](../language/declaration_statements.md#indicator) and [strategies](../language/declaration_statements.md#strategy), libraries *do not* have protected or invite-only visibility options. See the [Privacy types](../writing_scripts/publishing.md#privacy-types) and [Visibility types](../writing_scripts/publishing.md#visibility-types) sections of the [Publishing scripts](../writing_scripts/publishing.md) page to learn how these publication settings work.

### Preparing the publication

To publish a library, add it to the chart, open its source code in the Pine Editor, and select the “Publish script” option in the top-right corner. The “Publish script” window opens, where the author defines the publication’s title, description, privacy setting, categories, and search tags. See the [Publishing scripts](../writing_scripts/publishing.md) page for the complete publishing workflow, including privacy settings, chart preparation, title and description requirements, editing, and updates.

By default, the publication’s title field uses the `title` argument of the `library()` declaration statement. The library title is also the identifier that scripts use in `import` statements.

> **Notice:** Scripts that import a library reference the `title` argument of its `library()` declaration statement, **not** the publication’s title. To avoid confusing library users, we recommend using the `title` argument as the publication’s title.

If a library contains [compiler annotations](../language/script_structure.md#compiler-annotations), the “Publish script” window uses them to populate the description field automatically. The generated text includes the signatures and annotation text of exported functions, methods, user-defined types, fields, enums, enum fields, constants, parameters, and return values. Authors can edit this text before publishing.

> **Tip:** Before publishing a library, review the annotations in the source code and the default description in the “Publish script” window. Clear annotations keep the source documentation, Pine Editor pop-up windows, parameter hints, and publication text consistent.

When preparing a library publication, we recommend the following practices:

- Keep the publication title consistent with the library title.
- Explain important limitations in the publication description. If the library exports functions that use [`request.*()` calls](#exporting-request-calls), depends on a specific chart type or timeframe relationship, or has other constraints, describe those constraints.
- Publish a *private draft* first. A [private publication](../writing_scripts/publishing.md#private) enables the author to review the default description, chart preview, formatting, and examples before the public release. Public publications can be edited or deleted only during the first 15 minutes after publishing, whereas private publications remain editable indefinitely.
- Review our House Rules. Before publishing, read the [General House Rules](https://www.tradingview.com/house-rules/) and [Script Publishing Rules](https://www.tradingview.com/support/solutions/43000590599-script-publishing-rules/) to ensure that the library and its description meet the requirements for public scripts.
- Write clear release notes for [script updates](../writing_scripts/publishing.md#script-updates). When publishing a new library version, use the release notes to explain all changes and their impact on programmers who use the library. Keep release notes focused on the update rather than repeating the library’s full documentation.

Because libraries serve other Pine Script programmers, their documentation should explain how the library works. Clear annotations, meaningful names, accurate examples, and a concise publication description help programmers understand what the library provides and how its exported code components work.

### House Rules

A library’s privacy type determines which published scripts can import it. Public open-source scripts can import only public libraries. Public protected and invite-only scripts can import public *or* private libraries. Private scripts and personal scripts saved in the Pine Editor can also import public or private libraries.

All published libraries are open-source. Scripts can use a library in two ways: by importing the published library, or by copying code from the library. A script that imports a library and calls its exported code components does not copy the library’s source code into the script. A script that copies library code instead must follow the code reuse requirements in the [Script Publishing Rules](https://www.tradingview.com/support/solutions/43000590599-script-publishing-rules/). In both cases, the publication must credit the library’s author.

Protected and invite-only publications do not display their source code, so library code copied into those publications is no longer available in an open-source form. Therefore, authors of protected or invite-only scripts must obtain explicit permission from the library’s author *before* copying library code into their publications. This permission requirement does not apply to scripts that *import* the library and only use its exported code components.

## Importing and using a library

A script uses a published library by including an `import` statement in its source code. An imported library can provide functions, methods, user-defined types, enums, and constants, depending on which components the library exports. To find published libraries, browse the [Community scripts](https://www.tradingview.com/scripts/?script_type=libraries) feed.

### Import statement

To add an `import` statement, copy the import path from the library’s publication page. On the page, select the “copy” icon beside the import path near the top-right corner. The copied text contains the `import` keyword followed by the library’s full path and version number.

A library can import any accessible published library, including earlier versions of itself. For example, a new library version can import an earlier version to reuse its exported code components while adding or changing its own exported code.

The `import` statement has the following syntax:

```
import <username>/<libraryName>/<libraryVersion> [as <alias>]
```

Where:

- `<username>` is the TradingView username of the library author.
- `<libraryName>` is the `title` argument from the library’s `library()` declaration statement.
- `<libraryVersion>` is the published version number to import.
- `<alias>` is an optional namespace that the script uses to access the library’s exported code components. If the statement does not include an alias, the library’s title is the namespace.

The version number is required. Scripts do not automatically use the latest version of a library, because automatic updates can significantly change script behavior without the author’s knowledge. When a library author publishes an update, the library’s version number increases, and scripts continue to use the version specified in their `import` statements.

> **Tip:** The import path on a library’s publication page points to the latest published version. To update a script to the latest version, copy the current path from the publication page, or update the version number in the script’s `import` statement.

The following example statement imports version 4 of the `RelativeValue` library from the TradingView account and sets its alias to `rv`:

```pine
import TradingView/RelativeValue/4 as rv
```

After importing the `RelativeValue` library, the script can access the library’s exported code components by using dot notation on the alias. For example, `rv.averageAtTime()` calls the library’s exported `averageAtTime()` function.

As programmers type an `import` statement or a library namespace in the Pine Editor, the editor displays autocomplete suggestions for available libraries and exported code components. If an imported library documents its components with annotations, the formatted text from those annotations appears in Pine Editor pop-up windows and parameter hints. The editor’s pop-up windows and hints help programmers understand imported code components without having to repeatedly review the library’s publication.

A script can import several libraries by including a separate `import` statement for each one. Each imported library requires a *unique namespace*. Two import statements cannot use the same alias, and an import statement without an alias uses the library’s title as the namespace. Therefore, if two imported libraries have the same title, at least one of their import statements must specify a unique alias.

For example, the following statements import two hypothetical libraries with the same `MathUtils` title from different authors, plus the `RelativeValue` library. Although two statements import different libraries with the same title, both are valid because each one defines a unique alias for the script to reference:

```pine
import userName/MathUtils/2 as userMath
import otherUser/MathUtils/5 as otherMath
import TradingView/RelativeValue/4 as rv
```

Note that:

- The `userName/MathUtils` and `otherUser/MathUtils` paths are hypothetical placeholders. A script that contains these statements does not compile.

### Using imported code

After a script imports a library, it accesses the library’s exported code components by using dot notation on the library’s *alias* or *title* (the *namespace*). This qualification distinguishes imported code components from [built-ins](../language/built_ins.md), the script’s own variables and functions, and code components imported from other libraries.

The syntax for referencing each type of exported code component is as follows:

- **Functions:** `<namespace>.<functionName>()`
- **Methods:** `<objectID>.<methodName>()` to call the method on an object, or `<namespace>.<methodName>(<objectID>)` to call the method as a function
- **UDTs:** `<namespace>.<typeName>`
- **Enum members:** `<namespace>.<enumName>.<memberName>`
- **Constants:** `<namespace>.<constantName>`

The following example script imports the [RelativeValue](https://www.tradingview.com/script/cZnSLls2-RelativeValue/) library as `rv`. It calls the exported `calcCumulativeSeries()` and `averageAtTime()` functions to calculate a relative volume ratio, then plots the ratio as columns:

```pine
//@version=6
indicator("Using imported functions demo")

import TradingView/RelativeValue/4 as rv

// Define semi-transparent colors for the columns above and below the average.
color TEAL = color.new(color.teal, 50)
color RED  = color.new(color.red,  50)

string anchorTimeframeInput = input.timeframe("1D", "Anchor timeframe")
int    lengthInput          = input.int(20, "Periods in average", minval = 1)

//@variable Is `true` on the first bar of each new anchor period.
bool isAnchor = timeframe.change(anchorTimeframeInput)

//@variable The cumulative volume in the current anchor period, from the imported `calcCumulativeSeries()` function.
float currentVolume  = rv.calcCumulativeSeries(volume, isAnchor)
//@variable The average cumulative volume at the same time in past periods, from the `averageAtTime()` call.
float averageVolume  = rv.averageAtTime(volume, lengthInput, anchorTimeframeInput)
//@variable The ratio between the two values.
float relativeVolume = currentVolume / averageVolume

// Plot the ratio as columns based at 1, so values above and below the average extend in opposite directions.
plot(relativeVolume, "Relative volume", relativeVolume >= 1 ? TEAL : RED, 1, plot.style_columns, histbase = 1)
hline(1, "Average")
```

Imported [UDTs](../language/type_system.md#user-defined-types) and [methods](../language/methods.md#user-defined-methods) enable scripts to work with object structures that a library defines. A script can store related data in objects of an exported UDT, then call exported methods on those objects.

The following example script imports the [ValueAtTime](https://www.tradingview.com/script/FjIfbP3i-ValueAtTime/) library as `vat`. The script creates a `vat.Data` object that stores successive `close` values and timestamps, then retrieves the value and timestamp closest to one month before the current bar and plots the retrieved value. On the last confirmed historical bar, the script draws a [label](../visuals/text_and_shapes.md#labels) at the retrieved point:

```pine
//@version=6
indicator("Using imported UDTs and methods demo", overlay = true)

import TradingView/ValueAtTime/2 as vat

//@variable The ID of a `vat.Data` object that collects `close` values and their timestamps.
vat.Data data = vat.collectData(close, timeframeLimit = "1M")

// Retrieve the `close` value and timestamp closest to one month before the current bar.
[monthAgoClose, monthAgoTime] = data.valueAtPeriodOffset("1M")

// Plot the `close` price now and from one month ago.
plot(close, "Close")
plot(monthAgoClose, "Close one month ago")

// Draw a label at the retrieved point on the last confirmed historical bar.
if barstate.islastconfirmedhistory
    label.new(
        monthAgoTime, monthAgoClose, "Closest value from one month ago",
        xloc = xloc.bar_time, style = label.style_label_up
    )
```

## Tips

Follow these tips to make libraries easier to use:

- **Export only necessary components.** Export only the functions, methods, types, enums, and constants that scripts need to access after importing the library. Helper code for internal calculations can remain unexported.
- **Use clear names.** Choose identifiers that describe or hint at what exported functions, methods, types, enums, and constants do. Avoid ambiguous abbreviations, and avoid names that can be confused with [built-in](../language/built_ins.md) namespaces or variables.
- **Document exported code.** Use [compiler annotations](../language/script_structure.md#compiler-annotations) to describe each exported definition, parameter, field, and return value. Clear annotations help programmers understand the library in the Pine Editor and generate a useful publication description. See the [Documenting a library](#documenting-a-library) section for additional details.
- **Include practical examples in the description.** Provide examples that show common ways to import the library and use its exported code components. Short examples help programmers understand typical usage patterns without inspecting the full source code.
- **Include demonstration code at the end of the library.** A short example at the end of the script shows how to use the exported components. Demonstration code also produces visible chart outputs. These outputs appear in the publication preview and help users understand the library as they browse published scripts.
- **Prevent unintended use cases.** Define [parameter types](../language/user_defined_functions.md#declaring-parameter-types), [qualifiers](../language/user_defined_functions.md#qualifier-keywords), and runtime errors (using the `runtime.error()` function) to prevent unsupported values or misleading results. If the demonstration code includes inputs, use applicable `input.*()` arguments, such as `minval`, `maxval`, and `options`, to limit user selections.
