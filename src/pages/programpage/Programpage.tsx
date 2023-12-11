import React, { useContext, useEffect, useState } from "react";
import websiteLogo from "./website-logo.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { handleImgErr } from "../../context/utils";

const Programpage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const accountType = currentUser?.AccountType;
  const accountUCID = currentUser?.UCID;
  const supervisorAccount = currentUser?.Supervisor_ID;

  const [joined, setJoined] = useState(false);
  const [editable, setEditable] = useState(false);
  const [organization, setOrganization] = useState("");
  const [program, setProgram] = useState({
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
    Website: "",
    Perk: "",
  });

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      console.log(id + "supervisor " + supervisorAccount);
      try {
        await axios.delete(`/program/delete`, {
          data: { Activity_ID: id },
        });
        navigate(`../search`);
        alert("Program deleted successfully");
      } catch (error) {
        console.error("Error deleting program", error);
        alert("Failed to delete program");
      }
    }
  };

  const handleJoin = async () => {
    try {
      await axios.post(`/program/join`, { UCID: accountUCID, Activity_ID: id });
      setJoined(true);
    } catch (error) {
      console.log("Error joining program", error);
      alert("Failed to join program");
    }
  };

  const handleLeave = async () => {
    if (window.confirm("Are you sure you want to leave this program?")) {
      try {
        await axios.delete(`/program/leave`, {
          data: {
            UCID: accountUCID,
            Activity_ID: id,
          },
        });
        setJoined(false);
      } catch (error) {
        console.log("Error leaving program", error);
        alert("Failed to leave program");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/program/show", { Activity_ID: id });
        console.log(res);
        setProgram({
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
          Website: res.data.Website,
          Perk: res.data.Perk,
        });

        const orgRes = await axios.post(`/program/getOrganization`, {
          Activity_ID: id,
        });
        setOrganization(orgRes.data.Org_Name);

        const execRes = await axios.post("/program/getExecs", {
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

        const memRes = await axios.post("/program/getMembers", {
          Activity_ID: id,
        });
        console.log(memRes);
        const memUCIDs = memRes.data.map(
          (member: { Student_UCID: any }) => member.Student_UCID
        );
        console.log(memUCIDs);

        if (memUCIDs.includes(accountUCID)) {
          setJoined(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className='mx-12 md:mx-24 lg:mx-48 flex flex-col justify-center items-center'>
      <div className='flex flex-nowrap flex-col md:flex-row py-12 gap-12'>
        <div className='flex justify-center align-center h-32'>
          <img src={program.Img_file_path} alt="Program Logo" className='h-full rounded-xl object-cover'/>
        </div>
        <div className='flex justify-center items-center'>
          <h1 className='text-4xl lg:text-5xl xl:text-6xl font-bold text-center md:text-left'>{program.Name}</h1>
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
            <a href={`/program/${id}/edit`}>
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
      <div className='flex justify-center items-center bg-[#E1E5E6] rounded-xl p-12 w-full'>{program.Description}</div>
      <div className='flex flex-col justify-center items-center p-2 w-full text-sm md:text-base lg:text-lg'>
        <div className='flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl p-8 xl:p-12 w-full border-b-2 border-[#a6a9aa] gap-2'>
          <div className='flex-1'>
            <h2 className='font-bold'>Fee:</h2>
            <p>${program.Fee}</p>
          </div>
          <div className='flex-1'>
            <h2 className='font-bold'>From Faculty:</h2>
            <p>{program.Faculty}</p>
          </div>
        </div>
        <div className='flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl p-8 xl:p-12 w-full border-b-2 border-[#a6a9aa] gap-2'>
          <div className='flex-1'>
            <h2 className='font-bold'>Interview Required:</h2>
            <p>{program.InterviewRequired}</p>
          </div>
          <div className='flex-1'>
            <h2 className='font-bold'>Application Required:</h2>
            <p>{program.ApplicationRequired}</p>
          </div>
        </div>
        <div className='flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl p-8 xl:p-12 w-full border-b-2 border-[#a6a9aa] gap-2'>
          <div className='flex-1'>
            <h2 className='font-bold'>Schedule:</h2>
            <p>{program.Schedule}</p>
          </div>
          <div className='flex-1'>
            <h2 className='font-bold'>Commitment Hours per Week</h2>
            <p>{program.WeekCommitmentHour}</p>
          </div>
        </div>
        <div className='flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl p-8 xl:p-12 w-full border-b-2 border-[#a6a9aa] gap-2'>
          <div className='flex-1'>
            <h2 className='font-bold'>Perks</h2>
            <p>{program.Perk}</p>
          </div>
        </div>
        <div className='flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl w-full border-b-2 border-[#a6a9aa] h-36 p-4 gap-8'>
            <h2>Invites Organization:</h2>
            <p>{organization}</p>
          </div>
        { program.Website !== '' ?
        <div className='flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl w-full border-b-2 border-[#a6a9aa] h-36 p-4 gap-8'>
          <a href={program.Website} target="_blank" rel="noreferrer" className='flex-1 flex flex-row flex-nowrap justify-center items-center m-[1em] rounded-xl h-[90%] w-[90%] bg-[#9393a5]'>
            <img src={websiteLogo} alt="WWW Website Logo" className='h-1/2 w-auto rounded-xl'/>
            Website
          </a>

        </div> : null
        }
      </div>
    </div>
  );
};

export default Programpage;
