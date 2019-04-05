import React, { Component } from "react";
import PaymentList from "../PaymentList/PaymentList.jsx";

class PaymentContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="row mt-3">
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option>Status...</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option>Sort By...</option>
                        </select>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary w-100">Enter a Payment</button>
                    </div>
                </div>
                <PaymentList />
            </div>
        );
    }
}

export default PaymentContainer;
