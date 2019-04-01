import React, { Component } from "react";

class ExpensePaymentToggle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let expenseButtonStyle = "btn-secondary";
        let paymentButtonStyle = "btn-outline-secondary";
        if (this.props.expenseToggled === true) {
            expenseButtonStyle = "btn-outline-secondary";
            paymentButtonStyle = "btn-secondary";
        }

        return (
            <div className="ExpensePaymentToggleContainer btn-group" role="group">
                <button className={"ExpenseToggle btn " + expenseButtonStyle}>Expenses</button>
                <button className={"PaymentToggle btn " + paymentButtonStyle}>Payments</button>
            </div>
        );
    }
}
export default ExpensePaymentToggle;