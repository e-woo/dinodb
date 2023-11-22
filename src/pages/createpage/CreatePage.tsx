import React, { FormEvent, useState } from 'react'
import './style.css'

interface CreateElements extends HTMLFormControlsCollection   {
    activityType: HTMLInputElement;
    name: HTMLInputElement;
    description: HTMLInputElement;
    schedule: HTMLInputElement;

    discord: HTMLInputElement;
    instagram: HTMLInputElement;
    website: HTMLInputElement;
    type: HTMLInputElement;
    location: HTMLInputElement;
}
   
interface CreateForm extends HTMLFormElement {
    readonly elements: CreateElements;
}

const CreatePage = () => {
    const [activityType, setActivityType] = useState<string>('');
    const [warning, setWarning] = useState<boolean>(false);
    const handleSubmit = async (e : FormEvent<CreateForm>) => {
        e.preventDefault();
        const elements = e.currentTarget.elements;
        const activity = e.currentTarget.elements.activityType.value;
        let formData;
        if (activity === 'choose') {
            setWarning(true);
            return;
        }
        setWarning(false);
        if (activity === 'club')
            formData = {
                activityType: elements.activityType.value,
                name: elements.name.value,
                description: elements.description.value,
                schedule: elements.schedule.value,
            
                discord: elements.discord.value,
                instagram: elements.instagram.value,
            };
        else if (activity === 'program')
            formData = {
                activityType: elements.activityType.value,
                name: elements.name.value,
                description: elements.description.value,
                schedule: elements.schedule.value,
            
                website: elements.website.value,
            };
        else if (activity === 'event')
            formData = {
                activityType: elements.activityType.value,
                name: elements.name.value,
                description: elements.description.value,
                schedule: elements.schedule.value,
            
                type: elements.type.value,
                location: elements.location.value,
            };
        else
            formData = {
                activityType: elements.activityType.value,
                name: elements.name.value,
                description: elements.description.value,
                schedule: elements.schedule.value,
            
                location: elements.location.value,
            };

        // send formData here

    };

    return (
    <div className='create'>
        <h1 className="bigHeader">Create new Extracurricular!</h1>
        <form onSubmit={handleSubmit} method='post'>
            <div className='createBody'>
                <select value={activityType} onChange={e => {setActivityType(e.target.value)}} className='dropdown' id='activityType'>
                    <option value='choose'>Choose an Extracurricular Type...</option>
                    <option value='club'>Club</option>
                    <option value='program'>Program</option>
                    <option value='event'>Event</option>
                    <option value='volunteering'>Volunteering</option>
                </select>
                <input type='text' placeholder='Name' id='name' required/>
                <textarea placeholder='Description...' id='description' rows={6} required/>
                <input type='text' placeholder='Schedule' id='schedule' required/>
                {
                    activityType === 'club' ?
                    <>
                        <input type='text' placeholder='Discord' id='discord' required/>
                        <input type='text' placeholder='Instagram' id='instagram' required/>
                    </> :
                    activityType === 'program' ?
                    <>
                        <input type='text' placeholder='Website' id='website' required/>
                    </> :
                    activityType === 'event' ?
                    <>
                        <input type='text' placeholder='Type' id='type' required/>
                        <input type='text' placeholder='Location' id='location' required/>
                    </> :
                    activityType === 'volunteering' ?
                    <>
                        <input type='text' placeholder='Location' id='location' required/>
                    </> : <></>
                }
                <button type='submit'>Create</button>
                { warning ? <p className='warningText'>Please choose an extracurricular type!</p> : <></> }
            </div>
        </form>
    </div>
  )
}





export default CreatePage;