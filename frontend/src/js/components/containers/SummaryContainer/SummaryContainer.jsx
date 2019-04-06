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
            numNotifications: 0,
            owingsFilter: owingsFilterEnum.noFilter
        };
    }

    render() {
        return (
            <div className={this.props.className}>
                <ProfileContainer />
                <SummaryContentContainer />
            </div>
        );
    }
}

export default SummaryContainer;
