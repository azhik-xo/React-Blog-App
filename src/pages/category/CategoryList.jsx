import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import axios from "../../utils/axiosInstance";

import moment from "moment";

import { Modal, Button } from "react-bootstrap";

const CategoryList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [size, setSize] = useState("5");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `/category?page=${currentPage}&size=${size}&q=${search}`
        );
        const data = response.data.data;
        setCategories(data.categories);
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

    getCategories();
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
        `/category?q=${input}&page=${currentPage}`
      );
      const data = response.data.data;
      setCategories(data.categories);
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

  return (
    <div>
      <button
        className="button button-block"
        onClick={() => navigate("new-category")}
      >
        Add New Category
      </button>
      <h2 className="table-title">Category List</h2>
      <div>
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="search here"
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        "Loading..."
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.title}</td>
                <td>{category.desc}</td>
                <td>
                  {moment(category.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <td>
                  {moment(category.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <th>
                  <button
                    className="button"
                    onClick={() => navigate(`update-category/${category._id}`)}
                  >
                    Update
                  </button>
                  <button className="button" onClick={() => setShowModal(true)}>
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete ?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <div style={{ margin: "0 auto" }}>
            <Button className="no-button" onClick={() => setShowModal(false)}>
              No
            </Button>
            <Button className="yes-button">Yes</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoryList;
