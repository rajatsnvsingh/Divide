import React, { Component } from "react";
import NotificationCard from "../../presentational/NotificationCard/NotificationCard.jsx";
import './NotificationContentList.css';

class NotificationContentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    name: "Alex",
                    amount: 10,
                    isPayment: true
                },
                {
                    name: "Sarah",
                    amount: 15,
                    isPayment: false
                },
                {
                    name: "Eric",
                    amount: 12,
                    isPayment: 12
                }
            ]
        };
    }

    render() {
        const list = this.state.list;
        const content = list.map((x) =>
            <NotificationCard name={x.name} amount={x.amount} isPayment={x.isPayment} />
        );

        return (
            <div className="content-container">
                {content}
           </div>
        );
    }
}

export default NotificationContentList;
