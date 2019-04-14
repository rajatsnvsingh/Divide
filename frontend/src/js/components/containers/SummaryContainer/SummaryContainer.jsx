import React, { Component } from "react";
import ProfileContainer from "../ProfileContainer/ProfileContainer.jsx"
import SummaryContentContainer from "../SummaryContentContainer/SummaryContentContainer.jsx";
import './SummaryContainer.css';

export const summaryFilterEnum = Object.freeze({"none": 1, "owed": 2, "owe": 3});
export const viewStateEnum = Object.freeze({"summary": 1, "notifications": 2});

class SummaryContainer extends Component {
    constructor(props){
        super(props);
        this.onSummaryFilterChange = this.onSummaryFilterChange.bind(this);
        this.onViewStateChange = this.onViewStateChange.bind(this);
        this.toggleViewState = this.toggleViewState.bind(this);
        this.state = {
            viewState: viewStateEnum.summary,
            summaryFilter: summaryFilterEnum.none
        };
    }

    onSummaryFilterChange(newFilter) {
        // set new filter
        this.setState({summaryFilter: newFilter});

        // automatically change view to summary when filter changed
        this.setState({viewState: viewStateEnum.summary});
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
            <div className="sidenav">
                <ProfileContainer 
                    myPicture = {this.props.myPicture}
                    myId = {this.props.myId}
                    onSummaryFilterChange={this.onSummaryFilterChange} 
                    name={this.props.name} 
                    summaryList={this.props.summaryList}
                />
                <SummaryContentContainer
                    toggleViewState={this.toggleViewState} 
                    viewState={this.state.viewState}
                    onViewStateChange={this.onViewStateChange}
                    onSummaryFilterChange={this.onSummaryFilterChange}
                    summaryFilter={this.state.summaryFilter}
                    summaryList={this.props.summaryList}
                />
            </div>
        );
    }
}

export default SummaryContainer;
