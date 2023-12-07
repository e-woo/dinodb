import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { Announcement } from "../announcementpage/Announcement";

const Announcements = () => {
  const [posts, setPosts] = useState<Array<Announcement>>([]);
  useEffect(() => {
    async function getAnnouncements() {
      setPosts((await axios.post("/announcement/getAnnouncements")).data);
    }
    getAnnouncements();
  }, []);
  return (
    <div className="announcements">
      <div className="bigHeader"> Announcements</div>
      <div className="gridPosts">
        {posts.map((post) => (
          <div className="gridPost" key={post.Activity_ID}>
            <div className="gridImg">
              <img src={post.Img_file_path} alt="" />
            </div>
            <div className="gridContent">
              <div className="about">
                <Link className="link" to={`/announcement/${post.Title}`}>
                  <h1 className="postH1">{post.Title}</h1>
                </Link>
                <div className="announcementInfo">
                  <p className="userAuthor">{post.Author}</p>
                  <span>
                    {new Intl.DateTimeFormat("en-CA", {
                      dateStyle: "long",
                      timeStyle: "short",
                      hour12: true,
                    }).format(new Date(post.Date))}
                  </span>
                </div>
              </div>

              <div className="postP">
                <p>{post.Announcement}</p>
              </div>
              <Link className="link" to={`/announcement/${post.Title}`}>
                <button className="postsButton">Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
