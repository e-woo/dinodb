import React, { FormEvent, useEffect, useState } from 'react'
import './style.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface CreateElements extends HTMLFormControlsCollection   {
    name: HTMLInputElement;
    description: HTMLInputElement;
    schedule: HTMLInputElement;

    type: HTMLInputElement;
    location: HTMLInputElement;
}
   
interface CreateForm extends HTMLFormElement {
    readonly elements: CreateElements;
}

const EditEventPage = () => {
    const { id } = useParams();

    const [event, setEvent] = useState({
      Activity_ID: id,
      Name: '',
      Description: '',
      Type: '',
      Img_file_path: '',
      Location: '',
      DateTime: '',
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
              Img_file_path: res.data.Img_file_path,
              Location: res.data.Location,
              DateTime: res.data.Date_and_Time
            });
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
            name: elements.name.value,
            description: elements.description.value,
            schedule: elements.schedule.value,
            img: elements.schedule.value,
            
            location: elements.location.value,
            date_and_time: elements.location.value,
        };

        // send formData here

    };

    const editable = true;
    // send a request here to see if the current user should have permissions to edit the activity


    // send a get request here to get existing information on the activity, then populate the input placeholders with that info
    return (
        <div className='create'> 
        {editable ? <>
            <h1 className="bigHeader">Edit Event</h1>
            <form onSubmit={handleSubmit} method='post'>
                <div className='createBody'>
                    <input type='text' placeholder='Name' id='name' required defaultValue={event.Name || ''}/>
                    <textarea placeholder='Description...' id='description' rows={6} defaultValue={event.Description || ''} />
                    <input type='text' placeholder='Location' id='location' defaultValue={event.Location || ''} />
                    <input type='text' placeholder='Location' id='date_and_time' defaultValue={event.DateTime || ''} />
                    <input type='text' placeholder='Location' id='img' defaultValue={event.Img_file_path || ''} />
                    <button type='submit'>Confirm</button>
                </div>
            </form>
        </> : <h1 className="bigHeader">You do not have permission to access this.</h1>
        }
    </div>
  )
}

export default EditEventPage;