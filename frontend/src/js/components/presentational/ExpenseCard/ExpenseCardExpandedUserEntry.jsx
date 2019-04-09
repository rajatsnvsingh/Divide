import React, {Component} from 'react';

const splitTypeEnum = Object.freeze({ "fraction": 1 })

class ExpenseCardExpandedUserEntry extends Component {
    constructor(props) {
        super(props);
        this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this);
        this.onVoidButtonClick = this.onVoidButtonClick.bind(this);
    }

    onRemoveButtonClick() { 
        let transactionIndex = this.props.rowIndex;
        this.props.onRemoveTransaction(transactionIndex);
    }

    getStringFromSplitType(splitType){
        if(splitType === splitTypeEnum.fraction){
            return "X / Y";
        }
        else{
            return "X / Y";
        }
    }

    onVoidButtonClick(){
        let rowIndex = this.props.rowIndex;
        this.props.onVoidTransaction(rowIndex);
    }

    render() {
        let transaction = this.props.transaction;
        let splitType = this.getStringFromSplitType(transaction.split);
        let expenseStatusType = "Open";
        let remainingAmount = transaction.amtOwing - transaction.amtPaid;
        if(remainingAmount <= 0)
            expenseStatusType = "Closed";
        
        
        return (
            <tr>
                <th scope="row">{this.props.rowIndex}</th>
                <td>{transaction.userId.name}</td>
                <td>{transaction.userId.email}</td>
                <td>{splitType}</td>
                <td>{remainingAmount}</td>
                <td>{expenseStatusType}</td>
                <td><button className="btn btn-normal" onClick={this.onVoidButtonClick}>Void</button></td>
                <td><button className="close" aria-label="Close" onClick={this.onRemoveButtonClick}><span aria-hidden="true">&times;</span></button></td>
            </tr>
        );
    }
}

export default ExpenseCardExpandedUserEntry;