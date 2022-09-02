import { useEthers, useLogs } from '@usedapp/core'
import { useEffect, useState } from 'react'

import { contract } from '../utils/contract'

function ListNFTs() {
  const { account } = useEthers()
  const [data, setData] = useState(null)
  const logs = useLogs(
    {
      contract,
      event: 'allEvents',
      args: [],
    },
    {
      fromBlock: 23993278,
      toBlock: 'latest',
    }
  )  

  // useEffect(() => {
  //   (async () => {
  //     console.warn(contract.connect(account as string))
  //     contract.connect(account as string).getLogs({ fromBlock: 23993317}).then(console.log);
  //   })()
  // }, [])

  return null
}

export default ListNFTs
