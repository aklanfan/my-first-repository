/**
 * Created by AklanFun on 2018/8/29.
 */
function Tetris (rows, columns) {
  this.config = {
    rows: rows, // 行
    columns: columns, // 列
    speed: 200, // 速度ms
    globalMap: [], // 全局地图
    map: [], // 下落中的方块
    stoneMap: [], // 已经落地的方块
    reference: { // ？
      row: 0,
      column: 0
    },
    interval: null, // 定时器
    isParse: false // 是否暂停
  }
  return this
}
Tetris.prototype = {
  // 初始化
  init () {
    this.createGlobalMap()
    this.createMap(1, 0)
  },
  // 生成全局地图
  createGlobalMap () {
    for (let r = 0; r < this.config.rows; r++) {
      for (let c = 0; c < this.config.columns; c++) {
        this.config.globalMap.push({
          row: r,
          column: c,
          active: false
        })
      }
    }
  },
  // 生成新的方块
  createMap (sharp, type) {
    let mapArr = []
    if (sharp === 1 && type === 0) {
      mapArr = [[-1, 4], [-1, 5], [0, 4], [0, 5]]
    }
    this.config.map = mapArr.map(map => {
      return {
        row: map[0],
        column: map[1],
        active: true
      }
    })
    // this.reRender(this.config.map)
    this._setInterval()
  },
  // 设置定时器
  _setInterval () {
    this.config.interval = setInterval(() => this.drop(this.config.map), this.config.speed)
  },
  // 新的状态 active: 下落中  stone: 已落地
  reRender (map, props) {
    return new Promise((resolve, reject) => {
      map.forEach((item, index, array) => {
        let i = item.row * 10 + item.column
        if (i >= 0) {
          props.forEach(prop => (this.config.globalMap[i][prop] = true))
        }
        if (index === array.length - 1) resolve()
      })
    })
  },
  // 清除旧的状态
  clearRender (map, props) {
    map.forEach(item => {
      let index = item.row * 10 + item.column
      if (index >= 0) {
        props.forEach(prop => (this.config.globalMap[index][prop] = false))
      }
    })
  },
  // 掉落 清除active状态 => 计算是否已落地 => 重新渲染
  drop (map) {
    this.clearRender(map, ['active'])
    if (map.some(item => item.row >= this.config.rows - 1 || this.config.globalMap[(item.row + 1) * 10 + item.column].active)) {
      this.settleDown(map)
    } else {
      map.forEach(item => {
        item.row += 1
      })
    }
    this.reRender(map, ['active'])
  },
  // 左移
  moveLeft (map) {
    this.clearRender(map, ['active'])
    if (map.some(item => item.column === 0)) {
      // 到达最左侧
    } else {
      map.forEach(item => {
        item.column -= 1
      })
    }
    this.reRender(map, ['active'])
  },
  // 右移
  moveRight (map) {
    this.clearRender(map, ['active'])
    if (map.some(item => item.column >= this.config.columns - 1)) {
      // 到达最右侧
    } else {
      map.forEach(item => {
        item.column += 1
      })
    }
    this.reRender(map, ['active'])
  },
  // 清除定时器
  _clearInterval () {
    clearInterval(this.config.interval)
  },
  // 落地
  settleDown (map) {
    this._clearInterval()
    this.reRender(map, ['stone']).then(() => {
      this.config.stoneMap = this.config.stoneMap.concat(map)
      this.computedState(this.config.stoneMap)
      this.createMap(1, 0)
    })
  },
  // 计算状态 是否满足消除条件
  computedState (stoneMap) {
    let rows = this.config.rows
    let columns = this.config.columns
    let clearStart = 0
    let clearRows = []
    for (let r = rows - 1; r >= 0; r--) {
      let thisRow = stoneMap.filter(item => item.row === r)
      if (thisRow.length === columns) {
        if (!clearStart) clearStart = r
        clearRows.push(r)
        this.clearRender(thisRow, ['active', 'stone'])
        // this.clearStone(stoneMap, r)
      }
    }
    this.clearStone(stoneMap, clearRows).then(() => {
      this.drops(clearStart, clearRows.length)
    })
    // this.drop(stoneMap)
  },
  // 排满一行后，从stoneMap中删除
  clearStone (stoneMap, clearRows) {
    return new Promise((resolve, reject) => {
      clearRows.forEach((row, index) => {
        for (let i = 0; i < stoneMap.length; i++) {
          if (stoneMap[i].row === row) {
            stoneMap.splice(i, 1)
            i--
          }
          if (i === stoneMap.length - 1 && index === clearRows.length - 1) resolve()
        }
      })
    })
  },
  // X 消除后 上面的方块往下掉 填补消除后的位置 X
  drops (start, n) {
    let clearRenders = []
    let reRenders = []
    this.config.stoneMap.forEach(item => {
      if (item.row < start) {
        clearRenders.push({ ...item })
        item.row = item.row + n
        reRenders.push({ ...item })
      }
      // item.row = item.row + n
    })
    this.clearRender(clearRenders, ['stone', 'active'])
    this.reRender(reRenders, ['stone', 'active'])
  },
  // 暂停
  parse (isParse) {
    if (isParse) {
      this._setInterval()
    } else {
      this._clearInterval()
    }
    this.config.isParse = !isParse
  }
}
export default Tetris
