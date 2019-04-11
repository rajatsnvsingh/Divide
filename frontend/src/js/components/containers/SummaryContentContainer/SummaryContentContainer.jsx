import React, { Component } from "react";
import SummaryContentList from "../SummaryContentList/SummaryContentList.jsx";
import NotificationContentList from "../NotificationContentList/NotificationContentList.jsx";
import { viewStateEnum, summaryFilterEnum } from "../SummaryContainer/SummaryContainer.jsx";

class SummaryContentContainer extends Component {
    constructor(props) {
        super(props);
        this.closeButtonOnClick = this.closeButtonOnClick.bind(this);
    }

    closeButtonOnClick() {
        // switch to summary view when close button clicked
        this.props.onViewStateChange(viewStateEnum.summary);
        this.props.onSummaryFilterChange(summaryFilterEnum.none);
    }

    render() {
        const viewState = this.props.viewState;

        if (viewState === viewStateEnum.summary) {
            const closeButtonStyle = this.props.summaryFilter === summaryFilterEnum.none ? "close float-right d-none" : "close float-right";

            return (
                <div>
                    <h1 className="float-left text-white">Owings</h1>
                    <button type="button" className={closeButtonStyle} onClick={this.closeButtonOnClick}>
                        <span><h1>&times;</h1></span>
                    </button>
                    <div className="clearfix mb-2"></div>
                    <SummaryContentList list={this.props.summaryList} filter={this.props.summaryFilter} />
                </div>
            );
        }

        else {
            return (
                <div>
                    <h1 className="float-left text-white">Notifications</h1>
                    <button type="button" className="close float-right" onClick={this.closeButtonOnClick}>
                        <span><h1>&times;</h1></span>
                    </button>
                    <div className="clearfix mb-2"></div>
                    <NotificationContentList />
                </div>
            );
        }
    }
}

export default SummaryContentContainer;
