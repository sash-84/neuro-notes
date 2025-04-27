import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const register = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashed});
        res.status(201).json({message : "User created successfully!", user});
    } catch (error) {
        res.status(500).json({message: "Error creating user!", error})
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid user!"});
        console.log(user);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if(!isMatch) return res.status(400).json({message: "Incorrect password!"});

        const token = jwt.sign({id: user._id}, JWT_SECRET_KEY, {expiresIn: '7d'});

        res.status(200).json({token, user: { id: user._id, email: user.email, name: user.name}});
    } catch (error) {
        res.status(500).json({message: "Error logging in", error: error.message});
    }
}