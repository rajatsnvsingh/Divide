import React, { Component } from "react";

class OpenClosedToggle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let expenseButtonStyle = "btn-secondary";
        let paymentButtonStyle = "btn-outline-secondary";
        if (this.props.expenseToggled === false) {
            expenseButtonStyle = "btn-outline-secondary";
            paymentButtonStyle = "btn-secondary";
        }

        return (
            <div className="ExpensePaymentToggleContainer btn-group" role="group">
                <button className={"ExpenseToggle btn " + expenseButtonStyle}>Open</button>
                <button className={"PaymentToggle btn " + paymentButtonStyle}>Closed</button>
            </div>
        );
    }
}
export default OpenClosedToggle;