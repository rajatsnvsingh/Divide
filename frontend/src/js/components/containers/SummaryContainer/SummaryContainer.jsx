import React, { Component } from "react";
import ProfileContainer from "../ProfileContainer/ProfileContainer.jsx"
import SummaryContentContainer from "../SummaryContentContainer/SummaryContentContainer.jsx";

class SummaryContainer extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="sidebar">
                <ProfileContainer />
                <SummaryContentContainer />
            </div>
        );
    }
}

export default SummaryContainer;
