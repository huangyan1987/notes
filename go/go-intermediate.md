This file has notes for more intermediate or niche Go notes EXCEPT those related to CSP (see go-csp.txt)
These are parts of the language not always needed or are beyond "introduction" scope.

# Generics

func Index[T comparable](s []T, x T) int

type List[T any] struct {
	next *List[T]
	val  T
}

# Testing, import "testing"

$ go test
$ go test -v        # verbose
$ go test -cover    # coverage analysis
go test -v -bench . # benchmarks (see below)

Write a function with name staring with "Test"

```
func TestFoo(t *testing.T) {
    t.Errorf("log an error %s", s)
}
```

Using "table-driven" allows writing parameterized tests easily

```
func TestTableDriven(t *testing.T) {
    var tests = []struct {
        a, b int        // input
        exp int        // expected
    }{
        {0, 1, 0},
        {1, 0, 0},
        // etc.
    }
    for _, tt := range tests {
        testname := fmt.Sprintf("%d,%d", tt.a, tt.b)
        t.Run(testname, func(t *testing.T) {
            act := SUT(tt.a, tt.b)
            if act != tt.exp {
                t.Errorf("actual %d, expected %d", act, tt.exp)
            }
        })
    }
}
```


## Benchmark

$ go test -bench=.
$ go test -v -bench . -benchtime 50s

Benchmark tests typically go in _test.go files and are named beginning with Benchmark. The testing runner executes each benchmark function several times, increasing b.N on each run until it collects a precise measurement.

foo_test.go

```
func BenchmarkIntMin(b *testing.B) {
    for i := 0; i < b.N; i++ {
        IntMin(1, 2)
    }
}
```


https://go.dev/doc/tutorial/add-a-test


## Testable Examples

https://go.dev/blog/examples

In _test.go file, Example()

func ExampleFoo()     // documents the Foo function or type
func ExampleBar_Qux() // documents the Qux method of type Bar
func Example()        // documents the package as a whole

func init()  // run before anything else is run, after vars init'd

# Command Line

os.Args, usually want os.Args[1:]

os.Exit(3)  // NOTE: Exit will skip defers!

## Command-line flags "flag"

The flags return pointers:

sptr := flag.String("name", "default", "a description")
iptr := flag.Int("answer", 42, "to the life, the universe")

or you can provide a var addr:
var svar string
flag.StringVar(&svar, "svar", "bar", "a var")

flag.Parse()    // IMPORTANT

usage:
```
*sptr
*iptr
svar
flag.Args()     // for the non-flag args
```
flags automatically handles generating "-h" help:
$ ./your-bin -h
Usage of ...

Subcommands, which are like how `go` has `go get`:
https://gobyexample.com/command-line-subcommands

## Environment Variables

```
os.Setenv("KEY", "VAL")
os.GetEnv("KEY")
for _, e := range os.Environ() {
    pair := strings.SplitN(e, "=", 2)
    fmt.Println(pair[0]) // keys
}
```
## Subprocesses with exec

```
dateCmd := exec.Command("date")
dateOutput, err := dateCmd.Output()
_, err := exec.Command("date", "-x").Output()
```
https://gobyexample.com/spawning-processes

To spawn a subprocess and have it replace the Go program itself:

syscall.Exec(binary, args, env)

https://gobyexample.com/execing-processes

## OS Signals (like SIGTERM)

Go handles Signals via channels:

    sigs := make(chan os.Signal, 1)
    signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)

https://gobyexample.com/signals

# HTTP https://pkg.go.dev/net/http

## HTTP Client

```
resp, err := http.Get("https://go.dev")

// https://devs.cloudimmunity.com/gotchas-and-common-mistakes-in-go-golang/index.html#close_http_resp_body
if resp != nil {
    defer resp.Body.Close()     
}

if err != nil {
    panic(err)
}
resp.Status
scanner := bufio.NewScanner(resp.Body)
for i := 0; i < 5 && scanner.Scan(); i++ {
    fmt.Println(scanner.Text())
}
```

Be aware of closing keep-alive connections:
https://devs.cloudimmunity.com/gotchas-and-common-mistakes-in-go-golang/index.html#close_http_conn

## HTTP Server

Write a handler:
```
func hello(w http.ResponseWriter, req *http.Request) {
    fmt.Fprintf(w, "hello\n")
}

func main() {
    http.HandleFunc("/hello", hello)
    // Another handler, prints out headers
    http.HandleFunc("/headers", headers)
    http.ListenAndServe(":8080", nil)
}
```


### Context

A context.Context is created for each request by "net/http"

ctx := req.Context()

ctx.Done() and ctx.Err()

Error page:
http.Error(w, err.Error(), http.StatusInternalServerError)


# Sorting

sort.Strings .Ints .IntsAreSorted

## Custom Sorting: Len/Swap/Less

```
type byLength []string

func (s byLength) Len() int {
    return len(s)
}
func (s byLength) Swap(i, j int) {
    s[i], s[j] = s[j], s[i]
}
// Less is the most important for sort.Sort
func (s byLength) Less(i, j int) bool {
    return len(s[i]) < len(s[j])
}

func main() {
    fruits := []string{"peach", "banana", "kiwi"}
    sort.Sort(byLength(fruits))
    fmt.Println(fruits)
}
```


# Equals

== is good enough for structs and arrays
If you need deep equals, use reflect.DeepEqual(a, b)
If comparing secrets, use subtle.ConstantTimeCompare() from 'crypto/subtle'

# Slice gotchas

"Full slice expression"
b := a[start:end]    // "reuses" the underlying slice, so appends to b can corrupt a!
b := a[start:end:end-start]     // "forces" a new slice

b := a[start::len(a)-start]
b := a[:end:end]

Slices are like akin to a view of an ArrayList, so highly mutable

Build tags:
// +build prod, dev, test

TODO CONTINUE @ https://devs.cloudimmunity.com/gotchas-and-common-mistakes-in-go-golang/index.html#advanced_beginner