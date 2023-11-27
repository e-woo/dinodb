import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EditPassword = () => {
	const [warning, setWarning] = useState(false);
    const navigate = useNavigate()

	const user = localStorage.getItem("user");
	let ucid = -1;
	if (user) {
		ucid = JSON.parse(user).UCID;
	}
	else {
		console.log("User data not found in localStorage");
	}

	const handleSubmit = async (e: FormEvent<CreateForm>) => {
		e.preventDefault();
		setWarning(false);
        const elements = e.currentTarget.elements;
		const formData = {
			ucid: ucid,
			password: elements.password.value,
			confirmPassword: elements.confirmPassword.value
		}
		if (formData.password !== formData.confirmPassword) {
			setWarning(true);
			return;
		}

		try {
			await axios.post('/student/password', formData);
			navigate('../profile');
		} catch (err) {
			console.log(err);
		}
	}

	return (<> {
			user ?
				<div className='create'> 
					<h1 className="bigHeader">Edit Password</h1>
					<form onSubmit={handleSubmit} method='post'>
						<div className='createBody'>
							<div className='inputSection'>
								<h4>New Password</h4>
								<input type='password' id='password' placeholder='New Password' required/>
							</div>
							<div className='inputSection'>
								<h4>Password</h4>
								<input type='password' id='confirmPassword' placeholder='Confirm Password'required/>
							</div>
							<button type='submit'>Confirm</button>
							{warning ? <h4 className='warning'>Passwords do not match!</h4> : <></>}
						</div>
					</form>
				</div> : <h1 className="bigHeader">You are not logged in!</h1>
			}
		</>
	)
}

interface CreateElements extends HTMLFormControlsCollection {
	password: HTMLInputElement;
	confirmPassword: HTMLInputElement;
}
	 
interface CreateForm extends HTMLFormElement {
	readonly elements: CreateElements;
}

export default EditPassword;