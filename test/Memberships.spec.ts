
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { expect } from 'chai'
import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'

import type { Memberships } from '../typechain-types'

describe('Memberships', () => {
  let deployer: SignerWithAddress
  let alice: SignerWithAddress
  let bob: SignerWithAddress

  let memberships: Memberships

  let tier1Price: BigNumber
  let tier2Price: BigNumber
  let tier3Price: BigNumber

  before(async () => ([deployer, alice, bob] = await ethers.getSigners()))

  beforeEach(async () => {
    const Memberships = await ethers.getContractFactory('Memberships')
    memberships = await Memberships.deploy(deployer.address, 'Warsaw')
    await memberships.deployed()
    tier1Price = await memberships.tier1Price()
    tier2Price = await memberships.tier2Price()
    tier3Price = await memberships.tier3Price()
  })

  describe('Buying Membership', () => {
    it('Allows to buy tier 1 membership for the right value', async () => {
      expect(await memberships.balanceOf(alice.address)).to.eq(0)
      await expect(memberships.connect(alice).purchaseNFT(1, alice.address, { value: tier2Price })).to.be.revertedWith('ERR_VALUE')
      await expect(memberships.connect(alice).purchaseNFT(1, alice.address, { value: tier3Price })).to.be.revertedWith('ERR_VALUE')
      await memberships.connect(alice).purchaseNFT(1, alice.address, { value: tier1Price })
      expect(await memberships.balanceOf(alice.address)).to.eq(1)
    })

    it('Allows to buy tier 2 membership for the right value', async () => {
      expect(await memberships.balanceOf(alice.address)).to.eq(0)
      await expect(memberships.connect(alice).purchaseNFT(2, alice.address, { value: tier1Price })).to.be.revertedWith('ERR_VALUE')
      await expect(memberships.connect(alice).purchaseNFT(2, alice.address, { value: tier3Price })).to.be.revertedWith('ERR_VALUE')
      await memberships.connect(alice).purchaseNFT(2, alice.address, { value: tier2Price })
      expect(await memberships.balanceOf(alice.address)).to.eq(1)
    })

    it('Allows to buy tier 3 membership for the right value', async () => {
      expect(await memberships.balanceOf(alice.address)).to.eq(0)
      await expect(memberships.connect(alice).purchaseNFT(3, alice.address, { value: tier1Price })).to.be.revertedWith('ERR_VALUE')
      await expect(memberships.connect(alice).purchaseNFT(3, alice.address, { value: tier2Price })).to.be.revertedWith('ERR_VALUE')
      await memberships.connect(alice).purchaseNFT(3, alice.address, { value: tier3Price })
      expect(await memberships.balanceOf(alice.address)).to.eq(1)
    })

    it('Allows to buy only one membership per address', async () => {
      expect(await memberships.balanceOf(alice.address)).to.eq(0)
      const txReceiptUnresolved = await memberships.connect(alice).purchaseNFT(1, alice.address, { value: tier1Price })
      await expect(txReceiptUnresolved).to.emit(memberships, 'PurchasedNFT').withArgs(1000000001, 1, alice.address);
      await expect(memberships.connect(alice).purchaseNFT(1, alice.address, { value: tier1Price })).to.be.revertedWith('ERR_PURCHASED')
      expect(await memberships.balanceOf(alice.address)).to.eq(1)
    })
  })
})
