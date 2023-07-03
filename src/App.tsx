import React from 'react'
import './App.css'
import MainTile from './components/MainTile'
import { MAIN_TILE_NAMES, URLS } from './lib/constants'

export function App() {
  return (
    <div className="App">
      <div className="app-body">
        <MainTile title={MAIN_TILE_NAMES.JOURNAL} page={URLS.JOURNAL} />
        <MainTile title={MAIN_TILE_NAMES.LEARN} page={URLS.LEARN} />
        <MainTile title={MAIN_TILE_NAMES.WHO} page={URLS.WHO} />
        <MainTile title="Page 4" page="/page4" />
      </div>
    </div>
  )
}
