import { useNavigate } from "react-router-dom";

const NewCategory = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="form-container">
        <form className="inner-container">
          <h2 className="form-title">New Category</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="enter title"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              type="text"
              name="desc"
              placeholder="enter description"
            />
          </div>
          <div className="form-group">
            <input className="button" type="submit" value={"Add"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCategory;
