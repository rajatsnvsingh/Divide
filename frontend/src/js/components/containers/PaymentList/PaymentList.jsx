import React, { Component } from "react";
import PaymentCard from "../../presentational/PaymentCard/PaymentCard.jsx";
import NewPaymentCard from "../../presentational/NewPaymentCard/NewPaymentCard.jsx";

class PaymentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    key: 1,
                    name: "Alex",
                    amount: 40,
                    date: new Date(),
                    isConfirmation: false
                },
                {
                    key: 2,
                    name: "Eric",
                    amount: 73,
                    date: new Date(),
                    isConfirmation: true
                }
            ]
        };
    }

    render() {
        const list = this.state.list;
        const content = list.map((x) =>
            <PaymentCard key={x.key} name={x.name} amount={x.amount} date={x.date} isConfirmation={x.isConfirmation} />
        );

        return (
            <div>
                <NewPaymentCard />
                {content}
            </div>
        );
    }
}

export default PaymentList;