import React, { Component } from "react";
import ProfileContainer from "../ProfileContainer/ProfileContainer.jsx"
import SummaryContentContainer from "../SummaryContentContainer/SummaryContentContainer.jsx";
import './SummaryContainer.css';

let owingsFilterEnum = Object.freeze({"noFilter": 1, "oweFilter": 2, "owedFilter": 3});

class SummaryContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            viewNotification: false,
            amountOwed: 0,
            amountOwing: 0,
            numNotifications: 0,
            owingsFilter: owingsFilterEnum.noFilter
        };
    }

    render() {
        return (
            <div className="col-md-2 sidenav">
                <ProfileContainer />
                <SummaryContentContainer />
            </div>
        );
    }
}

export default SummaryContainer;
