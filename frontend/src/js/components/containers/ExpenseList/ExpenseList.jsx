import React, { Component } from "react";
import ExpenseCard from "../../presentational/ExpenseCard/ExpenseCard.jsx";
import ExpenseCardExpanded from "../../presentational/ExpenseCard/ExpenseCardExpanded.jsx";
import "./ExpenseList.css";

class ExpenseList extends Component {
    constructor(props) {
        super(props);
    }

    getExpenseCard(expense){
        if (expense._id === this.props.expandedCardId) {
            return (
                <li key={expense._id}>
                    <ExpenseCardExpanded myId={this.props.myId} expense={expense} onClose={this.props.onExpandedCardClose}/>
                </li>
            );
        }
        return (
            <li key={expense._id}>
                <ExpenseCard myId={this.props.myId} expense={expense} onCardClick={this.props.onCardClick} />
            </li>
        );
    }

    render() {
        const expenseComponents = this.props.expenses.map((expense) => 
            this.getExpenseCard(expense)
        );

        const newExpenseComponents = this.props.newExpenses.map((newExpense, index) =>
            (<li key={index}>
                <ExpenseCardExpanded myId={this.props.myId} expense={newExpense} onClose={this.props.onNewCardClose}/>
            </li>)
        );

        return (
            <div className="expense-list">
                <div ref={el => (this.newExpenseListRef = el)}></div>
                <ul >{newExpenseComponents}</ul>
                <ul>{expenseComponents}</ul>
            </div>
            
        );
    }

    scrollToTop(){
        console.log("Test");
        this.newExpenseListRef.scrollIntoView();
    }

}

export default ExpenseList;