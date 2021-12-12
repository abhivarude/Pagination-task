
import './App.css';

import React from 'react';
import {BrowserRouter,Route,Switch, Redirect} from "react-router-dom";

import Main from "./mainpage";

export const Context = React.createContext();
function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path="/mainpage" component={Main} ></Route>
      <Route exact path="/" ><Redirect to="/mainpage" ></Redirect></Route>
     
      </Switch>
      
      
      
      </BrowserRouter>
    </div>
  );
}

export default App;
