import React from 'react';

const HeroSection = () => {
  return (
    <main className="container max-w-5xl mx-auto px-6 py-24 text-center">
      {/* Announcement Badges */}
      <div className="flex justify-center items-center space-x-3 mb-6">
        <span className="bg-white px-5 py-2.5 rounded-full shadow-md text-sm font-medium">
          AI-Powered Teams
        </span>
        <span className="bg-white px-5 py-2.5 rounded-full shadow-md text-sm font-medium">
          Meet Your Digital Twin
        </span>
      </div>

      {/* Hero Heading */}
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-snug mb-6">
        Transform employees into  
        <span className="text-purple-600"> intelligent AI avatars </span>  
        for self-sufficient teams
      </h1>

      {/* Subtext */}
      <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto mb-10">
        Our AI-driven platform creates **digital twins** of employees—capturing expertise, automating workflows,  
        and preserving institutional knowledge for seamless collaboration.
      </p>

      {/* Call-to-Action Buttons */}
      <div className="flex justify-center space-x-6 mb-6">
        <a
          className="bg-purple-600 text-white px-7 py-3.5 rounded-lg shadow-lg hover:bg-purple-700 transition-all"
          href="#"
        >
          Get Started
        </a>
        <a
          className="bg-white text-gray-700 px-7 py-3.5 rounded-lg shadow-lg hover:bg-gray-100 transition-all border border-gray-300"
          href="#"
        >
          Request a Demo
        </a>
      </div>

      {/* Footnote */}
      <p className="text-gray-400 text-sm">Experience the future of work • No card required</p>
    </main>
  );
};

export default HeroSection;
