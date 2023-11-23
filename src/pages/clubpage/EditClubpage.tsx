import React, { FormEvent, useState } from 'react'
import './style.css'

interface CreateElements extends HTMLFormControlsCollection   {
    name: HTMLInputElement;
    description: HTMLInputElement;
    schedule: HTMLInputElement;

    discord: HTMLInputElement;
    instagram: HTMLInputElement;
}
   
interface CreateForm extends HTMLFormElement {
    readonly elements: CreateElements;
}

const EditClubPage = () => {
    const handleSubmit = async (e : FormEvent<CreateForm>) => {
        e.preventDefault();
        const elements = e.currentTarget.elements;
        const formData = {
            name: elements.name.value,
            description: elements.description.value,
            schedule: elements.schedule.value,
            
            discord: elements.discord.value,
            instagram: elements.instagram.value
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
                    <input type='text' placeholder='Name' id='name' required/>
                    <textarea placeholder='Description...' id='description' rows={6} />
                    <input type='text' placeholder='Schedule' id='schedule' />
                    <input type='text' placeholder='Discord' id='discord' />
                    <input type='text' placeholder='Instagram' id='instagram' />
                    <input type='text' placeholder='Image link' id='img_file_path' required/>
                    <button type='submit'>Confirm</button>
                </div>
            </form>
        </> : <h1 className="bigHeader">You do not have permission to access this.</h1>
        }
    </div>
  )
}

export default EditClubPage;