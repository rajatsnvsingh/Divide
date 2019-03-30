import React, { Component } from "react";
import '../../../../css/styles.css';

class SummaryOwingsCard extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="divide-card">
                {this.props.content}
            </div>
        );
    }
}

export default SummaryOwingsCard;
