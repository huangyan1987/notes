effective-ts.txt

Notes from "Effective TypeScript"

# CH 1

## Item 1: flags

$ tsc --noImplicitAny code.ts
or
$ tsc --init
{
    "compilerOptions": {
        "noImplicitAny": true, 
        "strictNullChecks": true
    }
}

noImplicitAny: true is better for new projects. Can be false if transitioning an existing JS project
strictNullChecks: true is better, makes non-null the default

strict is even better goal, as it includes those and more.

# Item 3: Code gen is independent of types

tsc does 2 things: 1. Type check 2. Code generate 

Types are only known at "type checking" They're not available at runtime.

To check runtime, you can use tagged unions, property checking. `class` gives a TS type and a value available at runtime.

It's possible for a value to have types other than what you declare

You effectively cannot do function overloading b/c of this

TypeScript has *NO* runtime impact; only has build-time impact, and polyfills may be slower.

## Item 4: TS uses Structural Typing

JS uses duck typing: if it has props, that's what matters.

TS uses structural typing, so it defines a *minimum* set of properties. Actual objects conforming to a type can have more properties or may not be made with a particular ctor.

Use minimal-but-sufficient interfaces: this helps with mocking

```
interface DB {
    runQuery: (sql: string) => any[]
}
```

## Item 7: Think of types as a set of (possible) values

The set of possible values for a type is the *domain* of the type

Smallest to largest:
- `never`, the empty set
- `type A = 'A'`, literal types, unit types
- `type AB = 'A' | 'B'` union types

Most of what the type checker does is see if types are a subset of other types

`&` is for intersecting types, combining them as AND would indicate
`|` is for union types, combining them as OR would indicate

`keyof T` is a type reprsenting the string parameters of type T
e.g. `keyof Point2D` => "x" | "y"

1. keyof (A&B) = (keyof A) | (keyof B)
2. keyof (A|B) = (keyof A) & (keyof B)

The properties of an intersection/AND/& of *types* is a union/OR/| of the properties.

The properties of a union/OR/| of *types* is an intersection/AND/& of the properties.

type N = keyof (Point2D | Z) // N has type `never`

"extends" and "assignable to" and "subtype of" can be thought of as "subset of"

Hierarchy: Abstract -> Concrete -> ExtendsConcrete
versus
Sets:      (Abstract (Concrete (ExtendsConcrete)))

## Item 09: Prefer type declarations over type assertions

interface Person {name: string}         // type def
const alice: Person = {name: "Alice"}   // declaration
const bob = {name: "Bob"} as Person     // assertion

old syntax for assertion:
`const bob = <Person>{} // old equivalent of {} as Person`

To add declaration in an arrow fn:
const people = names.map((name): Person => ({name})) // the (name): Person says the fn returns a Person, what we want
// same as:
`const people: Person[] = names...`

(name: Person) // name is a Person *wrong*
(name): Person // returns a Person

Only use assertion `as` when *you* know more about the type than TS

Non-null assertion:
foo  // Foo | null
foo! // Foo, non-null

Like other assertions, it's erased during compilation.

Use `as` for subtypes, but it's not a "cast"

const el = document.body as unknown as Person // using unknown as an escape hatch

## Item 10: Avoid Object wrapper types (String, Number, Boolean, Symbol, BigInt)

tl;dr: stick with lowercase types for primitives: string, boolean, number, etc

Recall the primitive types: booleans, numbers, strings, null, undefined, symbol, & bigint

Primitives are different from objects b/c they're immutable and don't have methods*

Strings have methods, but they're actually automatically forwarded to a String *object*

Going back to JS tips: Do not use `new` with String, Number, etc.

Stick with lower-case for types.

Only use uppercase for conversions: String(false)

## Item 11: Limits of Excess property checking

Given a structural type system, might be surprised when tsc throws error on:

interface Room { doors: number }
cont r : Room = { doors: 4, size: 10} // ERROR

tsc uses "strict object literal checking" to prevent against common errors, even though it's not strictly needed for structural types. Using an intermediate variable can mute these errors.

Can also bypass with:
interface Options {
    darkMode?: boolean;
    [otherOptions: string]: unknown; // this basically makes a catch-all property
}
const opts: Options = {blah: 123} // OK!

Similarly, if an interface has *only* optional types, then you'll get an error, and you can't mute w/ an intermediate variable.

interface WeakRoom {doors?: number}


## Item 12: Apply types to entire fn expr when possible

Recall function *statements* (JS & TS):

function foo() {...}
function foo(a: number): number {...}

and function *expressions* (JS & TS):

const bar = function() {...}
const bar = function(a: number): number {...}
const baz = () => {...}
const baz = (a:number): number => {...}

TS allows applying type to a whole function expression:
type DiceRollFn = (slides: number) => number;
const rollDice: DiceRollFn = sides => {...};

For libraries, consider providing common function signatures, like React did with MouseEventHandler as a type that takes in a MouseEvent

`const responseP = fetch('...'); Type is Promise<Response>`

Can use `typeof` for slick types:

async function checkedFetch(input: RequestInfo, init?: RequestInit) {...}
vs
const checkedFetch: typeof fetch = async (input, init) => {...}
//                  ^^^ tada!

This also helps catch more type errors, like not returning a Promise

## Item 13: Type vs Interface

type TState = {
    name: string;
    capital: string;
}

interface IState {
    name: string;
    capital: string;
}

They're mostly interchangeable, so pick one and stick with it

Index signatures:
type TFn = (x: number) => string;
const toStrT: TFn = x => '' + x;

interface IFn {
    (x: number): number;
}
const toStrI: IFn = x => '' + x; // same as before

## Item 14: Use Type Operations & Generics 

You can extend a type either traditionally:

interface PersonWithHat extends Person {
    hat: Hat;
}

Or get wacky with type unions
interface PersonWithHat = Person & {hat: Hat}

If you want a type thats a subset, you can repeat yourself (BAD)

```
type TopNavState = {
    userId: string;
    pageTitle: string;
    recentFiles: string[];
}
```

Or reuse existing (but still pretty repetitive)

```
type TopNavState = {
    userId: State['userId'];
    pageTitle: State['pageTitle'];
    recentFiles: State['recentFiles'];
}
```

OR use a mapped type:

```
type TopNavState = {
    [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k]
}
```

There's a type function called `Pick` that helps a lot: 
```
type Pick<T, K> = { [k in K]: T[k]} // not the actual definition
type TopNavState = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>;
```

If the fields are optional:
`type OptionsUpdate = {[k in keyof Options]? : Options[k]}; // notice the ? `
OR use the type function "Partial"
`type Partial<Options>`

To make a type out of a constant:
```
cont INIT_OPTIONS = {...};
type Options = typeof INIT_OPTIONS; // tada!
```

To make a type out of the return type of a function:
`type UserInfo = ReturnType<typeof getUserInfo>`

`keyof` returns the keys of a type, so `Pick` is actually defined as:
```
type Pick<T, K extends keyof T> = {
    [k in K]: T[k]
};
```

Remember, "extends" means "subset of"

## Item 15: Use Index Signatures for Dynamic Data

Example: `type Rocket = {[property: string]: string};`
Not generally good, too permissive

So when to use them? For truly dynamic types, like CSV

If you need a permissive associative array, use Map.
If all the fields use the same type, use a Record:
`type Vec3D = Record<'x'|'y'|'z', number>;`

OR a mapped type (which allows some flexibility):
`type Vec3D = {[k in 'x' | 'y' | 'z']: number};`

equivalent to:
```
type Vec3D = {
    x: number;
    y: number;
    z: number;
}
```

## Item 16: Prefer Arrays, Tuples, and ArrayLike to number index signatures

Recall that Arrays are objects, and all object property keys are *always* strings. Arrays fake out the language by implicitly converting to a string:

`a[0] === a['0']`

TypeScript pretends that you have to use a number as the index b/c that's how it *should be*:

```
interface Array<T> {
    /*...*/
    [n:number]: T;
}
```

If you just need something that has an iterable index, use ArrayLike

## Item 17: Use `readonly` to avoid mutation errors

Remember, something with more capabilities (or more properties or more mutability) is a *subset*

"extends" == "is a subtype of"

`readonly` is less capable than normal.

number[] is more capable than `readonly number[]` so number[] extends readonly number[]

```
const a: number[] = ['a','b']
const b: readonly number[] = a; // OKAY
const c: number = b; // NOT OKAY
```

However, `readonly` only is shallow, only the top level is readonly

TypeScript gives `Readonly<T>` which provides readonly that's one-level deep
To go fully deep, use `DeepReadonly<T>` in 'ts-essentials'

## Item 18: Use Mapped Types to keep values in sync

If you have a situation where you might be tempted to write a comment that says "remember to update the blah blah function", instead use a mapped type, which keeps types in sync

```
const NEEDS_UPDATE: {[k in keyof ScatterProps]: boolean} = {
    xs: true,
    ys: true,
    /*...*/
}
```

# CH 3: Type Inference

## Item 19: Avoid Cluttering your code with inferable types

tl;dr: put types on function signatures (param types & return type) and where needed, but otherwise can generally omit.

Generally, can let the types be inferred. Still need types in function parameters in function declarations.

Some languages infer based on eventual usage; TypeScript types are generally determined when it's first introduced.

You may still want to define types on literals to catch errors

With eslint, can use 'no-inferrable-types'

## Item 20: Use different variables for different types

Pretty obvious

## Item 21: Understand Type Widening

Type widening is when TS automatically gives a type wider than is strictly necessary, b/c it's trying to be helpful

let x = 'x' // type string
const x = 'x' // type 'x'

If inference isn't working, declare the type. For const, you can use `as const`

const x = {
    x: 1 as const // type 1
    y: 'x'  // type string
}

## Item 22: Understand type narrowing

Type narrowing is where TS can reduce the union of a type based on code

const el = document.getElementById('foo') // Type is HTMLElement | null
if (!el) throw new Error();
el; // now Type is only HTMLElement

Similarly for if-blocks with a return.

using `x instanceOf X` or `'a' in ab` or Array.isArray are helpful.

Careful, some things like `typeof` and `!x` may not reduce the types as you expect, b/c of JS weirdness: null is an object and the falsy objects: false, null, undefined, '', 0, -0, NaN


You can 'tag' your types:

interface UploadEvent = { type: 'upload', ....}
interface DownloadEvent = { type: 'download', ....}
type AppEvent = UploadEvent | DownloadEvent

function handle(e: AppEvent) {
    switch (e.type) {
        case 'upload':
            e // is UploadEvent
            break;
        case 'download':
            e // is DownloadEvent
            break;
    }
}

Or a user-defined type guard:

function isInputElement(el: HTMLElement): el is HTMLInputElement {
    return 'value' in el
}

like:

```
function isDefined<T>(x: T | undefined): x is T {
    return x !== undefined;
}

const members = [...].filter(isDefined); // members is string[]
```

## Item 23: Build objects all at once

don't build piecemeal, like:
x.y = ...
x.z = ... // NO

x = {y: asdf, z: zxcv} // YES

Use the ...spread operator, and for optionals, can use empty object `...(test ? obj : {})`

To add optionals:

```
function addOptional<T extends object, U extends object>(
    a: T, b: U | null
): T & Partial<U> {
    return {...a, ...b};
}
```


## Item 24: Be consistent in use of aliases

Pretty basic IMO

```
const box = thing.box // box is type Box | undefined
if (thing.box) {
    // box is still type Box | undefined, should've used if(box)
}
```

## Item 25: Use async Functions, instead of Callbacks for async code

Recall: async functions always return a Promise

# CH 4: Type Design

## Item 28: Prefer types that always represent valid states

For error, pending, success, better to have 3 types and use a union

## Item 30: Don't repeat type information in documentation

Use param types, return type, and readonly etc to document

## Item 31: Push Null Values to the perimeter of your type

Rather have `State | null` or `Promise<State>` rather than `PartialState | null` 

## Item 32: Prefer unions of interfaces, rather than interfaces of unions

Prefer:
`type Layer = FillLayer | LineLayer | PointLayer // GOOD`

over:
```
interface Layer {
    layout: FillLayout | LineLayout | PointLayout // BAD
    paint: FillPaint | LinePaint | PointPaint     // BAD
}
```

Prefer: 
`type Person = Name | PersonWithBirthInfo`

Over:
```
interface Person {
    name: string;
    placeOfBirth? : string;
    dateOfBirth? : Date;
}
```

## Item 33: Prefer precise type over string

String is an infinitely open type set. Beware "stringly typed"

Can use a union type if you only have a few values, which you can document too!
```
/** What type of env was the recording made in? */
type RecordingType = 'studio' | 'live'
```

How to determine the type of this? `rs.map(r => r[key])`

```
function pluck<T, K extends keyofT>(record: T[], key: K): T[K][] {
    return record.map(r => r[key]);
}
```

Prefer `keyof T` over string for props

## Item 34: Prefer incomplete types to inaccurate types

I'm not sure what this Item is trying to say honestly

## Item 36: Name types using the language of your domain

Avoid: data, info, thing, object, entity

Avoid different names for the same thing; make distinctions meaningful

# Ch 5: Working with `any`

## Item 38: Use `any` as narrowly as possible

## Item 39: Prefer More precise variants of any

prefer: `any[] {[id: string]: any}` or `() => any`

## Item 42: Use unknown for...Unknown types (not any)

any: 
1. Any type is assignable to the `any` type 
2. The `any` type is assignable to any other type (except `never`)

Any basically breaks the type system: it's a superset of everything AND a subset of everything

unknown: any type is assignable to `unknown` (but is only assignable to unknown (and any))
never: nothing is assignable to `never` but can be assigned to any other type
{}: all values except null and undefined
object: all non-primitive types, including objects and arrays (but not true, 12 or "foo")

let myAny = foo as any as Bar;
let myUnk = foo as unknown as Bar; // prefer

## Item 43: prefer type-safe appraoches to monkey patching

export {};
declare global {
    interface Document {
        monkey: string;
    }
}
document.monkey = 'Tamarin';

OR

interface MonkeyDocument extends Document {
    monkey: string;
}

# Ch 6: Type Declarations and @types

## Item 45: Put TypeScript and @types in npm's devDependencies

$ npm install --save-dev @types/react

## Item 46: Understand the three versions

Versions of: package, @types, and TypeScript

## Item 48: Use TSDoc

A lot like JavaDoc, uses @param and @returns, but uses Markdown

Don't repeat type information

## Item 49: Provide a type for `this` in callbacks

Recall that you can "tear off" methods

const c = new C();
const method = c.speak;
method();       // here, `this` in speak will be undefined and very likely throw an error
method.call(x); // here, `this` is bound to x
method.apply(x); // same thing

Recall: *Apply* takes args as an *Array*, *Call* needs *commas* (separate args)

class Thing {
    onClick = () => alert(this);
}

// is shorthand for

class Thing {
    constructor() {
        var _this = this;
        this.onClick = function () {
            alert(_this);
        }
    }
}

// could also do:

class Thing {
    constructor() {
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        alert(this)
    }
}

You can indicate what `this` will be bound to with TypeScript:

function addKeyListener(
    el: HTMLElement,
    fn: (this: HTMLElement, e: KeyboardEvent) => void
) {
    el.addEventListener('keydown', e => {
        fn.call(el, e); // tada!
    })
}

## Item 50: Prefer Conditional Types to Overloaded declarations

function double<T extends number | string>(
    x: T
): T extends string ? string : number

function double(x: any) { return x + x; }

(This kind of stuff makes me really hate types)

## Item 54: use Object.entries to iterate over object

## Item 55: Understand the DOM Hierarchy 

EventTarget: window, XMLHttpRequest
Node: document, Text, Comment
Element: includes HTMLElements, SVGElements
HMLElement: `<i> <b>`
HTMLButtonElement: `<button>`

# Ch 8: Migrating to TS

15-38% of bugs could be prevented w/ TS

https://blog.acolyer.org/2017/09/19/to-type-or-not-to-type-quantifying-detectable-bugs-in-javascript/
https://www.youtube.com/watch?v=P-J9Eg7hJwE

## Item 58: Write Modern JS

Use ECMAScript Modules: import & export
Use classes over prototypes
Use const > let >>> var
Use for-of or forEach over for(;;)
Use arrow functions () => {}
Use compact types {a, b, c, foo() {...}} and destructuring, including destructuring w/ defaults
Use default function parameters
Use async/await over raw Promises or Callbacks
Use Map & Sets instead of Objects
Don't need 'use strict'; in TS. Use `alwaysStrict` instead

## Item 59: Use // @ts-check and JSDoc to experiment w/ TS

## Item 60: Use `allowJs` to mix TS & JS

## Item 61: Convert Module by Module up your dependency graph

Bottom-up approach:
1. Start with importing @types for libs, modules, & APIs
2. Then lowest, usually utility code. Visualize the dep graph
3. Resist urge to fix while migrating

VS Code: 'Add all missing members'

// JS
const state = {};
state.name = 'New York';
state.capital = 'Albany';


// TS Option 1
const state = {
    name: 'New York',
    capital: 'Albany',
}

// TS Option 2
interface State { // isolated change
    name: string;
    capital: string;
}

const state = {} as State; // Smaller inline change
state.name = 'New York';
state.capital = 'Albany';

VS Code: " Annotate with type from JSDoc"

## Item 62: Migration isn't done until you enable `noImplicitAny`

After that, more strict settings, like "strict": true or "strictNullChecks" become possible