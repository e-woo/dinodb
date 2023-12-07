import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Eventpage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const accountType = currentUser?.AccountType;
  const accountUCID = currentUser?.UCID;

  const supervisorAccount = currentUser?.Supervisor_ID;

  const [joined, setJoined] = useState(false);
  const [editable, setEditable] = useState(false);
  const [event, setEvent] = useState({
    Activity_ID: "",
    Name: id,
    Description: "",
    Type: "",
    Img_file_path: "",
    Location: "",
    DateTime: "",
    Perks: "",
    OnlineInPerson: "",
    SignUpInfo: "",
    Fee: "",
    Eligibility: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/event/show", { Activity_ID: id });

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

        const idRes = await axios.post("/event/getID", { Name: id });

        const execRes = await axios.post("/event/getExecs", {
          Activity_ID: res.data.Activity_ID,
          isSupervisor: supervisorAccount,
        });

        let execUCIDs;

        if (supervisorAccount) {
          execUCIDs = execRes.data.map(
            (exec: { Supervisor_ID: any }) => exec.Supervisor_ID
          );
        } else {
          execUCIDs = execRes.data.map((exec: { UCID: any }) => exec.UCID);
        }

        if (execUCIDs.includes(accountUCID || supervisorAccount)) {
          setEditable(true);
        }

        const memRes = await axios.post("/event/getMembers", {
          Event_Name: res.data.Name,
          Activity_ID: res.data.Activity_ID,
        });
        console.log("memres = " + memRes);
        const memUCIDs = memRes.data.map(
          (member: { Student_UCID: any }) => member.Student_UCID
        );
        console.log("ucids" + memUCIDs);

        if (memUCIDs.includes(accountUCID)) {
          setJoined(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const clubIDRes = await axios.post("/event/getClubID", { Name: id });

        if (clubIDRes.data) {
          console.log("lol");
          await axios.delete(`/event/delete2`, { data: { Name: id } });
          navigate(`../search`);
          alert("Event deleted successfully");
        } else {
          console.log("lol2");
          const idRes = await axios.post("/event/getID", { Name: id });
          await axios.delete(`/event/delete`, {
            data: {
              Activity_ID: idRes.data.Activity_ID,
              isSupervisor: supervisorAccount,
            },
          });
          navigate(`../search`);
          alert("Event deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting event", error);
        alert("Failed to delete event");
      }
    }
  };

  const handleJoin = async () => {
    try {
      const res = await axios.post("/event/show", { Activity_ID: id });

      await axios.post(`/event/join`, {
        UCID: accountUCID,
        Activity_ID: res.data.Activity_ID,
        Name: id,
        signUpInfo: res.data.signUpInfo,
      });

      setJoined(true);
    } catch (error) {
      console.log("Error joining event", error);
      alert("Failed to join event");
    }
  };

  const handleLeave = async () => {
    const res = await axios.post("/event/show", { Activity_ID: id });
    if (window.confirm("Are you sure you want to leave this event?")) {
      try {
        await axios.delete(`/event/leave`, {
          data: {
            UCID: accountUCID,
            Activity_ID: res.data.Activity_ID,
            Name: res.data.Name,
          },
        });
        setJoined(false);
      } catch (error) {
        console.log("Error leaving event", error);
        alert("Failed to leave event");
      }
    }
  };

  // send a request here to see if the current user should have permissions to edit the activity

  return (
    <div className="event-page">
      <div className="title-and-img">
        <div className="img-container">
          <img src={event.Img_file_path}></img>
        </div>
        <div className="title-container">
          <h1>{event.Name}</h1>
        </div>
      </div>
      <div className="button-row">
        {currentUser && !supervisorAccount ? (
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
