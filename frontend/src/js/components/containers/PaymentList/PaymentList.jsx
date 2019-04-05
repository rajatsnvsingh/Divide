import React, { Component } from "react";
import PaymentCard from "../../presentational/PaymentCard/PaymentCard.jsx";
import PaymentConfirmationCard from "../../presentational/PaymentConfirmationCard/PaymentConfirmationCard.jsx";

class PaymentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       return (
           <div>
               <PaymentCard />
               <PaymentConfirmationCard />
               <PaymentCard />
           </div>
       );
    }
}

export default PaymentList;