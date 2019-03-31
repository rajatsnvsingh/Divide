import React, { Component } from "react";
import SummaryOwingsCard from "../../presentational/SummaryOwingsCard/SummaryOwingsCard.jsx";
import NotificationCard from "../../presentational/NotificationCard/NotificationCard.jsx";

class SummaryContentList extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const isSummaryList = this.props.isSummaryList;

        if (isSummaryList) {
            return (
                <div>
                    <SummaryOwingsCard name="Rajat" amount={24} isOwed={true} />
                    <SummaryOwingsCard name="Ruble" amount={42} isOwed={false} />
                    <SummaryOwingsCard name="Rajat" amount={10} isOwed={true} />
                </div>
            );
        }

        else {
            return (
                <div>
                    <NotificationCard isPayment={true} content="Alex has payed you $50." />
                    <NotificationCard isPayment={false} content="Sarah has added you to an Expense. You owe Sarah $17." />
                    <NotificationCard isPayment={false} content="Eric has accepted your payment of $73." />
                </div>
            );
        }
    }
}

export default SummaryContentList;
