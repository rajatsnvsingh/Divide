import React, { Component } from "react";

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
            selectedUser: null
        };
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
            }
        }
    }

    render() {
        const userOptions = this.state.searchUsers.map(userOption => (
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
            <div className="form-control mr-1">
                <label className="col-form-label">Split With:</label>
                <button
                    type="button"
                    id="splitbutton"
                    className="btn btn-default dropdown-toggle btn-block text-left sfbtn"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onClick={this.onSearchButtonClicked}
                >
                    {this.state.selectedUser !== null
                        ? this.state.selectedUser.name
                        : "Select User"}
                </button>
                <div
                    className={"dropdown-menu " + this.state.searchDropdown}
                    aria-labelledby="dropdownMenuButton"
                >
                    <input
                        type="text"
                        className="form-control-text ml-1 mr-1"
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