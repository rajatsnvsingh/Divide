import React, { Component } from "react";
import { viewIndexEnum } from "../Home.jsx";
import "./NavigationHeader.css";

class NavigationHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navigation-header row align-items-center">
                <div className="col-md-5 row">
                    <h1 className={(this.props.viewIndex === viewIndexEnum.expenses) ? "mr-4" : "selected-button mr-4"}>
                        Expenses
                    </h1>
                    <h1 className={(this.props.viewIndex === viewIndexEnum.payments) ? "" : "selected-button"}>
                        Payments
                    </h1>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-secondary float-right">Logout</button>
                </div>
            </div>

        );
    }
}
export default NavigationHeader;
