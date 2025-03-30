import React from "react";

const LaterChat = () => {
  return (
    <div className="flex flex-col items-center min-h-[80vh] bg-white p-4">
      {/* Notification Card */}
      <div className="w-4/5 max-w-lg border border-gray-300 rounded-lg bg-white shadow-md relative">
        {/* Card Header */}
        <div className="flex justify-between items-center px-5 py-3 bg-gray-100 border-b border-gray-300 rounded-t-lg">
          <span className="text-sm text-gray-600">Triggered by Raghav Mittal</span>
          <span className="text-xs text-gray-500">just now</span>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <h2 className="text-lg font-semibold text-gray-800">Greeting</h2>
          <p className="text-gray-700 text-md mt-1">hi</p>
        </div>
      </div>

      {/* Team Name */}
      <div className="mt-10 text-left w-4/5 max-w-lg font-bold text-gray-800 text-md">
        Team Name
      </div>

      {/* Line Box - Offset to the right using ml-4 */}
      <div className="mt-3 ml-50 p-4 border border-gray-300 rounded-md bg-white w-3/5 max-w-lg text-left text-gray-800 text-md">
        Hello, How are you
      </div>
    </div>
  );
};

export default LaterChat;
