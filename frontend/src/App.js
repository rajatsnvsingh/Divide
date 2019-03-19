import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import {Home} from './js/components/containers/Home.jsx';
import {Login} from './js/components/containers/Login.jsx';
import socketIOClient from "socket.io-client";

var socket;

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:3001"
    };
    socket = socketIOClient(this.state.endpoint);
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export {App, socket};
