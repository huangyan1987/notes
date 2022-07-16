https://reactjs.org/tutorial/tutorial.html

`$ npx create-react-app my-app`

Base building block for React is the Component

A component takes in `props` (properties) and returns a hierarchy of views to display via the `render` method

`render` returns a *description* of what you want to render, React takes that and displays the result.
Actually, `render` returns a React element, a lightweight description of what to render.
values are stored in `this.props`
JSX is the special syntax.

<div /> is turned into: React.createElement('div')


```
<div className="shopping-list">
<h1>Shopping List for {this.props.name}</h1>
<ul>
  <li>Instagram</li>
  <li>WhatsApp</li>
  <li>Oculus</li>
</ul>
</div>
```

is turned into:

```
React.createElement('div', {className: 'shopping-list'},
React.createElement('h1', /* ... h1 children ...*/),
React.createElement('ul', /* ... ul children ...*/));
```

Components have state that's stored in this.state

Best to store shared state in a parent component.
The parent component can pass the state back down to the children by using props.
This keeps child components in sync with each other and with the parent.
Lifting state to a parent component is common

Immutability is important for React
- Simplifies complex changes
- Simplifies detecting changes (no deep-equals check required)
- Determining when to re-render in React (see shouldComponentUpdate())

---


# Udemy Course: "Modern React with Redux [2020 Update]"

The App function is a React Component

components produce JSX and handle user events

JSX is a set of instructions to tell React what to render

JSX tells it to create a normal HTML element: div, span, h1, table, hr, input, ...
OR another React Component

request -> index.html -> gets bundle.js
bundle.js contains index.js, app.js, & react.js
index.js is automatically executed first (analogous to index.html)

```
ReactDOM.render(
  <App />, // calls the App function, get back JSX, and turn into HTML
  document.getElementsById('root'), // tells React where to put the components
)
```

React: reconciler, knows how to work with components
ReactDOM: renderer, knows how to take instruction on what we want to show and turn it into html

useState: function for working with React's state system, used to make React update the HTML on screen (the view)
- returns a pair: current state and a function that updates it

`$ npx create-react-app myapp`

ES5, ES2015, ..., ES2019
^    ^       ^--- not as supported ----^
|    ` decent support
` perfect support
babel takes JavaScript written in more recent versions and transpiles down to the lowest common denominator: ES5

```
src/            duh
README.md       duh
public/         static files and resources, like html, images
node_modules/   all the dependencies (don't need to touch)
package.json    records deps and configures project
package-lock.json   records the exact version of packages we install
yarn.lock       same, but for yarn
```

Using webpack.

Some Node uses require (CommonJS Modules)
  const something = require('something');

React uses import (ES2015 Modules)
  `import React from "react";`


A component is either a Function or a Class that produces HTML (via JSX) and handles feedback from the user (using Event Handlers)


```
const App = () => <div>Hello there!!</div>;
/* ^^^ that is turned into vvv */
const App = () => React.createElement("div", null, "Hello there!!");
```


HTML inline style:
`<button style="background-color:blue; color:white;">Submit</button>`

equivalent JSX inline style:
`<button style= {{ backgroundColor: 'blue', color: 'white' }} >Submit</button>`

0. replace class with className because class is a keyword in JS. (Might go away in the future)
  replace `for` with `htmlFor`
1. replace surrounding "quotes" with {{ brackets }}
2. replace hyphen-names with camelCase
3. replace semicolons with commas (to be like JS object)
4. turn values into strings: blue => 'blue'

JSX can reference JS variables

Nesting: one inside another
Reusability: easily reused throughout app
Configuration: can configure when it's created


`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>`


Props are the system for passing state from a parent to a child
Props are all passed in as a single object as the first param to a component

props.children has child components, components nested within other components

Functional components are good for simple components.
Class components are good for everything else.

Lifetime:
1. js file loaded by browser
2. App component get created
3. We call geolocation service (takes time!)
4. App returns JSX, gets rendered to page as HTML
...
5. Get result of geolocation!
6. Important: need to tell the component to re-render itself!

Class components:
1. Must be a JS class
2. Must extend/subclass React.Component
3. Must define a 'render' method that returns some JSX

use this.props instead of props

Rules of state:
1. Only usable with class components (at least until we learn hooks)
2. You will confuse props with state
3. 'State' is a JS object that contains data relevant to a component
4. Updating 'state' on a component causes the component to (almost) instantly rerender
5. State must be initialized when a component is created
6. State can ONLY be updated using the function setState
- Don't need to set the whole state object to setState, just the states being updated

Component Lifecycle:
1. constructor
- do onetime setup
2. render (required method!)
- avoid doing anything besides returning JSX
3. content visible on screen
4. componentDidMount: called once when the component is inserted into the tree
- Good place to do data-loading
5. sit and wait for updates...
6. render (called again)
7. componentDidUpdate
- Good place to do more data-loading when state/props change
8. sit and wait until this component is no longer shown
9. componentWillUnmount
- Good place to do cleanup, especially non-React cleanup


Other methods, rarely used:
shouldComponentUpdate: lets React know if it shouldn't update. default is to update on every state change
getDerivedStateFromProps: for rare cases where state depends on props over time.
getSnapshotBeforeUpdate: invoked right before rendered is shown in DOM. for checking scroll position

Can import CSS files into a JS file. Webpack does the corrrect handling

Good to have the root element in a component to have a class name matching the component name.


instead of: props.something || 'default'
```
Component.defaultProps = {
  something: 'default'
}
```


important events: onClick, onChange, onSubmit
method names: `on<element><event>`, like onInputClick
or  `handle<element><event>`

event.target.value: the value of the input


1. event
2. event callback
3. call setState
4. component rerenders
5. input is told what the value is

Event handler throws error: 'cannot access property 'state' on undefined

Why? Event handler is executed without a value for `this`, i.e. `this` is undefined

car.drive() // 'vrooom'
truck.drive() // 'putputput'

drive = car.drive
drive() // ERROR

How to fix?
1. explicit bind: handler = this.handler.bind(this)
2. that = this; that.state;
3. arrow function, then `this` is handled like in #2

Props only go down (from parent to child components)
but we can pass a callback down as a prop

For network calls:
fetch: built-into browser
axios: 3rd party package

$ yarn add axios

React Refs: give access to the DOM elements
We create refs in the ctor, then assign them to instance variables, then pass to a particular JSX element as props
this.imageRef = React.createRef()


Hooks System:

useState: Function that lets you use state in a functional component
useEffect: Function that lets you use something like lifecycle methods in a functional component
useRef: Function that lets you create a 'ref' in a function component

Hooks are a way to write reusable code, instead of more classic techniques like Inheritence

Primitive hooks: use...State, Effect, Context, Reducer, etc.

Custom hook, like useTranslate: useState + useEffect

React.Fragment allows a component to be built in parts without having extra wrapping divs in the way, so that styling can be as expected

useState takes the initial state (often null) and returns a pair: a ref to the piece of state and a function to set the state


Class components:
  Initialization: state = {activeIndex: 0}
  Reference: this.state.activeIndex
  Updates: this.setState({activeIndex: 10})

Function components:
  Initialization: `const [activeIndex, setActiveIndex] = useState(0)`
  Reference: activeIndex // as provided by useState[0]
  Updates: setActiveIndex(10) // as provided by useState[1]

Note, in Functional components each piece of state will require a separate call to useState

The `useEffect` Hook:
Allows function components to use something lifecycle methods
We configure the hook to run some code automatically in one of three scenarios:
1. When the component is rendered for the first time ONLY: `[] arg`
2. When the component is rendered for the first time and on re-renders: undefined arg. Not common.
3. When the component is rendered for the first time and whenever it re-renders but ONLY IF some piece of data has changed: [data] arg

We don't have componentDidMount within Function components

args are: `(callback, arr)`

arr is either undefined, [], or [stateObj]

useEffect cannot take an async fn. To workaround, either:
1. create a helper and invoke
2. use promises

useEffect can return a function which will run before the next invocation
Good for cancelling timeouts using clearTimeout or removing event listeners or any other cleanup tasks

label: what is shown to the user
value: the code value, for the programmer & scripts

Events bubble "up" the DOM Tree.
To manually setup event listeners:

document.body.addEventListener(type, listener)

https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
Events: https://developer.mozilla.org/en-US/docs/Web/Events

Common event types:
focus
blur
keyup
click
select

Listeners added with addEventListener are called *first*, then the ones from React get called

Don't stop event bubbling (unless you really have to)

To get a Ref to a component:

useRef

const ref = useRef()

put in JSX: <div ref={ref}>...</div>

Then, when it's loaded, ref.current will be a reference to the component

To see if the event target is within a ref:
const ref = useRef();
document.body.addEventListener('click', e => {
  if (ref.current.contains(e.target)) {
    return
  }
  setOpen(false)
})
}, [])


React Router: used for navigation within an app

window.location shows URL info


window.location.pathname == "/translate" 
it's "/" is at root


Elements provided "within" a component are available in the `children` 

To update the URL without actually causing a navigation:

window.history.pushState({}, "", "/newurl")

Dispatch event:
const navEvent = new PopStateEvent('popstate')
window.dispatchEvent(navEvent)


Create-React-App

Deployment Bundle (all static files):
- index.html
- bundle.js
- image.jpg
- index.css

Don't need node or any vm for the prod bundle.
Hosting static files is very cheap, practically free.

Vercel: vercel.com
$ npm install -g vercel
$ vercel login
$ vercel # first time setup
$ vercel --prod # updates


Redux!
- State management library
- makes complex apps easier

Redux cycle: **Action Creator -> Action -> dispatch -> Reducers -> State**

Analogy: Insurance company
policy: what a customer holds, if bad happens, we pay.
claim: customer had a bad thing happen, we pay them.


```
Action Creator       -> Action -> dispatch  -> Reducers -> State
person drop off form -> form   -> secretary -> Depts    -> compiled dept data
```