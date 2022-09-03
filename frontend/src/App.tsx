import { useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import ModuleBox from './ModuleBox'
import HomePage from './HomePage'
import ParticipantsPage from './ParticipantsPage'
import NewsPage from './NewsPage'
import SchedulePage from './SchedulePage'
import Layout from './Layout'
import DealsPage from './DealsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="participants" element={<ParticipantsPage />} />
          <Route path="deals" element={<DealsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
