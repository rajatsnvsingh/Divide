import React, { Component } from "react";
import './SummaryOwingsCard.css';

class SummaryOwingsCard extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="card mb-3">
                <div className="card-body p-0">
                    <div className="row align-items-center">
                        <div className="col-md-5">
                            <img className="card-img-top" src="https://www.w3schools.com/bootstrap4/img_avatar3.png"></img>
                        </div>
                        <div className="col-md-5">
                            You owe Rajat<br />
                            <h4>{this.props.content}</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SummaryOwingsCard;
