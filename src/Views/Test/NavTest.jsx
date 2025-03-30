import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavTest = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="">
      <nav className="bg-white rounded-4xl mx-4 my-2 px-6 py-6 flex items-center justify-between max-w-7xl mx-auto shadow-xl border-2 border-black/14">
        <div className="flex items-center space-x-2">
          <img
            alt="Company logo"
            className="w-8 h-8 rounded-full"
            height="30"
            src="https://storage.googleapis.com/a1aa/image/EBO2wEFBJh4K4u1xq7w7Y3X67aKo7frIpuW_Y__Ngrw.jpg"
            width="30"
          />
          <span className="font-semibold text-lg text-gray-900">Converge AI</span>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative group">
            <button className="text-gray-700 font-medium flex items-center">
              Product
              <i className="fas fa-chevron-down ml-1"></i>
            </button>
          </div>
          <div className="relative group">
            <button className="text-gray-700 font-medium flex items-center">
              Function
              <i className="fas fa-chevron-down ml-1"></i>
            </button>
          </div>
          <div className="relative group">
            <button className="text-gray-700 font-medium flex items-center">
              Agents
              <i className="fas fa-chevron-down ml-1"></i>
            </button>
          </div>
          <div className="relative group">
            <button className="text-gray-700 font-medium flex items-center">
              Resources
              <i className="fas fa-chevron-down ml-1"></i>
            </button>
          </div>
          <a className="text-gray-700 font-medium" href="#">
            Enterprise
          </a>
          <a className="text-gray-700 font-medium" href="#">
            Pricing
          </a>
        </div>

        {/* Desktop Login / SignUp */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-gray-700 font-medium" href="#">
            Login
          </Link>
          <Link to="/signup" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium px-4 py-2 rounded-full shadow-md" href="#">
            Sign Up
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button className="text-gray-700 focus:outline-none" onClick={toggleMenu}>
            <i className="fas fa-bars text-xl"> ≡</i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md rounded-lg mx-4 my-2 px-6 py-4" id="mobile-menu">
          <div className="flex flex-col space-y-4">
            <div className="relative group">
              <button className="text-gray-700 font-medium flex items-center">
                Product
                <i className="fas fa-chevron-down ml-1"></i>
              </button>
            </div>
            <div className="relative group">
              <button className="text-gray-700 font-medium flex items-center">
                Function
                <i className="fas fa-chevron-down ml-1"></i>
              </button>
            </div>
            <div className="relative group">
              <button className="text-gray-700 font-medium flex items-center">
                Agents
                <i className="fas fa-chevron-down ml-1"></i>
              </button>
            </div>
            <div className="relative group">
              <button className="text-gray-700 font-medium flex items-center">
                Resources
                <i className="fas fa-chevron-down ml-1"></i>
              </button>
            </div>
            <a className="text-gray-700 font-medium" href="#">
              Enterprise
            </a>
            <a className="text-gray-700 font-medium" href="#">
              Pricing
            </a>
            <Link to="/login" className="text-gray-700 font-medium" >
              Login
            </Link>
            <Link to="/sign" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium px-4 py-2 rounded-full shadow-md" >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavTest;
