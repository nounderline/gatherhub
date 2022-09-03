import { useEthers, useEtherBalance } from '@usedapp/core'
import ListNFTs from './components/ListNFTs'
import ModuleBox from './ModuleBox'

export default ({}) => {
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account) // TODO: should use xDAI

  return (
    <>
      <div className="rounded-md bg-black">
        <button onClick={() => activateBrowserWallet()}>Connect</button>
      </div>
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {etherBalance.toString()}</p>}
      {account && <ListNFTs />}

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
        <div>Warsaw, Politecznika</div>
      </ModuleBox>

      <ModuleBox title="Partnership">
        <div>Become a partner.</div>
      </ModuleBox>
    </>
  )
}
