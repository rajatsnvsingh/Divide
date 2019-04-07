import React, { Component } from "react";
import ExpenseContainer from "../ExpenseContainer/ExpenseContainer.jsx";
import PaymentContainer from "../PaymentContainer/PaymentContainer.jsx";
import NavigationHeader from "../NavigationHeader/NavigationHeader.jsx";
import "./MainContentContainer.css";

let viewIndexEnum = Object.freeze({ "expenses": 1, "payments": 2 });

class MainContentContainer extends Component {
    constructor(props) {
        super(props);
        this.onNavigationButtonClick = this.onNavigationButtonClick.bind(this);
        this.state = {
            viewIndex: viewIndexEnum.payments
        }
    }

    onNavigationButtonClick(newViewIndex) {
        this.setState({viewIndex: newViewIndex});
    }

    render() {
        const viewIndex = this.state.viewIndex;

        return (
            <div className={this.props.className}>
                <NavigationHeader viewIndex={viewIndex} onNavigationButtonClick={this.onNavigationButtonClick} />
                {viewIndex === viewIndexEnum.expenses ? <ExpenseContainer myId={this.props.myId}/> : <PaymentContainer myId={this.props.myId}/>}
            </div>
        );
    }
}
export { MainContentContainer };