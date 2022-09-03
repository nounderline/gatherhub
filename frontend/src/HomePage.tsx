import { useEthers, useEtherBalance } from '@usedapp/core'
import AccountChip from './AccountChip'
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

const filterMemberByTier = (value: any, tier: number) =>
  value.filter((log) => log.data.tier === tier)

const parseMembers = (value: any): TierWallet[] =>
  value.map((item: any) => ({
    tier: item.data.tier,
    to: item.data.to,
    tokenId: item.data.tokenId.toNumber(),
  }))

export default ({}) => {
  return (
    <>
      <div className="text-center align-center">
        <h1 className="text-3xl">ETHWarsaw Hackathon</h1>
        <div>1-4 September 2022</div>
        <div>Warsaw, Poland</div>
      </div>

      <div className="grid grid-rows-2  grid-flow-col  gap-4 p-8 max-w-7xl m-auto">
        <ModuleBox title="Annoucmements" to="/news">
          dsads
        </ModuleBox>

        <ModuleBox title="Participants" to="/participants">
          <div>jakieboy</div>
          <div>diigo</div>
          <div>sojitko</div>
          <div>lolo</div>
        </ModuleBox>

        <ModuleBox title="Schedule" to="/schedule">
          <div>jakieboy</div>
          <div>diigo</div>
          <div>sojitko</div>
          <div>lolo</div>
        </ModuleBox>

        <ModuleBox title="Location">
          <Location />
        </ModuleBox>

        <ModuleBox title="Partnership">
          <div>Become a partner.</div>
        </ModuleBox>
      </div>
    </>
  )
}
