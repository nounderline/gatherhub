import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'

export default () => {
  const purchaseDeal = async () => {
    // https://docs.ramp.network/configuration
    new RampInstantSDK({
      hostAppName: 'GatherHub',
      hostLogoUrl: 'https://rampnetwork.github.io/assets/misc/test-logo.png',
      swapAsset: 'XDAI_XDAI',
      url: 'https://ri-widget-staging.firebaseapp.com/',
      swapAmount: '10000000000000000000', // 10 xDai
      userAddress: '0x58fe6A10618d86ae934d46FE843e7AAF4Eab0c72',
      webhookStatusUrl: 'https://api.tenderly.co/api/v1/actions/93724581-923d-4cde-83c0-b694229633e9/webhook',
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
