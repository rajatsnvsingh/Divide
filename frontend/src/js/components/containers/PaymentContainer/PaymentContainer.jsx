import React, { Component } from "react";
import PaymentList from "../PaymentList/PaymentList.jsx";
import PaymentInputContainer from "../PaymentInputContainer/PaymentInputContainer.jsx";

class PaymentContainer extends Component {
    constructor(props) {
        super(props);
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
