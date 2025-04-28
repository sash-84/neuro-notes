import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {

    const {setShowLogin, isLoggedIn, logout, userName, userEmail } = useAppContext();

    return (
    <nav className="h-[70px] w-full px-6 md:px-10 lg:px-16 xl:px-24 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all fixed ">
        
        {/* Logo */}
        <Link to="/">
          <h1 className="text-indigo-500 font-extrabold text-3xl" style={{ fontFamily: "Vibur, cursive" }}>NeuroNotes</h1>
        </Link>

        {/* Hamburger (Mobile) */}
        <button id="menu-toggle" className="md:hidden text-gray-700 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
    
        {/* Nav Links */}
        <ul id="nav-menu" className="hidden max-md:absolute top-full left-0 max-md:w-full md:flex md:items-center gap-8 max-md:bg-white max-md:shadow-md max-md:px-6 max-md:py-4 flex-col md:flex-row z-50">
          <li><NavLink className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" to="/">Home</NavLink></li>
          <li><NavLink className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" to="/about">About</NavLink></li>
          <li><NavLink className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" to="/contact">Contact</NavLink></li>
          <li>
            {isLoggedIn && <NavLink to="/notes">Notes</NavLink>}
          </li>

          {/* Login Button (Mobile) */}
          <li className="block md:hidden mt-4">
            {!isLoggedIn ? (
              <button onClick={()=>{setShowLogin(true)}} className="group flex items-center gap-2">
              Log In
              <svg className="group-hover:translate-x-1 transition pt-0.5" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            ): (
              <button onClick={(e)=> {
                e.preventDefault();
                logout();
              }} className="group flex items-center gap-2">
              Log Out
            </button>
            )}
          </li>
        </ul>

        {!isLoggedIn ? (
          <button onClick={()=>{setShowLogin(true)}} className="group hidden md:flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 rounded">
          Log In
          <svg className="group-hover:translate-x-1 transition pt-0.5" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        ): (
          <div className="flex items-center space-x-5">
            {
              isLoggedIn && (<p>Welcome, {userName}</p>)
            }
          <button onClick={(e)=>{
            e.preventDefault();
            logout();
          }} className="group hidden md:flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 rounded">
          Log out
        </button>
          </div>
        )}        
    </nav>
    )
}

export default Navbar