import React, { Component } from "react";
import { viewIndexEnum } from "../Home.jsx";
import ExpenseInputContainer from "../../presentational/ExpenseInput/ExpenseInputContainer.jsx";
import ExpenseList from "../ExpenseList/ExpenseList.jsx";
import PaymentList from "../PaymentList/PaymentList.jsx";
import NavigationHeader from "../NavigationHeader/NavigationHeader.jsx";
import "./MainContentContainer.css";

class MainContentContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.viewIndex === viewIndexEnum.expenses) {
            return (
                <div className="col-md-10">
                    <NavigationHeader />
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
        else {
            return (
                <div className="col-md-10">
                    <NavigationHeader />
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">Search</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <select className="form-control">
                                <option>Status...</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select className="form-control">
                                <option>Sort By...</option>
                            </select>
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-primary w-100">Enter a Payment</button>
                        </div>
                    </div>
                    <PaymentList />
                </div>
            );
        }
    }
}
export { MainContentContainer };