2020-09-08

# Functional JavaScript (2013)
Array#sort expects a comparator

By default, Array#sort uses *STRING* comparison, not number comparison. So sorting an array of numbers will not return expected values:

[-1, 0, -2].sort()
=> [-1, -2, 0]


function exists(x) { return x != null; }
// this is called "existy" in the book. != is important

function truthy(x) {
    return (x !== false) && exists(x);
}
// only returns false for: false, null, undefined
// this is different from normal JS truthiness
// where falsy is: false, null, undefined, NaN, ±0, ''

Programing: when you write code to do something
Metaprogramming: when you write code that changes the way something is interpreted

ohhh this

function getThis() {return this;}

getThis() => window

var x = {}
x.getThis = getThis
x.getThis() === x

getThis.call('x') === 'x' // call takes in this as first param, then params
getThis.apply('x') === 'x' // apply takes in this as first param, then array of params

var bound = getThis.bind('x')
bound() === 'x'

Realized that this book is just sorely outdated.

Talks about workarounds for a lot of things that are just in the language now:
- pure maps: got it
- scoping: got let and const
- default parameters: got it
- classes: got it
- promises: got it

09-09 Started Working through React Udemy course


09-12 Get geolocation

https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition


Simplified field initialization:

// Instead of....
class Y extends X{
    constructor() { 
        super() // pretty redundant and boilerplate
        this.something = 'x';
    }
}

// do this!
class Y extends X {
    something = 'x';
}

11-24 From Notes

LeetCode

Convert alphabet to number, e.g. "A" => 1, "Z" => 26, "AA" => 27
parseInt(curr, 36)-9 // 36 is for base 36 (nums and letters) then subtracting out numbers


for...in vs for...of vs forEach vs for

"Foreign keys": for-in loops over the keys
Technically the non-Symbol, enumerable properties in arbitrary order.
Typically have to also filter by hasOwnProperty:

```
let k = ['a', 'b', 'c']
k.foo = 'bar'
for (let k in thing) {
	// k will have values "0", "1", "2" and "foo" AND inherited properties
}

for (let k in thing) {
	if (thing.hasOwnProperty(k)) {
		// k will have values "0", "1", "2" and "foo"
		let v = thing[k];
		// v will have values 'a', 'b', 'c' and 'bar'
	}
}
```

For-of loops over the iterable objects, preferred, especially for Arrays b/c order matters
```
for (let v of thing) {
	// v will have values 'a', 'b, 'c'
}
```

For-of on objects, use Object.entries which returns key-val as an array
`for (let [key, val] of Object.entries(obj)) {...}`

Arrays, Maps, and Sets also have .forEach(value, key), where for an Array, index == key
Finally, there's always the classic C-style for-loop

From Eloquent JS

Eloquent JS

Modern JS:

var, let, & const
Template strings `like ${this}`
for-of loops
...rest parameters
...spread operator
Destructuring: let [first, second] = arr; let {name} = obj;
HOFs: forEach, filter, map, reduce, every, some
UTF-16: each unicode symbol is a code point, made up of one or more code units.
try-catch-finally
Classes:
- class, constructor
- get, set
- static
- extends, super
- instanceof (especially for Exceptions
New Language Classes:
- Map class > Object.create(null) >> using objects as Maps
- Symbol
- Iterator: [Symbol.iterator]
- Error
- Promise
    - new, (resolve, reject), then, all, 

async, await:
- async functions return a promise
- the promise is resolved with return or rejected if an exception is thrown
- within the async function, put await in front of promise expressions

Generators:
- function*, yield
- each next() runs the function until it hits yield

Modules:
- CommonJS modules uses: const foo = require("foo")
- ES modules: import foo from "foo"
    - import, from
    - export, export default

Useful features/functions:
Array.from
Math.random()
Object.assign
Object.create
Object.getPrototypeOf
Object#hasOwnProperty
Object.keys

2021-06-04
https://javascript.info/closure
Every fn, block, and script has a Lexical Environment
Lexical Environment consists of:
1. Environment Record: store of local variables and stuff like `this`
2. A reference to the outer lexical env

A variable is just a property of the special internal object, Environment Record.

Function declarations get hoisted so they're usable even before the declaration. (Doesn't apply to function expressions).

Outer variables are...well...variables outside the function.

A closure is a function that remembers its outer variables and can access them. In JS, all functions are naturally closures. Functions remember where they were created using a hidden [[Environment]] property, and that's how their code can access outer variables

Engine Optimizations: JS Engines, like V8, will often aggressively optimize away variables that are unused. This can cause "No such variable" or un-shadowing, where you see an outer variable rather than the closer one.

Latest? Since functions refer to the env, they'll "see" changes. Values aren't "deep-cloned". The variables exist as a property of the [[Environment]]

When you have let x = 1, the declaration part `let x` is hoisted to the top of the block, but `x` is unitialized (unusable, ReferenceError) until the actual line `let x = 1`

function func() {
    // "DEAD ZONE" for x
    console.log(x); // ReferenceError
    let x = 1;
}

Be especially careful with closures in loops. Classic i=10 problem:

```
let arr = []
let i = 0;
while (i<10) {
    arr.push(function() {console.log(i);})
    i++;
}
for (let a of arr) a(); // prints out "10" 10 times!
```

Fix: either rebind to a loop-local variable:
```
let arr = []
let i = 0;
while (i<10) { 
    let j = i; 
    arr.push(function() {console.log(j)});
    i++;
}
for (let a of arr) a();
```

Or better yet, use for-let which does the loop-local binding for you:
```
let arr = []
for (let i = 0; i < 10; i++) {
    arr.push(function() {console.log(i)});
}
for (let a of arr) a();
```

BUT DON'T use var!
```
let arr = []
for (var i = 0; i < 10; i++) {
    arr.push(function() {console.log(i)});
}
for (let a of arr) a(); // oh no! all "10" again!
```

https://javascript.info/new-function
new Function(arg1, ..., argN, fnBody) // all args are strings

let f = new Function('console.log(x))')
Only has access to *global* variables
Recall that functions get a special [[Environment]] variable when declared

# BigInt

either BigInt("10") or 10n

# Mixins

https://javascript.info/mixins

let myMixin = { /* define class methods */ }

Basically: Object.assign(MyClass.prototype, myMixin)

If you need to extend myMixin, can use Object.setPrototypeOf(extraMixin, origMixin)

# Promises API

.all: all resolve or, if any rejects, the first reject
.race: the first to either resolve OR reject
.any: the first to resolve, OR an AggregateError if all reject 

# Modules

https://javascript.info/modules-intro

Needs `<script type="module">` b/c of the special syntax

Special things about Modules:
- Modules are only executed once, on the 1st import
- import.meta has special info, like import.meta.url
- No global this, yay!
- defered by default

# Proxy

https://javascript.info/proxy

let proxy = new Proxy(target, handlers);

# Prototypes

let a = new A();

A.prototype === Object.getPrototypeOf(a)

prototype is on types
Object.getPrototypeOf is for instances

What `new` actually does:
var f = new Foo();
// same as:
var f = new Object();             // new object
f.[[Prototype]] = Foo.prototype;  // links prototype
Foo.call(o);                      // calls the ctor with new object as this

# Named parameters

You can simulate named parameters with destructuring:

function greet({name = "Jane", age = 42} = {}){
  print(name + " " +age)
}
greet({name: "John", age: 21})

# Array.from

Array.from({length: 5}) //=> [undefined,undefined,undefined,undefined,undefined]
Array.from({length: 5}, (_, index) => index) // => [0,1,2,3,4,5]


