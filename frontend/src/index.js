import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import {App} from './js/components/containers/App.jsx';

const render = () => {
  ReactDOM.render(
    <BrowserRouter>
     <Switch>
      <Route path="/" component={App} />
     </Switch>
    </BrowserRouter>,
    document.getElementById("root")
   );
};

render();