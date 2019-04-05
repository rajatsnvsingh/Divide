import React, { Component } from "react";
<<<<<<< HEAD
import NavigationHeader from "./NavigationHeader/NavigationHeader.jsx";
=======
>>>>>>> 7ebe35e3d774ae8e3b524913dd783af9471dbbc8
import { MainContentContainer } from "./MainContentContainer/MainContentContainer.jsx";
import SummaryContainer from "./SummaryContainer/SummaryContainer.jsx"

let viewIndexEnum = Object.freeze({ "expenses": 1, "payments": 2 });

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="row">
        <SummaryContainer />
<<<<<<< HEAD
        <div className="col-md-10">
          <NavigationHeader viewIndex={viewIndexEnum.expenses}/>
          <MainContentContainer viewIndex={viewIndexEnum.expenses}/>
        </div>
=======
        <MainContentContainer viewIndex={viewIndexEnum.payments} />
>>>>>>> 7ebe35e3d774ae8e3b524913dd783af9471dbbc8
      </div>
    );
  }
}

export { Home };
export { viewIndexEnum };
