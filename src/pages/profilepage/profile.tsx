/* eslint-disable */

import React, { useEffect, useContext, useState } from "react";
import "./style.css";
import ReactTabs from "../../components/tabs/Tabs";
import { Link } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../context/authContext";

const profile = () => {
  const { currentUser } = useContext(AuthContext);
  const Member_UCID = currentUser?.UCID;
  const accountType = currentUser?.AccountType;

  const supervisorAccount = currentUser?.Supervisor_ID;
  type Profile = StudentProfile | SupervisorProfile;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isSupervisor, setIsSupervisor] = useState(false);

  interface StudentProfile {
    UCID: string;
    Dob: string;
    Bio: string;
    FName: string;
    LName: string;
    Email: string;
    AccountType: string;
  }

  interface SupervisorProfile {
    Supervisor_ID: number;
    FName: string;
    LName: string;
    Email: string;
    AccountType?: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = localStorage.getItem("user");
        console.log("user str " + userStr);
        if (!userStr) {
          console.log("User data not found in localStorage");
          return;
        }

        const user = JSON.parse(userStr);

        setIsSupervisor(supervisorAccount);
        let res;
        if (supervisorAccount) {
          console.log(supervisorAccount + " yes");
          res = await axios.post("/profile/showSup", {
            Supervisor_ID: user.Supervisor_ID,
          });
        } else {
          console.log(supervisorAccount + " no");
          res = await axios.post("/profile/show", { UCID: user.UCID });
        }

        console.log("res.data " + res.data);

        setProfile(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  if (!profile) {
    return <div>Loading profile...</div>;
  }
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
            <div className="postH1">{profile.FName + " " + profile.LName}</div>
            {!isSupervisor && "UCID" in profile && (
              <div className="postP">UCID: {profile.UCID}</div>
            )}
            <div className="postP">Email: {profile.Email}</div>
            {!isSupervisor && "Bio" in profile && (
              <div className="postP">{profile.Bio}</div>
            )}
            <div className="postP">
              Account Type: {profile.AccountType || "SUPERVISOR"}
            </div>

            <div className="profileButtons">
              <a href="/profile/edit">
                <button className="postsButton editButton">Edit</button>
              </a>
              <a href="/profile/editpassword">
                <button
                  style={{ width: 160 }}
                  className="postsButton editButton"
                >
                  Change Password
                </button>
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
