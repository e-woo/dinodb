import React from "react";
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Link } from "react-router-dom";
import "./style.css";

const ReactTabs = () => {
  const posts = [
    {
      id: 53,
      title: "Board Game Club",
      desc: "The BGC aims to provide regular, weekly events for members to meet and experience the warmth and interpersonal connections fostered by board gaming. Board games offer a unique experience distinct from video games, or even tabletop games or trading card games.",
      img: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
    },
    {
      id: 123,
      title: "E-Sports Club",
      desc: "The BGC aims to provide regular, weekly event so games, or even tabletop games or trading card games.",
      img: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
    },
  ];
  const [value, setValue] = React.useState(0);
  const excurtypes = ["club", "volunteer", "programs", "events"];

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
        <ActivityList excurtype={excurtypes[value]} posts={posts} />
      </Paper>
    </div>
  );
};

const ActivityList = ({
  excurtype,
  posts,
}: {
  excurtype: string;
  posts: Array<{ id: number; title: string; desc: string; img: string }>;
}) => {
  return (
    <div className="tabSections">
      <h1>Joined {excurtype}</h1>
      <div className="tabPosts">
        {posts.map((post) => (
          <div className="gridPost" key={post.id}>
            <div className="gridImg">
              <img src={post.img} alt="" />
            </div>
            <div className="gridContent">
              <Link className="link" to={`/${excurtype}/${post.id}`}>
                <h1 className="postH1">{post.title}</h1>
              </Link>
              <p className="postP">{post.desc}</p>
              <div className="buttons">
                <Link to={`/${excurtype}/${post.id}`}>
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
          <div className="gridPost" key={post.id}>
            <div className="gridImg">
              <img src={post.img} alt="" />
            </div>
            <div className="gridContent">
              <Link className="link" to={`/${excurtype}/${post.id}`}>
                <h1 className="postH1">{post.title}</h1>
              </Link>
              <p className="postP">{post.desc}</p>
              <div className="buttons">
                <Link to={`/${excurtype}/${post.id}`}>
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
