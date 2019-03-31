import React, { Component } from "react";

class NotificationCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isPayment = this.props.isPayment;
        const content = this.props.content;

        return (
            <div class="card mb-3">
                <div class="card-header p-2">
                    <h6 class="float-left">{isPayment ? "Payment" : "Expense"}</h6>
                    <button type="button" class="close float-right"><span>&times;</span></button>
                </div>
                <div class="card-body p-3">
                    {content}
                </div>
            </div>
        );
    }
}

export default NotificationCard;
