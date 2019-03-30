import React, { Component } from "react";
import ProfileContainer from "../ProfileContainer/ProfileContainer.jsx"
import SummaryContentContainer from "../SummaryContentContainer/SummaryContentContainer.jsx";
import './SummaryContainer.css';

class SummaryContainer extends Component {
    constructor(props){
        super(props);
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
