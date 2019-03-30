import React, { Component } from "react";
import FormContainer from "./FormContainer.jsx";
import NavigationHeader from "./NavigationHeader/NavigationHeader.jsx";
<<<<<<< HEAD
import { MainContentContainer } from "./MainContentContainer/MainContentContainer.jsx";
=======
import SummaryContainer from "./SummaryContainer/SummaryContainer.jsx"
>>>>>>> 4f1df036136446d8349c55afd1f575587a678709

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
<<<<<<< HEAD
        <MainContentContainer viewIndex={viewIndexEnum.expenses}/>
=======
        <SummaryContainer />
>>>>>>> 4f1df036136446d8349c55afd1f575587a678709
      </div>
    );
  }
}

export  {Home};
export {viewIndexEnum};
