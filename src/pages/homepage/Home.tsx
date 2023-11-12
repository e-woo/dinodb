import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import logo from './uofc-logo.png';

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
      title: "E-Sports Club",
      desc: "The BGC aims to provide regular, weekly event so games, or even tabletop games or trading card games.",
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
      desc: "The BGC aims to provide regular, weekly events for members to meet and experience the warmth and interpersonal connections fostered by board gaming. Board games offer a unique experience distinct.",
      img: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
    },
  ];
  return (
    <div className="home">
      <div className="landing-page">
        <div className="text-and-img">
          <div className = "side-by-side">
            <div className="title">
            <h1>Welcome to Dino DB</h1>
            <h3>Embark on Your UCalgary Adventure</h3>
            <h3>Connect with Your Future Community</h3>
            <h3>Explore All Extracurriculars, <span className="gold-text">All in One Spot</span></h3>
            </div>
            <div className="big-logo">
              <img src={logo} alt="UofC Logo" />
            </div>
          </div>
        </div>
      </div>
      <ClubsSlider
        header="Discover Clubs"
        desc={`
        Clubs are a great way to meet new people and pursue your passions! Clubs can be academic, social, representational, or cultural.`}
        posts={posts}
      />
      <ClubsSlider
        header="Volunteer on Campus"
        desc="Volunteer opportunities to earn co-curricular hours"
        posts={posts}
      />
      <ClubsSlider
        header="Featured Programs"
        desc="Participate in programs and learn new stuff"
        posts={posts}
      />
      <ClubsSlider
        header="Upcoming Events"
        desc="Join us in upcoming events soon"
        posts={posts}
      />
    </div>
  );
};

const ClubsSlider = ({
  header,
  desc,
  posts,
}: {
  header: string;
  desc: string;
  posts: Array<{ id: number; title: string; desc: string; img: string }>;
}) => {
  return (
    <div className="postsContainer">
      <div className="postTop">
        <div className="postsHeader"> {header}</div>
        <div className="postsDesc">{desc}</div>
        <button id="findButton">Find More</button>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/club/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{post.desc}</p>
              <button id="learnButton">Learn More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;