import React, { Component } from "react";
import {viewIndexEnum} from "../Home.jsx";
import ExpenseInputContainer from "../../presentational/ExpenseInput/ExpenseInputContainer.jsx";
import SummaryContentList from "../SummaryContentList/SummaryContentList.jsx";

class MainContentContainer extends Component {
    constructor(props){
        super(props);
    }

    render() {
        if(this.props.viewIndex === viewIndexEnum.expenses){
            return (
                <div className="MainExpenseContainer">
                    <ExpenseInputContainer />
                    <button className="btn btn-lg btn-dark">
                        <span>&#43;</span>
                        <h3>New Expense</h3>
                    </button>
                </div>
            );
        }
        else if(this.props.viewIndex === viewIndexEnum.payments){
            return (
                <div className="MainPaymentContainer">
                    
                </div>
            );
        }
        else{
            return <div className="MainExpenseContainer">
                    
            </div>
        }
    }
}
export {MainContentContainer};