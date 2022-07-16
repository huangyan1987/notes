 Picking up React again:
$ npx create-react-app my-app
$ cd my-app
$ npm start

- TypeScript
- React
    - Router: React Router
    - State mgmt: Redux vs Hooks vs Context API
    - Testing: Jest + React Testing Library + Cypress
    - UI: React Bootstrap, Material-UI,  Ant Design, Chakra UI
    - Styling: Sass/Less, Styled components
    - Async: Redux-saga
    - Forms: React Hook Form
    - Next.js
    - Misc:
        - Dates: Moment, dayjs
        - Http: Axios
        - Static generator: Gatsby
- Node.js
    - Express
- GraphQL
- Postgres
- Electron

/*****************************************************************************/

June 2021

Complete React Developer in 2021 (w/ Redux, Hooks, GraphQL)
https://www.udemy.com/course/complete-react-developer-zero-to-mastery/


# Some History

First: html, js, css (Geocities era; minimal js or jQuery, Dojo)
Then, more complex pages: HTML, JS, CSS (Early FB era, Bootstrap.js)
Then, SPA (Single-page applications) became more like desktop applications: More JS (Gmail)

AngularJS by Google

MVC or MVVM (Model-view-viewmodel)

JS Conf 2013 React released: facebook.github.io/react, now reactjs.org

Then AngularJS -> Angular. FB backing React boosted its popularity


# React Concepts

1. Don't touch the DOM

Imperative: change individual parts based on events

Direct updates to the DOM do:
    1. repaint, change element and add
    2. reflow, recalculate the layout

React uses declarative programming: say what "is" not "how"

2. Build websites like Lego w/ reusable components

Why react? 

Separates State from Components

JSX : XML syntax within JS

function React(state, components) {
    // Creates a Virtual DOM
}


3. Unidirectional data flow

4. UI, The rest is up to you

Declarative: give React state & components (built with JSX and they sometimes receive properties, called "Props") and it updates the virtual DOM

How to be a great React Dev:
1. Decide on Components
2. Decide the State and where it lives
3. What changes when the state changes


NVM: Node Version Manger
NPM: Node Package Manger
Yarn: alt to npm when npm was bad

# NPM vs Yarn

Install from package.json:
npm install
yarn

Install and add to package.json:
npm install package --save # or package@latest
yarn add package

Install a devDependency to package.json:
npm install package --save-dev
yarn add package --dev

Remove dep from package.json:
npm uninstall package --save
yarn remove package

Upgrade package to latest:
npm update --save
yarn upgrade

Install a package globally, use with care!
npm install package -g # or --global
yarn global add package

# First project

create-react-app

comes with Babel & Webpack so we can code w/ latest JS and work on older browsers

react-scripts does a lot of lifting for us, for ease of use

build takes all files under src/ does webpack+babel and then outputs into the build/ folder

eject outputs all the config files that are hidden by default

ReactDOM.render(<App />, document.getElementById('root')); // root is where the App is inserted

Babel: turns JSX into JS, and what's supported
Webpack: bundles, minifies, and optimizes for web

# Classes vs Hooks

Hooks are newer, hyped, specific to React, and can add complexity

# First class

```
import React, {Component} from 'react';
// Component is a class with a render() method, that should return JSX

class App extends Component {

    constructor() {
        super();
        this.state = {
            string: "Howdy!"
        };
    }
    render() {
        <SomeHTML />
        <p>{this.state.string}</p>
    }
}
```

State should only be set with setState; **NOT** with this.state.something = newVal

HTML: onclick class
JSX: onClick className

Each child in a list should have a unique "key" prop.

Each element needs a key that's unique:
`<h1 key={some.key}></h1>`


React.Component comes with lifecycle methods: componentDid- and componentWill-, e.g. componentDidMount

mount = inserted into the tree

Components that are functions, take in a `props` parameter. One property (haha) that is usually on props is props.children. props.children is the elements passed to the Component: e.g. <Mine>children</Mine>, children are what's between the angle-tags

Don't forget to import CSS that your component needs

State is passed down via props. When the top level state updates, the children components are updated and re-renders. The props bind the children with the parent.

# Events

`<input onChange={e => console.log(e)}`

e.target is the html element, the input element
e.target.value is the inner value of the input


⭐️ Component this.setState is ASYNC, so you can't just setState(...); console.log(this.state); you won't see the latests

setState takes a callback: setState(newState, () => console.log(this.state));

React uses "Synthetic Events" 

If you don't need state nor lifecycle methods, you can just use a React function

As per old-school JS, careful with `this` in event handlers

You cannot just move an event handler to a Component method. The `this` value won't be bound correctly. If you want to move a handler to a method, use either `this.handler = this.handler.bind(this);` in the ctor OR use `handler = (e) => (this.setState({yada: e}))` in the class body

See https://reactjs.org/docs/handling-events.html

Generally, if you're referring to a function, like this.someMethod, it's typically best to bind it so there's no confusion about the value of `this`

You *can* just always use `() => this.someMethod()` but that does create a new callback each time, which can have bad perf


# Using Github pages

```
$ yarn add gh-pages
$ yarn deploy # then git push changes
```

Then check the settings > pages


# React vs React-dom

React is the underlying engine. react-dom is the view layer for the web; the alternative to react-dom is react-native, which is build for Android & iOS apps. react-360 for virtual reality, etc

# "Pure js" React

JSX is just a wrapper for React.createElement(tag, attributes, children)

# yarn package.json

no symbol: pull in this exact version
^1.0: pull in the latest, non-breaking version

`yarn list <pkg-names>`

yarn install # do this after any changes to package.json
yarn upgrade # this actually upgrades

yarn.lock: auto generated file to lock the versions 

for npm, it's mostly the same:

`npm list <pkg-names>`

npm install # this may skip over versions npm thinks it doesn't need to update
npm update

# React & MVC

State -> Views -> Actions -> State etc.

In React, the views are built from state. Then, actions on the views update the state.

# State & Async

Remember that setState is ASYNC! React can delay or batch updates optimally

This also means you shouldn't use this.state within the call, because it could've changed

Instead, you can use the function version of setState, which is:
(prevState, prevProps) => newState

This is much like Clojure's swap!

# Props

explicitly send `props` to the constructor of Components:

constructor(props) {
    super(props)
}

# Lifecycles

⭐️ See https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

1. ctor
2. render()
3. componentDidMount() // like the base mounted state
4. Updating: new props, setState(), forceUpdate()
    4.1. shouldComponentUpdate // false can stop the rest, unless doing a forceUpdate()
    4.2. render() again!
    4.3. componentDidUpdate

After render() is when the DOM is actually updated with what's been changed in the Virtual DOM

Unmounting: calls componentWillUnmount(), where to do cleanup

After unmount, then the full lifecycle restarts

Remember:

If you don't need local state nor need access to lifecycle methods in a component, you can use a Functional component (which is effectively a lambda function for the render method).
Otherwise, use Class components as they provide state mgmt and access to lifecycle methods.

---

Remember React fundamentals:
1. Don't touch the DOM
2. Build sites like lego
3. Unidirectional data flow
4. React gives UI, the rest is up to you

1. Decide on components
2. Decide on State & where it lives
3. What changes when state changes?

Instead of:
`npx create-react-app crwn-clothing`
do:
`npx create-react-app crwn-clothing --template cra-template-pwa # PWA = Progressive Web App`

To add SASS, per https://create-react-app.dev/docs/adding-a-sass-stylesheet/
`yarn add node-sass`

# Dependency issues

If you have install issues:
```
rm yarn.lock
rm -rf node_modules
yarn # just yarn, to re-install all packages
```

Updating with npm:
```
rm yarn.lock
npm update -D
npm audit fix
npm install # then npm audit, then npm audit fix, rinse&repeat
```

# Style
Each JSX element can take style in the "style" property, and they're in camelCase

# Section 5: React Router and Routing

SPAs (Single Page Applications) have an issue with updating the URL and handling Back

Routing is basically just pointing the paths where they belong

```
$ yarn add react-router-dom

import {Route} from 'react-router-dom'
<Route exact path="/topic/:topicId" component/>
```

Where :topicId is a path parameter aka route paramter

The component get a param with `{history, location, match}`
    match has {params}, the URL parameters

This creates an "inplace" URL (remember, React is basically an SPA)
<Link to="..."/>

This doesn't actually create an ahref, so the whole page isn't completely refreshed.

The alternative is to use a button, with onClick={() => props.history.push('/topics')}

props.location has props.location.pathname

Only the component passed into Route receives the route props, `{history, location, match}`

To send down the props, you could pass it along each one, called "prop tunneling" or "prop drilling" (or more broadly, shotgun surgery)

import {withRouter} from 'react-router-dom'

withRouter takes in a component and returns a new component, a higher-order component

export default withRouter(MenuItem); // now have access to history in props

# Spread props

Here, id is used for key, so still need to use that, but the rest are all using the same keys, like history={history}, etc

{id, ...otherProps} => (<MenuItem key={id} {...otherProps} />)

Obviously, the render method is called on every state change, so if it's looping through a large data set, that can hurt perf

For CSS, pay close attention to the inheritance shown in the Inspect. Can see when attributes are overwritten

# Import SVG

https://create-react-app.dev/docs/adding-images-fonts-and-files/

import { ReactComponent as Logo } from './your.svg'
<Logo />


when you import a file, you get a string, which is the path of the actual file:
import logo from './logo.png'
`<img src={logo} alt='logo'/>`

Using the `import {ReactComponent as Logo}` is special b/c it tells React to make a component for the asset 

Lift up state only as "high" as it's needed

https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form


# Component template:

```
import React from 'react'
import './TK.scss'

const TK = ({}) => (<div></div>)
export default TK

/**************** OR *********/

import React from 'react'
import './TK.scss'

class TK extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <div></div>
  }
}

export default TK
```

Functional components are also called "presentation/al components"


# Section 7: Integrating with Firebase

Project overview > web > 

$ yarn add firebase


get user from:

auth.onAuthStateChanged(user => this.setState({user}))

When you just add a flag prop, like:
<Something someProp/>

it's equivalent to setting someProp = true

Firestore is NoSQL

firestore.collection('users').doc(docId).collection('cartItems').doc(anotherDocId)


Get a QueryReference, like a db cursor. It doesn't have the actual data, but it tells details about it.
call with firestore.doc or firestore.collection

DocumentRef has set get update delete methods
CollectionRef has add

DocumentSnapshop allows checking if a doc exists using .exists prop
.data() gets actual properties as json

# Section 8: Redux

Redux does away with this.state and instead uses only props and a single, massive data store

- Redux is good for managing large state. React is good at the view layer, but Redux handles the state layer.
- Userful for sharing data between components
- Predictable state mgmt using the 3 principles:
    1. Single source of truth
    2. State is read only (immutability)
    3. Changes using pure functions

(These all look like Functional Programming fundamentals)

Redux flow: action -> root reducer -> store -> dom changes

Redux is an instance of the "Flux pattern"

**Flux: Action -> Dispatcher -> Store -> View**
one-way data flow, versus MVC which can have complicated interactions between components

MVC: Action -> Controller ->* Model *<->* View

It's common to keep only important state in the Redux State, keeping UI-specific, like form inputs, in this.state

Components -> Actions -> Update each Reducer -> Root Reducer (App State) -> Pass state as props -> Components

Middleware can sit between the Actions and the Root Reducer
e.g. Redux Logger

yarn add redux redux-logger react-redux
import ___ from 'redux'

1. Make a root reducer:
export default combineReducers({
  user: userReducer
})

2. Make individual reducers, like user reducer:
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state
  }
}
export default userReducer

3. Create a store and add middle wares
const middlewares = [logger]
const store = createStore(rootReducer, applyMiddleware(...middlewares))
export default store

4. Wrap the app in the store Provider:
<Provider store={store}>
    <App/>
</Provider>

5. Connect components to the store with a mapper to translate the global state into component's props:
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})
export default connect(mapStateToProps)(Header) // connect from 'react-redux'

Thoughts: this all feels a lot like the pub-sub code we used to write in pre-ES6 days

---

A component that updates a value that's calculated from the state, like the cart count, is called a selector.

Each state update causes each component to re-render, which can be wasteful since the whole state doesn't always fully change (but it *might* so the default is to re-render everything). The 'reselect' library (get it, named after "react + selectors") does memoization to reduce this waste.

'reselect' provides createStructuredSelector
import { createStructuredSelector } from 'reselect'

which is used with mapStateToProps to only update an element when the part of the state that it cares about changes

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
})

The actual selectors are created with createSelector

import { createSelector } from 'reselect'

# Persistence

localStorage: stored to "disk", survives closing
sessionStorage: stored in "ram", survives refreshes

window.localStorage.setItem(key, JSON.stringify(val)) // setting with setItem
let val = JSON.parse(window.localStorage.getItem(key)) // getting with getItem

use redux persist:
$ yarn add redux-persist

https://github.com/rt2zz/redux-persist#readme

Should constant/immutable state be handled in redux? can help with testing

# Stripe integration

Fake CC: 4242 x4 01/20 CW 123

# Heroku hosting
`brew tap heroku/brew && brew install heroku`

from within the app:
`heroku create crwn-live --buildpack `

https://github.com/mars/create-react-app-buildpack.git
more info here: https://github.com/mars/create-react-app-buildpack

git push heroku main

You can setup automaticaly deployment from github: https://devcenter.heroku.com/articles/github-integration


# Firebase

Document or Collection

queryReference reps the "current" place in the database
(sounds like a cursor?)
get from either:
  firestore.doc('/users/:userId');
  firestore.collections('/users');


use documentRef to perform CRUD methods: set get update delete
can add docs to collections using add: collectionRef.add({/* value: prop */})

get snapshopObject from referenceObject using get

documentRef returns a documentSnapshop
collectionRef returns a querySnapshop

You get the data from a snapshop with .data

querySnapshop (is like a collection snapshop) comes from a collectionReference

Firebase is a NoSQL DB


# Observables

{
  next: (nextValue) => { /*do with value*/ }
  error: (error) => { /*do with error*/ }
  complete: () => { /*do when finished*/ }
}

An Observer provides the functions for the Observable to call

subscribe(topic, callbacks)

# Thunk

action creator that returns a function that returns the dispatch

If redux-thunk middleware is enabled, when you dispatch a function instead of an object, the middleware will call that function with dispatch method itself as the first arg

Types of middlewares: Thunks, Sagas, Logger

# Sagas: 'redux-saga'

Sagas are a function that conditionally runs.
The condition is whether or not a specific action is coming into the Saga middleware.

Sagas deal with side-effects: like API calls (async code) or something that triggers an *inpure reaction*

Any async or other impure functions should be moved to Sagas

Reducers trigger before Sagas



# JS Refresh: Generators, function*

function* gen(i) {
    yield i;
    return i + 10;
}
>> undefined
let g = gen(10)
>> undefined
g.next()
>> {value: 10, done: false}
g.next()
>> {value: 20, done: true} // notice that this one is 'done' because we used `return`


Here's what happens if you don't finish with a return, you get an extra undefined value:

function* gen(i) {
    yield i;
    yield i + 10;
}
>> undefined
let g = gen(10)
>> undefined
g.next()
>> {value: 10, done: false}
g.next()
>> {value: 20, done: false}
g.next()
>> {value: undefined, done: true} // BOOM, extra value

Then again, most generators are infinite

Can also pass values into a generator with .next() and they "come out" of the yield

function* f() {
  const x = yield 1 + 1;
  console.log(`x=${x}`)
  yield x + 1
}

var g = f()
>> undefined
g.next('one') // got thrown away
>> {value: 2, done: false}
g.next('two')
> x=two
>> {value: "two1", done: false}
g.next('three')
>> {value: undefined, done: true}

So they executed like:


function* f() {
  'one'; // yield in from .next args, thrown away
  {value: 1 + 1, done: false}; // yielded out
  const x = 'two' // yielded "in" from .next args, kept!
  console.log(`x=${x}`)
  {value: x + 1. done: false}; // yielded
  'three'; yield in, thrown away
}


# Back to Sagas

redux-saga

`import {all, call} from 'redux-saga/effects'`

`yield all([...])` allows calling parallel sagas

prefer to use
```
yield all([
  call(fn) // fn is your function
])
```

# React Hooks (v16.8+)

Hooks are relatively new and are divisive.

Why?
- Class component's lifecycle methods are confusing. Which ones to use when? Confusing with State

How to simplify this.

Hooks allow writing functional components, but provide access to new functionality that was only available to class components.

Hooks are only for functional components.

- useState: allows usage of state (duh) that wasn't available before

  const [name, setName] = useState('Yihua')

To change, use set function, named setName above:

  setName('Andre')

Best to use useState with individual state scalars, not deeply nested objects (though it will allow that)

useEffect is a hook for side effects

  import React, {useState, useEffect} from 'react'

  useEffect(() => {
    console.log("hello")
  })
// fires on mount and on each update (which re-renders)

If you don't want to render on each update:

  useEffect(() => {

  }, states)

states is an array of states to watch and render if they change.
To only execute on first mount, states should be empty array []

useEffect(() => {
  console.log(someState)
}, [someState])


How to do async actions within useEffect? It expects a function. The function can only return another function for cleanup.

const [user, setUser] = useState('name')

useEffect(() => {
  const fetchFn = async () => {
    const response = await fetch(url)
    const json = await response.json();
    setUser(json[0])        /** CAREFUL! If you do this, it can infinite loops! */
  }
  fetchFn() // just call, don't return
}, []) 

It inf loops b/c useEffect is called anytime the state is updated, but it's also updating the state!
So it loops

This is why the empty array is important, it tells useEffect to only run when those states are updated (if any). If the array is empty, it only renders once.

Rules for hooks (https://reactjs.org/docs/hooks-rules.html)
1. Set the dependencies array
2. Put hooks at the top level; not inside loops, conditionals, or nested functions.
3. Only call hooks from React functions


The function passed to useEffect can return a cleanup function. That function is semi-equivalent to the componentWillUnmount method within the React classes

Reacap of useEffect:

ComponentDidMount:
componentDidMount() {
  console.log("I just mounted")
}
useEffect(() => {
  console.log("I just mounted")
}, [])


ComponentWillUnmount:
componentWillUnmount() {
  console.log("I am unmounting")
}
useEffect(() => {
  return () => console.log("I am unmounting")
}, [])


ComponentWillReceiveProps:
componentWillReceiveProps(nextProps) {
  if (nextProps !== this.props.count) {
    console.logs("count changed", nextProps.count);
  }
}
useEffect(() => {
  console.log("count changed", props.count)
}, [props.count])

# Custom Hooks

const useFetch = url => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      fetch(url)
      const dataArray = await res.json()
      setData(dataArray[0])
    };
    fetchData()
  })
  return data
}
export default useFetch


# useReducer

const [state, dispatch] = useReducer(reducer, initState)

state: current state of the reducer
dispatch: the function that allows us to pass actions to our reducer
reducer: function that gets a state and an action and returns some object that represents the state
initState: obvs


const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': 
      return {...state, user: action.payload}
    case 'SET_SEARCH_QUERY':
      return {...state, searchQuery: action.payload}
    default:
      return state;
  }
}

then call:
dispatch(setUser(newUser))

# When to use hooks

Don't use them to replace lifecycle methods on class components

Rather prefer to use them for side-effects of functional components

useEffect ~= useSideEffect

Considerations:
- Like any migration, cost-benefit of new tech vs building new features on old tech
- Start using new trend/tech on new code within old can fragment the code base

Tale as old as time

useSelector:

  const currentUser = useSelector(selectCurrentUser)
  const isHidden = useSelector((state) => state.cart.hidden)

Pretty straightforward & simple

useDispatch:

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])

If you define anon functions, when the component re-renders, the code will execute again. If the code was referenced in an useEffect, that will get called again too

useHistory is trivial:
    const history = useHistory()

# More Hooks

useState & useEffect are 98%

Another 1% are
- useSelector
- useDispatch
- useEffect


useEffect is more complex and misunderstood hooks

useCallback returns a memoized version of the given fn
    const fn = useCallback(() => {
      console.log(test1);
    }, [test1])

useCallback helps memoize functions
useMemo helps memoize objects

    const obj = useMemo(() => ({
      a: "" + test1
    }), [test1])

    useEffect(() => {
      console.log(obj.a)
    }, [obj])


useEffect runs after the DOM paints
useLayoutEffect runs before the DOM paints

useRef gives access to the persistent value across re-renders
The actual value is under .current

    const ourDiv = useRef() // use ourDiv.current gives the current value

    useLayoutEffect(() => {
      ourDiv.current.style.backgroundColor = 'red'
      // if you did this in useEffect, you would have CSS flash problem
    }, [ourDiv])

    return (
      <div id='my-div' ref={ourDiv}>
    </div>
    )

(Skipped the backend tutorial b/c I know backend)

Context API: alternative to redux
https://reactjs.org/docs/context.html
useContext(FooContext)

# GraphQL

Playground: https://crwn-clothing.com/

Example query:
    query {
      collections {
        id title items {
          id name
        }
      }
    }

To setup a GraphQL backend:

https://github.com/dotansimha/graphql-yoga
https://www.apollographql.com/docs/tutorial/introduction/
https://www.prisma.io/
https://hasura.io/


Apollo https://www.apollographql.com/

# NPM ERRORS on MacOS M1 Chip

1. switch to x86
2. install a node version under it, say 

https://github.com/nvm-sh/nvm#macos-troubleshooting



```
# Check what version you're running:
$ node --version
v14.15.4
# Check architecture of the `node` binary:
$ node -p process.arch
arm64
# This confirms that the arch is for the M1 chip, which is causing the problems.
# So we need to uninstall it.
# We can't uninstall the version we are currently using, so switch to another version:
$ nvm install v12.20.1
# Now uninstall the version we want to replace:
$ nvm uninstall v14.15.4
# Launch a new zsh process under the 64-bit X86 architecture:
$ arch -x86_64 zsh
# Install node using nvm. This should download the precompiled x64 binary:
$ nvm install v14.15.4
# Now check that the architecture is correct:
$ node -p process.arch
x64
# It is now safe to return to the arm64 zsh process:
$ exit
# We're back to a native shell:
$ arch
arm64
# And the new version is now available to use:
$ nvm use v14.15.4
Now using node v14.15.4 (npm v6.14.10)
```

OR
    UPDATE: SOLVED

    For anyone that comes across this post and may have a similar problem, the fix was to install node for ARM using Rosetta within the terminal.

    Go to terminal.app in finder, right click and select “get info” then check the box for “open with rosetta"

    Install node with this command arch -arm64 brew install node

TRULY SOLVED:
Needed to upgrade firebase to the latest and follow their upgrade guide
...but did better understand how nvm works

# Performance

Use the React Chrome extension to get data.

Remember the rules of optimizing:
1. DO NOT PREMATURELY OPTIMIZE
2. When you do need to (and you usually do not), THOU SHALT MEASURE

Lazy load & Chunk parts of the app:

```
const MyComp = lazy(() => import("./my-comp.jsx"))
<Suspense fallback{<div>Loading...</div>}>
  <MyComp/>
</Suspense>
```


Memoize & PureComponent:

For functional components, you can use React.memo(MyComp) to skip re-renders when the props don't actually change by using shallow-compare

Similarly, for class components, extends React.PureComponent instead of React.Component gives a similar benefit.

NOTE: Like all things, there's a tradeoff and memoized components have ~+15% cost for the first time. Again, always always measure.

Progressive react: https://houssein.me/progressive-react

Jest cheat sheet: https://github.com/sapegin/jest-cheat-sheet

DONE! WOOO!!!