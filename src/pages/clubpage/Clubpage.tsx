import React from "react";
import "./style.css";
import discordLogo from './discord-logo.jpg';
import instagramLogo from './instagram-logo.png';

const Clubpage = () => {
  const post = 
    {
      id: 53,
      title: "Board Games Club",
      desc: "The BGC aims to provide regular, weekly events for members to meet and experience the warmth and interpersonal connections fostered by board gaming. Board games offer a unique experience distinct from video games, or even tabletop games or trading card games.",
      fee: 5,
      schedule: "Tuesday 6:00PM, Thursday 6:00 PM",
      interview: "No",
      application: "No",
      commitHours: "N/A",
      faculty: "Arts",
      discord: "https://discord.gg/DUxKwJSv",
      instagram: "https://www.instagram.com/ucboardgames/",
      img: "https://static.vecteezy.com/system/resources/previews/006/404/900/original/board-game-logo-free-vector.jpg",
    };
  const editable = true;
  // send a request here to see if the current user should have permissions to edit the activity

  return (
    <div className="club-page">
      <div className="title-and-img">
        <div className="img-container">
          <img src={post.img} alt="Club Logo"></img>
        </div>
        <div className="title-container">
          <h1>{post.title}</h1>
          {editable ? 
          <a href={window.location.href + '/edit'}>
            <button className="edit-button">Edit</button>
          </a> : <></>}
        </div>
      </div>
      <div className="desc">{post.desc}</div>
        <div className="more-info">
          <div className="info-row">
            <div className="info">
              <h2>Fee:</h2>
              <p>${post.fee}</p>
            </div>
            <div className="info">
              <h2>From Faculty:</h2>
              <p>{post.faculty}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info">
              <h2>Interview Required:</h2>
              <p>{post.interview}</p>
            </div>
            <div className="info">
              <h2>Application Required:</h2>
              <p>{post.application}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info">
              <h2>Schedule:</h2>
              <p>{post.schedule}</p>
            </div>
            <div className="info">
              <h2>Commitment Hours per Week</h2>
              <p>{post.commitHours}</p>
            </div>
          </div>
          <div className="social-row">
            <div className="social discord">
              <img src={discordLogo} alt="Discord Logo"></img>
              <a href={post.discord} target="_blank" rel="noreferrer">Discord</a>
            </div>
            <div className="social instagram">
              <img src={instagramLogo} alt="Instagram Logo"></img>
              <a href={post.instagram} target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Clubpage;
