<template>
  <section class="button" @click="$emit(type)">{{text}}</section>
</template>
<script>
export default {
  name: 'button-default',
  props: ['text', 'type']
}
</script>
<style scoped>
  .button {
    width: 34.5rem;
    height: 3rem;
    margin: 1rem 1.5rem;
    border-radius: 1.5rem;
    border: 1px solid #333;
    line-height: 3rem;
    text-align: center;
  }
</style>
