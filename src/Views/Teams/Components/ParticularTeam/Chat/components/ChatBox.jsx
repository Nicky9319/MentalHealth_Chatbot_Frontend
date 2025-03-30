/* eslint-disable react/prop-types */
import avatarPlaceholder from "./../../../../../../assets/avatarPlaceholder.png";
const ChatBox = ({ chatbot, message, setMessage, onSend }) => {
  return (
    <div className="flex flex-col flex-1 border border-gray-300 rounded-2xl max-w-[400px]">
      {/* Header with default avatar and chatbot name */}
      <div className="p-3 border-b border-gray-300 flex items-center gap-2 ">
        <img
          src={avatarPlaceholder}
          alt="avatar"
          className="rounded-full w-10 h-10"
        />
        <h3 className="m-0">{chatbot.name}</h3>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-3 overflow-y-auto">
        {/* Render chat messages here */}
        <p>No messages yet.</p>
      </div>

      {/* Input Area */}
      <div className="flex p-3 border-t border-gray-300">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-2xl border-gray-300 "
        />
        <button
          onClick={onSend}
          className="ml-2 rounded-full bg-gray-500 text-white px-4 py-2 "
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
