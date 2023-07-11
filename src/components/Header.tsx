import React from 'react'
import './Header.css'
import MainTile from './MainTile'

const Header = () => {
  return (
    <header className="app-header">
      <MainTile title="Bayard" page="/" isHeader={true} />
    </header>
  )
}

export default Header
