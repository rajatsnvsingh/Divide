import React, { Component } from "react";
import { viewIndexEnum } from "../Home.jsx";
import ExpenseInputContainer from "../../presentational/ExpenseInput/ExpenseInputContainer.jsx";
import SummaryContentList from "../SummaryContentList/SummaryContentList.jsx";
import "./MainContentContainer.css";
import ExpenseList from "../ExpenseList/ExpenseList.jsx";
import PaymentList from "../PaymentList/PaymentList.jsx";

class MainContentContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.viewIndex === viewIndexEnum.expenses) {
            return (
                <div className="MainExpenseContainer">
                    <div className="row">
                        <div className="col-10 removePadding">
                            <ExpenseInputContainer />
                        </div>
                        <div className="col-2 removePadding">
                            <button className="btn-dark newExpenseBtn">
                                <span className="additionSymbol">&#43;</span>
                                New Expense
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
        else {
            return (
                <div>
                    <div class="row mt-3">
                        <div class="col-md-4">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Search" />
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button">Search</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <select class="form-control">
                                <option>Status...</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <select class="form-control">
                                <option>Sort By...</option>
                            </select>
                        </div>
                        <div className="col">
                            <button type="button" class="btn btn-primary w-100">Enter a Payment</button>
                        </div>
                    </div>
                    <PaymentList />
                </div>
            );
        }
    }
}
export { MainContentContainer };