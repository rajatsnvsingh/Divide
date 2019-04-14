import React, { Component } from "react";
import './ProfileInfo.css'
import { socket } from "../../../../App";

class ProfileInfo extends Component {
    constructor(props){
        super(props);
        this.setImage = this.setImage.bind(this);
        this.state = {
            image: ""
        }
    }

    imageClicked() {
        console.log("clicked");
        document.getElementById('logo').click();
    }

    setImage() {
        console.log("file uploaded");
        let file = document.getElementById('logo').files[0];
        var reader = new FileReader();
        reader.onloadend = function (e) {
            console.log(e);
            document.getElementById('profilepic').src= e.target.result;

            socket.emit(
                "profile_picture",
                e.target.result.toString('base64'),
                function(response) {
                }.bind(this)
              );
        };
        reader.readAsDataURL(file);
    }

    render() {
        let img = "";
        if (this.props.myPicture) {
            img = this.props.myPicture;
        }
        else {
            img = null;
        }
        return (
            <div className="card mt-2 mb-4">
                <img id="profilepic" onClick={this.imageClicked} className="card-img-top" src={img}></img>
                <div className="card-body p-2">
                    <h4 className="card-title text-center">{this.props.name}</h4>
                </div>
                <input className="d-none" type="file" id="logo" onChange={() => this.setImage()}></input>
            </div>
        );
    }
}

export default ProfileInfo;
