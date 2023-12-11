import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Volunteerpage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const accountType = currentUser?.AccountType;
  const accountUCID = currentUser?.UCID;

  const [joined, setJoined] = useState(false);
  const [editable, setEditable] = useState(false);
  const [volunteer, setVolunteer] = useState({
    Activity_ID: id,
    Name: "",
    Description: "",
    Fee: "",
    Schedule: "",
    InterviewRequired: "",
    ApplicationRequired: "",
    WeekCommitmentHour: "",
    Faculty: "",
    Img_file_path: "",
    Location: "",
    Perk: "",
  });

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this volunteering opportunity?"
      )
    ) {
      try {
        await axios.delete(`/volunteer/delete`, { data: { Activity_ID: id } });
        navigate(`../search`);
        alert("Volunteering opportunity deleted successfully");
      } catch (error) {
        console.error("Error deleting volunteering opportunity", error);
        alert("Failed to delete volunteering opportunity");
      }
    }
  };

  const handleJoin = async () => {
    try {
      await axios.post(`/volunteer/join`, {
        UCID: accountUCID,
        Activity_ID: id,
      });
      setJoined(true);
    } catch (error) {
      console.log("Error joining volunteer", error);
      alert("Failed to join volunteer");
    }
  };

  const handleLeave = async () => {
    if (window.confirm("Are you sure you want to leave this volunteer?")) {
      try {
        await axios.delete(`/volunteer/leave`, {
          data: {
            UCID: accountUCID,
            Activity_ID: id,
          },
        });
        setJoined(false);
      } catch (error) {
        console.log("Error leaving volunteer", error);
        alert("Failed to leave volunteer");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/volunteer/show", { Activity_ID: id });
        setVolunteer({
          Activity_ID: res.data.Activity_ID,
          Name: res.data.Name,
          Description: res.data.Description,
          Fee: res.data.Fee ?? "",
          Schedule: res.data.Schedule,
          InterviewRequired: res.data.InterviewRequired,
          ApplicationRequired: res.data.ApplicationRequired,
          WeekCommitmentHour: res.data.WeekCommitmentHour ?? "",
          Faculty: res.data.Faculty_Name,
          Img_file_path: res.data.Img_file_path,
          Location: res.data.Location,
          Perk: res.data.Perk,
        });

        const execRes = await axios.post("/volunteer/getExecs", {
          Activity_ID: id,
        });
        console.log(execRes);
        const execUCIDs = execRes.data.map((exec: { UCID: any }) => exec.UCID);
        console.log(execUCIDs);

        if (execUCIDs.includes(accountUCID)) {
          setEditable(true);
        }
        const memRes = await axios.post("/volunteer/getMembers", {
          Activity_ID: id,
        });
        const memUCIDs = memRes.data.map(
          (member: { Student_UCID: any }) => member.Student_UCID
        );

        if (memUCIDs.includes(accountUCID)) {
          setJoined(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  // send a request here to see if the current user should have permissions to edit the activity
  return (
    <div className='mx-12 md:mx-24 lg:mx-48 flex flex-col justify-center items-center'>
      <div className='flex flex-nowrap flex-col md:flex-row py-12 gap-12'>
        <div className='flex justify-center align-center h-32'>
          <img src={volunteer.Img_file_path} alt="Volunteer Logo" className='h-full rounded-xl object-cover'/>
        </div>
        <div className='flex justify-center items-center'>
          <h1 className='text-4xl lg:text-5xl xl:text-6xl font-bold text-center md:text-left'>{volunteer.Name}</h1>
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
            <a href={`/event/${id}/create`}>
              <button className='h-16 px-8 border-2 border-red-500 bg-white rounded-xl justify-center text-base font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white'>Create Event</button>
            </a>
            <a href={`/volunteer/${id}/edit`}>
              <button className='h-16 px-8 border-2 border-red-500 bg-white rounded-xl justify-center text-base font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white'>Edit</button>
            </a>
            <a href={`/program/${id}/announcement`}>
              <button className='h-16 px-8 border-2 border-red-500 bg-white rounded-xl justify-center text-base font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white'>
                Post Announcement
              </button>
            </a>
            <button className='h-16 px-8 border-2 border-red-500 bg-red-500 rounded-xl justify-center text-base font-semibold text-white transition-[.3s] ease-in-out hover:bg-red-500 hover:text-black' onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
      <div className='flex justify-center items-center bg-[#E1E5E6] rounded-xl p-12 w-full'>{volunteer.Description}</div>
      <div className='flex flex-col justify-center items-center p-2 w-full text-sm md:text-base lg:text-lg'>
        <div className='flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl p-8 xl:p-12 w-full border-b-2 border-[#a6a9aa] gap-2'>
          <div className='flex-1'>
            <h2 className='font-bold'>Fee:</h2>
            <p>${volunteer.Fee}</p>
          </div>
          <div className='flex-1'>
            <h2 className='font-bold'>From Faculty:</h2>
            <p>{volunteer.Faculty}</p>
          </div>
        </div>
        <div className='flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl p-8 xl:p-12 w-full border-b-2 border-[#a6a9aa] gap-2'>
          <div className='flex-1'>
            <h2 className='font-bold'>Interview Required:</h2>
            <p>{volunteer.InterviewRequired}</p>
          </div>
          <div className='flex-1'>
            <h2 className='font-bold'>Application Required:</h2>
            <p>{volunteer.ApplicationRequired}</p>
          </div>
        </div>
        <div className='flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl p-8 xl:p-12 w-full border-b-2 border-[#a6a9aa] gap-2'>
          <div className='flex-1'>
            <h2 className='font-bold'>Schedule:</h2>
            <p>{volunteer.Schedule}</p>
          </div>
          <div className='flex-1'>
            <h2 className='font-bold'>Commitment Hours per Week</h2>
            <p>{volunteer.WeekCommitmentHour}</p>
          </div>
        </div>
        <div className='flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl p-8 xl:p-12 w-full border-b-2 border-[#a6a9aa] gap-2'>
          <div className='flex-1'>
            <h2 className='font-bold'>Location:</h2>
            <p>{volunteer.Location}</p>
          </div>
          <div className='flex-1'>
            <h2 className='font-bold'>Perks:</h2>
            <p>{volunteer.Perk}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteerpage;
