# Scala: "skah-lah", "A Better Java", 
Java++, OO+FP on the JVM
- Basics: https://docs.scala-lang.org/tour/basics.html
- Cheatsheet: https://docs.scala-lang.org/cheatsheets/index.html

TODO/TOREAD:
- Twitter Scala school: http://twitter.github.io/scala_school/
- Twitter style guide: https://twitter.github.io/effectivescala/
- Underscore books: https://underscore.io/books/

From "Programming in Scala" 4th Ed. 2019, using Scala v2.13.1
(Latest version as of 2020 is 2.13.3)
www.scala-lang.org

sbt := Scala Build Tool

What makes Scala great:
- basically: Scala extends Java. Full Java interop with major improvements, while staying similar enough.
  - Can call Java methods, access fields, inherit from classes, & implement interfaces
- Better OOP. Every value is an object; every operation a method call. Composition over Inheritence.
  - Has traits/mixins, singletons, case classes, & value types.
- Functional Programming: Everything's an expression; tail-recursion, lazy evaluation
- Immutability by-default, esp in Collections
- Good REPL
- Pattern matching
- Operator overloading
- interpolated & format Strings
- Named & default arguments
- Package objects for "helper" methods
- Smarter syntax: type inference; no semicolons & returns; optional brackets, dots, & parens


Scala's Ints are int, Floats as float, Booleans as booleans, etc.
Scala arrays are Java's. Strings are Strings.

Classes:
```
Java:
class MyClass {
    private final int index;
    private final String name;

    public MyClass(final int index, final String name)){
        this.index = index;
        this.name = name;
    }
    // Getters
}
```
Scala:
`class MyClass(index: Int, name: String)`

```
object MyApp {
    def main(args: Array[String]) = {
        /**/
    }
}
```

First tips for reading Scala:
var defines variables that can be reassigned.
val is similar but cannot be reassigned; prefer val over var.
def defines methods and functions.
In a method, the last value evaluated is returned. Don't use return keyword.
: reads as "is a" for variables or "returns a" for functions
    x: String  // Scala
    x          // Scala, with type inference!
    String x   // Java

_ is a Scala's wildcard, instead of * which is an operator (usually meaning multiplication)
Often used to avoid deciding on a useless variable name:
    filter(x => x > 10)
    filter(_ > 10)
When it's repeated, it's for different params
Or in imports to import everything: import math._
Or in match-cases it matches everything:
    case _ => "This is the default"

Unit is like Java's void, methods returning Unit are only executed for their side-effects
Brackets wrap type parameters, so for collections:
```
    List[String]   // Scala
    List<String>   // Java
```
Scala has named and default arguments for methods.

Companion objects (which are also singletons) are used for static methods. 

Example def, compared with Java & Clojure:
Example def, read as "define a method 'from', which given src (is-an Iterable of Es), returns a List of Es..."
    `def from[E](src: Iterable[E]): List[E] = ...`
Java equivalent, read as "public method, return List of E, named from, params are an Iterable of Es, src"
    `public <E> List<E> from(Iterable<E> src) { ... }`
Clojure equivalent "fn named from, param is src..."
    (defn from [src] ...)

Scripts:
run scripts with `scala`
args are in `args`
Arrays are zero-indexed using parens: args(0)

for-loops:
args.foreach((arg: String) => println(arg))
args.foreach(println)
for (arg <- args) println(arg)

Tuples: are 1-based, so: tuple._1 for first

Maps:
val m = Map("a" -> "alpha", "b" -> "beta") // The -> syntax creates a tuple of ("a", "alpha")
val n = m + ("c" -> "gamma?")

Method calls, dot and parens sometimes optional:

a.m(b) == a m b
a + b == a.+(b)
fn(x) == fn.apply(x) // for functions and factories
0 to 2 == 0.to(2)
x(n) = m == x.update(n, m)

xs ::: ys == xs.concat(ys)

x :: xs == "cons" == (x (xs))
1 :: List(2, 3) == (1 2 3)
1 :: 2 :: 3 :: Nil == List(1,2,3)

Lists are linked-lists. 
    Head is 0/left/beginning.
    E == Element
    P == Predicate == (E => Boolean)
    F == Function == (E => Type)
List() == () == Nil
The "head" is 0. Or left or the beginning
xs(2)       // .get(2)
contains
count
length
map
mkString    // join
drop        // drop from head
dropRight   // drop from tail
exists      // true if predicate returns true for any element
filter      // filters out falses (keeps true)
filterNot   // filters out trues (keeps false)
forall      // true if predicate returns true for all elements (true on empty)
foreach     // for-loop
reverse
sortWith
(head -> ...tail)
(init... -> last)
head        // first
tail        // all but first
last        // last
init        // all but last

use type annotation _* to "spread" a list into arguments:
// list = (1 2 3)
fn(list: _*) same as fn(1,2,3)


Int methods:
0 max 5
0 min 5
x abs
x round
x isInfinity
x to y    == [x, y] inclusive "count *to* five"
x until y == [x, y) exclusive

Strings:
Interpolation strings:
s"This $name interoplated ${1 + 2}"
f"This formats ${math.Pi}%.8f"
Raw strings:
raw"No \\escape!"
"""also no \\escape"""
Methods:
s capitalize
s drop 2

Regex: scala.util.matching.Regex
val r = new Regex("""...""")
val r = """...""".r
Methods: findFirstIn findAllIn findPrefixOf

Predef:
assert  // throws AssertionError
require // throws IAE
classOf // returns the class of, like T.class
print/f/ln
???     // throws NotImplementedError, for methods to be implemented

Predef aliases:
Class = java.lang.Class
Function = (A) => B
Map = collection.immutable.Map
Set = "".Set
String = java.lang.String
-> = Tuple2 // helpful for the Map initializer


Class:

class Rational(n: Int, d: Int) {
    def this(n: Int) = this(n, 1)
}

Controls: if while for try-catch-finally match
for (i <- nums) println(i)

for {
    file <- files       // a generator
    if ...              // a filter
    line <- files.lines // another generator
    if ...              // another filter
    l = line            // a definition (not a good one, but whatever)
} println (s"$line in $file")

Generator:
for (...) yield {...}

try {
} catch {
    case ex: FileNotFoundException => ...
    case ex: IOException => ...
} finally {
    // DO NOT return from finally
}

x match {
    case ... => ...
    case _ => "default"
}

Trait:

trait Friend {
    val name: String
    def listen() = println(s"I'm $name and I'm listening")
}

Operators are methods. For unary operators, it's .unary-. Only + - ! ~ allowed
Operators that end in : swap, so a ::: b == b.:::(a)

To cast: foo.asInstanceOf[Type]

Imports:
use _ instead of *
Can rename:
import Fruits.{Apple => McIntosh, Orange}
Can exclude:
import Fruits.{Pear => _, _} // all except Pear

Packages:
package object YourPackage { /**/ }

Unit Testing with ScalaTest:
import org.scalatest.funsuit.AnyFunSuite
class XSuite extends AnyFunSuite {
    test("description...") {
        /**/
        assert(/**/)
    }
}

Value classes (instead of using raw types):
class Html(val value: String) extends AnyVal

Hierarchy:
- Any
  - AnyVal
    - Double, FLoat, Long, Int, Short, Byte, Boolean, Char
    - Unit
    - Other value classes
  - AnyRef
    - String
    - Java classes
    - Iterable
      - Seq
        - List
    - (below all classes) Null
        - (below EVERYTHING) Nothing

class Cat extends animal with Furry with FourLegged
Linearization: Cat -> FourLegged -> HasLegs -> Furry -> Animal -> AnyRef -> Any

Case classes:
case class MyVar(name: String) extends MyExpr
- creates factory
- defines methods: toString hashCode equals copy
- pattern matching

Pattern Matching: no fallthrough, no breaks needed, throws if no match found
x match {
    case "y" => "yy" 
    case "z" => "zz"
    case _ => "default"
}

can define variables in the case:
x match {
    case "a" => "A"
    case x => s"we got $x"
}

Option: Some(x) or None

Abstracts:
Java has abstract methods
Scala has abstract methods, val & var fields, and types

lazy val // defines a lazily-initialized value

Enums:
object Color extends Enumeration {
    val Red, Green, Blue = Value
}

object StatusCode extends Enumeration {
    val Success = Value(200)
    val Forbidden = Value(403)
    val NotFound = Value(404)
}
StatusCode.values               // to loop through all
StatusCode.Success.id == 200

Implicit conversions:
implicit def foo2bar(foo: Foo) = {
    new Bar(foo) // or whatever
}

for expressions translated:
    for (x <- ex1) yield ex2
    ex1.map(x => ex2)

    for (x <- ex1 if ex2) yield ex3
    ex1 withFilter (x => ex2) map (x => ex3)

Collections
! = mutable
^ = immutable
Iterable
- Seq
  - IndexedSeq
    - ArraySeq Vector ArrayDeque! Queue! Stack! Range NumericRange
  - LinearSeq
    - List LazyList Queue^
  - Buffer
    - ListBuffer ArrayBuffer
- Set
  - HashSet! HashSet^ LinkedHashSet BitSet EmptySet Set1...Set4
  - SortedSet
    - TreeSet
- Map
  - HashMap! HashMap^ LinkedHashMap! VectorMap^ EmptyMap Map1...Map4
  - SortedMap
    - TreeMap

Iterable:
foreach grouped sliding
++ concat
map flatMap collect
toIndexedSeq toIterable toList toMap toSeq toSet toVector
copyToArray
isEmpty nonEmpty size knownSize sizeComare sizeIs
head last headOption lastOption find
takeWhile tail init slice take drop filter dropWhile filterNot withFilter
groupBy groupMap groupMapReduce splitAt span partition partitionMap
exists forall count
foldLeft foldRight reduceLeft reduceRight
sum product min max
mkString addString
zip lazyZip zipAll zipWithIndex

Set:
contains s(x)
subsetOf empty
& intersect | union &~ diff 
immutable.Set: + incl ++ concat - excl -- removedAll
mutable.Set: += addOne ++= addAll add -= subtractOne --= subtractAll remove filterInPlace clear s(x)=b

Map:
get // returns Option, None if missing
m(k) // throws if missing
getOrElse contains isDefinedAt
keys keySet keysIterator values valuesIterator
.view filterKeys mapValues
immutable.Map: + updated ++ concat updatedWith - removed -- removedAll
mutable.Map: m(k)=v update m += (k -> v) ++= put getOrElseUpdate updateWith -= --= remove filterInPlace clear mapValuesInPlace


Annotations:
@deprecated
(e: @unchecked) match {...}
class mine extends Annotations
@tailrec @volatile @SerialVersionUID @transient @unchecked @native
@scala.reflect.BeanProperty // creates get and set methods

Java interop:
scala singleton objects: object App {...}
In Java: App$

Concurrency:
scala.concurrent.Future
    val fut = Future { Thread.sleep(10000); 20+20}
Needs a thread pool:
    import scala.concurrent.ExecutionContext.Implicits.global
isCompleted value


Gotchas:
Don't forget the = in a def
Only use == and != for equals. Use eq for reference equality (which is very rare!)
Scala does NOT have ++ or -- for increment or decrement
No break keyword for loops (at least not out of the box)
`[Brackets] for types, instead of Java's <Generics> syntax`
void = Unit

---
# Advent of Code notes:
// Read lines from file
Source.fromFile(filename).getLines()

// Infinite LazyList repeating list of nums: e.g. 1 2 3 -> 1 2 3 1 2 3 ...
val once = lines.toList.map(_.toInt).to(LazyList)
def repeated: LazyList[Int] = once #::: repeated

// Running sum
val sums: LazyList[Int] = repeated.scanLeft(0)(_ + _)


---

# Functional Programming in Scala

curry: taking a function that takes n args, turn it into n fns that each take 1 arg
uncurry: take a fn that takes 1 arg (which returns another etc) into a single fn that takes n args

currying can help with type inference, like with dropWhile

def dropWhile[A](as: List[A])(f: A => Boolean): List[A] = ...
allows for:
  dropWhile(xs)(x < 10)
instead of having to specify the types
  dropWhile(xs, (x: Int) => x < 10)


---

IntelliJ + Scala tips:

Worksheets are really useful but also a pain when you're also editing the code
- Hitting [Enter] is the best way to re-run the sheet
- Close & reopen sheets if they're not seeing latest changes


---

Akka
Akka is an Actor-based Scala library, similar to Erlang's actor model
Actors communicate by sending messages to each other.
Each actor can: message send and message receive. send uses !

    recipient ! msg

Sends are async. Each actor has a mailbox where incoming messages are queued.

To add Akka to project, add this to the build.sbt

    libraryDependencies +=
      "com.typesafe.akka" % "akka-actor_2.11" % "2.4.20"

---

May 2021: coming back to Scala

