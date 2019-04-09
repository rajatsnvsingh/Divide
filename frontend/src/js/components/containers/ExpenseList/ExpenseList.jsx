import React, { Component } from "react";
import ExpenseCard from "../../presentational/ExpenseCard/ExpenseCard.jsx";
import ExpenseCardExpanded from "../../presentational/ExpenseCard/ExpenseCardExpanded.jsx";
import "./ExpenseList.css";

const splitTypeEnum = Object.freeze({ "fraction": 1 });
const expenseStatusType = Object.freeze({ "pending": 1, "open": 2, "closed": 3 });
const filterTypeEnum = Object.freeze({ noFilter: 1, myExpenses: 2, otherExpenses: 3 });

class ExpenseList extends Component {
    constructor(props) {
        super(props);
        this.onCardClick = this.onCardClick.bind(this);
        this.onExpandedCardClose = this.onExpandedCardClose.bind(this);

        this.state = {
            expenses: [],
            expandedCardId: -1
        };
    }

    componentDidMount() {
        this.setState({
            expenses: [
                {
                    _id: 1,
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
                    _id: 2,
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
            ]
        });
    }

    applyFiltersAndSorting() {

    }

    onCardClick(expenseId){
        this.setState({ expandedCardId: expenseId });
    }
    
    onExpandedCardClose(){
        this.setState({ expandedCardId: -1});
    }

    getExpenseCard(expense){
        if (expense._id === this.state.expandedCardId) {
            return (
                <li key={expense._id}>
                    <ExpenseCardExpanded myId={this.props.myId} expense={expense} onClose={this.onExpandedCardClose}/>
                </li>
            );
        }
        return (
            <li key={expense._id}>
                <ExpenseCard myId={this.props.myId} expense={expense} onCardClick={this.onCardClick} />
            </li>
        );
    }

    filterExpense(expense) {
        // Check if Expense Title starts with search term
        if(!expense.title.toLowerCase().startsWith(this.props.searchTerm.toLowerCase()))
            return false;

        // Check if Expense Status type matches the filter being applied
        if(expense.status === expenseStatusType.open && this.props.viewClosedExpenses)
            return false;
        else if (expense.status === expenseStatusType.closed && !this.props.viewClosedExpenses)
            return false;
        else if (expense.status === expenseStatusType.pending)
            return false;
        
        // Check if Expense owner matches filter being applied
        if(expense.ownerId._id === this.props.myId && this.props.filterType === filterTypeEnum.otherExpenses){
            return false;
        }
        if(expense.ownerId._id !== this.props.myId && this.props.filterType === filterTypeEnum.myExpenses){
            return false;
        }

        return true;
    }

    render() {
        let filteredExpenses = this.state.expenses.filter((expense) =>
            this.filterExpense(expense)
        );

        const expenseComponents = filteredExpenses.map((expense) => 
            this.getExpenseCard(expense)
        );

        return (
            <ul>{expenseComponents}</ul>
        );
    }

}

export default ExpenseList;