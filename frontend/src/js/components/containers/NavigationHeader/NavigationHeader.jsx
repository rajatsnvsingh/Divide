import React, { Component } from "react";
import "./NavigationHeader.css";
import {viewIndexEnum} from "../Home.jsx";

class NavigationHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="NavigationHeader row">
                <h1 className={(this.props.viewIndex === viewIndexEnum.expenses) ? "" : "selected-button"}>
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