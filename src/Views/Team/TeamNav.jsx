// TeamNav.jsx
import React from "react";
import { ArrowLeft, Wallet, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const TeamNav = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white px-5 text-gray-900">
      <div className="flex justify-between items-center py-3 border-b border-gray-200">
        {/* Back Button */}
        <Link to="/test1">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white grayscale shadow-sm hover:grayscale-0">
            <ArrowLeft size={16} className="mr-2" /> Back
          </button>
        </Link>
        
        {/* Right Section */}
        <div className="flex items-center">
          {/* Credits Section */}
          <div className="flex items-center text-indigo-600 mr-4">
            <Wallet size={16} className="mr-2" />
            <span className="font-medium">100</span>
            <span className="text-gray-300 mx-2">|</span>
            <span className="text-sm font-semibold grayscale">Free Plan</span>
          </div>
          
          {/* Support Button */}
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white grayscale shadow-sm hover:grayscale-0">
            <MessageCircle size={16} className="mr-2" /> Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamNav;
