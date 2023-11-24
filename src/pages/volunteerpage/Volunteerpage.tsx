import React, { useEffect, useState } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Volunteerpage = () => {
  const { id } = useParams();

  const [volunteer, setVolunteer] = useState({
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
    Location: '',
    Perk: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/volunteer/show", {Activity_ID: id});
        setVolunteer({
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
          Location: res.data.Location,
          Perk: res.data.Perk
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  const editable = true;
    // send a request here to see if the current user should have permissions to edit the activity
  return (
    <div className="volunteer-page">
              <div className="title-and-img">
        <div className="img-container">
          <img src={volunteer.Img_file_path} alt="Club Logo"></img>
        </div>
        <div className="title-container">
          <h1>{volunteer.Name}</h1>
          {editable ? 
          <a href={`/volunteer/${id}/edit`}>
          <button className="edit-button">Edit</button>
        </a> : <></>}
        </div>
      </div>
      <div className="desc">{volunteer.Description}</div>
        <div className="more-info">
          <div className="info-row">
            <div className="info">
              <h2>Fee:</h2>
              <p>${volunteer.Fee}</p>
            </div>
            <div className="info">
              <h2>From Faculty:</h2>
              <p>{volunteer.Faculty}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info">
              <h2>Interview Required:</h2>
              <p>{volunteer.InterviewRequired}</p>
            </div>
            <div className="info">
              <h2>Application Required:</h2>
              <p>{volunteer.ApplicationRequired}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info">
              <h2>Schedule:</h2>
              <p>{volunteer.Schedule}</p>
            </div>
            <div className="info">
              <h2>Commitment Hours per Week</h2>
              <p>{volunteer.WeekCommitmentHour}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info">
              <h2>Location:</h2>
              <p>{volunteer.Location}</p>
            </div>
            <div className="info">
              <h2>Perks:</h2>
              <p>{volunteer.Perk}</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Volunteerpage;