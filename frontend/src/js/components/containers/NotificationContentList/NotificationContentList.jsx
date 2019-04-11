import React, { Component } from "react";
import NotificationCard from "../../presentational/NotificationCard/NotificationCard.jsx";
import './NotificationContentList.css';

class NotificationContentList extends Component {
    constructor(props){
        super(props);
        this.state = {
            notifications: [
                
            ]
        };
    }

    render() {
        return (
            <div className="content-container">
                <NotificationCard isPayment={true} name="Alex" amount={10} />
                <NotificationCard isPayment={false} name="Sarah" amount={15} />
                <NotificationCard isPayment={false} name="Eric" amount={12} />
            </div>
        );
    }
}

export default NotificationContentList;
