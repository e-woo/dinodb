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

  const [value, setValue] = React.useState(0);
  const { currentUser } = useContext(AuthContext);
  const Member_UCID = currentUser?.UCID;
  const accountType = currentUser?.AccountType;
  const supervisorAccount = currentUser?.Supervisor_ID;

  const excurtypes = ["Clubs", "Volunteer", "Programs", "Events"];
  const type = ["club", "volunteer", "program", "event"];
  const membertypes = ["Member", "Executive"];
  const allPosts = [clubs, volunteers, programs, events];
  const allExecPosts = [execClubs, execVolunteer, execPrograms, execEvents];
  const handleDeleteClub = async (Activity_ID: number) => {
    if (window.confirm("Are you sure you want to delete this club?")) {
      try {
        console.log(Activity_ID.toString());
        await axios.delete(`/club/delete`, {
          data: { Activity_ID: Activity_ID },
        });

        navigate(`../profile`);
        alert("Club deleted successfully");
      } catch (error) {
        console.error("Error deleting club", error);
        alert("Failed to delete club");
      }
    }
    window.location.reload();
  };

  const handleLeaveClub = async (Activity_ID: number) => {
    if (window.confirm("Are you sure you want to leave this club?")) {
      try {
        await axios.delete(`/club/leave`, {
          data: {
            UCID: Member_UCID,
            Activity_ID: Activity_ID,
          },
        });
        setJoined(false);
      } catch (error) {
        console.log("Error leaving club", error);
        alert("Failed to leave club");
      }
    }
    window.location.reload();
  };

  const handleDeleteVolunteer = async (Activity_ID: number) => {
    if (window.confirm("Are you sure you want to delete this volunteer?")) {
      try {
        await axios.delete(`/volunteer/delete`, {
          data: { Activity_ID: Activity_ID },
        });
        navigate(`../search`);
        alert("Volunteer deleted successfully");
      } catch (error) {
        console.error("Error deleting volunteer", error);
        alert("Failed to delete volunteer");
      }
    }
    window.location.reload();
  };

  const handleLeaveVolunteer = async (Activity_ID: number) => {
    if (window.confirm("Are you sure you want to leave this volunteer?")) {
      try {
        await axios.delete(`/volunteer/leave`, {
          data: {
            UCID: Member_UCID,
            Activity_ID: Activity_ID,
          },
        });
        setJoined(false);
      } catch (error) {
        console.log("Error leaving volunteer", error);
        alert("Failed to leave volunteer");
      }
    }
    window.location.reload();
  };

  const handleDeleteProgram = async (Activity_ID: number) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        await axios.delete(`/program/delete`, {
          data: { Activity_ID: Activity_ID },
        });
        navigate(`../search`);
        alert("Program deleted successfully");
      } catch (error) {
        console.error("Error deleting program", error);
        alert("Failed to delete program");
      }
    }
    window.location.reload();
  };

  const handleLeaveProgram = async (Activity_ID: number) => {
    if (window.confirm("Are you sure you want to leave this program?")) {
      try {
        await axios.delete(`/program/leave`, {
          data: {
            UCID: Member_UCID,
            Activity_ID: Activity_ID,
          },
        });
        setJoined(false);
      } catch (error) {
        console.log("Error leaving program", error);
        alert("Failed to leave program");
      }
    }
    window.location.reload();
  };

  const handleDeleteEvent = async (Name: string) => {
    const res = await axios.post("/event/show", { Activity_ID: Name });
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const clubIDRes = await axios.post("/event/getClubID", {
          Name: res.data.Name,
        });

        if (clubIDRes.data) {
          console.log("lol");
          await axios.delete(`/event/delete2`, {
            data: { Name: res.data.Name },
          });
          navigate(`../search`);
          alert("Event deleted successfully");
        } else {
          console.log("lol2");
          const idRes = await axios.post("/event/getID", {
            Name: res.data.Name,
          });
          await axios.delete(`/event/delete`, {
            data: { Activity_ID: res.data.Activity_ID },
          });
          navigate(`../search`);
          alert("Event deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting event", error);
        alert("Failed to delete event");
      }
    }
    window.location.reload();
  };

  const handleLeaveEvent = async (Name: string) => {
    const res = await axios.post("/event/show", { Activity_ID: Name });
    if (window.confirm("Are you sure you want to leave this event?")) {
      try {
        await axios.delete(`/event/leave`, {
          data: {
            UCID: Member_UCID,
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
    window.location.reload();
  };

  useEffect(() => {
    axios
      .post("/club/joinedClubs", { UCID: Member_UCID })
      .then((res) => {
        setClubs(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .post("/club/execClubs", { UCID: Member_UCID })
      .then((res) => {
        setExecClubs(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .post("/volunteer/joinedVolunteer", { UCID: Member_UCID })
      .then((res) => {
        setVolunteers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .post("/volunteer/execVolunteer", { UCID: Member_UCID })
      .then((res) => {
        setExecVolunteer(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .post("/program/joinedPrograms", { UCID: Member_UCID })
      .then((res) => {
        setPrograms(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .post("/program/execPrograms", { UCID: Member_UCID })
      .then((res) => {
        setExecPrograms(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .post("/event/joinedEvents", { UCID: Member_UCID })
      .then((res) => {
        setEvents(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .post("/event/execEvents", { UCID: Member_UCID })
      .then((res) => {
        setExecEvents(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [Member_UCID]);

  return (
    <div className="activityInfo">
      <Paper className="tabContainer" square>
        <Tabs
          className="tab"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Tab label="Clubs" />
          <Tab label="Volunteer" />
          <Tab label="Programs" />
          <Tab label="Event History" />
        </Tabs>
        <ActivityList
          membertypes={membertypes[0]}
          excurtype={excurtypes[value]}
          type={type[value]}
          posts={allPosts[value]}
          handleDeleteClub={handleDeleteClub}
          handleLeaveClub={handleLeaveClub}
          handleDeleteVolunteer={handleDeleteVolunteer}
          handleLeaveVolunteer={handleLeaveVolunteer}
          handleDeleteProgram={handleDeleteProgram}
          handleLeaveProgram={handleLeaveProgram}
          handleDeleteEvent={handleDeleteEvent}
          handleLeaveEvent={handleLeaveEvent}
        />
        {accountType === "EXECUTIVE" ? (
          <ActivityList
            membertypes={membertypes[1]}
            excurtype={excurtypes[value]}
            type={type[value]}
            posts={allExecPosts[value]}
            handleDeleteClub={handleDeleteClub}
            handleLeaveClub={handleLeaveClub}
            handleDeleteVolunteer={handleDeleteVolunteer}
            handleLeaveVolunteer={handleLeaveVolunteer}
            handleDeleteProgram={handleDeleteProgram}
            handleLeaveProgram={handleLeaveProgram}
            handleDeleteEvent={handleDeleteEvent}
            handleLeaveEvent={handleLeaveEvent}
          />
        ) : null}
      </Paper>
    </div>
  );
};

const ActivityList = ({
  membertypes,
  excurtype,
  type,
  posts,
  handleDeleteClub,
  handleLeaveClub,
  handleDeleteVolunteer,
  handleLeaveVolunteer,
  handleDeleteProgram,
  handleLeaveProgram,
  handleDeleteEvent,
  handleLeaveEvent,
}: {
  membertypes: string;
  excurtype: string;
  type: string;
  posts: Array<{
    Activity_ID: number;
    Name: string;
    Description: string;
    Img_file_path: string;
  }>;
  handleDeleteClub: (Activity_ID: number) => Promise<void>;
  handleLeaveClub: (Activity_ID: number) => Promise<void>;

  handleDeleteVolunteer: (Activity_ID: number) => Promise<void>;
  handleLeaveVolunteer: (Activity_ID: number) => Promise<void>;

  handleDeleteProgram: (Activity_ID: number) => Promise<void>;
  handleLeaveProgram: (Activity_ID: number) => Promise<void>;

  handleDeleteEvent: (Name: string) => Promise<void>;
  handleLeaveEvent: (Name: string) => Promise<void>;
}) => {
  const hasNoPosts = posts.length === 0;
  const noPostsMessage =
    membertypes === "Member"
      ? `Join a ${type} to populate this list!`
      : `Become an executive for ${type} to populate this list!`;

  return (
    <div className="tabSections">
      <h1>
        {membertypes} {excurtype}
      </h1>
      {hasNoPosts ? (
        // Render this if there are no posts
        <div className="postP">{noPostsMessage}</div>
      ) : (
        <div className="tabPosts">
          {posts.map((post) => (
            <div className="gridPost" key={post.Activity_ID}>
              <div className="gridImg">
                <img src={post.Img_file_path} alt="" />
              </div>
              <div className="gridContent">
                <h1 className="postH1">{post.Name}</h1>
                <p className="postP">{post.Description}</p>
                <div className="buttons">
                  {excurtype === "Events" ? (
                    <Link to={`/${type}/${post.Name}`}>
                      <button className="postsButton createButton">View</button>
                    </Link>
                  ) : (
                    <Link to={`/${type}/${post.Activity_ID}`}>
                      <button className="postsButton createButton">View</button>
                    </Link>
                  )}

                  {excurtype === "Clubs" ? (
                    membertypes === "Executive" ? (
                      <div>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteClub(post.Activity_ID)}
                        >
                          Delete
                        </button>
                        <a href={`/${type}/${post.Activity_ID}/edit`}>
                          <button className="edit-button">Edit</button>
                        </a>
                      </div>
                    ) : membertypes === "Member" ? (
                      <button
                        className="postsButton deleteButton"
                        onClick={() => handleLeaveClub(post.Activity_ID)}
                      >
                        Leave
                      </button>
                    ) : null
                  ) : null}

                  {excurtype === "Volunteer" ? (
                    membertypes === "Executive" ? (
                      <div>
                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDeleteVolunteer(post.Activity_ID)
                          }
                        >
                          Delete
                        </button>
                        <a href={`/${type}/${post.Activity_ID}/edit`}>
                          <button className="edit-button">Edit</button>
                        </a>
                      </div>
                    ) : membertypes === "Member" ? (
                      <button
                        className="postsButton deleteButton"
                        onClick={() => handleLeaveVolunteer(post.Activity_ID)}
                      >
                        Leave
                      </button>
                    ) : null
                  ) : null}

                  {excurtype === "Programs" ? (
                    membertypes === "Executive" ? (
                      <div>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteProgram(post.Activity_ID)}
                        >
                          Delete
                        </button>
                        <a href={`/${type}/${post.Activity_ID}/edit`}>
                          <button className="edit-button">Edit</button>
                        </a>
                      </div>
                    ) : membertypes === "Member" ? (
                      <button
                        className="postsButton deleteButton"
                        onClick={() => handleLeaveProgram(post.Activity_ID)}
                      >
                        Leave
                      </button>
                    ) : null
                  ) : null}

                  {excurtype === "Events" ? (
                    membertypes === "Executive" ? (
                      <div>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteEvent(post.Name)}
                        >
                          Delete
                        </button>
                        <a href={`/${type}/${post.Name}/edit`}>
                          <button className="edit-button">Edit</button>
                        </a>
                      </div>
                    ) : membertypes === "Member" ? (
                      <button
                        className="postsButton deleteButton"
                        onClick={() => handleLeaveEvent(post.Name)}
                      >
                        Leave
                      </button>
                    ) : null
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReactTabs;
