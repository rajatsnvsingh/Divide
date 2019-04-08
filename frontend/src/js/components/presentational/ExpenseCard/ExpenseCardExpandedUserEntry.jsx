import React, {Component} from 'react';

class ExpenseCardExpandedUserEntry extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let transaction = this.props.transaction;
        let splitType = transaction.split;
        let expenseStatusType = "Open";
        if(transaction.amtOwing - transaction.amtPaid <= 0)
            expenseStatusType = "Closed";
        
        
        return (
            <tr>
                <th scope="row">{this.props.rowIndex}</th>
                <td>{transaction.userId.name}</td>
                <td>{transaction.userId.email}</td>
                <td>{splitType}</td>
                <td>{transaction.amtOwing - transaction.amtPaid}</td>
                <td>{expenseStatusType}</td>
                <td><button className="btn btn-normal">Void</button></td>
                <td><button className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></td>
            </tr>
        );
    }
}

export default ExpenseCardExpandedUserEntry;