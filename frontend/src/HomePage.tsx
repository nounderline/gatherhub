import { useLogs } from '@usedapp/core'
import { useEffect, useState } from 'react'
import ModuleBox from './ModuleBox'

import Connect from './components/Connect'
import Location from './components/Location'
import Partnerships from './components/Partnerships'
import Purchase from './components/Purchase'

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
  const [t1Wallets, setT1Wallet] = useState<TierWallet[]>([])
  const [t2Wallets, setT2Wallet] = useState<TierWallet[]>([])
  const [t3Wallets, setT3Wallet] = useState<TierWallet[]>([])

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

  useEffect(() => {
    // TODO: refactor to use without useEffect
    // currently this is a workaround for prototyping RPC limits
    const tier1Wallets = logs?.value && parseMembers(filterMemberByTier(logs.value, 1))
    const tier2Wallets = logs?.value && parseMembers(filterMemberByTier(logs.value, 2))
    const tier3Wallets = logs?.value && parseMembers(filterMemberByTier(logs.value, 3))

    if (!t1Wallets.length && tier1Wallets) {
      setT1Wallet(tier1Wallets)
    }
    if (!t2Wallets.length && tier2Wallets) {
      setT2Wallet(tier2Wallets)
    }
    if (!t3Wallets.length && tier3Wallets) {
      setT3Wallet(tier3Wallets)
    }
  }, [logs?.value?.length])

  return (
    <>
      <Connect />

      <Purchase logs={logs?.value} />

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
        <Partnerships tier2Wallets={t2Wallets} />
      </ModuleBox>
    </>
  )
}
