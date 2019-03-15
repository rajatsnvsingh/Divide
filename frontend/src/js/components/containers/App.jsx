import React, { Component } from "react";
import queryString from "query-string";
import socketIOClient from "socket.io-client";
import FormContainer from "./FormContainer.jsx";

var socket;

class App extends Component {

  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:3001"
    };
    socket = socketIOClient(this.state.endpoint);
  }

  componentWillMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
        window.localStorage.setItem("jwt", query.token);
        this.props.history.push("/");
    }
  }

  render() {
    let token = window.localStorage.getItem("jwt");
    return (
      <div className="App">
        <a href="/auth/google">
          <div>
            <span>Sign in with Google</span>
          </div>
        </a>
        <hr/>
        <p>JWT Token: {token}</p>
        <FormContainer/>
      </div>
    );
  }
}

export  {App, socket};
