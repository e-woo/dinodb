import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
	const [fields, setFields] = useState({
		Bio: '',
		FName: '',
		LName: '',
	})
	const [ucid, setUCID] = useState();
    const navigate = useNavigate()

	const user = localStorage.getItem("user");
	useEffect(() => {
		async function getProfile() {
			try {
				const userStr = localStorage.getItem("user");
				if (!userStr) {
					console.log("User data not found in localStorage");
					return;
				}
				const id = JSON.parse(userStr).UCID;
				const result = await axios.post("/profile/show", {UCID: id})
				setFields({
					Bio: result.data.Bio,
					FName: result.data.FName,
					LName: result.data.LName,
				})
				setUCID(id);
			} catch (err) {
				console.log(err)
			}
		}
		getProfile();
	}, []);

	const handleSubmit = async (e: FormEvent<CreateForm>) => {
		e.preventDefault();
        const elements = e.currentTarget.elements;
		const formData = {
			ucid: ucid,
			bio: elements.bio.value,
			fName: elements.fName.value,
			lName: elements.lName.value
		}
		console.log(formData);
		try {
			await axios.post('/student/edit', formData);
			navigate('../profile');
		} catch (err) {
			console.log(err);
		}
	}

	return (<> {
			user ?
				<div className='create'> 
					<h1 className="bigHeader">Edit Profile</h1>
					<form onSubmit={handleSubmit} method='post'>
						<div className='createBody'>
							<div className='nameBody'>
								<div className='inputSection'>
									<h4>First Name</h4>
									<input type='text' placeholder='First Name' id='fName' defaultValue={fields.FName} required/>
								</div>
								<div className='inputSection'>
									<h4>Last Name</h4>
									<input type='text' placeholder='Last Name' id='lName' defaultValue={fields.LName} required/>
								</div>
							</div>
							<div className='inputSection'>
								<h4>Bio</h4>
								<textarea placeholder='Bio' id='bio' rows={4} defaultValue={fields.Bio}/>
							</div>
							<button type='submit'>Confirm</button>
						</div>
					</form>
				</div> : <h1 className="bigHeader">You are not logged in!</h1>
			}
		</>
	)
}

interface CreateElements extends HTMLFormControlsCollection   {
	bio: HTMLInputElement;
	fName: HTMLInputElement;
	lName: HTMLInputElement;
}
	 
interface CreateForm extends HTMLFormElement {
	readonly elements: CreateElements;
}

export default EditProfile;