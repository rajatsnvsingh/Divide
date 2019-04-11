import React, { Component } from "react";
import { MainContentContainer } from "./MainContentContainer/MainContentContainer.jsx";
import SummaryContainer from "./SummaryContainer/SummaryContainer.jsx"
import "./Home.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      myId: "2", // Aidan Bailey id is 2
      summaryList: [
        {
          id: 1,
          name: "Ruble",
          amount: 24,
          isOwed: true
        },
        {
          id: 2,
          name: "Aidan",
          amount: 12,
          isOwed: false 
        },
        {
          id: 3,
          name: "Alex",
          amount: 15,
          isOwed: true 
        }
      ]
    };
  }

  render() {
    return (
      <div className="row">
        <SummaryContainer className="col-md-2 sidenav" myId={this.state.myId} summaryList={this.state.summaryList} />
        <MainContentContainer className="col-md-10 main-content" myId={this.state.myId} />
      </div>
    );
  }
}

export { Home };
