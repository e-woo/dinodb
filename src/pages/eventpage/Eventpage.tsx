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

  const [joined, setJoined] = useState(false);
  const [editable, setEditable] = useState(false);
  const [event, setEvent] = useState({
    Activity_ID: id,
    Name: "",
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
          Activity_ID: idRes.data.Activity_ID,
        });
        const execUCIDs = execRes.data.map((exec: { UCID: any }) => exec.UCID);

        if (execUCIDs.includes(accountUCID)) {
          setEditable(true);
        }

        const memRes = await axios.post("/event/getMembers", {
          Event_Name: res.data.Name,
          Activity_ID: id,
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
            data: { Activity_ID: idRes.data.Activity_ID },
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
        Activity_ID: id,
        Name: res.data.Name,
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
            Activity_ID: id,
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
    <div className='mx-12 md:mx-24 lg:mx-48 flex flex-col justify-center items-center'>
      <div className='flex flex-nowrap flex-col md:flex-row py-12 gap-12'>
        <div className='flex justify-center align-center h-32'>
          <img src={event.Img_file_path} className='h-full rounded-xl object-cover'/>
        </div>
        <div className='flex justify-center items-center'>
          <h1 className='text-4xl lg:text-5xl xl:text-6xl font-bold text-center md:text-left'>{event.Name}</h1>
        </div>
      </div>
      <div className='flex flex-row flex-wrap gap-2 py-4 justify-center items-center'>
      {currentUser ? (
            joined ? (
              <button className='h-16 px-8 border-2 border-red-500 bg-red-500 rounded-xl justify-center text-base font-semibold text-white transition-[.3s] ease-in-out hover:bg-red-500 hover:text-black' onClick={handleLeave}>
                Leave
              </button>
            ) : (
              <button className='h-16 px-8 border-2 border-red-500 bg-white rounded-xl justify-center text-base font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white' onClick={handleJoin}>
                Join
              </button>
            )
          ) : null}
          {editable && (
            <>
              <a href={`/event/${id}/edit`}>
                <button className='h-16 px-8 border-2 border-red-500 bg-white rounded-xl justify-center text-base font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white'>
                  Edit
                </button>
              </a>
              <button className='h-16 px-8 border-2 border-red-500 bg-red-500 rounded-xl justify-center text-base font-semibold text-white transition-[.3s] ease-in-out hover:bg-red-500 hover:text-black' onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
      </div>
      <div className='flex justify-center items-center bg-[#E1E5E6] rounded-xl p-12 w-full'>{event.Description}</div>
      <div className='flex flex-col justify-center items-center p-2 w-full text-sm md:text-base lg:text-lg'>
        <div className='flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl p-8 xl:p-12 w-full border-b-2 border-[#a6a9aa] gap-2'>
          <div className='flex-1'>
            <h2 className='font-bold'>Location:</h2>
            <p>{event.Location}</p>
          </div>
          <div className='flex-1'>
            <h2 className='font-bold'>Date and Time:</h2>
            <p>{event.DateTime}</p>
          </div>
        </div>
        <div className='flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl p-8 xl:p-12 w-full border-b-2 border-[#a6a9aa] gap-2'>
          <div className='flex-1'>
            <h2 className='font-bold'>Perks:</h2>
            <p>{event.Perks}</p>
          </div>
          <div className='flex-1'>
            <h2 className='font-bold'>Sign-Up Info:</h2>
            <p>{event.SignUpInfo}</p>
          </div>
        </div>
        <div className='flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl p-8 xl:p-12 w-full border-b-2 border-[#a6a9aa] gap-2'>
          <div className='flex-1'>
            <h2 className='font-bold'>Online or In Person:</h2>
            <p>{event.OnlineInPerson}</p>
          </div>
          <div className='flex-1'>
            <h2 className='font-bold'>Fee:</h2>
            <p>{event.Fee}</p>
          </div>
        </div>
        <div className='flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl p-8 xl:p-12 w-full border-b-2 border-[#a6a9aa] gap-2'>
          <div className='flex-1'>
            <h2 className='font-bold'>Eligibility:</h2>
            <p>{event.Eligibility}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventpage;
