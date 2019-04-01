import React, { Component } from "react";
import './ProfileInfo.css'

class ProfileInfo extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="card profile-card">
                <img className="card-img-top" src="https://www.w3schools.com/bootstrap4/img_avatar3.png"></img>
                <div className="card-body p-2">
                    <h4 className="card-title text-center">Rajat Singh</h4>
                </div>
            </div>
        );
    }
}

export default ProfileInfo;
