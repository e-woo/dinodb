import React, { FormEvent, useContext, useEffect, useState } from 'react'
import './style.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

interface CreateElements extends HTMLFormControlsCollection   {
    name: HTMLInputElement;
    description: HTMLInputElement;
    perks: HTMLInputElement;
    fee: HTMLInputElement;

    type: HTMLInputElement;
    onlineInPerson: HTMLInputElement;
    signUpInfo: HTMLInputElement;
    eligibility: HTMLInputElement;
    location: HTMLInputElement;
    dateTime: HTMLInputElement;
}
   
interface CreateForm extends HTMLFormElement {
    readonly elements: CreateElements;
}

const EditEventPage = () => {
    const { id } = useParams();

    const navigate = useNavigate()

    const { currentUser } = useContext(AuthContext)
    const accountType = currentUser?.AccountType;
    const accountUCID = currentUser?.UCID;
  
    const [editable, setEditable] = useState(false);

    const [event, setEvent] = useState({
      Activity_ID: id,
      Name: '',
      Description: '',
      Type: '',
      Location: '',
      DateTime: '',
      Perks: '',
      OnlineInPerson: '',
      SignUpInfo: '',
      Fee: '',
      Eligibility: '',
    })

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.post("/event/show", {Activity_ID: id});
            setEvent({
              Activity_ID: res.data.Activity_ID,
              Name: res.data.Name,
              Description: res.data.Description,
              Type: res.data.Type,
              Location: res.data.Location,
              DateTime: res.data.Date_and_Time,
              Perks: res.data.Perks,
              OnlineInPerson: res.data.OnlineInPerson,
              SignUpInfo: res.data.SignUpInfo,
              Fee: res.data.Fee,
              Eligibility: res.data.Eligibility,
            });

            const idRes = await axios.post("/event/getID", { Name: id });

            const execRes = await axios.post("/event/getExecs", {Activity_ID: idRes.data.Activity_ID});
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
        const formData = {
          name: id,
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
          await axios.post("/event/edit", formData);
          navigate(`../event/${id}`);
        } catch (error) {
          console.error('Error submitting form:', error);
        }

    };

    // send a get request here to get existing information on the activity, then populate the input placeholders with that info
    return (
        <div className='create'> 
        {editable ? <>
            <h1 className="bigHeader">Edit Event: {event.Name}</h1>
            <form onSubmit={handleSubmit} method='post'>
                <div className='createBody'>
                    <textarea placeholder='Description...' id='description' rows={6} defaultValue={event.Description || ''} />
                    <input type='number' placeholder='Fee' id='fee' defaultValue={event.Fee || ''} />
                    <input type='text' placeholder='Perks' id='perks' defaultValue={event.Perks || ''} />
                    <input type='text' placeholder='Location' id='location' defaultValue={event.Location || ''} />
                    <input type='text' placeholder='Online or In Person?' id='onlineInPerson' defaultValue={event.OnlineInPerson || ''} />
                    <input type='text' placeholder='Sign up info' id='signUpInfo' defaultValue={event.SignUpInfo || ''} />
                    <input type='text' placeholder='Eligibility' id='eligibility' defaultValue={event.Eligibility || ''} />
                    <input type='datetime-local' placeholder='Date and time' id='dateTime' required defaultValue={event.DateTime || ''} />
                    <button type='submit'>Confirm</button>
                </div>
            </form>
        </> : <h1 className="bigHeader">You do not have permission to access this.</h1>
        }
    </div>
  )
}

export default EditEventPage;