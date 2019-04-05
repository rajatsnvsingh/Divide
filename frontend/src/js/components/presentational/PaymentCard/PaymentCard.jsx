import React, { Component } from "react";

class PaymentCard extends Component {
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
                            <h1>Completed</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PaymentCard;
