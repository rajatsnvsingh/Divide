import React, { Component } from "react";
import { FilterEnum, SortEnum } from "../PaymentContainer/PaymentContainer.jsx";

class PaymentInputContainer extends Component {
    constructor(props) {
        super(props);
        this.onNewPaymentClick = this.onNewPaymentClick.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
    }

    onNewPaymentClick() {
        this.props.onNewPaymentChange(true);
    }

    onFilterChange(event) {
        this.props.onFilterChange(event.target.value);
    }

    onSearchChange(event) {
        this.props.onSearchChange(event.target.value);
    }

    onSortChange(event) {
        this.props.onSortChange(event.target.value);
    }

    render() {
        return (
            <div>
                <div className="row mt-3">
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Search" onChange={this.onSearchChange} />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <select className="form-control" onChange={this.onFilterChange}>
                            <option value={FilterEnum.none}>No Filter</option>
                            <option value={FilterEnum.completed}>Completed</option>
                            <option value={FilterEnum.pending}>Pending</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <select className="form-control" onChange={this.onSortChange}>
                            <option value={SortEnum.date}>Latest</option>
                            <option value={SortEnum.name}>Name</option>
                        </select>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary w-100" onClick={this.onNewPaymentClick}>Enter a Payment</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PaymentInputContainer;