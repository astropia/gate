<template>
  <div class="heros">
    <div></div>
    <div>
      <p>此次召唤将从以下角色中随机产出：</p>
      <ul class="heros-pools">
        <li v-for="i in 5" :key="i"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Heros',
}
</script>

<style lang="stylus" scoped>
.heros
  margin-top 40px
  display grid
  grid-template-columns repeat(2, 1fr)
  grid-gap 32px

.heros-pools
  margin-top 24px
  display flex
  li
    margin-right 12px
    width 64px
    height 64px
    background #d8d8d8
    border 1px solid #979797
</style>
