# Rust https://rust-lang.org/
Start here: https://www.rust-lang.org/learn
"The Book": https://doc.rust-lang.org/book
Crates: https://crates.io/ or https://lib.rs/

Install rustup: `$ curl https://sh.rustup.rs -sSf | sh`
After you install `rustup`:
- For Documentation: rustup doc
- For a local copy of "The Book": rustup doc --book

`rustup` is Rust's Toolchain tool. Get with https://www.rust-lang.org/learn/get-started
`rustc` is Rust's compiler (you generally use cargo, which calls the compiler). Install rustc using rustup.
`cargo` is Rust's package manager
    - `cargo new [--bin|--lib] {proj}` # or init for existing dir
    - cargo: `build run test fmt doc publish --version`

--- 

# My notes from "The Book"

# Ch 1: Getting started

Update: rustup update

Version: rustc --version
rustc 1.60.0 (7737e0b5c 2022-04-04)
rustc 1.61.0 (fe5b13d68 2022-05-18)


println!
! = macro

Create new project:
cargo new hello_cargo

Build and run:
cargo build
./target/debug/hello_cargo

Build and run (one step):
cargo run

Fast check if code *would* compile:
cargo check

Release:
cargo build --release


let x = "foo"
let mut guess = String::new();

use std::io;

io::stdin()
    .read_line(&mut guess)
    .expect("Failed!"); // expect crashes on Err

The number 0.8.3 is actually shorthand for ^0.8.3, which means any version that is at least 0.8.3 but below 0.9.0

Rust packages are "crates" and are found @ https://crates.io/

cargo build is smart, only pulls or compiles as necessary.

Cargo.lock contains the locked versions (like locks in other pkg mgrs).
For binaries/applications: commit cargo.lock
For libraries: do NOT commit cargo.lock 

Update Cargo.lock:
cargo update

Generates and opens documentation:
cargo doc --open

# Ch 3: Common programming

Can shadow variable names with let

```
match guess.cmp(&secret) {
	Ordering::Less => println!("Too small!"),
	Ordering::Greater => println!("Too big!"),
	Ordering::Equal => {
		println!("You win!");
		break;
	}
}

let guess: u32 = match guess.trim().parse() {
	Ok(num) => num,
	Err(_) => continue,
};
```

const for constants

Integers: u8 i32 etc... and isize and usize for collections
Floats f32 f64
bool true false
tupels, the unit value () is default return value
Array: let a: [i32, 5] = [1,2,3,4,5]

fn five() -> i32 {
    5
}

fn plus_one(x: i32) -> i32 {
    x + 1           // notice this is a default return **expression**, no semicolon
}


fn plus_one(x: i32) -> i32 {
    x + 1; // WONT COMPILE b/c this is a **statement**, because it has a semicolon
}

if number < 5 {
    println!("condition was true");
} else {
    println!("condition was false");
}

loop {
    // infinite loop
}

while COND {

}

for ELEM in COLL {

}

# Ch 4: Ownership

The ownership of a variable follows the same pattern every time: assigning a value to another variable moves it. 

let s = ...
do_something(s); // ownership is passed to function
// s is invalid here

&foo // reference to foo, like a pointer. Typically passed to a method

fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}

&mut foo // a mutable reference to foo, passed to methods that will mutate foo

Only one &mut ref at a time!

A reference’s scope starts from where it is introduced and continues through the last time that reference is used.

The ability of the compiler to tell that a reference is no longer being used at a point before the end of the scope is called Non-Lexical Lifetimes (NLL for short).

Let’s recap what we’ve discussed about references:
1. At any given time, you can have either one mutable reference or any number of immutable references.
2. References must always be valid.

Copy trait is on types that are copied.

Copy extends Clone.

Copy is implicit and inexpensive (fast) bit-wise copy. Rust does not allow you to reimplement Copy. e.g. ints
https://doc.rust-lang.org/std/marker/trait.Copy.html

Clone is explicit and may or may not be expensive.
Clone is more general.
https://doc.rust-lang.org/std/clone/trait.Clone.html

A slice is a kind of reference, so it does not have ownership.

String literals are slices:

let s = "Hello, world!";
The type of s here is &str: it’s a slice pointing to that specific point of the binary. This is also why string literals are immutable; &str is an immutable reference.

# Ch 5: Structs

struct User {
    active: bool;
    username: String;
    email: String;
    sign_in_count: u64;
}

let user = User {
    active: true,
    username: String::from("valbaca"),
    email: String::from("valbaca@gmail.com"),
    sign_in_count: 100
};

let mut another_user = ...;
another_user.email = String::from("valbaca@hotmail.com");

Can shorthand if variables match field names:

let user = User {
    active,
    username,
    email,
    sign_in_count
}

Struct update:

let user2 = User {
    email: String::from("valbaca@gmail.com"),
    ..user1
}

Tuple struct:
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
}

Unit-like struct:
struct AlwaysEqual;

First trait:
```
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {:?}", rect1);
}
```

# Ch 6

"if let" is sugar for the simple case where you only want one clause from a "match" and avoid using _
fn main() {
    let config_max = Some(3u8);
    match config_max {
        Some(max) => println!("The maximum is configured to be {}", max),
        _ => (),
    }
}

fn main() {
    let config_max = Some(3u8);
    if let Some(max) = config_max {
        println!("The maximum is configured to be {}", max);
    }
}

can even do "if let else"

fn main() {
    let coin = Coin::Penny;
    let mut count = 0;
    match coin {
        Coin::Quarter(state) => println!("State quarter from {:?}!", state),
        _ => count += 1,
    }
}

let mut count = 0;
if let Coin::Quarter(state) = coin {
    println!("State quarter from {:?}!", state);
} else {
    count += 1;
}

# Ch 7: Packages, Crates, & Modules:

A crate is a library or binary.
A package is one or more crates. A package contains a Cargo.toml

Cargo convention is crate binary root is src/main.rs and library root is src/lib.rs
A package can have multiple binary crates by placing files in src/bin

Create new library: cargo new --lib restaurant

Modules organize and handle privacy of code

```
mod <name> {
}
```

src/main.rs and src/lib.rs are crate roots, either of those files form a module named `crate` at the root of the crate's module structure, the module tree.

Module tree paths can take two forms:
1. An absolute path starts from a crate root by using a crate name or a literal crate.
2. A relative path starts from the current module and uses self, super, or an identifier in the current module.

"crate" is like "/" in path dirs
"super" is like ".."

items (functions, methods, structs, enums, modules, & constants) are private by default. children have access to parent's items b/c children often hide implementations.

use `pub` to make public

`use` is like Java's import.
It's idiomatic to only `use` up to the module, don't include the full function so you know where the function came from:

use self::front_of_house::hosting;          // idiomatic
pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();             // obvious where fn comes from
}

Nested paths:
use std::cmp::Ordering;
use std::io;
VS
use std::{cmp::Ordering, io};


Separating code into files:


// file: src/lib.rs
mod front_of_house;

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}

// file: src/front_of_house.rs
pub mod hosting {
    pub fn add_to_waitlist() {}
}

Using a semicolon after mod front_of_house rather than using a block tells Rust to load the contents of the module from another file with the same name as the module.

# Ch 8: Collections

- A vector `Vec` allows you to store a variable number of values next to each other.
- A string is a collection of characters. We’ve mentioned the String type previously, but in this chapter we’ll talk about it in depth.
- A hash map allows you to associate a value with a particular key. It’s a particular implementation of the more general data structure called a map.

More collections: https://doc.rust-lang.org/std/collections/index.html
Vec VecDeque LinkedList HashMap BTreeMap HashSet BinaryHeap

## Vec
`let v: Vec<i32> = Vec::new();`

vec! macro:
let v = vec![1, 2, 3];

push(e): to push element e

When vectors drop out of scope, its contents do too.

get(i): to get at index i, returns Option 
or use &v[i] for direct access (can crash though)

Read-only iteration:
```
    let v = vec![100, 32, 57];
    for i in &v {
        println!("{}", i);
    }
```

Mutable iteration:
```
    let mut v = vec![100, 32, 57];
    for i in &mut v {
        *i += 50;
    }
```

To hold different types of values, use enums:
```
enum SpreadsheetCell {
	Int(i32),
	Float(f64),
	Text(String),
}

let row = vec![
	SpreadsheetCell::Int(3),
	SpreadsheetCell::Text(String::from("blue")),
	SpreadsheetCell::Float(10.12),
];
```

Vec methods: len push pop extend ::from

`vec![0; 5] // elem * times`

## Slices: `&[usize]`

`let v: &[_] = &v;`

Underneath, a vec is basically a ptr, len, and cap (Just like slices in Go))

## Strings

str: string slice, in core language, usually as &str
String: type in std lib, growable, mutable, owned UTF-8 

"asdf" // string literal
String::from("asdf")    // String
"asdf".to_string()      // String

push_str to concat
or s1 + &s2

format!("{}-{}-{}", s1, s2, s3);

Rust strings do NOT support access by index, s[0] doesn't compile

Strings are UTF8, which you can look at as bytes, scalar values, and grapheme clusters ("letters"?)

“नमस्ते” could be looked at as either:
1. u8: [224, 164, 168, 224, 164, 174, 224, 164, 184, 224, 165, 141, 224, 164, 164,
224, 165, 135]
2. char: ['न', 'म', 'स', '्', 'त', 'े']
3. grapheme clusters: ["न", "म", "स्", "ते"]

Default for-in goes over the chars. for-in over the .bytes() for bytes

## Hash Maps

```
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);
```
Methods: insert 

Can use `keys.into_iter().zip(vals_iter).collect()` to turn a paired vec of keys and a vec of vals into a hashmap. Notice that .collect() can return multiple collections, so the Hash Map type must be specified, but the key-val types can be left to be inferred!

```
use std::collections::HashMap;

let teams = vec![String::from("Blue"), String::from("Yellow")];
let initial_scores = vec![10, 50];

let mut scores: HashMap<_, _> =
	teams.into_iter().zip(initial_scores.into_iter()).collect();
```

Adding to a hash map moves (or copies if they have Copy trait).

`for (key, value) in &map {}`

Insert only if absent: `scores.entry(String::from("Yellow")).or_insert(50);`

Updating value based on previous value:
```
let mut map = HashMap::new();

for word in text.split_whitespace() {
	let count = map.entry(word).or_insert(0);
	*count += 1;
}
```

SipHash is the default hashing algorithm

# Ch 9: Error Handling

Recoverable and non-recoverable errors.

Uses `Result<T, E>` for recoverable errors and panic! for unrecoverable.

panic! triggers stack unrolling, but this can be turned into a hard abort via Cargo.toml

⭐️**Start from the top of the backtrace and read until you see files you wrote.**

Recoverable errors use Result
```
enum Result<T, E> {
	Ok(T),
	Err(E),
}
```

Can use `match` for type matching:
```
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => {
                panic!("Problem opening the file: {:?}", other_error)
            }
        },
    };
}
```

That's a lot of match...we can use closures instead:

```
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating the file: {:?}", error);
            })
        } else {
            panic!("Problem opening the file: {:?}", error);
        }
    });
}
```

Or just `unwrap()` or `expect(msg)`
unwrap is considered "loose". Used in a lot of examples, but real code should handle errors.
expect makes it easier to find the cause

OR use the ? operator, which basically eliminates boilerplate around error propagation.
But it only works if the error type is compatible with the fn return type, i.e. Result or Option
`main` returns (), so cannot use ? within main.

⭐️ However, **you can change the return type of main** to be `Result<(), E>` and put `Ok(())` at the end

⭐️ TIP: if you're just actually trying to read from a file, use: fs::read_to_string("hello.txt")

https://doc.rust-lang.org/book/ch09-03-to-panic-or-not-to-panic.html

Ch 10: Generic Types, Traits, and Lifetimes

```
fn largest<T>(list: &[T]) -> T {...}

struct Point<T> {
    x: T,
    y: T,
}

enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

For generic methods

`impl <T> Point<T> {...} // have to specify twice`

Can also specify methods only for particular types

```
impl Point<f32> { 
    fn dist_from_origin(&self) -> f32 {...}
}
```

Rust keeps the runtime low via *monomorphization*. [Monomorphization](https://en.wikipedia.org/wiki/Monomorphization) is the process of turning generic code into specific code by filling in the concrete types that are used when compiled.  The generic `Option<T>` is replaced with the specific definitions created by the compiler. 

Traits: A trait defines functionality a particular type has and can share with other types. We can use traits to define shared behavior in an abstract way. We can use trait bounds to specify that a generic type can be any type that has certain behavior.

Traits are similar but different to interfaces/protocols.

```
pub trait Summary {
    fn summarize(&self) -> String;
}

pub struct NewsArticle {...}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        ...
    }
}
```

Can’t implement external traits on external types.
Can provide default implementations of trait methods.

Using traits as parameters in other functions:
```
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```

Repeating `impl Summary` is tedious, so you can use Trait Bound, which is more succinct if the trait type is repeated:
```
pub fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}
```

Type unions with `+`
```
pub fn notify(item: &(impl Summary + Display)) {...}
pub fn notify<T: Summary + Display>(item: &T) {...}
```

If it's still too cluttered, can use `where`:
```
fn some_function<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32 {...}
versus
fn some_function<T, U>(t: &T, u: &U) -> i32
    where T: Display + Clone,
          U: Clone + Debug
{...}
```

Using `impl Trait` on return types only works if it returns **one** type (?!)
(Looks like this can be worked around with `Box<T>` at the expense runtime speed)

So "longest" would actually look more like (but not exactly)
`fn largest<T: PartialOrd>(list: &[T]) -> T {...}`

But when we made the largest function generic, it became possible for the list parameter to have types in it that don’t implement the Copy trait.

So we have to also add Copy:
```
fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {...}

fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];
    for &item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}
```

OR

```
fn largest<T: PartialOrd + Copy>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = &item;
        }
    }
    largest
}
```


# Lifetimes

Every reference in Rust has a lifetime, which is the scope for which that reference is valid.
The main aim of lifetimes is to prevent dangling references, which cause a program to reference data other than the data it’s intended to reference. 

Similar to generics...functions can accept references with any lifetime by specifying a generic lifetime parameter....the names of lifetime parameters must start with an apostrophe (') and are usually all lowercase and very short, like generic types. Most people use the name `'a` for the first lifetime annotation. We place lifetime parameter annotations **after the &** of a reference, using a space to separate the annotation from the reference’s type.

```
&i32        // a reference
&'a i32     // a reference with an explicit lifetime
&'a mut i32 // a mutable reference with an explicit lifetime
```

```
fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    let result = longest(string1.as_str(), string2);
    println!("The longest string is {}", result);
}

fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

When returning a reference from a function, the lifetime parameter for the return type needs to match the lifetime parameter for one of the parameters. If the reference returned does not refer to one of the parameters, it must refer to a value created within this function. However, this would be a dangling reference because the value will go out of scope at the end of the function. 

For structs that hold a reference:
```
struct ImportantExcerpt<'a> {
    part: &'a str,
}
```

Early on, there were some heuristics (lifetime elision rules) put into the compiler to handle the very straightforward cases:
```
fn first_word(s: &str) -> &str {...}
fn first_word<'a>(s: &'a str) -> &'a str {...}
```

## The Lifetime Three Rules 
⭐️ The compiler uses three rules to figure out the lifetimes of the references when there aren’t explicit annotations.
1. The compiler assigns a lifetime parameter to each parameter that’s a reference.
2. If there is exactly one input lifetime parameter, that lifetime is assigned to all output lifetime parameters
3. If there are multiple input lifetime parameters, but one of them is &self or &mut self because this is a method, the lifetime of self is assigned to all output lifetime parameters.

```
struct ImportantExcerpt<'a> {
    part: &'a str,
}

impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        3
    }
}

impl<'a> ImportantExcerpt<'a> {
    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {}", announcement);
        self.part
    }
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().expect("Could not find a '.'");
    let i = ImportantExcerpt {
        part: first_sentence,
    };
}
```

Static lifetime:

One special lifetime we need to discuss is 'static, which denotes that the affected reference can live for the *entire duration of the program*. All string literals have the 'static lifetime, which we can annotate as follows:

Now, altogether!

```
use std::fmt::Display;

fn longest_with_an_announcement<'a, T>(
    x: &'a str,
    y: &'a str,
    ann: T,
) -> &'a str
where
    T: Display,
{
    println!("Announcement! {}", ann);
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    let result = longest_with_an_announcement(
        string1.as_str(),
        string2,
        "Today is someone's birthday!",
    );
    println!("The longest string is {}", result);
}
```


Likely need to review this often: https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html

11. Writing Automated Tests

Attributes (are like Annotations)

```
#[test]
fn some_test() {
    assert!(...);
    assert!(..., "Expected blah but got {}", actual);
    assert_eq!(...);
    assert_ne!(...);
}

#[test]
#[should_panic]
fn ensure_panics() {...}
```

Consider adding the traits to make comparisons and printing better:
`#[derive(PartialEq, Debug)]`


Can also use Result<T, E> in Tests:
```
#[test]
fn it_works() -> Result<(), String> {
    if 2 + 2 == 4 {
        Ok(())
    } else {
        Err(String::from("math didn't work"))
    }
}
```

By default, printing for passing tests is filtered (captured). To see it:
`$ cargo test -- --show-output`

To run certain test, just give the test name:
cargot test explore # only runs tests that start with explore

(Just like JUnit)
Ignore with #[ignore]
Run *only* ignored: cargo test -- --ignored
Run *all*, including ignored: cargo test -- --include-ignored

`#[cfg(test)]` is what specifies that the tests run when you do `cargo test`

You can test private functions: `use super::*;`

⭐️ Prefer to have a small src/main.rs file which immediately calls src/lib.rs. You then don't need to test the main.rs and can just unit-test the lib.rs

Test template:

```
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_foo() {
        assert_eq!(1,1);
    }
}
```

Ch 12. I/O Project

.clone() has a runtime cost. Generally use more optimized methods but Don't Prematurely Optimize

panic! is more for programming problems, not as good for invalid input.

Important `use`:
- std::env fs process
    - std::env::var
- std::error::Error

`Box<dyn Error>` means "the function will return a types that implements the Error trait, but we don't have to specify what the particular return type will be

`dyn` == dynamic

`Ok(())` is Ok returning the unit (), it's basically `void`; it's for code run for side-effects only. (Just like Unit in Kotlin)

Two ways of error handling:

`let result = do_thing(...).unwrap_or_else (|err| {...});`
^ this continues with the result

`if let Err(e) = run(...) { ... }`
^ this throws away the result


`is_err()` returns whether the Result is an error or not. Simple way to check, say if an env var is set

`eprintln` to print to error stream

# Ch 13 Functional Language Features

```
use std::thread;
use std::time::Duration;

thread::sleep(Duration::from_secs(2))
```


```
fn add (x: u32) -> u32 { x + 1 }            // fn statement
let add = |x: u32| -> u32 {x + 1};          // explicit closure
let add = |x| {x + 1};                      // type inference closure
let add = |x| x + 1;                        // single-expression closure
```

Each closure instance has its own unique anonymous type: that is, **even if two closures have the same signature, their types are still considered different**. To define structs, enums, or function parameters that use closures, we use generics and trait bounds.

All closures implement either Fn, FnMut, or FnOnce traits

e.g. Fn(u32) -> u32

A primary difference between closures and functions (it's in the name!) is that closures can close over values; functions cannot.


## Fn traits
Now, the different Fn traits:
- FnOnce: consumes the variables it captures, so it must take ownership. `Once` means that since it can only take ownership once, so it can only be called once.
- FnMut: can change the env b/c it **mutably** borrows values
- Fn: borrows values **immutably**.

All closures implment FnOnce. If they don't move variables, they impl FnMut. If they don't need mutable access, they impl Fn.

To force the closure to take ownership of values, put `move` before the args. Mostly used when passing closure to a new thread.

When specifying one of the Fn trait bounds, start with `Fn` and the compiler will tell if you need FnMut or FnOnce

Rust iterators are lazy. Get iter: `.iter()`

Iterators implement a trait named Iterator

```
pub trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;
}
```

`type Item` is an associated type with the trait. This says you also need to define an Item type.
Only one method is required to be implemented: next, which returns an Option. The Option is Some if there's a value, but it's None if it's empty/over.

The values you get from `next` are immutable references. **If you want an iterator take ownership and return owned values**, use `into_iter` instead of `iter`; similarly, if you want mutable, use `iter_mut`

filter // **keeps** elements where true

Do things like:
```
contents
	.lines()
	.filter(|line| line.contains(query))
	.collect()
```

Zero-cost Abstractions:  using the abstraction imposes no additional runtime overhead. 

(as stated by Bjarne Stroustrup):
In general, C++ implementations obey the zero-overhead principle: What you don’t use, you don’t pay for. And further: **What you do use, you couldn’t hand code any better**.

Ch 14 Cargo and crates.io

https://doc.rust-lang.org/stable/cargo/reference/
https://doc.rust-lang.org/cargo/reference/manifest.html

## Docs

/// Use three slashes for docs for the item **following** the doc comment
//! For docs for the item **containing** the doc comment

cargo doc [--open]

Sections: Examples Panics Errors Safety

running cargo test will run the code examples in your documentation as tests!

//!, adds documentation to the item that **contains** the comments rather than adding documentation to the items **following** the comments. 
We typically use these doc comments inside the crate root file (src/lib.rs by convention) or inside a module to document the crate or the module as a whole.

`pub use` re-exports at top level.
In cases where there are many nested modules, re-exporting the types at the top level with `pub use` can make a significant difference in the experience of people who use the crate.

Crates need a name, description, and license.

"yank" is to prevent future people from using a package. yank doesn't help if you shared secrets.

Crates named cargo-something add the command "cargo something". See with `cargo --list`

Ch 15. Smart Pointers

References are indicated by & and borrow the value they point to.

Smart pointers only act like pointers but also have additional metadata & capabilities, e.g. reference counting smart pointer. It enables multiple owners and when no owners remain, cleans up.

References are pointers that only **borrow** data.
Smart pointers **own** the data they point to.

More smart pointers are String and `Vec<T>`. Usually implemented using structs. They implement Deref and Drop traits.

Deref: allows an instance to behave like a reference and be dereferenced.
Drop: allows customizing code that's run when it goes out of scope.

Most common:
- `Box<T>` for allocating values on the heap. Like a unique pointer
- `Rc<T>` Reference counting type that enables multiple ownership. Like a shared pointer.
- `Ref<T>` `RefMut<T>`, accessed through `RefCell<T>`, a type that enforces the borrowing rules at runtime instead of compile time.

`Box<T>` store data on the heap and return a pointer on the stack.
No perf overhead (other than the necessary allocation and deref).

Use `Box<T>` when you have:
- a type whose size cannot be known at compile time
- a large amount of data and need to transfer ownership but don't want to copy
- a value you want to own and only care that it implements a trait (trait object)

`let b = Box::new(5) // b is a Box<i32>`

when b goes out of scope, deallocation happens for the box itself (from the stack) and the data it points to (from the heap).

```
enum List {
    Cons(i32, Box<List>),
    Nil,
}

let x = 1;  // x is an i32
let y = &x; // y is an &i32
x           // x is 1
*y          // *y is 1, to get the value, * = dereference

let x = 1;  // x is an i32
let y = Box::new(x); // y is an Box<i32>
x           // x is 1
*y          // *y is 1, to get the value, * = dereference
```


To be able to deref  with `*`, the type needs to `impl Deref`

```
struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}

use std::ops::Deref;

impl<T> Deref for MyBox<T> {
    type Target = T;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
```

Rust automatically sugars `*y` into -> ` *(y.deref())`
Done exactly once for each `*`

Deref coercion automatically converts between ref types at compile time.

Deref trait overrides `*` for immutable refs
DerefMut trait is the same for mutable refs

Deref coercion in three cases:
1. &T to &U when T: Deref<Target=U>
2. &mut T to &mut U when T: DerefMut<Target=U>
3. &mut T to &U when T: Deref<Target=U>

#1 is the base. #2 is the same, but with mutability
#3 allows coercing a mutable to immutable b/c it makes sense.
The opposite doesn't make sense; it violates immutability guarantees.

Drop: trait with `drop` method that executes when it goes out of scope

You cannot call `p.drop()` method manually.
If you need to drop, use std::mem::drop(p)

`Rc<T>` = Reference Counting pointer to T
Rc keeps track of the # of refs to a value to determine if it's in use and cleans up when zero refs remain.
*Rc is only meant for single threaded*

Calling Rc::clone is idiomatic b/c it only increments the Rc count; doesn't do a deep clone.

Rc is immutable.

*Interior mutability* is a design pattern that allows mutation of data even when there are immutable references.

`RefCell<T>` represents single ownership of the data it holds.

Recall the borrowing rules:
- At any given time you can have **either** one mutable reference **XOR** any number of immutable references
- References must always be valid

References and Box are enforced at compile time.
RefCell is enforced at **runtime**. Break the rules at runtime and you get a panic.

Per the Halting Problem, cannot catch everything with analysis.

Just like Ref, RefCell is only meant for single-threaded scenarios.

## ⭐️ Rc, Box, Ref, RefCell compare/contrast
- Rc enables multiple owners of the same data
    - Box and RefCell have single owners
- Box allows immutable or mutable borrows, borrows are checked at compile time
    - Rc only allows immutable borrows; checked at compile time
    - RefCell allows immutable or mutable; checked at runtime
- RefCell allows borrows check at runtime, you can mutate the value inside the RefCell even when RefCell is immutable.

Cannot borrow an immutable value immutably.

ERROR:
```
let x = 5;
let y = &mut x;
```

```
&    ~=~ borrow
&mut ~=~ borrow_mut
```

borrow returns an immutable smart pointer: `Ref<T>`
borrow_mut returns a mutable smart pointer: `RefMut<T>`

Both Ref and RefMut implement Deref. So can treat the like regular refs
Again, taking more than one RefMut (mutable ref) will panic!

RefCell pushes the ref check safety to runtime and the borrow checker runs at runtime, but makes it possible to do mutable things you otherwise couldn't.

It's common to have a Rc holding a RefCell.
So you get multiple owners *and* can mutate.

Rusts memory safety **helps but doesn't totally prevent memory leaks**.

Weak references:
To prevent reference cycles (a -> b -> a), use Weak.
Call `Rc::downgrade` to get a `Weak<T>` smart pointer. Weak increases the weak_count by 1, not the strong_count. The Rc can be cleaned up if strong_count is 0 even if the weak_count is >0.
This does mean you need to always check that the value exists.
you call `upgrade` on a Weak to get `Option<Rc<T>>`

For example, for a Tree node with links to parent:

```
#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}
```
Notice the Weak in the **parent** type: `RefCell<Weak<Node>>`

## Ch 16 Fearless Concurrency

Concurrent: different parts executing independently
Parallel: different parts executing at the same time
Ownership & type help manage memory safety and thus concurrency problems.

to spawn a system thread:

```
thread::spawn(|| {
    for i in 1..10 {
        println!("hi number {} from the spawned thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
})
```


If the main thread ends before the spawned threads finish, they'll be exited (won't finish). There's no guarantee on the order of threads.
thread::spawn returns a JoinHandle. It has a `join` method to wait

```
let handle = thread::spawn(...)
handle.join().unwrap();
```

often `move` is used with the closure passed to thread::spawn to have the closure take ownership of the values.

Message Passing to Transfer Data Between Threads

from Go: "Do not communicate by sharing memory; instead, share memory by communicating."

Channel has two halves: sender/transmitter (tx) and receiver (rx). A channel is closed if either half is dropped.

`std::sync::mpsc`
mpsc = multiple producer, single consumer
std channel can have multiple sending but only one receiving end.
```
tx.send(...)
rx.recv(...) // blocks; T if value, E if closed.
rx.try_recv() // doesn't block; T if value, E if no messages at this time
```

recv is good when you truly want to block main thread.
try_recv is good if you can do other work.

Channels are multiple producer, so create more tx with tx.clone()

Shared state: `std::sync::Mutex`

// single-threaded example
```
let m = Mutex::new(5);
{
    let mut num = m.lock().unwrap();
    *num = 6;
}
```
`lock` returns a smart pointer MutexGuard, wrapped in a LockResult. MutexGuard is a smart pointer, so it releases the lock automatically when it goes out of scope.

Now for multi-threding, you need to use `Arc<T>` which is an **Atomic** Reference Counter.

```
let counter = Arc::new(Mutex::new(0));
let mut handles = vec![]
for _ in 0..10 {
    let counter = Arc::clone(&counter);
    let handle = thread::spawn(move || {
        let mut num = counter.lock().unwrap();
        *num +=1 ;
    });
    handles.push(handle);
}

for handle in handles {
    handle.join().unwrap();
}
```

⭐️ Rust cannot protect you from all logical errors w/ Mutex.
Two bad Rcs can memory leak; two bad Mutex can deadlock.
> "The plural of 'mutex' is 'deadlock'."

Traits: A "marker trait" is one without methods.
(They appear to be read as T-able, like send-able, or sync-able)

`Send` marker trait indicates that ownership of Send can be transferred between threads. Most Rust types are Send, but Rc and raw pointers are not.
Use Rc over Arc if purely single-threaded as there's a small performance penalty for Arc.
Any type composed of Send types is automatically Send as well.

`Sync` indicates it's safe to be referenced from multiple threads. Any type T is Sync if &T is Send.
Primitive types are Sync and types composed entirely of Sync are Sync.
Rc, RefCell, and Cell are not Sync.
Mutex is Sync.

## Ch 17. OOP features of Rust

According to the GoF definition, if OOP == (objects+method) then Rust is OOP.

Encapsulation is done via pub/private fields/methods.

Rust does NOT have inheritance. Inheritance is used for code-reuse and polymorphism.

For code-reuse akin to inheritance, use default implementation methods on traits.

Rust uses generics to abstract over different possible types and trait bounds to impose constraints, called "bounded parametric polymorphism"

### Polymorphism:

Use Enums when you have a fixed set of types that are known at compile time.

A trait object points to both an instance of a type as well as a table to lookup trait methods on that type at runtime.

trait objects are more like objects in other languages because they combine data and behavior. Trait objects' specific purpose is to allow abstraction across common behavior.

```
pub trait Draw {
    fn draw(&self);
}
```

`Box<dyn Draw>` is any type inside a Box that implements Draw trait. ("A unique pointer to a drawable")

using it:
```
pub struct Screen {
    pub components: Vec<Box<dyn Draw>>,
                    //  ^^^ yeah!
}


impl Screen {
    pub fn run(&self) {
        for component in self.components.iter() {
            component.draw();
        }
    }
}
```

If you're only dealing with one type (a homogeneous collection), then instead use a generic with type bounds:

```
pub struct Screen<T: Draw> {
	pub components: Vec<T>,
}
impl <T> Screen<T>
where
	T: Draw,
	{
		pub fn run(&self) {
			for c in self.components.iter() {
				c.draw();
			}
		}
	}
```
but this restricts to lists that are all type Button OR all type TextField.

But using trait objects you can have both `Box<Button>` and `Box<TextField>`

```
pub struct Button {
    ...
}
impl Draw for Button {
    fn draw(&self) {
        // draw a button using Button fields
    }
}
```

`Box<dyn Draw>`

The compiler generates non-generic implementations of functions and methods for **each** concrete type we use in place of a generic type parameter, which allows for static dispatch (the compiler knows what method you're calling at compile time). This is opposed to dynamic dispatch, where the compiler can't tell at compile time and so it's figured at runtime.

Trade-off: trait objects give you flexibility at the cost of performance. 

⭐️Don't try to shoehorn OOP into Rust. Write rust in rust.

Ch 18 Patterns and Matching

```
match VAL {
    PAT => EXPR,
    PAT => EXPR,
}
```

`_` for match anything

`if let` for single match. There's also `while let`
`if let Ok(age) = age // new age variable that shadows`

`let` pattern matches! fn parameters also do pattern matching.

patterns can be refutable and irrefutable.
If it will always work, it's irrefutable.
Don't need to worry about it but know the terms to read error messages.

Use `|` for multiple:

```
match x {
    1 | 2 => println!("one or two"),
    3 => println!("three"),
    _ => println!("other numbers"),
}
```

Ranges 1..5 and 1..=4 are the same as 1 | 2 | 3 | 4

DeSTRUCTuring

```
let p = Point {x: 0, y: 100};
let Point {x: a, y: b} = p;
// now use a and b
```

Enums:
```
match msg {
    Message::Quit => {...},
    Message::move => {...},
}
```

Use `_` to ignore values and `..` to ignore remaining values

`let {x: a, ..} = five_dimensional_chess_coord;`

Match guard, add `if` checks:
```
match num {
    Some(x) if x % 2 == 0 => {...},
    Some(x) => {...}
}
```

@ lets you test a variable and bind it
```
match msg {
    Message::Hello {
    id: id_variable @ 3..=7
    } => {...}
}
```

## Ch 19 Advanced Features

Unsafe

"unsafe superpowers" include:
- deref a raw pointer
- call unsafe fn
- access/modify mutable static variable
- impl unsafe trait
- access fields of unions

unsafe doesn't turn off the borrow checker or disable Rust's safety checks.

Keep unsafe blocks small.

Raw pointers are written as:
```
*const T
*mut T
```

"immutable" means the pointer cannot be assigned to after being deref

Raw pointers:
- allowed to ignore borrowing rules by having immutable and mutable pointers or multiple mutable pointers to the same location
- aren't guaranteed to point to valid memory
- allowed to be null
- don't implement any automatic cleanup

```
let mut num = 5;
let r1 = &num as *const i32;
let r2 = &mut num as *mut i32;

unsafe {
    println!("r1 is {}", *r1);
    println!("r2 is {}", *r2);
}
```

You can create raw pointers from safe code, but can only deref in an unsafe block.

We know these pointers are valid b/c they're made from a ref `&num` but not always the case.
```
let rand_address = 0x0123usize;
let r = address as *const i32;
```

FFI Foreign Function Interface

```
extern "C" { 
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        println!("C abs={}", abs(-3));
    }
}
```

"C" part defines which ABI (application binary interface) the foreign function uses. The ABI defines how to call at the assembly level. 

To call Rust from other languages:

```
#[no_mangle]
pub extern "C" fn name_c_uses() {
    println!("Just called Rust from C!");
}
```

`extern` in the fn declaration implies unsafe

Static (Global) variables are tricky in Rust b/c of the ownership rules.

`static HELLO_WORLD: &str = "hello, world";`

Statics have a fixed place in memory and can be mutable.
Constants are allowed to duplicate data and are immutable.

```
static mut COUNTER: u32 = 0;
fn inc_count(inc: u32) {
    unsafe {
        COUNTER += inc;
    }
}

fn main() {
    inc_count(3);
    unsafe {
        println!("COUNTER={}", COUNTER);
    }
}
```

Traits can be marked unsafe

Access to unions has to be done unsafe, b/c the compiler cannot guarantee what data is available.

*Using unsafe to use one of the five "superpowers" isn't wrong or even frowned upon. It's just trickier and requires more care. unsafe makes it easier to track down bugs.

## Advanced Traits

"Associated types" are like placeholders
```
pub trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;
}
```

Why not just use generics? When using generics, we must annotate the types for each impl and specify the type when we use it.

When using generic type parameters, we can specify a default concrete type.

<PlaceholderType=ConcreteType>

For example, operator overloading.

https://doc.rust-lang.org/std/ops/index.html

```
trait Add<Rhs=Self> {
    type Output;
    fn add(self, rhs: Rhs) -> Self::Output;
}
```

`person.fly()` is really just `Type::fly(&person)`
If you need to clarify or specify, use the latter.

If it's complex, use `<Dog as Animal>::baby_name()`

Full verbose version: `<Type as Trait>::function(receiver_if_method, next_arg)`

Implement fmt::Display:
```
impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fm::Result {
        write!(f, "({}, {})", self.x, self.y);
    }
}
```

You're allowed to implement a trait on a type as long as either the trait or the type are local to our crate.
To get around this, use "newtype"

```
struct Wrapper(Vec<String>);

impl fmt::Display for Wrapper {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(...) // use self.0
    }
}
```

(Kotlin's delegate feature is better)

Type aliases: `type new_name = old_name;`

Never type: `!`
`fn bar() -> ! {...}`

DST: Dynamically Sized Types or "unsized" types. Must always put values of DSTs behind a pointer of some kind.

Raw `str` is a DST. Strings can be any length. Which is why we always deal with &str

All generics actually rely on `Sized` trait.

Function pointers:
```
fn add_one(x: i32) -> i32 {
    x + 1
}

fn do_twice(f: fn(i32) -> i32, arg: i32) -> i32 {
    f(arg) + f(arg)
}
fn main() {
    let answer = do_twice(add_one, 5);
}
```

Function pointers implement all Fn, FnMut, and FnOnce.
Would want to use this when working with C, b/c C doesn't have closures.

Similar to Java & Kotlin, can use fn names or closures for map
```
.map(|i| i.to_string()).collect()
.map(ToString::to_string).collect()
```

To return a closure from a function, you cannot use a trait. Need to use Box:
```
fn returns_closure() -> Box<dyn Fn(i32) -> i32> {
    Box::new(|x| x + 1)
}
```

## Macros:

declarative macros with macro_rules!
Procedural macros:
1. Custom #[derive] macros
2. Attribute-like macros that define custom attributes
3. Function-like macros but operate on the tokens specified

Macros generate code, can have varargs, and are expanded before compiler interprets.

Simplified definition of vec! macro:
```
#[macro_export]
macro_rules! vec {
    ( $( $x:expr ), *) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}
```


⭐️ "The Little Book of Rust Macros" https://danielkeep.github.io/tlborm/book/index.html
(skipping the rest b/c writing macros is niche and is usually done with the docs open)

Onto the final project!

Final Project:

HTTP **Request** format:
```
Method Request-URI HTTP-Version CRLF
headers CRLF
message-body
```

HTTP Response format:
```
HTTP-Version Status-Code Reason-Phrase CRLF
headers CLRF
message-body
```

Weird gotcha with `while let` vs `let`: normal let drops temp vars but `while let` doesn't until end of block.



---

# Notes from C++Now 2017: Niko Matsakis "Rust: Hack Without Fear!"
https://www.youtube.com/watch?v=lO1z-7cuRYI

Ownership & Borrowed
```
Type:       Ownership:          Alias?      Mutate?
T           Owned                           Yes
&T          Shared reference    Yes
&mut T      Mutable reference               Yes
```

In Rust, .clone() is always explicit (it's implied in C++)

Shared references: "Don't break your friends toys"
Cannot mutate shared refs. If it's shared, you cannot mutate.

Mutable reference:
After the mutable reference has been "given" you cannot mutate the original

Lifetimes:
```
fn first<'a>(v: &'a Vec<String>) -> &'a String {
    return &v[0];
}
```

Thankfully Rust has built-in rules to simplify the lifetime syntax for simple cases
```
fn first(v: &Vec<String>) -> &String {
    return &v[0];
}
```

Traits:
```
trait Clone {
    fn clone(&self) -> Self;
}
```

The `&self` shows it's a method (the `self` says that) that uses a reference (`&self`) of the object, but does NOT mutate it (no `mut`)

Concurrency:
Rust itself knows very little about concurrency and threads. Mostly in libraries.
sharing + mutation + no ordering = Data races
Ruts already handles sharing + mutation

Concurrency Paradigms
```
Paradigm:           Ownership?          Borrowing?
Fork-join                               Yes
Message passing     Yes
Locking             Yes                 Yes
Lock-free           Yes                 Yes
Futures             Yes                 Yes
```

Unsafe:
unsafe {...}

Rust changes to itself: RFC->Nightly->Beta->Stable

---

# Notes from Rust in ten slides 
https://steveklabnik.github.io/rust-in-ten-slides

```
str slices (&str) + ranges:
let s = "hello world"; // &str is immutable; are a pointer to start & length.
let hello = &s[..5]; // "hello"
let world = &s[6..]; // "world"
```

str are UTF-8 Encoded, which has variable-length encoding. Also why you cannot use s[i].
[] is expected to always have O(1) runtime. So have to use the API to get nth byte, unicode scalar, or grapheme cluster.
On the other hand, chars are always 4-bytes. 

String is the owned mutable String. How to create one:
- s.to_string()             // direct, idiomatic
- String::from("literal")   // looks nicer on literals
- s.to_owned()              // also works because `String` is the owned verison of &str
- s.into()                  // everything that implements From implements Into

&str is pointer & length
String is pointer, length, & capacity // len() and capacity()

String implements `Deref<Target=str>` which is why you can pass a `&String` to something expecting a &str and It Just Works.
(This is part of why I was so confused with them!!)

This is why you generally use &str as the input parameter type, so people can pass in either.
If you want to be even more open, use `AsRef<str>` and calling `s.as_ref()`
(This is like accepting ArrayList vs List vs Collection)

use format! to append strings

---
# Rust makes you feel like a Genius

https://www.youtube.com/watch?v=0rJ94rbdteE

The borrow checker has two rules:
1. Data has **one owner**
2. Data has multiple readers XOR one writer

---

# Notes from A Gentle Introduction to Rust:
https://stevedonovan.github.io/rust-gentle-intro/readme.html

API Ref: `rustup doc [--std]`
`&` is pronounced "borrow" in Rust (or "reference to"). 
`*` is dereference. Just like an asterisk/footnote that you follow. Or an *exploding* star.

Trick: to get the type of something, give an incorrect type like `()` and the compiler will tell you:
`let foo: () = [1,2];`
         ^ wrong type. Compiler will give suggestion

Tip: in the docs, hit the [-] in the top right to collapse all

Iterators:
.iter() .windows(2)

`String` is like C++'s mutable string.
System languages have static or allocated strings.
`&str` is pronounced "string slice"

Here's an analogy `&str:String::&[T]:Vec<T>`
string slices (&str) are to Strings as an array is to a Vector
slices are fixed, immutable, a pointer + length

String is automatically coerced into &str as needed
and Vec is automatically coerced into array as needed

```
s.chars()            // get chars
s.split_whitespace() // common operation
s.chars().filter(|ch| ! ch.is_whitespace()).collect() 
// collect needs to be told what type on lhs
```

TODO CONTINUE READING: https://stevedonovan.github.io/rust-gentle-intro/2-structs-enums-lifetimes.html

--- 

# Rust by Example

https://doc.rust-lang.org/rust-by-example

#[derive(Debug)]
struct Thing(i32);

"{:?}" debug print
"{:#?}" pretty print
