<template>
  <nav id="astro-nav">
    <div class="main-title _fm">Astropia</div>
    <Account />
  </nav>
</template>

<script>
import Account from '@/components/ui/Account'

export default {
  name: 'AstropiaNav',
  components: {
    Account,
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

  .main-title
    position absolute
    top 16px
    left 90px
    font-size 100px
</style>
