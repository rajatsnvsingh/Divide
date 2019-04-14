import React, { Component } from "react";
import SummaryContentList from "../SummaryContentList/SummaryContentList.jsx";
import NotificationContentList from "../NotificationContentList/NotificationContentList.jsx";
import { viewStateEnum, summaryFilterEnum } from "../SummaryContainer/SummaryContainer.jsx";
import NotificationButton from "../../presentational/NotificationButton/NotificationButton.jsx";
import { socket } from "../../../../App.js";

class SummaryContentContainer extends Component {
    constructor(props) {
        super(props);
        this.closeButtonOnClick = this.closeButtonOnClick.bind(this);
        this.notificationDismissed = this.notificationDismissed.bind(this);
        this.state = {
            notifications: []
        };
    }

    componentDidMount() {
        socket.emit(
            "get_notifications",
            function(notifications_list) {
              this.setState({
                notifications: notifications_list
              });
            }.bind(this)
          );

          socket.on("incoming_notification", function(data) {
            console.log("incoming notification!");
            let {notifications} = this.state;
            let n = JSON.parse(data);
            notifications.push(JSON.parse(data));
            this.setState(notifications);
          }.bind(this));
    }

    closeButtonOnClick() {
        // switch to summary view when close button clicked
        this.props.onViewStateChange(viewStateEnum.summary);
        this.props.onSummaryFilterChange(summaryFilterEnum.none);
    }

    notificationDismissed(id) {
        let notificationId = id.substring(13);
        let {notifications} = this.state;
        let notification = notifications.filter(obj => {
            return obj._id === notificationId
          });
        socket.emit(
            "dismiss_notifications",
            JSON.stringify(notification[0]),
            function(response) {
                //let {notifications} = this.state;
                //console.log(response);
                let del_notification = notification[0];
                let new_list = notifications.filter(function( obj ) {
                    return obj._id !== del_notification._id;
                });
                this.setState({
                    notifications: new_list
                });
            }.bind(this)
          );
    }

    render() {
        const viewState = this.props.viewState;
        const {notifications} = this.state;
        if (viewState === viewStateEnum.summary) {
            const closeButtonStyle = this.props.summaryFilter === summaryFilterEnum.none ? "close float-right d-none" : "close float-right";

            return (
                <div>
                    <h1 className="float-left text-white">Summary</h1>
                    <button type="button" className={closeButtonStyle} onClick={this.closeButtonOnClick}>
                        <span><h1>&times;</h1></span>
                    </button>
                    <div className="clearfix mb-2"></div>
                    <SummaryContentList list={this.props.summaryList} filter={this.props.summaryFilter} />
                    <NotificationButton count={notifications.length} toggleViewState={this.props.toggleViewState} />
                </div>
            );
        }

        else {
            return (
                <div>
                    <h1 className="float-left text-white">Notifications</h1>
                    <button type="button" className="close float-right" onClick={this.closeButtonOnClick}>
                        <span><h1>&times;</h1></span>
                    </button>
                    <div className="clearfix mb-2"></div>
                    <NotificationContentList notifications={notifications} notificationDismissedCallback={this.notificationDismissed} />
                    <NotificationButton count={notifications.length} toggleViewState={this.props.toggleViewState} />
                </div>
            );
        }
    }
}

export default SummaryContentContainer;
