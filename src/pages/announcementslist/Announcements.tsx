import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Announcement } from "../announcementpage/Announcement";
import { handleImgErr } from "../../context/utils";

const Announcements = () => {
  const [posts, setPosts] = useState<Array<Announcement>>([]);
  useEffect(() => {
    async function getAnnouncements() {
      setPosts((await axios.post("/announcement/getAnnouncements")).data);
    }
    getAnnouncements();
  }, []);
  return (
    <div className='flex flex-col gap-8 items-center pt-16'>
      <h1 className='font-extrabold text-6xl text-[#333]'>Announcements</h1>
      <div className='grid lg:grid-cols-2 gap-8 px-12 lg:px-24 no-underline'>
        {posts.map((post) => (
          <div className='flex rounded-md border-4 border-red-500 overflow-hidden transition-[.3s] ease-in-out hover:-translate-y-[5px] shadow-lg' key={post.Activity_ID}>
            <div className='flex-[2] max-h-[200px] w-24 m-5 mr-0'>
              <img src={post.Img_file_path} alt="" className='w-full max-h-full object-cover' onError={handleImgErr()}/>
            </div>
            <div className='flex-[3] flex flex-col justify-between m-5'>
              <div>
                <Link to={`/announcement/${post.Title}`}>
                  <h1 className='text-red-500 text-2xl whitespace-normal overflow-hidden text-ellipsis line-clamp-1'>{post.Title}</h1>
                </Link>
                <div className='flex flex-col text-[#333]'>
                  <p className='text-lg font-bold'>{post.Author}</p>
                  <span className='text-sm'>{new Intl.DateTimeFormat('en-CA', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                    hour12: true
                  }).format(new Date(post.Date))}</span>
                </div>
              </div>

              <div className='text-base whitespace-normal overflow-hidden text-ellipsis line-clamp-1'>
                <p>{post.Announcement}</p>
              </div>
              <Link to={`/announcement/${post.Title}`}>
                <button className='px-5 py-2 rounded-lg bg-[#f5f7f8] border-2 border-red-500 text-red-500 transition-[.3s] ease-in-out hover:border-[#f5f7f8] hover:bg-red-500 hover:text-[#f5f7f8]'>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
