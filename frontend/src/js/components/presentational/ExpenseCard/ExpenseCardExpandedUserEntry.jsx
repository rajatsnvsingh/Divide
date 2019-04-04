import React, {Component} from 'react';

class ExpenseCardExpandedUserEntry extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let userEntry = this.props.user;
        let splitType = "X/Y";
        let expenseStatusType = "Open";
        
        return (
            <tr>
                <th scope="row">{this.props.rowIndex}</th>
                <td>{userEntry.name}</td>
                <td>{userEntry.userId}</td>
                <td>{splitType}</td>
                <td>{userEntry.amount}</td>
                <td>{expenseStatusType}</td>
                <td><button className="btn btn-normal">Void</button></td>
                <td><button className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></td>
            </tr>
        );
    }
}

export default ExpenseCardExpandedUserEntry;