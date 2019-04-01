import React, { Component } from "react";

class ExpenseCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        const expense = this.props.expense;

        let content;

        if (expense.isOwed) {
            content = <p>You are owed <h4 className="text-success">${expense.totalAmount}</h4></p>;
        }
        else {
            content = <p>You owe {expense.owner}<h4 className="text-danger">${expense.totalAmount}</h4></p>;
        }

        let monthName = monthNames[expense.date.getMonth()];
        console.log(monthName);

        return (
            <div className="card mb-3">
                <div className="card-body p-0">
                    <div className="row align-items-center">
                        <div className="col-2">
                            <h4>{monthName}</h4>
                            <h4>{expense.date.getDate()}</h4>
                        </div>
                        <div className="col-md-8">
                            <h2>{expense.name}</h2>{content}
                        </div>
                        <div className="col-2">
                            <img className="card-img-top" src={expense.imageURL}></img>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExpenseCard;

                // id = 1, 
                // name = "Pizza", 
                // date = new Date(), 
                // imageURL = "https://www.w3schools.com/bootstrap4/img_avatar3.png",
                // isOwed = false,
                // owner = "Rajat",
                // owee = ["Aidan"],
                // totalAmount = 50