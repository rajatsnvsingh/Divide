import React, { Component } from "react";
import NotificationCard from "../../presentational/NotificationCard/NotificationCard.jsx";

class NotificationContentList extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <NotificationCard isPayment={true} content="Alex has payed you $50." />
                <NotificationCard isPayment={false} content="Sarah has added you to an Expense. You owe Sarah $17." />
                <NotificationCard isPayment={false} content="Eric has accepted your payment of $73." />
            </div>
        );
    }
}

export default NotificationContentList;
