import React, { useContext, useState, FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { handleImgErr } from "../../context/utils";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState(new Set());
  const [postsData, setPostsData] = useState<Array<Post>>([]);

  const { currentUser } = useContext(AuthContext);
  const Member_UCID = currentUser?.UCID;
  const accountType = currentUser?.AccountType;

  const supervisorAccount = currentUser?.Supervisor_ID;

  useEffect(() => {
    performSearch();
  }, [selectedFilters]);

  const isSupervisor = () => {
    return accountType === null || supervisorAccount != null;
  };

  const filters = isSupervisor()
    ? ["Program", "Event"]
    : ["Club", "Volunteer", "Program", "Event"];

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: any) => {
    const filter = e.target.name;
    if (selectedFilters.has(filter)) {
      selectedFilters.delete(filter);
    } else {
      selectedFilters.add(filter);
    }
    setSelectedFilters(new Set(selectedFilters));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPostsData([]);
    const filtersArray = Array.from(selectedFilters);
    console.log("searchTerm " + searchTerm);
    try {
      const res = await axios.post("/explore/search", {
        searchTerm,
        searchFilters: filtersArray,
      });
      setPostsData(res.data);

      console.log("resdata " + res.data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const performSearch = async () => {
    setPostsData([]);
    const filtersArray = Array.from(selectedFilters);
    try {
      const res = await axios.post("/explore/search", {
        searchTerm,
        searchFilters: filtersArray,
      });
      setPostsData(res.data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const getFilteredPosts = () => {
    if (isSupervisor()) {
      return postsData.filter(
        (post) => post.Type === "program" || post.Type === "event"
      );
    }
    return postsData;
  };

  return (
    <div>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <h1 className='pt-16 pb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333] text-center'>Find An Extracurricular!</h1>
        <input 
          type="text" 
          placeholder="Search..." 
          className='self-center w-[75vw] max-w-[700px] border-2 border-[#535353] border-opacity-20 py-4 px-11 m-10 text-xl rounded-[40px]'
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className='flex flex-col md:flex-row justify-center'>
          <div className='h-fit bg-white mt-12 mx-10 border-[3px] border-[#3f3f3f] border-opacity-20 rounded-xl overflow-hidden'>
            <ul>
              <li>
                <div className='bg-red-500 p-2'>
                  <h3 className='text-center text-white text-xl'>Filters</h3>
                </div>
              </li>
              {filters.map((filter, index) => (
                <li key={index} className='py-2 px-8 bg-[#f1f1f1] text-lg border border-b-[#3f3f3f] border-opacity-20 last:border-0'>
                  <input 
                    type="checkbox" 
                    className='w-5 h-5 my-[6px] mx-3' 
                    id={filter} 
                    name={filter}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor={filter}>{filter}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className='p-8 md:p-0 md:w-[70%]'>
            <PostsRow posts={postsData.flat()} />
          </div>
        </div>
      </form>
    </div>
  );
};

interface Post {
  Activity_ID: string;
  Name: string;
  Description: string;
  Img_file_path: string;
  Type: string;
}

const PostsRow = ({ posts }: { posts: Array<Post> }) => {
  return (
    <div className='xl:m-8 justify-self-end h-auto flex flex-wrap w-full'>
      <div className='overflow-hidden flex flex-col justify-center items-center md:grid md:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
        {posts.map((post) => (
          <div className='bg-white border-2 border-[#535353] border-opacity-20 rounded-xl w-auto flex flex-col justify-center items-center p-2' key={post.Activity_ID}>
            <div className='flex-none h-52 w-full overflow-hidden'>
              <img src={post.Img_file_path|| 'default-image-url.jpg'} alt={post.Name} className='w-full max-h-full object-cover' />
            </div>
            <div className='flex-2 flex flex-col justify-center items-center gap-2'>
              <Link className="link" to={`/${post.Type}/${post.Type === 'event' ? post.Name : post.Activity_ID}`}>
                <h1 className='text-2xl whitespace-normal overflow-hidden text-ellipsis line-clamp-1'>{post.Name}</h1>
              </Link>
              <p className='text-base whitespace-normal overflow-hidden text-ellipsis line-clamp-3 text-[#333]'>{post.Description}</p>
              <form action={`./${post.Type}/${post.Type === 'event' ? post.Name : post.Activity_ID}`}>
                <button className='w-max py-2 px-5 rounded-xl bg-white border-2 border-red-500 text-red-500 transition-[.3s] ease-linear hover:border-[#f5f7f8] hover:bg-red-500 hover:text-[#f5f7f8]'>Learn More</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
