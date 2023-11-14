import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "./uofc-logo.png";

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
        <div className="text">
          <h1>
            Welcome to <br></br> Dino DB
          </h1>
          <h3>
            Embark on Your UCalgary Adventure <br></br>
            Connect with Your Future Community <br></br>
            Explore All Extracurriculars,{" "}
            <span className="gold-text">All in One Spot</span>
          </h3>
          <button className="exploreButton">Explore Now</button>
        </div>
        <div className="big-logo">
          <img src={logo} alt="UofC Logo" />
        </div>
      </div>
      <div className="benefits">
        <div className="benefitContainer">
          <h1 className="benefitH1">Community</h1>
          <p className="benefitP">
            Participation in activites often leads to the formation of lasting
            friendships, creating a support system that extends beyond the
            college years.
          </p>
        </div>
        <div className="benefitContainer">
          <h1 className="benefitH1">Network</h1>
          <p className="benefitP">
            {" "}
            Being active provides opportunities to network with professors,
            professionals, and fellow students, potentially leading to
            internships or job opportunities.
          </p>
        </div>
        <div className="benefitContainer">
          <h1 className="benefitH1">Resume</h1>{" "}
          <p className="benefitP">
            Active involvement on campus showcases leadership abilities on a
            resume, making students more attractive to potential employers.
          </p>
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
        desc="Volunteering on campus often provides students with an opportunity to earn co-curricular hours, which can enhance their academic transcript and showcase engagement."
        posts={posts}
      />
      <ClubsSlider
        header="Featured Programs"
        desc="Programs offer hands-on experiences that complement classroom learning. Beneficial for students seeking to apply theoretical knowledge in real-world situations."
        posts={posts}
      />
      <ClubsSlider
        header="Upcoming Events"
        desc="Events can also serve as recreational outlets, offering students a break from their academic routine. Join us for our next event!"
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
        <button className="postsButton" id="findButton">
          View All
        </button>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="postImg">
              <img src={post.img} alt="" />
            </div>
            <div className="postContent">
              <Link className="link" to={`/club/${post.id}`}>
                <h1 className="postH1">{post.title}</h1>
              </Link>
              <p className="postP">{post.desc}</p>
              <button className="postsButton">Learn More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
