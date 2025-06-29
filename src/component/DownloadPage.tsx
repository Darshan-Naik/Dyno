import React from "react";
import { Button } from "./ui/button";
import {
  MAC_APP_DOWNLOAD_URL,
  WINDOWS_APP_DOWNLOAD_URL,
} from "../configs/vercel";
import icon from "../assets/icons/icon.png";
import { FaGithub } from "react-icons/fa6";

const DownloadPage: React.FC = () => {
  const handleDownload = async (url: string) => {
    try {
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error downloading the app:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <img src={icon} alt="Dyno Logo" className="w-24 h-24 mx-auto mb-4" />
          <h1 className="text-4xl italic font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
            Download Dyno
          </h1>
          <p className=" text-secondary-foreground mb-8">
            Experience the power of productivity with Dyno. Download now and
            transform your workflow.
          </p>

          <div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Key Features
              </h2>
              <ul className="text-left space-y-3 text-secondary-foreground">
                <li className="flex items-center">
                  <span className="mr-2">✨</span>
                  Powerful productivity tools
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🚀</span>
                  Lightning-fast performance
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🔒</span>
                  Secure and private
                </li>
                <li className="flex items-center">
                  <span className="mr-2">💡</span>
                  Intuitive interface
                </li>
              </ul>
            </div>

            <div className="flex justify-center mb-4 text-xs mt-5">
              <a
                href="/"
                className="text-secondary-foreground hover:text-foreground transition-colors inline-flex items-center"
              >
                ← Back to Web App
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <div className="flex flex-col items-center">
                <Button
                  onClick={() => handleDownload(MAC_APP_DOWNLOAD_URL)}
                  className="px-4 py-2 text-lg font-semibold bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full transition-all duration-200 transform hover:scale-105"
                >
                  Download for macOS
                </Button>
                <p className="text-xs text-secondary-foreground mt-1">
                  Version 1.0.0 • macOS 10.15 or later
                </p>
              </div>

              <div className="flex flex-col items-center">
                <Button
                  onClick={() => handleDownload(WINDOWS_APP_DOWNLOAD_URL)}
                  className="px-4 py-2 text-lg font-semibold bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full transition-all duration-200 transform hover:scale-105"
                >
                  Download for Windows
                </Button>
                <p className="text-xs text-secondary-foreground mt-1">
                  Version 1.0.0 • Windows 10 or later
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-secondary-foreground">
                <span>Created by</span>
                <a
                  href="https://github.com/Darshan-naik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors "
                >
                  Darshan Naik
                </a>
              </div>
              <a
                href="https://github.com/Darshan-naik/Dyno"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-secondary-foreground hover:text-blue-400 transition-colors"
              >
                <FaGithub />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
