import React, { Component } from "react";

class ExpensePaymentToggle extends Component {
    constructor(props){
        super(props);
    }

    render() {
        if(this.props.expenseToggled === true){
            return (
                <div className="ExpensePaymentToggleContainer">
                    <button className="ExpenseToggle btn-secondary">Expenses</button>
                    <button className="PaymentToggle btn-outline-secondary">Payments</button>
                </div>
            );
        }
        else {
            return (
                <div className="ExpensePaymentToggleContainer">
                    <button className="ExpenseToggle btn-outline-secondary">Expenses</button>
                    <button className="PaymentToggle btn-secondary">Payments</button>
                </div>
            );
        }
    }
}
export default ExpensePaymentToggle;