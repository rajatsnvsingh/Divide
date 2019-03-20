import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {Home} from './js/components/containers/Home.jsx';
import {Login} from './js/components/containers/Login.jsx';
import socketIOClient from "socket.io-client";

var socket = socketIOClient("http://localhost:3001");;

function updateAuth(data) {
  this.setState({authenticated: data});
}

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:3001",
      authenticated: undefined
    };
    updateAuth = updateAuth.bind(this)
  }

  componentWillMount() {
    socket.on('error', (error) => {
      updateAuth(false);
    });
    
    socket.on('connect', () => {
      updateAuth(true);
    });
  }

  render() {
    if (this.state.authenticated === undefined) {
      return (
        <div className="App">
        </div>
      )
    }
    return (
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} authentic={this.state.authenticated}/>
        </Switch>
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.authentic === true ? <Component {...props} /> : <Redirect to='/login' />
  )} />
)

export {App, socket};
