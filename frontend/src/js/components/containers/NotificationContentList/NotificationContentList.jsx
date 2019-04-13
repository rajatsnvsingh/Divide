import React, { Component } from "react";
import NotificationCard from "../../presentational/NotificationCard/NotificationCard.jsx";
import './NotificationContentList.css';

class NotificationContentList extends Component {
    constructor(props) {
        super(props);
        this.onNotificationCardClosedCallback = this.onNotificationCardClosedCallback.bind(this);
    }

    onNotificationCardClosedCallback(id) {
        this.props.notificationDismissedCallback(id)
    }

    render() {
        let list = this.props.notifications;
        let content = [];
        if (list.length > 0) {
            list = list.reverse();
            content = list.map((x) => 
                <NotificationCard key={x._id} notification={x} onCardClosed={this.onNotificationCardClosedCallback}/>
            );
        }
        return (
            <div className="content-container">
                {content}
           </div>
        );
    }
}

export default NotificationContentList;
