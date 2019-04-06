import React, { Component } from "react";
import ExpenseInputContainer from "../../presentational/ExpenseInput/ExpenseInputContainer.jsx";
import ExpenseList from "../ExpenseList/ExpenseList.jsx";
import "./ExpenseContainer.css";

class ExpenseContainer extends Component {
    constructor(props) {
        super(props);
        this.onSearchTermChanged = this.onSearchTermChanged.bind(this);
        this.onFilterTypeChanged = this.onFilterTypeChanged.bind(this);
        this.onSortTypeChanged = this.onSortTypeChanged.bind(this);
        this.onViewClosedExpensesChanged = this.onViewClosedExpensesChanged.bind(this);

        this.state = {
            searchTerm: "",
            filterType: 1, // Probably create an enum for this later
            sortType: 1, // Probably create an enum for this later
            viewClosedExpenses: false
        };
    }

    onSearchTermChanged(term){
        this.setState({searchTerm: term});
    }

    onFilterTypeChanged(filterType) {
        this.setState({filterType: filterType});
    }

    onSortTypeChanged(sortType){
        this.setState({sortType: sortType});
    }

    onViewClosedExpensesChanged(isClosedExpenses){
        console.log("Command to view closed expenses received: " + isClosedExpenses);
        this.setState({viewClosedExpenses: isClosedExpenses});
    }
    

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-10 removePadding">
                        <ExpenseInputContainer 
                            searchTerm={this.state.searchTerm} 
                            filterType={this.state.filterType} 
                            sortType={this.state.sortType} 
                            viewClosedExpenses={this.state.viewClosedExpenses}
                            onSearchTermChanged={this.onSearchTermChanged}
                            onFilterTypeChanged={this.onFilterTypeChanged}
                            onSortTypeChanged={this.onSortTypeChanged}
                            onViewClosedExpensesChanged={this.onViewClosedExpensesChanged} />
                    </div>
                    <div className="col-2 removePadding">
                        <button className="btn-dark newExpenseBtn removePadding text-center">
                            <span className="additionSymbol">&#43;</span>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ExpenseList />
                    </div>
                </div>
            </div>
        );
    }
}

export default ExpenseContainer;
