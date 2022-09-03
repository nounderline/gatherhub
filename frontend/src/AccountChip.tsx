import { useEthers } from '@usedapp/core'
import ReactNiceAvatar from 'react-nice-avatar'

export default ({}) => {
  const { activateBrowserWallet, account } = useEthers()

  if (!account) {
    return <div>No account</div>
  }

  return (
    <div className="flex flex-row items-center ">
      {!account && (<div className="rounded-md bg-black">
        <button onClick={() => activateBrowserWallet()}>Connect</button>
      </div>)}

      <span className="ml-2 whitespace-nowrap overflow-hidden text-ellipsis w-32">
        {account && <p>Account: {account.substring(0, 6)}...{account.substring(38, 42)}</p>}
      </span>

      <ReactNiceAvatar id={account} style={{ width: '54px', height: '54px' }} />
    </div>
  )
}
