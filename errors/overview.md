# Overview

Source: https://www.tradingview.com/pine-script-docs/errors/overview/

## Introduction

Pine Script® uses *runtime errors*, *compilation errors*, and *compiler warnings* to help prevent unintended or erroneous script behaviors:

- Runtime errors occur under specific conditions as a script runs on a dataset. If a script encounters a runtime error while it executes on the chart, it *stops* executing and displays a red “exclamation point” icon in the *status line*. The user can click the icon to view the error message and the bar index on which the error occurred. Pine includes built-in runtime errors for invalid arguments in function calls, history-referencing operations with invalid offsets, and various other error conditions. Programmers can also define custom runtime errors for specific conditions in their scripts by using the `runtime.error()` function.
- Compilation errors occur at compile time, *before* a script begins to run on a dataset. If a script contains *invalid syntax* or other issues that *prevent* compilation, the Pine Editor highlights the problematic code in red and displays an error message to indicate the cause. If the script is on the chart, users can also access the error message from the script’s status line.
- Compiler warnings also occur before a script begins to run. In contrast to compilation errors, these warnings inform users about syntax that does *not* prevent compilation but can cause *unintended* results or behaviors. They can also occur for other reasons, such as using deprecated features or old Pine Script versions. The Pine Editor highlights code that causes a warning in orange, then displays a message outlining the issue and potential solutions. We recommend following the suggestions in compiler warnings to help ensure that a script works as intended.

This page provides an overview of the common runtime errors, compilation errors, and warnings described in the User Manual’s “Errors and warnings” section.

> **Tip:** You can also find information about other errors and warnings for specific features on the pages that describe those features in the User Manual. For example, the sections in the [Type system](../language/type_system.md) page include details about common type-related errors.

## Error reference table

The reference table below lists the current errors and warnings documented in this section of the User Manual. The codes in the “Error/warning code” column link to the pages that contain detailed information about the issues and possible solutions.

> **Note:** This list is not exhaustive. New pages for other common errors and warnings will likely be added over time.

| Error/warning code | Message | Solution |
| --- | --- | --- |
| [CE10101](CE10101.md) | The condition of the “X” statement must evaluate to a “bool” value. | Use only expressions that return values of the [“bool” type](../language/type_system.md#bool) as the conditions in `if` and `switch` statements. |
| [CE10117](CE10117.md) | Compiled code contains too many tokens | This error occurs if the compiled form of the script is *too large*. Typical fixes include reducing embedded data, shortening or removing constant [strings](../concepts/strings.md), replacing repetitive code with [loops](../language/loops.md) or concise function calls, distributing logic across separate scripts, or moving code into [libraries](../concepts/libraries.md). |
| [CW10003](CW10003.md) | The function “X” should be called on each calculation for consistency. It is recommended to extract the call from this scope. | The function call might cause *unintended results* when executing inside a [conditional structure](../language/conditional_structures.md) or loop because it relies on data from *past bars*. Move the call to the *global scope*, and outside conditional expressions, to ensure consistent history-based calculations. |
| [RE10139](RE10139.md) | Memory limits exceeded. | There are multiple possible causes and solutions. A common cause is using `request.*()` calls to request large [collections](https://www.tradingview.com/pine-script-docs/language/collections/) of data across bars. The usual solution for that case is to optimize the requests to return collection IDs only when **necessary**. Consult the error page to learn more. |
| [RE10143](RE10143.md) | The requested historical offset (X) is beyond the historical buffer’s limit (Y). | This error occurs if a script references the history of a variable or expression from *too many* bars back. A typical solution is to use the `max_bars_back()` function to specify how many past bars of data to include in the [historical buffer](../language/execution_model.md#historical-buffers) for the referenced series. |
