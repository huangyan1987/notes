To Read:
Blog https://blog.jetbrains.com/kotlin/2020/11/server-side-development-with-kotlin-frameworks-and-libraries/
kotlin.test https://kotlinlang.org/api/latest/kotlin.test/kotlin.test/

https://kotlinlang.org/

Why Kotlin?
"Modern, concise and safe programming language"
A more "effective" Java with most of "Effective Java" built-in
- Full Java-Interopability
- First-class support from IntelliJ (JetBrains), Android (Google), and Spring
- Null safety: String? vs String! thing?.field and thing ?: "default"
- Nice Immutable collections
- Shallow learning curve
- Strong types (incl. Inline classes and Type Aliases)
- Coroutines
- String template: "Buy now for $cost"
- ranges: x in 1..10
- For unit tests: fun `descriptive test name`()
- String template and concat (+) automatically use StringBuilder for performance
- Simple primitive conversion, .toInt(). Forget boxing/unboxing rules.
- Simply prefer val over var. No need for "final" everywhere, it's the default for parameters and classes!
- Simple lazy-initializers with lateinit
- Extension functions replace "Util" classes
- `==` does what it ought to again (.equals in Java). While `===` is used for same reference (hardly ever needed!)
- Operator overloading
- One Language: primarily for JVM but also compiles to JavaScript and native

And Java agrees!
- SOLID Open-closed principle: Kotlin classes are sealed by default
    - sealed classes added in Java 15..17 (but not the default)
- properties & data classes (no more getters/setters or Lombok)
    - "records" added in Java 14..16
- when expression
    - similar to pattern matching switch previewed in Java 17

Why not...
- Scala? Decrease in readability, implicits, rough compatiability, less support, learning curve
- Clojure? Major paradigm shift, steep learning curve, poor IDE support, runtime = slow

```
fun main(args: Array<String>): Unit {
    TODO()
}
```
or just
fun main() {
    TODO()
}

when(foo) {
    1 -> "One"
    "Hello" -> "World"
    else -> "default"
}

Example of using when to simplify if-then chain:
```
data class MyDate(val year: Int, val month: Int, val dayOfMonth: Int) : Comparable<MyDate> {
    override fun compareTo(other: MyDate): Int = when {
        year != other.year -> year - other.year
        month != other.month -> month - other.month
        else -> dayOfMonth - other.dayOfMonth
    }
}
```
`in` is an operator for ranges and collections
x in xs
y in 0..100         // ranges INclude last, shortcut for 0.rangeTo(100)

use `!in` for not-checks
if (person !in friends) ignoreCall()

`is` is used for type checks
if (s is String) {
    return s.length
}

`with` effectively reassigns the `this` to what's given:
with (book) {
    println("$title by $author")
}
vs.
println("${book.title} by ${book.author}")

A method in Java but a property (?) in Kotlin:
Strings use s.length        
Collections use c.size
Arrays (still) use arr.size

Strings:
s.ifBlank { "Default" }

Collections https://kotlinlang.org/docs/collections-overview.html#collection

All mutable versions are prefixed with Mutable
`Collection<T> vs MutableCollection<T>`

Collections have .joinToString
joinToString is very flexible

empty collections: emptyList emptySet emptyMap but need their type specified
`val empty = emptyList<String>()`

Methods common across Lists & Sets (and Sequences??)
toList toMutableList toSet toSequence
iterator
isEmpty
sort // in place
sorted // returns new
filter map mapNotNull mapIndexed mapIndexedNotNull partition any none all
filterTo // provide a collection to put into
associate .associateTo
+ += // returns a new collection with the elements of each combined
- -= // returns a new collection with either the first element removed or will all in the collection
groupBy( eachCount fold reduce aggregate)
slice
take takeWhile takeLast drop dropLast 
chunked windowed zipWithNext
first last find findLast
shuffled
minOrNull maxOrNull average sum count

The -ed methods like sorted return copies.
All in-place methods are "imperative" like "sort". 

Lists:
default list is an ArrayList
listOf(...)
use .lastIndex

getOrElse to do defaults:
val hundo = al.getOrElse(100) { "default" } 
val hundo = al.getOrElse(100) { i ->  "default for $i"}

getOrNull indexOfFirst indexOfLast


List(num, init) e.g. List(3, {it * 2}) // => [0, 2, 4]

Sets:
default set is a LinkedHashSet which preserves order based on insert
setOf(...)

union intersect subtract

Map:
val map = mapOf("a" to 1, "b" to 2, "c" to 3)
default map is a LinkedHashMap which preserves order based on insert

Can create maps out of lists with .associateWith
val numbers = listOf("one", "two", "three", "four")
numbers.associateWith { it.length } // => {one=3, two=3, three=5, four=4}

.mapKeys and .mapValues each have it.key and it.value and let you overwrite the keys or values

.zip or a zip b

minus removes keys

// Build a map from the customer name to the customer
fun Shop.nameToCustomerMap(): Map<String, Customer> =
        customers.associateBy { it.name }

// Build a map from the customer to their city
fun Shop.customerToCityMap(): Map<Customer, City> =
        customers.associateWith { it.city }

// Build a map from the customer name to their city
fun Shop.customerNameToCityMap(): Map<String, City> =
        customers.associate { it.name to it.city }

// Build a map that stores the customers living in a given city
```
fun Shop.groupCustomersByCity(): Map<City, List<Customer>> =
        customers.groupBy { it.city }
```
for ((k, v) in map) { ... }

speaking of for-loops:
for (i in 1..10)        // [1,10] inclusive of end
for (i in 1 until 10)   // [1,10) exclusive of end
for (i in 0..100 step 2) // every other
for (i in 100 downTo 1)  // reverse
(1..10).forEach {...}

val s: String by lazy {
    // lazy init
}

class LazyProperty(val initializer: () -> Int) {
    val lazyValue: Int by lazy {
        initializer()
    }
}

Sequences: like a lazy list (like Clojure's seq)
sequenceOf("a", "b", "c")

Infinite sequences!
val odds = generateSequence(1) {it + 2} // `it` is the previous value
odds.take(5).toList() // => [1, 3, 5, 7, 9]

Or make sequence finite by ending with null
val oddNumbersLessThan10 = generateSequence(1) { if (it < 8) it + 2 else null }
println(oddNumbersLessThan10.count())

Stateless: map filter take drop

data class Book(val title: String, val author: String)

Extensions:
fun String.spaceToCamelCase() {...}

Singleton:
object YourName {
}

Abstract & Overrides:
abstract class ...
    abstract fun ...
override fun ...

interface Doer {
    fun do(): Thing
}

class Mover : Doer {
    override fun do() { ...move...} 
}

Single Abstract Methods (SAM) from Java are interfaces/abstract classes with one method. (They're effetively Functional)

fun interface OneArg {
    fun g(n: Int): Int
}

val oneArg = OneArg { it + 42 }

Delegation is "is-a inheritence via has-a composition":
interface AI
class A : AI
class B(val a: A) : AI by a // "Class B implements interface AI *by* using the `a` member object"

Casting:

(animal as Cat).meow()          // unsafe
(animal as? Cat)?.meow()        // safe

Idioms https://kotlinlang.org/docs/idioms.html

if-not null:
value?.let { ... }

map if-not null:
val mapped = value?.let { tx(it) } ?: "default"

try-catch expression:
val result = try {
    calc()
} catch (e: ArithmeticException) {
    throw IllegalStateException(e)
}

Single-expression functions:
fun answer() = 42
^ good 
v bleh
fun answer(): Int {
    return 42
}

Configure with apply:
val rect = Rectangle().apply {
    length = 4
    breadth = 5
    color = 0xFF00FF
}

AutoCloseable+use (just like Java's try-with resources):
reader().use {reader -> ... }

Generic functions:
```
//  public final class Gson {
//     ...
//     public <T> T fromJson(JsonElement json, Class<T> classOfT) throws JsonSyntaxException {
//     ...

inline fun <reified T: Any> Gson.fromJson(json: JsonElement): T = this.fromJson(json, T::class.java)
```

Use TODO() to mark code as unimplemented

can "import-as" (legit useful!)
import kotlin.random.Random as KRandom
import java.util.Random as JRandom

Operator overloading: https://kotlinlang.org/docs/operator-overloading.html
To display all operators:
operator fun `<Ctrl-Space>`

Define your own infix operators:
infix fun foo(...) {...}

KDoc is the format for documentation. Dokka is the tool.
https://kotlinlang.org/docs/kotlin-doc.html
Note: use the @Deprecated annotation, not documentation

# Troubleshooting

"Unresolved reference": tried calling a method that doesn't exist for the object's type