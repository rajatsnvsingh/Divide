import React, { Component } from "react";
import { FilterEnum, SortEnum } from "../PaymentContainer/PaymentContainer.jsx";

class PaymentInputContainer extends Component {
    constructor(props) {
        super(props);
        this.onNewPaymentClick = this.onNewPaymentClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
    }

    onNewPaymentClick() {
        this.props.onNewPaymentChange(true);
    }

    onClearClick() {
        this.props.onFilterChange(FilterEnum.none);
        this.props.onSortChange(SortEnum.dateDes);
        this.props.onSearchChange("");
    }

    onFilterChange(event) {
        this.props.onFilterChange(parseInt(event.target.value));
    }

    onSearchChange(event) {
        this.props.onSearchChange(event.target.value);
    }

    onSortChange(event) {
        this.props.onSortChange(parseInt(event.target.value));
    }

    render() {
        return (
            <div>
                <div className="row mt-3 mb-3">
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Search Name" onChange={this.onSearchChange} value={this.props.search} />
                    </div>
                    <div className="col-md-2">
                        <select className="form-control" onChange={this.onFilterChange} value={this.props.filter}>
                            <option value={FilterEnum.none}>No Filter</option>
                            <option value={FilterEnum.completed}>Completed</option>
                            <option value={FilterEnum.pending}>Pending</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <select className="form-control" onChange={this.onSortChange} value={this.props.sort}>
                            <option value={SortEnum.dateDes}>Latest</option>
                            <option value={SortEnum.dateAsc}>Oldest</option>
                            <option value={SortEnum.nameAsc}>Name A-Z</option>
                            <option value={SortEnum.nameDes}>Name Z-A</option>
                        </select>
                    </div>
                    <div className="col-md-1">
                        <button type="button" className="btn btn-secondary w-100" onClick={this.onClearClick}>Clear</button>
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