import React, { Component } from 'react';

class ExpenseCardExpandedUserList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Share With</h4>
                        <input type="text" className="form-control-text" placeholder="Enter a name..." />
                    </div>
                    <div className="col-md-3">
                        <h5>Split</h5>
                        <button className="btn btn-normal dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Split Type
                    </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">fraction</a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-dark">Add Person</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Split Type</th>
                                    <th scope="col">Payment Amount</th>
                                    <th scope="col">Payment Status</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}

export default ExpenseCardExpandedUserList;