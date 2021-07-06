<template>
  <div class="comming-soon">
    <p class="_fm">- Coming Soon -</p>
    <router-link to="/">Homepage</router-link>
  </div>
</template>

<script>
// eslint-disable-next-line prettier/prettier
const buildingPath = [
  '/heros',
  '/mine/heros',
  '/mine/backpack',
  '/explore',
]

export default {
  name: 'ComingSoon',
  beforeRouteEnter(to, _, next) {
    if (buildingPath.includes(to.path)) {
      return next()
    } else {
      return next('/404')
    }
  },
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
