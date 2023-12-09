import React, { FormEvent, useContext, useEffect, useState } from 'react'
import './style.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
  facultyType: HTMLInputElement;
  weekHours: HTMLInputElement;

    location: HTMLInputElement;
}
   
interface CreateForm extends HTMLFormElement {
    readonly elements: CreateElements;
}

const EditVolunteerPage = () => {
    const { id } = useParams();

    const navigate = useNavigate()
    const [facultyType, setFacultyType] = useState<string>('');

    const { currentUser } = useContext(AuthContext)
    const accountType = currentUser?.AccountType;
    const accountUCID = currentUser?.UCID;
  
    const [editable, setEditable] = useState(false);

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

          const execRes = await axios.post("/volunteer/getExecs", {Activity_ID: id});
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
          facultyType: elements.facultyType.value,
          weekHours: elements.weekHours.value,
            
          location: elements.location.value,
        };

        try {
          await axios.post("/volunteer/edit", formData);
          navigate(`../volunteer/${id}`);
        } catch (error) {
          console.error('Error submitting form:', error);
        }

    };

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
                    <select value={facultyType} onChange={e => {setFacultyType(e.target.value)}} className='dropdown' id='facultyType'>
                      <option value='Science'>Science</option>
                      <option value='Arts'>Arts</option>
                      <option value='Engineering'>Engineering</option>
                      <option value='Business'>Business</option>
                      <option value='Education'>Education</option>
                      <option value='Administration'>Administration</option>
                    </select>
                    <input type='number' placeholder='Fee' id='fee' defaultValue={volunteer.Fee || ''} />
                    <input type='number' placeholder='Weekly hour commitment' id='weekHours' defaultValue={volunteer.WeekCommitmentHour || ''} />
                    <input type='text' placeholder='Perks' id='perks' defaultValue={volunteer.Perk || ''} />
                    <input type='text' placeholder='Schedule' id='schedule' defaultValue={volunteer.Schedule || ''} />
                    <input type='text' placeholder='Interview Required?' id='interview' defaultValue={volunteer.InterviewRequired || ''} />
                    <input type='text' placeholder='Application Required?' id='application' defaultValue={volunteer.ApplicationRequired || ''} />
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