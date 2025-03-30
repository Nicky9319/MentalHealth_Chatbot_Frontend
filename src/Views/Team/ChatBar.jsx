import React, { useState } from "react";
import { Paperclip, Send } from "lucide-react";

const Chatbar = ({ onSend }) => {
  const [comment, setComment] = useState("");

  const handleSend = () => {
    if (comment.trim()) {
      onSend(comment); // Pass the message upward.
      setComment("");
    }
  };

  return (
    <div className="flex items-center w-4/5 max-w-2xl border border-gray-300 rounded-2xl bg-white p-2 shadow-md mx-auto my-4">
      <Paperclip className="text-gray-500 mr-3" />
      <input
        type="text"
        className="flex-grow border-none outline-none text-gray-700 text-lg"
        placeholder="Enter your Query"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        className="bg-gray-900 text-white rounded-full w-10 h-10 flex justify-center items-center ml-2"
        onClick={handleSend}
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default Chatbar;
