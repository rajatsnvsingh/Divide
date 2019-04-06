import React, { Component } from "react";
import OpenClosedToggle from "./OpenClosedToggle.jsx";
import "./ExpenseInputContainer.css";

class ExpenseInputContainer extends Component {
    constructor(props) {
        super(props);
        this.onInternalSearchTermChange = this.onInternalSearchTermChange.bind(this);
        this.onFilterClick = this.onFilterClick.bind(this);
        this.onSortClick = this.onSortClick.bind(this);
        this.onSearchTermChanged = this.onSearchTermChanged.bind(this);
        this.onFilterTypeChanged = this.onFilterTypeChanged.bind(this);
        this.onSortTypeChanged = this.onSortTypeChanged.bind(this);
        this.onViewClosedExpensesChanged = this.onViewClosedExpensesChanged.bind(this);
        this.state = {
            internalSearchTerm: this.props.searchTerm,
            filterDropdown: false,
            sortDropdown: false
        };
    }

    onInternalSearchTermChange(event) {
        this.setState({ internalSearchTerm: event.target.value });
    }

    onFilterClick() {
        let newFilterDropdown = !(this.state.filterDropdown);
        this.setState({ filterDropdown: newFilterDropdown });
    }

    onSortClick() {
        let newSortDropdown = !(this.state.sortDropdown);
        this.setState({ sortDropdown: newSortDropdown });
    }

    onSearchTermChanged() {
        let newSearchTerm = this.state.internalSearchTerm;
        this.props.onSearchTermChanged(newSearchTerm);
    }

    onFilterTypeChanged() {

    }

    onSortTypeChanged() {

    }

    onViewClosedExpensesChanged() {

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

                <div className="row">
                    <div className="col">
                        <div className="button-group">
                            <button type="button" className="btn btn-default dropdown-toggle btn-block text-left sfbtn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.onFilterClick}>
                                Filter
                            </button>
                            <div className={"dropdown-menu " + ((this.state.filterDropdown) ? "show" : "")} aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">No Filter</a>
                                <a className="dropdown-item" href="#">My Expenses</a>
                                <a className="dropdown-item" href="#">Other Expenses</a>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown col">
                        <button className="btn btn-default dropdown-toggle btn-block text-left sfbtn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.onSortClick}>
                            Sort
                        </button>
                        <div className={"dropdown-menu " + ((this.state.sortDropdown) ? "show" : "")} aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Title-Ascending</a>
                            <a className="dropdown-item" href="#">Title-Descending</a>
                            <a className="dropdown-item" href="#">Price-Highest</a>
                            <a className="dropdown-item" href="#">Price-Lowest</a>
                            <a className="dropdown-item" href="#">Latest</a>
                            <a className="dropdown-item" href="#">Oldest</a>
                        </div>
                    </div>
                    <div className="col">
                        <OpenClosedToggle viewClosedExpenses={this.props.viewClosedExpenses} onViewClosedExpensesChanged={this.props.onViewClosedExpensesChanged} />
                    </div>


                </div>



            </div>
        );
    }
}
export default ExpenseInputContainer;