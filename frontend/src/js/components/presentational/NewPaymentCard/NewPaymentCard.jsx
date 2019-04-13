import React, { Component } from "react";
import '../../../../css/styles.css'; 
import SearchableDropdown from "../SearchableDropdown/SearchableDropdown.jsx";

class NewPaymentCard extends Component {
    constructor(props) {
        super(props);
        this.closeCard = this.closeCard.bind(this);
        this.onConfirmClick = this.onConfirmClick.bind(this);
    }

    closeCard() {
        this.props.openCard(false);
    }

    onConfirmClick() {
        this.closeCard();
    }

    render() {
        return (
            <div className="card mb-3">
                <div className="card-body card-shadow">
                    <h2 className="card-title">Add a New Payment</h2>
                    <div className="form-inline">
                        <h2 className="mx-auto">
                            You have paid <input type="text" placeholder="$42" className="form-control mr-1"></input> 
                            to <SearchableDropdown /> 
                            on <input type="date"  className="form-control"></input>
                        </h2>
                    </div>

                    <button type="button" className="btn btn-secondary btn-lg mr-2" onClick={this.closeCard}>Cancel</button>
                    <button type="button" className="btn btn-primary btn-lg" onClick={this.onConfirmClick}>Confirm</button>
               </div>
            </div>
        );
    }
}

export default NewPaymentCard;
