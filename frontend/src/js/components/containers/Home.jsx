import React, { Component } from "react";
import NavigationHeader from "./NavigationHeader/NavigationHeader.jsx";
import { MainContentContainer } from "./MainContentContainer/MainContentContainer.jsx";
import SummaryContainer from "./SummaryContainer/SummaryContainer.jsx"

let viewIndexEnum = Object.freeze({"expenses":1, "payments":2});

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      // <div className="App">
      //   <div className="col-md-2">
      //       <SummaryContainer />
      //   </div>
      //   <div className="col-md-10">
      //     <h1>This is the home page</h1>
      //     <hr/>
      //     <p>This form will send info through an authenticated socket:</p>
      //     <FormContainer/>
      //     <NavigationHeader />
      //     <MainContentContainer viewIndex={viewIndexEnum.expenses}/>
      //   </div>
      // </div>
      <div className="row">
        <SummaryContainer />
        <div className="col-md-10">
          <NavigationHeader viewIndex={viewIndexEnum.expenses}/>
          <MainContentContainer viewIndex={viewIndexEnum.expenses}/>
        </div>
      </div>
    );
  }
}

export  {Home};
export {viewIndexEnum};
