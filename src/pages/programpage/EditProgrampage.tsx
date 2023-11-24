import React, { FormEvent, useEffect, useState } from 'react'
import './style.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface CreateElements extends HTMLFormControlsCollection   {
    name: HTMLInputElement;
    description: HTMLInputElement;
    schedule: HTMLInputElement;
    perks: HTMLInputElement;
    img: HTMLInputElement;

    website: HTMLInputElement;
}
   
interface CreateForm extends HTMLFormElement {
    readonly elements: CreateElements;
}

const EditProgramPage = () => {
    const { id } = useParams();

    const [program, setProgram] = useState({
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
      Website: '',
      Perk: '',
    })
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.post("/club/show", {Activity_ID: id});
          setProgram({
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
            Website: res.data.Website,
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
            perks: elements.schedule.value,
            img: elements.img.value,
            
            website: elements.website.value,
        };

        // send formData here

    };

    const editable = true;
    // send a request here to see if the current user should have permissions to edit the activity


    // send a get request here to get existing information on the activity, then populate the input placeholders with that info
    return (
    <div className='create'> 
        {editable ? <>
            <h1 className="bigHeader">Edit Program</h1>
            <form onSubmit={handleSubmit} method='post'>
                <div className='createBody'>
                    <input type='text' placeholder='Name' id='name' defaultValue={program.Name || ''} required/>
                    <textarea placeholder='Description...' id='description' defaultValue={program.Description || ''} rows={6} />
                    <input type='text' placeholder='Perks' id='perks' defaultValue={program.Perk || ''} />
                    <input type='text' placeholder='Schedule' id='schedule' defaultValue={program.Schedule || ''} />
                    <input type='text' placeholder='Website' id='website' defaultValue={program.Website || ''} />
                    <input type='text' placeholder='Image link' id='img' defaultValue={program.Img_file_path || ''} required/>
                    <button type='submit'>Confirm</button>
                </div>
            </form>
        </> : <h1 className="bigHeader">You do not have permission to access this.</h1>
        }
    </div>
  )
}

export default EditProgramPage;