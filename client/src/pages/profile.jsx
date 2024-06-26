import React from "react";
import { useSelector } from "react-redux";
import '../css/editprof.css';
export default function Profile(){
    const {currentUser} = useSelector ((state)=>state.user);
    return(
        <div className="profile">
        <h1>Proflie</h1>
        <form className="profile-user">
            <img src={currentUser.profilePicture} className="prof-img"/>
            <input type="text" id='username' placeholder="Username" className="input-info" />
            <input type="text" id='email' placeholder="Email" className="input-info" />
            <input type="password" id='password' placeholder="Password" className="input-info" />
            <button className="update-btn">Update</button>
        </form>
        <div className="del-upd">
        <span className="delete-acc">Delete Account</span>
        <span className="sign-out">Sign Out</span>

        </div>
        
        </div>
    );
}