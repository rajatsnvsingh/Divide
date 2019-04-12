import React, { Component } from "react";
import OpenClosedToggle from "./OpenClosedToggle.jsx";
import "./ExpenseInputContainer.css";

const filterTypeEnum = Object.freeze({ noFilter: 1, myExpenses: 2, otherExpenses: 3 });
const sortTypeEnum = Object.freeze({ titleAsc: 1, titleDesc: 2, priceHigh: 3, priceLow: 4, latest: 5, oldest: 6 });

class ExpenseInputContainer extends Component {
    constructor(props) {
        super(props);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.onSearchTermChanged = this.onSearchTermChanged.bind(this);
    }

    // Callback Event Handlers
    onSearchTermChanged(event) {
        this.props.onSearchTermChanged(event.target.value);
    }

    onFilterChange(event) {
        this.props.onFilterTypeChanged(parseInt(event.target.value));
    }

    onSortChange(event) {
        this.props.onSortTypeChanged(parseInt(event.target.value));
    }

    render() {
        return (
            <div className="ExpenseInput">
                <div className="row">
                    <div className="col">
                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" value={this.props.searchTerm} onChange={this.onSearchTermChanged}></input>
                    </div>
                </div>

                <div id="bottom-input-row" className="row">
                    <div className="col-3">
                        <select className="form-control" onChange={this.onFilterChange} value={this.props.filterType}>
                            <option value={filterTypeEnum.noFilter}>No Filter</option>
                            <option value={filterTypeEnum.myExpenses}>My Expenses</option>
                            <option value={filterTypeEnum.otherExpenses}>Other Expenses</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <select className="form-control" onChange={this.onSortChange} value={this.props.sortType}>
                            <option value={sortTypeEnum.titleAsc}>Title-Ascending</option>
                            <option value={sortTypeEnum.titleDesc}>Title-Descending</option>
                            <option value={sortTypeEnum.priceHigh}>Price-Highest</option>
                            <option value={sortTypeEnum.priceLow}>Price-Lowest</option>
                            <option value={sortTypeEnum.latest}>Latest</option>
                            <option value={sortTypeEnum.oldest}>Oldest</option>
                        </select>
                    </div>
                    <div className="open-closed-toggle col-3">
                        <OpenClosedToggle viewClosedExpenses={this.props.viewClosedExpenses} onViewClosedExpensesChanged={this.props.onViewClosedExpensesChanged} />
                    </div>
                </div>
            </div>
        );
    }
}
export default ExpenseInputContainer;