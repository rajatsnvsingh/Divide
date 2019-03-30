import React, { Component } from "react";

class AmountButton extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const style = this.props.style === "owing" ? "btn btn-success" : "btn btn-danger";

        return (
            <button type="button" className={style}>{"$" + this.props.amount}</button>
        );
    }
}

export default AmountButton;
