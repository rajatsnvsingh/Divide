import React, { Component } from "react";
import OpenClosedToggle from "./OpenClosedToggle.jsx";
import "./ExpenseInputContainer.css";

const filterTypeEnum = Object.freeze({ noFilter: 1, myExpenses: 2, otherExpenses: 3 });
const sortTypeEnum = Object.freeze({ titleAsc: 1, titleDesc: 2, priceHigh: 3, priceLow: 4, latest: 5, oldest: 6 });

class ExpenseInputContainer extends Component {
    constructor(props) {
        super(props);
        this.onInternalSearchTermChange = this.onInternalSearchTermChange.bind(this);
        this.onFilterClick = this.onFilterClick.bind(this);
        this.onSortClick = this.onSortClick.bind(this);
        this.onSearchTermChanged = this.onSearchTermChanged.bind(this);
        this.onFilterTypeClicked = this.onFilterTypeClicked.bind(this);
        this.onSortTypeClicked = this.onSortTypeClicked.bind(this);
        this.state = {
            internalSearchTerm: this.props.searchTerm,
            filterDropdown: "",
            sortDropdown: ""
        };
    }

    // Internal Event Handlers
    onInternalSearchTermChange(event) {
        this.setState({ internalSearchTerm: event.target.value });
    }

    onFilterClick() {
        if (this.state.filterDropdown === "") {
            this.setState({ filterDropdown: "show" });
        }
        else {
            this.setState({ filterDropdown: "" });
        }
    }

    onSortClick() {
        if (this.state.sortDropdown === "") {
            this.setState({ sortDropdown: "show" });
        }
        else {
            this.setState({ sortDropdown: "" });
        }
    }

    // Callback Event Handlers
    onSearchTermChanged() {
        let newSearchTerm = this.state.internalSearchTerm;
        this.props.onSearchTermChanged(newSearchTerm);
    }

    onFilterTypeClicked(event) {
        const filterId = event.target.id;
        if (filterId === "my-expenses-option") {
            this.props.onFilterTypeChanged(filterTypeEnum.myExpenses);
        }
        else if (filterId === "other-expenses-option") {
            this.props.onFilterTypeChanged(filterTypeEnum.otherExpenses);
        }
        else {
            this.props.onFilterTypeChanged(filterTypeEnum.noFilter);
        }
        this.setState({ filterDropdown: "" });
    }

    onSortTypeClicked() {
        const sortId = event.target.id;
        let sortType = sortTypeEnum.latest;
        switch (sortId) {
            case "title-asc-sort":
                sortType = sortTypeEnum.titleAsc;
                break;
            case "title-desc-sort":
                sortType = sortTypeEnum.titleDesc;
                break;
            case "price-high-sort":
                sortType = sortTypeEnum.priceHigh;
                break;
            case "price-low-sort":
                sortType = sortTypeEnum.priceLow;
                break;
            case "latest-sort":
                sortType = sortTypeEnum.latest;
                break;
            case "oldest-sort":
                sortType = sortTypeEnum.oldest;
                break;
        }
        this.props.onSortTypeChanged(sortType);
        this.setState({ sortDropdown: "" });
    }

    // Helper Functions
    convertFromFilterTypeToString(filterType) {
        if (filterType === filterTypeEnum.myExpenses) {
            return "My Expenses";
        }
        else if (filterType === filterTypeEnum.otherExpenses) {
            return "Other Expenses";
        }
        else {
            return "No Filter";
        }
    }

    convertFromSortTypeToString(sortType){
        switch (sortType) {
            case sortTypeEnum.titleAsc:
                return "Title-Ascending";
            case sortTypeEnum.titleDesc:
                return "Title-Descending"
            case sortTypeEnum.priceHigh:
                return "Price-Highest";
            case sortTypeEnum.priceLow:
                return "Price-Lowest"
            case sortTypeEnum.latest:
                return "Latest";
            case sortTypeEnum.oldest:
                return "Oldest";
        }
    }

    render() {
        return (
            <div className="ExpenseInput">
                <div className="row">
                    <div className="input-group col">
                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" value={this.state.internalSearchTerm} onChange={this.onInternalSearchTermChange}></input>
                        <div className="input-group-append">
                            <button className="btn btn-primary" onClick={this.onSearchTermChanged}>Search</button>
                        </div>
                    </div>
                </div>

                <div id="bottom-input-row" className="row">
                    <div className="col-2">
                        <div className="button-group">
                            <button type="button" className="btn btn-default dropdown-toggle btn-outline-secondary text-left sfbtn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.onFilterClick}>
                                {this.convertFromFilterTypeToString(this.props.filterType)}
                            </button>
                            <div className={"dropdown-menu " + this.state.filterDropdown} aria-labelledby="dropdownMenuButton">
                                <a id="no-filter-option" className="dropdown-item" href="#" onClick={this.onFilterTypeClicked}>No Filter</a>
                                <a id="my-expenses-option" className="dropdown-item" href="#" onClick={this.onFilterTypeClicked}>My Expenses</a>
                                <a id="other-expenses-option" className="dropdown-item" href="#" onClick={this.onFilterTypeClicked}>Other Expenses</a>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown col-2">
                        <button className="btn btn-default dropdown-toggle btn-outline-secondary text-left sfbtn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.onSortClick}>
                            {this.convertFromSortTypeToString(this.props.sortType)}
                        </button>
                        <div className={"dropdown-menu " + this.state.sortDropdown} aria-labelledby="dropdownMenuButton">
                            <a id="title-asc-sort" className="dropdown-item" href="#" onClick={this.onSortTypeClicked}>Title-Ascending</a>
                            <a id="title-desc-sort" className="dropdown-item" href="#" onClick={this.onSortTypeClicked}>Title-Descending</a>
                            <a id="price-high-sort" className="dropdown-item" href="#" onClick={this.onSortTypeClicked}>Price-Highest</a>
                            <a id="price-low-sort" className="dropdown-item" href="#" onClick={this.onSortTypeClicked}>Price-Lowest</a>
                            <a id="latest-sort" className="dropdown-item" href="#" onClick={this.onSortTypeClicked}>Latest</a>
                            <a id="oldest-sort" className="dropdown-item" href="#" onClick={this.onSortTypeClicked}>Oldest</a>
                        </div>
                    </div>
                    <div className="open-closed-toggle col-2">
                        <OpenClosedToggle viewClosedExpenses={this.props.viewClosedExpenses} onViewClosedExpensesChanged={this.props.onViewClosedExpensesChanged} />
                    </div>
                </div>
            </div>
        );
    }
}
export default ExpenseInputContainer;