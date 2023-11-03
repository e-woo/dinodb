import React from 'react';
import './style.css'
const Login = () => {
    return (
        <div className='form'>
            <div className='auth'>
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
                <h1>Login</h1>
                <form>
                    <div className='text-field'>
                        <input type='email' placeholder='Email' required />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className='text-field'>
                        <input type='password' placeholder='Password' required />
                        <i className='bx bxs-lock-alt' ></i>
                    </div>
                    <button className="btn">Login</button>
                    <div className="register">
                        <p>Don't have an account? <a href='./register'>Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;