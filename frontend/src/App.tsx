import { useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import React from 'react'

import './App.css'

function App() {
  const { activateBrowserWallet, account, deactivate, chainId } = useEthers()
  const etherBalance = useEtherBalance(account)

  return (
    <div>
      <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
      </div>
      {account && <p>Account: {account}</p>}
    </div>
  )
}

export default App
