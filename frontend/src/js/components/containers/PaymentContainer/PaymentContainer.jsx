import React, { Component } from "react";
import PaymentList from "../PaymentList/PaymentList.jsx";
import PaymentInputContainer from "../PaymentInputContainer/PaymentInputContainer.jsx";

export const FilterEnum = Object.freeze({"none": 1, "completed": 2, "pending": 3});
export const SortEnum = Object.freeze({"dateAsc": 1, "dateDes": 2, "nameAsc": 3, "nameDes": 4});

class PaymentContainer extends Component {
    constructor(props) {
        super(props);

        // callbacks
        this.onNewPaymentChange = this.onNewPaymentChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        
        this.state = {
            search: "",
            filter: FilterEnum.none,
            sort: SortEnum.dateDes,
            newPayment: false
        };
    }

    onNewPaymentChange(newState) {
        this.setState({newPayment: newState});
    }

    onSearchChange(newState) {
        this.setState({search: newState});
    }

    onFilterChange(newState) {
        this.setState({filter: newState});
    }

    onSortChange(newState) {
        this.setState({sort: newState});
    }

    render() {
        return (
            <div>
                <PaymentInputContainer
                    onNewPaymentChange={this.onNewPaymentChange}
                    onSearchChange={this.onSearchChange}
                    onFilterChange={this.onFilterChange}
                    onSortChange={this.onSortChange}
                    search={this.state.search}
                    filter={this.state.filter}   
                    sort={this.state.sort}               
                />
                <PaymentList
                    newPayment={this.state.newPayment}
                    onNewPaymentChange={this.onNewPaymentChange}
                    search={this.state.search}
                    filter={this.state.filter}   
                    sort={this.state.sort}                   
                />
            </div>
        );
    }
}

export default PaymentContainer;
