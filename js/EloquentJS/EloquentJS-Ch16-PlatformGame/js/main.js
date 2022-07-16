import Level from './Level.js'
import State from './State.js'

import GameLevels from './GameLevels.js'

function elt(name, attrs, ...children) {
  let dom = document.createElement(name)
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr])
  }
  for (let child of children) {
    dom.appendChild(child)
  }
  return dom
}

class DOMDisplay {
  constructor(parent, level) {
    this.dom = elt('div', { class: 'game' }, drawGrid(level))
    this.actorLayer = null
    parent.appendChild(this.dom)
  }
  clear() {
    this.dom.remove()
  }
}

DOMDisplay.prototype.syncState = function (state) {
  if (this.actorLayer) this.actorLayer.remove()
  this.actorLayer = drawActors(state.actors)
  this.dom.appendChild(this.actorLayer)
  this.dom.className = `game ${state.status}`
  this.scrollPlayerIntoView(state)
}

DOMDisplay.prototype.scrollPlayerIntoView = function (state) {
  let width = this.dom.clientWidth,
    height = this.dom.clientHeight,
    margin = width / 3
  // the viewport
  let left = this.dom.scrollLeft,
    right = left + width,
    top = this.dom.scrollTop,
    bottom = top + height
  let player = state.player
  let center = player.pos.plus(player.size.times(0.5)).times(scale)
  if (center.x < left + margin) {
    this.dom.scrollLeft = center.x - margin
  } else if (center.x > right - margin) {
    this.dom.scrollLeft = center.x + margin - width
  }
  if (center.y < top + margin) {
    this.dom.scrollTop = center.y - margin
  } else if (center.y > bottom - margin) {
    this.dom.scrollTop = center.y + margin - height
  }
}

const scale = 20

function drawGrid(level) {
  let attrs = {
    class: 'background',
    style: `width: ${level.width * scale}px`
  }
  return elt(
    'table',
    attrs,
    ...level.rows.map(row =>
      elt(
        'tr',
        { style: `height: ${scale}px` },
        ...row.map(type => elt('td', { class: type }))))
  )
}

function drawActors(actors) {
  return elt(
    'div',
    {},
    ...actors.map(actor => {
      let rect = elt('div', { class: `actor ${actor.type}` })
      rect.style.width = `${actor.size.x * scale}px`
      rect.style.height = `${actor.size.y * scale}px`
      rect.style.left = `${actor.pos.x * scale}px`
      rect.style.top = `${actor.pos.y * scale}px`
      return rect
    })
  )
}

let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`
// let simpleLevel = new Level(simpleLevelPlan)
// let display = new DOMDisplay(document.body, simpleLevel)
// display.syncState(State.start(simpleLevel))
runGame(GameLevels, DOMDisplay)

function trackKeys(keys) {
  let down = Object.create(null)
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == 'keydown'
      event.preventDefault()
    }
  }
  window.addEventListener('keydown', track)
  window.addEventListener('keyup', track)
  return down
}

const arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp'])

function runAnimation(frameFunc) {
  let lastTime = null
  function frame(time) {
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000
      if (frameFunc(timeStep) === false) return
    }
    lastTime = time;
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

function runLevel(level, Display) {
  let display = new Display(document.body, level)
  let state = State.start(level)
  let ending = 1
  return new Promise(resolve => {
    runAnimation(time => {
      state = state.update(time, arrowKeys)
      display.syncState(state)
      if (state.status == 'playing')
        return true
      else if (ending > 0) { 
        ending -= time
        return true          
      } else {
        display.clear()
        resolve(state.status)
        return false
      }
    })
  })
}

async function runGame(plans, Display) {
  for (let level = 0; level < plans.length;) {
    let status = await runLevel(new Level(plans[level]), Display)
    if (status == 'won') level++
  }
  console.log('You won!')
}