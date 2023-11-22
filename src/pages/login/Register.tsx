import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [inputs, setInputs] = useState({
        UCID:"",
        DOB:"",
        Bio:"",
        FName:"",
        LName:"",
        Email:"",
        Password:"",
        AccountType:"STUDENT",
    })

    const [err, setError] = useState(null)

    const navigate = useNavigate()

    const handleChange = (e: any) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            await axios.post("/auth/register", inputs)
            navigate("/login")
        } catch (err: any) {
            setError(err.response.data)
        }
    }

    console.log(inputs)

    return (
        <div className='form'>
            <div className='auth'>
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
                <h1>Register</h1>
                <form>
                    <div className='text-field'>
                        <div className='name-field'>
                            <span>
                                <input name='FName' id='first-name-field' type='text' placeholder='First Name' required onChange={handleChange} />
                            </span>
                            <span>
                                <input name='LName' id='last-name-field' type='text' placeholder='Last Name' required onChange={handleChange} />
                            </span>
                        </div>
                        
                    </div>
                    <div className='text-field'>
                        <input name='Email' type='email' placeholder='Email' required onChange={handleChange} />
                        <i className='bx bxs-envelope'></i>
                    </div>
                    <div className='text-field'>
                        <input name='UCID' type='text' placeholder='UCID' pattern="[0-9]{8}" required onChange={handleChange} />
                        <i className='bx bxs-id-card'></i>
                    </div>
                    <div className='text-field'>
                        <input name='DOB' type="text" placeholder="Date of Birth"
                        onFocus={e => e.target.type='date'}
                        onBlur={DateOnBlur} required onChange={handleChange} />
                        <i className='bx bxs-calendar'></i>
                    </div>
                    <div className='text-field'>
                        <input name='Password' type='password' placeholder='Password' required onChange={handleChange} />
                        <i className='bx bxs-lock-alt' ></i>
                    </div>
                    <div className='text-field'>
                        <input type='password' placeholder='Confirm Password' required />
                        <i className='bx bxs-lock-alt' ></i>
                    </div>
                    <button onClick={handleSubmit} className="btn">Register</button>
                    {err && <p className='error-text'>{err}</p>}
                    <div className="register">
                        <p>Have an account? <a href='./login'>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

const DateOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.value === '') 
        e.target.type = 'text';
}

export default Register;