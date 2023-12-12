import React, { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface CreateElements extends HTMLFormControlsCollection {
  activityType: HTMLInputElement;
  name: HTMLInputElement;
  description: HTMLInputElement;
  fee: HTMLInputElement;
  perks: HTMLInputElement;

  onlineInPerson: HTMLInputElement;
  signUpInfo: HTMLInputElement;
  eligibility: HTMLInputElement;
  location: HTMLInputElement;
  dateTime: HTMLInputElement;
}

interface CreateForm extends HTMLFormElement {
  readonly elements: CreateElements;
}

const CreateEventPage = () => {
  const { id } = useParams();

  const { currentUser } = useContext(AuthContext);
  const accountType = currentUser?.AccountType;
  const accountUCID = currentUser?.UCID;

  const supervisorAccount = currentUser?.Supervisor_ID;

  const navigate = useNavigate();

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const execRes = await axios.post("/program/getExecs", {
          Activity_ID: id,
          isSupervisor: supervisorAccount,
        });

        let execUCIDs;

        if (supervisorAccount) {
          execUCIDs = execRes.data.map(
            (exec: { Supervisor_ID: any }) => exec.Supervisor_ID
          );
        } else {
          execUCIDs = execRes.data.map((exec: { UCID: any }) => exec.UCID);
        }

        if (execUCIDs.includes(accountUCID || supervisorAccount)) {
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
    let formData;

    formData = {
      id: id,
      name: elements.name.value,
      description: elements.description.value,
      perks: elements.perks.value,

      location: elements.location.value,
      onlineInPerson: elements.onlineInPerson.value,
      signUpInfo: elements.signUpInfo.value,
      fee: elements.fee.value,
      eligibility: elements.eligibility.value,
      dateTime: elements.dateTime.value,
    };
    try {
      await axios.post(`/event/create2`, formData);
      navigate(`/event/${formData.name}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  if (!editable) {
    return (
      <div className="min-h-[60vh]">
        <h1 className="pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center">
          You do not have permission to access this.
        </h1>
      </div>
    );
  } else {
    return (
      <div className="min-h-[60vh]">
        <h1 className="pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center">
          Create new Event!
        </h1>
        <form onSubmit={handleSubmit} method="post">
          <div className="flex flex-col items-center gap-2 [&>span]:pt-4">
            <span>Name</span>
            <input
              type="text"
              placeholder="Name"
              id="name"
              className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
              required
            />
            <span>Description</span>
            <textarea
              placeholder="Description..."
              id="description"
              rows={6}
              className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-2xl px-4 py-2 text-sm resize-none'
            />
            <span>Perks</span>
            <input
              type="text"
              placeholder="Perks"
              id="perks"
              className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
              required
            />
            <span>Fee</span>
            <input
              type="number"
              placeholder="Fee"
              id="fee"
              className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
            />
            <span>Location</span>
            <input
              type="text"
              placeholder="Location"
              id="location"
              className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
              required
            />
            <span>Online or In Person?</span>
            <input
              type="text"
              placeholder="Online or In Person?"
              id="onlineInPerson"
              className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
            />
            <span>Sign up info</span>
            <input
              type="text"
              placeholder="Sign up info"
              id="signUpInfo"
              className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
            />
            <span>Eligibility</span>
            <input
              type="text"
              placeholder="Eligibility"
              id="eligibility"
              className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
            />
            <span>Date and time</span>
            <input
              type="datetime-local"
              placeholder="Date and time"
              id="dateTime"
              className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm"
              required
            />
            <button
              type="submit"
              className="w-56 md:w-72 lg:w-96 border-2 border-red-500 bg-white rounded-xl py-2 justify-center text-lg font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white mt-4"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default CreateEventPage;
