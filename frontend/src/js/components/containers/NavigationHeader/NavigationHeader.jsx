import React, { Component } from "react";
import {viewIndexEnum} from "../Home.jsx";
import "./NavigationHeader.css";

class NavigationHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navigation-header row">
                <h1 className={(this.props.viewIndex === viewIndexEnum.expenses) ? "mr-3" : "selected-button mr-3"}>
                    Expenses
                </h1>
                <h1 className={(this.props.viewIndex === viewIndexEnum.payments) ? "" : "selected-button"}>
                    Payments
                </h1>
            </div>

        );
    }
}
export default NavigationHeader;