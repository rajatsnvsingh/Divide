import React, { Component } from "react";
import SummaryOwingsCard from "../../presentational/SummaryOwingsCard/SummaryOwingsCard.jsx";
import './SummaryContentList.css';
import { summaryFilterEnum } from "../SummaryContainer/SummaryContainer.jsx";

class SummaryContentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                <SummaryOwingsCard name="Rajat" amount={24} isOwed={true} />,
                <SummaryOwingsCard name="Ruble" amount={42} isOwed={false} />,
                <SummaryOwingsCard name="Rajat" amount={10} isOwed={true} />
            ]
        };
    }

    getList() {
        const filter = this.props.filter;
        const list = this.state.list;

        switch (filter) {
            case summaryFilterEnum.none:
            default:
                return list;

            case summaryFilterEnum.owe:
                return list.filter(x => x.props.isOwed === false);

            case summaryFilterEnum.owed:
                return list.filter(x => x.props.isOwed === true);
        }
    }

    render() {
        const list = this.getList();

        return (
            <div className="content-container">
                {list}
            </div>
        );
    }
}

export default SummaryContentList;
