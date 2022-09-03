import { useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import ListNFTs from './components/ListNFTs'
import ModuleBox from './ModuleBox'
import HomePage from './HomePage'
import ParticipantsPage from './ParticipantsPage'
import NewsPage from './NewsPage'
import SchedulePage from './SchedulePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/participants" element={<ParticipantsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
