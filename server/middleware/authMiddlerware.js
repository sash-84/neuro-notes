import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // token from "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "No token provided, authorization denied!" });
    }

    const decoded = jwt.verify(token, JWT_KEY);
    req.user = decoded; // we can access user id now as req.user.id

    next(); // go to the next middleware or controller
  } catch (error) {
    res.status(401).json({ message: "Invalid Token!" });
  }
};
