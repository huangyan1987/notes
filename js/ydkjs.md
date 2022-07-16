# Notes from YouDontKnowJS

[You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS)

# Prototypes

Top of the prototype chain is `Object.prototype`

    Object.getPrototype(foo) === Foo.prototype

    Foo.prototype.constructor === Foo

Functions aren't constructors. A "constructor" is any function called with `new`
JS uses delegation, as opossed to copying (like used by OOP).

Think of objects as side-by-side or as peers.

OOLO: Objects linked to other objects

*Gotcha: null has type object: `typeof null === 'object'`*

*Fix*:
```
function isNull(a) {
  return (!a && (typeof a === 'object'))
}
```

Don't confuse `undefined` with "undeclared". Careful when checking global vars.
```
if (DEBUG) // can throw!
if (typeof DEBUG !== 'undefined') // OK
if (window.DEBUG) // BETTER
```

`typeof` returns one of the following (as a string):
- undefined
- boolean
- number
- string
- object 
- symbol *(ES6+)*


# Arrays

Arrays are **mutable**

*Gotcha: Using `delete` on an array will remove the elem but will *NOT* update the .length*

# Strings

Strings are **immutable**

Similarities with Arrays:
- .length 
- .indexOf(e)
- .concat(o)

Differences:
- cannot assign using s[0] = 'x'

To "borrow" array methods:
```
var s = 'foo'
s.join === undefined
s.map  === undefined

Array.prototype.join.call(s, '-') // => 'f-o-o'
Array.prototype.map.call(s, function (c) {
  return c.toUpperCase() + '.'
}).join('') // => 'F.O.O.'
```

To reverse ASCII strings: `s.split('').reverse().join('')`

# Numbers

*Pro tip: use unary `+` to convert to integers*

*Gotcha: but be aware of:*
```
+true === 1
+false === 0
+null === 0
+undefined // => NaN
```

Single type for "integers" and floats (IEEE 754 / double floating point)

Use `.toFixed` for fixing decimal places

Use `.toPrecision` for fixing sig figs

As with all floats, don't compare directly for *equality*

ES6+ has `Number.EPSILON`

```
// succinct:
Number.EPSILON |= Math.pow(2, -52)

// explicit:
if (!Number.EPSILON) {
  Number.EPSILON = Math.pow(2, -52)
}
```

Then define:
```
function floatEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON
}
```

Safe integers are within `[-(2^(53)-1), 2^(53)-1]` i.e. ES6+ `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`

**Gotcha: 64-bit numbers cannot be represented in JS** Use strings instead.

ES6+ has Number.isInteger

```
Number.isInteger = Number.isInteger || function (a) {
  return (typeof a === 'number') && (a % 1 === 0)
}
```

```
Number.isSafeInteger = Number.isSafeInteger || function (n) {
  return Number.isInteger(n) && (Math.abs(n) <= Number.MAX_SAFE_INTEGER
}
```


To force to 32-bit: `n |= 0`. Values that can't be represented will be `0`, like -0, NaN, Infinity, and -Infinity


`~` is two's complement. 

*Pro Tip: `~(-1) === 0)` so use `if(~x)` as equivalent to `if (x !== -1)`*

So can use `~` to coerce to boolean where -1 is `false` and all else is `true`

This is useful for `indexOf` which returns -1 for "not found"

```
if (~text.indexOf(pattern)) {
  // found pattern in text
}

if (!~text.indexOf(pattern) {
  // didn't find pattern in text
}
```


*Pro-tip: double complement `~~x` truncates to 32-bit integers* (similar to `x | 0`)


# Boolean

*Pro tip: double bang `!!x` converts to boolean*


# Special values: null and undefined and NaN

`undefined`: hasn't had a value yet or is *missing* a value

`null`: is an *empty* value or *had* a value but doesn't anymore

`NaN`: not a number

Only use `window.isNaN(n)` to check for NaN

```
function isNaN(x) {
  return x !== x // NaN is the only value that this is true for!
}
```

*Gotcha: `1/0 === Number.POSITIVE_INFINITY && -1/0 === Number.NEGATIVE_INFINITY`*

*Gotcha: overflow **rounds** to Infinity*

```
var inf = (1/0) // a.k.a Infinity
inf / inf // => NaN
0 === (n / inf)
```

# Zeroes

*Gotcha: careful with `+0` and `-0`*

```
function isNegZero(n) {
  n = Number(n)
  return (n === 0) && (1/n === -Infinity)
}
```

`Object.is(x,y)` lets you test anything for equality. It's different from `===` in that:
- `Object.is(NaN, Nan)` is `true` but `===` treats them as **not** equal
- `Object.is(-0, +0)` is `false` but `===` treats them as **equal**


```
Object.is = Object.is || function(a,b) {
  if (a === 0 && b === 0) {
    return 1/a === 1/b
  }
  if (a !== a) {
    // a is NaN
    return b !== b
  }
  // default to ===
  return a === b
}
```

To copy an array: `a.slice()`

*Gotcha: do **not** use `new String` or `new Number` and **NEVER** use `new Boolean`* It's okay to use `String(x)` or `Boolean(x)`


# Date

```
Date.now = Date.now || function () {
  return (new Date()).getTime()
}

// to get date as number
+new Date()
```

It's convention for a function like `String.prototype.XYZ` to be shortened to `String#XYZ`

# Coercion (aka casting)

```
var a = 42
a + "" // => "42", implicit conversion
String(a) // => "42", explicit conversion
```

## toString

primitives usually end up as like "null" or "undefined" or "true". Objects call Object#toString, which usually causes "[object Object]", unless `toString` is defined.

Arrays have `toString` defined: `[1,2,3] + "" // => "1,2,3"`

`JSON.stringify` omits undefined, function, and symbols


# Falsy values

```
false
null
undefined
+0
-0
NaN
""
```

Everything else is `true` including `{}`, `[]`, `"false"`, `"0"`, and `function(){}`

# Loose/coercion equals `==`

*Gotcha: **never** compare to false or true with ==*

Other weird cases:
```
"" == 0  // => true
"" == [] // => true
0 == []  // => true
```

`==` Rules:

1. If *either* side can have `true` or `false` values, do not use `==`
2. If *either* side can have `[]`, `""`, or `0` values, do not use `==`
3. Otherwise, it's safe to use `==`

# Grammar

For `var a = 3 * 6`

The whole line is a **statement**

The `3 * 6` is an **expression**

The `a = 3 * 6` is an **assignment expression**

The `var a` is a **declaration statement**

A block has a completion value of the last statement or expression.
