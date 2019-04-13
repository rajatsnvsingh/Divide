import React, { Component } from "react";
import NotificationCard from "../../presentational/NotificationCard/NotificationCard.jsx";
import './NotificationContentList.css';
import { socket } from "../../../../App.js";
import NotificationButton from "../../presentational/NotificationButton/NotificationButton.jsx";

class NotificationContentList extends Component {
    constructor(props) {
        super(props);
        this.onCardClosedCallback = this.onCardClosedCallback.bind(this);
        this.state = {
            notifications: []
        };
    }

    componentDidMount() {
        socket.emit(
            "get_notifications",
            function(notifications_list) {
              this.setState({
                notifications: notifications_list
              });
            }.bind(this)
          );

          socket.on("incoming_notification", function(data) {
            console.log("incoming notification!");
            let {notifications} = this.state;
            let n = JSON.parse(data);
            console.log(n);
            notifications.push(JSON.parse(data));
            this.setState(notifications);
          }.bind(this));
    }

    onCardClosedCallback(id) {
        let notificationId = id.substring(13);
        let {notifications} = this.state;
        let notification = notifications.filter(obj => {
            return obj._id === notificationId
          });
        socket.emit(
            "dismiss_notifications",
            JSON.stringify(notification[0]),
            function(response) {
            }
          );
        document.getElementById(id).remove(id);
    }

    render() {
        const list = this.state.notifications;
        let content = [];
        if (list.length > 0) {
            content = list.map((x) => 
                <NotificationCard key={x._id} notification={x} onCardClosed={this.onCardClosedCallback}/>
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
