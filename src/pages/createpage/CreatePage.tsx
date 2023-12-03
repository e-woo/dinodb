import React, { FormEvent, useContext, useState } from "react";
import "./style.css";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CreateElements extends HTMLFormControlsCollection {
  activityType: HTMLInputElement;
  name: HTMLInputElement;
  description: HTMLInputElement;
  schedule: HTMLInputElement;
  img: HTMLInputElement;
  interview: HTMLInputElement;
  application: HTMLInputElement;
  weekHours: HTMLInputElement;
  tags: HTMLInputElement;
  fee: HTMLInputElement;
  facultyType: HTMLInputElement;
  perks: HTMLInputElement;

  discord: HTMLInputElement;
  instagram: HTMLInputElement;
  website: HTMLInputElement;
  type: HTMLInputElement;
  onlineInPerson: HTMLInputElement;
  signUpInfo: HTMLInputElement;
  eligibility: HTMLInputElement;
  location: HTMLInputElement;
  dateTime: HTMLInputElement;
}

interface CreateForm extends HTMLFormElement {
  readonly elements: CreateElements;
}

const CreatePage = () => {
  const { currentUser } = useContext(AuthContext);
  const accountType = currentUser?.AccountType;
  const accountUCID = currentUser?.UCID;

  const supervisorAccount = currentUser?.Supervisor_ID;

  const navigate = useNavigate();

  const [activityType, setActivityType] = useState<string>("");
  const [facultyType, setFacultyType] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [warning, setWarning] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<CreateForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const activity = e.currentTarget.elements.activityType.value;
    let formData;
    let url = "";

    if (activity === "choose") {
      setWarning(true);
      return;
    }
    setWarning(false);
    if (activity === "club")
      formData = {
        ucid: accountUCID,
        activityType: elements.activityType.value,
        name: elements.name.value,
        description: elements.description.value,
        schedule: elements.schedule.value,
        img: elements.img.value,
        interview: elements.interview.value,
        application: elements.application.value,
        weekHours: elements.weekHours.value,
        tags: elements.tags.value,
        facultyType: elements.facultyType.value,
        fee: elements.fee.value,
        perks: elements.perks.value,

        discord: elements.discord.value,
        instagram: elements.instagram.value,
      };
    else if (activity === "program")
      formData = {
        ucid: accountUCID,
        activityType: elements.activityType.value,
        name: elements.name.value,
        description: elements.description.value,
        schedule: elements.schedule.value,
        img: elements.img.value,
        interview: elements.interview.value,
        application: elements.application.value,
        weekHours: elements.weekHours.value,
        tags: elements.tags.value,
        facultyType: elements.facultyType.value,
        fee: elements.fee.value,
        perks: elements.perks.value,

        website: elements.website.value,
      };
    else if (activity === "event")
      formData = {
        ucid: accountUCID,
        activityType: elements.activityType.value,
        name: elements.name.value,
        description: elements.description.value,
        img: elements.img.value,
        tags: elements.tags.value,
        facultyType: elements.facultyType.value,
        perks: elements.perks.value,

        location: elements.location.value,
        onlineInPerson: elements.onlineInPerson.value,
        signUpInfo: elements.signUpInfo.value,
        fee: elements.fee.value,
        eligibility: elements.eligibility.value,
        dateTime: elements.dateTime.value,
      };
    else
      formData = {
        ucid: accountUCID,
        activityType: elements.activityType.value,
        name: elements.name.value,
        description: elements.description.value,
        schedule: elements.schedule.value,
        img: elements.img.value,
        interview: elements.interview.value,
        application: elements.application.value,
        weekHours: elements.weekHours.value,
        tags: elements.tags.value,
        facultyType: elements.facultyType.value,
        fee: elements.fee.value,
        perks: elements.perks.value,

        location: elements.location.value,
      };

    // send formData here
    switch (activity) {
      case "club":
        url = "/club";
        break;
      case "program":
        url = "/program";
        break;
      case "event":
        url = "/event";
        break;
      case "volunteer":
        url = "/volunteer";
        break;
      default:
        console.error("Invalid activity type");
        return;
    }

    if (formData && url) {
      try {
        const res = await axios.post(url + "/create", formData);
        console.log(res.data.name);
        navigate(
          url + `/${url === "/event" ? res.data.name : res.data.activityId}`
        );
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  if (accountType !== "EXECUTIVE" && !supervisorAccount) {
    return (
      <div className="access-message">
        <h1>You do not have permission to access this.</h1>
      </div>
    );
  } else {
    return (
      <div className="create">
        <h1 className="bigHeader">Create new Extracurricular!</h1>
        <form onSubmit={handleSubmit} method="post">
          <div className="createBody">
            <select
              value={activityType}
              onChange={(e) => {
                setActivityType(e.target.value);
              }}
              className="dropdown"
              id="activityType"
            >
              <option value="choose">Choose an Extracurricular Type...</option>
              {!supervisorAccount && <option value="club">Club</option>}
              {!supervisorAccount && (
                <option value="volunteer">Volunteering</option>
              )}
              <option value="program">Program</option>
              <option value="event">Event</option>
            </select>
            <input type="text" placeholder="Name" id="name" required />
            <textarea placeholder="Description..." id="description" rows={6} />
            <input type="text" placeholder="Perks" id="perks" required />
            <input
              type="text"
              placeholder="Icon image link"
              id="img"
              required
            />
            {activityType === "club" ? (
              <>
                <input type="number" placeholder="Fee" id="fee" />
                <input type="text" placeholder="Schedule" id="schedule" />
                <input
                  type="text"
                  placeholder="Interview Required?"
                  id="interview"
                />
                <input
                  type="text"
                  placeholder="Application Required?"
                  id="application"
                />
                <input
                  type="number"
                  placeholder="Weekly hour commitment"
                  id="weekHours"
                />
                <input type="text" placeholder="Discord" id="discord" />
                <input type="text" placeholder="Instagram" id="instagram" />
              </>
            ) : activityType === "program" ? (
              <>
                <input type="number" placeholder="Fee" id="fee" />
                <input type="text" placeholder="Schedule" id="schedule" />
                <input
                  type="text"
                  placeholder="Interview Required?"
                  id="interview"
                />
                <input
                  type="text"
                  placeholder="Application Required?"
                  id="application"
                />
                <input
                  type="number"
                  placeholder="Weekly hour commitment"
                  id="weekHours"
                />
                <input type="text" placeholder="Website" id="website" />
              </>
            ) : activityType === "event" ? (
              <>
                <input type="number" placeholder="Fee" id="fee" />
                <input
                  type="text"
                  placeholder="Location"
                  id="location"
                  required
                />
                <input
                  type="text"
                  placeholder="Online or In Person?"
                  id="onlineInPerson"
                />
                <input type="text" placeholder="Sign up info" id="signUpInfo" />
                <input type="text" placeholder="Eligibility" id="eligibility" />
                <input
                  type="datetime-local"
                  placeholder="Date and time"
                  id="dateTime"
                  required
                />
              </>
            ) : activityType === "volunteer" ? (
              <>
                <input type="number" placeholder="Fee" id="fee" />
                <input type="text" placeholder="Schedule" id="schedule" />
                <input
                  type="text"
                  placeholder="Interview Required?"
                  id="interview"
                />
                <input
                  type="text"
                  placeholder="Application Required?"
                  id="application"
                />
                <input
                  type="number"
                  placeholder="Weekly hour commitment"
                  id="weekHours"
                />
                <input type="text" placeholder="Location" id="location" />
              </>
            ) : (
              <></>
            )}
            <select
              value={facultyType}
              onChange={(e) => {
                setFacultyType(e.target.value);
              }}
              className="dropdown"
              id="facultyType"
            >
              <option value="Administration">Choose a faculty...</option>
              <option value="Science">Science</option>
              <option value="Arts">Arts</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
              <option value="Administration">Administration</option>
            </select>
            <select
              value={tags}
              onChange={(e) => {
                setTags(e.target.value);
              }}
              id="tags"
              required
            >
              <option value="">Choose a tag...</option>
              <option value="000000001">Academic</option>
              <option value="000000002">Arts</option>
              <option value="000000003">Recreation</option>
              <option value="000000004">Technology</option>
              <option value="000000006">Community</option>
              <option value="000000007">STEM</option>
              <option value="000000008">Cultural</option>
              <option value="000000009">Career Development</option>
              <option value="000000012">Coding</option>
              <option value="000000013">Literacy</option>
              <option value="000000014">Music and Performing Arts</option>
              <option value="000000015">Health and Wellness</option>
              <option value="000000017">Food and Cooking</option>
              <option value="000000018">Advocacy and Social Issues</option>
              <option value="000000019">Leadership</option>
              <option value="000000020">Gaming</option>
            </select>
            <button type="submit">Create</button>
            {warning ? (
              <p className="warningText">
                Please choose an extracurricular type!
              </p>
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
    );
  }
};

export default CreatePage;
