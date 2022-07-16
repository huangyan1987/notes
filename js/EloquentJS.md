Eloquent JS, Third Edition

https://eloquentjavascript.net/

# Modern JS (ES6+):

- var, let, & const
- Template strings, backticks and dollar-curly, ``like ${this}``
- for-of loops
- spread/rest operator `...`
- Default parameters
- Destructuring: `let [first, second] = arr; let {name} = obj;`
- HOFs for Arrays: forEach, filter, map, reduce, every, some
- UTF-16: each unicode symbol is a code point, made up of one or more code units.
- try-catch-finally
- Classes:
    - class, constructor
    - get, set
    - static
    - extends, super
    - instanceof (especially for Exceptions)
- Major New Language Classes:
    - Map
    - Set
    - Symbol
    - Iterator: [Symbol.iterator]
    - Error
    - Promise
        - new, (resolve, reject), then, all,
- Promises, `async`, `await`:
    - async functions return a promise
    - the promise is resolved with return or rejected if an exception is thrown
    - within the async function, put await in front of promise expressions
- Generators:
    - `function*`, `yield`
    - each next() runs the function until it hits yield

# Modules:
- CommonJS modules uses: `const foo = require("foo")`
- ES modules: `import foo from "foo"`
    - import, from
    - export, export default

# Useful features/functions:

```
Array.from
Function#apply
Function#call
Math.random
Object.assign
Object.create
Object.getPrototypeOf
Object#hasOwnProperty
Object.keys
```

# Notes

Shorthand:

a: array
e: element
i: index
f: function, typical params: (e, i, a)
o: object
n: number
s: string
v: value

## Array:

Simple functions:
Predicates: every includes some
Important: concat filter fill(o) forEach indexOf join(s=',') map pop push reverse shift slice sort unshift
Less used: copyWithin find(f) findIndex(f) flat flatMap keys lastIndexOf reverse values

Notes: 
- includes is predicate indexOf. Both use equals comparison. 
- Use find & findIndex to search by predicate.
- pop & push work on right end. shift & unshift work on left end
- concat & slice return shallow copies. slice can take negative index which starts from right.
- sort sorts in place. Can take a comparator; default is ascending string-sort. Careful w/ numbers!

More complex functions:
- reduce(f, init), where f(accumulator, current, index, array), starts from left. reduceRight starts from right.
- splice: removes/inserts array in place. returns what was removed
    - (start): from start, removes until end of array. if start is negative, goes from end.
    - (start, n): from start, removes n elements
    - (start, n, items): removes n elements from start and inserts items
- Array.from(obj)(obj, mapFn): turns obj into an array. can apply mapFn to each element