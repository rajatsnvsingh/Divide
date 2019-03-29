import React, { Component } from "react";

class MainViewButton extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <h1 className="MainViewButton">
                {this.props.buttonName}
            </h1>
        );
    }
}
export default MainViewButton;