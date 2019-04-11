import React, { Component } from "react";
import '../../../../css/styles.css'; 

class NewPaymentCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card mb-3">
                <div className="card-body card-shadow">
                    <h2 className="card-title">Add a New Payment</h2>
                    <div className="form-inline">
                        <h2 className="mx-auto">
                            You have paid <input type="text" placeholder="$42" className="form-control mr-1"></input> 
                            to <input type="text" placeholder="Name" className="form-control mr-1"></input> 
                            on <input type="date"  className="form-control"></input>
                        </h2>
                    </div>
                    <button type="button" className="btn btn-primary btn-lg">Confirm</button>
               </div>
            </div>
        );
    }
}

export default NewPaymentCard;
