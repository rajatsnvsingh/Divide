import React, { Component } from "react";
import SummaryOwingsCard from "../../presentational/SummaryOwingsCard/SummaryOwingsCard.jsx";

class SummaryContentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SummaryOwingsCard name="Rajat" amount={24} isOwed={true} />
                <SummaryOwingsCard name="Ruble" amount={42} isOwed={false} />
                <SummaryOwingsCard name="Rajat" amount={10} isOwed={true} />
            </div>
        );
    }
}

export default SummaryContentList;
