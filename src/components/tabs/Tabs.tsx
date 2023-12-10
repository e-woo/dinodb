import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import { exec } from "child_process";
import { handleImgErr } from "../../context/utils";

const ReactTabs = () => {
  const navigate = useNavigate();
  const [joined, setJoined] = useState(false);

  const [clubs, setClubs] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [events, setEvents] = useState([]);

  const [execClubs, setExecClubs] = useState([]);
  const [execVolunteer, setExecVolunteer] = useState([]);
  const [execPrograms, setExecPrograms] = useState([]);
  const [execEvents, setExecEvents] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const Member_UCID = currentUser?.UCID;
  const accountType = currentUser?.AccountType;
  const supervisorAccount = currentUser?.Supervisor_ID;
  const [value, setValue] = React.useState(0);
  const [infoValue, setInfoValue] = React.useState(supervisorAccount ? 2 : 0);

  const type = ["club", "volunteer", "program", "event"];
  const membertypes = ["Member", "Executive"];
  const allPosts = [clubs, volunteers, programs, events];
  const allExecPosts = [execClubs, execVolunteer, execPrograms, execEvents];

  interface DataPayload {
    Activity_ID?: string;
    UCID?: string;
    Name?: string;
  }

  const handleButtons = async (
    Activity_ID: string,
    type: string,
    execute: string
  ) => {
    if (window.confirm(`Are you sure you want to ${execute} this ${type}?`)) {
      try {
        let dataPayload: DataPayload = {};
        let shouldDelete = true;
        if (execute === "leave") {
          dataPayload.UCID = Member_UCID;
        }

        if (type === "event") {
          const res = await axios.post("/event/show", {
            Activity_ID: Activity_ID,
          });
          dataPayload.Name = res.data.Name;
          dataPayload.Activity_ID = res.data.Activity_ID;
          const clubIDRes = await axios.post("/event/getClubID", {
            Name: res.data.Name,
          });

          if (clubIDRes.data && execute === "delete") {
            await axios.delete(`/event/delete2`, {
              data: { Name: res.data.Name },
            });
            shouldDelete = false;
          }
        } else {
          dataPayload.Activity_ID = Activity_ID;
        }

        if (shouldDelete) {
          await axios.delete(`${type}/${execute}`, { data: dataPayload });
        }

        if (execute === "leave") {
          setJoined(false);
        }
        navigate(`../profile`);
        alert(
          `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } ${execute}d successfully`
        );
      } catch (error) {
        console.error(`Error ${execute} ${type}`, error);
        alert(`Failed to ${execute} ${type}`);
      }
    }
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubJoined = axios.post("/club/joinedClubs", {
          UCID: Member_UCID,
        });
        const clubExec = axios.post("/club/execClubs", { UCID: Member_UCID });
        const volunteerJoined = axios.post("/volunteer/joinedVolunteer", {
          UCID: Member_UCID,
        });
        const volunteerExec = axios.post("/volunteer/execVolunteer", {
          UCID: Member_UCID,
        });
        const programJoined = axios.post("/program/joinedPrograms", {
          UCID: Member_UCID,
        });
        const programExec = axios.post("/program/execPrograms", {
          accountID: supervisorAccount ? supervisorAccount : Member_UCID,
          isSupervisor: supervisorAccount,
        });
        const eventJoined = axios.post("/event/joinedEvents", {
          UCID: Member_UCID,
        });
        const eventExec = axios.post("/event/execEvents", {
          accountID: supervisorAccount ? supervisorAccount : Member_UCID,
          isSupervisor: supervisorAccount,
        });

        const results = await Promise.all([
          clubJoined,
          clubExec,
          volunteerJoined,
          volunteerExec,
          programJoined,
          programExec,
          eventJoined,
          eventExec,
        ]);

        setClubs(results[0].data);
        setExecClubs(results[1].data);
        setVolunteers(results[2].data);
        setExecVolunteer(results[3].data);
        setPrograms(results[4].data);
        setExecPrograms(results[5].data);
        setEvents(results[6].data);
        setExecEvents(results[7].data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [Member_UCID, supervisorAccount]); // Added supervisorAccount as a dependency if it's used in the effect

  const isSupervisor = () => {
    return accountType === null || supervisorAccount != null;
  };

  return (
    <div className="activityInfo">
      <Paper className="tabContainer" square>
        <Tabs
          className="tab"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            setInfoValue(isSupervisor() ? newValue + 2 : newValue);
          }}
        >
          {!isSupervisor() ? <Tab label="Clubs" /> : null}
          {!isSupervisor() ? <Tab label="Volunteer" /> : null}
          <Tab label="Programs" />
          <Tab label="Event History" />
        </Tabs>
        {!isSupervisor() ? (
          <ActivityList
            membertypes={membertypes[0]}
            type={type[infoValue]}
            posts={allPosts[infoValue]}
            handleButtons={handleButtons}
          />
        ) : null}
        {accountType === "EXECUTIVE" || isSupervisor() ? (
          <ActivityList
            membertypes={membertypes[1]}
            type={type[infoValue]}
            posts={allExecPosts[infoValue]}
            handleButtons={handleButtons}
          />
        ) : null}
      </Paper>
    </div>
  );
};

const ActivityList = ({
  membertypes,
  type,
  posts,
  handleButtons,
}: {
  membertypes: string;
  type: string;
  posts: Array<{
    Activity_ID: string;
    Name: string;
    Description: string;
    Img_file_path: string;
  }>;
  handleButtons: (
    Activity_ID: string,
    type: string,
    execute: string
  ) => Promise<void>;
}) => {
  const hasNoPosts = posts.length === 0;
  const noPostsMessage =
    membertypes === "Member"
      ? `Join ${type} to populate this list!`
      : `Become an executive for ${type} to populate this list!`;
  return (
    <div className="tabSections">
      <h1>
        {membertypes} {type.charAt(0).toUpperCase() + type.slice(1)}s
      </h1>
      {hasNoPosts ? (
        <div className="postP">{noPostsMessage}</div>
      ) : (
        <div className="tabPosts">
          {posts.map((post) => {
            const key = type === "event" ? post.Name : post.Activity_ID;

            return (
              <div key={key} className="gridPost">
                <div className="gridImg">
                  <img
                    src={post.Img_file_path}
                    alt={post.Name}
                    onError={handleImgErr()}
                  />
                </div>
                <div className="postContent">
                  <Link className="link" to={`/${type}/${key}`}>
                    <h1 className="postH1">{post.Name}</h1>
                  </Link>
                  <p className="postP">{post.Description}</p>
                  <div className="buttons">
                    <Link className="link" to={`/${type}/${key}`}>
                      <button className="postsButton">View</button>
                    </Link>

                    {membertypes === "Executive" ? (
                      <div>
                        <button
                          className="delete-button"
                          onClick={() =>
                            handleButtons(
                              type === "event" ? post.Name : post.Activity_ID,
                              type,
                              "delete"
                            )
                          }
                        >
                          Delete
                        </button>
                        <a
                          href={`/${type}/${
                            type === "event" ? post.Name : post.Activity_ID
                          }/edit`}
                        >
                          <button className="edit-button">Edit</button>
                        </a>
                      </div>
                    ) : membertypes === "Member" ? (
                      <button
                        className="postsButton deleteButton"
                        onClick={() =>
                          handleButtons(
                            type === "event" ? post.Name : post.Activity_ID,
                            type,
                            "leave"
                          )
                        }
                      >
                        Leave
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default ReactTabs;
