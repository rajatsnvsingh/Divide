import React, { Component } from "react";
import NotificationCard from "../../presentational/NotificationCard/NotificationCard.jsx";
import './NotificationContentList.css';

class NotificationContentList extends Component {
    constructor(props){
        super(props);
        this.state = {
            notifications: []
        };
    }

    render() {
        return (
            <div className="content-container">
                <NotificationCard isPayment={true} content="Alex has payed you $50." />
                <NotificationCard isPayment={false} content="Sarah has added you to an Expense. You owe Sarah $17." />
                <NotificationCard isPayment={false} content="Eric has accepted your payment of $73." />
            </div>
        );
    }
}

export default NotificationContentList;
