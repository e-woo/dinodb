import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./rexlogo.png";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const [menuOverlayOpen, setMenuOverlayOpen] = useState(false);
  const accountType = currentUser?.AccountType;
  const supervisorAccount = currentUser?.Supervisor_ID;

  return (
    <div className='sticky top-0 z-50'>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
      <div className='w-full h-32 bg-[#eef0f1] py-4 px-6 sm:px-12 md:px-24 flex justify-between items-center border-b-2 border-b-black/10'>
        <a href="/" className='text-decoration-none flex items-center gap-4 cursor-pointer h-full'>
            <img src={Logo} alt="DinoDB logo" className='h-3/4' />
          <div className='text-4xl md:text-5xl font-extrabold text-decoration-none text-red-500'>DinoDB</div>
        </a>
        <div className='block lg:hidden'> {/* Mobile menu button */}
          {
            menuOverlayOpen ? (
							<button onClick={() => setMenuOverlayOpen(false)} className='flex items-center px-3 py-2 border-2 rounded-lg border-red-500 text-red-500 hover:border-rose-600'>
								<i className='bx bx-x text-red-500 text-3xl'></i>
							</button>
						) : (
							<button onClick={() => setMenuOverlayOpen(true)} className='flex items-center px-3 py-2 border-2 rounded-lg border-red-500 text-red-500 hover:border-rose-600'>
								<i className='bx bx-menu text-red-500 text-3xl'></i>
							</button>
						)
          }
        </div>
        <nav className='hidden lg:flex items-center gap-10'>
          <Link to={"./"} className={linkCSS}>
            Home
          </Link>
          {accountType === 'EXECUTIVE' ?
          <Link to={"./create"} className={linkCSS}>
            Create
          </Link>
          : null}
          <Link to={"./search"} className={linkCSS}>
            Explore
          </Link>
          <Link to={"./announcements"} className={linkCSS}>
            Announcements
          </Link>
          {currentUser ?
          <Link to={"./profile"} className={linkCSS}>
            Profile
          </Link> : null}
          {currentUser ? 
            <span className='cursor-pointer w-20 h-10 py-3 rounded-lg bg-red-500 hover:bg-rose-600 transition-[.3s] flex items-center justify-center'>
              <Link onClick={logout} to={"/"} className='relative text-lg font-extrabold text-white' id="sign-in">
                Logout
              </Link>
            </span> 
            : 
            <span className='cursor-pointer w-20 h-10 py-3 rounded-lg bg-red-500 hover:bg-rose-600 transition-[.3s] flex items-center justify-center'>
              <Link to={"./login"} className='relative text-lg font-extrabold text-white' id="sign-in">
                Sign in
              </Link>
            </span>}
        </nav>
      </div>

      {menuOverlayOpen ? <div className='absolute flex flex-col gap-4 py-4 items-center w-full bg-[#e3e5e6]'> {/* Mobile menu overlay */}
        <Link to={"./"} className={linkCSS} onClick={() => setMenuOverlayOpen(false)}>
          Home
        </Link>
        {accountType === 'EXECUTIVE' ?
        <Link to={"./create"} className={linkCSS} onClick={() => setMenuOverlayOpen(false)}>
          Create
        </Link>
        : null}
        <Link to={"./search"} className={linkCSS} onClick={() => setMenuOverlayOpen(false)}>
          Explore
        </Link>
        <Link to={"./announcements"} className={linkCSS} onClick={() => setMenuOverlayOpen(false)}>
          Announcements
        </Link>
        {currentUser ?
        <Link to={"./profile"} className={linkCSS} onClick={() => setMenuOverlayOpen(false)}>
          Profile
        </Link> : null}
        {currentUser ? 
          <span className='cursor-pointer w-20 h-10 py-3 rounded-lg bg-red-500 hover:bg-rose-600 transition-[.3s] flex items-center justify-center'>
            <Link onClick={() => {setMenuOverlayOpen(false); logout()}} to={"/"} className='relative text-lg font-extrabold text-white' id="sign-in">
              Logout
            </Link>
          </span> 
          : 
          <span className='cursor-pointer w-20 h-10 py-3 rounded-lg bg-red-500 hover:bg-rose-600 transition-[.3s] flex items-center justify-center'>
            <Link to={"./login"} className='relative text-lg font-extrabold text-white' id="sign-in" onClick={() => setMenuOverlayOpen(false)}>
              Sign in
            </Link>
          </span>}
        </div> : <></>}
    </div>
  );
};

const linkCSS = 'relative text-lg font-medium no-underline text-red-500 before:content-[""] before:absolute before:top-full before:left-0 before:w-0 before:h-[2px] before:bg-red-500 before:hover:w-full before:transition-[.3s]';

export default Navbar;
