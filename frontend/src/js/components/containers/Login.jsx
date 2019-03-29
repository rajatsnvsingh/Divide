import React, { Component } from "react";

class Login extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="Login">
      <h1>Login page</h1>
        <a href="/auth/google">
          <div>
            <span>Sign in with Google</span>
          </div>
        </a>
      </div>
    );
  }
}

export {Login};
