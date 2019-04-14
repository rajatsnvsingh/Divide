import React, { Component } from "react";
import "./ExpenseCard.css";
import "../../../../css/styles.css";

class ExpenseCard extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.props.onCardClick(this.props.expense._id);
    }

    generateExpenseMessage(expense) {
        let totalAmountOwed = 0;
        expense.transactions.forEach(transaction => {
            totalAmountOwed += transaction.amtOwing - transaction.amtPaid;
        });

        if (this.props.myId === expense.ownerId._id) {
            if (expense.transactions.length === 1) {
                return <p>{expense.transactions[0].userId.name} owes you <span className="text-success tsex">${totalAmountOwed}</span></p>;
            }
            else if (expense.transactions.length <= 2) {
                return <p>{expense.transactions[0].userId.name} and {expense.transactions[1].userId.name} owe you <span className="text-success tsex">${totalAmountOwed}</span></p>;
            }
            else {
                return <p>{expense.transactions[0].userId.name}, {expense.transactions[1].userId.name}, and {expense.transactions.length - 2} other(s) owe you <span className="text-success tsex">${totalAmountOwed}</span></p>;
            }
        }
        else {
            let amount = 0;
            for(let transaction of expense.transactions){
                if(transaction.userId._id === this.props.myId){
                    amount = transaction.amtOwing - transaction.amtPaid;
                }
            }
            return <p>You owe {expense.ownerId.name} <span className="text-danger tdex">${amount}</span></p>;
        }
    }

    generateMonthName(expense){
        // Get Month Name from Date
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        return monthNames[expense.date.getMonth()];
    }

    render() {
        const expense = this.props.expense;
        let content = this.generateExpenseMessage(expense);
        let monthName = this.generateMonthName(expense);

        return (
            <div className="card mb-3 excard" onClick={this.onClick}>
                <div className="card-body card-shadow p-0">
                    <div className="row align-items-center">
                        <div className="col-2">
                            <h4 className="exdt">{monthName}</h4>
                            <h5 className="exdt">{expense.date.getDate()}</h5>
                        </div>
                        <div className="col-md-3">
                            <h2 className="extit">{expense.title}</h2>
                        </div>
                        <div className="col-md-5 exinf">
                            {content}
                        </div>
                        <div className="col-2">
                            <img className="card-img-top" src={expense.ownerId.picture}></img>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExpenseCard;