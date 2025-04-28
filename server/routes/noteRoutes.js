import express from "express";
import {createNote, getNotes, updateNote, deleteNote, summarizeNote} from "../controllers/noteControllers.js";
import {protect} from "../middleware/authMiddlerware.js"

const router = express.Router();

router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);
router.post('/summarize', protect, summarizeNote );

export default router;