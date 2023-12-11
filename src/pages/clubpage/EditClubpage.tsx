import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

interface CreateElements extends HTMLFormControlsCollection   {
    name: HTMLInputElement;
    description: HTMLInputElement;
    schedule: HTMLInputElement;
    perks: HTMLInputElement;
    img: HTMLInputElement;
    fee: HTMLInputElement;
    interview: HTMLInputElement;
    application: HTMLInputElement;
    weekHours: HTMLInputElement;

    discord: HTMLInputElement;
    instagram: HTMLInputElement;
}
   
interface CreateForm extends HTMLFormElement {
    readonly elements: CreateElements;
}

const EditClubPage = () => {
    const { id } = useParams();

    const navigate = useNavigate()

    const { currentUser } = useContext(AuthContext)
    const accountType = currentUser?.AccountType;
    const accountUCID = currentUser?.UCID;
  
    const [editable, setEditable] = useState(false);

    const [club, setClub] = useState({
        Activity_ID: id,
        Name: '',
        Description: '',
        Fee: '',
        Schedule: '',
        InterviewRequired: '',
        ApplicationRequired: '',
        WeekCommitmentHour: '',
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
              Img_file_path: res.data.Img_file_path,
              Discord: res.data.Discord,
              Instagram: res.data.Instagram,
              Perk: res.data.Perk
            });

            const execRes = await axios.post("/club/getExecs", {Activity_ID: id});
            console.log(execRes);
            const execUCIDs = execRes.data.map((exec: { UCID: any; }) => exec.UCID);
            console.log(execUCIDs);
    
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
            id: id,
            name: elements.name.value,
            description: elements.description.value,
            schedule: elements.schedule.value,
            perks: elements.perks.value,
            fee: elements.fee.value,
            img: elements.img.value,
            interview: elements.interview.value,
            application: elements.application.value,
            weekHours: elements.weekHours.value,
            
            discord: elements.discord.value,
            instagram: elements.instagram.value,
        };

        try {
          await axios.post("/club/edit", formData);
          navigate(`../club/${id}`);
        } catch (error) {
          console.error('Error submitting form:', error);
        }

    };

    return (
    <div> 
        {editable ? <>
            <h1 className='pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center'>Edit Club</h1>
            <form onSubmit={handleSubmit} method='post'>
                <div className='createBody'>
                    <input type='text' placeholder='Name' id='name' defaultValue={club.Name || ''} required/>
                    <textarea placeholder='Description...' id='description' rows={6} defaultValue={club.Description || ''} />
                    <input type='number' placeholder='Fee' id='fee' defaultValue={club.Fee || ''} />
                    <input type='number' placeholder='Weekly hour commitment' id='weekHours' defaultValue={club.WeekCommitmentHour || ''} />
                    <input type='text' placeholder='Perks' id='perks' defaultValue={club.Perk || ''} />
                    <input type='text' placeholder='Schedule' id='schedule' defaultValue={club.Schedule || ''} />
                    <input type='text' placeholder='Interview Required?' id='interview' defaultValue={club.InterviewRequired || ''} />
                    <input type='text' placeholder='Application Required?' id='application' defaultValue={club.ApplicationRequired || ''} />
                    <input type='text' placeholder='Discord' id='discord' defaultValue={club.Discord || ''} />
                    <input type='text' placeholder='Instagram' id='instagram' defaultValue={club.Instagram || ''} />
                    <input type='text' placeholder='Image link' id='img' defaultValue={club.Img_file_path || ''} required/>
                    <button type='submit'>Confirm</button>
                </div>
            </form>
        </> : <h1 className='pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center'>You do not have permission to access this.</h1>
        }
    </div>
  )
}

export default EditClubPage;