import React, { Component } from "react";
import ProfileContainer from "../ProfileContainer/ProfileContainer.jsx"
import SummaryContentContainer from "../SummaryContentContainer/SummaryContentContainer.jsx";
import './SummaryContainer.css';

export const owingsFilterEnum = Object.freeze({"noFilter": 1, "oweFilter": 2, "owedFilter": 3});
export const viewStateEnum = Object.freeze({"summary": 1, "notifications": 2});

class SummaryContainer extends Component {
    constructor(props){
        super(props);
        this.onViewStateChange = this.onViewStateChange.bind(this);
        this.toggleViewState = this.toggleViewState.bind(this);
        this.state = {
            viewState: viewStateEnum.summary,
            numNotifications: 0,
            owingsFilter: owingsFilterEnum.noFilter
        };
    }

    onViewStateChange(newViewState) {
        this.setState({viewState: newViewState});
    }

    toggleViewState() {
        if (this.state.viewState === viewStateEnum.summary) {
            this.setState({viewState: viewStateEnum.notifications});
        }

        else {
            this.setState({viewState: viewStateEnum.summary});
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                <ProfileContainer toggleViewState={this.toggleViewState} />
                <SummaryContentContainer viewState={this.state.viewState} />
            </div>
        );
    }
}

export default SummaryContainer;
