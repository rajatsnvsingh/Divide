import React, { Component } from "react";
import SearchableDropdown from "../SearchableDropdown/SearchableDropdown.jsx";
import { socket } from "../../../../App.js";
import '../../../../css/styles.css'; 

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
            date: new Date()
        }
    }

    onAmountChange(event) {
        this.setState({amount: event.target.value});
    }

    onUserChange(newUser) {
        this.setState({user: newUser});
    }

    onDateChange(event) {
        this.setState({date: event.target.value});
    }

    closeCard() {
        this.props.openCard(false);
    }

    onConfirmClick() {
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
                            to <SearchableDropdown user={this.state.user} onUserChange={this.onUserChange} /> 
                            on <input type="date" value={this.state.date} onChange={this.onDateChange} className="form-control"></input>
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
