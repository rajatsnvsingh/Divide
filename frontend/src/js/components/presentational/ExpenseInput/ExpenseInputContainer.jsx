import React, { Component } from "react";
import OpenClosedToggle from "./OpenClosedToggle.jsx";
import "./ExpenseInputContainer.css";

class ExpenseInputContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ExpenseInput">
                <div className="row">
                    <div className="input-group col">
                        <input className="form-control" type="text" placeholder="Search" aria-label="Search"></input>
                        <div className="input-group-append">
                            <button className="btn btn-primary">Search</button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="button-group">
                            <button type="button" className="btn btn-default dropdown-toggle btn-block text-left sfbtn" data-toggle="dropdown">Filter</button>
                            <ul className="dropdown-menu">
                                <li><a href="#" className="small" data-value="option1" tabIndex="-1"><input type="checkbox" />&nbsp;Option 1</a></li>
                                <li><a href="#" className="small" data-value="option2" tabIndex="-1"><input type="checkbox" />&nbsp;Option 2</a></li>
                                <li><a href="#" className="small" data-value="option3" tabIndex="-1"><input type="checkbox" />&nbsp;Option 3</a></li>
                                <li><a href="#" className="small" data-value="option4" tabIndex="-1"><input type="checkbox" />&nbsp;Option 4</a></li>
                                <li><a href="#" className="small" data-value="option5" tabIndex="-1"><input type="checkbox" />&nbsp;Option 5</a></li>
                                <li><a href="#" className="small" data-value="option6" tabIndex="-1"><input type="checkbox" />&nbsp;Option 6</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="dropdown col">
                        <button className="btn btn-default dropdown-toggle btn-block text-left sfbtn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort
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
                    <div className="col">
                        <OpenClosedToggle expenseToggled={true} />
                    </div>

                    
                </div>



            </div>
        );
    }
}
export default ExpenseInputContainer;