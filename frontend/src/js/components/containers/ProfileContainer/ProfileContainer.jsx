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
            <div className="mb-4 text-center">
                <SignOutButton />
                <NotificationButton numNotifications="3" />
                <ProfileInfo name="Rajat Singh" />
                <div className="btn-group btn-group-lg" role="group">
                    <AmountButton style="owing" amount="50" />
                    <AmountButton style="owed" amount="42" />
                </div>
            </div>
        );
    }
}

export default ProfileContainer;
