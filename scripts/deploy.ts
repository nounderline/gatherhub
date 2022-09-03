import { ethers } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()
  console.info('Deployer address is:', deployer.address)

  const Memberships = await ethers.getContractFactory('Memberships')
  const memberships = await Memberships.deploy(deployer.address)
  await memberships.deployed()
  console.info('Memberships deployed to:', memberships.address)

  const tierPrices = {
    1: await memberships.tier1Price(),
    2: await memberships.tier2Price(),
    3: await memberships.tier3Price(),
  }

  // mint to configured addresses
  const mintArray = process.env.MINT_ARRAY?.split(',')
  for (const index in mintArray) {
    // @ts-ignore
    const mint = mintArray[index]
    const [address, tier] = mint.split('.')
    // @ts-ignore
    await memberships.purchaseNFT(+tier, address, { value: tierPrices[tier] })
    console.info(`Membership for address ${address} and tier ${tier} purchased`)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
