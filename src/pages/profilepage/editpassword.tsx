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

	return (<> {
			user ?
				<div> 
					<h1 className='pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center'>Edit Password</h1>
					<form onSubmit={handleSubmit} method='post'>
						<div className='flex flex-col items-center gap-6 md:px-[200px] lg:px-[300px]'>
							<div className='w-[47%]'>
								<h4>New Password</h4>
								<input type='password' id='password' placeholder='New Password'
								className={inputCSS} required/>
							</div>
							<div className='w-[47%]'>
								<h4>Password</h4>
								<input type='password' id='confirmPassword' placeholder='Confirm Password'
								className={inputCSS} required/>
							</div>
							<button type='submit' className='w-56 md:w-72 lg:w-96 border-2 border-red-500 bg-white rounded-xl py-2 justify-center text-lg font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white'>Confirm</button>
							{warning ? <h4 className='text-red-500'>Passwords do not match!</h4> : <></>}
						</div>
					</form>
				</div> : <h1 className='pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center'>You are not logged in!</h1>
			}
		</>
	)
}
const inputCSS = 'w-full border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm';


interface CreateElements extends HTMLFormControlsCollection {
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
}

interface CreateForm extends HTMLFormElement {
  readonly elements: CreateElements;
}

export default EditPassword;
