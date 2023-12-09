import React, { FormEvent, useContext, useEffect, useState } from "react";
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
  organization: HTMLInputElement;

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

interface Tag {
  id: string;
  name: string;
}

interface Organization {
  id: string;
  name: string;
}

interface Faculty {
  name: string;
}

const CreatePage = () => {
  const { currentUser } = useContext(AuthContext);
  const accountType = currentUser?.AccountType;
  const accountUCID = currentUser?.UCID;

  const supervisorAccount = currentUser?.Supervisor_ID;

  const [id, setID] = useState();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [isImageValid, setIsImageValid] = useState(true);

  const [organization, setOrganization] = useState<string>("");
  const [activityType, setActivityType] = useState<string>("");
  const [facultyType, setFacultyType] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [allFaculties, setAllFaculties] = useState<Faculty[]>([]);
  const [allOrganizations, setAllOrganizations] = useState<Organization[]>([]);
  const [warning, setWarning] = useState<boolean>(false);

  useEffect(() => {
    const getAllTags = async () => {
      try {
        const tagRes = await axios.get('/tag/getAllTags');
        const formattedTags = tagRes.data.map((tag: any) => ({
          id: tag.Tag_ID,
          name: tag.Tag_Name,
        }));
        setAllTags(formattedTags);
      } catch (error) {
        console.error('Error getting tag data: ', error)
      }
    }

    const getAllFaculties = async () => {
      try {
        const facRes = await axios.get('/faculty/getFaculties');
        const formattedFaculties = facRes.data.map((faculty: any) => ({name: faculty.Name}))
        setAllFaculties(formattedFaculties);
      } catch (error) {
        console.error('Error getting faculties:', error);
      }
    }

    const getAllOrganizations = async () => {
      try {
        const orgRes = await axios.get('/organization/getOrganizations');
        const formattedOrgs = orgRes.data.map((organization: any) => ({
          name: organization.Org_Name,
          id: organization.Org_ID,
        }))
        setAllOrganizations(formattedOrgs);
      } catch (error) {
        console.error('Error getting organizations:', error);
      }
    }

    getAllOrganizations();
    getAllTags();
    getAllFaculties();
  }, []);

  const isValidImageUrl = (filename: string) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(filename);
  };

  const handleImageUrlChange = (event: any) => {
    const newUrl = event.target.value;
    setImageUrl(newUrl);
    setIsImageValid(isValidImageUrl(newUrl));
  };

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
        organization: elements.organization.value,

        discord: elements.discord.value,
        instagram: elements.instagram.value,
      };
    else if (activity === "program")
      formData = {
        accountID: supervisorAccount ? supervisorAccount : accountUCID,
        isSupervisor: supervisorAccount,
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
        organization: elements.organization.value,

        website: elements.website.value,
      };
    else if (activity === "event")
      formData = {
        accountID: supervisorAccount ? supervisorAccount : accountUCID,
        isSupervisor: supervisorAccount,
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
        organization: elements.organization.value,

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

    if (formData && url && tags) {
      try {
        const res = await axios.post(url + "/create", formData);

        const tagPromises = tags.map((tagID) => {
          const tagFormData = {
            Activity_ID: res.data.activityId,
            Tag_ID: tagID,
          };
          return axios.post('/tag/setTag', tagFormData);
        });

        try {
          await Promise.all(tagPromises);
        } catch (error) {
          console.error('Error submitting tags:', error);
        }

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
              onChange={handleImageUrlChange}
            />
            {!isImageValid && (
              <span>
                Please enter a valid image URL. Or it will use the default image
                instead.
              </span>
            )}
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
                <select
                  value={organization}
                  onChange={(e) => {
                    setOrganization(e.target.value);
                  }}
                  id="organization"
                >
                  <option value="" disabled>Choose an organization...</option>
                  {allOrganizations.map((organization) => 
                    <option key={organization.id} value={organization.id}>{organization.name}</option>
                  )}
                </select>
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
                <select
                  value={organization}
                  onChange={(e) => {
                    setOrganization(e.target.value);
                  }}
                  id="organization"
                >
                  <option value="" disabled>Choose an organization...</option>
                  {allOrganizations.map((organization) => 
                    <option key={organization.id} value={organization.id}>{organization.name}</option>
                  )}
                </select>
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
                <select
                  value={organization}
                  onChange={(e) => {
                    setOrganization(e.target.value);
                  }}
                  id="organization"
                >
                  <option value="" disabled>Choose an organization...</option>
                  {allOrganizations.map((organization) => 
                    <option key={organization.id} value={organization.id}>{organization.name}</option>
                  )}
                </select>
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
              required
            >
              <option value="" disabled>Choose a faculty...</option>
              {allFaculties.map((faculty) => 
                <option key={faculty.name} value={faculty.name}>{faculty.name}</option>
              )}
            </select>
            <select multiple
              value={tags}
              onChange={(e) => {
                const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
                setTags(selectedTags);
              }}
              id="tags"
              required
            >
              <option value="" disabled>Choose a tag... (Hold CTRL to select multiple)</option>
              {allTags.map((tag) => 
                    <option key={tag.id} value={tag.id}>{tag.name}</option>
              )}
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
