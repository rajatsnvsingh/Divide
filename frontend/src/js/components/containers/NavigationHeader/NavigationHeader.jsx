import React, { Component } from "react";
import MainViewButton from "../../presentational/MainViewButton/MainViewButton.jsx";

class NavigationHeader extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div className="NavigationHeader">
                <MainViewButton buttonName="Expenses" />
                <MainViewButton buttonName="Payments" />
            </div>
        );
    }
}
export default NavigationHeader;