import React, { useEffect, useState } from "react";
import "./style.css";
import websiteLogo from "./website-logo.png";
import { useParams } from "react-router-dom";
import axios from "axios";

const Programpage = () => {
  const editable = true;
  // send a request here to see if the current user should have permissions to edit the activity
  const { id } = useParams();

  const [program, setProgram] = useState({
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
    Website: '',
    Perk: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/program/show", {Activity_ID: id});
        console.log(res);
        setProgram({
          Activity_ID: res.data.Activity_ID,
          Name: res.data.Name,
          Description: res.data.Description,
          Fee: res.data.Fee,
          Schedule: res.data.Schedule,
          InterviewRequired: res.data.InterviewRequired,
          ApplicationRequired: res.data.ApplicationRequired,
          WeekCommitmentHour: res.data.WeekCommitmentHour,
          Faculty: res.data.Faculty_Name,
          Img_file_path: res.data.Img_file_path,
          Website: res.data.Website,
          Perk: res.data.Perk
        });
      } catch (error) {
        console.log(error);
      }
    }
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
            {editable ? 
            <a href={`/program/${id}/edit`}>
              <button className="edit-button">Edit</button>
            </a> : <></>}
        </div>
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
          <div className="social-row">
            <div className="social website">
              <img src={websiteLogo} alt="WWW Website Logo"></img>
              <a href={program.Website} target="_blank" rel="noreferrer">Website</a>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Programpage;
