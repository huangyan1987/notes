# curl

```
d --data <data/@file>
-i --include Includes HTTP response headers in output.
-H --header <header/@file> Specify header to include in request
```

Send JSON
```
curl -i -H "Content-Type:application/json" -d '{"firstName": "Frodo", "lastName": "Baggins"}' http://localhost:8080/people
```
---

https://developer.mozilla.org/en-US/docs/Learn/Front-end_web_developer

Tag: `<a>`
Content: between the tags
Element: Tag + Elements

Elements have attributes, attributes have name & value
`<p class="editor-note">...</p>`

name: class
value: editor-note
- values only need to be quoted if they have whitespace or `"'=<>`
- but usually good to just always quote

HTML:

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link href="styles/style.css" rel="stylesheet">
    <title>HI</title>
</head>
<body>
    <h1>Howdy!</h1>
</body>
</html>
```

headings: h1-h6
paragraph: p
lists:
    unordered lists: ul
    ordered lists: ol
    list item: li
anchor: a, href = hypertext reference

CSS

Each block is a ruleset/rule
```
p {
    color: red;
}
```

selector: p
property: color
property value: red
declaration: color: red;

Must have curly brackets, each separated by colons, each line ends in semicolon /* comments */

Multiple selectors separated by commas:

```
p, li, h1 {
  color: red;
}
```

Universal: `*
ID selector: `#xyz
class selector: `.xyz
Pseudo-class selector, some special state: `abc:xyz
Pseudo-elements: `abc::xyz
attribute, only select abc with xyz attribute: `abc[xyz]
Descendant, any xyz that are children of abc: `abc xyz
Direct descendant, only xyz that are direct children of abc: `abc > xyz
Adjacent sibling, only xyz immediately after abc: `abc + xyz
General sibling, xyz that are both children of same parent of abc: `abc ~ xyz

```
            ____ margin
        padding |border
content
```

JS

```
document.querySelector("img").onclick = function () {
    /****/
}
```
