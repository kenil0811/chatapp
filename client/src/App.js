import React from 'react';

import Join from './component/Join/Join';
import Chat from './component/Chat/Chat';
import "./App.css";
import { BrowserRouter as Router,Route } from 'react-router-dom';


const App =() => (
  <Router>
    <Route path="/" exact component={Join}/>
    <Route path="/chat" exact component={Chat}/>
  </Router>
);
export default App;