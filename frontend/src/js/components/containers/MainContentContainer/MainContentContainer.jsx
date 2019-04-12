import React, { Component } from "react";
import ExpenseContainer from "../ExpenseContainer/ExpenseContainer.jsx";
import PaymentContainer from "../PaymentContainer/PaymentContainer.jsx";
import NavigationHeader from "../NavigationHeader/NavigationHeader.jsx";
import "./MainContentContainer.css";

const viewIndexEnum = Object.freeze({ "expenses": 1, "payments": 2 });
const expenseStatusType = Object.freeze({ "pending": 1, "open": 2, "closed": 3 });

class MainContentContainer extends Component {
    constructor(props) {
        super(props);
        this.onNavigationButtonClick = this.onNavigationButtonClick.bind(this);
        this.state = {
            viewIndex: viewIndexEnum.expenses,
            expenses: [],
            payments: []
        }
    }

    componentDidMount() {
        let retrievedPayments = [
            {
                key: 1,
                name: "Eric",
                amount: 73,
                date: new Date(2019, 0, 1),
                completed: true
            },
            {
                key: 2,
                name: "Eric",
                amount: 73,
                date: new Date(2019, 0, 1),
                completed: true
            },
            {
                key: 3,
                name: "Eric",
                amount: 73,
                date: new Date(2019, 0, 1),
                completed: true
            },
            {
                key: 4,
                name: "Alex",
                amount: 40,
                date: new Date(2019, 0, 2),
                completed: false
            }
        ];


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
                status: expenseStatusType.open,
                date: new Date(2018, 1, 3),
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
            expenses: retrievedExpenses,
            payments: retrievedPayments
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
            let summary = {userId: id, name: summaryResults[id].name, amount: summaryResults[id].amt};
            summaryList.push(summary);
        }

        this.props.onUpdateSummaryList(summaryList);
    }

    onNavigationButtonClick(newViewIndex) {
        this.setState({viewIndex: newViewIndex});
    }

    render() {
        const viewIndex = this.state.viewIndex;

        return (
            <div className="main-content">
                <NavigationHeader viewIndex={viewIndex} onNavigationButtonClick={this.onNavigationButtonClick} />
                {viewIndex === viewIndexEnum.expenses ? 
                    <ExpenseContainer myId={this.props.myId} expenses={this.state.expenses}/> : 
                    <PaymentContainer myId={this.props.myId} payments={this.state.payments}/>}
            </div>
        );
    }
}
export { MainContentContainer };