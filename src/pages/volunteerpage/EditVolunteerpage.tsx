import React, { FormEvent, useEffect, useState } from 'react'
import './style.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface CreateElements extends HTMLFormControlsCollection   {
    name: HTMLInputElement;
    description: HTMLInputElement;
    schedule: HTMLInputElement;
    img: HTMLInputElement;

    location: HTMLInputElement;
}
   
interface CreateForm extends HTMLFormElement {
    readonly elements: CreateElements;
}

const EditVolunteerPage = () => {
    const { id } = useParams();

    const [volunteer, setVolunteer] = useState({
      Activity_ID: id,
      Name: '',
      Description: '',
      Fee: '',
      Schedule: '',
      InterviewRequired: '',
      ApplicationRequired: '',
      WeekCommitmentHour: '',
      Faculty: '',
      Img_file_path: '',
      Location: '',
      Perk: '',
    })
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.post("/volunteer/show", {Activity_ID: id});
          setVolunteer({
            Activity_ID: res.data.Activity_ID,
            Name: res.data.Name,
            Description: res.data.Description,
            Fee: res.data.Fee,
            Schedule: res.data.Schedule,
            InterviewRequired: res.data.InterviewRequired,
            ApplicationRequired: res.data.ApplicationRequired,
            WeekCommitmentHour: res.data.WeekCommitmentHour,
            Faculty: res.data.Faculty_Name,
            Img_file_path: res.data.Img_file_path,
            Location: res.data.Location,
            Perk: res.data.Perk
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
            
            location: elements.location.value,
        };

        // send formData here

    };

    const editable = true;
    // send a request here to see if the current user should have permissions to edit the activity


    // send a get request here to get existing information on the activity, then populate the input placeholders with that info
    return (
    <div className='create'> 
        {editable ? <>
            <h1 className="bigHeader">Edit Volunteering Opportunity</h1>
            <form onSubmit={handleSubmit} method='post'>
                <div className='createBody'>
                    <input type='text' placeholder='Name' id='name' defaultValue={volunteer.Name || ''} required/>
                    <textarea placeholder='Description...' id='description' rows={6} defaultValue={volunteer.Description || ''} />
                    <input type='text' placeholder='Perks' id='perks' defaultValue={volunteer.Perk || ''} />
                    <input type='text' placeholder='Schedule' id='schedule' defaultValue={volunteer.Schedule || ''} />
                    <input type='text' placeholder='Location' id='location' defaultValue={volunteer.Location || ''} />
                    <input type='text' placeholder='Image link' id='img' defaultValue={volunteer.Img_file_path || ''} required/>
                    <button type='submit'>Confirm</button>
                </div>
            </form>
        </> : <h1 className="bigHeader">You do not have permission to access this.</h1>
        }
    </div>
  )
}

export default EditVolunteerPage;