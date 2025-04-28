import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt } from "react-icons/fa";
import CreateNode from "../components/CreateNode";
import EditNode from '../components/EditNode';
import { useAppContext } from '../context/AppContext';
import toast from "react-hot-toast";

const NotesPage = () => {

  const {setNotes, notes, showCreateNote, setShowCreateNote, editingNote, setEditingNote} = useAppContext();

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/notes', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log(data);
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
      toast.success("Note deleted!");
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleSummarize = async (id, content) => {
    try {
      const res = await axios.post('http://localhost:5000/api/notes/summarize', { content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const summary = res.data.summary;
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note._id === id ? { ...note, summary } : note
        )
      );
      toast.success('Summary generated!');
    } catch (err) {
      console.log('Error summarizing:', err);
      toast.error('Failed to summarize');
    }
  };
  

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container mx-auto px-4 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png')] min-h-screen py-30">

      {/* Create Note Modal */}
      {showCreateNote && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <CreateNode />
        </div>
      )}

      {editingNote && 
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <EditNode/>
        </div>
      }

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {notes.map((note) => (
            <div key={note._id} className="relative p-4 bg-white rounded-lg shadow-lg text-sm flex flex-col justify-between">
                <div>
                <h3 className="text-gray-900 text-xl font-semibold ml-2 mt-2">{note.title}</h3>
                <p className="text-gray-500 mt-3 ml-2">{note.content}</p>
                </div>
                <div>
                <button
                    onClick={() => setEditingNote(note)} 
                    className="bg-indigo-500 mt-4 mb-3 ml-2 px-6 py-2 font-medium rounded text-white">
                    Edit
                </button>
                <button
                    onClick={() => handleDeleteNote(note._id)}
                    className="bg-indigo-500 mt-4 mb-3 ml-2 px-6 py-2 font-medium rounded text-white">
                    Delete
                </button>
                <button
                    onClick={() => handleSummarize(note._id, note.content)}
                    className="bg-indigo-500 mt-4 mb-3 ml-2 px-6 py-2 font-medium rounded text-white">
                    Summarize
                </button>
                </div>
                {note.summary && (
                  <div className="mt-2 p-2 bg-gray-100 rounded">
                    <strong>Summary:</strong> {note.summary}
                  </div>
                )}
            </div>
        ))}
      </div>
      <div onClick={()=>setShowCreateNote(!showCreateNote)} className='fixed right-5 bottom-5 cursor-pointer h-16 w-16 rounded-full bg-indigo-500 flex items-center justify-center z-50'>
        <FaPencilAlt className='text-white text-2xl'/>
        </div>
    </div>
  );
};

export default NotesPage;
