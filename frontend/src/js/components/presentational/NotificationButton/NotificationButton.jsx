import React, { Component } from "react";
import './NotificationButton.css';

class NotificationButton extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="row">
                <button type="button" class="btn btn-secondary notification-button">
                    Notifications <span class="badge badge-light">{this.props.badge}</span>
                </button>
            </div>
        );
    }
}

export default NotificationButton;