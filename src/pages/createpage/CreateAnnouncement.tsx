import React, { FormEvent, useContext, useEffect, useState } from 'react'
import './style.css'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

interface CreateElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    body: HTMLInputElement;

}
   
interface CreateForm extends HTMLFormElement {
    readonly elements: CreateElements;
}

const CreateAnnouncement = () => {

    const navigate = useNavigate()
    
    const { id } = useParams();
    const [exec, setExec] = useState(false);
    const [duplicateWarning, setDuplicateWarning] = useState(false);
    const { currentUser } = useContext(AuthContext)
    const accountUCID = currentUser?.UCID;

    useEffect(() => {
        async function getExecs() {
            const execRes = await axios.post("/club/getExecs", {Activity_ID: id});
            const execUCIDs = execRes.data.map((exec: { UCID: any; }) => exec.UCID);

            setExec(execUCIDs.includes(accountUCID));
        }
        getExecs();
    }, [])



    const handleSubmit = async (e : FormEvent<CreateForm>) => {
        e.preventDefault();
        setDuplicateWarning(false);
        const elements = e.currentTarget.elements;
        const formData = {
            id: id,
            title: elements.title.value,
            body: elements.body.value,
            author: currentUser.FName + ' ' + currentUser.LName,
            date: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }

        // send formData here
        let success = true;
        const result = await axios.post('/announcement/post', formData).catch(err => {
            console.log(err);
            success = false;
            setDuplicateWarning(true);
        });
        if (success)
            navigate(`../announcements`)
    };

    return (
    <div className='create'>
        {exec ? <>
        <h1 className="bigHeader">Post Announcement!</h1>
            <form onSubmit={handleSubmit} method='post'>
                <div className='createBody'>
                    <input type='text' placeholder='Title' id='title' required/>
                    <textarea placeholder='Body...' id='body' rows={6} required/>
                    <button type='submit'>Post</button>
                    {duplicateWarning ? <h3 className='warningText'>This title already exists! Please use a different one.</h3> : <></>}
                </div>
            </form>
        </> : <h1 className="bigHeader">You do not have permission to access this page!</h1>
        }
    </div>
  )
}





export default CreateAnnouncement;