import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { FaGoogle, FaDownload, FaUser } from "react-icons/fa6";
import { IoCloudOfflineOutline } from "react-icons/io5";
import icon from "../assets/icons/icon.png";
import { isElectron } from "../utils/environment";

const Login: React.FC = () => {
  const { signInWithGoogle, logout } = useAuth();
  const isWeb = !isElectron();

  const handleLocalMode = () => {
    logout(); // This will set isLocalMode to true
    window.location.href = "/"; // Redirect to main app
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card p-8 rounded-lg shadow-md w-96 flex flex-col gap-4 items-center border-border">
        <img src={icon} alt="Dyno Logo" className="w-10 h-10" />
        <div>
          <h1 className="text-center">Welcome to Dyno</h1>
          <p className="text-center text-sm font-light text-secondary-foreground italic">
            All your tasks in one place
          </p>
        </div>
        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-2 bg-background border border-border rounded-lg px-6 py-2 text-foreground focus:outline-hidden hover:scale-105 transition-all duration-300 shadow-md"
        >
          <FaGoogle className="size-4" />
          Sign in with Google
        </button>
        <button
          onClick={handleLocalMode}
          className="w-full flex items-center justify-center gap-2 bg-card border border-border text-sm rounded-lg px-4 py-1 text-secondary-foreground hover:text-foreground focus:outline-hidden hover:scale-105 transition-all duration-300 shadow-md"
        >
          <IoCloudOfflineOutline className="size-3" />
          Use without login
        </button>
        {isWeb && (
          <a
            href="/download"
            className="w-full underline flex items-center justify-center gap-2 text-secondary-foreground hover:text-foreground transition-colors text-xs"
          >
            <FaDownload className="size-2.5" />
            Download Desktop App
          </a>
        )}
        <p className="text-center text-sm font-light text-secondary-foreground">
          &copy; 2025 Dyno. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
