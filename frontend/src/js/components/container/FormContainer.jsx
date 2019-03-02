import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Input from "../presentational/Input.jsx";
class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      ans: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("/api/getData")
      .then(data => data.json())
      // .then(res => this.setState({ data: res.data }))
      .then(res => console.log(res.data));
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  render() {
    const { ans } = this.state;
    return (
      <form id="article-form">
        <Input
          text="The real question is what do you want??"
          label="ques"
          type="text"
          id="ans"
          value={ans}
          handleChange={this.handleChange}
        />
      </form>
    );
  }
}
export default FormContainer;
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
