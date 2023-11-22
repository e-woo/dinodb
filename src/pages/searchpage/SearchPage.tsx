import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const SearchPage = () => {
  return (
    <div className="search">
      <h1 className="bigHeader">Find An Extracurricular!</h1>
      <input type="text" placeholder="Search..." className="searchBar" />
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
                <input type="checkbox" className="filterCheckbox" id={filter} />
                <label htmlFor={filter}>{filter}</label>
              </li>
            ))}
          </ul>
        </div>
        <div className="searchContent">
          {allPosts.map((row) => (
            <PostsRow posts={row} />
          ))}
        </div>
      </div>
    </div>
  );
};

const filters = ["Club", "Volunteer", "Program", "Event"];

const posts = [
  {
    id: 53,
    title: "Board Game Club",
    desc: "The BGC aims to provide regular, weekly events for members to meet and experience the warmth and interpersonal connections fostered by board gaming. Board games offer a unique experience distinct from video games, or even tabletop games or trading card games.",
    img: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
  },
  {
    id: 123,
    title: "E-Sports Club",
    desc: "The BGC aims to provide regular, weekly event so games, or even tabletop games or trading card games.",
    img: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
  },
  {
    id: 52,
    title: "Clash of Clans Club",
    desc: "lorem",
    img: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
  },
  {
    id: 2,
    title: "Plant Club",
    desc: "The BGC aims to provide regular, weekly events for members to meet and experience the warmth and interpersonal connections fostered by board gaming. Board games offer a unique experience distinct.",
    img: "https://img.freepik.com/free-vector/board-game-collection_52683-47936.jpg?size=626&ext=jpg",
  },
];

const allPosts = [posts, posts];

const PostsRow = ({
  posts,
}: {
  posts: Array<{ id: number; title: string; desc: string; img: string }>;
}) => {
  return (
    <div className="postsRowContainer">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="postImg">
              <img src={post.img} alt="" />
            </div>
            <div className="postContent">
              <Link className="link" to={`/clubs/${post.id}`}>
                <h1 className="postH1">{post.title}</h1>
              </Link>
              <p className="postP">{post.desc}</p>
              <form action={"./clubs/" + post.id}>
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
