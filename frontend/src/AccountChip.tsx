import { useEthers } from '@usedapp/core'
import ReactNiceAvatar from 'react-nice-avatar'

export default ({}) => {
  const { activateBrowserWallet, account } = useEthers()

  if (!account) {
    return <div>No account</div>
  }

  return (
    <div className="flex flex-row items-center ">
      <span className="ml-2 whitespace-nowrap overflow-hidden text-ellipsis w-32">
        {account}
      </span>

      <ReactNiceAvatar id={account} style={{ width: '54px', height: '54px' }} />
    </div>
  )
}
