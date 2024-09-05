import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import User from "../../getUser/user";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate(); // Added useNavigate for navigation
  const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:7000/api/login", {
        email,
        password,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("UserID", response.data.adminID);
      navigate("/users");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="addUser">
      <>
        <Link to="/" type="button" className="btn btn-secondary mb-3">
          <i className="fa-solid fa-backward"></i> Sign up
        </Link>
        <h4>Login as Admin</h4>
        <form className="addUserForm" onSubmit={onSubmit}>
          <div className="inputGroup">
            <label htmlFor="email">E-mail: </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <button type="submit" className="btn btn-primary w-100 mt-2">
              Login
            </button>
          </div>
        </form>
      </>
    </div>
  );
}
