import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.css";
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
  };

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
    <div className="announcementContainer">
      <div className="announcementContent">
        <img
          className="announcementImg"
          src={announcement ? announcement.Img_file_path : ""}
          onError={handleImgErr()}
        ></img>
        <div className="user">
          <img
            className="userImg"
            src={announcement.Img_file_path}
            onError={handleImgErr()}
          ></img>
          <div className="announcementInfo">
            <span className="userAuthor">{announcement.Author}</span>
            <p>
              Posted on{" "}
              {announcement.Date
                ? new Intl.DateTimeFormat("en-CA", {
                    dateStyle: "long",
                    timeStyle: "short",
                    hour12: true,
                  }).format(new Date(announcement.Date))
                : ""}
            </p>
          </div>
          {editable ? (
            <>
              {isEditing ? (
                <div className="editForm">
                  <textarea
                    placeholder="Body..."
                    id="editBody"
                    rows={6}
                    required
                  ></textarea>
                  <div className="editButtons">
                    <button className="confirmButton" onClick={handleEdit}>
                      Confirm
                    </button>
                    <button
                      className="cancelButton"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    className="postsButton editButton"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="postsButton deleteButton"
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </button>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </div>

        <h1 className="announcementHeader">{announcement.Title}</h1>
        <p className="announcementP">{announcement.Announcement}</p>
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
