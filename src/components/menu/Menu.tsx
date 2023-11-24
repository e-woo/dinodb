import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export const Menu = () => {
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
    <div className="postsContainer">
      {/* Header of menu */}
      <h1 className="postH1">Other posts by club</h1>
      <div className="menuPosts">
        {/* Mapping through the posts array and rendering individual post components */}
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="postImg">
              <img src={post.img}></img>
            </div>
            <div className="postContent">
              <div className="about">
                <Link className="link" to={`/announcement/${post.id}`}>
                  <h2 className="postH1">{post.title}</h2>
                </Link>
                <div className="postP">
                  <div className="announcementInfo">
                    <p className="userAuthor">{post.author}</p>
                    <span>{post.date}</span>
                  </div>
                  <p>{post.desc}</p>
                </div>
              </div>

              <Link className="link" to={`/announcement/${post.id}`}>
                <button className="postsButton">Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;