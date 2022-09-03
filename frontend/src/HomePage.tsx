import { useLogs } from '@usedapp/core'
import { useEffect, useState } from 'react'
import ModuleBox from './ModuleBox'

import Connect from './components/Connect'
import Location from './components/Location'
import Partnerships from './components/Partnerships'
import Purchase from './components/Purchase'

import { contract } from './utils/contract'
import { filterMemberByTier, parseMembers, TierWallet } from './utils/util'
import PageHeadline from './PageHeadline'

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
    const tier1Wallets =
      logs?.value && parseMembers(filterMemberByTier(logs.value, 1))
    const tier2Wallets =
      logs?.value && parseMembers(filterMemberByTier(logs.value, 2))
    const tier3Wallets =
      logs?.value && parseMembers(filterMemberByTier(logs.value, 3))

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
      <Purchase logs={logs?.value} />

      <div className="text-center align-center">
        <h1 className="text-5xl font-bold">ETHWarsaw Hackathon</h1>
        <div className="text-4xl mt-4">1-4 September 2022</div>
        <div className="mt-2">Warsaw, Poland</div>
      </div>

      <div className="grid grid-cols-3 auto-rows-fr gap-8 max-w-8xl m-auto mt-8 mb-32">
        <ModuleBox to="/news">
          <PageHeadline
            icon="📣"
            title="Announcements"
            subtitle="Be in the loop about what's happening."
            small={true}
          />
        </ModuleBox>

        <ModuleBox to="/participants">
          <PageHeadline
            icon="👽"
            title="Participants"
            subtitle="See who you gonna meet on the stage!"
            small={true}
          />
        </ModuleBox>

        <ModuleBox to="/schedule">
          <PageHeadline
            icon="🗓"
            title="Schedule"
            subtitle="See who you gonna meet on the stage!"
            small={true}
          />
        </ModuleBox>

        <ModuleBox to="/location">
          <PageHeadline
            icon="📍"
            title="Location"
            subtitle="See who you gonna meet on the stage!"
            small={true}
          />
        </ModuleBox>

        <ModuleBox to="/deals">
          <PageHeadline
            icon="💸"
            title="Deals"
            subtitle="Special offers for accommodation and food for all participants."
            small={true}
          />
        </ModuleBox>
      </div>
    </>
  )
}
