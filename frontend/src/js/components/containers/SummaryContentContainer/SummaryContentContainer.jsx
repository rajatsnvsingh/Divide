import React, { Component } from "react";
import SummaryContentList from "../SummaryContentList/SummaryContentList.jsx";

class SummaryContentContainer extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Owings</h1>
                <a href="#" className="closebtn">&times;</a>
                <SummaryContentList />
            </div>
        );
    }
}

export default SummaryContentContainer;
