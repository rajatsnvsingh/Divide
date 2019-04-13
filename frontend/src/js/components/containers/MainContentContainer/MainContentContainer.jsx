import React, { Component } from "react";
import ExpenseContainer from "../ExpenseContainer/ExpenseContainer.jsx";
import PaymentContainer from "../PaymentContainer/PaymentContainer.jsx";
import NavigationHeader from "../NavigationHeader/NavigationHeader.jsx";
import "./MainContentContainer.css";
import { socket } from "../../../../App.js";
const viewIndexEnum = Object.freeze({ expenses: 1, payments: 2 });
const expenseStatusType = Object.freeze({ pending: 1, open: 2, closed: 3 });

class MainContentContainer extends Component {
  constructor(props) {
    super(props);
    this.onNavigationButtonClick = this.onNavigationButtonClick.bind(this);
    this.state = {
      viewIndex: viewIndexEnum.expenses,
      expenses: [],
      payments: []
    };
  }

  componentDidMount() {
    // Initialize Expenses
    socket.emit("get_expenses", function (in_expenses) {
      // Get Expenses, parse their dates correctly, then setState
      let modifiedExpenses = in_expenses.map(expense => {
        let modifiedExpense = expense;
        modifiedExpense.date = new Date(Date.parse(expense.date));
        return modifiedExpense;
      });
      this.setState({
        expenses: modifiedExpenses
      });

      // Using Modified Expenses, compute summaries
      let summaryResults = this.getSummaryResultsFromExpenses(modifiedExpenses);
      let summaryList = this.getSummaryListFromSummaryResults(summaryResults);
      this.props.onUpdateSummaryList(summaryList);

    }.bind(this));

    // Initialize Payments
    socket.emit("get_payments", function (in_payments) {
      console.log(in_payments);
      let modifiedPayments = in_payments.map((payment) => {
        let modifiedPayment = payment;
        modifiedPayment.date = new Date(Date.parse(payment.date));
        return modifiedPayment;
      });
      this.setState({payments: modifiedPayments});
    }.bind(this));
  }

  getSummaryResultsFromExpenses(retrievedExpenses) {
    let summaryResults = {};
    retrievedExpenses.forEach(expense => {
      // If You are the owner of the expense, get the transactions owed to you
      if (expense.ownerId._id === this.props.myId) {
        expense.transactions.forEach(transaction => {
          let otherUserId = transaction.userId._id;
          if (!(otherUserId in summaryResults))
            summaryResults[otherUserId] = {
              name: transaction.userId.name,
              amtOwed: 0,
              amtOwing: 0
            };
          summaryResults[otherUserId].amtOwed +=
            transaction.amtOwing - transaction.amtPaid;
        });
      }
      // If someone else is the owner of the expense, find just your transaction
      else {
        let owner = expense.ownerId;
        if (!(owner._id in summaryResults))
          summaryResults[owner._id] = {
            name: owner.name,
            amtOwed: 0,
            amtOwing: 0 
          };
        expense.transactions.forEach(transaction => {
          if (transaction.userId._id === this.props.myId) {
            summaryResults[transaction.ownerId].amtOwing +=
              transaction.amtOwing - transaction.amtPaid;
          }
        });
      }
    });
    return summaryResults;
  }

  getSummaryListFromSummaryResults(summaryResults) {
    let summaryList = [];
    for (let id in summaryResults) {
      let summary = {
        userId: id,
        name: summaryResults[id].name,
        amountOwing: summaryResults[id].amtOwing,
        amountOwed: summaryResults[id].amtOwed,
        amount: summaryResults[id].amtOwed - summaryResults[id].amtOwing
      };
      summaryList.push(summary);
    }
    return summaryList;
  }

  onNavigationButtonClick(newViewIndex) {
    this.setState({ viewIndex: newViewIndex });
  }

  render() {
    const viewIndex = this.state.viewIndex;

    return (
      <div className="main-content">
        <NavigationHeader
          viewIndex={viewIndex}
          onNavigationButtonClick={this.onNavigationButtonClick}
        />
        {viewIndex === viewIndexEnum.expenses ? (
          <ExpenseContainer
            myId={this.props.myId}
            expenses={this.state.expenses}
          />
        ) : (
            <PaymentContainer
              myId={this.props.myId}
              payments={this.state.payments}
              summaryList={this.props.summaryList}
            />
          )}
      </div>
    );
  }
}
export { MainContentContainer };
