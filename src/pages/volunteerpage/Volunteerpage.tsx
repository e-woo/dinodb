import React from "react";
import "./style.css";

const Volunteerpage = () => {
  const volunteer = 
    {
      id: 53,
      title: "SU Food Drive",
      desc: "The SU invites you to apply for our newest volunteering opportunity: Our monthly food drive. We are urgently looking for volunteers and would love to have you on our team and join the SU family!",
      fee: 0,
      schedule: "The first Saturday of Every Month",
      interview: "Yes",
      application: "Yes",
      commitHours: "4",
      faculty: "Business",
      location: "MS 255",
      img: "data:image/jpeg;base64,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",
    };

    const editable = true;
    // send a request here to see if the current user should have permissions to edit the activity
  return (
    <div className="volunteer-page">
              <div className="title-and-img">
        <div className="img-container">
          <img src={volunteer.img} alt="Club Logo"></img>
        </div>
        <div className="title-container">
          <h1>{volunteer.title}</h1>
          {editable ? 
          <a href={window.location.href + '/edit'}>
              <button className="edit-button">Edit</button>
          </a> : <></>}
        </div>
      </div>
      <div className="desc">{volunteer.desc}</div>
        <div className="more-info">
          <div className="info-row">
            <div className="info">
              <h2>Fee:</h2>
              <p>${volunteer.fee}</p>
            </div>
            <div className="info">
              <h2>From Faculty:</h2>
              <p>{volunteer.faculty}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info">
              <h2>Interview Required:</h2>
              <p>{volunteer.interview}</p>
            </div>
            <div className="info">
              <h2>Application Required:</h2>
              <p>{volunteer.application}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info">
              <h2>Schedule:</h2>
              <p>{volunteer.schedule}</p>
            </div>
            <div className="info">
              <h2>Commitment Hours per Week</h2>
              <p>{volunteer.commitHours}</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Volunteerpage;
