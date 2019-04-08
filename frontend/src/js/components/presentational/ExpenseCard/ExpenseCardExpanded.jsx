import React, { Component } from "react";
import ExpanseCardExpandedInput from "./ExpenseCardExpandedInput.jsx";
import ExpenseCardExpandedUserList from "./ExpenseCardExpandedUserList.jsx";
import "./ExpenseCardExpanded.css";

const splitTypeEnum = Object.freeze({ "fraction": 1 });
const expenseStatusType = Object.freeze({ "pending": 1, "open": 2, "closed": 3 });

class ExpenseCardExpanded extends Component {
    constructor(props) {
        super(props);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
        this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
        

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

    onTitleChange(newTitle) {
        this.setState({title: newTitle});
    }

    onDateChange(newDate){
        this.setState({date: newDate});
    }

    onAmountChange(newAmount){
        this.setState({totalAmount: newAmount});
    }

    // TODO (but maybe not?) Create an Event Handler for the save button that calls
    //      an ExpenseList Event Handler that takes ExpenseCardExpanded's state 
    //      variables as input and updates the entry in the list

    onCancelButtonClick() {
        this.props.onClose();
    }

    onSaveButtonClick(){
        // TODO verify that everything in the new expense is acceptable
        // TODO use a web socket to send the new expense
        this.props.onClose();
    }

    render() {
        return (
            <div className="card mb-3">
                <div className="card-body p-0">
                    <ExpanseCardExpandedInput 
                        title={this.state.title} 
                        date={this.state.date} 
                        totalAmount={this.state.totalAmount} 
                        owner={this.state.owner}
                        onTitleChange={this.onTitleChange}
                        onDateChange={this.onDateChange}
                        onAmountChange={this.onAmountChange}
                        />
                    <ExpenseCardExpandedUserList transactions={this.state.transactions}/>
                    <div className="row">
                        <div className="col btn-group csbtns">
                            <button className="btn btn-secondary" onClick={this.onCancelButtonClick}>Cancel</button>
                            <button className="btn btn-primary" onClick={this.onSaveButtonClick}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default ExpenseCardExpanded;