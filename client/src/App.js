import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Discover from './pages/Discover';
import Explore from './pages/Explore';
import Preferences from './pages/Preferences';

import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/discover" element={<Discover />}/>
          <Route exact path="/explore" element={<Explore />}/>
          <Route exact path="/preferences" element={<Preferences />}/>
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
