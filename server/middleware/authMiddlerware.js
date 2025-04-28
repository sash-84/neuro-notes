import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // token from "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "No token provided, authorization denied!" });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id).select('-password');

    next(); // go to the next middleware or controller
  } catch (error) {
    res.status(401).json({ message: "Invalid Token!" });
  }
};
