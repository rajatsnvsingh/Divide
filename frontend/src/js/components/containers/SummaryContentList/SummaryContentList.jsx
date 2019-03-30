import React, { Component } from "react";
import SummaryOwingsCard from "../../presentational/SummaryOwingsCard/SummaryOwingsCard.jsx";

class SummaryContentList extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <SummaryOwingsCard content="card1" />
                <SummaryOwingsCard content="card2" />
                <SummaryOwingsCard content="card3" />
            </div>
        );
    }
}

export default SummaryContentList;
