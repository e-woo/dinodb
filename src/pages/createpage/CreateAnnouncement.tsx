import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

interface CreateElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  body: HTMLInputElement;
}

interface CreateForm extends HTMLFormElement {
  readonly elements: CreateElements;
}

const CreateAnnouncement = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [exec, setExec] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const accountUCID = currentUser?.UCID;

  const supervisorAccount = currentUser?.Supervisor_ID;

  useEffect(() => {
    async function getExecs() {
      const execRes = await axios.post("/program/getExecs", {
        Activity_ID: id,
        isSupervisor: supervisorAccount,
      });

      let execUCIDs;

      if (supervisorAccount) {
        execUCIDs = execRes.data.map(
          (exec: { Supervisor_ID: any }) => exec.Supervisor_ID
        );
      } else {
        execUCIDs = execRes.data.map((exec: { UCID: any }) => exec.UCID);
      }

      setExec(execUCIDs.includes(accountUCID || supervisorAccount));
    }
    getExecs();
  }, []);

  const handleSubmit = async (e: FormEvent<CreateForm>) => {
    e.preventDefault();
    setDuplicateWarning(false);
    const elements = e.currentTarget.elements;
    const formData = {
      id: id,
      title: elements.title.value,
      body: elements.body.value,
      author: currentUser.FName + " " + currentUser.LName,
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    let success = true;
    const result = await axios
      .post("/announcement/post", formData)
      .catch((err) => {
        console.log(err);
        success = false;
        setDuplicateWarning(true);
      });
    if (success) navigate(`../announcements`);
  };

    return (
    <div className='min-h-[60vh]'>
        {exec ? <>
        <h1 className='pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center'>Post Announcement!</h1>
            <form onSubmit={handleSubmit} method='post'>
                <div className='flex flex-col items-center gap-6'>
                    <input type='text' placeholder='Title' id='title' className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-[40px] px-4 py-2 text-sm' required/>
                    <textarea placeholder='Body...' id='body' rows={6} className='w-56 md:w-72 lg:w-96 border-2 border-[#c6c6c6] rounded-2xl px-4 py-2 text-sm resize-none' required/>
                    <button type='submit' className='w-56 md:w-72 lg:w-96 border-2 border-red-500 bg-white rounded-xl py-2 justify-center text-lg font-semibold text-red-500 transition-[.3s] ease-in-out hover:bg-red-500 hover:text-white'>Post</button>
                    {duplicateWarning ? <h3 className='text-red-500 font-semibold'>This title already exists! Please use a different one.</h3> : <></>}
                </div>
            </form>
        </> : <h1 className='pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center'>You do not have permission to access this page!</h1>
        }
    </div>
  );
};

export default CreateAnnouncement;
