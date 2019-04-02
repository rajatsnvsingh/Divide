import React, { Component } from "react";

class ExpanseCardExpandedInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const date = this.props.date;
        return (
            <div className="row align-items-center">
                <div className="col-md-3">
                    <h4>Title</h4>
                    <input type="text" className="form-control-text" defaultValue={this.props.title} placeholder="Enter a title..."/>
                </div>
                <div className="col-md-3">
                    <h4>Date</h4>
                    <input type="text" className="form-control-text" defaultValue={`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`} 
                        placeholder="Enter a date (dd-mm-yyyy)..."/>
                </div>
                <div className="col-md-3">
                    <h4>Account</h4>
                    <input type="text" className="form-control-text" defaultValue={this.props.totalAmount} placeholder="Enter an amount ($)..."/>
                </div>
                <div className="col-md-3">
                    <h4>Owner</h4>
                    <input type="text" className="form-control-text" defaultValue={this.props.owner} readOnly />
                </div>
            </div>
        );


    }
}

export default ExpanseCardExpandedInput;