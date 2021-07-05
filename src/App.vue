<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'App',
  components: {
    Nav,
  },
}
</script>

<style lang="stylus">
#app
  padding-top 150px
  min-width 1440px
  position relative
</style>
