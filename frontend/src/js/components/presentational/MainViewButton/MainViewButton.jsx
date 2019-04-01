import React, { Component } from "react";
import "./MainViewButton.css";

class MainViewButton extends Component {
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.selected === true){
            return (
                <h1 className="MainViewButton">
                    {this.props.buttonName}
                </h1>
            );
        }
        else{
            return (
                <h2 className="MainViewButton">
                    {this.props.buttonName}
                </h2>
            );
        }
        
    }
}
export default MainViewButton;