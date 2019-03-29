import React, { Component } from "react";
import FormContainer from "./FormContainer.jsx";

class Home extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <h1>This is the home page</h1>
        <hr/>
        <p>This form will send info through an authenticated socket:</p>
        <FormContainer/>
      </div>
    );
  }
}

export  {Home};
