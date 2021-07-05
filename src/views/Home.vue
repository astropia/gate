<template>
  <div class="home">
    <div class="home-card">
      <router-link to="/heros">
        <div class="card">
          <span class="_fm">Heros</span>
        </div>
      </router-link>
      <p>
        这里是你召唤英雄的地方，你将随机抽取到不同种族，不同职业，不同能力值，不同稀有度的英雄NFT，这些英雄NFT将是未来你进入各种不同NFT游戏的钥匙。现在英雄池试验性的免费开放，你只需要支付很少的gas费就可以获得自己的英雄。
      </p>
      <div class="button">关于英雄稀有度</div>
    </div>
    <div class="home-card">
      <router-link to="/explore">
        <div class="card">
          <span class="_fm">Explore</span>
        </div>
      </router-link>
      <p>
        持有英雄NFT才可以进入探索世界，这里有无尽的宝藏：装备、特定英雄、剧情卡牌等等。不要太过惊讶，该区域同样也是免费开放的，欢迎来到Astropia宇宙。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang="stylus" scoped>
.home
  padding 140px 0
  display flex
  justify-content center
.home-card
  margin 0 26px
  width 386px
  .card
    height 626px
    background #282d30
    border-radius 10px
    border 1px solid rgba(#fff, 0.38)
    position relative
    cursor pointer
  span
    font-size 50px
    position absolute
    left 22px
    bottom 50px
  p
    margin-top 68px
    padding 0 32px
    font-size 16px
    line-height 32px
  .button
    margin-top 32px
    text-align center
    font-size 20px
    line-height 32px
    cursor pointer
</style>
