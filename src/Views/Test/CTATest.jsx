import React from 'react';

const CTATest = () => {
  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen px-6 lg:px-20">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mt-8">Free your team.</h1>
        <h2 className="text-5xl font-extrabold text-purple-600 mt-2">
          Build <span className="text-blue-600">your first AI agent</span> today!
        </h2>
        <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
          Whether you're new to Converge AI or exploring new features, we'll quickly guide you to start doing great work immediately.
        </p>
        <div className="mt-10 flex justify-center space-x-6">
          <button className="bg-purple-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg text-lg hover:bg-purple-700 transition">
            Try for Free
          </button>
          <button className="bg-white text-gray-900 font-bold py-3 px-6 rounded-xl shadow-lg border border-gray-300 text-lg hover:bg-gray-100 transition">
            Request Demo
          </button>
        </div>
        <p className="text-gray-400 mt-6 text-sm">
          Free plan <span className="mx-2">•</span> No card required
        </p>
      </div>
    </div>
  );
};

export default CTATest;
