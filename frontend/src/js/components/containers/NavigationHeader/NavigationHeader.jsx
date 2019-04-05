import React, { Component } from "react";
import {viewIndexEnum} from "../Home.jsx";
import "./NavigationHeader.css";

class NavigationHeader extends Component {
    constructor(props) {
        super(props);
        this.onExpenseButtonClick = this.onExpenseButtonClick.bind(this);
        this.onPaymentButtonClick = this.onPaymentButtonClick.bind(this);
    }

    onExpenseButtonClick(){
        this.props.onNavigationButtonClick(viewIndexEnum.expenses);
    }

    onPaymentButtonClick(){
        this.props.onNavigationButtonClick(viewIndexEnum.payments);
    }

    render() {
        return (
            <div className="navigation-header row">
                <h1 className={(this.props.viewIndex === viewIndexEnum.expenses) ? "mr-3 selected" : "unselected mr-3"} onClick={this.onExpenseButtonClick}>
                    Expenses
                </h1>
                <h1 className={(this.props.viewIndex === viewIndexEnum.payments) ? "selected" : "unselected"} onClick={this.onPaymentButtonClick}>
                    Payments
                </h1>
            </div>

        );
    }
}
export default NavigationHeader;