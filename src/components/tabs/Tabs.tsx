import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const ReactTabs = () => {
  const [clubs, setClubs] = useState([]);
  const [value, setValue] = React.useState(0);
  const { currentUser } = useContext(AuthContext);
  const Member_UCID = currentUser?.UCID;
  const excurtypes = ["clubs", "volunteer", "programs", "events"];

  useEffect(() => {
    axios
      .post("/club/joinedClubs", { UCID: Member_UCID })
      .then((res) => {
        setClubs(res.data);
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
        <ActivityList excurtype={excurtypes[value]} posts={clubs} />
      </Paper>
    </div>
  );
};

const ActivityList = ({
  excurtype,
  posts,
}: {
  excurtype: string;
  posts: Array<{
    Activity_ID: number;
    Name: string;
    Description: string;
    Img_file_path: string;
  }>;
}) => {
  return (
    <div className="tabSections">
      <h1>Joined {excurtype}</h1>
      <div className="tabPosts">
        {posts.map((post) => (
          <div className="gridPost" key={post.Activity_ID}>
            <div className="gridImg">
              <img src={post.Img_file_path} alt="" />
            </div>
            <div className="gridContent">
              <Link className="link" to={`/${excurtype}/${post.Activity_ID}`}>
                <h1 className="postH1">{post.Name}</h1>
              </Link>
              <p className="postP">{post.Description}</p>
              <div className="buttons">
                <Link to={`/${excurtype}/${post.Activity_ID}`}>
                  <button className="postsButton createButton">View</button>
                </Link>
                <button className="postsButton deleteButton">Leave</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h1>Hosted {excurtype}</h1>
      <div className="tabPosts">
        {posts.map((post) => (
          <div className="gridPost" key={post.Activity_ID}>
            <div className="gridImg">
              <img src={post.Img_file_path} alt="" />
            </div>
            <div className="gridContent">
              <Link className="link" to={`/${excurtype}/${post.Activity_ID}`}>
                <h1 className="postH1">{post.Name}</h1>
              </Link>
              <p className="postP">{post.Description}</p>
              <div className="buttons">
                <Link to={`/${excurtype}/${post.Activity_ID}`}>
                  <button className="postsButton createButton">View</button>
                </Link>
                <Link to={`/write?edit=2`}>
                  <button className="postsButton editButton">Edit</button>
                </Link>
                <button className="postsButton deleteButton">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReactTabs;
