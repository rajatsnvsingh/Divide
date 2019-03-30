import React, { Component } from "react";

class ProfileInfo extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            // will have image here
            <div className="card">
                {this.props.name}
            </div>
        );
    }
}

export default ProfileInfo;
