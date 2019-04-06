import React, { Component } from "react";
import PaymentList from "../PaymentList/PaymentList.jsx";
import PaymentInputContainer from "../PaymentInputContainer/PaymentInputContainer.jsx";

class PaymentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            filterType: 1, // Create an enum for this probably
            sortType: 1 // Create an enum for this probably
        };
    }

    render() {
        return (
            <div>
                <PaymentInputContainer />
                <PaymentList />
            </div>
        );
    }
}

export default PaymentContainer;
