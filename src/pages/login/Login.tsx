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
        <div className='form'>
            <div className='auth'>
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
                <h1>Login</h1>
                <form>
                    <div className='text-field'>
                        <input name='Email' type='email' placeholder='Email' required onChange={handleChange} />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className='text-field'>
                        <input name='Password' type='password' placeholder='Password' required onChange={handleChange} />
                        <i className='bx bxs-lock-alt' ></i>
                    </div>
                    <button onClick={handleSubmit} className="btn">Login</button>
                    <div className='error-msg'>
                        {err && <p className='error-text'>{err}</p>}
                    </div>
                    <div className="register">
                        <p>Don't have an account? <a href='./register'>Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;