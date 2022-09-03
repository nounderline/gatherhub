import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'

import './App.css'
import HomePage from './HomePage'
import ParticipantsPage from './ParticipantsPage'
import NewsPage from './NewsPage'
import SchedulePage from './SchedulePage'
import Layout from './Layout'
import DealsPage from './DealsPage'
import ChatPage from './ChatPage'
import BusinessPage from './BusinessPage'
import { useEffect } from 'react'

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="participants" element={<ParticipantsPage />} />
          <Route path="deals" element={<DealsPage />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>
        <Route path="/business" element={<BusinessPage />} />
      </Routes>
    </HashRouter>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default App
