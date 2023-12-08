import React, { useContext, useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

const Login = () => {
    const [inputs, setInputs] = useState({
        Email:"",
        Password:"",
    })

    const [err, setError] = useState(null)

    const navigate = useNavigate()

    const { login } = useContext(AuthContext)

    const handleChange = (e: any) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            await login(inputs)
            navigate("/")
        } catch (err: any) {
            setError(err.response.data)
        }
    }

    return (
        <div className='flex justify-center items-center min-h-[100vh] rex-bg'>
            <div className='w-[340px] md:w-[420px] bg-transparent border-2 border-white border-opacity-20 backdrop-blur-[3px] shadow-[0_0_10px_rgba(0,_0,_0,_0.2)] text-white rounded-xl py-7 px-10'>
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
                <h1 className='text-4xl text-center font-bold'>Login</h1>
                <form>
                    <div className='relative w-full h-12 my-8'>
                        <input name='Email' type='email' placeholder='Email' required onChange={handleChange} 
                        className='w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-[40px] text-lg text-white py-5 pl-5 pr-11 placeholder:text-white'/>
                        <i className='bx bxs-user absolute right-5 top-1/2 -translate-y-1/2 text-xl'/>
                    </div>
                    <div className='relative w-full h-12 my-8'>
                        <input name='Password' type='password' placeholder='Password' required onChange={handleChange}
                        className='w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-[40px] text-lg text-white py-5 pl-5 pr-11 placeholder:text-white'/>
                        <i className='bx bxs-lock-alt absolute right-5 top-1/2 -translate-y-1/2 text-xl' />
                    </div>
                    <button onClick={handleSubmit} className='w-full h-11 border-none bg-white outline-none rounded-[40px] shadow-[0_0_10px_rgba(0,_0,_0,_0.2)] text-lg text-black font-semibold'>
                        Login
                    </button>
                    <div className='flex justify-center items-center m-auto text-center'>
                        {err && <p className='text-red font-bold flex justify-center items-center m-auto text-center pt-[1.25em]'>{err}</p>}
                    </div>
                    <div className='text-sm text-center mt-5 mb-4'>
                        <p>Don't have an account? <a href='./register' className='text-white no-underline font-bold hover:underline'>Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;