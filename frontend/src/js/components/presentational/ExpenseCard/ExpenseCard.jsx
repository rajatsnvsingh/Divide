import React, { Component } from "react";
import "./ExpenseCard.css";
class ExpenseCard extends Component {
    constructor(props) {
        super(props);
    }

    generateExpenseMessage(expense) {
        if (expense.isOwed) {
            if (expense.owee.length === 1) {
                return <p>{expense.owee[0].name} owes you <span className="text-success tsex">${expense.totalAmount}</span></p>;
            }
            else if (expense.owee.length <= 2) {
                return <p>{expense.owee[0].name} and {expense.owee[1].name} owe you <span className="text-success tsex">${expense.totalAmount}</span></p>;
            }
            else {
                return <p>{expense.owee[0].name}, {expense.owee[1].name}, and {expense.owee.length - 2} other(s) owe you <span className="text-success tsex">${expense.totalAmount}</span></p>;
            }
        }
        else {
            let amount = 0;
            for(let user of expense.owee){
                if(user.id === this.props.myId){
                    amount = user.amount;
                }
            }
            return <p>You owe {expense.owner} <span className="text-danger tdex">${amount}</span></p>;
        }
    }

    generateMonthName(expense){
        // Get Month Name from Date
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[expense.date.getMonth()];
    }

    render() {
        const expense = this.props.expense;
        let content = this.generateExpenseMessage(expense);
        let monthName = this.generateMonthName(expense);

        return (
            <div className="card mb-3 excard">
                <div className="card-body p-0">
                    <div className="row align-items-center">
                        <div className="col-2">
                            <h4>{monthName}</h4>
                            <h5>{expense.date.getDate()}</h5>
                        </div>
                        <div className="col-md-3 extit">
                            <h2>{expense.title}</h2>
                        </div>
                        <div className="col-md-5 exinf">
                            {content}
                        </div>
                        <div className="col-2">
                            <img className="card-img-top" src={expense.imageURL}></img>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExpenseCard;