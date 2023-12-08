import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Announcement } from "../../pages/announcementpage/Announcement";
import axios from "axios";

export const Menu = () => {

  const [posts, setPosts] = useState<Announcement[]>([]);

  useEffect(() => { 
    async function getAnnouncements() {
      const res = await axios.post('/announcement/getAnnouncements');
      const p = [];
      for (let i = 0; i < 4; i++) {
        if (i >= (res.data as Announcement[]).length)
          break;
        p.push(res.data[i]);
      }
      setPosts(p);
    }
    getAnnouncements();
  }, []) 


  return (
    <div className='flex flex-col m-8 items-center'>
      {/* Header of menu */}
      <h1 className='text-2xl font-bold text-center py-2'>More Announcements</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-16 justify-center align-center'>
        {/* Mapping through the posts array and rendering individual post components */}
        {posts.map((post) => (
          <div className='flex-1 h-[420px] p-5 rounded-md border-red-500 border-4 overflow-hidden flex flex-col justify-between transition-[.3s] ease-in-out' key={post.Activity_ID}>
            <div className='max-h-[300px] relative overflow-hidden'>
              <img src={post.Img_file_path} className='w-full max-h-full object-cover'/>
            </div>
            <div className='flex-[2] flex flex-col justify-between'>
              <div>
              <Link to={`/announcement/${post.Title}`} onClick={async () => {await new Promise(r => setTimeout(r, 20)); window.location.reload()}}>
                  <h2 className='text-red-500 my-2 text-2xl whitespace-normal overflow-hidden text-ellipsis line-clamp-1 font-bold'>{post.Title}</h2>
                </Link>
                <div className='text-sm whitespace-normal overflow-hidden text-ellipsis line-clamp-3'>
                  <div className='flex flex-col'>
                    <p className='text-lg font-bold'>{post.Author}</p>
                    <span>{post.Date ? new Intl.DateTimeFormat('en-CA', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                    hour12: true
                  }).format(new Date(post.Date)) : ''}</span>
                  </div>
                  <p>{post.Announcement}</p>
                </div>
              </div>

              <Link to={`/announcement/${post.Title}`} onClick={async () => {await new Promise(r => setTimeout(r, 20)); window.location.reload()}}>
                <button className='px-5 py-2 rounded-lg bg-[#f5f7f8] border-2 border-red-500 text-red-500 transition-[.3s] ease-in-out hover:border-[#f5f7f8] hover:bg-red-500 hover:text-[#f5f7f8]'>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
