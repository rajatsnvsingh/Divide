import React, { Component } from "react";
import './NotificationButton.css';

class NotificationButton extends Component {
    constructor(props){
        super(props);
        this.onNotificationButtonClick = this.onNotificationButtonClick.bind(this);
    }

    onNotificationButtonClick() {
        this.props.toggleViewState();
    }

    render() {
        return (
            <div className="row">
                <button type="button" className="btn btn-secondary notification-button" onClick={this.onNotificationButtonClick}>
                    Notifications   <span className="badge badge-light">{this.props.count}</span>
                </button>
            </div>
        );
    }
}

export default NotificationButton;