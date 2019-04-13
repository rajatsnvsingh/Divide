import React, { Component } from "react";
import "./NavigationHeader.css";

let viewIndexEnum = Object.freeze({ "expenses": 1, "payments": 2 });

class NavigationHeader extends Component {
    constructor(props) {
        super(props);
        this.onExpenseButtonClick = this.onExpenseButtonClick.bind(this);
        this.onPaymentButtonClick = this.onPaymentButtonClick.bind(this);
    }

    onExpenseButtonClick() {
        this.props.onNavigationButtonClick(viewIndexEnum.expenses);
    }

    onPaymentButtonClick() {
        this.props.onNavigationButtonClick(viewIndexEnum.payments);
    }

    render() {
        return (
            <div className="navigation-header row">
                <div className="col-md-10 row">
                    <div>
                        <h1 className={(this.props.viewIndex === viewIndexEnum.expenses) ? "mr-4 selected" : "unselected mr-4"} onClick={this.onExpenseButtonClick}>
                            Expenses
                        </h1>
                    </div>
                    <div>
                        <h1 className={(this.props.viewIndex === viewIndexEnum.payments) ? "selected" : "unselected"} onClick={this.onPaymentButtonClick}>
                            Payments
                        </h1>
                    </div>
                </div>
                <div className="col-md-2">
                    <a href="/auth/logout">
                        <button type="button" className="btn btn-secondary float-right">Logout</button>
                    </a>
                </div>
            </div>
        );
    }
}
export default NavigationHeader;
