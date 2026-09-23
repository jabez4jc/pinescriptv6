# Common error messages

Hand-maintained: legacy parser and compiler messages that the official v6 docs don't cover. For everything else, see:

- [errors/](../errors/overview.md): official v6 error and warning pages (memory limits, historical buffer offsets, `bool` conditions, token limits, and more)
- [writing_scripts/limitations.md](../writing_scripts/limitations.md): current limits on `request.*()` calls (40, or 64 on Ultimate), loop and script execution time, plot counts, drawings

## The if statement is too  long

This error occurs when the indented code (local block) inside an  [`if` structure](https://www.tradingview.com/pine-script-docs/language/conditional-structures/#if-structure)  is too large for the compiler. Because of how the compiler works, you won’t receive a message telling you exactly how many lines of code you are over the limit. The only solution now is to split the structure into smaller parts (functions or smaller  [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if)  statements). The example below shows a reasonably lengthy  [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if)  statement; theoretically, this would throw  `line 4: if statement is too long`:

### Code Example
```pine
//@version=6
indicator("My script")

var e = 0
if barstate.islast
    a = 1
    b = 2
    c = 3
    d = 4
    e := a + b + c + d

plot(e)
```

## Script could not be translated from:  null

### Code Example
```pine
study($)
```

Usually this error occurs in version 1 Pine scripts, and means that code is incorrect. Pine Script® of version 2 (and higher) is better at explaining errors of this kind. So you can try to switch to version 2 by adding a  [special attribute](https://www.tradingview.com/pine-script-docs/language/script-structure/#version)  in the first line. You’ll get  `line 2: no viable alternative at character '$'`:

### Code Example
```pine
// @version=2
study($)
```

## line 2: no viable alternative at character  ’$’

This error message gives a hint on what is wrong.  `$`  stands in place of string with script title. For example:

### Code Example
```pine
// @version=2
study("title")
```

## Mismatched input <…> expecting <???>

Same as  `no viable alternative`, but it is known what should be at that place. Example:

### Code Example
```pine
//@version=6
indicator("My Script")
    plot(1)
```

`line 3: mismatched input 'plot' expecting 'end of line without line continuation'`

To fix this you should start line with  `plot`  on a new line without an indent:

### Code Example
```pine
//@version=6
indicator("My Script")
plot(1)
``` 

## Script has too many local  variables

This error appears if the script is too large to be compiled. A statement  `var=expression`  creates a local variable for  `var`. Apart from this, it is important to note, that auxiliary variables can be implicitly created during the process of a script compilation. The limit applies to variables created both explicitly and implicitly. The limitation of 1000 variables is applied to each function individually. In fact, the code placed in a  _global_  scope of a script also implicitly wrapped up into the main function and the limit of 1000 variables becomes applicable to it. There are few refactorings you can try to avoid this issue:

### Code Example
```pine
var1 = expr1
var2 = expr2
var3 = var1 + var2
``` 

can be converted into:

### Code Example
```pine
var3 = expr1 + expr2
``` 
