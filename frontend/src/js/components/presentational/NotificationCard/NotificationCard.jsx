import React, { Component } from "react";

class NotificationCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isPayment = this.props.isPayment;
        const content = this.props.content;

        return (
            <div className="card mb-3">
                <div className="card-header p-2">
                    <h6 className="float-left">{isPayment ? "Payment" : "Expense"}</h6>
                </div>
                <div className="card-body p-3">
                    {content}
                </div>
            </div>
        );
    }
}

export default NotificationCard;
