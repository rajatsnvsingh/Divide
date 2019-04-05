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
            <div className={this.props.className}>
                <ProfileContainer />
                <SummaryContentContainer />
            </div>
        );
    }
}

export default SummaryContainer;
