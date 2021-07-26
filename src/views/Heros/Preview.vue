<template>
  <div class="heros">
    <div class="menu">
      <p class="_fm">ID</p>
      <div class="preview-id">
        {{ display(id) }}
      </div>
      <div class="hero-ecruit _fm" @click="update">Update</div>
    </div>
    <div id="hero-canvas-container"></div>
  </div>
</template>

<script>
import { hash } from '@/libs/chain'
import loader, { LIST } from '@/libs/render'

export default {
  name: 'Heros',
  data() {
    return {
      raf: null,
      draw: null,
      prevStop: null,

      list: [],
      id: '',
    }
  },
  mounted() {
    this.raf = requestAnimationFrame(this.render)
    this.update()
  },
  beforeDestroy() {
    if (this.prevStop) {
      this.prevStop()
    }
    cancelAnimationFrame(this.raf)
  },
  methods: {
    async update() {
      const salt = hash(new Date().toLocaleString()).substr(2, 30)
      const index = Math.floor(Math.random() * LIST.length)
      this.id = '0x8000000000417374726f70696172ffff' + index.toString(16).padStart(2, '0') + salt
      this.load(this.id)
    },
    async load(id) {
      this.draw = null
      const container = this.$el.querySelector('#hero-canvas-container')
      container.innerHTML = ''

      if (this.prevStop) {
        this.prevStop()
      }

      if (!id) {
        return
      }
      this.focus = id
      const metadata = hash(id).substr(2, 40)
      const index = Number('0x' + id.substr(34, 2))

      const { canvas, render, stop } = await loader(metadata, index)
      this.draw = render
      this.prevStop = stop
      container.appendChild(canvas)
    },
    render() {
      if (this.draw) {
        this.draw()
      }
      this.raf = requestAnimationFrame(this.render)
    },
    display(id) {
      return '0x' + id.substr(34)
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
    animation move 3s forwards

.menu
  margin-left 50%
  padding-left 40px
  padding-top 16px
  width 500px
  border-top solid 1px #fff
  position relative
  z-index 10
  p
    font-size 24px
  li
    font-family monospace
    font-size 16px
    line-height 32px
    color #c5cae9
    cursor pointer
    position relative
    transition transform .2s
    &:before
      content ''
      position absolute
      top 50%
      left -14px
      border-right solid 5px #c5cae9
      border-top solid 5px transparent
      border-bottom solid 5px transparent
      opacity 0
      transform translateY(-50%)
      transition opacity .2s
  li[act]
    transform translateX(-10px)
    &:before
      opacity 1
.hero-ecruit
  margin-top 40px
  font-size 24px
  text-decoration underline
  cursor pointer
.hero-preview
  display inline-block
  margin-top 16px
  color #c5cae9
  opacity .4
  transition opacity .2s
  &:hover
    opacity 1
.preview-id
  font-size 18px
  font-family monospace

@keyframes move
  0%
    transform translateX(-50%)
  100%
    transform translateX(-80%)
</style>
