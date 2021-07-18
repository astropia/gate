<template>
  <div class="heros">
    <div class="menu">
      <p class="_fm">Currently Have</p>
      <ul>
        <li v-for="id in list" :key="id" @click="load(id)" :act="focus === id">{{ display(id) }}</li>
        <li v-if="list.length == 0">Empty</li>
      </ul>
      <div class="hero-ecruit _fm" @click="mint">Recruit</div>
    </div>
    <div id="hero-canvas-container"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { hash, txFinished, allNFTs, mintTx } from '@/libs/chain'
import loader from '@/libs/render'

export default {
  name: 'Heros',
  data() {
    return {
      raf: null,
      draw: null,
      prevStop: null,

      list: [],
      focus: '',
      txHash: '',
    }
  },
  computed: {
    ...mapState({
      address: (state) => state.user.address,
      connector: (state) => state.connector,
    }),
  },
  watch: {
    address() {
      this.update()
    },
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
      if (!this.address) {
        this.list = []
      } else {
        this.list = await allNFTs(this.address)
      }
      this.load(this.list[0])
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
    async mint() {
      if (!this.address || !this.connector) {
        return
      }
      const tx = mintTx(this.address)
      const txHash = await this.connector.sendTransaction(tx).catch(() => false)
      if (!txHash) {
        return
      }
      this.txHash = txHash
      this.check()
    },
    async check() {
      if (!this.txHash) {
        return
      }
      const status = await txFinished(this.txHash)
      if (status) {
        this.txHash = ''
        this.update()
      }
      setTimeout(this.check, 2000)
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

@keyframes move
  0%
    transform translateX(-50%)
  100%
    transform translateX(-80%)
</style>
