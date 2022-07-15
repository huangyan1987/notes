Notes specific to packages (mostly from the stdlib) that are:
- NOT core to the Go language itself (see go-core.txt for that)
- NOT core to CSP, Channels, Async, etc (see go-csp.txt for that)

Examples: Files, Templating, Regex, JSON, etc.

# Files

## Reading from files

import "os" 
dat, err := os.ReadFile(filename) // basic, slurps into memory

f, err := os.Open(filename) // more fine-grained control
defer f.Close()             // don't forget to!
f.Read(buff) .Seek(n, n)

import "io"     // io has more options
n, err := io.ReadAtLeast(f, buff, n)

import "buffio" // buffered reading is faster and has more methods
scanner := bufio.NewScanner(os.Stdin) // or any fh

## Writing to files
import "os"
os.WriteFile(filename, data, octal)
f, err := os.Create(filename)
f.Write(d2) .WriteString(s)

import "bufio"
w := bufio.NewWriter(f)
w.WriteString(s) .Flush()

## Filepaths path/filepath

fp := filepath.Join("dir1", "dir2", "filename")
filepath.Dir(fp) .Base(fp) .IsAbs(s) .Ext(s)

## Directories

os.Mkdir("dir", 0755)
os.RemoveAll("dir")
os.WriteFile(name, []byte(""), 0644)

files, err := os.ReadDir("dir")
for _, entry := range files {
    fmt.Println(" ", entry.Name(), entry.IsDir())
}
os.Chdir("subdir")
err = filepath.Walk("subdir", visitFn)

func visit(p string, info os.FileInfo, err error) error {
    if err != nil {
        return err
    }
    fmt.Println(" ", p, info.IsDir())
    return nil
}

https://gobyexample.com/directories

## Temp files

f, err := os.CreateTemp("", "sample")
f.Name()
f.Write([]byte{1,2,3,4})
dname, err := os.MkdirTemp("", "sampledir")
defer os.RemoveAll(dname)

## Embed files "embed"

https://gobyexample.com/embed-directive

Effectively a macro that loads a file into a var
Should be really useful for Advent of Code!

import "embed"
//go:embed folder/single_file.txt
var fileString string // or []byte

//go:embed folder/*.hash
var folder embed.FS

# Templates "text/template" and "html/template"

https://pkg.go.dev/text/template
https://pkg.go.dev/html/template

template uses "handlebars" with "." as the default model object
{{.}}
{{.NamedField}}
t1, err := template.Parse("Value is {{.}}\n")
// Use `Must` to force a panic
t1 := template.Must(template.Parse("Value is {{.}}\n"))
t1.Execute(os.Stdout, "the actual")

"{{ if . -}} yes {{else -}} no {{end}}"

"if" evaluates default values as "false": 0, "", nil, etc.
"-" trims whitespace

loop with `range`, within the range, "." is the loop elem
"Range: {{range .}}{{.}} {{end}}\n"

# Regexp "regexp"

match, _ := regexp.MatchString("p([a-z]+)ch", "peach")

r, _ := regexp.Compile("p([a-z]+)ch")
r.MatchString("peach")

https://pkg.go.dev/regexp
https://gobyexample.com/regular-expressions


# JSON https://pkg.go.dev/encoding/json

https://go.dev/blog/json

type response2 struct {
    Page   int      `json:"page"`
    Fruits []string `json:"fruits"`
}
json.Marshal(obj)

if err := json.Unmarshal(byt, &dat); err != nil { panic(err) }
fmt.Println(dat)

# XML https://gobyexample.com/xml

# Time https://pkg.go.dev/time

t := ftime.Now()
t.Year() Month Day Hour Minute Second Nanosecond Location
t.Sub(t)
t.Unix() UnixMilli UnixNano
t.Unix(secs, nsecs)
time.Parse()

# Random https://pkg.go.dev/math/rand and https://pkg.go.dev/crypto/rand

rand.Intn(n) .Float64()

Manually setting the seed:
s1 := rand.NewSource(time.Now().UnixNano())
r1 := rand.New(s1)
r1.Intn

# Number Parsing https://pkg.go.dev/strconv

strconv.ParseInt(s, bits) 
strconv.ParseInt(s, base, bits) // base = 0 => infer the base
also: .ParseFloat .ParseUInt

strconv.Atoi(s)

# URL Parsing https://pkg.go.dev/net/url

u, err := url.Parse(s)
u.Scheme User Host Path Fragment RawQuery
SplitHostPort

# Hashes crypto/sha256

h := sha256.New()
h.Write([]bytes(s))
bs := h.Sum(nil)

import b64 "encoding/base64"
