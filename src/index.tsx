import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import Header from './components/Header';
import { URLS } from './lib/constants';
import Journal from './Journal';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path={URLS.JOURNAL} element={<Journal />} />
        <Route path="/page2" element={<></>} />
        <Route path="/page3" element={<></>} />
        <Route path="/page4" element={<></>} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
