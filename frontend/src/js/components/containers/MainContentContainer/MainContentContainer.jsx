import React, { Component } from "react";
import { viewIndexEnum } from "../Home.jsx";
import ExpenseContainer from "../ExpenseContainer/ExpenseContainer.jsx";
import PaymentContainer from "../PaymentContainer/PaymentContainer.jsx";
import NavigationHeader from "../NavigationHeader/NavigationHeader.jsx";
import "./MainContentContainer.css";

class MainContentContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.viewIndex === viewIndexEnum.expenses) {
            return (
                <div className={this.props.className}>
                    <NavigationHeader />
                    <ExpenseContainer />
                </div>
            );
        }

        else {
            return (
                <div className={this.props.className}>
                    <NavigationHeader />
                    <PaymentContainer />
               </div>
            );
        }
    }
}
export { MainContentContainer };