import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "./uofc-logo.png";
import axios from "axios";

const Home = () => {
  const posts = [
    {
      Activity_ID: 53,
      Name: "Board Game Club",
      Description: "The BGC aims to provide regular, weekly events for members to meet and experience the warmth and interpersonal connections fostered by board gaming. Board games offer a unique experience distinct from video games, or even tabletop games or trading card games.",
      Img_file_path: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
    },
    {
      Activity_ID: 123,
      Name: "E-Sports Club",
      Description: "The BGC aims to provide regular, weekly event so games, or even tabletop games or trading card games.",
      Img_file_path: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
    },
    {
      Activity_ID: 52,
      Name: "Clash of Clans Club",
      Description: "lorem",
      Img_file_path: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
    },
    {
      Activity_ID: 2,
      Name: "Plant Club",
      Description: "The BGC aims to provide regular, weekly events for members to meet and experience the warmth and interpersonal connections fostered by board gaming. Board games offer a unique experience distinct.",
      Img_file_path: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
    },
  ];

  const [clubs, setClubs] = useState([]);
  const [volunteering, setVolunteering] = useState([]);

  useEffect(() => {
    axios.get('/club/get4Clubs')
      .then((res) => {
        setClubs(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });

    axios.get('/volunteer/get4Volunteer')
      .then((res) => {
        setVolunteering(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

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
          <Link className="link" to={`/search`}>
            <button className="exploreButton">Explore Now</button>
          </Link>
        </div>
        <div className="big-logo">
          <img src={logo} alt="UofC Logo" />
        </div>
      </div>
      <div className="benefits">
        <div className="benefitContainer">
          <h1 className="benefitH1">Community</h1>
          <p className="benefitP">
            Participation in activities often leads to the formation of lasting
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
        type="club"
        posts={clubs}
      />
      <div className="createClub">
        <h1 className="benefitH1">
          Apply as an Executive and Start Your Own{" "}
          <span className="gold-text">Club</span> Today!
        </h1>
        <p className="centerP">
          Ready to lead? Join as an executive in an existing club or ignite your
          own journey by founding a brand new one.
          <br></br>Your vision, your rules—be the trailblazer and leave a
          lasting impact on the university community.
          <br></br>
        </p>
        <Link className="link" to={`/register`}>
          <button className="postsButton findButton">
            Your leadership story begins here!
          </button>
        </Link>
      </div>
      <ClubsSlider
        header="Volunteer on Campus"
        desc="Volunteering on campus often provides students with an opportunity to earn co-curricular hours, which can enhance their academic transcript and showcase engagement."
        type="volunteer"
        posts={volunteering}
      />
      <ClubsSlider
        header="Featured Programs"
        desc="Programs offer hands-on experiences that complement classroom learning. Beneficial for students seeking to apply theoretical knowledge in real-world situations."
        type="program"
        posts={posts}
      />
      <div className="createClub">
        <h1 className="benefitH1">
          Elevate Your Club Experience -{" "}
          <span className="gold-text">Join Us Today!</span>
        </h1>
        <div className="benefitsList">
          <div className="benefitSection">
            <h2 className="benefitTitle">Club Executives</h2>
            <ul className="benefitItems">
              <li>Announce with impact, manage with ease.</li>
              <li>Seamless event coordination at your fingertips.</li>
              <li>Engage and inspire your team, leading by example.</li>
            </ul>
          </div>
          <div className="benefitSection">
            <h2 className="benefitTitle">Club Members</h2>
            <ul className="benefitItems">
              <li>Simplify your club management and tracking.</li>
              <li>Stay updated with tailored club notifications.</li>
              <li>Organize your club events and calendars effortlessly.</li>
            </ul>
          </div>
        </div>
        <Link className="link" to={`/login`}>
          <button className="postsButton findButton">Sign In Now</button>
        </Link>
      </div>
      <ClubsSlider
        header="Upcoming Events"
        desc="Events can also serve as recreational outlets, offering students a break from their academic routine. Join us for our next event!"
        type="event"
        posts={posts}
      />
    </div>
  );
};

const ClubsSlider = ({
  header,
  desc,
  type,
  posts,
}: {
  header: string;
  desc: string;
  type: string;
  posts: Array<{ Activity_ID: number; Name: string; Description: string; Img_file_path: string }>;
}) => {
  return (
    <div className="postsContainer">
      <div className="postTop">
        <div className="postsHeader"> {header}</div>
        <div className="postsDesc">{desc}</div>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.Activity_ID}>
            <div className="postImg">
              <img src={post.Img_file_path} alt="" />
            </div>
            <div className="postContent">
              <Link className="link" to={`/${type}/${post.Activity_ID}`}>
                <h1 className="postH1">{post.Name}</h1>
              </Link>
              <p className="postP">{post.Description}</p>
              <Link className="link" to={`/${type}/${post.Activity_ID}`}>
                <button className="postsButton">Learn More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
