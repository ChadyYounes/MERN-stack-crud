import Admin from "../model/adminModel.js";
import bcrypt, { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists!" });
    }
    const admin = new Admin({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    await admin.save();

    return res.status(200).json({ message: "Admin Created Successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    if (!admins) {
      res.status(404).json({ message: "No admins found!" });
    }
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const foundAdmin = await Admin.findOne({ email });
  if (!foundAdmin) {
    return res.status(404).json({ message: "Wrong Credentials!" });
  }

  const isPasswordValid = await bcrypt.compare(password, foundAdmin.password);
  if (!isPasswordValid) {
    return res
      .status(404)
      .json({ message: "Username or Password not correct!" });
  }

  const token = jwt.sign({ id: foundAdmin._id }, process.env.SECRET);
  return res.status(200).json({ token, adminID: foundAdmin._id });
};
