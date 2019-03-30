import React, { Component } from "react";
import {viewIndexEnum} from "../Home.jsx";

class MainContentContainer extends Component {
    constructor(props){
        super(props);
    }

    render() {
        if(this.props.viewIndex === viewIndexEnum.expenses){
            return (
                <div className="MainExpenseContainer">
                    
                </div>
            );
        }
        else if(this.props.viewIndex === viewIndexEnum.payments){
            return (
                <div className="MainPaymentContainer">
                    
                </div>
            );
        }
        else{
            return <div className="MainExpenseContainer">
                    
            </div>
        }
    }
}
export {MainContentContainer};