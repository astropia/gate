<template>
  <div id="homepage">
    <div class="home-banner">
      <div class="bg"></div>
      <div class="bg-dark"></div>
      <div class="title">
        <img src="@/assets/logo.png" width="330" alt="logo" />
        <div class="_fm">Creator Metaverse</div>
        <p>with NFT Games</p>
      </div>
    </div>

    <div class="home-story" :style="{ transform: `translateY(${-scrollY * 0.09}px)` }">
      <div class="bg _fm">
        <span :style="{ transform: `translateY(${scrollY * 0.03}px)` }">The Story</span>
      </div>
      <p>
        Dungeons & Dragons (commonly abbreviated as D&D or DnD) is a fantasy tabletop role-playing game (RPG) originally
        designed by Gary Gygax and Dave Arneson.It was first published in 1974 by Tactical Studies Rules, Inc. (TSR).It
        has been published by Wizards of the Coast (now a subsidiary of Hasbro) since 1997. The game was derived from
        miniature wargames, with a variation of the 1971 game Chainmail serving as the initial rule system.D&D's
        publication is commonly recognized as the beginning of modern role-playing games and the role-playing game
        industry.
      </p>
    </div>

    <div class="home-mint">
      <img class="heros" height="560" src="@/assets/homepage/heros.jpg" />
      <div class="bg">
        <div class="bg-1"></div>
        <div class="bg-2"></div>
      </div>
      <div class="intro">
        <p class="_fm">First Human Clan pack is Released!</p>
        <div class="mint">Mint Your First Hero</div>
      </div>
    </div>

    <div class="home-intro">
      <div class="left">
        <p class="_fm">
          <span>Collectable</span>
          <span>Playable</span>
          <span>Community-owned</span>
        </p>
        <div class="title _fm">Why Astropia</div>
      </div>
      <div class="right">
        <div class="title _fm">Why Astropia</div>
        <p>
          Dungeons & Dragons (commonly abbreviated as D&D or DnD) is a fantasy tabletop role-playing game (RPG)
          originally designed by Gary Gygax and Dave Arneson.It was first published in 1974 by Tactical Studies Rules,
          Inc. (TSR).It has been published by Wizards of the Coast (now a subsidiary of Hasbro) since 1997. The game was
          derived from miniature wargames, with a variation of the 1971 game Chainmail serving as the initial rule
          system.D&D's publication is commonly recognized as the beginning of modern role-playing games and the
          role-playing game industry.
        </p>
      </div>
    </div>

    <div class="home-roadmap">
      <div>
        <p class="title _fm">Roadmap</p>
        <ul>
          <li class="active">
            <p>release first pack</p>
          </li>
          <li>
            <p>start on-chain adventure</p>
            <p>continue release more packs</p>
          </li>
          <li>
            <span>after 2 races spanack finished</span>
            <p>publish on chain combat</p>
          </li>
          <li>
            <p>release first metaverse-based NFT game</p>
          </li>
          <li>
            <p>game jam</p>
          </li>
          <li>
            <p class="_fm">beyond imagination</p>
          </li>
        </ul>
      </div>
    </div>
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
    position absolute
    width 100%
    height 100%
    background-image url('~@/assets/homepage/banner.jpg')
    background-size cover
    background-position center
  .bg-dark
    position absolute
    width 100%
    height 100%
    background-image url('~@/assets/homepage/banner_dark.jpg')
    background-size cover
    background-position center
    animation breath 2s ease-in-out infinite alternate

.home-story
  padding-bottom 78px
  background-color #252131
  position relative
  p
    margin auto
    max-width 800px
    width 90%
    font-size 18px
    line-height 22px
    text-align center
    position relative
    top -10px
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
  background-color #76fffe
  position relative
  &:before
    content ''
    position absolute
    right 0
    top 0px
    width 100%
    height 1000px
    background-color #76fffe
    transform skewY(2deg)
    transform-origin 100% 0
  .heros
    position absolute
    bottom 0
    left 50%
    transform translateX(-660px)

  .intro
    position absolute
    top 50%
    left 50%
    display flex
    flex-direction column
    align-items center
    transform translate3d(90px, -50%, 0)
    p
      font-size 18px
      color #070707
  .mint
    margin-top 50px
    width 360px
    height 80px
    border-radius 12px
    background-color #7851E7
    font-size 24px
    display flex
    justify-content center
    align-items center
    cursor pointer

  .bg
    position absolute
    top 0
    left 0
    right 0
    bottom -300px
    overflow hidden
    transform skewY(2deg)
    transform-origin 100% 0
    >div
      position absolute
      width 510px
      height 460px
      border-radius 50%
      filter blur(180px)
    .bg-1
      right 10%
      top -60px
      background #FFD3DB
    .bg-2
      right -8%
      top 310px
      background #B6AAFF


.home-intro
  background-color #fff
  position relative
  display grid
  grid-template-columns repeat(2, 1fr)
  >div
    overflow hidden
    position relative
    .title
      position absolute
      bottom 30px
      width 620px
      text-align center
      font-size 80px
      line-height 80px
      color transparent
      opacity .7

  .left
    padding 56px 100px
    >p
      color #000
      font-size 36px
      line-height 50px
      display flex
      flex-direction column
      align-items flex-end
      position relative
    >p:before
      content ''
      line-height 50px
      position absolute
      right -100px
      top 54px
      border-top solid 24px transparent
      border-right solid 24px #252131
      border-bottom solid 24px transparent
    >p:after
      content '🕹'
      font-size 36px
      line-height 50px
      position absolute
      right -54px
      top 50px
    .title
      right -285px
      -webkit-text-stroke 1px #7851E7
  .right
    padding 60px 80px 70px
    background-color #252131
    >p
      max-width 400px
      font-size 18px
      line-height 22px
      position relative
    .title
      left -335px
      color #7851E7

.home-roadmap
  padding 90px 20px
  background-color #443868
  >div
    margin auto
    max-width 820px
  .title
    font-size 36px
  ul
    margin-top 40px
    font-size 24px
    position relative
    &:before
      content ''
      width 1px
      height 100%
      background-color #fff
      position absolute
      left 16px
      top 0
  li
    padding-left 46px
    position relative
    display flex
    flex-direction column
    &:before
      content ''
      width 11px
      height 11px
      background-color #fff
      border-radius 50%
      border solid 11px #443868
      position absolute
      left 0
      top 50%
      transform translateY(-50%)
    &:not(:first-child)
      margin-top 34px
    span
      font-size 18px
      opacity .5
  .active:after
    content ''
    width 21px
    height 21px
    border-radius 50%
    border dashed 1px #fff
    position absolute
    left 5px
    top 50%
    transform translateY(-50%)
    animation rotate 6s linear infinite

@keyframes breath
  from
    opacity 0
  to
    opacity .8

@keyframes rotate
  from
    transform translateY(-50%) rotate(360deg)
  to
    transform translateY(-50%) rotate(0deg)
</style>
