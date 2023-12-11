/* eslint-disable */

import React, { useEffect, useContext, useState } from "react";
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
    <div>
      <div className='text-[3rem] font-extrabold text-center text-[#333] pt-16'>My Account</div>
      <div className='flex flex-col md:flex-row m-6 md:m-12 lg:m-32 mt-6 gap-8 md:gap-0'>
        <div className='flex flex-col flex-1 justify-center items-center text-center rounded-md border border-red-500 pt-7 pb-7 h-fit'>
          <img
            className="rounded-full border-2 border-red-500 w-24 h-24"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          ></img>
          <div className='flex flex-col gap-2 p-2'>
            <div className='text-2xl whitespace-normal overflow-hidden text-ellipsis line-clamp-1 font-semibold'>{profile.FName + " " + profile.LName}</div>
            {!isSupervisor && "UCID" in profile && (
              <div className='text-base whitespace-normal overflow-hidden text-ellipsis line-clamp-3 text-[#333] max-h-[4.8em]'>UCID: {profile.UCID}</div>
            )}
            <div className='text-base whitespace-normal overflow-hidden text-ellipsis line-clamp-3 text-[#333] max-h-[4.8em]'>Email: {profile.Email}</div>
            {!isSupervisor && "Bio" in profile && (
              <div className='text-base whitespace-normal overflow-hidden text-ellipsis line-clamp-3 text-[#333] max-h-[4.8em]'>{profile.Bio}</div>
            )}
            <div className='text-base whitespace-normal overflow-hidden text-ellipsis line-clamp-3 text-[#333] max-h-[4.8em]'>
              Account Type: {profile.AccountType || "SUPERVISOR"}
            </div>

            <div className='flex gap-4 flex-col lg:flex-row'>
              <a href="/profile/edit">
                <button className='w-max py-2 px-5 rounded-xl bg-[#4681f4] border-2 border-[#f5f7f8] text-[#f5f7f8] transition-[.3s] ease-linear hover:border-[#4681f4] hover:bg-[#f5f7f8] hover:text-[#4681f4]'>Edit</button>
              </a>
              <a href="/profile/editpassword">
                <button
                  style={{ width: 160 }}
                  className='w-max py-2 px-5 rounded-xl bg-[#4681f4] border-2 border-[#f5f7f8] text-[#f5f7f8] transition-[.3s] ease-linear hover:border-[#4681f4] hover:bg-[#f5f7f8] hover:text-[#4681f4]'
                >
                  Change Password
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className='flex flex-row flex-[3] mx-8 lg:mx-12 items-center justify-center'>
          <ReactTabs />
        </div>
      </div>
    </div>
  );
};

export default profile;
