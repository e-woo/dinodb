import React, { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface CreateElements extends HTMLFormControlsCollection   {
    activityType: HTMLInputElement;
    name: HTMLInputElement;
    description: HTMLInputElement;
    schedule: HTMLInputElement;
    img: HTMLInputElement;
    interview: HTMLInputElement;
    application: HTMLInputElement;
    weekHours: HTMLInputElement;
    tags: HTMLInputElement;
    fee: HTMLInputElement;
    facultyType: HTMLInputElement;
    perks: HTMLInputElement;

    discord: HTMLInputElement;
    instagram: HTMLInputElement;
    website: HTMLInputElement;
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

const CreatePage = () => {
    const { currentUser } = useContext(AuthContext)
    const accountType = currentUser?.AccountType;
    const accountUCID = currentUser?.UCID;

    const navigate = useNavigate();
    
    const [activityType, setActivityType] = useState<string>('');
    const [facultyType, setFacultyType] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [warning, setWarning] = useState<boolean>(false);
    const handleSubmit = async (e : FormEvent<CreateForm>) => {
        e.preventDefault();
        const elements = e.currentTarget.elements;
        const activity = e.currentTarget.elements.activityType.value;
        let formData;
        let url = '';

        if (activity === 'choose') {
            setWarning(true);
            return;
        }
        setWarning(false);
        if (activity === 'club')
            formData = {
                ucid: accountUCID,
                activityType: elements.activityType.value,
                name: elements.name.value,
                description: elements.description.value,
                schedule: elements.schedule.value,
                img: elements.img.value,
                interview: elements.interview.value,
                application: elements.application.value,
                weekHours: elements.weekHours.value,
                tags: elements.tags.value,
                facultyType: elements.facultyType.value,
                fee: elements.fee.value,
                perks: elements.perks.value,
            
                discord: elements.discord.value,
                instagram: elements.instagram.value,
            };
        else if (activity === 'program')
            formData = {
                ucid: accountUCID,
                activityType: elements.activityType.value,
                name: elements.name.value,
                description: elements.description.value,
                schedule: elements.schedule.value,
                img: elements.img.value,
                interview: elements.interview.value,
                application: elements.application.value,
                weekHours: elements.weekHours.value,
                tags: elements.tags.value,
                facultyType: elements.facultyType.value,
                fee: elements.fee.value,
                perks: elements.perks.value,
            
                website: elements.website.value,
            };
        else if (activity === 'event')
            formData = {
                ucid: accountUCID,
                activityType: elements.activityType.value,
                name: elements.name.value,
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
        else
            formData = {
                ucid: accountUCID,
                activityType: elements.activityType.value,
                name: elements.name.value,
                description: elements.description.value,
                schedule: elements.schedule.value,
                img: elements.img.value,
                interview: elements.interview.value,
                application: elements.application.value,
                weekHours: elements.weekHours.value,
                tags: elements.tags.value,
                facultyType: elements.facultyType.value,
                fee: elements.fee.value,
                perks: elements.perks.value,
            
                location: elements.location.value,
            };

        // send formData here
        switch (activity) {
            case 'club':
                url = '/club';
                break;
            case 'program':
                url = '/program';
                break;
            case 'event':
                url = '/event';
                break;
            case 'volunteer':
                url = '/volunteer'
                break;
            default:
                console.error('Invalid activity type');
                return;
        }

        if (formData && url) {
            try {
                const res = await axios.post(url + "/create", formData);
                navigate(url + `/${res.data.activityId}`)
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }

    };

    if (accountType !== 'EXECUTIVE') {
        return (
        <div className='access-message'>
            <h1>You do not have permission to access this.</h1>
        </div>
        );
    } else {
        return (
            <div className='min-h-[60vh]'>
                <h1 className='pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center'>Create new Extracurricular!</h1>
                <form onSubmit={handleSubmit} method='post'>
                    <div className='flex flex-col items-center gap-6'>
                        <select value={activityType} onChange={e => {setActivityType(e.target.value)}} className={inputCSS} id='activityType'>
                            <option value='choose'>Choose an Extracurricular Type...</option>
                            <option value='club'>Club</option>
                            <option value='program'>Program</option>
                            <option value='event'>Event</option>
                            <option value='volunteer'>Volunteering</option>
                        </select>
                        <input type='text' placeholder='Name' id='name' className={inputCSS} required/>
                        <textarea placeholder='Description...' id='description' rows={6} className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-2xl px-4 py-2 text-sm resize-none'/>
                        <input type='text' placeholder='Perks' id='perks' className={inputCSS} required />
                        <input type='text' placeholder='Icon image link' id='img' className={inputCSS} required/>
                        {
                            activityType === 'club' ?
                            <>
                                <input type='number' placeholder='Fee' id='fee' className={inputCSS} />
                                <input type='text' placeholder='Schedule' id='schedule' className={inputCSS} />
                                <input type='text' placeholder='Interview Required?' id='interview' className={inputCSS} />
                                <input type='text' placeholder='Application Required?' id='application' className={inputCSS} />
                                <input type='number' placeholder='Weekly hour commitment' id='weekHours' className={inputCSS} />
                                <input type='text' placeholder='Discord' id='discord' className={inputCSS} />
                                <input type='text' placeholder='Instagram' id='instagram' className={inputCSS} />
                            </> :
                            activityType === 'program' ?
                            <>
                                <input type='number' placeholder='Fee' id='fee' className={inputCSS}/>
                                <input type='text' placeholder='Schedule' id='schedule' className={inputCSS} />
                                <input type='text' placeholder='Interview Required?' id='interview' className={inputCSS}/>
                                <input type='text' placeholder='Application Required?' id='application' className={inputCSS}/>
                                <input type='number' placeholder='Weekly hour commitment' id='weekHours' className={inputCSS}/>
                                <input type='text' placeholder='Website' id='website' className={inputCSS}/>
                            </> :
                            activityType === 'event' ?
                            <>
                                <input type='number' placeholder='Fee' id='fee' className={inputCSS}/>
                                <input type='text' placeholder='Location' id='location' className={inputCSS} required/>
                                <input type='text' placeholder='Online or In Person?' id='onlineInPerson' className={inputCSS}/>
                                <input type='text' placeholder='Sign up info' id='signUpInfo' className={inputCSS}/>
                                <input type='text' placeholder='Eligibility' id='eligibility' className={inputCSS}/>
                                <input type='datetime-local' placeholder='Date and time' id='dateTime' className={inputCSS} required/>
                            </> :
                            activityType === 'volunteer' ?
                            <>
                                <input type='number' placeholder='Fee' id='fee' className={inputCSS}/>
                                <input type='text' placeholder='Schedule' id='schedule' className={inputCSS}/>
                                <input type='text' placeholder='Interview Required?' id='interview' className={inputCSS}/>
                                <input type='text' placeholder='Application Required?' id='application' className={inputCSS}/>
                                <input type='number' placeholder='Weekly hour commitment' id='weekHours' className={inputCSS}/>
                                <input type='text' placeholder='Location' id='location' className={inputCSS}/>
                            </> : <></>
                        }
                        <select value={facultyType} onChange={e => {setFacultyType(e.target.value)}} className={inputCSS} id='facultyType'>
                            <option value='Administration'>Choose a faculty...</option>
                            <option value='Science'>Science</option>
                            <option value='Arts'>Arts</option>
                            <option value='Engineering'>Engineering</option>
                            <option value='Business'>Business</option>
                            <option value='Education'>Education</option>
                            <option value='Administration'>Administration</option>
                        </select>
                        <select value={tags} onChange={e => {setTags(e.target.value)}} className={inputCSS} id='tags' required>
                            <option value=''>Choose a tag...</option>
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
                        <button type='submit' className='w-56 md:w-72 lg:w-96 border-2 border-red-500 bg-white rounded-xl py-2 justify-center text-lg font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white'>Create</button>
                        { warning ? <p className='text-red-500 font-semibold'>Please choose an extracurricular type!</p> : <></> }
                    </div>
                </form>
            </div>
          )
    }
}

const inputCSS = 'w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm';

export default CreatePage;