import React, { Component } from "react";
import AmountButton from "../../presentational/AmountButton/AmountButton.jsx";
import NotificationButton from "../../presentational/NotificationButton/NotificationButton.jsx";
import ProfileInfo from "../../presentational/ProfileInfo/ProfileInfo.jsx";

class ProfileContainer extends Component {
    constructor(props) {
        super(props);
    }

    computeAmountTotals(){
        let summaryList = this.props.summaryList;
        let amountTotals = {amountOwed: 0, amountOwing: 0};
        summaryList.forEach(summary => {
            if(summary.amount > 0)
                amountTotals.amountOwed += summary.amount;
            else if(summary.amount < 0)
                amountTotals.amountOwing += (summary.amount * -1); 
        });
        return amountTotals;
    }

    render() {
        let amountTotals = this.computeAmountTotals();

        return (
            <div className="mb-4 text-center">
                <NotificationButton badge={3} toggleViewState={this.props.toggleViewState} />
                <ProfileInfo name={this.props.name} />
                <div className="btn-group btn-group-lg" role="group">
                    <AmountButton isOwed={true} amount={amountTotals.amountOwed} onSummaryFilterChange={this.props.onSummaryFilterChange} />
                    <AmountButton isOwed={false} amount={amountTotals.amountOwing} onSummaryFilterChange={this.props.onSummaryFilterChange} />
                </div>
            </div>
        );
    }
}

export default ProfileContainer;
