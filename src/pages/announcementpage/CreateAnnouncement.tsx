import axios from 'axios';
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../context/authContext";
import { useParams } from 'react-router-dom';

const CreateAnnouncement = () => {
    const { id } = useParams();
    const [exec, setExec] = useState(false);
    console.log(id)
    const { currentUser } = useContext(AuthContext)
    const accountUCID = currentUser?.UCID;

    useEffect(() => {
        async function getExecs() {
            const execRes = await axios.post("/club/getExecs", {Activity_ID: id});
            const execUCIDs = execRes.data.map((exec: { UCID: any; }) => exec.UCID);
    
            if (execUCIDs.includes(accountUCID)) {
              setExec(true);
            }
        }
    }, [])

    const handleSubmit = async (e: FormEvent<CreateForm>) => {

    }
    return (
    <> {
        exec ?
            <div className='create'> 
                <h1 className="bigHeader">Post Announcement</h1>
                <form onSubmit={handleSubmit} method='post'>
                    <div className='createBody'>
                        <div className='nameBody'>
                            <div className='inputSection'>
                                <h4>First Name</h4>
                                <input type='text' placeholder='First Name' id='fName' required/>
                            </div>
                            <div className='inputSection'>
                                <h4>Last Name</h4>
                                <input type='text' placeholder='Last Name' id='lName' required/>
                            </div>
                        </div>
                        <div className='inputSection'>
                            <h4>Bio</h4>
                            <textarea placeholder='Bio' id='bio' rows={4}/>
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
	title: HTMLInputElement;
	body: HTMLInputElement;
}
	 
interface CreateForm extends HTMLFormElement {
	readonly elements: CreateElements;
}

export default CreateAnnouncement