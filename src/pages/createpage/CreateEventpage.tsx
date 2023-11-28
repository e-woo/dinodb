import React, { FormEvent, useContext, useEffect, useState } from 'react'
import './style.css'
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface CreateElements extends HTMLFormControlsCollection   {
    activityType: HTMLInputElement;
    name: HTMLInputElement;
    description: HTMLInputElement;
    fee: HTMLInputElement;
    perks: HTMLInputElement;

    onlineInPerson: HTMLInputElement;
    signUpInfo: HTMLInputElement;
    eligibility: HTMLInputElement;
    location: HTMLInputElement;
    dateTime: HTMLInputElement;
}
   
interface CreateForm extends HTMLFormElement {
    readonly elements: CreateElements;
}

const CreateEventPage = () => {
    const { id } = useParams();

    const { currentUser } = useContext(AuthContext)
    const accountType = currentUser?.AccountType;
    const accountUCID = currentUser?.UCID;

    const navigate = useNavigate();

    const [editable, setEditable] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {

            const execRes = await axios.post("/club/getExecs", {Activity_ID: id});
            const execUCIDs = execRes.data.map((exec: { UCID: any; }) => exec.UCID);
    
            if (execUCIDs.includes(accountUCID)) {
              setEditable(true);
            }

          } catch (error) {
            console.log(error);
          }
        }
        fetchData();
    }, [id]);
    
    const handleSubmit = async (e : FormEvent<CreateForm>) => {
        e.preventDefault();
        const elements = e.currentTarget.elements;
        let formData;

        formData = {
            id: id,
            name: elements.name.value,
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
            await axios.post(`/event/create2`, formData);
            navigate(`/event/${formData.name}`)
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    if (!editable) {
        return (
        <div className='access-message'>
            <h1>You do not have permission to access this.</h1>
        </div>
        );
    } else {
        return (
            <div className='create'>
                <h1 className="bigHeader">Create new Event!</h1>
                <form onSubmit={handleSubmit} method='post'>
                    <div className='createBody'>
                        <input type='text' placeholder='Name' id='name' required/>
                        <textarea placeholder='Description...' id='description' rows={6} />
                        <input type='text' placeholder='Perks' id='perks' required />
                        <input type='number' placeholder='Fee' id='fee' />
                        <input type='text' placeholder='Location' id='location' required/>
                        <input type='text' placeholder='Online or In Person?' id='onlineInPerson' />
                        <input type='text' placeholder='Sign up info' id='signUpInfo' />
                        <input type='text' placeholder='Eligibility' id='eligibility' />
                        <input type='datetime-local' placeholder='Date and time' id='dateTime' required/>
                        <button type='submit'>Create</button>
                    </div>
                </form>
            </div>
          )
    }
}

export default CreateEventPage;