import React, { Component } from "react";
import { MainContentContainer } from "./MainContentContainer/MainContentContainer.jsx";
import SummaryContainer from "./SummaryContainer/SummaryContainer.jsx"
import { socket } from "../../../App.js";

class Home extends Component {
  constructor() {
    super();
    this.onUpdateSummaryList = this.onUpdateSummaryList.bind(this);
    this.state = {
      myId: "", // Aidan Bailey id is 2
      name: "",
      summaryList: []
    };
  }

  componentDidMount() {
    socket.emit(
      "user_info",
      function (myUser) {
        this.setState({
          myId: myUser._id,
          name: myUser.name
        });
      }.bind(this)
    );
  }

  onUpdateSummaryList(summaries) {
    this.setState({ summaryList: summaries });
  }

  render() {
    return (
      <div>
        <SummaryContainer myId={this.state.myId} summaryList={this.state.summaryList} name={this.state.name}/>
        <MainContentContainer myId={this.state.myId} summaryList={this.state.summaryList} onUpdateSummaryList={this.onUpdateSummaryList} />
      </div>
    );
  }
}

export { Home };
