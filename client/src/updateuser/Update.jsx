import { Link, useNavigate, useParams } from "react-router-dom";
import "./update.css";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Update = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
  });
  const { id } = useParams();

  const navigate = useNavigate();

  function handleInput(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const updateUser = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://127.0.0.1:7000/api/update/user/${id}`, user)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:7000/api/user/${id}`).then((response) => {
      setUser(response.data);
    });
  }, [id]);
  return (
    <div className="addUser">
      <Link to="/" type="button" class="btn btn-secondary mb-3">
        <i class="fa-solid fa-backward "></i> Back
      </Link>

      <h4>Update {user.name}'s info</h4>
      <form className="addUserForm" onSubmit={updateUser}>
        <div className="inputGroup">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
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
            value={user.email}
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
            value={user.address}
            autoComplete="off"
            placeholder="Enter your address"
            onChange={handleInput}
          ></input>
        </div>
        <div className="inputGroup>">
          <button type="submit" class="btn btn-primary w-100  mt-2">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
