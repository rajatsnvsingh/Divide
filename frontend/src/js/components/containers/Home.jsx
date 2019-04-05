import React, { Component } from "react";
import { MainContentContainer } from "./MainContentContainer/MainContentContainer.jsx";
import SummaryContainer from "./SummaryContainer/SummaryContainer.jsx"

let viewIndexEnum = Object.freeze({ "expenses": 1, "payments": 2 });

class Home extends Component {
  constructor() {
    super();
    this.state = {
      myId: ""
    };
  }

  render() {
    return (
      <div className="row">
        <SummaryContainer className="col-md-2 sidenav" myId={this.state.myId}/>
        <MainContentContainer className="col-md-10" myId={this.state.myId} />
      </div>
    );
  }
}

export { Home };
export { viewIndexEnum };
