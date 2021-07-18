<template>
  <div class="heros">
    <div v-if="!draw" @click="load" class="hero-ecruit _fm">Recruit</div>
    <div id="hero-canvas-container"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import loader from '@/libs/render'

export default {
  name: 'Heros',
  data() {
    return {
      raf: null,
    }
  },
  computed: {
    ...mapState({
      address: (state) => state.user.address,
    }),
  },
  mounted() {
    this.raf = requestAnimationFrame(this.render)
  },
  beforeDestroy() {
    cancelAnimationFrame(this.raf)
  },
  methods: {
    async load() {
      this.draw = null
      const container = this.$el.querySelector('#hero-canvas-container')
      container.innerHTML = ''

      const { canvas, render } = await loader(this.address.substr(2).toLowerCase(), 0)
      this.draw = render
      container.appendChild(canvas)
    },
    render() {
      if (this.draw) {
        this.draw()
      }
      this.raf = requestAnimationFrame(this.render)
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/color.styl'

.heros
  margin-top 40px
  position relative
  >>>canvas
    position fixed
    top 80px
    left 50%
    background-color $main-background
    transform translateX(-50%)
    animation move 2s forwards

.hero-ecruit
  position absolute
  padding 0 40px
  height 60px
  line-height 60px
  border-radius 30px
  font-size 30px
  background-color gray
  cursor pointer
  top 200px
  left 50%
  transform translateX(-50%)

@keyframes move
  40%
    opacity 1
    transform translateX(-50%)
  100%
    opacity 1
    transform translateX(-80%)
</style>
