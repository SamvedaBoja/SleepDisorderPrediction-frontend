// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Centered Main Content */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 py-10 animate-fadeInUp">
          
          {/* Left Column */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-5xl font-extrabold text-blue-900 mb-3">Sleep Health Analyzer</h2>
            
            <p className="italic text-blue-800 mb-5 text-xl">
              Sleep better. Live better.
            </p>

            <p className="text-xl text-gray-700 mb-4">
              An AI-based assistant for predicting sleep disorders based on lifestyle data.
            </p>

            <p className="text-lg text-gray-700 mb-6">
              Discover insights into your sleep patterns and identify potential disorders.
              This tool provides a preliminary analysis to support your sleep health and assist medical professionals.
            </p>

            <Link to="/predict">
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-md shadow transition">
                Start Sleep Assessment
              </button>
            </Link>
          </div>

          {/* Right Column: Image */}
          <div className="md:w-1/2">
            <img
              src="/assets/sleepimage.png"
              alt="Peaceful sleep illustration"
              className="rounded-xl shadow-lg w-full max-w-sm mx-auto"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-sm text-gray-500 text-center py-4 border-t">
        <span className="text-blue-800 font-medium">© 2025 – Developed by Samveda, Hasika and Rravinna</span>
      </footer>
    </div>
  );
};

export default Home;