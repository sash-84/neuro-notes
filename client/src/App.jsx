import {Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import NotesPage from "./pages/NotesPage"
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";

function App() {

  const {setIsLoggedIn, setUserEmail, setUserName, logout} = useAppContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logout();
      } else {
        setIsLoggedIn(true);
        setUserEmail(localStorage.getItem("userEmail"));
        setUserName(localStorage.getItem("userName"));
      }
    } else {
      logout();
    }
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <Routes>
         <Route path="/" element={<Hero />} />
         <Route path="/login" element={<Login />} />
         <Route path="/notes" element={<NotesPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App
