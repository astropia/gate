<template>
  <nav id="astro-nav">
    <div class="main-title _fm">Astropia</div>
  </nav>
</template>

<script>
export default {
  name: 'AstropiaNav',
}
</script>

<style lang="stylus">
#astro-nav
  position absolute
  top 0
  left 0
  height 150px
  width 100%

  .main-title
    position absolute
    top 16px
    left 90px
    font-size 100px
</style>
