import React, { Component } from "react";
import ExpenseInputContainer from "../../presentational/ExpenseInput/ExpenseInputContainer.jsx";
import ExpenseList from "../ExpenseList/ExpenseList.jsx";

class ExpenseContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            filterType: 1, // Probably create an enum for this later
            sortType: 1, // Probably create an enum for this later
            viewClosedExpenses: false
        };
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-10 removePadding">
                        <ExpenseInputContainer />
                    </div>
                    <div className="col-2 removePadding">
                        <button className="btn-dark newExpenseBtn removePadding text-center">
                            <span className="additionSymbol">&#43;</span>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ExpenseList />
                    </div>
                </div>
            </div>
        );
    }
}

export default ExpenseContainer;
