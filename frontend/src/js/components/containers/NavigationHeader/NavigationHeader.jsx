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
                    <div className="col-md-2">
                        <MainViewButton buttonName="Expenses" selected={true} />
                    </div>
                    <div className="col-md-10">
                        <MainViewButton buttonName="Payments" selected={false} />
                    </div>
            </div>

        );
    }
}
export default NavigationHeader;