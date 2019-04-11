import React, { Component } from "react";
import './NotificationButton.css';
import { viewStateEnum } from "../../containers/SummaryContainer/SummaryContainer.jsx";

class NotificationButton extends Component {
    constructor(props){
        super(props);
        this.onNotificationButtonClick = this.onNotificationButtonClick.bind(this);
    }

    onNotificationButtonClick() {
        this.props.onViewStateChange(viewStateEnum.notifications);
    }

    render() {
        return (
            <div className="row">
                <button type="button" className="btn btn-secondary notification-button" onClick={this.onNotificationButtonClick}>
                    Notifications <span className="badge badge-light">{this.props.badge}</span>
                </button>
            </div>
        );
    }
}

export default NotificationButton;