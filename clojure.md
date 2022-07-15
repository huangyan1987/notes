TODO:
Notes (from notebook):

only false & nil are falsy
```
$ lein new <proj> ; cd proj
$ lein repl
```

Help!
doc         print documentation
apropos     find matching fns
find-doc    greps docs
dir         lists fns
source      print source def
meta        print metadata
; faq: https://clojure.org/guides/faq

"strings"
:keywords   ; lightweight, constant string-like. Cached & interned.
'symbols    ; name variables & functions

; This is a comment. Below is a function (fn) call
(reduce f coll) 
(reduce f val coll)

inc     increment or ++
type    get the :type metadata or class?
=       equals (strict)
==      loose equals, good for numbers 3 & 3.0
str     to string, also joins/concats

Lists: `'(1 2 3) = (list 1 2 3) = (cons 1 '(2 3))`
Lists conj/add to the front/head
(conj '(1 2) 0) => (0 1 2)
(nth '(10 20 30) 2) => 30
('(10 20 30) 2) => 30

Vectors: `[1 2 3] = (vector 1 2 3) = (vec (list 1 2 3))`
Vectors conj/add at the end/tail
`(conj [1 2] 3) => [1 2 3]`
`subvec [vec end]`            get inner/sub vec, from 0 to `end` 
`subvec [vec start end]`      get inner/sub vec, from `start` to `end`

(xs n)     gets nth elem from xs (just like like nth)
first   second      return obvious!
rest        everything but first OR '() "RESt always REturns a Sequene"
next        everything but first OR nil
last        last element OR nil
count       # of elems
concat      merges seqs
into [to from]              puts elems from `from` into `to`
sort        !
conj        add (where deps on coll)
disj        remove
contains?   true if elem in set
`(<set> <elem>)  same as contains?. use set a filter predicate`


Sets: #{1 2 3} = (set [1 2 3])

Keywords are like :this
Keywords globally evaluate exactly only to itself and allow for fast self evaluation/lookup.
(identical? :a :a) => true
Keywords are NOT symbols. Keyword
::this when namespace qualified

Symbols are like 'this (when quoted) or like `(fn [this] this)`
Symbols are identifiers that refer to something else, like params, functions, classes, vars etc.
(identical? 'a 'a) => false

Maps: {:name "mittens" :weight 9 :color black} = (hash-map :name "mittens" ...)
get     (get [map key default])
assoc   (assoc [map key value]) associate/add key to map
dissoc  dissociate, remove key from map
merge   merges two maps
merge-with  merges two maps using a fn, usually + or conj
keys    keys, usually need to sort
vals    values

let: (let [var value ...])
(let [cats 5] (str "I have " cats " cats."))
Destructuring: works with fn, let, and more...
`(fn [[a b c]] (str c b a))`                                  ; given a vector of 3 elems, assigns them variables a b c
`(let [[a & rst] xs] ...)`                                    ; puts the rest into rst as a seq
`(let [[first second] :as all] some-var] ...)`                ; renames some-var as all
`(let [{height :height weight :weight age :age} person] ...)` ; destruct by keyword
`(let [{:keys [height weight age]} person] ...)`              ; by keys, more succinctly

fn: `(fn [x] (+ x 1)) = #(+ % 1)`
%1 or % for first arg. %2 for second, etc.

def: (def cats 5) ; cats = 5
(type #'scratch.core/cats) => clojure.lang.Var
(type #'cats)              => clojure.lang.Var
'cats => cats ; the symbol
(resolve 'cats) => #scratch.core/cats ; the var
`(eval 'inc) => #object[Function]` ; the value
(eval 'cats) => 5                ; the value

defn: `(defn <name> [args] <body>)`
`(def half (fn [number] (/ number 2)))`
`(defn half [number] (/ number))`
Multiple arity:
`(defn half ([] 1/2)
           ([x] (/ x 2)))`
Use & for var-args in a list:
`(defn varargs [x y & more] ...)`
Docs are just a string put after the fn name
```
(defn launch 
  "blah blah ..."
  [x y] ...)
```

defn-   private
meta    to get metadata, (meta #'launch)
supers  get supertypes
fn?     is a function?
type    get type
class   get class

Naming conventions!
f g h       function
n           integer, usually size/length/count
i           index
x y z       general variables, numbers
xs ys zs    sequence
m           map, matcher
s           string
re          regular expression
c coll      collection
p pred      predicate
& more      varadic arg
xf          xform, transducer
e expr      expression
b body      macro body
bind binding macro binding vector
a           agent
c           class
form keys name options stream val

Core functions & seqs:
if      (if TEST THEN ELSE)
map     (map FN SEQS), if given multiple seqs, takes one elem from each at a time ; see map-indexed below
iterate     lazy sequence of x, (f x), (f (f x)), ...
take        returns first N; (take 10 (iterate inc 0)) => (0 1 2...9). Use w/ infinite seqs
repeat      [x] => infinite xs or [n x] => xs, n times
repeatedly  like repeat, but returns inf seq
range   `n => [0,n)`
        `n m => [n, m)`
        `n m s => [n, m)` steps of s
cycle   repeat a sequence (take 5 (cycle [1 2])) => (1 2 1 2 1)
map-indexed     `(map-index <FN INDEX ELEM> SEQ)`
interleave      riffle together (interleave [:a :b :c] [1 2 3]) => (:a 1 :b 2 :c 3)
reverse         ! to flip a str: (apply str (reverse "foo"))
seq     to-sequence, can breakup a str
shuffle     randomize sequence
drop        remove first n elements. See take-last & drop-last for end ops
take-while drop-while PREDICATE SEQ
split-at        to split at an index
split-with      to split using a function
filter FN SEQ       keeps elems that (fn e) is true
remove FN SEQ       opposite, removes elems that (fn e) is true (keeps falses)
partition N SEQ     into groups of exactly n. partition-all for leftovers.
partition-by FN SEQ     into groups when the result of FN changes
frequencies SEQ         map of elems to their frequencies/count
group-by FN SEQ        map of keys to vectors, keys are the result of the fn
reduce                  reduce FN has args [a c] where a=accumulator c=current.
       FN SEQ           first call is (FN (first SEQ) (second SEQ))
       FN INIT SEQ      first call is (FN init (first SEQ)) 
reductions      reduce w/ all intermediate steps
into        use to build lists/seqs. basically (reduce conj ...)
comp F G    compose, creates f . g or f(g(x)), functions applied right to left
memoize     creates memoized version of fn
update-in assoc-in get-in for deep access:
  (update-in {:a {:b 3}} [:a :b] inc) => {:a {:b 4}}
  (assoc-in {} [:cookie :monster :vocals] "Fintroll")
  => {:cookie {:monster {:vocals "Fintroll"}}}
pmap    parallel map
mapv    returns vector
dorun   realizes a lazy seq but returns nil
partial FN ARGS     given a fn and some (but not enough) args, gives a partial fn
juxt    FNS         given fns, applies each one and returns a vector with the output of each one:
    `((juxt filter remove) odd? [1 2 3 4 5]) => [[1 3 5] [2 4]]`

Macros:
defmacro `syntax quote ~unquote ~@unquote splice
(defmacros ignore
  "Cancels evaluation of an expansion, returns nil"
  [expr] nil)
(defmacro rev [fun & args] (cons fun (reverse args)))
(macroexpand '(rev str "hi" (+ 1 2)) => (str (+ 1 2) "hi")
(eval ...) => "3hi"
`syntax quote stops evaluation but can be UNquoted with ~ and ~@
(let [x 2] `(inc ~x)) => (inc 2)
~x means to substitute in the value for x
~@ explodes (looks like a bomb?) a list into multiple expressions
`(foo ~[1 2 3]) => (foo [1 2 3])
`(foo ~@[1 2 3]) => (foo 1 2 3)
gensym      generate a new unique symbol
appending # forces a single symbol within a macro
`(let [x# 2] x#) => (let [x_339 2] x_339)
~'foo to override local symbols aka symbol capture
(read-string "(+ 1 2)") => (+ 1 2)
Symbol resolution order:
1. Special form?
2. Local binding?
3. Namespace mapping via def?
4. Throw exception!
Special forms: ' if def let loop fn do recur
Reader macros, like @ ;
code->Reader->Macro Expander -> Evaluator
macroexpand     use to see what macro expands to
'(+ 1 2) = (quote (+ 1 2)) => (+ 1 2)                         ; single quote
`(+ 1 2) => (clojure.core/+ 1 2)            ; syntax quote (backtick)
`(+ 1 ~(inc 1)) => (clojure.core/+ 1 2)     ; ~ is UNquote, causes eval
Use `backtick to quote everything except YOUR variables, which you ~unquote
`(+ ~(list 1 2 3)) => (clojure.core/+ (1 2 3))  ; uh oh, all in a list!
`(+ ~@(list 1 2 3)) => (clojure.core/+ 1 2 3))  ; ~@ is unquote-splice
~@ looks like a bomb that blows up a list. It's like apply for macros
(let [macro-message (gensym 'message)] ...)     ; generate symbol to avoid conflict
OR
(let [message# "hello"] message#)               ; auto-gensym
Beware: double eval; use let bindings.
Beware: putting yourself in a "macro corner"

Control flow:
prn     print & return nil
if      (if TEST THEN ELSE), see if-not
when    (when TEST EXPRS) when true, executes all experssions
do      (do EXPRS) executes multiple expressions, like a block
if-let, when-let combines if & let, when & let
cond    pairs predicates and expressions, like if-else in other langs
condp   condition with predicate, like switch-case in other langs
case    like (condp = ...)
recur   for tail-call optimization

Laziness:
lazy-seq    macro to defer evaluation. See: lazy-cat
delay       delays eval until: deref or @

for     (for [x (range 10)] (- x)) => (0 -1 ... -9)
for goes through all combinations:
(for [x [1 2 3] y [:a :b]] [x y]) => ([1 :a] [1 :b] [2 :a] [2 :b] ...)
use :when to establish conditions
(for [x (range 5) y (range 5) :when (and (even? x) (odd? y))] [x y])

Threading macros:
(reduce + (filter odd? (range 10)))       ; reads in-out or left-to-right
(->> (range 10) (filter odd?) (reduce +)) ; reads left to right
->>     flattens & reverses a nested chain of operations
->      inserts each form as the first arg of the next
(-> {:a :alpha} (assoc :b :beta) (assoc :d :delta))
  (assoc (assoc {:a :alpha} :b :beta) :d :delta)
as->    more flexible threading
(as-> [1 2 3] input ; input becomes the 'as'
  (map inc input)   ; here input is at end arg
  (nth input 2)     ; now it's the first arg
  (conj [4 5 6] input [8 9])) ; and middle
cond-> cond->>      thread through each form where test expr is true
(cond-> 1           ; start with 1
  true inc          ; now it's 2, easy
  false (/ 4 2)     ; still 2, false so this is skipped
  (= :a :a) (* 3))  ; now 6
=> 6
some-> some->>      thread while any returns nil
(some-> {:x 0 :y 10}    ; start with this map
    :y                  ; gets :y val, so => 10
    (- 2))               ; 10 -> (- 10 2) -> 8
=> 8

@   alias for deref (deref x) = @x
future      evaluates on a new parallel thread, starts immediately. deref blocks!
delay       similar to future, but not started until force is called on them
    force   kicks off evaluation of a delay
promise     pending a value (like a gift!), put a value with deliver. If no value, deref will block forever!
    deliver     delivers/puts a value into a promise
(def my-promise (promise))
(deliver my-promise (+ 1 2)) ; puts 3 into promise
@my-promise = (deref my-promise) => 3
(deref my-promise 100 "timed-out!") ; deref with a timeout & fallback
***Delays are lazy, futures are parallel, and promises are concurrent.***

Reference types: atoms, refs, & vars

Atom: (def xs (atom #{})); deref or @ to get value
Synchronous, independent state
Atoms should be used for any immutable state
Use if you have a single, independent identity, like a cache
swap! ATOM FN   like (swap! x inc). see: reset! to just set
add-watch       adds observers to the value updates
:validator      adds validators to the value updates

Refs: used for multi-identity updates. Atomic, consistent & isolated using STM
Synchronous, coordinated state
Use to coordinate sync events
Only use refs if multiple parts of your state are dependent
(def x (ref 0)) ; deref or @x
dosync      used to do updates to refs together
ref-set     to set value (like atom's reset!)
alter       to update (like atom's swap!), safe.
commute     like alter if there's no order requirement, less safe for speed
ensure      inside a dosync, use ensure instead of deref

Vars are created with def. Thread-local var bindings
Use Vars onlyif absolutely necessary, like parsing state machine
alter-var-root      permanently change the root value of a var
with-redefs         temp change values

Agents: async, independent state
Use to get concurrency when you don't need coordination
send        for CPU intensive tasks
send-off    for I/O intensive tasks

Symbol: immutable, transparent reads, lexical scope
Var: mutable, transparent reads, unrestricted updates, global/dynamic scope
Delay: mutable, blocking reads, Once only updates, lazy eval
Future: mutable, blocking reads, once only updates, parallel eval
Promise: mutable, blocking reads, once only updates, concurrent eval
Atom: mutable, nonblocking reads, linerializable
Ref: mutable, nonblocking reads, serializable

Concurrency:
(highest) Agents: use state & execution on managed thread pools
pmap/pvalues/pcalls
Futures & Promises (careful not to deadlock w/ Promises)
(lowest) Java threads

core.async:
```
(def echo-chan (chan))  ; creates a channel
(go (println (<! echo-chan)))   ; defines the channel action
(>!! echo-chan "boom!")         ; puts a message on the channel
<!      take from channel
>!      put into channel
The arrow points where the message goes
! parks, and !! blocks
Inside a go block, you can use >! <!
Outside a go block, you MUST use >!! <!!
(def echo-buffer (chan 2))      ; channel with a buffer size of 2
thread      a lot like a future, but returns a channel
(let [t (thread "boo")] (<!! t))
alts! alts!!    make a choice between channels
```

```
$ lein new PROJ
$ lein new app PROJ
```
    doc             documentation
    project.clj     name, versioning deps, license
    resources       images, etc.
    src             code
    test            tests
    target          compiled code, built packages
`$ lein repl`
In repl, prev value is `*1`, `*2` for the one before that, etc.
If having issues, clear lein and maven cache: `$ rm -rf ~/.lein ~/.m2`

File system     Source code
slash /         period .
underscore _    hyphen -

Namespaces:
**Do NOT use :use**
(ns scratch.core)   namespace declaration
(ns user (:require [scratch.core]))         ; gives access but needs FQNames
(ns user (:require [scratch.core :as c]))   ; with alias
(ns user (:require [scratch.core :refer [foo]]))   ; pulls in foo
(ns user (:require [scratch.core :refer :all]))     ; like * import
(ns-name *ns*)      ; returns current ns
inc => clojure.core$inc
'inc => inc
(eval 'inc) => inc
(def foo "abc") => #'scratch.core/foo ; interning a var
(ns-interns *ns*)   ; get map of interns
(create-ns 'val.new-ns)
(ns-name \*1) => val.new-ns
(in-ns 'val.new-ns) ; creates (if needed) and switches to ns
(refer 'val.new-ns :only ['bries]) ; only bring in bries
(refer 'val.new-ns :exclude ['bries]) ; all except bries
(refer 'val.new-ns :rename {'bries 'stinky}) ; rename symbol
(alias NEW OLD)
  (alias 'tax 'cheese.taxonomy)
(ns NS-NAME)
filename:                               source:
src/the_divine_cheese_code/core.clj <-> the-divine-cheese-code.core
(require 'cheese.vis.svg) ; pulls in and evals (if needed)
(refer 'cheese.vis.svg) ; allows direct usage
(use 'cheese.vis.svg) ; equiv?
(use [full.ns.old :as new])
(ns foo.core
  (:refer-clojure :exclude [println])) ; now to use println have to use clojure.core/println
; equiv:
(in-ns 'foo.core)
(refer 'clojure.core :exclude ['println])
Other:
  :require      GOOD
  :use          BAD
  :import       GOOD
  :load         BAD
  :gen-class    GOOD
:require uses :as, :refer, :refer :all, :rename, :reload, :verbose

; This is what it looks like in source files:
```
(ns foo.bar (:require [clojure.string :as cs :refer [join]]
                      [clojure.data.zip :rename {oldx newx
                                                 oldy newy}]))
(:import [java.util ArrayList HashMap])
```

See https://8thlight.com/blog/colin-jones/2010/12/05/clojure-libs-and-namespaces-require-use-import-and-ns.html


⭐️**To reload @ REPL**:
(require 'your.ns :reload-all)

To reset REPL utils, like doc (but in general, don't use use!)
(use 'clojure.repl)

Tests: clojure.tests
(deftest NAME
  (testing SUBTESTNAME
    (is (= 0 1))))
$ lein test


More Functions/Misc:
apply FN SEQ    basically "expands" the seq to params: (apply max [1 2 3]) = (max 1 2 3)
flatten         returns nested leaves (1 (2) 3) => (1 2 3)
mapcat          maps fn to seq, then concats all results: equiv to (apply concat (apply map ...))

Example, these are the same-ish:
    (interleave a b)
    (mapcat list a b)
    (apply concat (map list a b))
keep            keeps elems of seq that are non-nil
keep-indexed    likekeep but uses index

cons X SEQ      construct new list with x as head: x -> seq...
conj SEQ X      conjoin, new  coll with x added *efficiently*. head on lists, tail on vectors
    (conj '(1 2 3) 9) => (9 1 2 3)
    (conj [1 2 3] 9) => [1 2 3 9]
concat XS YS    makes seq of XS followed by YS

Good Styles:
; For simple oneline fns
(defn good [x] (bar x))
; For small fns that don't need doc
(defn good [x]          
  (bar x))
; general good style for fn with doc
(defn good
  "docs here"
  [x]
  (bar x))

Prefer:
this            to      that
map/reduce              loop/recur
(when (seq s) ...)      (when-not (empty? s) ...)
       ^ "nil punning" because nil is falsy
vec x                   into [] x
when                    (if (do ...))
if-let                  (let (if ...))
when-let                (let (when ...))
if-not                  (if (not ...))
when-not                (if-not (do ...))
(< 5 x 10)              (and (> x 5) (< x 10))
(complement pred?)      #(not (pred? %))
(comp f g)              #(f (y %))
pos? neg? zero?         (> x 0) (< x 0) (= x 0)
list*                   (cons x (cons y (cons ...)))
x->y                    x-to-y  ; when naming fns that turn X into Y
swap!                   reset!
with-open               finally
fn                      macros ; macros good for syntatic sugar

Avoid:
lists, index-based coll access, transient colls, java colls, java arrays
ref-set

Good:
Use keywords "as fn" to get map values: (:name m)
Use collections "as fns": (filter #{\a \e \i \o \u} "hello")
    Vectors are fns like int->value, maps are key->value, sets are key->boolean

;;;; Headings
;;; top-level comments
;; code fragment
; space after semi-colon. Full sentences, with period.
Use: TODO FIXME OPTIMIZE HACK REVIEW
Docstrings: first line is summary, `args` in backticks
Tests: (ns prj.thing-test) in test/prj/thing_test.clj file

Multimethods & polymorphism:
(defmulti area :shape)  ; shape is what the methods key off of
(defmethod area :circle [{:keys [r]}] (* Math/PI r r))
(defmethod area :square [{keys [w h]}] (* w h))
(defmethod area :default [shape] (throw (Exception. (str "no area" ...))))
(area {:shape :circle :r 10}) => 314....

Protocols (like in Obj-C or interfaces in Java):
- Mostly functions where the first arg is this/self
- Best protocols have few methods; one is best
- Cannot use destructuring
(defprotocol Duck "some docs"
  (say [this s] "method docs")
  (quack [this] [this s] "quack docs"))
(deftype RubberDuck [data] Duck     ; RubberDuck implements Duck
  (say [this s] (println data s))
  (quack [this] (println (class this)))
  (quack [this s] (println s)))
(let [d (RubberDuck. "data!")]
  (.say d "param!") ; => "data!param!"
  (.quack d)        ; => "RubberDuck"
  (.quack d "squeak!"))     ; "sequak!"

Extend-Protocol: add functionality, even to existing Java classes!
extends protocol to class(es), even to nil!
(extend-protocol Yeller String
  (yell [this param] (println this param "!!!")))

extend-type     for extending type to protocol(s)

deftype         low-level, mutable types that implement a protocol
    (deftype Pair [left right])
defrecord       immutable, persistent, batteries-included map, for domain classes
    (defrecord Person [first last bday])
reify           creates an anon type, one-off instance that implements a protocol


Java Interop:
(ns myns (:import java.io.File))
(ns myns (:import [java.io FileInputStream FileOutputStream]))
;(T. args) or (new File args) is like new T(args) in java
(File. "todo.txt") ; better
(new File "todo.txt") ; worse
; Remember, functions go on the left!
(. obj method args)             ; general dot form (bad)
(.method obj args)              ; better method invocation, equiv to obj.someMethod(args)
(Class/method args)             ; static method invocation, equiv to Class.method(args)
Chain method calls with ..
(.. (File. "file.txt") getAbsolutePath getBytes)
like:
(.getBytes (.getAbsolutePath (File "file.txt")))
(new File("file.txt")).getAbsolutePath().getBytes()
doto        call multiple methods on an object

I/O:
slurp           read from file
spit            write to file
pr prn          print for reader
print println   print for people
printf          print formatted
print-table     special
pr-str prn-str print-str    to string
format          like printf for to string

Metadata: ^{:key1 val1 :key2 val2}
^Type       ^{:tag Type}
^:Key       ^{:key true}
common:
^:dynamic ^:private ^:doc ^:const
(def ^:private ^String my-fn->str ...)
(def ^:dynamic *dyn-var* val)


(+ IntelliJ Cursive)

Run/Debug Config:
Clojure REPL > local REPL

Eval inline with Cmd+Shift+P

Error: :namespace-not-found
=> need to eval the ns first

Error: Unable to resolve symbol: doc in this context
=> need to require the REPL ns again: (use 'clojure.repl)

Keyboard shortcuts
Show params             Cmd-P               // minimalist help
Quick doc               F1                  // maximalist help
Select more/less        Alt-Up/Down
Go to REPL              Cmd-\               // Esc to go back to editor
Load file in REPL       Cmd-Shift-L
Send form to REPL       Cmd-Shift-P
Wrap with ([{""}])      Cmd-([{"
Splice/Unwrap           Alt-S
Barf/Slurp right/fwd    Cmd-Shift-J/K       // moves right-side paren
Slurp/Barf left/back    Ctrl-Shift-J/K      // moves left-side paren
Move form up/down       Cmd-Shift-Up/Down   // put cursor at the beg/end of form

Less common, but good to know about:
Split                   Ctrl-Alt-S
Join                    Ctrl-Alt-J
Thread                  Ctrl-Alt-,
Unthread                Ctrl-Alt-.


(+ Clojure VSCode Calva)

Basic VS Code Shortcuts
Show doc            Cmd+Hover or Cmd+K Cmd+I
Show param hints    Cmd+Shift+Space
Jump to match       Cmd+Shift+\       // Also jumps to end first
Rename              F2
Refactor            Ctrl+Shift+R

Paredit             https://calva.io/paredit/
Chords, press Ctrl+Alt+C then press...
Re/Load Current File & Deps     Enter // VERY IMPORTANT
Instrument for debugging        I     // see https://calva.io/debugger/

REPL
Eval curr           Ctrl+Enter        // put cursor on wrapping parens
Eval curr up to |   Ctrl+Alt+Enter    // very useful for threading ->
Eval wrapping form  Shift+Ctrl+Enter
Eval outer form     Alt+Enter         // eval top-level
Eval outer to |     Shift+Alt+Enter   // bals parens
Eval file to |      Ct+S+A+Enter
Eval to comment     Ct+A+C C

EDITING
Force delete        Alt+Backspace     // Overrides paredit protection
Wrap (parens)       Ctrl+Alt+Shift+P          // S for Square [], Curlies {}, Quotes ""
Rewrap              Ctrl+Alt+R Ctrl+Alt+P or S C Q
Cursor next sexp    Alt+Left/Right            // will not leave list
Drag sexp           Alt+Up/Down
Kill back/forward   Ctrl+Backspace/Delete     // deletes from cursor within sexp
Expand selection    Ctrl+W
Shrink selection    Ctrl+Shift+W
Delete sexp         Ctrl+Alt+Backspace
Barf/Slurp forward  Ctrl+Alt+Left/Right        // moves right-side paren
" " backward        Shift+Ctrl+Alt+Left/Right  // moves left-side paren
Slice               Ctrl+Alt+S                 // removes enclosing parens
Split               Ctrl+Shift+S               // [1 _ 2] => [1] [2]
Join                Ctrl+Shift+J               // [1] _ [2] => [1 2]
Transpose           Ctrl+Alt+T

Commands to know about (but no good shortcut):
Interrupt Running Evaluations     // stops infinite loops

## Learning
http://www.4clojure.com/
http://clojurescriptkoans.com/
https://www.codewars.com/?language=clojure
https://github.com/clojurecademy/clojurecademy
https://www.braveclojure.com/clojure-for-the-brave-and-true/


## References
https://clojure.org/ - the mothership
https://clojure.org/api/cheatsheet - cheatsheet
https://leiningen.org/ - "the easiest way to use Clojure" must-have
https://boot-clj.com/ - the other build tool
https://calva.io/commands-top10/ - Calva, VS Code plugin


## Blogs
https://grison.me/2020/04/04/starting-with-clojure/
setup with IntelliJ & VS Code, along with links to other getting-started resources
https://yogthos.net/ClojureDistilled.html - Clojure Distilled
https://8thlight.com/blog/colin-jones/2010/12/05/clojure-libs-and-namespaces-require-use-import-and-ns.html - Explains ns, require, import, etc

## Deps
https://clojure.github.io/index.html - Clojure contribs
https://github.com/tonsky/uberdeps - packs into an uberjar (part of lein)
Luminus - clojure web dev made simple (?)
https://github.com/clojure/math.combinatorics/ - combinations, permutations, etc

Strings:
string/
  join [xs] [s xs]
  reverse
  index-of
  blank?
