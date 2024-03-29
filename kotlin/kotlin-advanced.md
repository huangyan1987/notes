
# Condition check
Prereq's with require() requireNotNull() and state check with check()

Logging: use MicroUtils/kotlin-logging https://github.com/MicroUtils/kotlin-logging
Unit testing: use kotlin-test-common
or:
- kotlin-test
- kotlin-test-junit
- kotlin-test-junit5
- junit-jupiter
Unit test mocking: MockK https://mockk.io/

# Coroutines

Coroutines https://kotlinlang.org/docs/coroutines-guide.html
First, add dependency:
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.1")

Then:
    import kotlinx.coroutines.*

"keywords":
- suspend
- coroutineScope
- launch
- delay

# Generics

```
fun <T> gFunction(arg: T): T = arg

class GClass<T>(val x: T) {
    fun f(): T = x
}

class GMemberFunction {
    fun <T> f(arg: T): T = arg
}

interface GInterface<T> {
    val x: T
    fun f(): T
}

class GImpl<T>(
    override val x: T
) : GInterface<T> {
    override fun f(): T = x
}

class Concrete : GInterface<String> {
    override val x: String
        get() = "x"

    override fun f(): String = "f()"

}
```

`reified` also lets us get around Type erasure!

```
fun <T: Any> a(kClass: KClass<T>) {
    println(kClass)
}

// This is the typical Java-way to handle this b/c 'T' is erased at runtime
fun <T : Any> c(kClass: KClass<T>) = a(kClass)

// using reified (also requires inline)
// reified tells teh compiler to preserve the type information
inline fun <reified T: Any> d() = a(T::class)

// This allows `is` checks
inline fun <reified T: Any> check(t: Any) = println(t is T)

class K

fun main() {
    val kc = c(K::class)
    val kd = d<K>()
    check<String>("asdf")
    check<String>(123)
}
```

This example also shows how lambdas work

```
fun <E, C: MutableCollection<E>> Collection<E>.partitionTo(a: C, b: C, pred: (E) -> Boolean): Pair<C, C> {
    for (e in this) {
        if (pred(e)) {
            a.add(e)
        } else {
            b.add(e)
        }
    }
    return Pair(a, b)
}

fun partitionWordsAndLines() {
    val (words, lines) = listOf("a", "a b", "c", "d e")
            .partitionTo(ArrayList(), ArrayList()) { s -> !s.contains(" ") }
    check(words == listOf("a", "c"))
    check(lines == listOf("a b", "d e"))
}
```

# Custom Delegates

```
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty

class D {
    var date: MyDate by EffectiveDate()
}

class EffectiveDate<R> : ReadWriteProperty<R, MyDate> {
    var timeInMillis: Long? = null
    override fun getValue(thisRef: R, property: KProperty<*>): MyDate {
        return timeInMillis!!.toDate()
    }
    override fun setValue(thisRef: R, property: KProperty<*>, value: MyDate) {
        timeInMillis = value.toMillis()
    }
}
```

# Builders

 ```
import java.util.HashMap

fun <K,V> buildMutableMap(build: HashMap<K, V>.() -> Unit): Map<K, V> {
    val map = HashMap<K, V>()
    map.build()
    return map
}

fun usage(): Map<Int, String> {
    return buildMutableMap {
        put(0, "0")
        for (i in 1..10) {
            put(i, "$i")
        }
    }
}
```

# Scope functions: let run with apply also

Scope functions execute a block of code "on" an object. No new functionality, just added readability.

Without scope function, repeat the variable name:
```
val alice = Person("Alice", 20, "Amsterdam")
println(alice)
alice.moveTo("London")
alice.incrementAge()
println(alice)
```

With scope function:
```
Person("Alice", 20, "Amsterdam").let {
    println(it)
    it.moveTo("London")
    it.incrementAge()
    println(it)
}
```

Function, Object reference, Return value, extension function?
let, it, result, yes
run, this, result, yes
run, -, result, no
with, this, result, no
apply, this, context object, yes
also, it, context object, yes

Purpose -> function-to-use:
Execute lambda on non-null object -> let
Introducing an expression as a variable in lexical scope -> let
Object configuration -> apply
Object configuration and computing result -> run
Running statements where an expression is required -> non-extension run
Addition effects -> also
Grouping function calls on an object -> with

Avoid overuse as it can reduce readability and do not nest.

`this` is used when it's a lambda reciever
`it` is used when it's a lambda argument (it is shorthand for it ->)

"run this"
"Let it (go!)"

When to use which? They're technically interchangable, so it's mostly down to style.

In my own words:
- o.let: a block where `this` is scoped for reducing repetition on the object.
    Like 'let-binding' in lisp, but it's just (let (it obj) (*block*))
- o.run: most flexible, a combination of let & with and can be just a block
- with(o): a block where you don't need to repeat the variable name
- o.apply is used for configuration to keep mutabilility contained
- o.also is for sticking on side-effects

apply & also returning the context object means they're for chaining object calls.
let run & with return the lambda/block result

let only works on non-null, so may need to use optObj?.let {...}


takeIf: given a predicate, if the object matches the predicate, returns the object or null (takeUnless does the opposite)

val oddOrNull = num.takeIf { it % 2 != 0 }

Useful for chaining with ?.let

num.takeIf { it % 2 != 0 }?.let {...}

Serialization: https://github.com/Kotlin/kotlinx.serialization/blob/master/docs/serialization-guide.md

