import React, { Component } from "react";

class PaymentConfirmationCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <img className="card-img w-50 ml-4" src="https://www.w3schools.com/bootstrap4/img_avatar3.png"></img>
                        </div>
                        <div className="col-md-6">
                           <h1>Rajat has confirmed your payment of <span className="text-success">$42</span>.</h1>
                        </div>
                        <div className="col-md-3">
                           <h2>Pending Confirmation</h2> 
                           <button className="btn btn-secondary mr-2">Dispute</button>
                           <button type="button" className="btn btn-primary">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PaymentConfirmationCard;
