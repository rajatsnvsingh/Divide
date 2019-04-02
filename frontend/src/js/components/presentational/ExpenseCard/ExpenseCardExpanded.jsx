import React, { Component } from "react";
import ExpanseCardExpandedInput from "./ExpenseCardExpandedInput.jsx";
import ExpenseCardExpandedUserList from "./ExpenseCardExpandedUserList.jsx";

const splitTypeEnum = Object.freeze({ "fraction": 1 });
const expenseStatusType = Object.freeze({ "pending": 1, "open": 2, "closed": 3 });

class ExpenseCardExpanded extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const expense = this.props.expense;

        // Expense Data
        const title = expense.title;
        const date = expense.date;
        const status = expense.status;
        const totalAmount = expense.totalAmount;
        const owner = expense.owner;
        const owee = expense.owee;

        return (
            <div className="card mb-3">
                <div className="card-body p-0">
                    <ExpanseCardExpandedInput title={title} date={date} totalAmount={totalAmount} owner={owner}/>
                    <ExpenseCardExpandedUserList />
                    <div className="row">
                        <div className="col btn-group">
                            <button className="btn btn-secondary">Cancel</button>
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export { expenseStatusType };
export { splitTypeEnum };
export default ExpenseCardExpanded;