import React, { Component } from "react";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import "./ExpenseCardExpandedInput.css";
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
        this.props.onAmountChange(newAmount);
    }
    
    render() {
        const date = this.props.date;
        return (
            <form className="input-section">
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label for="inputTitle" className="col-form-label">Title</label>
                    <input type="text" id="inputTitle" className="form-control" value={this.props.title} placeholder="Enter a title.." onChange={this.onTitleChange} readOnly={this.props.readonly}/>
                    
                    <label for="inputAmount" className="col-form-label">Amount</label>
                    <input type="text" id="inputAmount" className="form-control" value={this.props.totalAmount} placeholder="Enter Price"
                        onChange={this.onAmountChange}
                    />
                </div>
                
                <div className="form-group col-md-6">
                    <label for="inputOwner" className="col-form-label">Owner</label>
                    <input id="inputOwner" type="text" className="form-control" value={(this.props.myId === this.props.owner._id) ? "You" : this.props.owner.name} readOnly />

                    <label for="inputdate" className="col-form-label">Date</label><br/>
                    <DatePicker className="form-control w-100" selected={this.props.date} onChange={this.onDateChange}/>
                </div>
            </div>
        </form>
        );


    }
}

export default ExpanseCardExpandedInput;