import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
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

  const getCrypto = () => {
    new RampInstantSDK({
      hostAppName: 'GatherHub',
      hostLogoUrl: 'https://rampnetwork.github.io/assets/misc/test-logo.png',
      swapAsset: 'XDAI_XDAI',
      url: 'https://ri-widget-staging.firebaseapp.com/',
    }).show()
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
        <button onClick={() => buyMembership(1)}>Buy Tier {getTierName(1)} (0.0001 xDai)</button>
        <button onClick={() => buyMembership(2)} style={{ marginLeft: 20 }}>Buy Tier {getTierName(2)} (0.0002 xDai)</button>
        <button onClick={() => buyMembership(3)} style={{ marginLeft: 20 }}>Buy Tier {getTierName(3)} (0.0003 xDai)</button>
      </div>
      <div>
        Don't have xDai? We've got you covered, you can buy it via
        <button onClick={() => getCrypto()} style={{ marginLeft: 20 }}>Buy Crypto with FIAT</button>
      </div>
    </div>
  )
}
