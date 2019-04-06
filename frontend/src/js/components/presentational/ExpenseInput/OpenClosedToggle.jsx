import React, { Component } from "react";

class OpenClosedToggle extends Component {
    constructor(props) {
        super(props);
        this.onOpenClick = this.onOpenClick.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
    }

    onOpenClick() {
        this.props.onViewClosedExpensesChanged(false);
    }

    onCloseClick() {
        this.props.onViewClosedExpensesChanged(true);
    }

    render() {
        let openButtonStyle = "btn-secondary";
        let closedButtonStyle = "btn-outline-secondary";
        if (this.props.viewClosedExpenses === true) {
            openButtonStyle = "btn-outline-secondary";
            closedButtonStyle = "btn-secondary";
        }

        return (
            <div className="btn-group" role="group">
                <button className={"open-toggle btn " + openButtonStyle} onClick={this.onOpenClick}>Open</button>
                <button className={"closed-toggle btn " + closedButtonStyle} onClick={this.onCloseClick}>Closed</button>
            </div>
        );
    }
}
export default OpenClosedToggle;