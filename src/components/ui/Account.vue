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
/* eslint-disable no-unused-vars */
import { mapState } from 'vuex'

const CHAIN = {
  chainId: '0x61',
  chainName: 'BSC Test',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: [
    'https://data-seed-prebsc-1-s1.binance.org:8545/',
    'https://data-seed-prebsc-2-s1.binance.org:8545/',
    'https://data-seed-prebsc-1-s2.binance.org:8545/',
    'https://data-seed-prebsc-2-s2.binance.org:8545/',
    'https://data-seed-prebsc-1-s3.binance.org:8545/',
    'https://data-seed-prebsc-2-s3.binance.org:8545/',
  ],
}
const NETWORK = CHAIN.chainId

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
      await this.updateAccount()
      await this.updateChain()
      // window.ethereum.request({ method: 'eth_chainId' }).then(console.log)
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
    async updateAccount() {
      const commit = this.$store.commit
      const status = await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          commit('UPDATE_ADDRESS', accounts[0])
          return true
        })
        .catch(() => false)
      if (!status) {
        // TODO error message
        return
      }

      window.ethereum.addListener('accountsChanged', (accounts) => {
        commit('UPDATE_ADDRESS', accounts[0])
      })
    },
    async updateChain() {
      if (typeof window.ethereum === 'undefined') {
        return
      }
      return window.ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: NETWORK }],
        })
        .catch((e) => {
          switch (e.code) {
            case 4902: // Unrecognized chain ID
              return this.addChain()
            case 4001: // User rejected the request.
            default:
              return
          }
        })
    },
    async addChain() {
      if (typeof window.ethereum === 'undefined') {
        return
      }
      return window.ethereum
        .request({
          method: 'wallet_addEthereumChain',
          params: [CHAIN],
        })
        .catch()
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
