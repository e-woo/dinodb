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

	return (<> {
			user ?
				<div> 
					<h1 className='pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center'>Edit Profile</h1>
					<form onSubmit={handleSubmit} method='post'>
						<div className='flex flex-col items-center gap-6 md:px-[200px] lg:px-[300px]'>
							<div className='flex flex-col md:flex-row justify-between gap-4'>
								<div className='md:w-[47%]'>
									<h4 className='pl-2'>First Name</h4>
									<input type='text' placeholder='First Name' id='fName' defaultValue={fields.FName} className={inputCSS} required/>
								</div>
								<div className='md:w-[47%]'>
									<h4 className='pl-2'>Last Name</h4>
									<input type='text' placeholder='Last Name' id='lName' defaultValue={fields.LName} className={inputCSS} required/>
								</div>
							</div>
							<div className='flex flex-col'>
								<h4 className='pl-2'>Bio</h4>
								<textarea placeholder='Bio' id='bio' rows={4} defaultValue={fields.Bio}
								className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-2xl px-4 py-2 text-sm resize-none'/>
							</div>
							<button type='submit' className='w-56 md:w-72 lg:w-96 border-2 border-red-500 bg-white rounded-xl py-2 justify-center text-lg font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white'>Confirm</button>
						</div>
					</form>
				</div> : <h1 className="bigHeader">You are not logged in!</h1>
			}
		</>
	)
}
const inputCSS = 'w-full border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm';

interface CreateElements extends HTMLFormControlsCollection {
  bio: HTMLInputElement;
  fName: HTMLInputElement;
  lName: HTMLInputElement;
}

interface CreateForm extends HTMLFormElement {
  readonly elements: CreateElements;
}

export default EditProfile;
