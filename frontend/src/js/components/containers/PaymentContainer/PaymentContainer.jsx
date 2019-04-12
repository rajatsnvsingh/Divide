import React, { Component } from "react";
import PaymentList from "../PaymentList/PaymentList.jsx";
import PaymentInputContainer from "../PaymentInputContainer/PaymentInputContainer.jsx";

class PaymentContainer extends Component {
    constructor(props) {
        super(props);
        this.onNewPaymentChange = this.onNewPaymentChange.bind(this);
        this.state = {
            searchTerm: "",
            filterType: 1, // Create an enum for this probably
            sortType: 1, // Create an enum for this probably
            newPayment: false
        };
    }

    onNewPaymentChange(newState) {
        this.setState({newPayment: newState});
    }

    render() {
        return (
            <div>
                <PaymentInputContainer onNewPaymentChange={this.onNewPaymentChange} />
                <PaymentList newPayment={this.state.newPayment} onNewPaymentChange={this.onNewPaymentChange} />
            </div>
        );
    }
}

export default PaymentContainer;
