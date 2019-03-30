import React, { Component } from "react";
import FormContainer from "./FormContainer.jsx";
import NavigationHeader from "./NavigationHeader/NavigationHeader.jsx";
import { MainContentContainer } from "./MainContentContainer/MainContentContainer.jsx";

let viewIndexEnum = Object.freeze({"expenses":1, "payments":2});

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
        <NavigationHeader />
        <MainContentContainer viewIndex={viewIndexEnum.expenses}/>
      </div>
    );
  }
}

export  {Home};
export {viewIndexEnum};
