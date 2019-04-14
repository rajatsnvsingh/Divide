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

    socket.on("incoming_expense", function(in_expense){
      let inExpense = JSON.parse(in_expense);
      inExpense.date = new Date(Date.parse(inExpense.date));
      let expenses = this.state.expenses;
      for(let i = 0; i < expenses.length; i++){
        if(expenses[i]._id === inExpense._id)
        {
          expenses[i] = inExpense;
          this.setState({expenses: expenses});
          return;
        }
      }
      expenses.push(inExpense);
      this.setState({expenses: expenses});
      
      // Using Modified Expenses, compute summaries
      let summaryResults = this.getSummaryResultsFromExpenses(expenses);
      let summaryList = this.getSummaryListFromSummaryResults(summaryResults);
      this.props.onUpdateSummaryList(summaryList);
    }.bind(this));

    socket.on("incoming_payment", function(in_payment) {
      let inPayment = JSON.parse(in_payment);
      inPayment.date = new Date(Date.parse(inPayment.date));
      let payments = this.state.payments;

      for (let i = 0; i < payments.length; i++) {
        if (payments[i]._id === inPayment._id) {
          payments[i] = inPayment;
          this.setState({payments: payments});
          return;
        }
      }

      payments.push(inPayment);
      this.setState({payments: payments});
    }.bind(this));

    socket.on("dismissed_payment", function(in_payment) {
      let inPayment = JSON.parse(in_payment);
      let payments = this.state.payments;

      payments = payments.filter(x => x._id !== inPayment._id);
      this.setState({payments: payments});      
    }.bind(this));

    // Initialize Payments
    socket.emit("get_payments", function (in_payments) {
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
              amtOwing: 0,
              picture: transaction.userId.picture
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
            amtOwing: 0,
            picture: owner.picture
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
        amount: summaryResults[id].amtOwed - summaryResults[id].amtOwing,
        picture: summaryResults[id].picture
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
