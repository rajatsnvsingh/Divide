import React, { Component } from "react";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import "./ExpenseCardExpandedInput.css";

const expenseStatusType = Object.freeze({ pending: 1, open: 2, closed: 3 });

class ExpanseCardExpandedInput extends Component {
    constructor(props) {
        super(props);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
    }

    onTitleChange(event) {
        const newTitle = event.target.value;
        this.props.onTitleChange(newTitle);
    }

    onDateChange(date){
        this.props.onDateChange(date);
    }

    onAmountChange(event){
        const newAmount = event.target.value;
        if(newAmount !== "" && (isNaN(parseFloat(newAmount)) || !isFinite(newAmount))) return;
        this.props.onAmountChange(newAmount);
    }
    
    render() {
        let renderTitleMessage = false;
        let renderAmountMessage = false;

        if(this.props.title.length === 0) renderTitleMessage = true;
        if(isNaN(this.props.totalAmount) || this.props.totalAmount <= 0) renderAmountMessage = true;

        return (
            <form className="input-section">
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label className="col-form-label">Title <span className="text-danger">{renderTitleMessage && "(Must not be Empty)"}</span></label>
                    <input type="text" id="inputTitle" className="form-control" value={this.props.title} placeholder="Enter a title.." onChange={this.onTitleChange} readOnly={this.props.readonly}/>
                    
                    <label className="col-form-label">Amount <span className="text-danger">{renderAmountMessage && "(Must be a Non-Zero Number)"}</span></label>
                    <input type="text" id="inputAmount" className="form-control" value={this.props.totalAmount} placeholder="Enter Price"
                        onChange={this.onAmountChange}
                        readOnly={this.props.status !== expenseStatusType.pending}
                    />
                </div>
                
                <div className="form-group col-md-6">
                    <label className="col-form-label">Owner</label>
                    <input id="inputOwner" type="text" className="form-control" value={(this.props.myId === this.props.owner._id) ? "You" : this.props.owner.name} readOnly />

                    <label className="col-form-label">Date</label><br/>
                    <DatePicker className="form-control w-100" selected={this.props.date} onChange={this.onDateChange} readOnly={this.props.readonly}/>
                </div>
            </div>
        </form>
        );


    }
}

export default ExpanseCardExpandedInput;