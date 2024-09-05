import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export default function Signup() {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  function handleInput(e) {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
    console.log(admin);
  }
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://127.0.0.1:7000/api/register", admin)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/login");
      });
  };
  return (
    <div className="addUser">
      <h4>Register Admin Form</h4>
      <form className="addUserForm" onSubmit={onSubmit}>
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
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Enter your password"
            onChange={handleInput}
          ></input>
        </div>

        <div className="inputGroup>">
          <div>
            <Link to="/login">Already have an account?</Link>
          </div>
          <button type="submit" className="btn btn-primary w-100  mt-2">
            Sign up{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
