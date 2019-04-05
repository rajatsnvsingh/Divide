import React, { Component } from "react";
import { MainContentContainer } from "./MainContentContainer/MainContentContainer.jsx";
import SummaryContainer from "./SummaryContainer/SummaryContainer.jsx"

let viewIndexEnum = Object.freeze({ "expenses": 1, "payments": 2 });

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="row">
        <SummaryContainer />
        <MainContentContainer viewIndex={viewIndexEnum.payments} />
      </div>
    );
  }
}

export { Home };
export { viewIndexEnum };
