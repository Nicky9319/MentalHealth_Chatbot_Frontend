import React from "react";

const InitialChatWindow = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mt-2">Team Name</h1>
        <p className="text-sm text-gray-600 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="mt-6 p-4 border border-gray-300 rounded-md text-left inline-block">
          <h3 className="text-lg font-semibold">Get started</h3>
          <p className="mt-2 text-gray-700">
            Start with a query to get the best responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InitialChatWindow;
