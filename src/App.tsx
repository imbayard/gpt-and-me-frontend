import React, { useContext } from 'react'
import './App.css'
import MainTile from './components/MainTile'
import { MAIN_TILE_NAMES, URLS } from './lib/constants'
import { DailyPoem } from './DailyPoem'
import { UserContext } from './AppRoutes'

export function App() {
  const { email } = useContext(UserContext)
  return (
    <div className="App">
      <DailyPoem email={email} />
      <div className="app-body">
        <MainTile title={MAIN_TILE_NAMES.JOURNAL} page={URLS.JOURNAL} />
        <MainTile title={MAIN_TILE_NAMES.LEARN} page={URLS.LEARN} />
        <MainTile title={MAIN_TILE_NAMES.WHO} page={URLS.WHO} />
        <MainTile title={MAIN_TILE_NAMES.SWOT} page={URLS.SWOT} />
        <MainTile title={MAIN_TILE_NAMES.GOALS} page={URLS.GOALS} />
      </div>
    </div>
  )
}
