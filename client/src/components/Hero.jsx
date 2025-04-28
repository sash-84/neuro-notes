import { Link } from "react-router-dom";
import Login from "./Login";
import { useAppContext } from "../context/AppContext";

function LandingPage() {

  const {showLogin, setShowLogin} = useAppContext();
  
  return (
    <div className="relative bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png')] text-sm text-gray-500 min-h-screen flex flex-col items-center justify-center px-4 text-center">

       {showLogin && <Login />}

      {/* Hero Section */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl text-gray-800">
          Organize Your Thoughts Effortlessly ✍️
        </h1>
        <p className="max-w-xl text-center mt-6">
          Save your ideas, tasks, and notes all in one secure place. Accessible anytime, anywhere.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button onClick={()=>{setShowLogin(true)}} className="px-7 py-3 rounded bg-indigo-500 hover:bg-indigo-600 text-white font-medium">
            Get Started
          </button>
        </div>

      </div>
  );
}

export default LandingPage;
