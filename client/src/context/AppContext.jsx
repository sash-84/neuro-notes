import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const navigate = useNavigate();

    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null);
    const [showCreateNote, setShowCreateNote] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        navigate("/");
        setIsLoggedIn(false);
        setShowLogin(true);
        setNotes([]);
        setEditingNote(null);
        setShowCreateNote(false);
        setUserEmail("");
        setUserName("");
    }

    const value = {
        showLogin,
        isLoggedIn,
        notes,
        editingNote,
        showCreateNote,
        userName,
        userEmail,
        setShowLogin,
        setIsLoggedIn,
        setNotes,
        setEditingNote,
        setShowCreateNote,
        setUserName,
        setUserEmail,
        logout
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}