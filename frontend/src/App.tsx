import { useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import React from 'react'

import './App.css'
import ListNFTs from './components/ListNFTs'

function App() {
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account) // TODO: should use xDAI

  return (
    <div>
      <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
      </div>
      {account && (<p>Account: {account}</p>)}
      {etherBalance && (<p>Balance: {etherBalance.toString()}</p>)}
      {account && (<ListNFTs />)}
    </div>
  )
}

export default App
