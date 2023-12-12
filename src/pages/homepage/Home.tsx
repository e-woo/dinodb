import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./uofc-logo.png";
import axios from "axios";

import { AuthContext } from "../../context/authContext";
import { handleImgErr } from "../../context/utils";

const Home = () => {
  const [clubs, setClubs] = useState([]);
  const [volunteering, setVolunteering] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [events, setEvents] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const Member_UCID = currentUser?.UCID;
  const accountType = currentUser?.AccountType;

  const supervisorAccount = currentUser?.Supervisor_ID;

  useEffect(() => {
    axios
      .get("/club/get4Clubs")
      .then((res) => {
        setClubs(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .get("/volunteer/get4Volunteer")
      .then((res) => {
        setVolunteering(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .get("/program/get4Programs")
      .then((res) => {
        setPrograms(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .get("/event/get4Events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const isSupervisor = () => {
    return accountType === null || supervisorAccount != null;
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row py-24 px-16 md:gap-48 justify-center align-center bg-gradient-to-b from-red-600 via-red-500 to-red-600">
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <h1 className="text-6xl lg:text-8xl font-extrabold text-[#f5f7f8] max-w-fit mb-4">
            Welcome to
          </h1>
          <h1 className="text-6xl lg:text-8xl font-extrabold text-[#f5f7f8] max-w-fit">
            Dino DB
          </h1>
          <h3 className="text-lg text-[#f5f7f8] mb-5 mt-2">
            Embark on Your UCalgary Adventure <br></br>
            Connect with Your Future Community <br></br>
            Explore All Extracurriculars,{" "}
            <span className="text-[#ffcd00]">All in One Spot</span>
          </h3>
          <Link to={`/search`}>
            <button className="w-max py-3 px-6 rounded-3xl text-base font-bold border-4 border-red-600 bg-[#f5f7f8] text-red-500 transition-[.3s] ease-in-out hover:bg-[#ffe57b]">
              Explore Now
            </button>
          </Link>
        </div>
        <div className="h-1/2 w-auto hidden lg:block">
          <img src={logo} alt="UofC Logo" />
        </div>
      </div>
      <div className="mx-8 flex flex-col lg:flex-row lg:gap-24 items-center justify-center">
        {benefits.map((benefit) => (
          <div
            key={benefit.bKey}
            className="bg-red-500 max-w-[500px] text-[#f5f7f8] mt-10 p-7 min-h-[200px] flex flex-col align-center justify-center rounded-xl"
          >
            <h1 className="text-[2.5rem] font-black mb-5 text-center">
              {benefit.header}
            </h1>
            <p className="text-center">{benefit.body}</p>
          </div>
        ))}
      </div>
      <ClubsSlider
        header="Discover Clubs"
        desc={`
        Clubs are a great way to meet new people and pursue your passions! Clubs can be academic, social, representational, or cultural.`}
        type="club"
        posts={clubs}
      />
      <div className="bg-red-500 flex flex-col items-center justify-center text-[#f5f7f8] p-12 min-h-[400px]">
        <h1 className="text-[2.5rem] font-black mb-5 text-center">
          Apply as an Executive and Start Your Own{" "}
          <span className="text-[#ffcd00]">Club</span> Today!
        </h1>
        <p className="text-xl text-center">
          Ready to lead? Join as an executive in an existing club or ignite your
          own journey by founding a brand new one.
          <br />
          Your vision, your rules—be the trailblazer and leave a lasting impact
          on the university community.
          <br />
        </p>
        <Link to={`/register`}>
          <button className="w-max my-4 py-3 px-6 rounded-3xl text-base font-bold border-4 border-red-600 bg-[#f5f7f8] text-red-500 transition-[.3s] ease-in-out hover:bg-[#ffe57b]">
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
        posts={programs}
      />
      <div className="bg-red-500 flex flex-col items-center justify-center text-[#f5f7f8] p-12 min-h-[400px]">
        <h1 className="text-[2.5rem] font-black mb-5 text-center">
          Elevate Your Club Experience -{" "}
          <span className="text-[#ffcd00]">Join Us Today!</span>
        </h1>
        <div>
          <div className="mb-5 text-center">
            <h2 className="text-[1.8rem] font-bold text-[#f5f7f8] mb-2">
              Club Executives
            </h2>
            <ul className="flex flex-col gap-4 text-[#f5f7f8] font-medium">
              <li>Announce with impact, manage with ease.</li>
              <li>Seamless event coordination at your fingertips.</li>
              <li>Engage and inspire your team, leading by example.</li>
            </ul>
          </div>
          <div className="mb-5 text-center">
            <h2 className="text-[1.8rem] font-bold text-[#f5f7f8] mb-2">
              Club Members
            </h2>
            <ul className="flex flex-col gap-4 text-[#f5f7f8] font-medium">
              <li>Simplify your club management and tracking.</li>
              <li>Stay updated with tailored club notifications.</li>
              <li>Organize your club events and calendars effortlessly.</li>
            </ul>
          </div>
        </div>
        <Link to={`/login`}>
          <button className="w-max my-4 py-3 px-6 rounded-3xl text-base font-bold border-4 border-red-600 bg-[#f5f7f8] text-red-500 transition-[.3s] ease-in-out hover:bg-[#ffe57b]">
            Sign In Now
          </button>
        </Link>
      </div>
      <ClubsSlider
        header="Upcoming Events"
        desc="Events can also serve as recreational outlets, offering students a break from their academic routine. Join us for our next event!"
        type="event"
        posts={events}
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
  posts: Array<{
    Activity_ID: number;
    Name: string;
    Description: string;
    Img_file_path: string;
  }>;
}) => {
  if (posts.length === 0) return null;
  return (
    <div className="flex flex-col px-24 py-12 no-underline items-center">
      <div className="flex flex-col justify-center items-center w-full h-64 pb-2 text-[#333]">
        <div className="flex text-4xl font-extrabold text-center">{header}</div>
        <div className="flex text-lg text-center my-5">{desc}</div>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-16 justify-center align-center">
        {posts.map((post) => {
          const key = type === "event" ? post.Name : post.Activity_ID;
          return (
            <div
              key={key}
              className="flex-1 h-[420px] p-5 rounded-md border-red-500 border-4 overflow-hidden flex flex-col justify-between transition-[.3s] ease-in-out"
            >
              <div className="max-h-[200px] relative overflow-hidden">
                <img
                  className="w-full max-h-full object-cover"
                  src={post.Img_file_path}
                  alt={post.Name}
                  onError={handleImgErr()}
                />
              </div>
              <div className="flex-[2] flex flex-col justify-between">
                <Link to={`/${type}/${key}`}>
                  <h1 className="text-red-500 text-lg whitespace-normal overflow-hidden text-ellipsis line-clamp-1">
                    {post.Name}
                  </h1>
                </Link>
                <p className="text-sm whitespace-normal overflow-hidden text-ellipsis line-clamp-3">
                  {post.Description}
                </p>
                <Link className="link" to={`/${type}/${key}`}>
                  <button className="w-max my-4 py-3 px-6 rounded-lg text-base font-bold border-2 border-red-600 bg-[#f5f7f8] text-red-500 transition-[.3s] ease-in-out hover:bg-[#ffe57b]">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const benefits = [
  {
    bKey: 1,
    header: "Community",
    body: "Participation in activities often leads to the formation of lasting friendships, creating a support system that extends beyond the college years.",
  },
  {
    bKey: 2,
    header: "Network",
    body: "Being active provides opportunities to network with professors, professionals, and fellow students, potentially leading to internships or job opportunities.",
  },
  {
    bKey: 3,
    header: "Resume",
    body: "Active involvement on campus showcases leadership abilities on a resume, making students more attractive to potential employers.",
  },
];

export default Home;
