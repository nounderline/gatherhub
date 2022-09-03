import { useEthers } from '@usedapp/core'
import ReactNiceAvatar from 'react-nice-avatar'

export default ({}) => {
  const { activateBrowserWallet, account } = useEthers()

  if (!account) {
    return <div>No account</div>
  }

  return (
    <div
      className="flex flex-row items-center p-2 pl-4 rounded-full "
      style={{ fontFamily: 'monospace' }}
    >
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

      <ReactNiceAvatar id={account} style={{ width: '48px', height: '48px' }} />
    </div>
  )
}
