import React, { Component } from "react";
import PaymentCard from "../../presentational/PaymentCard/PaymentCard.jsx";

class PaymentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       return (
           <div>
               <PaymentCard />
               <PaymentCard />
               <PaymentCard />
           </div>
       );
    }
}

export default PaymentList;