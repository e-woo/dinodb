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
  facultyType: HTMLInputElement;
  weekHours: HTMLInputElement;
  tags: HTMLInputElement;

    website: HTMLInputElement;
}
   
interface CreateForm extends HTMLFormElement {
    readonly elements: CreateElements;
}

const EditProgramPage = () => {
    const { currentUser } = useContext(AuthContext)
    const accountType = currentUser?.AccountType;
    const accountUCID = currentUser?.UCID;

    const [editable, setEditable] = useState(false);

    const { id } = useParams();

    const navigate = useNavigate()

    const [facultyType, setFacultyType] = useState<string>('');
    const [tags, setTags] = useState<string>('');

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
          const res = await axios.post("/program/show", {Activity_ID: id});
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

          const execRes = await axios.post("/program/getExecs", {Activity_ID: id});
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
          UCID: accountUCID,
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
          tags: elements.tags.value,
            
          website: elements.website.value,
        };

        try {
          await axios.post("/program/edit", formData);
          navigate(`../program/${id}`);
        } catch (error) {
          console.error('Error submitting form:', error);
        }

    };

    return (
    <div> 
        {editable ? <>
            <h1 className='pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center'>Edit Program</h1>
            <form onSubmit={handleSubmit} method='post'>
                <div className='flex flex-col items-center gap-6'>
                    <input type='text' placeholder='Name' id='name' defaultValue={program.Name || ''} className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm' required/>
                    <textarea placeholder='Description...' id='description' rows={6} defaultValue={program.Description || ''} className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-2xl px-4 py-2 text-sm resize-none'/>
                    <select value={facultyType} onChange={e => {setFacultyType(e.target.value)}} className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm' id='facultyType'>
                      <option value='Science'>Science</option>
                      <option value='Arts'>Arts</option>
                      <option value='Engineering'>Engineering</option>
                      <option value='Business'>Business</option>
                      <option value='Education'>Education</option>
                      <option value='Administration'>Administration</option>
                    </select>
                    <select value={tags} onChange={e => {setTags(e.target.value)}} className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm' id='tags' >
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
                    <input type='number' placeholder='Fee' id='fee' defaultValue={program.Fee || ''} className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm'/>
                    <input type='number' placeholder='Weekly hour commitment' id='weekHours' defaultValue={program.WeekCommitmentHour || ''} className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm'/>
                    <input type='text' placeholder='Perks' id='perks' defaultValue={program.Perk || ''} className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm'/>
                    <input type='text' placeholder='Schedule' id='schedule' defaultValue={program.Schedule || ''} className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm'/>
                    <input type='text' placeholder='Interview Required?' id='interview' defaultValue={program.InterviewRequired || ''} className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm'/>
                    <input type='text' placeholder='Application Required?' id='application' defaultValue={program.ApplicationRequired || ''} className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm'/>
                    <input type='text' placeholder='Website' id='website' defaultValue={program.Website || ''} className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm'/>
                    <input type='text' placeholder='Image link' id='img' defaultValue={program.Img_file_path || ''} required className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm'/>
                    <button type='submit' className='w-56 md:w-72 lg:w-96 border-2 border-red-500 bg-white rounded-xl py-2 justify-center text-lg font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white'>Confirm</button>
                </div>
            </form>
        </> : <h1 className='pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center'>You do not have permission to access this.</h1>
        }
    </div>
  )
}

export default EditProgramPage;