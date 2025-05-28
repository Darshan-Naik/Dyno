import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { FaGoogle, FaDownload } from "react-icons/fa6";
import icon from "../assets/icons/icon.png";
import { isElectron } from "../utils/environment";

const Login: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const isWeb = !isElectron();

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-secondary p-8 rounded-lg shadow-md w-96 flex flex-col gap-4 items-center border-gray-700">
        <img src={icon} alt="Dyno Logo" className="w-10 h-10" />
        <div>
          <h1 className="text-center">Welcome to Dyno</h1>
          <p className="text-center text-sm font-light text-secondary italic">
            All your tasks in one place
          </p>
        </div>
        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-2 bg-primary border border-gray-700 rounded-lg px-6 py-2 text-primary focus:outline-none  m-5 hover:scale-105 transition-all duration-300 shadow-md"
        >
          <FaGoogle className="size-4" />
          Sign in with Google
        </button>
        {isWeb && (
          <a
            href="/download"
            className="w-full underline flex items-center justify-center gap-2 text-secondary hover:text-primary transition-colors text-xs"
          >
            <FaDownload className="size-2.5" />
            Download Desktop App
          </a>
        )}
        <p className="text-center text-sm font-light text-secondary">
          &copy; 2025 Dyno. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
