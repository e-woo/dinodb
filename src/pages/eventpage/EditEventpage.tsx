import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

interface CreateElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLInputElement;
  perks: HTMLInputElement;
  fee: HTMLInputElement;

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

const EditEventPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const accountType = currentUser?.AccountType;
  const accountUCID = currentUser?.UCID;
  const supervisorAccount = currentUser?.Supervisor_ID;

  const [editable, setEditable] = useState(false);

  const [event, setEvent] = useState({
    Activity_ID: "",
    Name: id,
    Description: "",
    Type: "",
    Img_file_path: "",
    Location: "",
    DateTime: "",
    Perks: "",
    OnlineInPerson: "",
    SignUpInfo: "",
    Fee: "",
    Eligibility: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/event/show", { Activity_ID: id });

        setEvent({
          Activity_ID: res.data.Activity_ID,
          Name: res.data.Name,
          Description: res.data.Description,
          Type: res.data.Type,
          Img_file_path: res.data.Img_file_path,
          Location: res.data.Location,
          DateTime: res.data.Date_and_Time,
          Perks: res.data.Perks,
          OnlineInPerson: res.data.OnlineInPerson,
          SignUpInfo: res.data.SignUpInfo,
          Fee: res.data.Fee,
          Eligibility: res.data.Eligibility,
        });

        const idRes = await axios.post("/event/getID", { Name: id });

        const execRes = await axios.post("/event/getExecs", {
          Activity_ID: res.data.Activity_ID,
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
    const formData = {
      name: id,
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
      await axios.post("/event/edit", formData);
      navigate(`../event/${id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  return (
    <div>
      {editable ? (
        <>
          <h1 className="pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center">
            Edit Event: {event.Name}
          </h1>
          <form onSubmit={handleSubmit} method="post">
            <div className="flex flex-col items-center gap-2 [&>span]:pt-4">
              <span>Description</span>
              <textarea
                placeholder="Description..."
                id="description"
                rows={6}
                defaultValue={event.Description || ""}
                className="w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-2xl px-4 py-2 text-sm resize-none"
              />
              <span>Fee</span>
              <input
                type="number"
                placeholder="Fee"
                id="fee"
                defaultValue={event.Fee || ""}
                className={inputCSS}
              />
              <span>Perks</span>
              <input
                type="text"
                placeholder="Perks"
                id="perks"
                defaultValue={event.Perks || ""}
                className={inputCSS}
              />
              <span>Location</span>
              <input
                type="text"
                placeholder="Location"
                id="location"
                defaultValue={event.Location || ""}
                className={inputCSS}
              />
              <span>Online or In Person?</span>
              <input
                type="text"
                placeholder="Online or In Person?"
                id="onlineInPerson"
                defaultValue={event.OnlineInPerson || ""}
                className={inputCSS}
              />
              <span>Sign up info</span>
              <input
                type="text"
                placeholder="Sign up info"
                id="signUpInfo"
                defaultValue={event.SignUpInfo || ""}
                className={inputCSS}
              />
              <span>Eligibility</span>
              <input
                type="text"
                placeholder="Eligibility"
                id="eligibility"
                defaultValue={event.Eligibility || ""}
                className={inputCSS}
              />
              <span>Date and time</span>
              <input
                type="datetime-local"
                placeholder="Date and time"
                id="dateTime"
                required
                defaultValue={event.DateTime || ""}
                className={inputCSS}
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

const inputCSS =
  "w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm";

export default EditEventPage;
