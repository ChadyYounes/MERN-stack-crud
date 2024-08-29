import "./App.css";
import User from "./getUser/user";
import AddUser from "./adduser/AddUser";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Update from "./updateuser/Update";
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
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
