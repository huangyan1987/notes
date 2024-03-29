Whats different from Java? (or missing)

# Better defaults:

Things that are different between Java and Kotlin.

Many of these are examples of Kotlin being a "better" Java by having more sane or safer defaults.

`[Item]: <Java> vs <Kotlin>`

visibility: package-private vs public
    In Java, the default visibility is package-private. This is practically never used and is a bad default.
    In Kotlin, the visibility is public by default. Options: private protected internal
    `private` means visible within the file
    `protected` means visible within the class and subclasses
    `internal` means visible within the module

nullability: nullable vs non-null
    In Java, `String` means a String or null.
    In Kotlin, `String` means a String; NOT null. `String?` means String or null.

finality: non-final vs final by default + val/var
    In Java variables/fields/parameters/classes are non-final by default. This is a bad default and causes "safe" code to put `final` everywhere.
    In Kotlin, parameters and classes are final by default. Classes are made non-final with the `open`. Variables and fields are either val (final, preferred) or var (non-final). This keeps code safe and readable.
    Effective Java Item 19: Design and document for inheritance or else prohibit it 93

override: @Override vs override
    In Java, overrides are implicit and error-prone. The @Override annotation is suggested but doesn't provide compiler checking.
    In Kotlin, overrides must use the `override` keyword, which gives compiler checks.
    Effective Java Item 40: Consistently use the Override annotation 188

Collection mutability: mutable vs immutable
    Java collections (Lists, Maps, Sets) are mutable by default. There are immutable versions that throw runtime exceptions.
    Kotlin collections are immutable by default. There are mutable subclasses which each add `add` functionality.
    Effective Java Item 17: Minimize mutability 80

# Differences

Things that are just syntactically different.

Difference: lambda syntax

dogs.filter(d -> d.isGood())    // Java

dogs.filter {d -> d.isGood()}   // Kotlin
dogs.filter { it.isGood() }       // Kotlin uses `it` for unary lambdas
dogs.filter(Dog::isGood)        // Using method reference

Missing in Kotlin (with Kotlin alternatives):

# No `new`.

Thing thing = new Thing(); // Java
val thing = Thing()        // Kotlin

# No static. Use functions, object, and/or const.

Kotlin has no static methods or static fields or final static fields (often used for constants)

1. for static methods: just use a function
2. for variable static fields: use a companion object or object singleton instead
3. for constant static fields: use `const` or use a companion object or object singleton instead

Why? 'static' methods and fields are always a problem in OOP. They're hard to test and are effectively global variables. Kotlin further separates them. Kotlin replaces "Util" classes (which are often not-instantiable and contain static methods) with `object` singletons

# No checked exceptions. Use documentation.

Java's inclusion of checked exceptions is a bit unique. Because they're forced on users, they often result in boilerplate no-op error handling. They also don't capture RuntimeExceptions (i.e. NPE or IIAE).

I'm personally not 100% behind this language decision, but I also recall writing try-catch blocks around IOExceptions that were pointless.

Effective Java Item 69: Use exceptions only for exceptional conditions 293
Effective Java Item 77: Don’t ignore exceptions 310

# No C-style for-loop

Kotlin doesn't have the classic `for (int i = 0; i < arr.length; i++)` style loop.

Use for-in loop or functional programming (filter/map/etc)
for (i in 0..n-1)               // with range
for (i in array.indices)        // for arrays
for ((index, value) in array.withIndex())   // even better with withIndex()

Why? The classic for-loop is very imperative. It can very often be replaced with filter/map/reduce.

Effective Java Item 58: Prefer for-each loops to traditional for loops 264

# No ternary operator. Use if-else expression

Use if-else expression instead: var x = if (beforeNoon) "good morning" else "good evening"

Why? Language designer choice

Also remember the "Elvis" operator exists to simplify null-checks:

val givenOutput: File? = ...
val actualOutput: File = if (output != null) output else TempFile()
val actualOutput: File = output ?: TempFile()

# No class-per-file requirement. Use judgement.

In Java, you always have the class name match the file name. In Kotlin, it's a good practice, but not required. Sometimes you don't define a "class" but instead a singleton object.

In Kotlin, `private` is limited to the *file*.

# No `instanceof`

Use `is` instead which works with type inference:

val annie: Any?
if (annie is Dog) {
    annie.woof()        // no casting necessary, we know annie is a Dog here
}