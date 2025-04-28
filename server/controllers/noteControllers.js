import Note from "../models/noteModel.js";
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const createNote = async (req, res) => {
    const {title, content} = req.body;

    try {
        const note = await Note.create({
            title, content,
            userId : req.user.id,
        });
        res.status(201).json({message: "Note created successfully!", note});
    } catch (error) {
        res.status(500).json({message: "error creating note", error});
    }
};

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({userId: req.user.id}).sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({message: "error fetching notes", error});
    }
};

export const updateNote = async (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(id, {title, content}, {new:true});
        res.status(200).json({message: "note updated sucessfully", updatedNote});
    } catch (error) {
        res.status(500).json({message: "error updating note", error});
    }
};

export const deleteNote = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedNote = await Note.findByIdAndDelete(id);
        res.status(200).json({message: "note deleted sucessfully", deletedNote});
    } catch (error){
        res.status(500).json({message: "error deleting note", error});
    }
};

export const summarizeNote = async (req, res) => {
    console.log('Reached summarize route.');
    const { content } = req.body;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(`Summarize this note:\n${content}`);
      const response = await result.response;
      const summary = response.text();
      console.log('Gemini Response:', response.text());
      res.json({ summary });
    } catch (error) {
      console.error('Error summarizing note:', error);
      res.status(500).json({ message: 'Error summarizing note' });
    }
  }