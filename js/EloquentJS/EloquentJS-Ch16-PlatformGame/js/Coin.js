import Vec from './Vec.js'
import State from './State.js'

export default class Coin {
  constructor(pos, basePos, wobble) {
    this.pos = pos
    this.basePos = basePos
    this.wobble = wobble
  }
  get type() {
    return 'coin'
  }
  static create(pos) {
    const basePos = pos.plus(new Vec(0.2, 0.1)),
      wobble = Math.random() * Math.PI * 2

    return new Coin(basePos, basePos, wobble)
  }
}
Coin.prototype.size = new Vec(0.6, 0.6)

Coin.prototype.collide = function (state) {
  let others = state.actors.filter(a => a != this)
  let status = state.status
  if (!others.some(a => a.type == 'coin')) status = 'won'
  return new State(state.level, others, status)
}

const wobbleSpeed = 8,
  wobbleDist = 0.07

Coin.prototype.update = function (time) {
  let wobble = this.wobble + time * wobbleSpeed
  let wobblePos = Math.sin(wobble) * wobbleDist
  return new Coin(
    this.basePos.plus(new Vec(0, wobblePos)),
    this.basePos,
    wobble
  )
}
