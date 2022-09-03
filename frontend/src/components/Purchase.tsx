import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'

export default () => {
  // const ownedMembership = logs?.find(({ data: { to } }) => to === account)?.data?.tier || walletTiers[account as string]

  // if (ownedMembership) {
  //   walletTiers[account as string] = ownedMembership
  //   return (<div>
  //     Tier: {getTierName(ownedMembership)}
  //   </div>)
  // }

  const purchaseDeal = async () => {
    new RampInstantSDK({
      hostAppName: 'GatherHub',
      hostLogoUrl: 'https://rampnetwork.github.io/assets/misc/test-logo.png',
      swapAsset: 'XDAI_XDAI',
      url: 'https://ri-widget-staging.firebaseapp.com/',
      swapAmount: '10000000000000000000', // 10 xDai
      userAddress: '0x58fe6A10618d86ae934d46FE843e7AAF4Eab0c72',
      webhookStatusUrl: 'https://api.tenderly.co/api/v1/actions/0d27a23b-e5e3-4f57-96c2-d57b0b548183/webhook',
    }).show()
  }

  return (
    <div style={{ position: 'absolute', zIndex: 9999 }}>
      <div>
        Don't have xDai? We've got you covered, you can buy it via
        <button onClick={() => purchaseDeal()} style={{ marginLeft: 20 }}>Buy Crypto with FIAT</button>
      </div>
    </div>
  )
}
