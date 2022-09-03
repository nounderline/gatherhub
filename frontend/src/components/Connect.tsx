import { useEthers, useEtherBalance } from '@usedapp/core'

export default () => {
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account) // TODO: should use xDAI

  return (<div>
    {!account && (<div className="rounded-md bg-black">
      <button onClick={() => activateBrowserWallet()}>Connect</button>
    </div>)}
    {account && <p>Account: {account.substring(0, 6)}...{account.substring(38, 42)}</p>}
    {etherBalance && <p>Balance: {etherBalance.toString()}</p>}
    </div>)
}
