import React, { Component } from "react";
import MainViewButton from "../../presentational/MainViewButton/MainViewButton.jsx";
import "./NavigationHeader.css";

class NavigationHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="NavigationHeader row">
                    <div className="col-2 MainCol">
                        <MainViewButton buttonName="Expenses" selected={true} />
                    </div>
                    <div className="col-2 MainCol">
                        <MainViewButton buttonName="Payments" selected={false} />
                    </div>
                    <div className="col-8"></div>
            </div>

        );
    }
}
export default NavigationHeader;