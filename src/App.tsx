import React from 'react'
import './App.css'
import MainTile from './components/MainTile'
import { MAIN_TILE_NAMES, URLS } from './lib/constants'
import { DailyPoem } from './DailyPoem'

export function App() {
  return (
    <div className="App">
      <DailyPoem />
      <div className="app-body">
        <MainTile title={MAIN_TILE_NAMES.JOURNAL} page={URLS.JOURNAL} />
        <MainTile title={MAIN_TILE_NAMES.LEARN} page={URLS.LEARN} />
        <MainTile title={MAIN_TILE_NAMES.WHO} page={URLS.WHO} />
        <MainTile title={MAIN_TILE_NAMES.SWOT} page={URLS.SWOT} />
      </div>
    </div>
  )
}
