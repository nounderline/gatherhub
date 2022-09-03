import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import HomePage from './HomePage'
import ParticipantsPage from './ParticipantsPage'
import NewsPage from './NewsPage'
import SchedulePage from './SchedulePage'
import Layout from './Layout'
import DealsPage from './DealsPage'
import ChatPage from './ChatPage'

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
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
