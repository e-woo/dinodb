import React, { FormEvent, useState } from 'react'
import './style.css'

interface CreateElements extends HTMLFormControlsCollection   {
    extracurricular: HTMLInputElement;
    title: HTMLInputElement;
    announcement: HTMLInputElement;

}
   
interface CreateForm extends HTMLFormElement {
    readonly elements: CreateElements;
}

const CreateAnnouncement = () => {
    const [extracurricular, setExtracurricular] = useState<string>('');
    const [warning, setWarning] = useState<boolean>(false);
    const handleSubmit = async (e : FormEvent<CreateForm>) => {
        e.preventDefault();
        const elements = e.currentTarget.elements;
        const chosenExtracurricular = e.currentTarget.elements.extracurricular.value;
        
        if (chosenExtracurricular === 'choose') {
            setWarning(true);
            return;
        }
        const formData = {
            extracurricular: elements.extracurricular.value,
            title: elements.title.value,
            announcement: elements.announcement.value
        }
        console.log(formData);
        setWarning(false);
        // send formData here

    };

    return (
    <div className='create'>
        <h1 className="bigHeader">Create an Announcement!</h1>
        <form onSubmit={handleSubmit} method='post'>
            <div className='createBody'>
                {/* select menu to choose which extracurricular to create an announcement for (user must be a higher up)*/}
                <select value={extracurricular} onChange={e => {setExtracurricular(e.target.value)}} className='dropdown' id='extracurricular'>
                    <option value='choose'>Choose an Extracurricular...</option>
                    <option value='club1'>Club1</option>
                    <option value='club2'>Club2</option>
                </select>
                <input type='text' placeholder='Title' id='title' required/>
                <textarea placeholder='Announcement...' id='announcement' rows={6} required/>
                <button type='submit'>Create</button>
                { warning ? <p className='warningText'>Please choose an extracurricular to post to!</p> : <></> }
            </div>
        </form>
    </div>
  )
}





export default CreateAnnouncement;