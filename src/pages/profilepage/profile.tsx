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
    <div>
      <div className='text-[3rem] font-extrabold text-center text-[#333] pt-16'>My Account</div>
      <div className='flex flex-col md:flex-row m-6 md:m-12 lg:m-32 mt-6 gap-8 md:gap-0'>
        <div className='flex flex-col flex-1 justify-center items-center text-center rounded-md border border-red-500 pt-7 pb-7 h-fit'>
          <img
            className="rounded-full border-2 border-red-500 w-24 h-24"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          />
          <div className='flex flex-col gap-2 p-2'>
            <div className='text-2xl whitespace-normal overflow-hidden text-ellipsis line-clamp-1 font-semibold'>{profile.FName + ' ' + profile.LName}</div>
            <div className='text-base whitespace-normal overflow-hidden text-ellipsis line-clamp-3 text-[#333] max-h-[4.8em]'>UCID: {profile.UCID}</div>
            <div className='text-base whitespace-normal overflow-hidden text-ellipsis line-clamp-3 text-[#333] max-h-[4.8em]'>Email: {profile.Email}</div>
            <div className='text-base whitespace-normal overflow-hidden text-ellipsis line-clamp-3 text-[#333] max-h-[4.8em]'>{profile.Bio}</div>
            <div className='text-base whitespace-normal overflow-hidden text-ellipsis line-clamp-3 text-[#333] max-h-[4.8em]'>Account Type: {profile.AccountType}</div>
            <div className='flex gap-4 flex-col lg:flex-row'>
              <a href='/profile/edit'>
                <button className='w-max py-2 px-5 rounded-xl bg-[#4681f4] border-2 border-[#f5f7f8] text-[#f5f7f8] transition-[.3s] ease-linear hover:border-[#4681f4] hover:bg-[#f5f7f8] hover:text-[#4681f4]'>Edit</button>
              </a>
              <a href='/profile/editpassword'>
                <button style={{width: 160}} className='w-max py-2 px-5 rounded-xl bg-[#4681f4] border-2 border-[#f5f7f8] text-[#f5f7f8] transition-[.3s] ease-linear hover:border-[#4681f4] hover:bg-[#f5f7f8] hover:text-[#4681f4]'>Change Password</button>
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
