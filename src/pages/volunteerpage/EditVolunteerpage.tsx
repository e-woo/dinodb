import React, { FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

interface CreateElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLInputElement;
  schedule: HTMLInputElement;
  perks: HTMLInputElement;
  img: HTMLInputElement;
  fee: HTMLInputElement;
  interview: HTMLInputElement;
  application: HTMLInputElement;
  weekHours: HTMLInputElement;

  location: HTMLInputElement;
}

interface CreateForm extends HTMLFormElement {
  readonly elements: CreateElements;
}

const EditVolunteerPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const accountType = currentUser?.AccountType;
  const accountUCID = currentUser?.UCID;

  const [editable, setEditable] = useState(false);

  const [volunteer, setVolunteer] = useState({
    Activity_ID: id,
    Name: "",
    Description: "",
    Fee: "",
    Schedule: "",
    InterviewRequired: "",
    ApplicationRequired: "",
    WeekCommitmentHour: "",
    Img_file_path: "",
    Location: "",
    Perk: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/volunteer/show", { Activity_ID: id });
        setVolunteer({
          Activity_ID: res.data.Activity_ID,
          Name: res.data.Name,
          Description: res.data.Description,
          Fee: res.data.Fee,
          Schedule: res.data.Schedule,
          InterviewRequired: res.data.InterviewRequired,
          ApplicationRequired: res.data.ApplicationRequired,
          WeekCommitmentHour: res.data.WeekCommitmentHour,
          Img_file_path: res.data.Img_file_path,
          Location: res.data.Location,
          Perk: res.data.Perk,
        });

        const execRes = await axios.post("/volunteer/getExecs", {
          Activity_ID: id,
        });
        console.log(execRes);
        const execUCIDs = execRes.data.map((exec: { UCID: any }) => exec.UCID);
        console.log(execUCIDs);

        if (execUCIDs.includes(accountUCID)) {
          setEditable(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: FormEvent<CreateForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const formData = {
      id: id,
      name: elements.name.value,
      description: elements.description.value,
      schedule: elements.schedule.value,
      perks: elements.perks.value,
      fee: elements.fee.value,
      img: elements.img.value,
      interview: elements.interview.value,
      application: elements.application.value,
      weekHours: elements.weekHours.value,

      location: elements.location.value,
    };

    try {
      await axios.post("/volunteer/edit", formData);
      navigate(`../volunteer/${id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      {editable ? (
        <>
          <h1 className="pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center">
            Edit Volunteering Opportunity
          </h1>
          <form onSubmit={handleSubmit} method="post">
            <div className="flex flex-col items-center gap-2 [&>span]:pt-4">
              <span>Name</span>
              <input
                type="text"
                placeholder="Name"
                id="name"
                defaultValue={volunteer.Name || ""}
                className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
                required
              />
              <span>Description</span>
              <textarea
                placeholder="Description..."
                id="description"
                rows={6}
                defaultValue={volunteer.Description || ""}
                className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-2xl px-4 py-2 text-sm resize-none"
              />
              <span>Fee</span>
              <input
                type="number"
                placeholder="Fee"
                id="fee"
                defaultValue={volunteer.Fee || ""}
                className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
              />
              <span>Weekly hour commitment</span>
              <input
                type="number"
                placeholder="Weekly hour commitment"
                id="weekHours"
                defaultValue={volunteer.WeekCommitmentHour || ""}
                className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
              />
              <span>Perks</span>
              <input
                type="text"
                placeholder="Perks"
                id="perks"
                defaultValue={volunteer.Perk || ""}
                className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
              />
              <span>Schedule</span>
              <input
                type="text"
                placeholder="Schedule"
                id="schedule"
                defaultValue={volunteer.Schedule || ""}
                className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
              />
              <span>Interview Required?</span>{" "}
              <input
                type="text"
                placeholder="Interview Required?"
                id="interview"
                defaultValue={volunteer.InterviewRequired || ""}
                className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
              />
              <span>Application Required?</span>
              <input
                type="text"
                placeholder="Application Required?"
                id="application"
                defaultValue={volunteer.ApplicationRequired || ""}
                className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
              />
              <span>Location</span>{" "}
              <input
                type="text"
                placeholder="Location"
                id="location"
                defaultValue={volunteer.Location || ""}
                className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
              />
              <span>Image link</span>{" "}
              <input
                type="text"
                placeholder="Image link"
                id="img"
                defaultValue={volunteer.Img_file_path || ""}
                className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
                required
              />
              <button
                type="submit"
                className="w-56 md:w-72 lg:w-96 border-2 border-red-500 bg-white rounded-xl py-2 justify-center text-lg font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white mt-4"
              >
                Confirm
              </button>
            </div>
          </form>
        </>
      ) : (
        <h1 className="pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center">
          You do not have permission to access this.
        </h1>
      )}
    </div>
  );
};

export default EditVolunteerPage;
