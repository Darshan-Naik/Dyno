import React from "react";
import { Button } from "./ui/button";
import { MAC_APP_DOWNLOAD_URL } from "../configs/vercel";
import icon from "../assets/icons/icon.png";

const DownloadPage: React.FC = () => {
  const handleDownload = async () => {
    try {
      window.open(MAC_APP_DOWNLOAD_URL, "_blank");
    } catch (error) {
      console.error("Error downloading the app:", error);
    }
  };

  return (
    <div className="min-h-screen bg-primary text-primary">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <img src={icon} alt="Dyno Logo" className="w-24 h-24 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Download Dyno
          </h1>
          <p className="text-xl text-secondary mb-8">
            Experience the power of productivity with Dyno. Download now and
            transform your workflow.
          </p>

          <div className="space-y-8">
            <div className="bg-secondary p-6 rounded-lg border border-gray-700">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Key Features
              </h2>
              <ul className="text-left space-y-3 text-secondary">
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

            <Button
              onClick={handleDownload}
              className="px-4 py-2 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full transition-all duration-200 transform hover:scale-105"
            >
              Download for macOS
            </Button>

            <p className="text-xs text-secondary mt-1">
              Version 1.0.0 • macOS 10.15 or later
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
