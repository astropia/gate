<template>
  <nav id="astro-nav" :class="{ 'nav-home': status === NavStatus.AT_HOME }">
    <div class="left-part">
      <router-link v-if="status === NavStatus.NORMAL" class="back-home _fm" to="/">Home</router-link>
      <router-link v-else class="main-title _fm" to="/">Astropia</router-link>
    </div>
    <div class="center-title">
      <span v-if="status === NavStatus.NORMAL" class="_fm">{{ title }}</span>
    </div>
    <div class="right-part">
      <div class="account" :class="{ 'account-home': status === NavStatus.AT_HOME }">
        <Account />
      </div>
      <transition name="fade-up">
        <div class="nav-buttons" v-if="status === NavStatus.AT_HOME">
          <div>
            <i />
            <router-link to="/mine/heros" class="_fm">My Heroes</router-link>
          </div>
          <div>
            <i />
            <router-link to="/mine/backpack" class="_fm">My Backpack</router-link>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script>
import { NamedRoute } from '@/router'
import Account from '@/components/ui/Account'

const NavStatus = {
  ERROR: -1,
  NORMAL: 0,
  AT_HOME: 1,
}

export default {
  name: 'AstropiaNav',
  components: {
    Account,
  },
  data() {
    return {
      NavStatus,
    }
  },
  computed: {
    status() {
      switch (this.$route.name) {
        case NamedRoute.HOMEPAGE:
          return NavStatus.AT_HOME
        case NamedRoute.EMPTY:
        case NamedRoute.HOLDING:
          return NavStatus.ERROR
        default:
          return NavStatus.NORMAL
      }
    },
    title() {
      return this.$route.name
    },
  },
}
</script>

<style lang="stylus">
#astro-nav
  position absolute
  top 0
  left 0
  padding 0 90px
  height 150px
  width 100%
  display flex
  justify-content flex-end
  align-items center
  z-index 100
  transition transform .4s
  .left-part
    flex 0 0 500px
  .right-part
    flex 0 0 500px
    height 0
    position relative
  .center-title
    flex 1 1 auto
    text-align center
    font-size 30px

  .main-title
    position absolute
    top 16px
    left 90px
    font-size 100px
  .back-home
    font-size 30px
    position relative
    display flex
    align-items center
    &:before
      content ''
      margin-right 30px
      width 36px
      height 36px
      border-top solid #fff 3px
      border-left solid #fff 3px
      box-sizing border-box
      transform rotate(-45deg)

  .account
    position absolute
    top -20px
    right 0
    height 40px
    display flex
    align-items center
    transition transform .4s
  .account-home
    transform translateY(-60px)

.nav-home
  transform translateY(60px)

.nav-buttons
  position absolute
  top 0
  right 0
  display flex
  height 45px
  >div
    margin-left 45px
    display flex
    align-items center
  i
    margin 0 13px
    height 45px
    width 26px
    border-top solid 1px #fff
    border-bottom solid 1px #fff
    position relative
    opacity .5
    &:before
      content ''
      height 100%
      width 100%
      position absolute
      top 0
      left 0
      border-top solid 1px #fff
      border-bottom solid 1px #fff
      transform rotate(60deg)
    &:after
      content ''
      height 100%
      width 100%
      position absolute
      top 0
      left 0
      border-top solid 1px #fff
      border-bottom solid 1px #fff
      transform rotate(-60deg)
  a
    margin 0 10px 0 16px
    white-space nowrap

.fade-up-leave-to, .fade-up-enter
  transform translateY(-10px)
  opacity 0
.fade-up-leave-active, .fade-up-enter-active
  transition transform .2s, opacity .2s
</style>
