// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-100 shadow-md p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center">
        {/* Logo + Tagline Block */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <h1 className="text-xl font-bold text-blue-800">Sleep Health Analyzer</h1>
          {/*
          <h1><span className="text-sm italic text-gray-600 md:border-l md:pl-4">
            Sleep better. Live better.
          </span></h1> */}
        </div>

        {/* Navigation */}
        <nav className="space-x-4 mt-2 md:mt-0">
          <Link to="/" className="text-blue-700 hover:underline">Home</Link>
          <Link to="/predict" className="text-blue-700 hover:underline">Predict</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;