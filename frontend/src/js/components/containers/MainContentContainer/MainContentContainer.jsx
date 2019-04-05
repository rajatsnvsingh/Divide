import React, { Component } from "react";
import { viewIndexEnum } from "../Home.jsx";
import ExpenseContainer from "../ExpenseContainer/ExpenseContainer.jsx";
import PaymentContainer from "../PaymentContainer/PaymentContainer.jsx";
import NavigationHeader from "../NavigationHeader/NavigationHeader.jsx";
import "./MainContentContainer.css";

class MainContentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewIndex: viewIndexEnum.payments
        }
    }

    render() {
        if (this.state.viewIndex === viewIndexEnum.expenses) {
            return (
                <div className={this.props.className}>
                    <NavigationHeader viewIndex={this.state.viewIndex} />
                    <ExpenseContainer />
                </div>
            );
        }

        else {
            return (
                <div className={this.props.className}>
                    <NavigationHeader viewIndex={this.state.viewIndex} />
                    <PaymentContainer />
               </div>
            );
        }
    }
}
export { MainContentContainer };