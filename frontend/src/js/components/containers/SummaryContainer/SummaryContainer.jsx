import React, { Component } from "react";
import ProfileContainer from "../ProfileContainer/ProfileContainer.jsx"
import SummaryContentContainer from "../SummaryContentContainer/SummaryContentContainer.jsx";
import './SummaryContainer.css';

export const owingsFilterEnum = Object.freeze({"noFilter": 1, "oweFilter": 2, "owedFilter": 3});
export const viewStateEnum = Object.freeze({"summary": 1, "notifications": 2});

class SummaryContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            viewState: viewStateEnum.summary,
            numNotifications: 0,
            owingsFilter: owingsFilterEnum.noFilter
        };
    }

    render() {
        return (
            <div className={this.props.className}>
                <ProfileContainer />
                <SummaryContentContainer viewState={this.state.viewState} />
            </div>
        );
    }
}

export default SummaryContainer;
