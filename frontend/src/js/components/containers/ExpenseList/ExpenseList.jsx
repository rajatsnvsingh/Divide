import React, { Component } from "react";
import ExpenseCard from "../../presentational/ExpenseCard/ExpenseCard.jsx";
import "./ExpenseList.css";
import ExpenseCardExpanded, {splitTypeEnum, expenseStatusType} from "../../presentational/ExpenseCard/ExpenseCardExpanded.jsx";

class ExpenseList extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        const expenseList = [
            {
                id: 1, 
                title: "Pizza", 
                date: new Date(), 
                imageURL: "https://www.w3schools.com/bootstrap4/img_avatar3.png",
                isOwed: false,
                owner: "Rajat",
                owee: [{userId: 1, name: "Aidan", amount: 50}],
                totalAmount: 50
            },
            {
                id: 2, 
                title: "Sandwich", 
                date: new Date(), 
                imageURL: "https://www.w3schools.com/bootstrap4/img_avatar3.png",
                isOwed: true,
                owner: "Aidan",
                owee: [{userId: 2, name: "Rajat", amount: 13}, {userId: 3, name: "Tommy", amount: 17}, {userId: 4, name: "Cheech", amount: 17}],
                totalAmount: 13
            }
        ];
        const expenseComponents = expenseList.map((expense) => 
            <li key={expense.id}>
                <ExpenseCard expense={expense} />
            </li>
        );

        return (
            <ul>{expenseComponents}</ul>
        );
    }

}

export default ExpenseList;