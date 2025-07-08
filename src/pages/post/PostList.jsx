import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axios from "../../utils/axiosInstance";

import placeImg from "../../assets/images/ex.png";

const PostList = () => {
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [size, setSize] = useState("5");
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `/post?page=${currentPage}&size=${size}&q=${search}`
        );
        const data = response.data.data;
        setPosts(data.posts);
        setTotalPage(data.pages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        const response = error.response;
        const data = response.data;

        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    };

    getPosts();
  }, [currentPage, size, search]);

  useEffect(() => {
    if (totalPage > 1) {
      let tempPageCount = [];

      for (let i = 1; i <= totalPage; i++) {
        tempPageCount = [...tempPageCount, i];
      }

      setPageCount(tempPageCount);
    } else {
      setPageCount([]);
    }
  }, [totalPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSize = (e) => {
    setSize(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = async (e) => {
    try {
      const input = e.target.value;
      setSearch(input);

      const response = await axios.get(
        `/post?q=${input}&page=${currentPage}`
      );
      const data = response.data.data;
      setPosts(data.posts);
      setTotalPage(data.pages);
    } catch (error) {
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

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
        onChange={handleSearch}
      />

      <div className="flexbox-container wrap">
        {loading
          ? "Loading..."
          : posts.map((post) => (
              <div
                className="post-card"
                key={post._id}
                onClick={() => navigate("detail-post")}
              >
                <h4 className="card-title">{post.title}</h4>
                <p className="card-desc">{post.desc.substring(0, 50)}</p>
              </div>
            ))}
      </div>

      {pageCount.length > 0 && (
        <div className=" pag-container">
          <button
            className="pag-button"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            prev
          </button>
          {pageCount.map((pageNumber, index) => (
            <button
              className="pag-button"
              onClick={() => handlePage(pageNumber)}
              key={index}
              style={{
                backgroundColor: currentPage === pageNumber ? "#ccc" : "",
              }}
            >
              {pageNumber}
            </button>
          ))}

          <button
            className="pag-button"
            onClick={handleNext}
            disabled={currentPage === totalPage}
          >
            next
          </button>
        </div>
      )}

      <select className="select-input" value={size} onChange={handleSize}>
        <option value="2">2 per page</option>
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="20">20 per page</option>
      </select>
    </div>
  );
};

export default PostList;
