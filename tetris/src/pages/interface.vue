<template>
  <div class="wrapper">
    <field></field>
  </div>
</template>
<script>
import field from './filed.vue'
export default {
  name: 'interface',
  components: { field }
}
</script>
<style scoped>
  .wrapper {
    width: 100%;
    height: 100vh;
    padding: 1rem;
    background: url('../assets/bg.jpg') no-repeat 100% 100%;
  }
</style>
