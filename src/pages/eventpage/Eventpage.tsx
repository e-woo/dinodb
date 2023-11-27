import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Eventpage = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext)
    const accountType = currentUser?.AccountType;
    const accountUCID = currentUser?.UCID;
  
    const [editable, setEditable] = useState(false);
    const [event, setEvent] = useState({
      Activity_ID: id,
      Name: '',
      Description: '',
      Type: '',
      Img_file_path: '',
      Location: '',
      DateTime: '',
      Perks: '',
      OnlineInPerson: '',
      SignUpInfo: '',
      Fee: '',
      Eligibility: '',
    })

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this event?")) {
          try {
            await axios.delete(`/event/delete`, { data: { Activity_ID: id } });
            navigate(`../search`);
            alert("Event deleted successfully");
    
          } catch (error) {
            console.error("Error deleting event", error);
            alert("Failed to delete event");
          }
        }
      }

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
              DateTime: res.data.Date_and_Time,
              Perks: res.data.Perks,
              OnlineInPerson: res.data.OnlineInPerson,
              SignUpInfo: res.data.SignUpInfo,
              Fee: res.data.Fee,
              Eligibility: res.data.Eligibility,
            });

            const execRes = await axios.post("/event/getExecs", {Activity_ID: id});
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

    // send a request here to see if the current user should have permissions to edit the activity
    
    return (
        <div className="event-page">
            <div className="title-and-img">
                <div className="img-container">
                    <img src={event.Img_file_path}></img>
                </div>
                <div className="title-container">
                    <h1>{event.Name}</h1>
                    {editable && (
                    <>
                        <a href={`/event/${id}/edit`}>
                        <button className="edit-button">Edit</button>
                        </a>
                        <button className="delete-button" onClick={handleDelete}>
                        Delete
                        </button>
                    </>
                    )}
                </div>
            </div>
            <div className="desc">{event.Description}</div>
            <div className="more-info">
                <div className="info-row">
                    <div className="info">
                        <h2>Location:</h2>
                        <p>{event.Location}</p>
                    </div>
                    <div className="info">
                        <h2>Date and Time:</h2>
                        <p>{event.DateTime}</p>
                    </div>
                </div>
                <div className="info-row">
                    <div className="info">
                        <h2>Perks:</h2>
                        <p>{event.Perks}</p>
                    </div>
                    <div className="info">
                        <h2>Sign-Up Info:</h2>
                        <p>{event.SignUpInfo}</p>
                    </div>
                </div>
                <div className="info-row">
                    <div className="info">
                        <h2>Online or In Person:</h2>
                        <p>{event.OnlineInPerson}</p>
                    </div>
                    <div className="info">
                        <h2>Fee:</h2>
                        <p>{event.Fee}</p>
                    </div>
                </div>
                <div className="info-row">
                  <div className="info">
                      <h2>Eligibility:</h2>
                      <p>{event.Eligibility}</p>
                  </div>
                </div>
            </div>
        </div>
    );
};

export default Eventpage;