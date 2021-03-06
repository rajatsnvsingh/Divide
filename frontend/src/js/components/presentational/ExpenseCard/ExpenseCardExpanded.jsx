import React, { Component } from "react";
import ExpanseCardExpandedInput from "./ExpenseCardExpandedInput.jsx";
import ExpenseCardExpandedUserList from "./ExpenseCardExpandedUserList.jsx";
import "../../../../css/styles.css";
import { socket } from "../../../../App.js";

const splitTypeEnum = Object.freeze({ fraction: 1 });
const expenseStatusType = Object.freeze({ pending: 1, open: 2, closed: 3 });

class ExpenseCardExpanded extends Component {
  constructor(props) {
    super(props);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onAddNewTransaction = this.onAddNewTransaction.bind(this);
    this.onRemoveTransaction = this.onRemoveTransaction.bind(this);
    this.onVoidTransaction = this.onVoidTransaction.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);

    let expense = this.props.expense;
    let clonedTransactions = [];
    for (let trans of expense.transactions) {
      let clonedTrans = {
        _id: trans._id,
        ownerId: trans.ownerId,
        userId: trans.userId,
        amtOwing: trans.amtOwing,
        amtPaid: trans.amtPaid,
        split: trans.split,
        status: trans.status,
        __v: trans._v
      };
      clonedTransactions.push(clonedTrans);
    }

    this.state = {
      _id: expense._id,
      title: expense.title,
      date: expense.date,
      status: expense.status,
      totalAmount: expense.totalAmt,
      owner: expense.ownerId,
      transactions: clonedTransactions
    };
  }

  // TODO Create Event Handlers that are passed to EventCardExpanded's children
  //      so that when the state of the forms is updated, the state variables of
  //      ExpenseCardExpanded are updated.

  onTitleChange(newTitle) {
    this.setState({ title: newTitle });
  }

  onDateChange(newDate) {
    this.setState({ date: newDate });
  }

  onAmountChange(newAmount) {
    this.setState({ totalAmount: newAmount });
  }

  onAddNewTransaction(newUser, splitSelection) {
    let amountOwed =
      this.state.totalAmount / (this.state.transactions.length + 1);
    amountOwed = Math.round(amountOwed * 100) / 100;
    let modifiedTrans = this.state.transactions.map(trans => {
      trans.amtOwing = amountOwed;
      return trans;
    });

    let newTransaction = {
      ownerId: this.props.myId,
      userId: newUser,
      amtOwing: amountOwed,
      amtPaid: 0.0,
      split: splitSelection,
      status: expenseStatusType.pending,
      __v: 0
    };

    modifiedTrans.push(newTransaction);
    this.setState({ transactions: modifiedTrans });
  }

  onRemoveTransaction(transactionIndex) {
    let modifiedTrans = [];
    for (let i = 0; i <= this.state.transactions.length - 1; i++) {
      if (i !== transactionIndex) {
        modifiedTrans.push(this.state.transactions[i]);
      }
    }

    let amountOwed = this.state.totalAmount / modifiedTrans.length;
    modifiedTrans = modifiedTrans.map(trans => {
      trans.amtOwing = amountOwed;
      return trans;
    });

    this.setState({ transactions: modifiedTrans });
  }

  // TODO add an onVoidTransaction handler to set the paid == to owed
  onVoidTransaction(transactionIndex) {
    console.log("Made it here, TransactionIndex: " + transactionIndex);
    let modifiedTransactionsList = this.state.transactions;
    modifiedTransactionsList[transactionIndex].amtPaid =
      modifiedTransactionsList[transactionIndex].amtOwing;
    this.setState({ transactions: modifiedTransactionsList });
  }

  // TODO (but maybe not?) Create an Event Handler for the save button that calls
  //      an ExpenseList Event Handler that takes ExpenseCardExpanded's state
  //      variables as input and updates the entry in the list

  onCancelButtonClick() {
    this.props.onClose();
  }

  onSaveButtonClick() {
    let newExpense = {
      title: this.state.title,
      totalAmt: Math.round(this.state.totalAmount * 100) / 100,
      ownerId: this.props.myId,
      status: this.state.status,
      date: this.state.date,
      transactions: this.state.transactions
    };

    if (this.state.status === expenseStatusType.pending) {
      console.log(newExpense);
      let newExpenseJson = JSON.stringify(newExpense);
      socket.emit("new_expense", newExpenseJson, function (newExpense) {
        console.log(newExpense);
      });
    } else if (this.state.status === expenseStatusType.open) {
      newExpense._id = this.state._id;
      console.log(newExpense);
      let updatedExpenseJson = JSON.stringify(newExpense);
      socket.emit("update_expense", updatedExpenseJson, function (newExpense) {
        console.log(newExpense);
      });
    }
    this.props.onClose();
  }

  render() {
    let readonly = true;
    if (
      this.props.myId === this.state.owner._id &&
      this.state.status !== expenseStatusType.closed
    )
      readonly = false;

    let saveBtnEnabled = false;
    // Determine if save button should be enabled
    if (
      this.state.title.length > 0 &&
      !isNaN(this.state.totalAmount) &&
      this.state.totalAmount > 0 &&
      this.state.transactions.length > 0
    )
      saveBtnEnabled = true;

    return (
      <div className="card mb-3 card-exp">
        <div className="card-body card-shadow p-0">
          <ExpanseCardExpandedInput
            myId={this.props.myId}
            title={this.state.title}
            date={this.state.date}
            totalAmount={this.state.totalAmount}
            owner={this.state.owner}
            onTitleChange={this.onTitleChange}
            onDateChange={this.onDateChange}
            onAmountChange={this.onAmountChange}
            readonly={readonly}
            status={this.state.status}
          />
          <ExpenseCardExpandedUserList
            myId={this.props.myId}
            transactions={this.state.transactions}
            status={this.state.status}
            onAddNewTransaction={this.onAddNewTransaction}
            onRemoveTransaction={this.onRemoveTransaction}
            onVoidTransaction={this.onVoidTransaction}
            readonly={readonly}
          />
          <div className="row">
            <div className="col btn-group csbtns">
              <button
                className="btn btn-secondary"
                onClick={this.onCancelButtonClick}
              >
                Cancel
              </button>
              {!readonly && (
                <button
                  className="btn btn-primary"
                  disabled={!saveBtnEnabled}
                  onClick={this.onSaveButtonClick}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExpenseCardExpanded;
