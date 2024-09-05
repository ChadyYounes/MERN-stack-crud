import { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  const deleteUser = (userId) => {
    axios
      .delete(`http://localhost:7000/api/delete/user/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(response.data.message, { position: "top-right" });
      });
  };
  const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    removeCookie("access_token");
    window.localStorage.removeItem("UserID");
    navigate("/");
  };
  return (
    <div className="userTable">
      <div className="d-flex justify-content-between mb-3">
        <Link to="/add" type="button" className="btn btn-primary">
          Add User <i className="fa-solid fa-user-plus"></i>
        </Link>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
      {users.length === 0 ? (
        <div className="text-center">
          <h4>No Data to show</h4>
          <h5>Please add new users.</h5>
        </div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>
                    <Link
                      to={`/update/` + user._id}
                      type="button"
                      className="btn btn-info mx-2"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>

                    <button
                      onClick={() => deleteUser(user._id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default User;
