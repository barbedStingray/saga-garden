import React from 'react';
import Garden from './components/Garden/Garden';
import PlantDetails from './components/PlantDetails/PlantDetails.jsx';

import { HashRouter as Router, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">

      <Router>

        <header className="App-header">
          <h1>Welcome to your garden!</h1>
        </header>

        <Route exact path='/'> <Garden /> </Route>
        <Route exact path='/details/:id'> <PlantDetails /> </Route>

      </Router>

    </div>
  )
}

export default App;
