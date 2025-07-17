import placeImg from "../../assets/images/ex.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import axios from "../../utils/axiosInstance";

import moment from "moment";

const DetailPost = () => {
  const [post, setPost] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;

  useEffect(() => {
    if (postId) {
      const getPost = async () => {
        try {
          const response = await axios.get(`/post/${postId}`);
          const data = response.data.data;
          setPost(data.post);
        } catch (error) {
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: "top-right",
            autoClose: 2000,
          });
        }
      };

      getPost();
    }
  }, [postId]);

  useEffect(() => {
    if (post && post?.file) {
      const getFile = async () => {
        try {
          const response = await axios.get(
            `/file/signed-url?key=${post.file.key}`
          );
          const data = response.data.data;
          setFileUrl(data.url);
        } catch (error) {
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: "top-right",
            autoClose: 2000,
          });
        }
      };

      getFile();
    }
  }, [post]);

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
        <h2 className="post-title">{post?.title}</h2>
        <h5 className="post-category">Category:{post?.category?.title}</h5>
        <h5 className="post-category">
          {moment(post?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </h5>
        <h5 className="post-category">
          {moment(post?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
        </h5>
        <p className="post-desc">{post?.desc}</p>

        <div
          style={{
            width: "400px",
            height: "500px",
            height: "auto",
            float: "left",
            margin: "3px",
            padding: "3px",
          }}
        >
          <img
            style={{ "max-width": "100%", height: "auto" }}
            src={fileUrl}
            alt="mern"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
