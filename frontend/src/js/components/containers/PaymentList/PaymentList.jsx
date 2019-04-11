import React, { Component } from "react";
import PaymentCard from "../../presentational/PaymentCard/PaymentCard.jsx";
import NewPaymentCard from "../../presentational/NewPaymentCard/NewPaymentCard.jsx";

class PaymentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payments: []
        };
    }

    render() {
       return (
           <div>
               <NewPaymentCard />
               <PaymentCard name="Alex" amount={40} isConfirmation={false} />
               <PaymentCard name="Eric" amount={73} isConfirmation={true} />
           </div>
       );
    }
}

export default PaymentList;