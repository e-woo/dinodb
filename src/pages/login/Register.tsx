import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    UCID: "",
    DOB: "",
    Bio: "",
    FName: "",
    LName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    AccountType: "STUDENT",
  });

  const [isExecutive, setIsExecutive] = useState(false);
  const [isSupervisor, setIsSupervisor] = useState(false);

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
      if (e.target.id === "isExecutive") {
        setIsExecutive(e.target.checked);
        if (e.target.checked) {
          setIsSupervisor(!e.target.checked);
        }
        setInputs((prev) => ({
          ...prev,
          AccountType: e.target.checked ? "EXECUTIVE" : "STUDENT",
        }));
      } else if (e.target.id === "isSupervisor") {
        setIsSupervisor(e.target.checked);
        if (e.target.checked) {
          setIsExecutive(!e.target.checked);
        }
      }
    } else {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (inputs.Password !== inputs.ConfirmPassword) {
      setError("Passwords do not match!" as any);
      return;
    }
    if (!isSupervisor) {
      try {
        const res = await axios.post("/auth/register", inputs);
        navigate("/login");
      } catch (err: any) {
        setError(err.response.data);
      }
    } else {
      try {
        const res = await axios.post("/auth/registerSupervisor", inputs);
        navigate("/login");
      } catch (err: any) {
        setError(err.response.data);
      }
    }
  };

  return (
    <div className='flex justify-center items-center min-h-[100vh] rex-bg'>
      <div className='w-[340px] md:w-[420px] bg-transparent border-2 border-white border-opacity-20 backdrop-blur-[3px] shadow-[0_0_10px_rgba(0,_0,_0,_0.2)] text-white rounded-xl py-7 px-10'>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <h1 className='text-4xl text-center font-bold'>Register</h1>
        <form>
          <div className='relative w-full h-12 my-8'>
            <div className='h-12 my-7 mx-auto flex flex-row justify-between'>
              <span className='w-[47%]'>
                <input
                  name="FName"
                  id="first-name-field"
                  type="text"
                  placeholder="First Name"
                  required
                  onChange={handleChange}
                  className='w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-[40px] text-sm md:text-base text-white py-5 px-5 placeholder:text-white'
                />
              </span>
              <span className='w-[47%]'>
                <input
                  name="LName"
                  id="last-name-field"
                  type="text"
                  placeholder="Last Name"
                  required
                  onChange={handleChange}
                  className='w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-[40px] text-sm md:text-base text-white py-5 px-5 placeholder:text-white'
                />
              </span>
            </div>
          </div>
          <div className='flex justify-center items-center w-full h-12 my-8'>
              <div className='w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-[40px] text-lg text-white py-5 px-8 placeholder:text-white flex flex-row items-center justify-between'>
              <label htmlFor="isExecutive" className='text-sm md:text-base'>Register as Club Executive</label>
              <input
                type="checkbox"
                id="isExecutive"
                checked={isExecutive}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='flex justify-center items-center w-full h-12 my-8'>
            <div className='w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-[40px] text-lg text-white py-5 px-8 placeholder:text-white flex flex-row items-center justify-between'>
              <label htmlFor="isSupervisor" className='text-sm md:text-base'>Register as Supervisor</label>
              <input
                type="checkbox"
                id="isSupervisor"
                checked={isSupervisor}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='relative w-full h-12 my-8'>
            <input
              name="Email"
              type="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className='w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-[40px] text-lg text-white py-5 pl-5 pr-11 placeholder:text-white'
            />
            <i className='bx bxs-envelope absolute right-5 top-1/2 -translate-y-1/2 text-xl' />
          </div>
          {!isSupervisor ? 
          <>
            <div className='relative w-full h-12 my-8'>
              <input
                name="UCID"
                type="text"
                placeholder="UCID"
                pattern="[0-9]{8}"
                required
                onChange={handleChange}
                className='w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-[40px] text-lg text-white py-5 pl-5 pr-11 placeholder:text-white'
              />
              <i className='bx bxs-id-card absolute right-5 top-1/2 -translate-y-1/2 text-xl'/>
            </div>
            <div className='relative w-full h-12 my-8'>
              <input
                name="DOB"
                type="text"
                placeholder="Date of Birth"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={DateOnBlur}
                required
                onChange={handleChange}
                className='w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-[40px] text-lg text-white py-5 pl-5 pr-11 placeholder:text-white'
              />
              <i className='bx bxs-calendar absolute right-5 top-1/2 -translate-y-1/2 text-xl'/>
            </div>
          </> : null
          }
          <div className='relative w-full h-12 my-8'>
            <input
              name="Password"
              type="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className='w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-[40px] text-lg text-white py-5 pl-5 pr-11 placeholder:text-white'
            />
            <i className='bx bxs-lock-alt absolute right-5 top-1/2 -translate-y-1/2 text-xl'/>
          </div>
          <div className='relative w-full h-12 my-8'>
              <input
              name='ConfirmPassword'
              type='password'
              placeholder='Confirm Password'
              className='w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-[40px] text-lg text-white py-5 pl-5 pr-11 placeholder:text-white'
              onChange={handleChange}
              required />
            <i className='bx bxs-lock-alt absolute right-5 top-1/2 -translate-y-1/2 text-xl'/>
          </div>
          <button onClick={handleSubmit} className='w-full h-11 border-none bg-white outline-none rounded-[40px] shadow-[0_0_10px_rgba(0,_0,_0,_0.2)] text-lg text-black font-semibold'>
            Register
          </button>
          {err && <p className='text-red-500 font-bold flex justify-center items-center m-auto text-center pt-[1.25em]'>{err}</p>}
          <div className='text-sm text-center mt-5 mb-4'>
            <p>
              Have an account? <a href="./login" className='text-white no-underline font-bold hover:underline'>Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const DateOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
  if (e.target.value === "") e.target.type = "text";
};

export default Register;
