import React, { useState } from "react";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const Login = () => {

  const {setShowLogin, setIsLoggedIn, setUserName, setUserEmail} = useAppContext();

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password:""
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasMinLength) {
        return "Password must be at least 6 characters";
      }
      if (!hasUpperCase) {
        return "Password must contain at least one uppercase letter";
      }
      if (!hasLowerCase) {
        return "Password must contain at least one lowercase letter";
      }
      if (!hasSpecialChar) {
        return "Password must contain at least one special character";
      }
      return ""; // return if valid
  }

  const validateName = (name) => {
    return name.trim() !== "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
    setErrors({...errors, [name]: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Form Submitted:");
    console.log(formData);
    try {
        const loginData = {
            email: formData.email,
            password: formData.password
        }
        const res = await axios.post("http://localhost:5000/api/user/login", loginData);
        console.log("success: ",res.data);
        localStorage.setItem("token",res.data.token )
        localStorage.setItem("userName",res.data.user.name)
        localStorage.setItem("userEmail",res.data.user.email)
        setUserName(localStorage.getItem("userName"));
        setUserEmail(localStorage.getItem("userEmail"));
        setShowLogin(false);
        setIsLoggedIn(true);
    } catch (error) {
        console.log("error: ",error);
        setErrors({ ...errors, password: "Invalid email or password" });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.name) {
      validationErrors.name = "Name is required";
    } else if (!validateName(formData.name)) {
      validationErrors.name = "Name cannot be empty";
    }
    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = "Invalid email format";
    }
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      validationErrors.password = passwordError;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Form Submitted:");
    console.log(formData);
    try {
        const res = await axios.post("http://localhost:5000/api/user/register", formData);
        console.log(res);
        toggleSignUp();
    } catch (error) {
        console.log(error.response);
        setErrors({ ...errors, general: error.response?.data?.message || "An error occurred during registration." });
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setFormData({name: "",
    email: "",
    password: ""
  });
    setErrors({ name: "", email: "", password: "", general: "" });
  };

  return (
    <form onSubmit={isSignUp ? handleRegister : handleLogin} className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white fixed z-10">
        <button className="absolute top-4 right-5 text-gray-600 hover:text-gray-900" onClick={()=>{setShowLogin(false)}}>X</button>
      <h1 className="text-gray-900 text-3xl mt-10 font-medium">{isSignUp ? "Sign Up" : "Login"}</h1>
      <p className="text-gray-500 text-sm mt-2">
        {isSignUp ? "Please create an account" : "Please sign in to continue"}
      </p>

      {isSignUp && (
        <>
        <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <FaUser className="text-[#6B7280]"/>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
        {errors.name && <p className="text-red-500 text-xs mt-1 ml-6">{errors.name}</p>}
        </div>
</>
      )}

      <div className={`flex items-center w-full ${isSignUp ? "mt-4" : "mt-10"} bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2`}>
        <MdEmail className="text-[#6B7280]" />
        <input
          type="email"
          name="email"
          placeholder="Email id"
          className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
      {errors.email && <p className="text-red-500 text-xs mt-1 ml-6">{errors.email}</p>}
      </div>

      <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <RiLockPasswordFill className="text-[#6B7280]" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
      {errors.password && <p className="text-red-500 text-xs mt-1 ml-6">{errors.password}</p>}
      </div>

      {!isSignUp && (
        <div className="mt-5 text-left text-indigo-500">
          <a className="text-sm" href="#">Forgot password?</a>
        </div>
      )}

      {errors.general && <p className="text-red-500 text-sm mt-2">{errors.general}</p>} {/* Display general errors */}


        <button type="submit" className="mt-5 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
        {isSignUp ? "Sign Up" : "Login"}
      </button>

      {!isSignUp ? (
        <p className="text-gray-500 text-sm mt-3 mb-11">
          Don’t have an account?{" "}
          <button type="button" className="text-indigo-500" onClick={toggleSignUp}>
            Sign up
          </button>
        </p>
      ) : (
        <p className="text-gray-500 text-sm mt-3 mb-11">
          Already have an account?{" "}
          <button type="button" className="text-indigo-500" onClick={() => setIsSignUp(false)}>
            Login
          </button>
        </p>
      )}
    </form>
  );
};

export default Login;
