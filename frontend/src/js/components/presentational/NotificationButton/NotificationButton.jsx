import React, { Component } from "react";

class NotificationButton extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            // will have a bell icon here
            <div>
                {this.props.NumNotifications}
            </div>
        );
    }
}

export default NotificationButton;