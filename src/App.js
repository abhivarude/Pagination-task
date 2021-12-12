
import './App.css';

import React from 'react';

import {BrowserRouter ,Redirect, Route, Switch } from 'react-router-dom';

import Main from "./mainpage";

export const Context = React.createContext();
function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path="/mainpage" component={Main} ></Route>
      <Route exact path="/" component={Main}></Route>
     
      </Switch>
      
      
      
      </BrowserRouter>
    </div>
  );
}

export default App;
