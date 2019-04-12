import React, { Component } from "react";
import SummaryOwingsCard from "../../presentational/SummaryOwingsCard/SummaryOwingsCard.jsx";
import { summaryFilterEnum } from "../SummaryContainer/SummaryContainer.jsx";
import './SummaryContentList.css';

class SummaryContentList extends Component {
    constructor(props) {
        super(props);
     }

    getList() {
        const filter = this.props.filter;
        const list = this.props.list;
        let filtered;

        switch (filter) {
            case summaryFilterEnum.owe:
                filtered = list.filter(x => x.amount < 0);
                break;

            case summaryFilterEnum.owed:
                filtered = list.filter(x => x.amount > 0);
                break;                
            
            case summaryFilterEnum.none:
            default:
                filtered = list;
                break;
        }

        return filtered.map((x) =>
            <SummaryOwingsCard key={x.userId} name={x.name} amount={x.amount} />
        );
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
