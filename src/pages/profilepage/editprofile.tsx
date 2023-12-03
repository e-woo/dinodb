import axios from "axios";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const EditProfile = () => {
  const [fields, setFields] = useState({
    Bio: "", // only students
    FName: "",
    LName: "",
  });
  const [id, setID] = useState();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const Member_UCID = currentUser?.UCID;
  const accountType = currentUser?.AccountType;

  const supervisorAccount = currentUser?.Supervisor_ID;

  const user = localStorage.getItem("user");
  useEffect(() => {
    async function getProfile() {
      try {
        if (!user) {
          console.log("User data not found in localStorage");
          return;
        }
        const userData = JSON.parse(user);
        const endpoint = supervisorAccount
          ? "/profile/showSup"
          : "/profile/show";
        const idField = supervisorAccount ? "Supervisor_ID" : "UCID";
        const id = userData[idField];

        const result = await axios.post(endpoint, { [idField]: id });
        setFields({
          FName: result.data.FName,
          LName: result.data.LName,
          Bio: supervisorAccount ? "" : result.data.Bio,
        });

        setID(id);
      } catch (err) {
        console.log(err);
      }
    }
    getProfile();
  }, [supervisorAccount]);

  const handleSubmit = async (e: FormEvent<CreateForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const formData = {
      id: id,
      fName: elements.fName.value,
      lName: elements.lName.value,
      bio: supervisorAccount ? null : elements.bio.value,
    };

    try {
      const endpoint = supervisorAccount ? "/student/editSup" : "/student/edit";
      await axios.post(endpoint, formData);
      navigate("../profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {" "}
      {user ? (
        <div className="create">
          <h1 className="bigHeader">Edit Profile</h1>
          <form onSubmit={handleSubmit} method="post">
            <div className="createBody">
              <div className="nameBody">
                <div className="inputSection">
                  <h4>First Name</h4>
                  <input
                    type="text"
                    placeholder="First Name"
                    id="fName"
                    defaultValue={fields.FName}
                    required
                  />
                </div>
                <div className="inputSection">
                  <h4>Last Name</h4>
                  <input
                    type="text"
                    placeholder="Last Name"
                    id="lName"
                    defaultValue={fields.LName}
                    required
                  />
                </div>
              </div>
              {!supervisorAccount ? (
                <div className="inputSection">
                  <h4>Bio</h4>
                  <textarea
                    placeholder="Bio"
                    id="bio"
                    rows={4}
                    defaultValue={fields.Bio}
                  />
                </div>
              ) : null}

              <button type="submit">Confirm</button>
            </div>
          </form>
        </div>
      ) : (
        <h1 className="bigHeader">You are not logged in!</h1>
      )}
    </>
  );
};

interface CreateElements extends HTMLFormControlsCollection {
  bio: HTMLInputElement;
  fName: HTMLInputElement;
  lName: HTMLInputElement;
}

interface CreateForm extends HTMLFormElement {
  readonly elements: CreateElements;
}

export default EditProfile;
