import React, { Component } from "react";
import "./Login.css";
class Login extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
  }

  render() {
    return (
<div>
    <div className="perfect-centering frmbckrnd">
      <div className="media-container">
        <div className="align-center text-center">
          <h1 className="display-1 ">
            <b>Divide</b></h1>
          <p className="display-5">A smarter way to manage expenses</p>
          <div className="align-center"><a className="btn btn-md btn-primary display-4 loggoog" href="/auth/google">Login with Google</a></div>
        </div>
      </div>
    </div>

</div>


    );
  }
}

export {Login};
