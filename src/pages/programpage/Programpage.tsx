import React from "react";
import "./style.css";
import websiteLogo from "./website-logo.png";

const Programpage = () => {
  const program = 
    {
      id: 99,
      name: "Watch Paint Dry for 10 Hours",
      desc: "In this mind bending event, you and a friend will be paired up to watch the spectacular paint dry on the wall for 10 whole hours!",
      fee: 70,
      schedule: "Tuesday 6:00PM",
      interview: "No",
      application: "No",
      commitHours: "10",
      faculty: "Science",
      website: "https://youtu.be/PLOPygVcaVE?si=9eW0z9O5PqdCZUeO://www.instagram.com/ucboardgames/",
      img: "https://static.vecteezy.com/system/resources/previews/006/404/900/original/board-game-logo-free-vector.jpg",
    };

    const editable = true;
    // send a request here to see if the current user should have permissions to edit the activity
    
  return (
    <div className="program-page">
      <div className="title-and-img">
        <div className="img-container">
          <img src={program.img} alt="Program Logo"></img>
        </div>
        <div className="title-container">
          <h1>{program.name}</h1>
            {editable ? 
            <a href={window.location.href + '/edit'}>
                <button className="edit-button">Edit</button>
            </a> : <></>}
        </div>
      </div>
      <div className="desc">{program.desc}</div>
        <div className="more-info">
          <div className="info-row">
            <div className="info">
              <h2>Fee:</h2>
              <p>${program.fee}</p>
            </div>
            <div className="info">
              <h2>From Faculty:</h2>
              <p>{program.faculty}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info">
              <h2>Interview Required:</h2>
              <p>{program.interview}</p>
            </div>
            <div className="info">
              <h2>Application Required:</h2>
              <p>{program.application}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info">
              <h2>Schedule:</h2>
              <p>{program.schedule}</p>
            </div>
            <div className="info">
              <h2>Commitment Hours per Week</h2>
              <p>{program.commitHours}</p>
            </div>
          </div>
          <div className="social-row">
            <div className="social website">
              <img src={websiteLogo} alt="WWW Website Logo"></img>
              <a href={program.website} target="_blank" rel="noreferrer">Website</a>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Programpage;
