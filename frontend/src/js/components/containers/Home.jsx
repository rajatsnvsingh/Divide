import React, { Component } from "react";
import { MainContentContainer } from "./MainContentContainer/MainContentContainer.jsx";
import SummaryContainer from "./SummaryContainer/SummaryContainer.jsx"

class Home extends Component {
  constructor() {
    super();
    this.onUpdateSummaryList = this.onUpdateSummaryList.bind(this);
    this.state = {
      myId: "2", // Aidan Bailey id is 2
      summaryList: [
        {
          userId: 1,
          name: "Ruble",
          amount: 24,
        },
        {
          userId: 2,
          name: "Aidan",
          amount: -12,
        },
        {
          userId: 3,
          name: "Alex",
          amount: 15,
        }
      ]
    };
  }

  onUpdateSummaryList(summaries){
    console.log(summaries);
  }

  render() {
    return (
      <div>
        <SummaryContainer  myId={this.state.myId} summaryList={this.state.summaryList} />
        <MainContentContainer  myId={this.state.myId} onUpdateSummaryList={this.onUpdateSummaryList} />
      </div>
    );
  }
}

export { Home };
