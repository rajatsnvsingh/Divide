import React, { Component } from "react";
import './SummaryOwingsCard.css';

class SummaryOwingsCard extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const isOwed = this.props.isOwed;
        let content;

        if (isOwed) {
            content = <p>{this.props.name} owes you<br /><h4 className="text-success">${this.props.amount}</h4></p>;
        }
        else {
            content = <p>You owe {this.props.name}<br /><h4 className="text-danger">${this.props.amount}</h4></p>;
        }

        return (
            <div className="card mb-3">
                <div className="card-body p-0">
                    <div className="row align-items-center">
                        <div className="col-md-5">
                            <img className="card-img-top" src="https://www.w3schools.com/bootstrap4/img_avatar3.png"></img>
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
