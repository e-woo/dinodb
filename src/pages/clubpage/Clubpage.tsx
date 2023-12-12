import React, { useContext, useEffect, useState } from "react";
import discordLogo from "./discord-logo.jpg";
import instagramLogo from "./instagram-logo.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Clubpage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const accountType = currentUser?.AccountType;
  const accountUCID = currentUser?.UCID;

  const [joined, setJoined] = useState(false);
  const [editable, setEditable] = useState(false);
  const [organization, setOrganization] = useState("");
  const [club, setClub] = useState({
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
    Discord: "",
    Instagram: "",
    Perk: "",
  });

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this club?")) {
      try {
        await axios.delete(`/club/delete`, { data: { Activity_ID: id } });
        navigate(`../search`);
        alert("Club deleted successfully");
      } catch (error) {
        console.error("Error deleting club", error);
        alert("Failed to delete club");
      }
    }
  };

  const handleJoin = async () => {
    try {
      await axios.post(`/club/join`, { UCID: accountUCID, Activity_ID: id });
      setJoined(true);
    } catch (error) {
      console.log("Error joining club", error);
      alert("Failed to join club");
    }
  };

  const handleLeave = async () => {
    if (window.confirm("Are you sure you want to leave this club?")) {
      try {
        await axios.delete(`/club/leave`, {
          data: {
            UCID: accountUCID,
            Activity_ID: id,
          },
        });
        setJoined(false);
      } catch (error) {
        console.log("Error leaving club", error);
        alert("Failed to leave club");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/club/show", { Activity_ID: id });
        setClub({
          Activity_ID: res.data.Activity_ID,
          Name: res.data.Name,
          Description: res.data.Description ?? "",
          Fee: res.data.Fee ?? "",
          Schedule: res.data.Schedule ?? "",
          InterviewRequired: res.data.InterviewRequired ?? "",
          ApplicationRequired: res.data.ApplicationRequired ?? "",
          WeekCommitmentHour: res.data.WeekCommitmentHour ?? "",
          Faculty: res.data.Faculty_Name ?? "",
          Img_file_path: res.data.Img_file_path,
          Discord: res.data.Discord ?? "",
          Instagram: res.data.Instagram ?? "",
          Perk: res.data.Perk ?? "",
        });

        const orgRes = await axios.post(`/club/getOrganization`, {
          Activity_ID: id,
        });
        setOrganization(orgRes.data.Org_Name);

        const execRes = await axios.post("/club/getExecs", { Activity_ID: id });
        const execUCIDs = execRes.data.map((exec: { UCID: any }) => exec.UCID);

        if (execUCIDs.includes(accountUCID)) {
          setEditable(true);
        }

        const memRes = await axios.post("/club/getMembers", {
          Activity_ID: id,
        });
        const memUCIDs = memRes.data.map(
          (member: { Member_UCID: any }) => member.Member_UCID
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

  return (
    <div className="mx-12 md:mx-24 lg:mx-48 flex flex-col justify-center items-center">
      <div className="flex flex-nowrap flex-col md:flex-row py-12 gap-12">
        <div className="flex justify-center align-center h-32">
          <img
            src={club.Img_file_path}
            alt="Club Logo"
            className="h-full rounded-xl object-cover"
          />
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-center md:text-left">
            {club.Name}
          </h1>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-2 py-4 justify-center items-center">
        {currentUser ? (
          joined ? (
            <button
              className="h-16 px-8 border-2 border-red-500 bg-red-500 rounded-xl justify-center text-base font-semibold text-white transition-[.3s] ease-in-out hover:bg-red-500 hover:text-black"
              onClick={handleLeave}
            >
              Leave
            </button>
          ) : (
            <button
              className="h-16 px-8 border-2 border-red-500 bg-white rounded-xl justify-center text-base font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white"
              onClick={handleJoin}
            >
              Join
            </button>
          )
        ) : null}
        {editable && (
          <>
            <a href={`/event/${id}/create`}>
              <button className="h-16 px-8 border-2 border-red-500 bg-white rounded-xl justify-center text-base font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white">
                Create
                <br /> Event
              </button>
            </a>
            <a href={`/club/${id}/edit`}>
              <button className="h-16 px-8 border-2 border-red-500 bg-white rounded-xl justify-center text-base font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white">
                Edit
              </button>
            </a>
            <a href={`/club/${id}/announcement`}>
              <button className="h-16 px-8 border-2 border-red-500 bg-white rounded-xl justify-center text-base font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white">
                Post Announcement
              </button>
            </a>
            <button
              className="h-16 px-8 border-2 border-red-500 bg-red-500 rounded-xl justify-center text-base font-semibold text-white transition-[.3s] ease-in-out hover:bg-red-500 hover:text-black"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )}
      </div>
      <div className="flex justify-center items-center bg-[#E1E5E6] rounded-xl p-12 w-full">
        {club.Description}
      </div>
      <div className="flex flex-col justify-center items-center p-2 w-full text-sm md:text-base lg:text-lg">
        <div className="flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl p-8 xl:p-12 w-full border-b-2 border-[#a6a9aa] gap-2">
          <div className="flex-1">
            <h2 className="font-bold">Fee:</h2>
            <p>${club.Fee}</p>
          </div>
          <div className="flex-1">
            <h2 className="font-bold">From Faculty:</h2>
            <p>{club.Faculty}</p>
          </div>
        </div>
        <div className="flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl p-8 xl:p-12 w-full border-b-2 border-[#a6a9aa] gap-2">
          <div className="flex-1">
            <h2 className="font-bold">Interview Required:</h2>
            <p>{club.InterviewRequired}</p>
          </div>
          <div className="flex-1">
            <h2 className="font-bold">Application Required:</h2>
            <p>{club.ApplicationRequired}</p>
          </div>
        </div>
        <div className="flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl p-8 xl:p-12 w-full border-b-2 border-[#a6a9aa] gap-2">
          <div className="flex-1">
            <h2 className="font-bold">Schedule:</h2>
            <p>{club.Schedule}</p>
          </div>
          <div className="flex-1">
            <h2 className="font-bold">Commitment Hours per Week</h2>
            <p>{club.WeekCommitmentHour}</p>
          </div>
        </div>

        <div className="flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl p-8 xl:p-12 w-full border-b-2 border-[#a6a9aa]">
          <div className="flex-1">
            <h2 className="font-bold">Perks:</h2>
            <p>{club.Perk}</p>
          </div>
          <div className="flex-1">
            <h2 className="font-bold">Invites Organization:</h2>
            <p>{organization}</p>
          </div>
        </div>

        <div className="flex flex-nowrap flex-row justify-center items-center bg-[#E1E5E6] rounded-xl w-full border-b-2 border-[#a6a9aa] h-36 p-4 gap-8">
          <a
            className="flex-1 flex flex-row flex-nowrap justify-center items-center rounded-xl h-[90%] w-[90%] bg-[#7289DA]"
            href={club.Discord}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={discordLogo}
              alt="Discord Logo"
              className="h-1/2 w-auto rounded-xl"
            />
            <p className="hidden lg:block no-underline text-white text-2xl font-bold px-3">
              Discord
            </p>
          </a>
          <a
            className="flex-1 flex flex-row flex-nowrap justify-center items-center rounded-xl h-[90%] w-[90%]"
            style={{
              background:
                "linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45, #FFDC80)",
            }}
            href={club.Instagram}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={instagramLogo}
              alt="Instagram Logo"
              className="h-1/2 w-auto rounded-xl"
            />
            <p className="hidden lg:block no-underline text-white text-2xl font-bold px-3">
              Instagram
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Clubpage;
