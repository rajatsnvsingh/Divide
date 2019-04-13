import React, { Component } from "react";
import SearchableDropdown from "../SearchableDropdown/SearchableDropdown.jsx";
import { socket } from "../../../../App.js";
import '../../../../css/styles.css'; 
import './NewPaymentCard.css';

class NewPaymentCard extends Component {
    constructor(props) {
        super(props);

        // events
        this.closeCard = this.closeCard.bind(this);
        this.onConfirmClick = this.onConfirmClick.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onUserChange = this.onUserChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);

        // state
        this.state = {
            amount: 0,
            user: null,
            date: new Date(),
            errorMessage: ""
        }
    }

    onAmountChange(event) {
        this.setState({amount: event.target.value});
    }

    onUserChange(newUser) {
        this.setState({user: newUser});
    }

    onDateChange(event) {
        this.setState({date: new Date(event.target.value)});
    }

    closeCard() {
        this.props.openCard(false);
    }

    showError(name, amount) {
        this.setState({errorMessage: `You only owe ${name} $${amount}`})
    }

    validate() {
        // check that inputs not empty
        if (this.state.user == null) {
            this.setState({errorMessage: "Please select a user"});
        }
        if (this.state.amount <= 0) {
            this.setState({errorMessage: "Please enter a valid amount"});
        }

        // ensure you do not pay more than they are owed
        const list = this.props.summaryList;
        for (const user of list) {

            // find payee in list
            if (user.userId === this.state.user._id) {
                console.log(user);
                
                // you owe the user some amount
                if (user.amountOwing > 0) {

                    // you are not overpaying the user
                    if (user.amountOwing >= this.state.amount) {
                        this.setState({errorMessage: ""});
                        return true;
                    }

                    // you are overpaying the user
                    else {
                        this.setState({errorMessage: `You only owe ${user.name} $${user.amountOwing}`});
                        return false;
                    }
                }

                // you do not owe the user anything
                else {
                    this.setState({errorMessage: `You do not owe ${user.name}`});
                    return false;
                }
            }
        }

        this.setState({errorMessage: "Please check your inputs"});
        return false;
    }

    onConfirmClick() {
        if (!this.validate()) return;

        let payment = {
            payerId: this.props.myId,
            payeeId: this.state.user._id,
            amt: this.state.amount,
            status: false,
            expenses: []
        };
        let json = JSON.stringify(payment);
        console.log("New payment: " + json);

        socket.emit("new_payment", json, function (payment) {
            console.log("New payment: " + payment);
        }.bind(this));

        this.closeCard();
    }

    render() {
        return (
            <div className="card mb-3">
                <div className="card-body card-shadow">
                    <h2 className="card-title">Add a New Payment</h2>
                    <div className="form-inline">
                        <h2 className="mx-auto">
                            You have paid <input type="number" value={this.state.amount} onChange={this.onAmountChange} placeholder={42} className="form-control mr-1"></input> 
                            to <SearchableDropdown myId={this.props.myId} user={this.state.user} onUserChange={this.onUserChange} /> 
                            on <input type="date" value={this.state.date.toISOString().substr(0, 10)} onChange={this.onDateChange} className="form-control"></input>
                            {this.state.errorMessage !== "" && <div class="invalid text-center">{this.state.errorMessage}</div>}
                        </h2>
                    </div>
                    <button type="button" className="btn btn-secondary btn-lg mr-2" onClick={this.closeCard}>Cancel</button>
                    <button type="button" className="btn btn-primary btn-lg" onClick={this.onConfirmClick}>Confirm</button>
               </div>
            </div>
        );
    }
}

export default NewPaymentCard;
