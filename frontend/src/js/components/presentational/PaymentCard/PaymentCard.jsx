import React, { Component } from "react";
import { socket } from "../../../../App.js";
import '../../../../css/styles.css'; 

class PaymentCard extends Component {
    constructor(props) {
        super(props);

        this.onConfirmClick = this.onConfirmClick.bind(this);
        this.onDisputeClick = this.onDisputeClick.bind(this);
    }

    onConfirmClick() {
        let obj = {
            _id: this.props.id
        };

        let json = JSON.stringify(obj);
        console.log("Accept payment: " + json);

        socket.emit("accept_payment", json, function (obj) {
            console.log("Accept payment: " + obj);
        }.bind(this));
    }

    onDisputeClick() {
        let obj = {
            _id: this.props.id
        };

        let json = JSON.stringify(obj);
        console.log("Decline payment: " + json);

        socket.emit("decline_payment", json, function (obj) {
            console.log("Decline payment: " + obj);
        }.bind(this));
    }

    render() {
        let completed;
        let content;

        // if you are payer
        if (this.props.payer) {

            // if payment completed
            if (this.props.confirmed) {
                completed = <h1>Completed</h1>;
                content = <h1>{this.props.name} has confirmed your payment of <span className="text-danger">${this.props.amount}</span></h1>;
            }

            else {
                completed = <h1>Pending</h1>;
                content = <h1>{this.props.name} has not confirmed your payment of <span className="text-danger">${this.props.amount}</span></h1>;
            }
        }

        // if you are being paid
        else {
            // if you have confirmed the payment
            if (this.props.confirmed) {
                completed = <h1>Completed</h1>;
            }

            else {
                completed = (
                    <div>
                        <h2>Pending Confirmation</h2> 
                        <button type="button" className="btn btn-secondary btn-lg mr-2" onClick={this.onDisputeClick}>Dispute</button>
                        <button type="button" className="btn btn-primary btn-lg" onClick={this.onConfirmClick}>Confirm</button>   
                    </div>
                );
            }

            content = <h1>{this.props.name} has payed you <span className="text-success">${this.props.amount}</span></h1>;
        }

        return (
            <div className="card mb-3">
                <div className="card-body card-shadow p-0">
                    <div className="row align-items-center">
                        <div className="col-md-2">
                            <img className="card-img" src={this.props.picture}></img>
                        </div>
                        <div className="col-md-7">
                            <h3>{this.props.date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})}</h3>
                            {content}
                        </div>
                        <div className="col-md-3">
                           {completed} 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PaymentCard;
