import React, { FormEvent, useState } from 'react'
import './style.css'

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
    const handleSubmit = async (e : FormEvent<CreateForm>) => {
        e.preventDefault();
        const elements = e.currentTarget.elements;
        const formData = {
            name: elements.name.value,
            description: elements.description.value,
            schedule: elements.schedule.value,
            
            type: elements.type.value,
            location: elements.location.value
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
                    <input type='text' placeholder='Name' id='name' required/>
                    <textarea placeholder='Description...' id='description' rows={6} required/>
                    <input type='text' placeholder='Schedule' id='schedule' required/>
                    <input type='text' placeholder='Type' id='type' required/>
                    <input type='text' placeholder='Location' id='location' required/>
                    <button type='submit'>Confirm</button>
                </div>
            </form>
        </> : <h1 className="bigHeader">You do not have permission to access this.</h1>
        }
    </div>
  )
}

export default EditEventPage;