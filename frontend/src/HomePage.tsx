import { useLogs, useEthers, useEtherBalance } from '@usedapp/core'
import ModuleBox from './ModuleBox'

import Location from './components/Location'
import Partnerships from './components/Partnerships'

import { contract } from './utils/contract'

interface TierWallet {
  tier: number
  to: string
  tokenId: number
}

const filterMemberByTier= (value: any, tier: number) =>
  value.filter((log) => log.data.tier === tier)

const parseMembers = (value: any): TierWallet[] => value.map((item: any) => ({
  tier: item.data.tier,
  to: item.data.to,
  tokenId: item.data.tokenId.toNumber(),
}))

export default ({}) => {
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account) // TODO: should use xDAI

  const logs = useLogs(
    {
      contract,
      event: 'PurchasedNFT',
      args: [],
    },
    {
      fromBlock: 24010000,
      toBlock: 'latest',
    }
  )
  const tier1Wallets = logs?.value && parseMembers(filterMemberByTier(logs.value, 1))
  const tier2Wallets = logs?.value && parseMembers(filterMemberByTier(logs.value, 2))
  const tier3Wallets = logs?.value && parseMembers(filterMemberByTier(logs.value, 3))

  return (
    <>
      <div className="rounded-md bg-black">
        <button onClick={() => activateBrowserWallet()}>Connect</button>
      </div>
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {etherBalance.toString()}</p>}

      <ModuleBox title="News">dsdsdasdsa</ModuleBox>

      <ModuleBox title="Participants" to="/participants">
        <div>jakieboy</div>
        <div>diigo</div>
        <div>sojitko</div>
        <div>lolo</div>
      </ModuleBox>

      <ModuleBox title="Group Chat">
        <div>jakieboy</div>
        <div>diigo</div>
        <div>sojitko</div>
        <div>lolo</div>
      </ModuleBox>

      <ModuleBox title="Schedule">
        <div>jakieboy</div>
        <div>diigo</div>
        <div>sojitko</div>
        <div>lolo</div>
      </ModuleBox>

      <ModuleBox title="Location">
        <Location />
      </ModuleBox>

      <ModuleBox title="Partnership">
        <Partnerships tier2Wallets={tier2Wallets} />
      </ModuleBox>
    </>
  )
}
