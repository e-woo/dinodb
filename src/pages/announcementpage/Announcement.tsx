import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import Menu from "../../components/menu/Menu";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Announcement = () => {
  const { title } = useParams();
  const [editable, setEditable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const accountUCID = currentUser?.UCID;

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/announcement/getAnnouncementExecs", { title: title });
        const execUCIDs = res.data.map((exec: { UCID: any }) => exec.UCID);
        setEditable(execUCIDs.includes(accountUCID));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleEdit = async () => {
    const body = (document.getElementById('editBody') as HTMLTextAreaElement).value;
    try {
      await axios.post("/announcement/update", { title: title, announcement: body});
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="announcementContainer">
      <div className="announcementContent">
        <img
          className="announcementImg"
          src="https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg"
        ></img>
        <div className="user">
          <img
            className="userImg"
            src="https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg"
          ></img>
          <div className="announcementInfo">
            <span className="userAuthor">bob by coding club</span>
            <p>updated november</p>
          </div>
          {editable ?
            <>
              {isEditing ? 
              <div className="editForm">
                <textarea placeholder='Body...' id='editBody' rows={6} required></textarea>
                <div className="editButtons">
                  <button className="confirmButton" onClick={handleEdit}>Confirm</button>
                  <button className="cancelButton" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </div>
              : 
              <>
                <button className="postsButton editButton" onClick={() => setIsEditing(true)}>Edit</button>
                <button className="postsButton deleteButton">Delete</button>
              </>
              }

            </>: <></>}

        </div>

        <h1 className="announcementHeader">CISSA November Newsletter</h1>
        <p className="announcementP">
          Upcoming Dates: November 6 - TD Indigenous Student Scholarship.
          November 11 - Remembrance day. November 12 - Start of Reading Week.
          November 20 - Tales From the Rez Screening from 6pm - 8pm. November 30
          - TC Energy Indigenous Student Opportunities applications close. Club
          Updates: We are very excited to announce our first in-person event
          this year, on November 20th! We are hosting a screening of the six
          part horror-comedy series, Tales From the Rez. Events: We are hosting
          a screening of Tales From The Rez on November 20th, from 6pm to 8pm.
          Find out more about the screening on our instagram. RSVP for the event
          Here. Job/Volunteer Opportunities: TC Energy Student positions in both
          Canada and the United States. Postings for engineering, business, law,
          environmental science, computer science, and other students, you can
          find the posting here. TC Energy Indigenous Student Opportunities in
          Canada, Apply by November 30 here. Cenovus Energy Student positions
          available across Canada. Postings for engineering, business, and
          communications students, find the postings here. Petronas Canada
          student opportunities available in Calgary. Postings for engineering,
          business, IT, geology, and legal students, find the postings here.
          Shell Canada New Graduate Program, find more about the program here.
          Ivey Business School Women in Asset Management internship, find out
          more information here. Scholarships: TD Indigenous Student Scholarship
          is open to Indigenous students studying a 2 year minimum program. The
          deadline to apply is November 6th, you can find the scholarship here.
          Blue cross Indigenous Peoples Scholarship is open to students entering
          their first year, and mature students. The deadline to apply is
          January 31, 2024, you can find the scholarship here.
        </p>
      </div>
      <Menu />
    </div>
  );
};

export default Announcement;
