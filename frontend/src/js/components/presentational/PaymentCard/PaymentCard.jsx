import React, { Component } from "react";
import '../../../../css/styles.css'; 

class PaymentCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let confirmation;
        let content;

        if (!this.props.isConfirmation) {
            confirmation = <h1>Completed</h1>;
            content = <h1>{this.props.name} has confirmed your payment of <span className="text-danger">${this.props.amount}</span></h1>;
        }
        else {
            confirmation = (
                <div>
                    <h2>Pending Confirmation</h2> 
                    <button className="btn btn-secondary btn-lg mr-2">Dispute</button>
                    <button type="button" className="btn btn-primary btn-lg">Confirm</button>   
                </div>
            );
            content = <h1>{this.props.name} has payed you <span className="text-success">${this.props.amount}</span></h1>;
        }

        return (
            <div className="card mb-3">
                <div className="card-body card-shadow">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <img className="card-img w-50 ml-4" src="https://www.w3schools.com/bootstrap4/img_avatar3.png"></img>
                        </div>
                        <div className="col-md-6">
                            <h3>{this.props.date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})}</h3>
                            {content}
                        </div>
                        <div className="col-md-3">
                           {confirmation} 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PaymentCard;
