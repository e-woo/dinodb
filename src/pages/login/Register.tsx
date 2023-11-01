import React from 'react';

const Register = () => {
    return (
        <div className='auth'>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
            <h1>Register</h1>
            <form>
                <div className='text-field'>
                    <div className='name-field'>
                        <span>
                            <input id='first-name-field' type='text' placeholder='First Name' required />
                        </span>
                        <span>
                            <input id='last-name-field' type='text' placeholder='Last Name' required />
                        </span>
                    </div>
                    
                </div>
                <div className='text-field'>
                    <input type='email' placeholder='Email' required />
                    <i className='bx bxs-envelope'></i>
                </div>
                <div className='text-field'>
                    <input type='text' placeholder='UCID' pattern="[0-9]{8}" required />
                    <i className='bx bxs-id-card'></i>
                </div>
                <div className='text-field'>
                    <input type='date' required/>
                    <i className='bx bxs-calendar'></i>
                </div>
                <div className='text-field'>
                    <input type='password' placeholder='Password' required />
                    <i className='bx bxs-lock-alt' ></i>
                </div>
                <div className='text-field'>
                    <input type='password' placeholder='Confirm Password' required />
                    <i className='bx bxs-lock-alt' ></i>
                </div>
                <button className="btn">Register</button>
            </form>
        </div>
    );
}

export default Register;