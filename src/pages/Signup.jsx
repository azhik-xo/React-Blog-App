//import required hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import toast
import { toast } from "react-toastify";

//import axios for base url
import axios from "../utils/axiosInstance";

//import signup validator middleware
import signupValidator from "../validators/signupValidator";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialFormError = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  //form data getting hooks
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //onChange event handling function
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //onSubmit event handling function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // signup validator middleware to validate the signup function
    const errors = signupValidator({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    if (
      errors.name ||
      errors.email ||
      errors.password ||
      errors.confirmPassword
    ) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        //api request and response
        const requestBody = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        const response = await axios.post("/auth/sign-up", requestBody);
        const data = response.data;

        // toast message popup function
        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
        });

        //back to default
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);

        //final nav to login page or end of signup of a new user
        navigate("/login");
      } catch (error) {
        setLoading(false);
        const response = error.response;
        const data = response.data;

        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} action="" className="inner-container">
        <h2 className="form-title">Signup Form</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Jhon doe"
            value={formData.name}
            onChange={handleChange}
          />
          {formError.name && <p className="error">{formError.name}</p>}
        </div>
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
            placeholder="*****"
            value={formData.password}
            onChange={handleChange}
          />
          {formError.password && <p className="error">{formError.password}</p>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            className="form-control"
            type="password"
            name="confirmPassword"
            placeholder="*****"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {formError.confirmPassword && (
            <p className="error">{formError.confirmPassword}</p>
          )}
        </div>
        <div className="form-group">
          <input
            className="button"
            type="submit"
            value={`${loading ? "Saving" : "Signup"}`}
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
