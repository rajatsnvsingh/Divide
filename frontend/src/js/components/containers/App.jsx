import React, { Component } from "react";
import queryString from "query-string";

class App extends Component {

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
      </div>
    );
  }
}

export default App;
