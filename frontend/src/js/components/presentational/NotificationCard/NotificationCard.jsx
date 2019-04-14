import React, { Component } from "react";

class NotificationCard extends Component {
    constructor(props) {
        super(props);
        this.closeButtonOnClick = this.closeButtonOnClick.bind(this);
    }

    closeButtonOnClick(id) {
        this.props.onCardClosed(id);
    }

    render() {
        let [header, content] = this.getNotificationText(this.props.notification);
        let cardId = "notification-" + this.props.notification._id;
        let text = <p>{content}</p>
        return (
            <div id={cardId} className="card mb-3">
                <div className="card-header p-2">
                    <h6 className="float-left">{header}</h6>
                    <button type="button" className="close float-right" onClick={() => this.closeButtonOnClick(cardId)}>
                        <span>&times;</span>
                    </button>
                </div>
                <div className="card-body p-3">
                    {text}
                </div>
            </div>
        );
    }

    getNotificationText(notification) {
        let header="";
        let content="";
        switch(Number(notification.type)) {
            case 1: // expense added
                header = 'Expense';
                content = notification.expenseId.ownerId.name + ' added you to an expense';
                break;
            case 2: //payment added
                header = 'Payment';
                content = notification.paymentId.payerId.name + ' paid you';
                break;
            case 3: //payment deleted
                header = 'Payment';
                content = content = notification.payeeName + ' rejected your payment';
                break;
            case 4: //expense updated
                header = 'Expense';
                content = notification.expenseId.ownerId.name + ' updated an expense'
                break;
            case 5: //payment accepted
                header = 'Payment';
                content = content = notification.paymentId.payeeId.name + ' accepted your payment';
                break;
            default:
                return "invalid type";
        }
        return [header, content];
    }
}

export default NotificationCard;
