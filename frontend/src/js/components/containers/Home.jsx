import React, { Component } from "react";
import { MainContentContainer } from "./MainContentContainer/MainContentContainer.jsx";
import SummaryContainer from "./SummaryContainer/SummaryContainer.jsx"
import "./Home.css";

class Home extends Component {
  constructor() {
    super();
    this.onUpdateSummaryList = this.onUpdateSummaryList.bind(this);
    this.state = {
      myId: "2", // Aidan Bailey id is 2
      summaryList: []
    };
  }

  onUpdateSummaryList(summaries){
    this.setState({summaryList: summaries});
  }

  render() {
    return (
      <div className="row">
        <SummaryContainer className="col-md-2 sidenav" myId={this.state.myId} summaryList={this.state.summaryList} />
        <MainContentContainer className="col-md-10 main-content" myId={this.state.myId} onUpdateSummaryList={this.onUpdateSummaryList} />
      </div>
    );
  }
}

export { Home };
