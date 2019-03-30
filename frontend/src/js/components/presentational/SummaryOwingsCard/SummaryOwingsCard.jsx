import React, { Component } from "react";

class SummaryOwingsCard extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="card">
                {this.props.content}
            </div>
        );
    }
}

export default SummaryOwingsCard;
