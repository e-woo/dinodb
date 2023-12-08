import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { Announcement } from "../../pages/announcementpage/Announcement";
import axios from "axios";

export const Menu = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Announcement[]>([]);

  useEffect(() => {
    async function getAnnouncements() {
      const res = await axios.post("/announcement/getAnnouncements");
      const p = [];
      for (let i = 0; i < 4; i++) {
        if (i >= (res.data as Announcement[]).length) break;
        p.push(res.data[i]);
      }
      setPosts(p);
    }
    getAnnouncements();
  }, []);

  const handleNavigate = (postTitle: any) => {
    navigate(`/announcement/${postTitle}`);
  };

  return (
    <div className="postsContainer">
      {/* Header of menu */}
      <h1 className="postH1">Other posts</h1>
      <div className="menuPosts">
        {/* Mapping through the posts array and rendering individual post components */}
        {posts.map((post) => (
          <div className="post" key={post.Activity_ID}>
            <div className="postImg">
              <img src={post.Img_file_path}></img>
            </div>
            <div className="postContent">
              <div className="about">
                <div className="link" onClick={() => handleNavigate(post.Title)}>
                  <h2 className="postH1">{post.Title}</h2>
                </div>
                <div className="postP">
                  <div className="announcementInfo">
                    <p className="userAuthor">{post.Author}</p>
                    <span>
                      {post.Date
                        ? new Intl.DateTimeFormat("en-CA", {
                            dateStyle: "long",
                            timeStyle: "short",
                            hour12: true,
                          }).format(new Date(post.Date))
                        : ""}
                    </span>
                  </div>
                  <p>{post.Announcement}</p>
                </div>
              </div>

              <div className="link" onClick={() => handleNavigate(post.Title)}>
                <button className="postsButton">Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
