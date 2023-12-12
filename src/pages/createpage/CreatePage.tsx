import React, { FormEvent, useContext, useEffect, useState } from "react";
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
        const tagRes = await axios.get("/tag/getAllTags");
        const formattedTags = tagRes.data.map((tag: any) => ({
          id: tag.Tag_ID,
          name: tag.Tag_Name,
        }));
        setAllTags(formattedTags);
      } catch (error) {
        console.error("Error getting tag data: ", error);
      }
    };

    const getAllFaculties = async () => {
      try {
        const facRes = await axios.get("/faculty/getFaculties");
        const formattedFaculties = facRes.data.map((faculty: any) => ({
          name: faculty.Name,
        }));
        setAllFaculties(formattedFaculties);
      } catch (error) {
        console.error("Error getting faculties:", error);
      }
    };

    const getAllOrganizations = async () => {
      try {
        const orgRes = await axios.get("/organization/getOrganizations");
        const formattedOrgs = orgRes.data.map((organization: any) => ({
          name: organization.Org_Name,
          id: organization.Org_ID,
        }));
        setAllOrganizations(formattedOrgs);
      } catch (error) {
        console.error("Error getting organizations:", error);
      }
    };

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

    const defaultImg =
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/University_of_Calgary_Logo.svg/220px-University_of_Calgary_Logo.svg.png";

    if (activity === "choose") {
      setWarning(true);
      return;
    }
    setWarning(false);

    const imgURL = isImageValid ? elements.img.value : defaultImg;

    if (activity === "club")
      formData = {
        ucid: accountUCID,
        activityType: elements.activityType.value,
        name: elements.name.value,
        description: elements.description.value,
        schedule: elements.schedule.value,
        img: imgURL,
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
        img: imgURL,
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
        img: imgURL,
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
        img: imgURL,
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
            Tag_ID: tagID.toString(),
          };
          return axios.post("/tag/setTag", tagFormData);
        });

        try {
          await Promise.all(tagPromises);
        } catch (error) {
          console.error("Error submitting tags:", error);
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
      <div className="pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center">
        <h1>You do not have permission to access this.</h1>
      </div>
    );
  } else {
    return (
      <div className="min-h-[60vh]">
        <h1 className="pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center">
          Create new Extracurricular!
        </h1>
        <form onSubmit={handleSubmit} method="post">
          <div className="flex flex-col items-center gap-2 [&>span]:pt-4">
            <select
              value={activityType}
              onChange={(e) => {
                setActivityType(e.target.value);
              }}
              className={inputCSS}
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
            <span>Name</span>
            <input
              type="text"
              placeholder="Name"
              id="name"
              className={inputCSS}
              required
            />
            <span>Description</span>
            <textarea
              placeholder="Description..."
              id="description"
              className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-2xl px-4 py-2 text-sm resize-none'
              rows={6}
            />
            <span>Perks</span>
            <input
              type="text"
              placeholder="Perks"
              id="perks"
              className={inputCSS}
              required
            />
            <span>Image Link</span>
            <input
              type="text"
              placeholder="Icon image link"
              id="img"
              onChange={handleImageUrlChange}
              className={inputCSS}
            />
            {!isImageValid && (
              <span>
                Please enter a valid image URL. Or it will use the default image
                instead.
              </span>
            )}
            {activityType === "club" ? (
              <>
                <span>Fee</span>
                <input
                  type="number"
                  placeholder="Fee"
                  id="fee"
                  className={inputCSS}
                />
                <span>Schedule</span>
                <input
                  type="text"
                  placeholder="Schedule"
                  id="schedule"
                  className={inputCSS}
                />
                <span>Interview Required?</span>
                <input
                  type="text"
                  placeholder="Interview Required?"
                  id="interview"
                  className={inputCSS}
                />
                <span>Application Required?</span>
                <input
                  type="text"
                  placeholder="Application Required?"
                  id="application"
                  className={inputCSS}
                />
                <span>Weekly hour commitment</span>
                <input
                  type="number"
                  placeholder="Weekly hour commitment"
                  id="weekHours"
                  className={inputCSS}
                />
                <span>Discord link</span>
                <input
                  type="text"
                  placeholder="Discord"
                  id="discord"
                  className={inputCSS}
                />
                <span>Instagram link</span>
                <input
                  type="text"
                  placeholder="Instagram"
                  id="instagram"
                  className={inputCSS}
                />
                <span>Organization</span>
                <select
                  value={organization}
                  onChange={(e) => {
                    setOrganization(e.target.value);
                  }}
                  id="organization"
                  className={inputCSS}
                >
                  <option value="" disabled>
                    Choose an organization...
                  </option>
                  {allOrganizations.map((organization) => (
                    <option key={organization.id} value={organization.id}>
                      {organization.name}
                    </option>
                  ))}
                </select>
              </>
            ) : activityType === "program" ? (
              <>
                <span>Fee</span>
                <input
                  type="number"
                  placeholder="Fee"
                  id="fee"
                  className={inputCSS}
                />
                <span>Schedule</span>
                <input
                  type="text"
                  placeholder="Schedule"
                  id="schedule"
                  className={inputCSS}
                />
                <span>Interview Required?</span>
                <input
                  type="text"
                  placeholder="Interview Required?"
                  id="interview"
                  className={inputCSS}
                />
                <span>Application Required?</span>
                <input
                  type="text"
                  placeholder="Application Required?"
                  id="application"
                  className={inputCSS}
                />
                <span>Weekly Hour Commitment</span>
                <input
                  type="number"
                  placeholder="Weekly hour commitment"
                  id="weekHours"
                  className={inputCSS}
                />
                <span>Website link</span>
                <input
                  type="text"
                  placeholder="Website"
                  id="website"
                  className={inputCSS}
                />
                <span>Organization</span>
                <select
                  value={organization}
                  onChange={(e) => {
                    setOrganization(e.target.value);
                  }}
                  id="organization"
                  className={inputCSS}
                >
                  <option value="" disabled>
                    Choose an organization...
                  </option>
                  {allOrganizations.map((organization) => (
                    <option key={organization.id} value={organization.id}>
                      {organization.name}
                    </option>
                  ))}
                </select>
              </>
            ) : activityType === "event" ? (
              <>
                <span>Fee</span>
                <input
                  type="number"
                  placeholder="Fee"
                  id="fee"
                  className={inputCSS}
                />
                <span>Location</span>
                <input
                  type="text"
                  placeholder="Location"
                  id="location"
                  required
                  className={inputCSS}
                />
                <span>Online or In person?</span>
                <input
                  type="text"
                  placeholder="Online or In Person?"
                  id="onlineInPerson"
                  className={inputCSS}
                />
                <span>Sign up info</span>
                <input
                  type="text"
                  placeholder="Sign up info"
                  id="signUpInfo"
                  className={inputCSS}
                />
                <span>Eligibility</span>
                <input
                  type="text"
                  placeholder="Eligibility"
                  id="eligibility"
                  className={inputCSS}
                />
                <span>Date and Time</span>
                <input
                  type="datetime-local"
                  placeholder="Date and time"
                  id="dateTime"
                  required
                  className={inputCSS}
                />
              </>
            ) : activityType === "volunteer" ? (
              <>
                <span>Fee</span>
                <input
                  type="number"
                  placeholder="Fee"
                  id="fee"
                  className={inputCSS}
                />
                <span>Schedule</span>
                <input
                  type="text"
                  placeholder="Schedule"
                  id="schedule"
                  className={inputCSS}
                />
                <span>Interview required?</span>
                <input
                  type="text"
                  placeholder="Interview Required?"
                  id="interview"
                  className={inputCSS}
                />
                <span>Appplication required?</span>
                <input
                  type="text"
                  placeholder="Application Required?"
                  id="application"
                  className={inputCSS}
                />
                <span>Weekly hour commitment</span>
                <input
                  type="number"
                  placeholder="Weekly hour commitment"
                  id="weekHours"
                  className={inputCSS}
                />
                <span>Location</span>
                <input
                  type="text"
                  placeholder="Location"
                  id="location"
                  className={inputCSS}
                />
                <span>Organization</span>
                <select
                  value={organization}
                  onChange={(e) => {
                    setOrganization(e.target.value);
                  }}
                  id="organization"
                  className={inputCSS}
                >
                  <option value="" disabled>
                    Choose an organization...
                  </option>
                  {allOrganizations.map((organization) => (
                    <option key={organization.id} value={organization.id}>
                      {organization.name}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <></>
            )}
            <span>Faculty</span>
            <select
              value={facultyType}
              onChange={(e) => {
                setFacultyType(e.target.value);
              }}
              className={inputCSS}
              id="facultyType"
              required
            >
              <option value="" disabled>
                Choose a faculty...
              </option>
              {allFaculties.map((faculty) => (
                <option key={faculty.name} value={faculty.name}>
                  {faculty.name}
                </option>
              ))}
            </select>
            <span>Tags</span>
            <select
              multiple
              value={tags}
              onChange={(e) => {
                const selectedTags = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setTags(selectedTags);
              }}
              id="tags"
              required
              className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-2xl px-4 py-2 text-sm resize-none'
            >
              <option value="" disabled>
                Choose a tag... (Hold CTRL to select multiple)
              </option>
              {allTags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <button className="w-56 md:w-72 lg:w-96 border-2 border-red-500 bg-white rounded-xl py-2 justify-center text-lg font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white mt-4">
              Create
            </button>
            {warning ? (
              <p className="text-red-500 font-semibold">
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
const inputCSS =
  "w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm";

export default CreatePage;
