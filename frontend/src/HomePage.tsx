import { useEthers, useEtherBalance } from '@usedapp/core'
import AccountChip from './AccountChip'
import ListNFTs from './components/ListNFTs'
import ModuleBox from './ModuleBox'

export default ({}) => {
  return (
    <>
      <div className="flex m-auto max-w-6xl py-4 pr-4 items-center justify-between  border-b-2 mb-8">
        <div className="font-bold">DEGEN.SPACE</div>
        <AccountChip />
      </div>

      <div className="text-center align-center">
        <h1 className="text-3xl">ETHWarsaw Hackathon</h1>
        <div>1-4 September 2022</div>
        <div>Warsaw, Poland</div>
      </div>

      <div className="grid grid-rows-2 grid-flow-col  gap-4 p-8 max-w-7xl m-auto">
        <ModuleBox title="Annoucmements" to="/news">
          dsads
        </ModuleBox>

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

        <ModuleBox title="Schedule" to="/schedule">
          <div>jakieboy</div>
          <div>diigo</div>
          <div>sojitko</div>
          <div>lolo</div>
        </ModuleBox>

        <ModuleBox title="Location">
          <div>Warsaw, Politecznika</div>
        </ModuleBox>

        <ModuleBox title="Partnership">
          <div>Become a partner.</div>
        </ModuleBox>
      </div>
    </>
  )
}
