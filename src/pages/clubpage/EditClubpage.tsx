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

    discord: HTMLInputElement;
    instagram: HTMLInputElement;
}
   
interface CreateForm extends HTMLFormElement {
    readonly elements: CreateElements;
}

const EditClubPage = () => {
    const { id } = useParams();

    const [club, setClub] = useState({
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
        Discord: '',
        Instagram: '',
        Perk: '',
      })

      useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.post("/club/show", {Activity_ID: id});
            setClub({
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
              Discord: res.data.Discord,
              Instagram: res.data.Instagram,
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
            
            discord: elements.discord.value,
            instagram: elements.instagram.value,
        };

        // send formData here

    };

    const editable = true;
    // send a request here to see if the current user should have permissions to edit the activity


    // send a get request here to get existing information on the activity, then populate the input placeholders with that info
    return (
    <div className='create'> 
        {editable ? <>
            <h1 className="bigHeader">Edit Club</h1>
            <form onSubmit={handleSubmit} method='post'>
                <div className='createBody'>
                    <input type='text' placeholder='Name' id='name' defaultValue={club.Name || ''} required/>
                    <textarea placeholder='Description...' id='description' rows={6} defaultValue={club.Description || ''} />
                    <input type='text' placeholder='Perks' id='perks' defaultValue={club.Perk || ''} />
                    <input type='text' placeholder='Schedule' id='schedule' defaultValue={club.Schedule || ''} />
                    <input type='text' placeholder='Discord' id='discord' defaultValue={club.Discord || ''} />
                    <input type='text' placeholder='Instagram' id='instagram' defaultValue={club.Instagram || ''} />
                    <input type='text' placeholder='Image link' id='img' defaultValue={club.Img_file_path || ''} required/>
                    {/* <input type='text' placeholder='Tags' id='Tags' /> */}
                    <button type='submit'>Confirm</button>
                </div>
            </form>
        </> : <h1 className="bigHeader">You do not have permission to access this.</h1>
        }
    </div>
  )
}

export default EditClubPage;