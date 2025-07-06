//import require hooks
import { useState } from "react";

//import toast
import { toast } from "react-toastify";

//import axios for base url
import axios from "../utils/axiosInstance";

//import login validator middleware
import loginValidator from "../validators/loginValidation";

import { useNavigate } from "react-router-dom";

const initialFormData = {
  email: "",
  password: "",
};

const initialFormError = {
  email: "",
  password: "",
};

const Login = () => {
  //getting form data by hooks
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  //useNavigate hook call
  const navigate = useNavigate();

  //onChange event handling function
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //onSubmit event handling function
  const handleSubmit = async (e) => {
    e.preventDefault();

    //login validator middleware to validate the login function
    const errors = loginValidator({
      email: formData.email,
      password: formData.password,
    });

    if (errors.email || errors.password) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        //api request and response
        const response = await axios.post("/auth/sign-in", formData);
        const data = response.data;

        window.localStorage.setItem("blogData", JSON.stringify(data.data));

        // toast message popup function
        toast.success(data.message, {
          position: "top-right",
          autoClose: 2000,
        });

        //back to default
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);

        //final nav to home of a new user
        navigate("/");
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

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} action="" className="inner-container">
        <h2 className="form-title">Login Form</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            placeholder="doe@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          {formError.email && <p className="error">{formError.email}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="******"
            value={formData.password}
            onChange={handleChange}
          />
          {formError.password && <p className="error">{formError.password}</p>}
        </div>

        <div className="form-group">
          <input
            className="button"
            type="submit"
            value={`${loading ? "Logging..." : "Login"}`}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
