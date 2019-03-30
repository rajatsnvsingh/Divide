import React, { Component } from "react";
import AmountButton from "../../presentational/AmountButton/AmountButton.jsx";
import NotificationButton from "../../presentational/NotificationButton/NotificationButton.jsx";
import ProfileInfo from "../../presentational/ProfileInfo/ProfileInfo.jsx";
import SignOutButton from "../../presentational/SignOutButton/SignOutButton.jsx";


class ProfileContainer extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="mb-4">
                <SignOutButton />
                <NotificationButton numNotifications="3" />
                <ProfileInfo name="Rajat Singh" />
                <AmountButton amount="50" />
                <AmountButton amount="42" />
            </div>
        );
    }
}

export default ProfileContainer;
