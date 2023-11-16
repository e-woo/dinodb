import React from "react";
import "./style.css";
import ReactTabs from "../../components/tabs/Tabs";
import { Link } from "react-router-dom";

const profile = () => {
  return (
    <div className="profile">
      <div className="bigHeader">My Account</div>
      <div className="profileSections">
        <div className="userInfo">
          <img
            className="userImg profileImg"
            src="https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg"
          ></img>
          <div className="profileText">
            <div className="postH1">Bob Durkin</div>
            <div className="postP">I loveeeee borad games </div>
            <div className="postP">DOB: January 1999</div>
            <div className="postP">UCID: 121832912</div>
            <div className="postP">Email: bobdurkin@ucalgary.ca</div>
            <div className="postP">Club memberships: 2</div>
            <div className="postP">Club exec to: 2</div>
            <div className="postP">make this look better later</div>
            <Link to={`/write?edit=2`}>
              <button className="postsButton editButton">Edit</button>
            </Link>
          </div>
        </div>
        <div className="activityInfo">
          <ReactTabs />
        </div>
      </div>
    </div>
  );
};

export default profile;
