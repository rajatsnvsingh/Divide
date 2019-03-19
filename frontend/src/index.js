import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter, Route } from "react-router-dom";
import {App} from './js/components/containers/App.jsx';
import {Login} from './js/components/containers/Login.jsx';

const render = () => {
  ReactDOM.render(
    <BrowserRouter>
     <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
     </Switch>
    </BrowserRouter>,
    document.getElementById("root")
   );
};

render();