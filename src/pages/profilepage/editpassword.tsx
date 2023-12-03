import axios from "axios";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/authContext";

const EditPassword = () => {
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const Member_UCID = currentUser?.UCID;
  const accountType = currentUser?.AccountType;

  const supervisorAccount = currentUser?.Supervisor_ID;

  const user = localStorage.getItem("user");
  let id = -1;
  if (user) {
    const parsedUser = JSON.parse(user);
    id = parsedUser.UCID || parsedUser.Supervisor_ID;
  } else {
    console.log("User data not found in localStorage");
  }

  const handleSubmit = async (e: FormEvent<CreateForm>) => {
    e.preventDefault();
    setWarning(false);
    const elements = e.currentTarget.elements;
    const formData = {
      id: id,
      password: elements.password.value,
      confirmPassword: elements.confirmPassword.value,
    };
    if (formData.password !== formData.confirmPassword) {
      setWarning(true);
      return;
    }

    try {
      const endpoint = supervisorAccount
        ? "/student/passwordSup"
        : "/student/password";
      await axios.post(endpoint, formData);
      navigate("../profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {" "}
      {id !== -1 ? (
        <div className="create">
          <h1 className="bigHeader">Edit Password</h1>
          <form onSubmit={handleSubmit} method="post">
            <div className="createBody">
              <div className="inputSection">
                <h4>New Password</h4>
                <input
                  type="password"
                  id="password"
                  placeholder="New Password"
                  required
                />
              </div>
              <div className="inputSection">
                <h4>Password</h4>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <button type="submit">Confirm</button>
              {warning ? (
                <h4 className="warning">Passwords do not match!</h4>
              ) : (
                <></>
              )}
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
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
}

interface CreateForm extends HTMLFormElement {
  readonly elements: CreateElements;
}

export default EditPassword;
