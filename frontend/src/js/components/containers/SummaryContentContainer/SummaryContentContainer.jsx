import React, { Component } from "react";
import SummaryContentList from "../SummaryContentList/SummaryContentList.jsx";
import NotificationContentList from "../NotificationContentList/NotificationContentList.jsx";
import { viewStateEnum } from "../SummaryContainer/SummaryContainer.jsx";

class SummaryContentContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const viewState = this.props.viewState;

        if (viewState === viewStateEnum.summary) {
            return (
                <div>
                    <h1 className="float-left">Owings</h1>
                    <button type="button" className="close float-right"><span><h1>&times;</h1></span></button>
                    <div className="clearfix mb-2"></div>
                    <SummaryContentList />
                </div>
            );
        }

        else {
            return (
                <div>
                    <h1 className="float-left">Notifications</h1>
                    <button type="button" className="close float-right"><span><h1>&times;</h1></span></button>
                    <div className="clearfix mb-2"></div>
                    <NotificationContentList />
                </div>
            );
        }
    }
}

export default SummaryContentContainer;
