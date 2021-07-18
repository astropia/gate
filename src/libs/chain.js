import Web3 from 'web3'

import ASTROPIA_ABI from './abi/Astropia.abi.json'
import POOL_Z_ABI from './abi/Pool.z.abi.json'

const ASTROPIA_ADDR = '0x8b329672AADab7fC05F37aD9a97f4b62DE0f90fF'
const POOL_Z_ADDR = '0x09D8e7E55285CA3c1603E26a1D096Ed0b68C8d9D'

const NFT_TYPE = '0x8000000000417374726f70696172000000000000000000000000000000000000'

const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/')
const astropia = new web3.eth.Contract(ASTROPIA_ABI, ASTROPIA_ADDR)
const pool_z = new web3.eth.Contract(POOL_Z_ABI, POOL_Z_ADDR)

export const hash = (input) => {
  return web3.utils.keccak256(input)
}

export const txFinished = async (txHash) => {
  return web3.eth.getTransactionReceipt(txHash).then((tx) => tx && tx.status)
}

export const allNFTs = async (owner) => {
  const result = await astropia.methods
    .allNonFungibleOf(owner, NFT_TYPE)
    .call()
    .then((result) => result.map((id) => web3.utils.toHex(id)))
    .catch(() => [])
  return result.reverse().slice(0, 10)
}

export const mintTx = (from) => {
  const data = pool_z.methods.mint().encodeABI()
  return {
    from,
    to: POOL_Z_ADDR,
    data,
  }
}
