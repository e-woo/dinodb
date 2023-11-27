/* eslint-disable */

import React, { useEffect, useState } from "react";
import "./style.css";
import ReactTabs from "../../components/tabs/Tabs";
import { Link } from "react-router-dom";
import axios from "axios";

const profile = () => {
  const [profile, setProfile] = useState({
    UCID: '',
    Dob: '',
    Bio: '',
    FName: '',
    LName: '',
    Email: '',
    AccountType: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          console.log("User data not found in localStorage");
          return;
        }
  
        const user = JSON.parse(userStr);
        const ucid = user.UCID; 

         const res = await axios.post("/profile/show", {UCID: ucid})
         setProfile({
          UCID: res.data.UCID,
          Dob: res.data.Dob,
          Bio: res.data.Bio,
          FName: res.data.FName,
          LName: res.data.LName,
          Email: res.data.Email,
          AccountType: res.data.AccountType
         })
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="profile">
      <div className="bigHeader">My Account</div>
      <div className="profileSections">
        <div className="userInfo">
          <img
            className="userImg profileImg"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          ></img>
          <div className="profileText">
            <div className="postH1">{profile.FName + ' ' + profile.LName}</div>
            <div className="postP">UCID: {profile.UCID}</div>
            <div className="postP">Email: {profile.Email}</div>
            <div className="postP">{profile.Bio}</div>
            <div className="postP">Account Type: {profile.AccountType}</div>
            <div className='profileButtons'>
              <a href='/profile/edit'>
                <button className="postsButton editButton">Edit</button>
              </a>
              <a href='/profile/editpassword'>
                <button style={{width: 160}} className="postsButton editButton">Change Password</button>
              </a>
            </div>
          </div>
        </div>
        <div className="activityInfo">
          <ReactTabs />
        </div>
      </div>
    </div>
  );
};

export default profile;
