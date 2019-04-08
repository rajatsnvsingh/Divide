import React, { Component } from 'react';
import ExpenseCardExpandedUserEntry from './ExpenseCardExpandedUserEntry.jsx';

class ExpenseCardExpandedUserList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const transcationsList = this.props.transactions;
        const userListEntries = transcationsList.map((transaction, index) => 
            <ExpenseCardExpandedUserEntry key={index} rowIndex={index} transaction={transaction} />
        );

        return (
            <div className="col text-center">
                <div className="row"><h4>&nbsp;</h4></div>
                <div className="row">
                <div className="col-md-3">
                        <h4>Split</h4>
                        <button className="btn btn-normal dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Split Type
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">fraction</a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <h4>Share With</h4>
                        <input type="text" className="form-control-text" placeholder="Enter a name..." />
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
                        <h4>&nbsp;</h4>
                        <button className="btn btn-dark">Add Person</button>
                    </div>
                </div>

                <div className="row"><h4>&nbsp;</h4></div>

                <div className="row">
                    <div className="col">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Split Type</th>
                                    <th scope="col">Payment Amount</th>
                                    <th scope="col">Payment Status</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {userListEntries}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}

export default ExpenseCardExpandedUserList;