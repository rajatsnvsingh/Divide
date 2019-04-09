import React, { Component } from 'react';
import ExpenseCardExpandedUserEntry from './ExpenseCardExpandedUserEntry.jsx';

const splitTypeEnum = Object.freeze({ "fraction": 1 });

class ExpenseCardExpandedUserList extends Component {
    constructor(props) {
        super(props);
        this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
        this.onSearchButtonClicked = this.onSearchButtonClicked.bind(this);
        this.onSplitButtonClicked = this.onSplitButtonClicked.bind(this);
        this.onSplitOptionClicked = this.onSplitOptionClicked.bind(this);
        this.onUserOptionClicked = this.onUserOptionClicked.bind(this);
        this.onAddPersonButtonClicked = this.onAddPersonButtonClicked.bind(this);
        this.state = {
            searchText: "",
            searchDropdown: "",
            splitSelection: splitTypeEnum.fraction,
            splitDropdown: "",
            searchUsers: [],
            selectedUser: null
        };
    }

    componentDidMount() {
        // TODO Replace with socket call later on 
        this.setState({
            searchUsers: [
                {
                    "expenseId": [],
                    "notifications": [],
                    "_id": "10",
                    "email": "sack@sack.com",
                    "name": "Cardi Blue",
                    "__v": 0
                },
                {
                    "expenseId": [],
                    "notifications": [],
                    "_id": "11",
                    "email": "test2@gmail.com",
                    "name": "Carson Swammy",
                    "__v": 0
                },
                {
                    "expenseId": [],
                    "notifications": [],
                    "_id": "12",
                    "email": "test3@gmail.com",
                    "name": "AI Bob",
                    "__v": 0
                },
                {
                    "expenseId": [],
                    "notifications": [],
                    "_id": "1",
                    "email": "buddyBoi@buddyBoi",
                    "name": "Dalvin Lau",
                    "__v": 0
                }
            ]
        });
    }

    onSearchTextChanged(event) {
        this.setState({ searchText: event.target.value });
    }

    onSearchButtonClicked() {
        if (this.state.searchDropdown === "") {
            this.setState({ searchDropdown: "show" });
        }
        else {
            this.setState({ searchDropdown: "" });
        }
    }

    onSplitButtonClicked() {
        if (this.state.splitDropdown === "") {
            this.setState({ splitDropdown: "show" });
        }
        else {
            this.setState({ splitDropdown: "" });
        }
    }

    onSplitOptionClicked(event) {
        if (event.target.id === "fraction-split") {
            this.setState({
                splitSelection: splitTypeEnum.fraction,
                splitDropdown: ""
            });
        }
    }

    onUserOptionClicked(event) {
        for (let user of this.state.searchUsers) {
            if (user._id === event.currentTarget.id) {
                this.setState({
                    selectedUser: user,
                    searchDropdown: ""
                });
            }
        }
    }

    onAddPersonButtonClicked() {
        if(this.state.selectedUser === null) return;
        let user = this.state.selectedUser;
        let split = this.state.splitSelection;
        this.props.onAddNewTransaction(user, split);
    }

    getStringFromSplitType(splitType) {
        if (splitType === splitTypeEnum.fraction) {
            return "Fraction";
        }
    }

    render() {
        // Render list of transactions
        const transcationsList = this.props.transactions;
        const userListEntries = transcationsList.map((transaction, index) =>
            (<ExpenseCardExpandedUserEntry 
                key={index} 
                rowIndex={index} 
                transaction={transaction} 
                onRemoveTransaction={this.props.onRemoveTransaction}
                onVoidTransaction={this.props.onVoidTransaction} />)
        );

        // Filter list of users to show in dropdown
        const searchUsers = this.state.searchUsers.filter(
            (user) => user.name.toLowerCase().startsWith(this.state.searchText.toLowerCase())
        );

        // Render list of users to show in dropdown
        const userOptions = searchUsers.map((userOption) =>
            (<a key={userOption._id} id={userOption._id} className="dropdown-item" href="#" onClick={this.onUserOptionClicked}>
                <span className="font-weight-bold">{userOption.name} </span>
                <span className="text-secondary">({userOption.email})</span>
            </a>)
        );

        return (
            <div className="col text-center">
                <div className="row"><h4>&nbsp;</h4></div>
                <div className="row">
                    <div className="col-md-3">
                        <h4>Split</h4>
                        <button className="btn btn-default dropdown-toggle sfbtn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.onSplitButtonClicked}>
                            {this.getStringFromSplitType(this.state.splitSelection)}
                        </button>
                        <div className={"dropdown-menu " + this.state.splitDropdown} aria-labelledby="dropdownMenuButton">
                            <a id="fraction-split" className="dropdown-item" href="#" onClick={this.onSplitOptionClicked}>Fraction</a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <h4>Share With</h4>
                        <button type="button"
                            className="btn btn-default dropdown-toggle btn-block text-left sfbtn"
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            onClick={this.onSearchButtonClicked}>
                            {(this.state.selectedUser !== null) ? this.state.selectedUser.name : "Select User"}
                        </button>
                        <div className={"dropdown-menu " + this.state.searchDropdown} aria-labelledby="dropdownMenuButton">
                            <input type="text" className="form-control-text ml-1 mr-1" placeholder="Enter a name..." value={this.state.searchText} onChange={this.onSearchTextChanged} />
                            {userOptions}
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
                        <h4>&nbsp;</h4>
                        <button className="btn btn-dark" onClick={this.onAddPersonButtonClicked}>Add Person</button>
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