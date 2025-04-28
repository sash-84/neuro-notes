import React from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import toast from "react-hot-toast";

const EditNode = () => {

  const {editingNote, setEditingNote, setNotes, notes} = useAppContext();

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/notes/${editingNote._id}`,
        editingNote,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      console.log('Updated note data:', data);
      setNotes(notes.map((note) => (note._id === data.updatedNote._id ? data.updatedNote : note)));
      setEditingNote(null);
      toast.success("Node editted!");
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <form className=" bg-white text-gray-500 max-w-[340px] mx-4 p-6 text-left text-sm rounded-lg border border-gray-300/60">
        <label className="font-medium" htmlFor="email">Title</label>
        <input
            value={editingNote.title}
            onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })} 
            className="w-full border mt-1.5 mb-4 border-gray-500/30 outline-none rounded py-2.5 px-3" 
            type="text"  />
        <label className="font-medium" htmlFor="content">Content</label>
        <textarea 
            value={editingNote.content}
            onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
            rows="3"
            className="w-full resize-none border mt-1.5 border-gray-500/30 outline-none rounded py-2.5 px-3">
        </textarea>
        <div className="flex items-center justify-between">
            <button
                type='submit'
                onClick={handleUpdateNote}
                disabled={!editingNote.title || !editingNote.content}
                className="my-3 bg-indigo-500 py-2 px-5 rounded text-white font-medium">
                Save Note
            </button>
        </div>
    </form>
  )
}

export default EditNode