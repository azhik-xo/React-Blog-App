import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import addPostValidator from "../../validators/addPostValidation";

const initialFormData = {
  title: "",
  desc: "",
  category: "",
};

const initialFormError = {
  title: "",
  category: "",
};

const UpdatePost = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [extError, setExtError] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;

  useEffect(() => {
    if (postId) {
      const getPost = async () => {
        try {
          const response = await axios.get(`/post/${postId}`);
          const data = response.data.data;
          setFormData({
            title: data.post.title,
            desc: data.post.desc,
            category: data.post.category._id,
            file: data.post?.file?._id,
          });
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
    const getCategories = async () => {
      try {
        const response = await axios.get(`/category?size=1000`);
        const data = response.data.data;
        setCategories(data.categories);
      } catch (error) {
        const response = error.response;
        const data = response.data;

        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    };

    getCategories();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = addPostValidator({
      title: formData.title,
      category: formData.category,
    });

    if (errors.title) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        const response = await axios.put(`/post/${postId}`, {
          ...formData,
          file: fileId || formData.file, // ✅ use newly uploaded file or existing one
        });
        const data = response.data;

        toast.success(data.message, {
          position: "top-right",
          autoClose: 2000,
        });

        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);

        navigate("/posts");
      } catch (error) {
        setLoading(false);
        const response = error.response;
        const data = response.data;

        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };

  const handleFileChange = async (e) => {
    const formInput = new FormData();
    const file = e.target.files[0];
    if (!file) return;
    formInput.append("image", file);

    const type = e.target.files[0].type;

    if (type === "image/png" || type === "image/jpeg" || type === "image/jpg") {
      setExtError(null);

      try {
        setIsDisable(true);

        const response = await axios.post("/file/upload-file", formInput);
        const data = response.data;
        setFileId(data.data._id);

        toast.success(data.message, {
          position: "top-right",
          autoClose: 2000,
        });

        setIsDisable(false);
      } catch (error) {
        setLoading(false);
        setIsDisable(false);
        const response = error.response;
        const data = response.data;

        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } else {
      setExtError("Only .png or .jpg or .jpeg file allowed");
    }
  };

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Update Post</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="enter title"
              value={formData.title}
              onChange={handleChange}
            />
            {formError.title && <p className="error">{formError.title}</p>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              type="text"
              name="desc"
              placeholder="enter description"
              value={formData.desc}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Select an image</label>
            <input
              className="form-control"
              type="file"
              name="file"
              placeholder="Lorem ipsum"
              onChange={handleFileChange}
            />
            {extError && <p className="error">{extError}</p>}
          </div>
          <div className="form-group">
            <label>Select an category</label>
            <select
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              name="category"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            {formError.category && (
              <p className="error">{formError.category}</p>
            )}
          </div>

          <div className="form-group">
            <input
              className="button"
              type="submit"
              value={loading ? "Updating..." : "Update"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
