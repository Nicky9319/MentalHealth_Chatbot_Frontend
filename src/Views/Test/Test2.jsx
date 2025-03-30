import React from 'react';

const Test2 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-8">
      {/* Information Button */}
      <button className="mb-6 px-6 py-3 bg-white border border-gray-300 rounded-full text-gray-700 text-sm shadow-md hover:bg-gray-100 transition-all">
        <i className="fas fa-info-circle mr-2"></i> How does it work?
      </button>

      {/* Headline Section */}
      <h1 className="text-4xl md:text-5xl font-bold text-center leading-snug max-w-4xl">
        <span className="text-blue-600">Transform Employees into Digital Twins.</span>
        AI-powered intelligent avatars that organize into dynamic, self-sufficient teams.
        <br />
        <span className="text-blue-600">Align Perspectives, Preserve Knowledge,</span>
        and ensure seamless collaboration across departments.
      </h1>

      {/* Supporting Text */}
      <p className="text-gray-500 text-lg text-center max-w-3xl mt-6">
        Our AI-driven platform integrates live data feeds, automated AI agents, and a persistent knowledge base,
        ensuring a continuous flow of organizational intelligence. Enable real-time decision-making,
        break down silos, and future-proof your company’s expertise.
      </p>
    </div>
  );
};

export default Test2;
