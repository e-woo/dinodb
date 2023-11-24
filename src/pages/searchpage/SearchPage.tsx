import React, { useState, FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState(new Set());
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    performSearch();
  }, [])

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
    try {
      const res = await axios.post("/explore/search", { searchTerm, searchFilters: filtersArray });
      setPostsData(res.data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  const performSearch = async () => {
    const filtersArray = Array.from(selectedFilters);
    try {
      const res = await axios.post("/explore/search", { searchTerm, searchFilters: filtersArray });
      setPostsData(res.data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <div className="search">
      <form className="search" onSubmit={handleSubmit}>
        <h1 className="bigHeader">Find An Extracurricular!</h1>
        <input 
          type="text" 
          placeholder="Search..." 
          className="searchBar"
          value={searchTerm}
          onChange={handleSearchChange}  
        />
        <div className="searchBody">
          <div className="filters">
            <ul>
              <li>
                <div className="filtersHeader">
                  <h3 className="filterHeader">Filters</h3>
                </div>
              </li>
              {filters.map((filter, index) => (
                <li key={index} className="filter">
                  <input 
                    type="checkbox" 
                    className="filterCheckbox" 
                    id={filter} 
                    name={filter}
                    onChange={handleFilterChange}
                    />
                  <label htmlFor={filter}>{filter}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="searchContent">
            <div className="searchContent">
              <PostsRow posts={postsData.flat()} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const filters = ["Club", "Volunteer", "Program", "Event"];

interface Post {
  Activity_ID: string;
  Name: string;
  Description: string;
  Img_file_path: string;
  Type: string;
}

const PostsRow = ({
  posts,
}: {
  posts: Array<Post>;
}) => {
  return (
    <div className="postsRowContainer">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.Activity_ID}>
            <div className="postImg">
              <img src={post.Img_file_path|| 'default-image-url.jpg'} alt={post.Name} />
            </div>
            <div className="postContent">
              <Link className="link" to={`/${post.Type}/${post.Activity_ID}`}>
                <h1 className="postH1">{post.Name}</h1>
              </Link>
              <p className="postP">{post.Description}</p>
              <form action={"./" + post.Type + "/" + post.Activity_ID}>
                <button className="postsButton">Learn More</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
