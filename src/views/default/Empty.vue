<template>
  <div class="comming-soon">
    <p class="_fm">- 404 Not Found -</p>
    <router-link to="/">Homepage</router-link>
  </div>
</template>

<script>
export default {
  name: 'Empty',
}
</script>

<style lang="stylus" scoped>
.comming-soon
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  display flex
  flex-direction column
  justify-content center
  align-items center
  opacity .6
  p
    font-size 50px
  a
    text-decoration underline
</style>
