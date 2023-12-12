import React from "react";
import { Link } from "react-router-dom";

// Footer component represents the page footer containing various sections.
const Footer = () => {
  return (
    <footer className='sticky bottom-0 left-0 w-full py-16 sm:py-20 px-12 sm:px-24 md:px-48 bg-red-500 mt-20'>
        <div className='flex flex-wrap gap-24'>
          <div className='w-1/4'>
            {/* Opportunities column */}
            <h4 className='text-2xl text-[#ffcd00] mb-9 font-semibold relative before:content-[""] before:absolute before:left-0 before:bottom-[-10px] before:bg-red-400 before:h-[2px] before:box-border before:w-12'>
              Explore DinoDB
            </h4>
            <ul>
              {/* Opportunities links */}
              {opportunities.map((item, index) => <li key={index}>
                <Link to={item.link} className='text-lg no-underline font-normal text-[#f5f7f8] block pb-3 transition-[.3s] ease-in-out hover:text-[#ffe57b] hover:pl-2'>
                  {item.name}
                </Link>
              </li>
              )}
            </ul>
          </div>
          <div className='w-1/4'>
            <h4 className='text-2xl text-[#ffcd00] mb-9 font-semibold relative before:content-[""] before:absolute before:left-0 before:bottom-[-10px] before:bg-red-400 before:h-[2px] before:box-border before:w-12'>
              Designed and Developed by
            </h4>
            <ul>
              <li className='text-lg no-underline font-normal text-[#f5f7f8] block pb-3 transition-[.3s] ease-in-out hover:text-[#ffe57b] hover:pl-2'>Ethan Woo</li>
              <li className='text-lg no-underline font-normal text-[#f5f7f8] block pb-3 transition-[.3s] ease-in-out hover:text-[#ffe57b] hover:pl-2'>Joseph Tandyo</li>
              <li className='text-lg no-underline font-normal text-[#f5f7f8] block pb-3 transition-[.3s] ease-in-out hover:text-[#ffe57b] hover:pl-2'>Alejandro Cardona</li>
            </ul>
          </div>
        </div>
    </footer>
  );
};

const opportunities = [
  {
    link: './',
    name: 'Home'
  },
  {
    link: './search',
    name: 'Explore'
  },
  {
    link: './announcements',
    name: 'Announcements'
  },
];

// const announcements = [
//   {
//     link: './news',
//     name: 'News'
//   },
//   {
//     link: './events',
//     name: 'Events'
//   },
//   {
//     link: './calendar',
//     name: 'Calendar'
//   }
// ]

// Exporting Footer component for use in App.tsx
export default Footer;
