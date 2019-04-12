import React, { Component } from "react";
import PaymentCard from "../../presentational/PaymentCard/PaymentCard.jsx";
import NewPaymentCard from "../../presentational/NewPaymentCard/NewPaymentCard.jsx";
import { FilterEnum, SortEnum } from "../PaymentContainer/PaymentContainer.jsx";

class PaymentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    key: 2,
                    name: "Eric",
                    amount: 73,
                    date: new Date(2019, 1, 1),
                    completed: true
                },
                {
                    key: 1,
                    name: "Alex",
                    amount: 40,
                    date: new Date(2019, 1, 2),
                    completed: false
                }
            ]
        };
    }

    getList() {
        let list = this.state.list;
        list = this.filterList(list);
        list = this.sortList(list);

        // bind to PaymentCard
        return list.map((x) =>
            <PaymentCard key={x.key} name={x.name} amount={x.amount} date={x.date} completed={x.completed} />
        );
    }

    filterList(list) {
        switch (this.props.filter) {            
            case FilterEnum.completed:
                return list.filter(x => x.completed === true);

            case FilterEnum.pending:
                return list.filter(x => x.completed === false);

            default:
            case FilterEnum.none:
                return list;
        }
    }

    sortList(list) {
        switch (this.props.sort) {
            case SortEnum.nameAsc:
                return list.sort((a, b) => a.name.localeCompare(b.name));

            case SortEnum.nameDes:
                return list.sort((a, b) => b.name.localeCompare(a.name));

            case SortEnum.dateAsc:
                return list.sort((a, b) => (new Date(a.date) - new Date(b.date)));

            default:
            case SortEnum.dateDes:
                return list.sort((a, b) => (new Date(b.date) - new Date(a.date)));
        }
    }

    render() {
        const list = this.getList();

        return (
            <div>
                {this.props.newPayment ? <NewPaymentCard openCard={this.props.onNewPaymentChange}/> : null}                
                {list}
            </div>
        );
    }
}

export default PaymentList;
