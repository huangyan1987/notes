# Java

## Java Language Version Features, by LTS, at a glance:

Java 11 Features (since Java 8)
- Modules aka Project Jigsaw
- jshell
- var keyword (in 10)
- private methods in interfaces
- New Methods:
    - Collections: Lists.of, etc.
    - Streams: takeWhile, dropWhile, iterate
    - Optionals: ifPresentOrElse
    - String: isBlank(), lines(), strip(), 
    - Files: writeString(), readString(path)
- Run java files: $ java Foo.java
- HttpClient (preview in 9, final in 11)

Java 17 Features (since Java 11)
- Switch Expressions: case RED -> "red";  (preview 12, final 14)
- Multi-line strings """ (preview 13, final 15)
- Records (preview  14, final  16)
- Pattern-matching instanceof (preview 14, final 16) 
- Sealed classes (preview 15)

Major Version Changes/Features, by each version:

Java 7 (2011):
try-with
<> inference operator
underscores in numbers: 1_000_000
binary literals: 0b00110011
... var-args syntax
switch supports Strings
java.nio.file
Concurrency: ForkJoinPool, Phaser, TransferQueue

Java 8 (2014):
Lambda expressions
Streams
java.time (better than java.util.Date)

(As of Nov 2020, Java 8 is "given". Migrating to Java 11)

Java 9 (2017):
methods++ Collections, Streams, Optional
Module system (Project Jigsaw)
private methods in interfaces
Concurrency: Flow, Publishers, Subscribers, (toward Reactive Streams), & CompletableFuture improvements
G1 is default garbage-collector (still the default as of Java 15)
Misc: JShell, jlink, HTTPClient preview

Java 10 (spring 2018):
var: local-variable type inference
New release cycle: feature release @ 6mo, update every quarter, and LTS @ 3yrs

Java 11 (fall 2018 LTS):
more methods Strings, Files
HTTPClient
Epsilon: Experimental No-op GC

(As of Nov 2020, Java 11 is the latest LTS, so beyond is "cutting edge")

Java 12 (spring 2019):
Micro-benchmark suite
Shenandoah: Experimental Low-Pause-Time GC

Java 13 (fall 2019):
Previews: switch expressions, text blocks

Java 14 (spring 2020):
Pattern matching instance of
Helpful NPE messages
switch expressions
Previews: records

Java 15 (fall 2020):
Text blocks
Hidden classes
ZGC: Scalable low-latency GC
Previews: sealed classes

Java 16 (spring 2021)
records
pattern matching instanceof: if (obj instanceof String s)
Previews: sealed classes

Java 17 LTS (fall 2021)
Possible future features: value types, 64-bit arrays, pattern matching, sealed types, better native interop, virtual threads

Projects:
Jigsaw: modules (completed)
Valhalla: Value types
Panama: better native iterop
Loom: virtual threads

---

Top Exceptions:
ArithmeticException
IllegalArgumentException
IllegalStateException
NullPointerException

Important Libraries:
Under java.
util
io / nio
math
net
text
time

```
$ javac # Java Compiler
-cp  -classpath
--release <#>
```

```
$ jar # java archive, program packager
cf # create jar file
xf # extract jar
tfv # list (as table) jar file, verbose
```

Concurrency:
Runnable is an interface with run() method
	Passed to a Thread: new Thread(runnable);
Thread is an abstract class with run() method.
	Started with start()
	Methods: getPriority, getState, interrupt, isAlive, isInterrupted, join, setPriority
	Object Methods: notify, notifyAll, wait
	Static methods: activeCount, currentThread, interrupted, sleep, yield
synchronized on a method is same as synchronized(this)

Executors:
	newCachedThreadPool
	newFixedThreadPool(int nThreads)
	newScheduledThreadPool(int size)
	newSingleThreadExecutor()
	newSingleThreadScheduledExecutor()

java.time:
Instant: specific point in time, since epoch
LocalDate: date, as in YYYY-mm-DD
LocalTime: time, as in HH:MM
LocalDateTime: date-time, as in YYYY-mm-DD-HH-MM
Duration
Period

---

## Effective Java, Nov 2020 re-read:

Assume (and auto?)
```
import java.util.*;
import java.util.concurrent.*;
import java.io.*;
```

1. Static factory methods
2. Builders
3. Enum singleton

```
public enum Elvis {
    INSTANCE;
    public void leaveBuilding() { ... }
}
```

4. Private ctor for noninstantiation
5. Avoid unnecessary objects. Careful with object pools; JVM is good.
6. Set obsolete to null
7. Avoid finalizers. Use final block to close resources.

8. Overriding equals is hard: Reflexive, Symmetric, Transitive, Consistent, non-null.
Default uses reference-equals.
- Reflexive: x.equals(x) == true
- Symmetric: x.equals(y) == y.equals(x)
- Transitive: x.equals(y) && y.equals(z) => x.equals(z)
- Consistent: same answer always x.equals(y)
- x.equals(null) == false

Recipe for equals():
    0. Use @Override. Only use **Object** as param type.
    1. Use == to check reference-equals
    2. Use instanceof to check type
    3. Cast to type (safe now)
    4. Check each significant field f in class against other o
        `(f==null ? o.f == null : f.equals(o.f))
        OR for faster if often equals
        `(f == o.f || (f != null && f.equals(o.field)))
    5. Check symmetry, transitive, and consistent w/ tests
    6. Override hashCode
    7. Don't be clever; only check fields.

9. Always override hashCode when you override equals
Equal objects must have equal hashCodes
10. Override toString
11. Judiciously override clone (usually don't)
Better to provide copy ctor or copy factory.
12. Consider implementing Comparable; good for sorting.

13. Minimize public classes and members
Top-level classes can be public or default package-private; prefer the latter.
    Public classes lock you in.
Members (fields, methods, nested classes, & nested interfaces):
private             prefer
package-private     default, good for enabling testing
protected           for super classes
public              only for intentional API

Instance fields should never be public; makes thread unsafe
Wrong to have a public static final array field or return such a field.
    Return a clone

14. In public classes, use getters
15. Immutability good: simple to use & thread-safe
Rules of Immutability:
    1. No mutator methods
    2. Can't be extended; make class final
    3. Make all fields final
    4. Make all fields private
    5. Ensure exclusive access to mutable components by making defensive copies in
        ctors, accessors, & readObject methods

Make every field final unless there's a good reason not to.

16. Composition over inheritence
17. Prohibit inheritence or design & document it
    Constructors must not invoke overridable methods
    Neither clone nor readObject may invoke an overridable method.
18. Prefer interfaces to abstract classes
Interfaces are simpler, less-coupled, less-hierarchial, but once defined are hard to change.
Abstract classes are more complicated, but can evolve easier.

Best of both worlds:
Doer            my interface
AbstractDoer    abstract, skeletal implementation of interface

19. Don't use interfaces to hold constants
20. Don't use tagged classes (classes with fields that indicate their type)
Use actual class hierarchy
21. Function objects for Strategies Obsolete: use Lambdas instead
22. Favor static member classes over non-static

23. Don't use raw types
If you don't know the type, use `List<?>

Terms:
Parameterized type          `List<String>
Actual type parameter       `String
Generic Type                `List<E>
Formal type parameter       `E
Unbounded wildcard type     `List<?>
Raw type                    `List
Bounded type parameter      `<E extends Number>
Recursive type bound        `<T extends Comparable<T>>
Bounded wildcard type       `List<? extends Number>
Generic method              `static <E> List<E> asList(E[] a)
Type token                  `String.class

24. Eliminate uncheck warnings

If you can't, use @SuppressWarnings("unchecked") with a comment
25. Prefer Lists to arrays
26. Favor generic types: `public class Stack<E>
27. Favor generic methods: `public static <E> Set<E> union(...)
28. Use bounded wildcards to increase flexibility
PECS: producer-extends, consumer-super
For T producers, use `<? extends T>
    can produce T or extensions/subclasses of T
For T consumers, use `<? super T>
    must consume T or super classes of T
    Comparable & Comparator are consumers; always use `Comparable<? super T>

Don't use wildcards in return types.

29. Consider type-safe heterogeneous containers

`String.class` is type `Class<String>`

30. Use enums instead of int constants
31. Use instance fields instead of ordinals
Never derive a value associated with an enum from its ordinal; store instance field instead
32. Use EnumSet instead of bit fields
33. Use EnumMap instead of ordinal indexing
34. Emulate extensible enums for interfaces
35. Use annotations over naming patterns
Example annotation:
```
import java.annotation.*;
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Test {
}
```
To check:
```Class testClass =...
for (Method m : testClass.getDeclaredMethods())
    m.isAnnotationPresent(Test.class)
```

For an annotation type w/ param:
```
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface ExceptionTest {
    Class<? extends Exception> value();
}
```

36. Use @Override on every overriding method.
Can skip for implementations of abstract classes, but probably should still do it anyway.

37. Use marker interfaces to define types
Marker interfaces have no methods but indicate that some class does something.

38. Check params for validity (and doc it)
39. Use defensive copies when needed
    Make the copy, THEN check that the COPY is valid (don't check the originals)
    Avoids time-of-check/time-of-use (TOCTOU) attack.

40. Design methods carefully
Tips:
    1. Choose names carefully
    2. Don't go overboard with convenience methods
    3. Avoid long param lists
    4. For parameter types, favor interfaces
    5. Prefer enums (two-values) to booleans
41. Use overloading judiciously

Overloaded methods are methods with the same name but different parameters.
Overridden methods are declared in superclasses and implemented in subclasses.

Overloading is determined at compile time.
Overridden is determined at runtime.
Selection among overLOADED methods is static.
Selection among overRIDDEN methods is dynamic.

To avoid confusing overloads: never export two overloads with the same # of params.
(Think how Go does this)

42. Use varargs judiciously
static int sum(int... args) {...} // Here args is an array

If you need to have at least one element, use this:
static int sum(int first, int... rest)

43. Prefer empty over null
Use Collection.emptyList

44. Write JavaDocs for all exposed API elements
Each exported class, interface, ctor, method, and field.
First sentence is summary. Don't use the same summary twice.

`{@code your code here}

`<pre>{@code your multi-line code here}</pre>

`{@literal suppresses html, use for < and > and & }

Document type params:

`@param <K> the type of keys
`@param <V> the type of values

Ch8: General Programming (These apply for many other languages!)
45. Minimize scope of local variables
46. Prefer for-each loops
47. Know and use libraries

High:
java.util.*
java.util.conurrent.*

Low:
java.io.*
java.nio.*

48. Avoid float and double if exact answers are required
Use BigDecimal, int, or long for monetary calculations
49. Prefer primitive types to boxed primitives
Unboxing can throw NPE in addition to being inefficient
50. Avoid strings where other types are more appropriate
Use numerical or boolean or enums or aggregate types.
51. Beware performance of string concatenation
More abstract/generic tip: be aware of the time-space complexity/cost of operations.
52. Refer to objects by their interfaces.
Use List instead of ArrayList
53. Prefer interfaces to reflection
You almost never need reflection. If you do, use it minimally.
54. Use JNI judiciously
It's legit to use JNI for platform-specific features not provided by JVM or to
re-use existing C/C++ libraries.
Rarely advisable to use for performance.
55. Optimize judiciously
    1. Don't do it
    2. (For experts) Don't do it yet -- that is, not until you have a perfectly
       clear and unoptimized solution. -M.A. Jackson
    3. If you must, measure measure measure.

Write good programs rather than fast ones.
Avoid design decisions that limit performance: APIs, wire-level protocols, & persistent data formats.

Measure performance before and after each attempted optimization (TDD!)

56. Adhere to generally accepted naming conventions.

Interfaces end in -ible or -able
Boolean methods start with is- or has-
Methods converting type start with to-
Methods that return a view start with as-
Methods that return a primitive value are like intValue
Other common names:
    valueOf, of, getInstance, newInstance, getType and newType

(End of General Programming)

57. Use exceptions only for exceptional conditions
58. Use checked exceptions for recoverable conditions and runtime exceptions for programming errors
All unchecked throwables should subclass RuntimeException
59. Avoid unnecessary use of checked exceptions
If they cannot possibly recover, just use unchecked.
60. Favor the use of standard exceptions
IllegalArgumentException
IllegalStateException
NullPointerException
IndexOutOfBoundsException
ConcurrentModificationException
UnsupportedOperationException
ArithmetricException
NumberFormatException
61. Throw exceptions appropriate to the abstraction
62. Document all exceptions thrown by each method
Use @throws for JavaDoc
Do not use throws keyword to included unchecked exceptions.
63. Include failure-capture information in detail messages.
To capture the failure, the detail message of an exception should contain the values
of all paramters and fields that "contributed" to the exception.
64. Strive for failure atomicity. Shold leave in a state prior to invocation.
65. Don't ignore exceptions. At least add a comment in the catch block.

66. Synchronize access to shared mutable data.
Reading or writing to a variable is atomic, unless it's a long or double.
But without synchronize/synchronized, the new values may not be visible to everyone.
Synchronization is required for reliable communication between threads as well as for mutual exclusion.
Synchronization has no effect unless both read and write are synchronized.


```
private static boolean stopRequested;
private static synchronized void requestStop() { stopRequested = true; }
private static synchronized boolean stopRequested() { return stopRequested;}
```

For a value that only need communication, but not mutex, you can use volatile.
volatile ensures the latest written value is read. BUT it doesn't provide any mutex safety.
private static volatile boolean stopRequested;

Do not use Thread.stop, it's unsafe

Better yet, use AtomicLong
Best yet, use immutable objects and confine mutable data to a single thread.

67. Avoid excessive sync
Do as little work within sync block
Do not call unknown code within sync block

68. Prefer executors and tasks to threads

```
ExcecutorService executor = Executors.newSingleThreadExecutor();
executor.execute(runnable);
executor.shutdown();
```

CachedThreadPools are good for small programs, but not good for production servers.
Use FixedThreadPools instead for prod servers.

Use ScheduledThreadPoolExecutor instead of Timers

69. Prefer concurrency utilities to wait and notify
avoid wait & notify. Use the ConcurrentX collections.

For timing, use System.nanoTime over System.currentTimeMillis

Always use the wait-loop to invoke the wait method; never invoke outside a loop:
```
synchronized (obj) {
    while (condition) obj.wait(); // Releases lock, and reaquires on wakeup
    // do action
}
```

notifyAll should generally be used over notify. If you use notify, ensure liveness.
There's seldom reason to use wait and notify in code.

70. Doc thread safety
Immutable is **always** thread safe, e.g. String, Long, BigInteger
ThreadSafe, mutable but has sufficient sync, e.g. Random & ConcurrentHashMap
Conditionally thread-safe, need external sync. e.g. Collections.synchronized wrappers
Not thread-safe, e.g. ArrayList and HashMap
Thread-hostile, e.g. System.runFinalizersOnExit

71. Use lazy-init judiciously. Prefer normal init.

To break circularity, use sync accessor:
```
private Foo foo;
synchronized Foo getFoo() {
    if (foo == null) foo = newFoo();
    return foo;
}
```
For static-fields, init holder class idiom:
```
private static class FieldHolder {
    static final FieldType field = computeFieldValue();
}
static FieldType getField() { return FieldHolder.field; }
```
For instance fields, use double-check volatile idiom:
```
private volatile FieldType field;
FieldType getField() {
    FieldType result = field;
    if (result == null) { // First check-no locking
        synchronized(this) {
            result = field;
            if (result == null) // Second check, with locking
                field = result = computeFieldValue();
        }
    }
    return result;
}
```
72. Don't depend on the thread scheduler
Threads should not busy-wait.
Thread.yield has no testable semantic.
Thread priorities are the least portable features.

73. Avoid thread groups

74. Implement Serializable judiciously
Locks in class, increases bugs & security holes, extra testing.
Extensible classes should rarely implement Serializable.

---

## 97 Things Every Java Dev...

Tools in the Java bin/

jps: like `ps` for java
    jps gives process id and main class
    jps -l # lists fqn
    jps -m # args to main
    jps -v # jvm args
javap: class disassembler
jmap: summary of JVM's memory space
jhat: displays heap via web page
jstack: shows all stacks
jconsole & jvisualvm: visual alts to cli tools
jshell JVM REPL

---
## Data Structures

Arrays:
```
int[] ints = new int[100];
int[] digs = new int[] {1,2,3};
```
Important Arrays methods: binarySearch fill mismatch setAll
Parallel/Streams: parallelSetAll parallelSort stream
Misc: compare copyOf copyOfRange equals 


Streams, create from:
Collection: `.stream() .parallelStream()`
Array: `Array.stream(T[])`
Objects: `Stream.of(T...)`
Object+iterate function: `Stream.iterate(object, fn)`
Random: `Random.ints()`
range: `IntStream.range(startInclusive, endExclusive) or rangeClosed(startInclusive, endInclusive)`

Back to Collection:` stream.collect(Collectors.toList())`

Top stream methods: distinct filter flatMap map reduce forEach sum min max count sorted
Predicates: allMatch anyMatch noneMatch
Less used ops: concat dropWhile findAny findFirst generate peek skip takeWhile toArray

String:
Top methods: contains endsWith isBlank isEmpty length matches split startsWith strip
Top static methods, String.format join valueOf
Less used: concat indexOf getBytes lines repeat replace replaceAll substring trim toCharArray toUpperCase 

---

Queue/Dequeue/PriorityQueue

```
Queue: <- |||| <- 
     first||||last
      head||||tail
    Exceptions:
        add(e) remove() element() // why not just get() ???
    boolean/nullable:
        offer(e) poll() peek()
```
```
Stack: <-> ||||
    push(e) pop() peek()
```
```
Dequeue:  <-> |||| <->
         first||||last
          head||||tail
Use as a queue:
    Insert: addLast(e) offerLast(e)
    Remove: removeFirst() pollFirst()
    Examine: getFirst() peekFirst()
```
---

Collections static methods:
```
binarySearch(list, key)  (list, key, comp)
copy(listDest, listSrc)
disjoint(coll1, coll2)
emptyList/Map/Set/etc see EMPTY_SET EMPTY_LIST
fill(list, o)           // replace all with o
int frequency(coll, o)
max(coll) (coll, comp)
min(coll) (coll, comp)
List<T> nCopies(n, o)   // new list
reverse(list)           // in place
replaceAll(list, oldVal, newVal)
reverse(list)
reverseOrder() (comp)       // opposite Comparator
rotate(list, n)
shuffle(list)
Set singleton(o)
List singeltonList(o)
Map singletonMap(k,v)
sort(list) (list, comp)
swap(list, i, j)
```

---

Collectors:
```
people.stream().map.collect(Collectors...);
toList()                     // most common
toCollection(TreeSet::new)   // specify a particular collection
summingInt(Employee::getSalary)
partitioningBy(s -> s.getGrade() > 70) // partition is by boolean Gives Map<Boolean, List<Students>>
groupingBy
counting()      // count, equal to reducing(0L, e -> 1L, Long::sum)
```

---

HackerRank Lessons aka TIL

Array to fixed-size list:
`List<Integer> fixed = Arrays.asList(arr);

Array to flexible list:
`List<Integer> flex = new ArrayList<>(Arrays.asList(arr));

List to Object Array:
`T[] arr = list.toArray(new T[0]); // old java uses size instead of 0

Converting arrays, like Integer[] to int[]:
`int[] dst = new int[src.length];
`Arrays.setAll(dst, i -> src[i]); // loops i through src and sets dst

`List<Integer>` to primitive Array:
`int[] arr = list.stream().mapToInt(Integer::intValue).toArray();

Print `List<String>`:
`System.out.println(String.join(",", list));

Print `List<Integer>`:
`list.forEach(System.out::println);

Don't compare Integers with == 
It will work for small numbers, but fail on larger

Generate subsets of a set:
```
for i in 0..(1<<n)
  for j in 0..n
    add if (i & (1 << j) > 0)
```
---

Reading through java.util.concurrent:

Difference between "Synchronized" and "Concurrent" collections is that "Synchronized" are basically stop-the-world/mutex driven, whereas "Concurrent" are thread-safe and performant.

Similarly prefer CopyOnWriteArrayList over a synchronized ArrayList when reads > writes


# BitSet

clear set flip
cardinality: counts set bits

---

## Modern (2022) Java 17

[HN Thread](https://news.ycombinator.com/item?id=30841581)

[Quarkus](https://quarkus.io/) Reactive microservices
[StreamEx](https://github.com/amaembo/streamex) enhances Stream
[OkHttp](https://square.github.io/okhttp/) http client built on [Okio](https://square.github.io/okio/)
[jhipster](https://www.jhipster.tech/) generate front end x backend (Angular/React x Spring/Micronaut/Quarkus/etc) with deployment, CD/CI, and cloud deployment

---

## Java Cookbook notes

Java-specific Software sources:
- https://projects.apache.org/
- https://www.eclipse.org/projects/
- https://spring.io/projects
- https://redhatofficial.github.io/#!/main

More "general" open source:
- https://sourceforge.net/
- https://github.com/
- https://gitlab.com/
- https://search.maven.org/

For x: use y  `(import java.util.*; import java.util.stream.*;)`
simple tokenization: StringTokenizer
continuous int ranges: IntStream.range(start, end) and rangeClosed(start, endInclusive)
non-continuous int ranges: BitSet
random: Math.random();
    r.nextInt(10)   // for 0-9
    1+r.nextInt(10) // for 1-10
    nextGaussian()    // for 0.0-1.0 with "normal distribution" bell curve
crypto random: java.security.SecureRandom


java.util.regex (String s; String regex; Pattern p; Matcher m;)
simple match check: s.matches(regex) or Pattern.matches(regex, s)

"Pattern is a compiled representation of a regular expression"
create a pattern: Pattern p = Pattern.compile(regex)
create a matcher: Matcher m = p.matcher(s)
use the matcher:  boolean b = m.matches()

"Matcher is an engine that performs match operations on a string by interpreting a Pattern"

m.match() // does the whole string match regex?
m.find()  // does any part of the string match regex?

After doing match or find, get the actual matching text groups with .group(i)
group() or group(0) returns the whole matching part
group(i) returns the capture group i
OR if you need the positions of a group, use start(i) end(i)

Replace matches with .replace(newString))

Design Patterns: Command, Decorator, Factory method, Iterator, MVC, Proxy, Singleton

Stream (sequence):
Passing methods: distinct() filter() limit() map() peek() sorted() unsorted()
Terminating: collect() count() findFirst() max() min() reduce() sum()

### I/O
Use new Files and Path class: java.nio.file.Files Path
Old File class: java.io.File // consider it deprecated
InputStream/OutputStream traditional way to read write from files
Use Reader and Writer when dealing with text or characters (and not direct bytes)

Get lines of a file: Files::lines() to get a `Stream<String>`
    Files.lines(Path.of("notes.txt")).forEach(System.out::println)
Get all lines of a file all in memory: `List<String> Files.readAllLines(Path)`
Get all bytes of a file all in memory: `byte[] Files.readAllBytes(Path)`
Get buffered: Files.newBufferedReader() newBufferedWriter

Old way: BufferedReader is = new BufferedReader(new FileReader(fileName))
while((line = is.readLine()) != null) {
    println(is)
}

java.util.zip.ZipFile lets you work with zip and jar files

To get files packaged within your source code, use getClass().getResource("file.txt")

simple/rigid/limited....................complex/flexible/powerful
StringTokenizer         Scanner         regex

```
try (Scanner sc = new Scanner(s)) {
    int dayOfMonth = sc.nextInt();
    String month = sc.next();
    int year = sc.nextInt();
}
```

Scan has "hasX" and "nextX" methods for all core types (boolean, int, float, etc) and BigInteger and BigDecimal.
has() and hasNext() each either take a string or regex Pattern

Files and Path:
Path is a string that is potentially a Files object
```
    Path p = Path.of(s);
    Path created = Files.createFile(p);
```
OR
```
    Path createdFolder = Files.createDirectory(p);
```

Files can be renamed, moved, deleted, temp files createTempFile()
For temp files, probably want to call tmp.toFile().deleteOnExit()
List files: Files.list(Path.of(".")).forEach(println)

java.nio.file.FileWatchService to watch for file changes
```
WatchService watcher = FileSystems.getDefault().newWatchService()
path.register(watcher, new Kind<?>[] {ENTRY_CREATE, ENTRY_MODIFY});
while (!done) {
    WatchKey key = watcher.take();
    for (val e : key.pollEvents()) {
        // e.kind() e.context()
    }
}
```
Safe saving files (this applies to nearly any language tbh)
1. Create temp file to write to on the same disk, with deleteOnExit(true)
2. Write to #1
3. Delete backup file from #4 (if exists, first time it won't)
4. Rename previous file to *.bak
5. Rename temp file (from #1 & #2) to the save file.

1. touch file.tmp
2. write> file.tmp
3. rm file.bk
4. mv file file.bk
5. mv file.tmp file

### Network Client
Java 11 has java.net.http.HttpClient (old stuff is in java.net, like URLConnection)

```
HttpClient client = HttpClient.newBuilder()...
HttpRequest req = HttpRequest.newBuilder(URI.create(url + URLEncoder.encode(keyword)))
    .header(key, val)
    .GET()
    .build();
```

Sync
```
HttpResponse<String> res = client.send(req, BodyHandlers.ofString())
if (resp.statusCode() == 200) {
    println(resp.body())
}
```

Async
```
client.sendAsync(req, BodyHandlers.ofString())
    .thenApply(HttpResponse::body)
    .thenAccept(println)
    .join()
```

TCP/IP Sockets, java.net.Socket
```
try(Socket sock = new Socket("localhost", 8080)) {
    println("connected")
}
```

Internet addresses: java.net.InetAddress
```
InetAddress.getByName(hostname).getHostAddress()
InetAddress.getByName(ipNumber).getHostName()
InetAddress.getLocalHost()
```

Use Inet6Address for IPv6

Reading and writing text to sockets:
```
new BufferedReader(new InputStreamReader(sock.getInputStream()))
new PrintWriter(sock.getOutputStream(), /*autoflush*/ true);

```