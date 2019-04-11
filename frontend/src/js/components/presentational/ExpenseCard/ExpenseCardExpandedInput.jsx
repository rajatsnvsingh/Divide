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
            <div className="row text-center">
                <div className="col-md-3">
                    <h4>Title</h4>
                    <input type="text" className="form-control" value={this.props.title} placeholder="Enter a title..." onChange={this.onTitleChange} readOnly={this.props.readonly}/>
                </div>
                <div className="col-md-3">
                    <h4>Date</h4>
                    {/* {(this.props.readonly) ? <input type="text" className="form-control" } */}
                    <DatePicker selected={this.props.date} onChange={this.onDateChange}/>
                </div>
                
                
                <div className="col-md-3">
                    <h4>Amount</h4>
                    <input type="text" className="form-control-text" value={this.props.totalAmount} placeholder="Enter an amount ($)"
                        onChange={this.onAmountChange}
                    />
                </div>
                <div className="col-md-3">
                    <h4>Owner</h4>
                    <input type="text" className="form-control" value={(this.props.myId === this.props.owner._id) ? "You" : this.props.owner.name} readOnly />
                </div>
            </div>
        );


    }
}

export default ExpanseCardExpandedInput;