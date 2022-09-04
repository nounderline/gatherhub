import { useEthers, useLogs } from '@usedapp/core'
import ReactNiceAvatar from 'react-nice-avatar'

import { contract } from './utils/contract'
import { getTierName } from './utils/util'

const walletTiers = {} // TODO: refactor this provisional cache

export default ({}) => {
  const { activateBrowserWallet, account } = useEthers()
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
  // @ts-ignore
  let ownedMembership = logs?.value.find(({ data: { to } }) => to === account)?.data?.tier || walletTiers[account as string]
  if (walletTiers[account as string]) {
    ownedMembership = walletTiers[account as string]
  }

  if (ownedMembership) {
    walletTiers[account as string] = ownedMembership
  }

  if (!account) {
    return (
      <div className="rounded-md bg-black">
        <button style={{ color: 'white', padding: 10 }} onClick={() => activateBrowserWallet()}>Connect</button>
      </div>
    )
  }

  return (
    <div
      className="flex flex-row items-center p-2 pl-4 rounded-full "
      style={{ fontFamily: 'monospace' }}
    >
      <span className="inline-flex mr-4 items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
        {getTierName(ownedMembership)}
      </span>

      {account && (
        <span className="mr-2 whitespace-nowrap overflow-hidden text-ellipsis">
          {account.substring(0, 6)}...{account.substring(38, 42)}
        </span>
      )}

      <ReactNiceAvatar id={account} style={{ width: '48px', height: '48px' }} />
    </div>
  )
}
