import Vec from './Vec.js'
import Lava from './Lava.js'
import Coin from './Coin.js'
import Player from './Player.js'

const levelChars = {
  '.': 'empty',
  '#': 'wall',
  '+': 'lava',
  '@': Player,
  'o': Coin,
  '=': Lava,
  '|': Lava,
  'v': Lava
}

export default class Level {
  constructor(plan) {
    let rows = plan
      .trim()
      .split('\n')
      .map(lvl => [...lvl])
    this.height = rows.length
    this.width = rows[0].length
    this.startActors = []

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        let type = levelChars[ch]
        if (typeof type == 'string') return type
        let vec = new Vec(x, y)
        this.startActors.push(type.create(vec, ch))
        return 'empty'
      })
    })
  }
}

Level.prototype.touches = function (pos, size, type) {
  let xStart = Math.floor(pos.x),
    xEnd = Math.ceil(pos.x + size.x),
    yStart = Math.floor(pos.y),
    yEnd = Math.ceil(pos.y + size.y)

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height
      let here = isOutside ? 'wall' : this.rows[y][x]
      if (here == type) return true
    }
  }
  return false
}
