import React, { Component } from "react";
import { summaryFilterEnum } from "../../containers/SummaryContainer/SummaryContainer.jsx";

class AmountButton extends Component {
    constructor(props) {
        super(props);
        this.onAmountButtonClick = this.onAmountButtonClick.bind(this);
    }

    onAmountButtonClick() {
        if (this.props.isOwed) {
            this.props.onSummaryFilterChange(summaryFilterEnum.owed)
        }

        else {
            this.props.onSummaryFilterChange(summaryFilterEnum.owe)
        }
    }

    render() {
        const style = this.props.isOwed ? "btn btn-success" : "btn btn-danger";

        return (
            <button type="button" className={style} onClick={this.onAmountButtonClick}>
                {"$" + this.props.amount}
            </button>
        );
    }
}

export default AmountButton;
