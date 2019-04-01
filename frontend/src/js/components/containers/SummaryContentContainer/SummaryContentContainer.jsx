import React, { Component } from "react";
import SummaryContentList from "../SummaryContentList/SummaryContentList.jsx";
import NotificationContentList from "../NotificationContentList/NotificationContentList.jsx";

class SummaryContentContainer extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const isSummaryList = true;
        return (
            <div>
                <h1 className="float-left">Owings</h1>
                <button type="button" className="close float-right"><span><h1>&times;</h1></span></button>
                <div className="clearfix mb-2"></div>
                { isSummaryList ? <SummaryContentList /> : <NotificationContentList /> }
            </div>
        );
    }
}

export default SummaryContentContainer;
