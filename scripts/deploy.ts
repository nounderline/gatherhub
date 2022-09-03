import { ethers } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()
  console.info('Deployer address is:', deployer.address)

  const Memberships = await ethers.getContractFactory('Memberships')
  const memberships = await Memberships.deploy(deployer.address, 'Warsaw, Poland')
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

  const deals = [
    {
      title: 'Rooms for Hackers at Marriott Hotels',
      description: 'Marriott invites all crypto hackers for our special deal!',
      hint: '10%',
      redeemUrl: 'https://www.marriott.com/default.mi',
    },
    {
      title: 'Affordable Uber rides for all Crypto Hackers',
      description: "Affordable rides for hackers who don't know how to make money.",
      hint: '30%',
      redeemUrl: 'https://www.marriott.com/default.mi',
    },
    {
      title: 'Healthy food for Degens',
      description: 'We have a healthy food to help out degenerates come to life',
      hint: '13%',
      redeemUrl: 'https://www.marriott.com/default.mi',
    },
  ]
  for (const index in deals) {
    // @ts-ignore
    const deal = deals[index]
    await memberships.createDeal(deal.title, deal.description, deal.hint, deal.redeemUrl)
    console.info(`Created a deal with title "${deal.title}"`)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
