import "./App.css";
import User from "./getUser/user";
import AddUser from "./adduser/AddUser";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Update from "./updateuser/Update";
import Signup from "./auth/signup/Signup";
import Login from "./auth/login/Login";
function App() {
  const route = createBrowserRouter([
    {
      path: "/users",
      element: <User />,
    },
    {
      path: "/add",
      element: <AddUser />,
    },
    {
      path: "/update/:id",
      element: <Update />,
    },
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <>
      <div className="All">
        <RouterProvider router={route}></RouterProvider>
      </div>
    </>
  );
}

export default App;
