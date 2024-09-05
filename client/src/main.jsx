import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Auth from "./auth/signup/Signup.jsx";
import { BrowserRouter } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
);
