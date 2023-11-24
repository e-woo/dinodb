import React, { useEffect, useState } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Eventpage = () => {
    const { id } = useParams();

    const [event, setEvent] = useState({
      Activity_ID: id,
      Name: '',
      Description: '',
      Type: '',
      Img_file_path: '',
      Location: '',
      DateTime: '',
    })

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.post("/event/show", {Activity_ID: id});
            setEvent({
              Activity_ID: res.data.Activity_ID,
              Name: res.data.Name,
              Description: res.data.Description,
              Type: res.data.Type,
              Img_file_path: res.data.Img_file_path,
              Location: res.data.Location,
              DateTime: res.data.Date_and_Time
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
        <div className="event-page">
            <div className="title-and-img">
                <div className="img-container">
                    <img src={event.Img_file_path}></img>
                </div>
                <div className="title-container">
                    <h1>{event.Name}</h1>
                    {editable ? 
                    <a href={`/event/${id}/edit`}>
                        <button className="edit-button">Edit</button>
                    </a>: <></>}
                </div>
            </div>
            <div className="desc">{event.Description}</div>
            <div className="more-info">
                <div className="info-row">
                    <div className="info">
                        <h2>Type:</h2>
                        <p>{event.Type}</p>
                    </div>
                    <div className="info">
                        <h2>Location:</h2>
                        <p>{event.Location}</p>
                    </div>
                    <div className="info">
                        <h2>Date and Time:</h2>
                        <p>{event.DateTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Eventpage;