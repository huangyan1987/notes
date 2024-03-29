2022-07-09
These notes are a re-introduction to the Go language for myself.

This file focuses on the "core" language and syntax of Go.
- For concurrency: see [go-csp.md](go-csp.md)
- For non-core language features: see [go-intermediate.md](go-intermediate.md) 
- For stdlib package and other package info: see [go-pkgs.md](go-pkgs.md)

$ go version            # As of now: go version go1.18.3 darwin/arm64

$ go run hello.go
$ go build hello.go && ./hello                  # 
$ go build -race -o binary-path package-path    # build with race condition detection

$ go get package_path

Modules:
$ go mod init example/hello     # initialize new module named example/hello in pwd
$ go mod [tidy|download|verify]

package main

import {
    "fmt"
    m "math"    // Math library with local alias m.
}

func main() {
    fmt.Println("Howdy!")
    var x int // Variable declaration. Variables must be declared before use.
    x = 3     // Variable assignment.
    n := byte('\n') // byte is an alias for uint8.
    s := `foo` // literal string
	
}

# Refs
https://go.dev/
https://pkg.go.dev/
https://gobyexample.com/


# Slice Cheatsheet
s = make([]int, 2, 4) // len of 2, cap of 4
s = append(s, 3, 4) // append items to slice a
a = append(a, b...) // append slice b to slice a
copy(dst, src)

# Importing packages
1. add the import: import "rsc.io/quote"
2. go mod tidy OR go get rsc.io/quote

# String methods
Contains Count HasPrefix HasSuffix Index Replace Split ToLower ToUpper
s.Join(strings, delim)

# Printing https://pkg.go.dev/fmt

fmt.Printf("Hello %d\n", 23)
fmt.Fprint(os.Stdout, "Hello ", 23, "\n")
fmt.Println("Hello", 23)
fmt.Println(fmt.Sprint("Hello ", 23))

%s basic strings
%q quote strings
%p pointer
%v to print out value
%+v to print field names
%#v to print full Go representation
%T to print type
%t boolean
%d decimal
%b binary
%c char
%x hex
%f float
%e scientific float

Remember, functions are first-class, so we can shorten:
p := fmt.Println

# Arrays

var a4 [4]int           // An array of 4 ints, initialized to all 0.
a5 := [...]int{3, 1, 5, 10, 100} // An array initialized with a fixed size of five
NOTE: Arrays have value semantics; passing them will copy the array

# Slices

s3 := []int{4, 5, 9}    // Compare to a5. No ellipsis here.
s4 := make([]int, 4)    // Allocates slice of 4 ints, initialized to all 0.
// Slices (as well as maps and channels) have reference semantics.
s3_cpy := s3            // Both variables point to the same instance.
s3_cpy[0] = 0           // Which means both are updated.

s := []int{1, 2, 3}     // Result is a slice of length 3.
s = append(s, 4, 5, 6)  // Added 3 elements. Slice now has length of 6.

x = append(x, y...) // append one slice to another

# Maps

m := map[string]int{"three": 3, "four": 4}
m["one"] = 1

val, ok := timeZone[tz]

# Switch

switch x {
    case 0:
    case 1, 2:
    case 100:
      fallthrough
    default:
}

var data interface{}
data = ""
switch c := data.(type) {
case string:
    fmt.Println(c, "is a string")
case int64:
    fmt.Printf("%d is an int64\n", c)
default:
    // all other cases
}

Type switch:
switch str := value.(type) {
case string:
    return str
case Stringer:
    return str.String()
}

Type assertion: t, ok := value.(typeName)
NOTE: important to check `ok`. On a failed assertion, `t` will have zero-value

# Flow control: for, defer, panic

for x := 0; x < 3; x++ { // ++ is a statement.
    fmt.Println("iteration", x)
}

break continue work as expected

loop:       // label, eat your heart out goto
    for {
        switch {
        case true:
            fmt.Println("I'm bustin outta here!")
            break loop
        }
    }

// You can use range to iterate over an array, a slice, a string, a map, or a channel.
// range returns one (channel) or two values (array, slice, string and map).
for key, value := range map[string]int{"one": 1, "two": 2, "three": 3} {
    // for each pair in the map, print key and value
    fmt.Printf("key=%s, value=%d\n", key, value)
}
// If you only need the value, use the underscore as the key
for _, name := range []string{"Bob", "Bill", "Joe"} {
    fmt.Printf("Hello, %s\n", name)
}

for condition {} // while loop
for {}             // infinite loop


if y := expensiveComputation(); y > x {
    x = y
}

`defer` executed after function return, put on a stack
NOTE: args are evaluated when `defer` is evaluated; not when the defered fn is actually eval'd
NOTE: defer is NOT executed at end of block, but at end of function

panic("boom")

Recover from panic using a defer-anon-fn with recover()
defer func() {
    if r := recover(); r != nil {
        // recover from panic
    }
}
mayPanic()

https://devs.cloudimmunity.com/gotchas-and-common-mistakes-in-go-golang/index.html#panic_recover

# Types

## type struct

type pair struct {
    x, y int
}

p := pair{3, 4}

## type alias

type myMutex sync.Mutex

NOTE: non-interface type aliases cannot be used with methods for the original! 
To do that, use a new struct type with the original as an anonymous field

type myLocker struct {  
    sync.Mutex
}



## type interface

type Stringer interface {
    String() string
}

# Allocation: new and make

new(T) returns a pointer to a newly allocated zero value of type T.
// returns *T

## Composite literal

f := File{fd, name, nil, 0} // all laid out, in order, all must be present
// f is type File
f := File{fd: fd, name: name} // with labels, you can leave zeros out

new(File) == &File()

## make

make(T, args) // returns type T
make([]int, 10, 100) // returns type []int

// idiomatic:
v := make([]int, 100)

// equivalent:
var p *[]int = new([]int)
*p = make([]int, 100, 100)

# 2D Allocation

## Option 1: rows and cols
// Allocate the top-level slice.
picture := make([][]uint8, YSize) // One row per unit of y.
// Loop over the rows, allocating the slice for each row.
for i := range picture {
    picture[i] = make([]uint8, XSize)
}

## Option 2: one large allocation, split into slices

// Allocate the top-level slice, the same as before.
picture := make([][]uint8, YSize) // One row per unit of y.
// Allocate one large slice to hold all the pixels.
pixels := make([]uint8, XSize*YSize) // Has type []uint8 even though picture is [][]uint8.
// Loop over the rows, slicing each row from the front of the remaining pixels slice.
for i := range picture {
    picture[i], pixels = pixels[:XSize], pixels[XSize:]
}

# Methods

Methods are funcs with a target; target can be a value or pointer.

`func (slice ByteSlice) Append(data []byte) []byte {...}`
`func (p *ByteSlice) Write(data []byte) (n int, err error) {...}`

The rule about pointers vs. values for receivers is that value methods can be invoked on pointers and values, but pointer methods can only be invoked on pointers.

# varadic params

func learnVariadicParams(myStrings ...interface{}) { ... }

# Errors

New error: 
errors.New("an error")
fmt.Errorf("math: square root of negative number %g", x)


## Custom errors

Custom error, an "error" is any struct that satisfies:

type error interface {
    Error() string
}

For example:
type SyntaxError struct {
    Line int
    Col  int
}

```
func (e *SyntaxError) Error() string {
    return fmt.Sprintf("%d:%d: syntax error", e.Line, e.Col)
}
```

## Error Idioms


 // ", ok" idiom used to tell if something worked or not.
m := map[int]string{3: "three", 4: "four"}
if x, ok := m[1]; !ok { // ok will be false because 1 is not in the map.
    fmt.Println("no one there")
} else {
    fmt.Print(x) // x would be the value, if it were in the map.
}

// An error value communicates not just "ok" but more about the problem.
```
if _, err := strconv.Atoi("non-int"); err != nil { // _ discards value
    // prints 'strconv.ParseInt: parsing "non-int": invalid syntax'
    fmt.Println(err)
}
```