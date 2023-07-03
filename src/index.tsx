import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { App } from './App'
import Header from './components/Header'
import { URLS } from './lib/constants'
import Journal from './Journal'
import LearnSomethingComponent from './LearnSomething'
import { WhoAmI } from './WhoAmI'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path={URLS.JOURNAL} element={<Journal />} />
        <Route path={URLS.LEARN} element={<LearnSomethingComponent />} />
        <Route path={URLS.WHO} element={<WhoAmI />} />
        <Route path="/page4" element={<></>} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
