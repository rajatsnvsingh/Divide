import React, { Component } from "react";
import ExpenseCard from "../../presentational/ExpenseCard/ExpenseCard.jsx";
import "./ExpenseList.css";
import ExpenseCardExpanded from "../../presentational/ExpenseCard/ExpenseCardExpanded.jsx";

const splitTypeEnum = Object.freeze({ "fraction": 1 });
const expenseStatusType = Object.freeze({ "pending": 1, "open": 2, "closed": 3 });

class ExpenseList extends Component {
    constructor(props){
        super(props);
        this.state = {
            expenses: []
        };
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
                owee: [{userId: 1, name: "Aidan", amount: 50, splitType: splitTypeEnum.fraction}],
                totalAmount: 50
            },
            {
                id: 2, 
                title: "Sandwich", 
                date: new Date(), 
                imageURL: "https://www.w3schools.com/bootstrap4/img_avatar3.png",
                isOwed: true,
                owner: "Aidan",
                owee: [
                    {userId: 2, name: "Rajat", amount: 13, splitType: splitTypeEnum.fraction}, 
                    {userId: 3, name: "Tommy", amount: 17, splitType: splitTypeEnum.fraction}, 
                    {userId: 4, name: "Cheech", amount: 17, splitType: splitTypeEnum.fraction}],
                totalAmount: 13
            }
        ];
        const expenseComponents = expenseList.map((expense) => 
            <li key={expense.id}>
                <ExpenseCardExpanded expense={expense} />
            </li>
        );

        return (
            <ul>{expenseComponents}</ul>
        );
    }

}

export default ExpenseList;