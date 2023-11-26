import React, { useEffect, useState } from "react";
import "./style.css";
import discordLogo from './discord-logo.jpg';
import instagramLogo from './instagram-logo.png';
import axios from "axios";
import { useParams } from "react-router-dom";

const Clubpage = () => {
  const editable = true;
  // send a request here to see if the current user should have permissions to edit the activity
  const { id } = useParams();

  const [club, setClub] = useState({
    Activity_ID: id,
    Name: '',
    Description: '',
    Fee: '',
    Schedule: '',
    InterviewRequired: '',
    ApplicationRequired: '',
    WeekCommitmentHour: '',
    Faculty: '',
    Img_file_path: '',
    Discord: '',
    Instagram: '',
    Perk: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/club/show", {Activity_ID: id});
        setClub({
          Activity_ID: res.data.Activity_ID,
          Name: res.data.Name,
          Description: res.data.Description ?? '',
          Fee: res.data.Fee ?? '',
          Schedule: res.data.Schedule ?? '',
          InterviewRequired: res.data.InterviewRequired ?? '',
          ApplicationRequired: res.data.ApplicationRequired ?? '',
          WeekCommitmentHour: res.data.WeekCommitmentHour ?? '',
          Faculty: res.data.Faculty_Name ?? '',
          Img_file_path: res.data.Img_file_path,
          Discord: res.data.Discord ?? '',
          Instagram: res.data.Instagram ?? '',
          Perk: res.data.Perk ?? ''
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="club-page">
      <div className="title-and-img">
        <div className="img-container">
          <img src={club.Img_file_path} alt="Club Logo"></img>
        </div>
        <div className="title-container">
          <h1>{club.Name}</h1>
          {editable ? 
          <a href={`/club/${id}/edit`}>
            <button className="edit-button">Edit</button>
          </a> : <></>}
        </div>
      </div>
      <div className="desc">{club.Description}</div>
        <div className="more-info">
          <div className="info-row">
            <div className="info">
              <h2>Fee:</h2>
              <p>${club.Fee}</p>
            </div>
            <div className="info">
              <h2>From Faculty:</h2>
              <p>{club.Faculty}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info">
              <h2>Interview Required:</h2>
              <p>{club.InterviewRequired}</p>
            </div>
            <div className="info">
              <h2>Application Required:</h2>
              <p>{club.ApplicationRequired}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info">
              <h2>Schedule:</h2>
              <p>{club.Schedule}</p>
            </div>
            <div className="info">
              <h2>Commitment Hours per Week</h2>
              <p>{club.WeekCommitmentHour}</p>
            </div>
          </div>

          <div className="info-row">
            <div className="info">
              <h2>Perks:</h2>
              <p>{club.Perk}</p>
            </div>
          </div>

          <div className="social-row">
            <div className="social discord">
              <img src={discordLogo} alt="Discord Logo"></img>
              <a href={club.Discord} target="_blank" rel="noreferrer">Discord</a>
            </div>
            <div className="social instagram">
              <img src={instagramLogo} alt="Instagram Logo"></img>
              <a href={club.Instagram} target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Clubpage;
