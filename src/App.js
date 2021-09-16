import React from 'react';

import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import './App.css';

import Note from './pages/Note';
import Addnote from './pages/Addnote';
import Editnote from './pages/Editnote';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Note} />
        <Route exact path="/add-note" component={Addnote} />
        <Route excat path="/edit-note/:id" component={Editnote} /> 
      </Switch>
    </Router>
  );
}

export default App;
