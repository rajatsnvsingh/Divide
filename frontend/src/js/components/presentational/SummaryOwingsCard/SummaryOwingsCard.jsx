import React, { Component } from "react";
import './SummaryOwingsCard.css';

class SummaryOwingsCard extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const isOwed = this.props.amount > 0;
        const amount = Math.abs(this.props.amount);
        let content;

        if (isOwed) {
            content = <div>{this.props.name} owes you<br /><h4 className="text-success">${amount}</h4></div>;
        }
        else {
            content = <div>You owe {this.props.name}<br /><h4 className="text-danger">${amount}</h4></div>;
        }

        return (
            <div className="card mb-3">
                <div className="card-body p-0">
                    <div className="row align-items-center">
                        <div className="col-md-5">
                            <img className="card-img-top" src={this.props.picture}></img>
                        </div>
                        <div className="col-md-5">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SummaryOwingsCard;
