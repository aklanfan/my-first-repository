<template>
  <div>
    <banner />
    <div class="title">tetris</div>
    <m-button text="play" type="start" @start="start"></m-button>
  </div>
</template>
<script>
import banner from '../components/banner.vue'
import mButton from '../components/button-primary.vue'
export default {
  name: 'index',
  components: { banner, mButton },
  methods: {
    start () {
      this.$router.push('/game')
    }
  }
}
</script>
<style scoped>
  .title {
    font-size: 3rem;
    line-height: 3;
    text-align: center;
    font-weight: bold;
    color: darkcyan;
  }
</style>
