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
    facultyType: HTMLInputElement;
    tags: HTMLInputElement;
    img: HTMLInputElement;

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

    const [facultyType, setFacultyType] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [event, setEvent] = useState({
      Activity_ID: id,
      Name: '',
      Description: '',
      Type: '',
      Img_file_path: '',
      Location: '',
      DateTime: '',
      Perks: '',
      OnlineInPerson: '',
      SignUpInfo: '',
      Fee: '',
      Eligibility: '',
      Faculty: '',
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
              DateTime: res.data.Date_and_Time,
              Perks: res.data.Perks,
              OnlineInPerson: res.data.OnlineInPerson,
              SignUpInfo: res.data.SignUpInfo,
              Fee: res.data.Fee,
              Eligibility: res.data.Eligibility,
              Faculty: facultyType
            });

            const execRes = await axios.post("/event/getExecs", {Activity_ID: id});
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
          name: event.Name,
          description: elements.description.value,
          img: elements.img.value,
          tags: elements.tags.value,
          facultyType: elements.facultyType.value,
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
                    <select value={facultyType} onChange={e => {setFacultyType(e.target.value)}} className='dropdown' id='facultyType'>
                      <option value='Science'>Science</option>
                      <option value='Arts'>Arts</option>
                      <option value='Engineering'>Engineering</option>
                      <option value='Business'>Business</option>
                      <option value='Education'>Education</option>
                      <option value='Administration'>Administration</option>
                    </select>
                    <select value={tags} onChange={e => {setTags(e.target.value)}}  id='tags' >
                      <option value='000000001'>Academic</option>
                      <option value='000000002'>Arts</option>
                      <option value='000000003'>Recreation</option>
                      <option value='000000004'>Technology</option>
                      <option value='000000006'>Community</option>
                      <option value='000000007'>STEM</option>
                      <option value='000000008'>Cultural</option>
                      <option value='000000009'>Career Development</option>
                      <option value='000000012'>Coding</option>
                      <option value='000000013'>Literacy</option>
                      <option value='000000014'>Music and Performing Arts</option>
                      <option value='000000015'>Health and Wellness</option>
                      <option value='000000017'>Food and Cooking</option>
                      <option value='000000018'>Advocacy and Social Issues</option>
                      <option value='000000019'>Leadership</option>
                      <option value='000000020'>Gaming</option>
                    </select>
                    <input type='number' placeholder='Fee' id='fee' defaultValue={event.Fee || ''} />
                    <input type='text' placeholder='Perks' id='perks' defaultValue={event.Perks || ''} />
                    <input type='text' placeholder='Image link' id='img' defaultValue={event.Img_file_path || ''} />
                    <input type='text' placeholder='Location' id='location' defaultValue={event.Location || ''} />
                    <input type='text' placeholder='Online or In Person?' id='onlineInPerson' defaultValue={event.OnlineInPerson || ''} />
                    <input type='text' placeholder='Sign up info' id='signUpInfo' defaultValue={event.SignUpInfo || ''} />
                    <input type='text' placeholder='Eligibility' id='eligibility' defaultValue={event.Eligibility || ''} />
                    <input type='datetime-local' placeholder='Date and time' id='dateTime' defaultValue={event.DateTime || ''} />
                    <button type='submit'>Confirm</button>
                </div>
            </form>
        </> : <h1 className="bigHeader">You do not have permission to access this.</h1>
        }
    </div>
  )
}

export default EditEventPage;