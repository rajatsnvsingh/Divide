import React, { Component } from "react";
import PaymentCard from "../../presentational/PaymentCard/PaymentCard.jsx";
import PaymentConfirmationCard from "../../presentational/PaymentConfirmationCard/PaymentConfirmationCard.jsx";
import NewPaymentCard from "../../presentational/NewPaymentCard/NewPaymentCard.jsx";

class PaymentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       return (
           <div>
               <NewPaymentCard />
               <PaymentCard />
               <PaymentConfirmationCard />
           </div>
       );
    }
}

export default PaymentList;