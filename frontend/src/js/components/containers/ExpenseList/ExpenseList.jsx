import React, { Component } from "react";
import ExpenseCard from "../../presentational/ExpenseCard/ExpenseCard.jsx";
import "./ExpenseList.css";

class ExpenseList extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        const expenseList = [
            {
                id: 1, 
                name: "Pizza", 
                date: new Date(), 
                imageURL: "https://www.w3schools.com/bootstrap4/img_avatar3.png",
                isOwed: false,
                owner: "Rajat",
                owee: ["Aidan"],
                totalAmount: 50
            },
            {
                id: 2, 
                name: "Sandwich", 
                date: new Date(), 
                imageURL: "https://www.w3schools.com/bootstrap4/img_avatar3.png",
                isOwed: true,
                owner: "Aidan",
                owee: ["Rajat"],
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