import React, { Component } from "react";
import ExpanseCardExpandedInput from "./ExpenseCardExpandedInput.jsx";
import ExpenseCardExpandedUserList from "./ExpenseCardExpandedUserList.jsx";
import "./ExpenseCardExpanded.css";

const splitTypeEnum = Object.freeze({ "fraction": 1 });
const expenseStatusType = Object.freeze({ "pending": 1, "open": 2, "closed": 3 });

class ExpenseCardExpanded extends Component {
    constructor(props) {
        super(props);

        let expense = this.props.expense;
        this.state = {
            title: expense.title,
            date: expense.date,
            status: expense.status,
            totalAmount: expense.totalAmt,
            owner: expense.ownerId,
            transactions: expense.transactions
        };
    }

    // TODO Create Event Handlers that are passed to EventCardExpanded's children 
    //      so that when the state of the forms is updated, the state variables of 
    //      ExpenseCardExpanded are updated.

    // TODO (but maybe not?) Create an Event Handler for the save button that calls
    //      an ExpenseList Event Handler that takes ExpenseCardExpanded's state 
    //      variables as input and updates the entry in the list

    // TODO Pass an event handler from ExpenseList that "collapses" the expanded card
    //      when a cancel or save button is clicked.

    render() {
        return (
            <div className="card mb-3">
                <div className="card-body p-0">
                    <ExpanseCardExpandedInput 
                        title={this.state.title} 
                        date={this.state.date} 
                        totalAmount={this.state.totalAmt} 
                        owner={this.state.owner}/>
                    <ExpenseCardExpandedUserList transactions={this.state.transactions}/>
                    <div className="row">
                        <div className="col btn-group csbtns">
                            <button className="btn btn-secondary">Cancel</button>
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default ExpenseCardExpanded;