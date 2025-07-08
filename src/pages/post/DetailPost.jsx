import placeImg from "../../assets/images/ex.png";
import { useNavigate } from "react-router-dom";

const DetailPost = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <button
        className="button button-block"
        onClick={() => navigate("/posts/update-post")}
      >
        Update post
      </button>
      <div className="detail-container">
        <h2 className="post-title">New Post</h2>
        <h5 className="post-category">Category: Category 1</h5>
        <h5 className="post-category">Created at: Category 1</h5>
        <h5 className="post-category">Updated at: Category 1</h5>
        <p className="post-desc">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa
          corrupti alias ab soluta perferendis, odio debitis? Assumenda minima,
          magni quae, odit cupiditate ea sit tenetur, ipsam earum itaque cumque
          quisquam.
        </p>

        <img src={placeImg} alt="mern" />
      </div>
    </div>
  );
};

export default DetailPost;
