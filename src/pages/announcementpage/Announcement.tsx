import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { handleImgErr } from "../../context/utils";

const Announcement = () => {
  const { title } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editable, setEditable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const supervisorAccount = currentUser?.Supervisor_ID;
  const [announcement, setAnnouncement] = useState<Announcement>({
    Activity_ID: -1,
    Title: "",
    Announcement: "",
    Author: "",
    Date: "",
    Img_file_path: "",
  });

  const accountUCID = currentUser?.UCID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/announcement/getAnnouncementExecs", {
          title: title,
          isSupervisor: supervisorAccount,
        });

        let execUCIDs;

        if (supervisorAccount) {
          execUCIDs = res.data.map(
            (exec: { Supervisor_ID: any }) => exec.Supervisor_ID
          );
        } else {
          execUCIDs = res.data.map((exec: { UCID: any }) => exec.UCID);
        }

        setEditable(execUCIDs.includes(accountUCID || supervisorAccount));

        const res2 = await axios
          .post("/announcement/getAnnouncement", { title: title })
          .catch(() => {
            return null;
          });
        if (res2 !== null && (res2.data as any[]).length > 0) {
          setAnnouncement(res2!.data[0]);
        } else {
          setAnnouncement({
            Activity_ID: -1,
            Title: "Announcement not found!",
            Announcement: "",
            Author: "",
            Date: "",
            Img_file_path: "",
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleEdit = async () => {
    const body = (document.getElementById("editBody") as HTMLTextAreaElement)
      .value;
    try {
      await axios.post("/announcement/update", {
        title: title,
        announcement: body,
      });
      window.location.reload();
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  }

  const handleDelete = async () => {
    try {
      console.log(
        await axios.post("/announcement/deleteAnnouncement", { title: title })
      );
      navigate(`../announcements`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex flex-col xl:grid xl:grid-cols-4 gap-12'>
      <div className='xl:col-span-3 flex-[5] flex flex-col gap-8 m-16 md:m-24 lg:m-32 mt-12'>
        <img
          className='max-h-[400px] w-[60%] object-cover place-self-center xl:place-self-start'
          src={announcement ? announcement.Img_file_path : ''}
        />
        <div className='flex flex-col xl:items-start items-center gap-4'>
          <div className='flex flex-row gap-4'>
            <img
              className='border-2 rounded-full h-14 border-black'
              src={announcement.Img_file_path}
            />
            <div>
              <span className='text-xl font-bold'>{announcement.Author}</span>
              <p>Posted on {announcement.Date ? new Intl.DateTimeFormat('en-CA', {
                      dateStyle: 'long',
                      timeStyle: 'short',
                      hour12: true
                    }).format(new Date(announcement.Date)) : ''}</p>
            </div>
          </div>
          {editable ?
            <>
              {isEditing ? 
              <div className='w-72 lg:w-96'>
                <textarea className='border-gray-400 border rounded-lg resize-none p-4 w-full' placeholder='Body...' id='editBody' rows={6} required/>
                <div className='flex flex-row gap-4 justify-center lg:justify-start'>
                  <button className='bg-blue-500 py-2 px-4 rounded-xl text-white hover:bg-blue-600' onClick={handleEdit}>Confirm</button>
                  <button className='bg-red-500 py-2 px-4 rounded-xl text-white hover:bg-red-600' onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </div>
              : 
              <div className='flex flex-row gap-4 justify-center lg:justify-start'>
                <button className='bg-blue-500 py-2 px-4 rounded-xl text-white hover:bg-blue-600' onClick={() => setIsEditing(true)}>Edit</button>
                <button className='bg-red-500 py-2 px-4 rounded-xl text-white hover:bg-red-600' onClick={() => handleDelete()}>Delete</button>
              </div>
              }

            </>: <></>}

        </div>

        <h1 className='text-4xl lg:text-6xl font-extrabold text-center text-[#333] xl:text-left'>{announcement.Title}</h1>
        <p className='text-justify leading-8'>{announcement.Announcement}</p>
      </div>
      <Menu />
    </div>
  );
};

export interface Announcement {
  Activity_ID: number;
  Title: string;
  Announcement: string;
  Author: string;
  Date: string;
  Img_file_path: string;
}

export default Announcement;
