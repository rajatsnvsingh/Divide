import React, { Component } from "react";

class AmountButton extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="card">
                {this.props.amount}
            </div>
        );
    }
}

export default AmountButton;
