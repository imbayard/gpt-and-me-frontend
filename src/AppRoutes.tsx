import React, { useState, createContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { App } from './App'
import Header from './components/Header'
import { URLS } from './lib/constants'
import Journal from './Journal'
import LearnSomethingComponent from './LearnSomething'
import { WhoAmI } from './WhoAmI'
import { SWOT } from './SWOT'
import { HabitMgr } from './HabitMgr'
import { LearnSomethingRoot } from './LearnSomethingRoot'
import SignIn from './SignIn'
import { container } from './lib/container'

export const UserContext = createContext({
  userId: '',
  email: '',
  name: '',
  handleLogout: async () => {},
})

export interface UserContextModel {
  userId: string
  email: string
  name: string
  handleLogout?: () => Promise<void>
}

export default function AppRoutes() {
  const [userInfo, setGlobalUserInfo] = useState({
    userId: '',
    email: '',
    name: '',
    handleLogout,
  })

  async function handleLogout() {
    await container.auth.signOut()
    setGlobalUserInfo({ userId: '', email: '', name: '', handleLogout })
    handleGlobalUserInfoChange({
      userId: '',
      email: '',
      name: '',
      handleLogout,
    })
    setIsAuthenticated(false)
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    loadUserInfoFromLocalStorage()
  }, [])

  function saveUserInfoToLocalStorage(info: UserContextModel) {
    localStorage.setItem('userInfo', JSON.stringify(info))
  }

  function loadUserInfoFromLocalStorage() {
    const savedUserInfo = localStorage.getItem('userInfo')
    if (savedUserInfo) {
      const userInfo = JSON.parse(savedUserInfo)
      setGlobalUserInfo({ ...userInfo, handleLogout })
      setIsAuthenticated(userInfo.userId !== '')
    }
  }

  function handleGlobalUserInfoChange(info: UserContextModel) {
    setGlobalUserInfo({
      userId: info.userId,
      email: info.email,
      name: info.name,
      handleLogout,
    })
    setIsAuthenticated(info.userId !== '')
    saveUserInfoToLocalStorage(info)
  }

  return (
    <UserContext.Provider value={userInfo}>
      <Router>
        <Header />
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<App />} />
              <Route path={URLS.JOURNAL} element={<Journal />} />
              <Route path={URLS.LEARN} element={<LearnSomethingComponent />} />
              <Route
                path={`${URLS.LEARN}/:id`}
                element={<LearnSomethingRoot />}
              />
              <Route path={URLS.WHO} element={<WhoAmI />} />
              <Route path={URLS.SWOT} element={<SWOT />} />
              <Route path={URLS.GOALS} element={<HabitMgr />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <SignIn
                    handleGlobalUserInfoChange={handleGlobalUserInfoChange}
                  />
                }
              />
            </>
          )}
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}
