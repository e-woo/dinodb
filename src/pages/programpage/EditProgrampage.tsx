import React, { FormEvent, useContext, useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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

  website: HTMLInputElement;
}

interface CreateForm extends HTMLFormElement {
  readonly elements: CreateElements;
}

const EditProgramPage = () => {
  const { currentUser } = useContext(AuthContext);
  const accountType = currentUser?.AccountType;
  const accountUCID = currentUser?.UCID;

  const supervisorAccount = currentUser?.Supervisor_ID;
  const [editable, setEditable] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const [program, setProgram] = useState({
    Activity_ID: id,
    Name: "",
    Description: "",
    Fee: "",
    Schedule: "",
    InterviewRequired: "",
    ApplicationRequired: "",
    WeekCommitmentHour: "",
    Img_file_path: "",
    Website: "",
    Perk: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/program/show", { Activity_ID: id });
        setProgram({
          Activity_ID: res.data.Activity_ID,
          Name: res.data.Name,
          Description: res.data.Description,
          Fee: res.data.Fee,
          Schedule: res.data.Schedule,
          InterviewRequired: res.data.InterviewRequired,
          ApplicationRequired: res.data.ApplicationRequired,
          WeekCommitmentHour: res.data.WeekCommitmentHour,
          Img_file_path: res.data.Img_file_path,
          Website: res.data.Website,
          Perk: res.data.Perk,
        });

        const execRes = await axios.post("/program/getExecs", {
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
      UCID: accountUCID,
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

      website: elements.website.value,
    };

    try {
      await axios.post("/program/edit", formData);
      navigate(`../program/${id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="create">
      {editable ? (
        <>
          <h1 className="bigHeader">Edit Program</h1>
          <form onSubmit={handleSubmit} method="post">
            <div className="createBody">
              <input
                type="text"
                placeholder="Name"
                id="name"
                defaultValue={program.Name || ""}
                required
              />
              <textarea
                placeholder="Description..."
                id="description"
                rows={6}
                defaultValue={program.Description || ""}
              />
              <input
                type="number"
                placeholder="Fee"
                id="fee"
                defaultValue={program.Fee || ""}
              />
              <input
                type="number"
                placeholder="Weekly hour commitment"
                id="weekHours"
                defaultValue={program.WeekCommitmentHour || ""}
              />
              <input
                type="text"
                placeholder="Perks"
                id="perks"
                defaultValue={program.Perk || ""}
              />
              <input
                type="text"
                placeholder="Schedule"
                id="schedule"
                defaultValue={program.Schedule || ""}
              />
              <input
                type="text"
                placeholder="Interview Required?"
                id="interview"
                defaultValue={program.InterviewRequired || ""}
              />
              <input
                type="text"
                placeholder="Application Required?"
                id="application"
                defaultValue={program.ApplicationRequired || ""}
              />
              <input
                type="text"
                placeholder="Website"
                id="website"
                defaultValue={program.Website || ""}
              />
              <input
                type="text"
                placeholder="Image link"
                id="img"
                defaultValue={program.Img_file_path || ""}
                required
              />
              <button type="submit">Confirm</button>
            </div>
          </form>
        </>
      ) : (
        <h1 className="bigHeader">
          You do not have permission to access this.
        </h1>
      )}
    </div>
  );
};

export default EditProgramPage;
