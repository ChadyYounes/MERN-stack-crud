import { Link, useNavigate } from "react-router-dom";
import "./addUser.css";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();
  function handleInput(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const postUser = async (e) => {
    e.preventDefault();
    await axios
      .post("http://127.0.0.1:7000/api/user", user)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="addUser">
      <Link to="/" type="button" class="btn btn-secondary mb-3">
        <i class="fa-solid fa-backward "></i> Back
      </Link>

      <h4>Add User Form</h4>
      <form className="addUserForm" onSubmit={postUser}>
        <div className="inputGroup">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            placeholder="Enter your name"
            onChange={handleInput}
          ></input>
        </div>
        <div className="inputGroup">
          <label htmlFor="email">E-mail: </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your email"
            onChange={handleInput}
          ></input>
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address: </label>
          <input
            type="text"
            id="address"
            name="address"
            autoComplete="off"
            placeholder="Enter your address"
            onChange={handleInput}
          ></input>
        </div>
        <div className="inputGroup>">
          <button type="submit" class="btn btn-primary w-100  mt-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
