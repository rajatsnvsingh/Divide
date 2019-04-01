import React, { Component } from "react";
import { viewIndexEnum } from "../Home.jsx";
import ExpenseInputContainer from "../../presentational/ExpenseInput/ExpenseInputContainer.jsx";
import SummaryContentList from "../SummaryContentList/SummaryContentList.jsx";
import "./MainContentContainer.css";

class MainContentContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.viewIndex === viewIndexEnum.expenses) {
            return (
                <div className="MainExpenseContainer">
                    <div className="container-fluid">
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
                                
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="MainPaymentContainer">
                    {/* <div className="container-fluid">
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
                    </div> */}
                </div>
            );
        }
    }
}
export { MainContentContainer };