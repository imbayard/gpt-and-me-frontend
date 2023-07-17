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
import { getSWOTAnalysisAndQuestions, getUserSummary } from './api'

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
  const [hasDoneUserSummary, setHasDoneUserSummary] = useState(false)
  const [hasDoneSWOT, setHasDoneSWOT] = useState(false)

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
    fetchUserDescriptors()
  }, [])

  async function fetchUserDescriptors() {
    const user_summary = await getUserSummary(userInfo.email)
    console.log('yeep')
    console.log(user_summary)
    if (user_summary) {
      setHasDoneUserSummary(true)
      const swot_anal = await getSWOTAnalysisAndQuestions(userInfo.email)
      console.log(swot_anal)
      if (swot_anal && swot_anal.analysis) setHasDoneSWOT(true)
    }
  }

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
            hasDoneUserSummary ? (
              hasDoneSWOT ? (
                <>
                  <Route path="/" element={<App />} />
                  <Route
                    path={URLS.JOURNAL}
                    element={<Journal email={userInfo.email} />}
                  />
                  <Route
                    path={URLS.LEARN}
                    element={<LearnSomethingComponent email={userInfo.email} />}
                  />
                  <Route
                    path={`${URLS.LEARN}/:id`}
                    element={<LearnSomethingRoot email={userInfo.email} />}
                  />
                  <Route
                    path={URLS.WHO}
                    element={<WhoAmI email={userInfo.email} />}
                  />
                  <Route
                    path={URLS.SWOT}
                    element={<SWOT email={userInfo.email} />}
                  />
                  <Route
                    path={URLS.GOALS}
                    element={<HabitMgr email={userInfo.email} />}
                  />
                </>
              ) : (
                <>
                  <Route
                    path="/"
                    element={
                      <SWOT
                        email={userInfo.email}
                        isFirstTime={true}
                        setHasDoneSWOT={(hasDone) => setHasDoneSWOT(hasDone)}
                      />
                    }
                  />
                </>
              )
            ) : (
              <>
                <Route
                  path="/"
                  element={
                    <WhoAmI
                      email={userInfo.email}
                      isFirstTime={true}
                      setHasDoneUserSummary={(hasDone) =>
                        setHasDoneUserSummary(hasDone)
                      }
                    />
                  }
                />
              </>
            )
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
