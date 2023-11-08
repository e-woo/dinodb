import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Home = () => {
  const posts = [
    {
      id: 53,
      title: "Board Game Club",
      desc: "The BGC aims to provide regular, weekly events for members to meet and experience the warmth and interpersonal connections fostered by board gaming. Board games offer a unique experience distinct from video games, or even tabletop games or trading card games.",
      img: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
    },
    {
      id: 123,
      title: "Esports Club",
      desc: "The BGC aims to provide regular, weekly eventso games, or even tabletop games or trading card games.",
      img: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
    },
    {
      id: 52,
      title: "Clash of Clans Club",
      desc: "lorem",
      img: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
    },
    {
      id: 2,
      title: "Plant Club",
      desc: "The BGC aims to provide regular, weekly events for members to meet and experience the warmth and interpersonal connections fostered by board gaming. Board games offer a unique experience distinc.",
      img: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
    },
  ];
  return (
    <div className="home">
      <div className="postsTitle">
        {" "}
        Featured Clubs
        <button>Find More</button>
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={post.img} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{post.desc}</p>
                <button>Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="postsTitle">
        {" "}
        Featured Volunteering Opportunities
        <button>Find More</button>
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={post.img} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{post.desc}</p>
                <button>Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="postsTitle">
        {" "}
        Featured Programs
        <button>Find More</button>
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={post.img} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{post.desc}</p>
                <button>Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="postsTitle">
        {" "}
        Featured Events
        <button>Find More</button>
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={post.img} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{post.desc}</p>
                <button>Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
