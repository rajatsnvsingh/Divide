import React, { Component } from "react";
import { MainContentContainer } from "./MainContentContainer/MainContentContainer.jsx";
import SummaryContainer from "./SummaryContainer/SummaryContainer.jsx"

class Home extends Component {
  constructor() {
    super();
    this.state = {
      myId: "2" // Aidan Bailey id is 2
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
