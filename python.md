# Step 0: Know your version

python --version # was returning 2.7.16, comes default with macOS
OR
python -V

# Installing Python 3 with pyenv

pyenv: https://github.com/pyenv/pyenv

brew install pyenv
pyenv init # MUST follow instructions! copy text to ~/.profile ~/.zprofile AND ~/.zshrc
Then LOG OUT and back in. **Just do it.**

tldr pyenv              # for help

pyenv versions          # lists the versions installed
pyenv install 3.9.7     # or whatever's latest
pyenv global 3.9.7      # switch base version to this

---

## Python Pocket Reference 5th Ed (ignoring Python 2.x entirely)

# python command

-v      verbose
-V      version
-c      execute command, -c 'print("hello")'
-m      execute module, -m pdb hi.py

python -m pydoc -b # pulls up documentation browser

Get help: help dir

# Python basics

dynamic typing, variables don't need declaring, just assign

GC uses reference counting (CPython)

## Syntax

Some of the trickier syntaxes

lambda args: body

A if X else B
 
The usual: < <= > >= == != | ^ & << >> + - * % / ~
X < Y < Z for chaining comparisons
* for repeating, like "!" * 3
// for floor
** for power
The wordy: or and not
X in Y
X not in Y
X is Y      for testing if same object
X is not Y
X[start:end:step]  for slicing, equiv to X[slice(start, end, step)]
x, y    tuple, gives (x, y)
(...) tuple
[...] list, list comprehension
{...} dictionary, set
... elipses can literally be used as a placeholder
pass can also be used as a placeholder

# Operations

len     for length, size, count
iter    for iterator
Math: min max abs int float divmod pow

for X in S:        for-in loop
[exp for X in S]   list comprehension
map(F, S)          function mapping

## for overloading
in      __contains__ __iter__ __getitem__
+       __add__
*       __mul__
Can lookup others

## Slices/Sequences

```
s[i]        basic
s[-1]       last, equiv to s[len(s)-1]
s[1:3]      from index 1 to 3, 3-1 = 2 items
s[1:]       from index 1 to end
s[:-1]      all but last
s[:]        shallow copy
s[::2]      every other
s[::-1]     reversed
```
Slice assignment is like delete then insert where deleted:
```
s[i:j]  does not need to match size
s[i:j:k] DOES need to match size
```

# Numbers

int has unlimited precision
floats are C doubles
0xFF 0b1111

decimal.Decimal('1.33')
fractions.Fraction(4,3)

str to int:
    int(i,base)
    ord(s)          from char to ascii value

int to str:
    str             obviously
    hex oct bin     based on format
    chr             to char from ascii value

# Importing

from x import X
from decimal import Decimal

# Strings

str     immutable strings, ASCII & Unicode
bytes   immutable bytes, used for byte values of binary data
bytearray   mutable variant of bytes

Typical "" or ''
"""multi-line"""
"Adjacent" "concats"
r'raw strings good for regex'
b'byte string literal'
u'unicode literal'

## String formats

f"{i}"              newer format-strings aka f-strings
f"{d:.3}"           can specify formatting
"%d".format(i)      just like Java
"%d" % (i)          modulo format, shorthand for .format

## String methods

Get all methods with (also works great with other types!)
    sorted(x for x in dir(str) if not x.startswith('__'))

s.capitalize()
s.count(sub)
s.endswith(suffix)
s.find(sub)
s.index(sub)
s.join(iter)
s.lower()
s.partition(sep) => (before, sep, after)
s.replace(old, new)
s.split() .split(sep)
s.splitlines()
s.startswith(prefix)
s.strip()
s.upper()
right-hand: rfind rindex...


# Lists

Lists are mutable sequences, like ArrayLists in Java

```
[]                          empty
[1,2]                       literal
list('spam')                ctor, creates ['s', 'p', 'a', 'm']
[x ** 2 for x in range(9)]  list comprehension
```

```
l.append(x)                 adds at end
l.extend(iter)              adds all at end
l[-1:] = xs                 also extends
l[:0] = xs                  prepends
```

```
l.sort(key=None, reverse=False)     in-place sort
l.reverse()
l.index(x)      index of x, raises if missing
l.insert(i, x)
l.count(x)
l.remove(x)     removes first x, raises if not found
del l[l.index(x)]   similar
l.clear()       removes all
l.copy()        shallow copy
```

## List comprehension

```
[expr for x in xs]
[expr for x in xs if cond]
[xy for x in xs for y in ys]
```

```
[x + y for x in range(0,100,10) for y in range(10)]
list(range(100))    obviously much better
```

## Iterable/Iterator

Iterable: object with __iter__ method, which returns an Iterator
Iterator: object with __next__ method, raises StopIteration when done

iter(i) calls i.__iter__()
next(i) calls i.__next__()

__getitem__ is used as fallback if __next__ isn't provided

## ALL the comprehensions

List comp:
`[x * x for x in range(10)]`
=> [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

Generator comp (like a lazy list):
(x * x for x in range(10))
=> `<generator object <genexpr> at 0x100eef510>`

Set comp:
{x * x for x in range(10)}
=> {0, 1, 64, 4, 36, 9, 16, 49, 81, 25}

Dict comp:
{x: x * x for x in range(10)}
=> {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6: 36, 7: 49, 8: 64, 9: 81}

# Dictionaries

Dynamically expanding hash tables

dict() keys() values() items() in
clear() copy()

for k in d:         Don't need to specify d.keys()

for k,v in d.items():
    print(f"{k}: {v}")

{}      empty
{'spam': 2, 'eggs': 3}
D = {'info': {42: 1, type(''): 2}, 'spam': []}
D['info'][42]       access

## More dict methods

d.update(d2)        Merges d2 into d
d.get(k, default)   get with default
d.setdefault(k, default)    like get, but also sets if missing

# Tuples

()      empty
(1,)    single tuple
(1,2,3,4)   multiple
t = tuple('spam')
t[0] => 's'

t.count(x)

# Files

## Reading

f = open(filename, 'r')     or 'rb' for binary
f.read()    whole file, as a string
r.readline()
r.readlines()
for line in f:

[line.strip() for line in open(filename, 'r')]

## Writing
'w' opens for writing BUT truncates the file!
'a' for appending



f = open(filename, 'w')     or 'wb' for binary
f.write(s)
f.writelines(xs)            

## ReadWrite

'w+' for reading and writing
f.tell() to give position
f.seek() to move position
f.flush() 

## Auto-Closing with `with`

with open(...) as f:

# Sets

set()       empty, no literal
set('spam')
=> {'p', 'm', 'a', 's'}

## Set operations

```
frozenset
in          use to check presence, x in s
- difference
| union
& intersection
<= issubset
>= issuperset
< >             tests "true" subset and superset
^ symmetricdifference       gives set of elements in either but not both
|= update       adds all
add remove discard pop clear
len(s)
for x in s
x.copy()
```

# bool

Boolean is called bool, subclass of int but prints better
True False

# Sequence assignment

a, b = 1, 2
=> a = 1 b = 2

a, *b = list(range(4))
a, b
=> (0, [1, 2, 3])

In short, on the "left" * collects; on the right, it expands
```
* collects/expands seqs
** collects/expands dicts
```
# Decorators

@decorators         # similar to Java annotations
def foo()           # approximately: foo = decorator(foo)

# Scope

Assignment to a new variable name is enough to declare it, but it's at the scope it's first seen

global x            # defines x as a global
nonlocal x          # defines x to be "at this" scope

# Import

import module
import package. module
import module as name
from module import name
from module import name as othername
from module import *                     # avoid using this

from source import name             # abs: sys.path
from . import module                # rel: pkg only
from .source import name            # rel: pkg only
from .. import module               # parent in pkg
# from ..source import name         # parent in pkg

from __future__ import feature

The module path is stored in `sys.path`

# Class

class C

class C(A):         # C extends A
    def m():

# Exceptions

try:
    ... # body
except type as e:
    ... # runs if exception
else:
    ... # runs if no exceptions
finally:
    ... # runs regardless

raise
raise Error(args)
raise NewError from E   # chaining

assert expr
assert expr, statement

Exception       top level (except for BaseException and a handful of errors)
OSError IndexError KeyError
RuntimeError    rarely used catch-all
SystemError     like a Fatal

Coders see most:
AttributeError  tried to access a missing attribute
NameError used the name of something that doesn't exit
SyntaxError check your punctuation, missing comma/paren?
TypeError check your types
ValueError  check your values

# Inheritance

Attributes are looked up: DFLR = Dept-first, left to right

If there's a <> diamond in inheritance, then attributes are looked at in subclasses first, then DFLR

# Methods

__init__(self)      # constructor
__str__             # called on str(obj), repr for repr
__hash__            # also override __eq__ and probably also __lt__

@classmethod    methods added to the class, the first arg is 'cls'
@staticmethod   effectively functions, no 'self' arg

# More Built-ins

all         true if all are true
any         true if any true
enumerate(iterable, start=0)    gives iterable of (index, value) tuples
exec
filter(fn, iter)
getattr(a, b)       e.g. getattr(a, 'b') == a.b, use when cannot use b directly
getattr(a, b, default)
len
list
map(fn, xs)
map(fn, xs, ys)
max min open print range sum
zip(xs, ys)

3.x replacements to use instead of 2.x
f(*args) instead of apply
(x>y)-(x<y) instead of cmp
open instead of file
functools.reduce instead of reduce

# Useful Modules

sys.argv exit flags path platform version_info stdin stdout
string.ascii_letters digis punctuation whitespace
os.system environ getenv listdir makedir makedirs remove removedirs rename rmdir walk
re.compile match search split
glob.glob(pattern)

tkinter is a built-in UI framework

socket email http.server

math.pi sqrt floor
profile time timeit datetime random json enum struct sqlite3 unit test doctest

Get more modules: https://pypi.org/

# Idioms
```
#!/usr/bin/env python
#!/usr/local/bin/python


def main():
    ...

if __name__ == '__main__':
    main()
```

Set PYTHONIOENCODING to utf8 if errors

---

# Hypermodern Python

Following along with https://cjolowicz.github.io/posts/hypermodern-python-01-setup to learn python setup

pyenv local $latest

Using Poetry, which is like yarn for python: https://python-poetry.org/

(While pip and pipx are like npm and npx)

After that, run:

poetry init --no-interaction

Layout:
.
├── LICENSE
├── README.md
├── pyproject.toml
└── src
    └── modern_python_valba
        └── __init__.py

Notice the snake_case name, even though the package is kebab-case

# __init__.py
__version__ = "0.1.0"

$ poetry install

Start a REPL:
$ poetry run python 

Add dep:
$ poetry add click

Update dep:
$ poetry update click

Major version update or to just specify:
$ poetry add click^7.0

Add dev dep:
$ poetry add --dev pytest

VS Code + Poetry, start with iTerm:
$ poetry shell
$ code .
Click Python in bottom left, select Recommended, which should have a long obnoxious path, like ~/Library/Caches/pypoetry/virualenvs/your-package-py3.9/bin/python
https://www.pythoncheatsheet.org/blog/python-projects-with-poetry-and-vscode-part-2/

Modules:
    Unit testing: pytest
    Coverage: Coverage.py pytest-cov
    Mocking: pytest-mock
    Python multi-version testing: nox
    CLI: click https://click.palletsprojects.com/en/8.0.x/

---


# Data class `@dataclass`

Similar to Lombok's @Data (and related)

```
from dataclasses import dataclasses

@dataclass
class InventoryItem:
    name: str
    unit_price: float
    quantity_in_stock: int = 0
    ingredients: list = field(default_factory=list)

    def total_cost(self) -> float:
        return self.unit_price * quantity_in_stock
```

# Typing

typing.Any  for when you want to specify a type that could be anything

# Properties

Start with attributes.
Properties are a special type of attribute that has getters, setters, and deleter defined to ensure some invariants are kept

