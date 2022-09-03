import { useEthers } from '@usedapp/core'
import ReactNiceAvatar from 'react-nice-avatar'

export default ({}) => {
  const { activateBrowserWallet, account } = useEthers()

  if (!account) {
    return <div>No account</div>
  }

  return (
    <div className="flex flex-row items-center ">
      {!account && (
        <div className="rounded-md bg-black">
          <button onClick={() => activateBrowserWallet()}>Connect</button>
        </div>
      )}

      {account && (
        <span className="mr-2 whitespace-nowrap overflow-hidden text-ellipsis">
          {account.substring(0, 6)}...{account.substring(38, 42)}
        </span>
      )}

      <ReactNiceAvatar id={account} style={{ width: '54px', height: '54px' }} />
    </div>
  )
}
