<template>
  <div id="homepage">
    <div class="home-banner">
      <div class="title">
        <img src="@/assets/logo.png" width="330" alt="logo" />
        <div class="_fm">Creator Metaverse</div>
        <p>with NFT Games</p>
      </div>
      <div class="bg"></div>
    </div>

    <div class="home-story" :style="{ transform: `translateY(${-scrollY * 0.09}px)` }">
      <p>
        Dungeons & Dragons (commonly abbreviated as D&D or DnD) is a fantasy tabletop role-playing game (RPG) originally
        designed by Gary Gygax and Dave Arneson.It was first published in 1974 by Tactical Studies Rules, Inc. (TSR).It
        has been published by Wizards of the Coast (now a subsidiary of Hasbro) since 1997. The game was derived from
        miniature wargames, with a variation of the 1971 game Chainmail serving as the initial rule system.D&D's
        publication is commonly recognized as the beginning of modern role-playing games and the role-playing game
        industry.
      </p>
      <div class="bg _fm">The Story</div>
    </div>

    <div class="home-mint"></div>

    <div class="home-intro"></div>

    <div class="home-roadmap"></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      scrollY: window.scrollY,
    }
  },
  created() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      this.scrollY = window.scrollY
    },
  },
}
</script>

<style lang="stylus">
#homepage
  background-color #252131

.home-banner
  height 720px
  overflow hidden
  position relative
  .title
    position absolute
    top 200px
    left 10%
    display flex
    flex-direction column
    align-items center
    >div
      margin 18px 0 2px
      font-size 18px
      line-height 26px
  .bg
    width 100%
    height 100%
    background-image url('~@/assets/homepage/banner.jpg')
    background-size cover
    background-position center

.home-story
  padding-bottom 78px
  background-color #252131
  position relative
  p
    margin auto
    max-width 800px
    width 90%
    color #fff
    font-size 18px
    line-height 22px
    letter-spacing 0.1em
    text-align center
    position relative
    top -10px
    z-index 1
  .bg
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-color #252131
    font-size 150px
    color transparent
    -webkit-text-stroke 1px rgba(#7851E7, .7)
    letter-spacing 0.1em
    display flex
    justify-content center
    align-items flex-end
    &:before
      content ''
      border-left solid 100vw #252131
      border-top solid 150px transparent
      position absolute
      right 0
      top -150px

.home-mint
  height 700px
  background-color #9DFBFF
  position relative
  &:before
    content ''
    border-left solid 100vw #9DFBFF
    border-top solid 50px transparent
    position absolute
    right 0
    top -50px

.home-intro
  height 460px

.home-roadmap
  height 660px
  background-color #443868
</style>
