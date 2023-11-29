import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import websiteLogo from "./website-logo.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Programpage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const accountType = currentUser?.AccountType;
  const accountUCID = currentUser?.UCID;

  const [joined, setJoined] = useState(false);
  const [editable, setEditable] = useState(false);
  const [program, setProgram] = useState({
    Activity_ID: id,
    Name: "",
    Description: "",
    Fee: "",
    Schedule: "",
    InterviewRequired: "",
    ApplicationRequired: "",
    WeekCommitmentHour: "",
    Faculty: "",
    Img_file_path: "",
    Website: "",
    Perk: "",
  });

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        await axios.delete(`/program/delete`, { data: { Activity_ID: id } });
        navigate(`../search`);
        alert("Program deleted successfully");
      } catch (error) {
        console.error("Error deleting program", error);
        alert("Failed to delete program");
      }
    }
  };

  const handleJoin = async () => {
    try {
      await axios.post(`/program/join`, { UCID: accountUCID, Activity_ID: id });
      setJoined(true);
    } catch (error) {
      console.log("Error joining program", error);
      alert("Failed to join program");
    }
  };

  const handleLeave = async () => {
    if (window.confirm("Are you sure you want to leave this program?")) {
      try {
        await axios.delete(`/program/leave`, {
          data: {
            UCID: accountUCID,
            Activity_ID: id,
          },
        });
        setJoined(false);
      } catch (error) {
        console.log("Error leaving program", error);
        alert("Failed to leave program");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/program/show", { Activity_ID: id });
        console.log(res);
        setProgram({
          Activity_ID: res.data.Activity_ID,
          Name: res.data.Name,
          Description: res.data.Description,
          Fee: res.data.Fee ?? "",
          Schedule: res.data.Schedule,
          InterviewRequired: res.data.InterviewRequired,
          ApplicationRequired: res.data.ApplicationRequired,
          WeekCommitmentHour: res.data.WeekCommitmentHour ?? "",
          Faculty: res.data.Faculty_Name,
          Img_file_path: res.data.Img_file_path,
          Website: res.data.Website,
          Perk: res.data.Perk,
        });

        const execRes = await axios.post("/program/getExecs", {
          Activity_ID: id,
        });
        console.log(execRes);
        const execUCIDs = execRes.data.map((exec: { UCID: any }) => exec.UCID);
        console.log(execUCIDs);

        if (execUCIDs.includes(accountUCID)) {
          setEditable(true);
        }

        const memRes = await axios.post("/program/getMembers", {
          Activity_ID: id,
        });
        console.log(memRes);
        const memUCIDs = memRes.data.map(
          (member: { Student_UCID: any }) => member.Student_UCID
        );
        console.log(memUCIDs);

        if (memUCIDs.includes(accountUCID)) {
          setJoined(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="program-page">
      <div className="title-and-img">
        <div className="img-container">
          <img src={program.Img_file_path} alt="Program Logo"></img>
        </div>
        <div className="title-container">
          <h1>{program.Name}</h1>

          {currentUser ? (
            joined ? (
              <button className="delete-button" onClick={handleLeave}>
                Leave
              </button>
            ) : (
              <button className="edit-button" onClick={handleJoin}>
                Join
              </button>
            )
          ) : null}
        </div>
      </div>
      <div className="button-row">
        {editable && (
          <>
            <a href={`/event/${id}/create`}>
              <button className="edit-button">Create Event</button>
            </a>
            <a href={`/program/${id}/edit`}>
              <button className="edit-button">Edit</button>
            </a>
            <a href={`/program/${id}/announcement`}>
              <button className="edit-button announcement-button">
                Post Announcement
              </button>
            </a>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
      <div className="desc">{program.Description}</div>
      <div className="more-info">
        <div className="info-row">
          <div className="info">
            <h2>Fee:</h2>
            <p>${program.Fee}</p>
          </div>
          <div className="info">
            <h2>From Faculty:</h2>
            <p>{program.Faculty}</p>
          </div>
        </div>
        <div className="info-row">
          <div className="info">
            <h2>Interview Required:</h2>
            <p>{program.InterviewRequired}</p>
          </div>
          <div className="info">
            <h2>Application Required:</h2>
            <p>{program.ApplicationRequired}</p>
          </div>
        </div>
        <div className="info-row">
          <div className="info">
            <h2>Schedule:</h2>
            <p>{program.Schedule}</p>
          </div>
          <div className="info">
            <h2>Commitment Hours per Week</h2>
            <p>{program.WeekCommitmentHour}</p>
          </div>
        </div>
        <div className="info-row">
          <div className="info">
            <h2>Perks</h2>
            <p>{program.Perk}</p>
          </div>
        </div>
        <div className="social-row">
          <div className="social website">
            <img src={websiteLogo} alt="WWW Website Logo"></img>
            <a href={program.Website} target="_blank" rel="noreferrer">
              Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programpage;
