import React, { Component } from "react";
import "./MainViewButton.css";

class MainViewButton extends Component {
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.selected === true){
            return (
                <h1>
                    {this.props.buttonName}
                </h1>
            );
        }
        else{
            return (
                <h1 className="selected-button">
                    {this.props.buttonName}
                </h1>
            );
        }
        
    }
}
export default MainViewButton;