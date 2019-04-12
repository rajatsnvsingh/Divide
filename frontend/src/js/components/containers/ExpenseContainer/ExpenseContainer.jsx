import React, { Component } from "react";
import ExpenseInputContainer from "../../presentational/ExpenseInput/ExpenseInputContainer.jsx";
import ExpenseList from "../ExpenseList/ExpenseList.jsx";
import "./ExpenseContainer.css";

const filterTypeEnum = Object.freeze({ noFilter: 1, myExpenses: 2, otherExpenses: 3 });
const sortTypeEnum = Object.freeze({ titleAsc: 1, titleDesc: 2, priceHigh: 3, priceLow: 4, latest: 5, oldest: 6 });
const splitTypeEnum = Object.freeze({ "fraction": 1 });
const expenseStatusType = Object.freeze({ "pending": 1, "open": 2, "closed": 3 });

class ExpenseContainer extends Component {
    constructor(props) {
        super(props);
        this.onSearchTermChanged = this.onSearchTermChanged.bind(this);
        this.onFilterTypeChanged = this.onFilterTypeChanged.bind(this);
        this.onSortTypeChanged = this.onSortTypeChanged.bind(this);
        this.onViewClosedExpensesChanged = this.onViewClosedExpensesChanged.bind(this);
        this.onAddNewExpense = this.onAddNewExpense.bind(this);
        this.onCardClick = this.onCardClick.bind(this);
        this.onExpandedCardClose = this.onExpandedCardClose.bind(this);
        this.onNewCardClose = this.onNewCardClose.bind(this);

        this.state = {
            searchTerm: "",
            filterType: filterTypeEnum.noFilter, // Probably create an enum for this later
            sortType: sortTypeEnum.latest, // Probably create an enum for this later
            viewClosedExpenses: false,
            expenses: [],
            expandedCardId: "",
            newExpenses: []
        };
    }

    componentDidMount() {
        let retrievedExpenses = [
            {
                _id: "1",
                title: "Pizza",
                totalAmt: 50.14,
                ownerId: {
                    "expenseId": [],
                    "notifications": [],
                    "_id": "1",
                    "email": "buddyBoi@buddyBoi.com",
                    "name": "Calvin Lau",
                    "__v": 0
                },
                status: expenseStatusType.open,
                date: new Date(),
                transactions: [
                    {
                        "_id": "1",
                        "ownerId": "1",
                        "userId": {
                            "expenseId": [],
                            "notifications": [],
                            "_id": "2",
                            "email": "buddyGirl@buddyBoi.com",
                            "name": "Aidan Bailey",
                            "__v": 0
                        },
                        "amtOwing": 50.14,
                        "amtPaid": 0.0,
                        "split": "50/50",
                        "status": "Pending",
                        "__v": 0
                    }
                ]
            },
            {
                _id: "2",
                title: "Sandwich",
                totalAmt: 12.55,
                ownerId: {
                    "expenseId": [],
                    "notifications": [],
                    "_id": "2",
                    "email": "sauceJames@germs.ca",
                    "name": "Aidan Bailey",
                    "__v": 0
                },
                status: expenseStatusType.closed,
                date: new Date(),
                transactions: [
                    {
                        "_id": "2",
                        "ownerId": "2",
                        "userId": {
                            "expenseId": [],
                            "notifications": [],
                            "_id": "3",
                            "email": "buddyGirl@buddyBoi.com",
                            "name": "Raavi Mehta",
                            "__v": 0
                        },
                        "amtOwing": 6.25,
                        "amtPaid": 0.0,
                        "split": "50/50",
                        "status": "Pending",
                        "__v": 0
                    },
                    {
                        "_id": "3",
                        "ownerId": "2",
                        "userId": {
                            "expenseId": [],
                            "notifications": [],
                            "_id": "4",
                            "email": "buddyLad@buddyBoi.com",
                            "name": "Quinn Bischoff",
                            "__v": 0
                        },
                        "amtOwing": 6.34,
                        "amtPaid": 0.0,
                        "split": "50/50",
                        "status": "Pending",
                        "__v": 0
                    }
                ]
            }
        ];
        
        this.setState({
            expenses: retrievedExpenses
        });

        let summaryResults = {};
        retrievedExpenses.forEach(expense => {
            // If You are the owner of the expense, get the transactions owed to you
            if(expense.ownerId._id === this.props.myId){
                expense.transactions.forEach(transaction => {
                    let otherUserId = transaction.userId._id;
                    if(!(otherUserId in summaryResults))
                        summaryResults[otherUserId] = {name: transaction.userId.name, amt: 0};
                    summaryResults[otherUserId].amt += transaction.amtOwing - transaction.amtPaid;
                });
            }
            // If someone else is the owner of the expense, find just your transaction
            else {
                let owner = expense.ownerId;
                if(!(owner._id in summaryResults))
                    summaryResults[owner._id] = {name: owner.name, amt: 0};
                expense.transactions.forEach(transaction => {
                    if(transaction.userId._id === this.props.myId){
                        summaryResults[transaction.ownerId].amt -= transaction.amtOwing - transaction.amtPaid
                    }
                });
            }
        });
        
        let summaryList = []
        for(let id in summaryResults){
            let summary = {userId: id, name: summaryResults[id].name, amt: summaryResults[id].amt};
            summaryList.push(summary);
        }

        this.props.onUpdateSummaryList(summaryList);
    }

        // Expense List Filters and Sort

        onSearchTermChanged(term) {
                this.setState({ searchTerm: term });
            }

        onFilterTypeChanged(filterType) {
                this.setState({ filterType: filterType });
            }

        onSortTypeChanged(sortType) {
                this.setState({ sortType: sortType });
            }

        onViewClosedExpensesChanged(isClosedExpenses) {
                this.setState({ viewClosedExpenses: isClosedExpenses });
            }

        // Edit Card Event Handlers
        onCardClick(expenseId){
                this.setState({ expandedCardId: expenseId });
            }

        onExpandedCardClose(){
                this.setState({ expandedCardId: "-1" });
            }

        // New Card Event Handlers

        onAddNewExpense() {
                if(this.state.newExpenses.length === 1) // Only allow one new expense at a time
        return;

        let newExpense = {
            _id: "-1",
            title: "",
            totalAmt: 0.0,
            ownerId: {
                "expenseId": [],
                "notifications": [],
                "_id": this.props.myId,
                "email": "",
                "name": "",
                "__v": 0
            },
            status: expenseStatusType.pending,
            date: new Date(),
            transactions: []
        };
        let newExpenses = this.state.newExpenses;
        newExpenses.push(newExpense);
        this.setState({ newExpense: newExpenses });
    }

    onNewCardClose() {
        // TODO This only works because there can only be 1 new expense at a time
        // Otherwise, must add logic to identify which card closed
        let newExpenses = this.state.newExpenses;
        newExpenses.pop();
        this.setState({ newExpense: newExpenses });
    }

    filterExpense(expense) {
        // Check if Expense Title starts with search term
        if (!expense.title.toLowerCase().startsWith(this.state.searchTerm.toLowerCase()))
            return false;

        // Check if Expense Status type matches the filter being applied
        if (expense.status === expenseStatusType.open && this.state.viewClosedExpenses)
            return false;
        else if (expense.status === expenseStatusType.closed && !this.state.viewClosedExpenses)
            return false;

        // Check if Expense owner matches filter being applied
        if (expense.ownerId._id === this.props.myId && this.state.filterType === filterTypeEnum.otherExpenses) {
            return false;
        }
        if (expense.ownerId._id !== this.props.myId && this.state.filterType === filterTypeEnum.myExpenses) {
            return false;
        }

        return true;
    }


    render() {
        let filteredExpenses = this.state.expenses.filter((expense) =>
            this.filterExpense(expense)
        );

        return (
            <div>
                <div className="row expense-input">
                    <div id="expense-input" className="col-10">
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
                    <div className="col-2 center-col-items">
                        <button className="btn btn-success newExpenseBtn text-center" onClick={this.onAddNewExpense}>
                            Add New
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ExpenseList
                            myId={this.props.myId}
                            expenses={filteredExpenses}
                            expandedCardId={this.state.expandedCardId}
                            newExpenses={this.state.newExpenses}
                            onCardClick={this.onCardClick}
                            onExpandedCardClose={this.onExpandedCardClose}
                            onNewCardClose={this.onNewCardClose}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ExpenseContainer;
