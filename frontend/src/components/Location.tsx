import { useEthers } from '@usedapp/core'
import { Contract } from 'ethers'
import { useEffect, useState } from 'react'

import { contract, wethInterface } from '../utils/contract'

export default () => {
  const [location, setLocation] = useState('')
  const { library } = useEthers()

  useEffect(() => {
    // TODO: refactor to use usedapp's useCall
    const getTokenBalance = async () => {
      const signer = library?.getSigner()
      const ctr = new Contract(contract.address, wethInterface, signer)
      const loc = await ctr.location()
      setLocation(loc)
    }

    if (library && typeof library.getSigner === 'function') {
      getTokenBalance()
    }
  }, [library, location])

  return (<p>
    {location ? location : 'Loading...'}
  </p>)
}
