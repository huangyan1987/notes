# JavaScript: The Good Parts by Douglas Crockford (2008)

# Ch 3: Objects

simple types: numbers, strings, booleans, null, & undefined

other types are *objects*

object-like: numbers, strings & booleans (all are immutable)

objects: objects, arrays, functions, & regexs

Use `||` for defaults/fallbacks. Use `&&` to defend against `TypeError` thrown from accessing `undefined`

All objects are **passed by reference**

Objects have properties, and each property has a name and a value. When talking about them, if I say a
property *is something* I usually mean that the *property's value is something*. So below, the object `obj`
has an `age` that is `31`.

```
var obj = {
    name: value,
    age: 31,
    "wears glasses": true
};
```

Properties are most commonly accessed via the *dot operator* in code.
The *subscript operator* has to be used if the property name has spaces or is a variable. For example:

```
obj.name
obj["wears glasses"]
var str = "name"
obj[str]
```

All objects from literals are linked to Object.prototype via their `prototype` property. This protoype linkage
is how JS handles OOP. I'll just refer to it as "linked."

To create a new object, using an existing one as its prototype:
```
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    }
}
```

The `typeof` operator returns the type of the object as a string

*Gotcha*: `typeof null == 'object'`

*Gotcha*: `typeof [] == 'object'`

**Delegation:**
Changing a property doesn't change its prototype. Only in retrieval is the prototype looked
at if the object lacks the property name, all the way to Object.prototype or returns `undefined`

`hasOwnProperty` looks at only the object it's called on; it does *not* go through the prototype chain.

`for in` loops over all property names, including functions and prototypes, and in no guaranteed order, so take care:

```
var name;
for (name in obj) {
    if (obj.hasOwnProperty(name) && typeof obj[name] !== 'function) {
        document.writeln(name + ':' + obj[name]);
    }
}
```

# Ch 4 Functions

Functions are all linked ot Function.prototype which is linked to Object.prototype

Each function has these two hidden properties:
1. its context
2. the code that implements its behavior

Each function also has a `prototype` property, which is an object with a `constructor` property which is the function.

Functions have all the other properties of Objects:
1. can be stored in variables, objects, or arrays
2. passed into and returned from other functions
3. can have methods

Function parameters are loose: extra params are *ignored* and missing ones are `undefined`. No type checking, obviously.

When invoked, functions are also passed in two special parameters:
1. `this`
2. `arguments`

*Gotcha:* `arguments` is array-like, it has `.length` and uses bracket-access, but is **not an Array**

Four invocation patterns, the X invocation pattern, where X is one of:
1. method
2. function
3. constructor
4. apply

## Method Invocation

When a function is a property of an object, it's a **method**.

`myObj.increment()`

When invoked (via dot or subscript), it's invoked as a **method** and `this` is bound to **that object.**

## Function Invocation

When a function is not the property of an object, then it's invoked as a **function**.

`add(3, 4)`

When invoked, `this` is bound to **the global object**.

*Gotcha*: This is a flaw in the language. It would've been better to bind to the `this` of the outer function.
A common workaround is within the outer function to assign `this` to a new variable, which the innter function
will close over:

```
obj.double = function () {
    var that = this // WORKAROUND
    var helper = function () {
        that.value *= 2
    }
    helper() // invoke helper as a *function*
};
obj.double() // invoke double as a *method*
```

## Constructor Invocation

JS uses **prototypal inheritence** and is *class-free* but uses *classical* syntax.

If a function is invoked with the `new` prefix, then a new object will be created with a hidden
link to the value of the function's `prototype` member and `this` will be bound to **that new object.**

Functions intended to be called with `new` are called *constructors* and are capitalized by convention.

```
var Thing = function (str) {
    this.status = str
}
Thing.prototype.getStatus = function () {
    return this.status
}   
var thing = new Thing('foo')
thing.getStatus() === 'foo'
```

## Apply/Call Invocation

In JS, functions can have methods.

The `apply` method lets us construct an array of arguments to invoke a function.

`apply` takes two args:
1. value bound to `this`
2. array of parameters

With `apply`, `this` is bound to the **first argument**

```
add.apply(null, [3, 4]) == 7

// make something that has a `status` property
var foo = { status: 'OK' }
Thing.prototype.getStatus.apply(foo) === 'OK'
```

The same applies for `call` but takes in parameters as a list:

```
add.call(null, 3, 4) == 7
```

## Return value

If not given a return value, functions return `undefined` by default (or `this` when called with `new`)


## Exceptions

Exceptions are just objects, they should have `name` and `message` properties.

## Augmenting prototype

Can add methods to the prototype and it's available to all objects.

To avoid dealing with `prototype`, use the following:

```
Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
};
```

With that, we can easily augment the language:

```
Number.method('integer', function () {
    return Math[this < 0 ? 'ceil' : 'floor'](this)
}
(-10 / 3).integer() === -3
```

```
String.method('trim', function () {
    return this.replace(/^\s+|\s+$/g, '')
}
' asdf ' === 'asdf'
```

## Recursion

JS does not have tail recurssion optimization.

## Scope & Closure & Modules

JS has **function scope, and NOT block scope**. Variables defined anywhere within a function are available anywhere within the function.

Functions do close over their outer function's parameters and variables.

Closures provide a primitive way to create modules (This is obsolete in ES6+ but good to know).


## Cascade

Methods that return `this` when possible can allow for chaining.

## Curry

Currying is creating a function from another with some arguments set:

```
Function.method('curry', function() {
    var slice = Array.prototype.slice, // needed b/c arguments is not an Array
        args = slice.apply(arguments),
        that = this
    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)))
    };
}
```

## Memoizer

```
var memoizer = function (memo, formula) {
    var recur = function (n) {
        var result = memo[n]
        if (typeof result !== 'number') {
            result = formula(recur, n)
            memo[n] = result
        }
        return result
    }
    return recur
}

var fib = memoizer([0, 1], function (recur, n) {
    return recur(n-1) + recur(n-2)
}
var fact = memoizer([1, 1], function (recur, n) {
    return n * recur(n-1)
}
```

# Ch 5 Inheritance (skipping)

# Ch 6 Arrays

Arrays inherit from `Arrays.prototype`

## Length

The `length` property is the **largest integer** property name in the array, plus one.

```
var arr = []
arr.length === 0

arr[1000] = 1;
arr.length === 1001
```

`length` is mutable. If decreased, then the array is shortened.

Add entries with either:

```
arr[arr.length] = 'foo'
arr.push('foo')
```

# Delete

*Gotcha*: don’t use `delete` on an array. Use `.splice(x,y)` instead.

Splice is goes to index x and removes y elements. However, this is **not** fast, all the elements have to be “moved down”.


*Gotcha*: typeof returns 'object' for arrays

```
function is_array(x) {
    return x && typeof x == 'object' && x.constructor === Array
}
// OR
function is_array(x) {
    return Object.prototype.toString.apply(x) === '[object Array]'
}
```

# Ch 7 Regular Expressions (skipping)

# Ch 8 Methods

## Array

```
concat(item...)
join(separator)
pop()
push(item...)
reverse()
shift()
slice(start, end)
sort(comp)
splice(start, deleteCount, item...)
unshift(item...)
```

## Function

```
apply(thisArg, argsArray)
```

## Number

```
toExponential(fractionDigits)
toFixed(fractionDigits)
toPrecision(precision)
toString(radix)
```

## Object

```
hasOwnProperty(name)
```

## Regexp

```
exec(string)
test(string)
```

## String

```
charAt(pos)
charCodeAt(pos)
concat(string...)
indexOf(searchString, position)
lastIndexOf(searchString, position)
localeComparison(that)
match(regexp)
replace(searchValue, replaceValue)
search(regexp)
slice(start, end)
split(separator, limit)
substring(start, end)
toLocaleLowerCase()
toLocaleUpperCase()
toLowerCase()
toUpperCase()
fromCharCode(char...)
```

# Ch 9 Style (skipping)

# Ch 10 Beautiful Features (skipping)

# Appendix A Awful Parts

## Plus / Concat

`+` is either add or concat

1. If either is `""`, then the result is the other converted to a string
2. If both are numbers, returns the sum
3. Otherwise, converts both to strings and concats them

## NaN

NaN is a number that stands for "not a number" as defined in IEEE 754

```
var isNumber = function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}
```

## Falsy Values

```
false     (Boolean)
null      (Object)
undefined (Undefined)
""        (String)
0         (Number)
NaN       (Number)
```

# Appendix B Bad Parts

Just avoid:
- `==`
- `with`
- `eval`
- `continue`
- `new Boolean`
- `new String`
- `new Array`
- `new`
- `void`



