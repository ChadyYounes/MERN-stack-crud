import express from "express";
import {
  getAllAdmins,
  login,
  register,
} from "../controller/adminController.js";

const authRoutes = express.Router();
authRoutes.post("/register", register);
authRoutes.get("/admins", getAllAdmins);
authRoutes.post("/login", login);
export default authRoutes;
