import React, { Component } from "react";
import PaymentCard from "../../presentational/PaymentCard/PaymentCard.jsx";
import NewPaymentCard from "../../presentational/NewPaymentCard/NewPaymentCard.jsx";
import { FilterEnum, SortEnum } from "../PaymentContainer/PaymentContainer.jsx";
import './PaymentList.css';

class PaymentList extends Component {
    constructor(props) {
        super(props);
    }

    getList() {
        let list = this.props.list;

        // bind to PaymentCard
        list = list.map((x) => {
            let payer = x.payerId._id === this.props.myId;
            let name = payer ? name = x.payeeId.name : name = x.payerId.name;
            return <PaymentCard id={x._id} key={x._id} name={name} amount={x.amt} date={x.date} payer={payer} confirmed={x.status} />
        });

        // filter/search/sort
        list = this.filterList(list);
        list = this.sortList(list);
        list = this.searchList(list);

        return list;
    }

    filterList(list) {
        switch (this.props.filter) {
            case FilterEnum.completed:
                return list.filter(x => x.props.confirmed === true);

            case FilterEnum.pending:
                return list.filter(x => x.props.confirmed === false);

            default:
            case FilterEnum.none:
                return list;
        }
    }

    sortList(list) {
        switch (this.props.sort) {
            case SortEnum.nameAsc:
                return list.sort((a, b) => a.props.name.localeCompare(b.props.name));

            case SortEnum.nameDes:
                return list.sort((a, b) => b.props.name.localeCompare(a.props.name));

            case SortEnum.dateAsc:
                return list.sort((a, b) => (new Date(a.props.date) - new Date(b.props.date)));

            default:
            case SortEnum.dateDes:
                return list.sort((a, b) => (new Date(b.props.date) - new Date(a.props.date)));
        }
    }

    searchList(list) {
        return list.filter(x => x.props.name.toLowerCase().includes(this.props.search.toLowerCase()));
    }

    render() {
        const list = this.getList();

        return (
            <div className="payment-list">
                {this.props.newPayment &&
                    <NewPaymentCard
                        summaryList={this.props.summaryList}
                        myId={this.props.myId}
                        openCard={this.props.onNewPaymentChange}
                    />
                }
                {list}
            </div>
        );
    }
}

export default PaymentList;
