import React, { Component } from "react";
import '../../presentational/ExpenseInput/ExpenseInputContainer.css';
import './SearchableDropdown.css';
import { socket } from "../../../../App.js";

class SearchableDropdown extends Component {
    constructor(props) {
        super(props);

        this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
        this.onSearchButtonClicked = this.onSearchButtonClicked.bind(this);
        this.onUserOptionClicked = this.onUserOptionClicked.bind(this);
        this.state = {
            searchText: "",
            searchDropdown: "",
            searchUsers: [],
            selectedUser: this.props.user
        };
    }

    componentDidMount() {
        socket.emit(
            "get_all_users",
            function (userList) {
                userList = userList.filter(user => user._id !== this.props.myId);
                this.setState({
                    searchUsers: userList
                });
            }.bind(this)
        );
    }

    onSearchTextChanged(event) {
        this.setState({ searchText: event.target.value });
    }

    onSearchTextChanged(event) {
        this.setState({ searchText: event.target.value });
    }

    onSearchButtonClicked() {
        if (this.state.searchDropdown === "") {
            this.setState({ searchDropdown: "show" });
        } else {
            this.setState({ searchDropdown: "" });
        }
    }

    onUserOptionClicked(event) {
        for (let user of this.state.searchUsers) {
            if (user._id === event.currentTarget.id) {
                this.setState({
                    selectedUser: user,
                    searchDropdown: ""
                });
                this.props.onUserChange(user);
            }
        }
    }

    render() {
        // Filter list of users to show in dropdown
        const searchUsers = this.state.searchUsers.filter(user =>
            user.name.toLowerCase().startsWith(this.state.searchText.toLowerCase())
        );

        const userOptions = searchUsers.map(userOption => (
            <a
                key={userOption._id}
                id={userOption._id}
                className="dropdown-item"
                href="#"
                onClick={this.onUserOptionClicked}
            >
                <span className="font-weight-bold">{userOption.name} </span>
                <span className="text-secondary">({userOption.email})</span>
            </a>
        ));

        return (
            <div className="form-control border-0 mr-1">
                <button
                    type="button"
                    className="btn btn-default dropdown-toggle btn-block text-left sfbtn"
                    type="button"
                    data-toggle="dropdown"
                    onClick={this.onSearchButtonClicked}
                >
                    {this.state.selectedUser !== null ? this.state.selectedUser.name : "Select User"}
                </button>
                <div className={this.state.searchDropdown === "show" ? "searchable-ddl" : "d-none"}>
                    <input
                        type="text"
                        className="form-control w-100"
                        placeholder="Enter a name..."
                        value={this.state.searchText}
                        onChange={this.onSearchTextChanged}
                    />
                    {userOptions}
                </div>
            </div>
        );
    }
}

export default SearchableDropdown;