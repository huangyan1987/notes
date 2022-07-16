tips.md

# Simple conversions

## To boolean:

```js
!!x
```

## To string:

```js
''+x
```

## To number:

```js
+x
```

## Unix time, i.e. milliseconds since epoch
Same as "To number" for date:
```
+date
```

## To array:

```js
Array.from(x) // if x is array-like
[...x]        // if x is iterable
```

## Check if is NaN

```js
x !== x // NaN is the only value this is true for
```

# Easily confused parts

## for-of vs for-in

for-**of** loops over the **o**bjects/values. _Generally favor for-of_

for-**in** loops through **in**dex values (techincally all the enumerable property keys). _Generally avoid for-in_

If you need the index _and_ the value in an arry, try:

```js
const arr = ['a', 'b', 'c']
for (const [index, value] of arr.entries()) {
  // use index & value
}
```

# More Number stuff

## Truncate number

This removes decimal part of a number.

This is _NOT_ rounding. (For rounding, use: `Math.round`, `Math.ceil`, or `Math.foor`)

```js
// truncate only works if the number is "integer safe"
~~x
x >>> 0
x | 0
Math.trunc(x) // ES6
```

# More Array stuff

## Array.of vs new Array

```
new Array(2) // length is 2: [undef, undef]
Array.of(2)  // array with 2 as only element: [2]
```

## Fill array with value

```

let arr = new Array(n).fill(val)
// arr has length n, all val

```
