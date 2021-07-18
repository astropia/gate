<template>
  <div>
    <div v-if="address" class="_fc">{{ address }}</div>
    <div v-else class="connect-account" @click="connect">
      <img height="24" src="@/assets/logos/metamask.svg" />
      <span>Connect to MetaMask</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Account',
  computed: {
    ...mapState({
      address: (state) => state.user.address,
    }),
  },
  mounted() {
    this.connect()
  },
  methods: {
    async connect() {
      if (typeof window.ethereum === 'undefined') {
        // TODO error message
        return
      }
      const comit = this.$store.commit
      const status = await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          // this.chainId = Number(window.ethereum.chainId)
          comit('UPDATE_ADDRESS', accounts[0])
          return true
        })
        .catch(() => false)
      if (!status) {
        // TODO error message
        return
      }

      window.ethereum.addListener('accountsChanged', (accounts) => {
        comit('UPDATE_ADDRESS', accounts[0])
      })
      // window.ethereum.addListener('chainChanged', this.updateChain)
      this.$store.commit('SET_CONNERCTOR', {
        connector: {
          sendTransaction: (tx) =>
            window.ethereum.request({
              method: 'eth_sendTransaction',
              params: [tx],
            }),
        },
      })
    },
  },
}
</script>

<style lang="stylus">
@import '~@/styles/color.styl'

.connect-account
  height 32px
  width 200px
  border-radius 16px
  background-color $dark-background
  display flex
  justify-content center
  align-items center
  font-size 12px
  cursor pointer
  img
    margin-right 10px
</style>
