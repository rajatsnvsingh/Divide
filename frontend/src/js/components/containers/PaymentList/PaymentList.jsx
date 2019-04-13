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
        // list = this.filterList(list);
        // list = this.sortList(list);
        // list = this.searchList(list);

        // bind to PaymentCard
        return list.map((x) => {
                let payer = x.payerId._id === this.props.myId;
                let name = payer ? name = x.payeeId.name : name = x.payerId.name;
                return <PaymentCard id={x._id} key={x._id} name={name} amount={x.amt} date={x.date} payer={payer} confirmed={x.status} />
            }
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
            // case SortEnum.nameAsc:
            //     return list.sort((a, b) => a.name.localeCompare(b.name));

            // case SortEnum.nameDes:
            //     return list.sort((a, b) => b.name.localeCompare(a.name));

            case SortEnum.dateAsc:
                return list.sort((a, b) => (new Date(a.date) - new Date(b.date)));

            default:
            case SortEnum.dateDes:
                return list.sort((a, b) => (new Date(b.date) - new Date(a.date)));
        }
    }

    searchList(list) {
        //return list.filter(x => x.name.toLowerCase().includes(this.props.search.toLowerCase()));
    }

    render() {
        const list = this.getList();

        return (
            <div className="payment-list">
                {this.props.newPayment ? <NewPaymentCard myId={this.props.myId} openCard={this.props.onNewPaymentChange} /> : null}                
                {list}
            </div>
        );
    }
}

export default PaymentList;
