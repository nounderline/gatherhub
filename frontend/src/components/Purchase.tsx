import { useEthers } from '@usedapp/core'
import { Contract } from 'ethers'

import { contract, wethInterface } from '../utils/contract'
import { getTierName } from '../utils/util'

const walletTiers = {} // TODO: improve this makeshift caching

export default ({ logs }) => {
  const { account, library } = useEthers()

  const ownedMembership = logs?.find(({ data: { to } }) => to === account)?.data?.tier || walletTiers[account as string]

  const buyMembership = async (tier: number) => {
    // TODO: refactor to use usedapp's useContractFunction
    const signer = library?.getSigner()
    const address = await signer?.getAddress()
    const ctr = new Contract(contract.address, wethInterface, signer)
    const tierPrice = await ctr[`tier${tier}Price`]()
    await ctr.purchaseNFT(tier, address, { value: tierPrice })
  }

  if (ownedMembership) {
    walletTiers[account as string] = ownedMembership
    return (<div>
      Tier: {getTierName(ownedMembership)}
    </div>)
  }

  return (
    <div>
      <div>
        <button onClick={() => buyMembership(1)}>Buy Tier {getTierName(1)}</button>
        <button onClick={() => buyMembership(2)} style={{ margin: '0 20px' }}>Buy Tier {getTierName(2)}</button>
        <button onClick={() => buyMembership(3)}>Buy Tier {getTierName(3)}</button>
      </div>
    </div>
  )
}
