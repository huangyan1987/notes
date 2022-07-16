export default class State {
  constructor(level, actors, status) {
    this.level = level
    this.actors = actors
    this.status = status
  }
  static start(level) {
    return new State(level, level.startActors, 'playing')
  }
  get player() {
    return this.actors.find(a => a.type == 'player')
  }
}

State.prototype.update = function(time, keys) {
  let actors = this.actors.map(actor => actor.update(time, this, keys))
  let newState = new State(this.level, actors, this.status)
  if (newState.status != 'playing') return newState
  let player = newState.player
  if (this.level.touches(player.pos, player.size, 'lava'))
    return new State(this.level, actors, 'lost')
  for (const actor of actors) {
    if (actor != player && overlap(actor, player))
      newState = actor.collide(newState)
  }
  return newState
}

function overlap(a, b) {
  return a.pos.x + a.size.x > b.pos.x &&
         a.pos.x < b.pos.x + b.size.x &&
         a.pos.y + a.size.y > b.pos.y &&
         a.pos.y < b.pos.y + b.size.y
}