import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import discordLogo from './discord-logo.jpg';
import instagramLogo from './instagram-logo.png';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Clubpage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext)
  const accountType = currentUser?.AccountType;
  const accountUCID = currentUser?.UCID;

  const [joined, setJoined] = useState(false);
  const [editable, setEditable] = useState(false);
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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this club?")) {
      try {
        await axios.delete(`/club/delete`, { data: { Activity_ID: id } });
        navigate(`../search`);
        alert("Club deleted successfully");

      } catch (error) {
        console.error("Error deleting club", error);
        alert("Failed to delete club");
      }
    }
  }

  const handleJoin = async () => {
    try {
      await axios.post(`/club/join`, { UCID: accountUCID, Activity_ID: id });
      setJoined(true);

    } catch (error) {
      console.log("Error joining club", error);
      alert("Failed to join club");
    }
  }

  const handleLeave = async () => {
    if (window.confirm("Are you sure you want to leave this club?")) {
      try {
        await axios.delete(`/club/leave`, {
          data: {
            UCID: accountUCID,
            Activity_ID: id
          }
        });
        setJoined(false);
  
      } catch (error) {
        console.log("Error leaving club", error);
        alert("Failed to leave club");
      }
    }
  }

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

        const execRes = await axios.post("/club/getExecs", {Activity_ID: id});
        console.log(execRes);
        const execUCIDs = execRes.data.map((exec: { UCID: any; }) => exec.UCID);
        console.log(execUCIDs);

        if (execUCIDs.includes(accountUCID)) {
          setEditable(true);
        }

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
          {currentUser ? (
            joined ? (
              <button className="delete-button" onClick={handleLeave}>Leave</button>
            ) : (
              <button className="edit-button" onClick={handleJoin}>Join</button>
            )
          ) : null}
          {editable && (
            <>
              <a href={`/club/${id}/edit`}>
                <button className="edit-button">Edit</button>
              </a>
              <button className="delete-button" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
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
