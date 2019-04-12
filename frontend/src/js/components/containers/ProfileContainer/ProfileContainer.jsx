import React, { Component } from "react";
import AmountButton from "../../presentational/AmountButton/AmountButton.jsx";
import NotificationButton from "../../presentational/NotificationButton/NotificationButton.jsx";
import ProfileInfo from "../../presentational/ProfileInfo/ProfileInfo.jsx";

class ProfileContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mb-4 text-center">
                <NotificationButton badge={3} toggleViewState={this.props.toggleViewState} />
                <ProfileInfo name={this.props.name} />
                <div className="btn-group btn-group-lg" role="group">
                    <AmountButton isOwed={true} amount={50} onSummaryFilterChange={this.props.onSummaryFilterChange} />
                    <AmountButton isOwed={false} amount={42} onSummaryFilterChange={this.props.onSummaryFilterChange} />
                </div>
            </div>
        );
    }
}

export default ProfileContainer;
