import { useNavigate } from "react-router-dom";

import placeImg from "../../assets/images/ex.png";

const PostList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="button button-block"
        onClick={() => navigate("new-post")}
      >
        Add New Post
      </button>
      <h2 className="table-title">Post List</h2>

      <input
        className="search-input"
        name="search"
        type="text"
        placeholder="search here"
      />

      <div
        className="flexbox-container wrap"
        onClick={() => navigate("detail-post")}
      >
        <div className="post-card">
          <h4 className="card-title">React blog page</h4>
          <p className="card-desc">Lorem, ipsum dolor.</p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
      </div>
    </div>
  );
};

export default PostList;
