import React, { Component } from "react";
import ExpenseCard from "../../presentational/ExpenseCard/ExpenseCard.jsx";
import ExpenseCardExpanded from "../../presentational/ExpenseCard/ExpenseCardExpanded.jsx";
import "./ExpenseList.css";

const splitTypeEnum = Object.freeze({ "fraction": 1 });
const expenseStatusType = Object.freeze({ "pending": 1, "open": 2, "closed": 3 });

class ExpenseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenses: []
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
                            "amtPaid": 0,
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
                    status: expenseStatusType.open,
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
                            "amtPaid": 0,
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
                            "amtPaid": 0,
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

    render() {
        const expenseComponents = this.state.expenses.map((expense) =>
            <li key={expense.id}>
                <ExpenseCard expense={expense} />
            </li>
        );

        return (
            <ul>{expenseComponents}</ul>
        );
    }

}

export default ExpenseList;