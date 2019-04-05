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
        <SummaryContainer myId={this.state.myId}/>
        <MainContentContainer myId={this.state.myId} viewIndex={viewIndexEnum.expenses} />
      </div>
    );
  }
}

export { Home };
export { viewIndexEnum };
