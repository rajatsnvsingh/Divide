import React, { Component } from "react";
import ExpensePaymentToggle from "./ExpensePaymentToggle.jsx";

class ExpenseInputContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ExpenseInput">
                <div className="input-group mb-3">
                    <input className="form-control" type="text" placeholder="Search" aria-label="Search"></input>
                    <div className="input-group-append">
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>
                <div className="dropdown">
                    <h2>Sort By:</h2>
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Select Sort Type
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Title-Ascending</a>
                        <a className="dropdown-item" href="#">Title-Descending</a>
                        <a className="dropdown-item" href="#">Price-Highest</a>
                        <a className="dropdown-item" href="#">Price-Lowest</a>
                        <a className="dropdown-item" href="#">Latest</a>
                        <a className="dropdown-item" href="#">Oldest</a>
                    </div>
                </div>
                <ExpensePaymentToggle expenseToggled={true} />
            </div>
        );
    }
}
export default ExpenseInputContainer;