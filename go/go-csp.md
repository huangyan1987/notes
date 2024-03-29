This file contains notes for CSP, channels, concurrency, parallelism, async, etc. in Go
https://en.wikipedia.org/wiki/Communicating_sequential_processes

"Do not communicate by sharing memory; instead, share memory by communicating."

# Channels

func inc(i int, c chan int) {
    c <- i + 1 // <- is the "send" operator when a channel appears on the left.
}

c := make(chan int)
go inc(0, c) // go is a statement that starts a new goroutine.
go inc(10, c)
go inc(-805, c)
fmt.Println(<-c, <-c, <-c) // channel on right, <- is "receive" operator.

ci := make(chan int)            // unbuffered channel of integers
cj := make(chan int, 0)         // unbuffered channel of integers
cs := make(chan *os.File, 100)  // buffered channel of pointers to Files

## Channel Select

// Select has syntax like a switch statement but each case involves
// a channel operation. It selects a case at random out of the cases
// that are ready to communicate.
select {
case i := <-c: // The value received can be assigned to a variable,
    fmt.Printf("it's a %T", i)
case <-cs: // or the value received can be discarded.
    fmt.Println("it's a string")
case <-ccs: // Empty channel, not ready for communication.
    fmt.Println("didn't happen.")
}

## Timer & Ticker Channels https://pkg.go.dev/time

Timer fires once (like a kitchen timer)
Ticker repeats (like a ticking clock)

timer1 := time.NewTimer(2 * time.Second) // timer1 is a channel that fires in 2s
<-timer1.C
fmt.Println("Timer 1 fired")

ticker := time.NewTicker(500 * time.Millisecond)
t := <-ticker.C

tickers can be used for rate-limiting: https://gobyexample.com/rate-limiting

## WaitGroup https://pkg.go.dev/sync#WaitGroup

WaitGroup is used to "join" on channels to wait until they're complete.

var wg sync.WaitGroup // Step 1. create

wg.Add(1)             // Step 2. add to increment
defer wg.Done()       // Step 3. Within go, defer the Done (decrement)
wg.Wait()             // Step 4. Wait until done

# Atomic https://pkg.go.dev/sync/atomic

For incrementing shared int/unit, use "sync/atomic"
    var ops uint64
    atomic.AddUint64(&ops, 1) // equivalent of ops++

# Mutexes https://pkg.go.dev/sync#Mutex

sync.Mutex

NOTE: always pass pointers to mutex; never copy a mutex

type Container struct {
    mu  sync.Mutex
    counters map[string]int
}
c *Container

c.mu.Lock()
defer c.mu.Unlock()
c.counters[name]++

# Gotchas

https://devs.cloudimmunity.com/gotchas-and-common-mistakes-in-go-golang

If the main() path does NOT wait on goroutines to finish.
Sender can be unblocked as soon as rx processes. This may cause the main() path to finish before the rx goroutine does.
nil channels block forever on send & rx
*Sending* to a closed channel causes a panic. (Rx is okay; it will return 0, false)

If you kick off n-goroutines but only want one (fastest or w/e), make sure the others end.
Don't just have them all blocking on a chan you'll never read.
Using a select with an empty default works.

    work := func(i int) { 
        select {
        case c <- calc(i):
        default:
        }
    }


# Notes from Videos

## Concurrency Made Easy (Practical Tips For Effective Concurrency In Go)
https://www.youtube.com/watch?v=DqHb5KBe7qI

Don't overuse goroutines: If you have to wait for the result, just call (no go!). 
Rx from from a closed channel immediately returns the zero value for the chan type.
Always release locks and semaphores in the reverse order you acquire them.
Closing a channel only marks it as *not accepting* any new values.
Acquire sempahores when you're ready to use them.
    As in, within the goroutine. Goroutines are dirt cheap.
Beware lexical-scoping/closure behavior within a go func. The "val i" problem from JS.
https://go.dev/doc/faq#closures_and_goroutines
https://devs.cloudimmunity.com/gotchas-and-common-mistakes-in-go-golang/index.html#closure_for_it_vars

BROKEN!:
```
for _, repo := range repos {
    go func() {
        doThing(repo)       // Just like JS, this is WRONG!
    }()
}
```

Either:
```
for _, repo := range repos {
    go func(repo string) { // GOOD: now the parameter `repo` shadows the loop `repo`
        doThing(repo)
    }(repo)
}
```
Avoid mixing anon-functions and go routines. Using a named function helps.

```
for _, repo := range repos {
    go workDoThing(repo)
}

func workDoThing(repo string) {
    doThing(repo)
}
```

Before you `go`, know when and how it will stop.


## Concurrency Patterns In Go
https://www.youtube.com/watch?v=YEKjSzIwAdA

Sending to a closed channel will panic.
Closing a channel will also panic.

Normally only close channels from the *sending* side; not the rx side

Fan-out pattern (one in, multi out)

```
func Fanout(In <-chan int, OutA, OutB chan int) {
    for data := range In {  // rx until closed
        select {
        case OutA <- data:  // send to first non-blocking channel
        case OutB <- data: 
        }
    }
}
```
Turn out (multi in, multi out)

```
func Turnout(InA, InB <-chan int, OutA, OutB chan int) {
    // elid vars
    for {
        select {            // rx from first non-blocking
        case data, more = <-InA:
        case data, more = <-InB:
        }
        if !more {
            // ...?
            return
        }
        select {            // send to first non-blocking
        case OutA <- data:
        case OutB <- data:
        }
    }
}
```

If you're spinning in a tight loop, call runtime.Gosched() to prevent locking up a CPU

## GopherCon 2017: Kavya Joshi - Understanding Channels

https://youtu.be/KBZlN0izeiY

ch := make(chan Task, 3) // buffered
- goroutine safe
- stores up to cap elems, FIFO

"make a queue with a lock"

hchan {
    buf             // circular queue
    sendx           // send index
    recvx           // receive index
    mutex           // lock
    sendq           // waiting senders
    recvq           // waiting receivers
}

The send & rx index manages the circular buffer queue
make returns a pointer to the hchan
A channel is just a pointer

on send:
    1. acquire lock
    2. enqueue elem using mem copy
    3. release

on receive:
    1. acquire lock
    2. dequeue elem using mem copy
    3. release lock

So no shared memory (except the hchan) and it copies, which holds true to the motto:
"Do not communicate by sharing memory; instead, share memory by communicating."

goroutines are "user-space threads"

M:N scheduling
M: OS thread
G: goroutine
P: context for scheduling, holds the run-queue

To run a goroutine (G), an os thread (M) holds a context (P)

When a channel is blocked, calls `gopark` for its goroutine (G1) into the scheduler.
OS thread (M) loses context with (G1) and picks up the next goroutine in the queue.

the sendq and recvq are sudog

sudog {
    G           // waiting G
    elem        // elem to send/recv
}

So channel.sendq points to a sudog which points to G1, the goroutine blocked on the channel

When a recv is called on a full buffered channel:
1. dequeue the elem for the receiver
2. enqueue the elem from the sendq
3. sets previously blocked G1 to runnable

When a recv is called on an EMPTY buffered channel (running in goroutine G2):
"setup state for resumption and pause"
1. put sudog in the recvq
2. gopark G2

But it can actually just copy it straight into the stack for the blocked goroutine 

Unbuffered channels always do this "direct send":
- rx first -> sender writes to rx stack
- sender first -> rx directly from the sudog

CAS: Compare And Swap

ch := make(chan Task)    // unbuffered


