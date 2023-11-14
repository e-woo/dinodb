import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Announcements = () => {
  const posts = [
    {
      id: 121,
      title: "Hackathon Winner Announced!",
      date: "updated on Nov 12 2023",
      author: "posted by bob for coding club",
      desc: "Hacktahon that took place over the reading week winner announced",
      img: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
    },
    {
      id: 113,
      title: "New halloween event",
      date: "updated on Nov 12 2023",
      author: "posted by bob for coding club",
      desc: "join.",
      img: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
    },
    {
      id: 452,
      title: "Clash of Clans Clan War",
      date: "updated on Nov 12 2023",
      author: "posted by bob for coding club",
      desc: "The BGC aims to provide regular, weekly events for members to meet and experience the warmth and interpersonal connections fostered by board gaming. Board games offer a unique experience distinct. The BGC aims to provide regular, weekly events for members to meet and experience the warmth and interpersonal connections fostered by board gaming. Board games offer a unique experience distinct.",
      img: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
    },
    {
      id: 1312,
      title: "Plant Club welcomes new executive",
      date: "updated on Nov 12 2023",
      author: "posted by bob for coding club",
      desc: "The BGC aims to provide regular, weekly events for members to meet and experience the warmth and interpersonal connections fostered by board gaming. Board games offer a unique experience distinct.",
      img: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
    },
  ];
  return (
    <div className="announcements">
      <div className="bigHeader"> Announcements</div>
      <div className="gridPosts">
        {posts.map((post) => (
          <div className="gridPost" key={post.id}>
            <div className="gridImg">
              <img src={post.img} alt="" />
            </div>
            <div className="gridContent">
              <div className="about">
                <Link className="link" to={`/announcement/${post.id}`}>
                  <h1 className="postH1">{post.title}</h1>
                </Link>
                <div className="announcementInfo">
                  <p>{post.author}</p>
                  <span>{post.date}</span>
                </div>
              </div>

              <div className="postP">
                <p>{post.desc}</p>
              </div>
              <button className="postsButton">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
