import React from 'react';
import './App.css';
import MainTile from './components/MainTile';
import { MAIN_TILE_NAMES, URLS } from './lib/constants';

export function App() {
    return (
        <div className='App'>
            <div className='app-body'>
                <MainTile title={MAIN_TILE_NAMES.JOURNAL} page={URLS.JOURNAL} />
                <MainTile title="Page 2" page="/page2" />
                <MainTile title="Page 3" page="/page3" />
                <MainTile title="Page 4" page="/page4" />
            </div>
        </div>
    )
}
