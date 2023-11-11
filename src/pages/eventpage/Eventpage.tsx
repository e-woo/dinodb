import React from "react";
import "./style.css";

const Eventpage = () => {
    const event = 
    {
      id: 53,
      name: "Board Games Club Meet & Greet",
      desc: "Come join us for our first meet and greet of the semester! Come to meet your fellow club mates and get a taste of what the BGC has to offer!",
      type: "Meet & Greet",
      location: "ST 140",
      dateTime: "Thursday September 21, 6:00 PM",
      img: "https://static.vecteezy.com/system/resources/previews/006/404/900/original/board-game-logo-free-vector.jpg",
    };

    return (
        <div className="event-page">
            <div className="title-and-img">
                <div className="img-container">
                    <img src={event.img}></img>
                </div>
                <div className="title-container">
                    <h1>{event.name}</h1>
                </div>
            </div>
            <div className="desc">{event.desc}</div>
            <div className="more-info">
                <div className="info-row">
                    <div className="info">
                        <h2>Type:</h2>
                        <p>{event.type}</p>
                    </div>
                    <div className="info">
                        <h2>Location:</h2>
                        <p>{event.location}</p>
                    </div>
                    <div className="info">
                        <h2>Date and Time:</h2>
                        <p>{event.dateTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Eventpage;