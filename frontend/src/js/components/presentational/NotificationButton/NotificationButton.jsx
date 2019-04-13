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
                    Notifications<span class="badge badge-light">3</span>
                </button>
            </div>
        );
    }
}

export default NotificationButton;