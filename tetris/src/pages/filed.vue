<template>
  <section>
    <div class="field">
      <div class="item" v-for="item in globalMap" :key="item.row + '' + item.column" :class="{ 'active': globalMap[item.row * 10 + item.column].active, 'stone' : globalMap[item.row * 10 + item.column].stone }"></div>
    </div>
    <div class="operate">
      <div>
        <div class="move" @click="tetris.moveLeft(map)">L</div>
        <div class="move" @click="tetris.moveRight(map)">R</div>
        <div class="rotate"></div>
      </div>
      <div>
        <div class="move" @click="tetris.parse(isParse)">P</div>
      </div>
    </div>
  </section>
</template>
<script>
import Tetris from '../utils/tetris'
export default {
  name: 'field',
  data () {
    return {
      tetris: null,
      rows: 15,
      columns: 10
    }
  },
  computed: {
    globalMap () {
      return this.tetris.config.globalMap
    },
    map () {
      return this.tetris.config.map
    },
    isParse () {
      return this.tetris.config.isParse
    }
  },
  created () {
    this.newTetris()
  },
  destroyed () {
    this.tetris._clearInterval()
  },
  methods: {
    newTetris () {
      this.tetris = new Tetris(this.rows, this.columns)
      this.tetris.init()
    }
  }
}
</script>
<style scoped>
  .field {
    width: 30rem;
    height: 45rem;
    margin: 0 auto;
    overflow: hidden;
  }
  .item {
    width: 3rem;
    height: 3rem;
    border: 1px solid #333;
    float: left;
  }
  .active {
    background-color: brown;
  }
  .stone {
    background-color: firebrick;
  }
  .operate {
    margin-top: 2rem;
    padding: 2rem 5rem;
    background-color: rgba(0, 0, 0, .2);
    overflow: hidden;
  }
  .move {
    width: 3rem;
    height: 3rem;
    float: left;
    margin-right: 2rem;
    background-color: #42b983;
    border-radius: .5rem;
    text-align: center;
    line-height: 3rem;
    color: #fff;
    font-weight: bold;
  }
  .rotate {
    margin-right: 0;
    float: right;
    width: 3rem;
    height: 3rem;
    background-color: chocolate;
    border-radius: 50%;
  }
</style>
