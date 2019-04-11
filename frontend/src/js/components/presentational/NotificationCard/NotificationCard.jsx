import React, { Component } from "react";

class NotificationCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let header;
        let content;

        if (this.props.isPayment) {
            header = "Payment";
            content = <p>{this.props.name} has payed you <b className="text-success">${this.props.amount}</b></p>
        }
        else {
            header = "Expense";
            content = <p>You owe {this.props.name} <b className="text-danger">${this.props.amount}</b></p>
        }

        return (
            <div className="card mb-3">
                <div className="card-header p-2">
                    <h6 className="float-left">{header}</h6>
                </div>
                <div className="card-body p-3">
                    {content}
                </div>
            </div>
        );
    }
}

export default NotificationCard;
