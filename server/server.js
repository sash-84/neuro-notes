import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;

connectDB();

app.use("/api/user",userRoutes);

app.listen(5000, () => {
    console.log(`Connected to the server on PORT ${PORT}`);
});