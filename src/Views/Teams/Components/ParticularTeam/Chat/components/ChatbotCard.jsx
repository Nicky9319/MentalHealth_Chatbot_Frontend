/* eslint-disable react/prop-types */
const ChatbotCard = ({ chatbot, onSelect, onOpenSettings, selected }) => {
  return (
    <div
      onClick={onSelect}
      className={`p-3 rounded mb-2 flex justify-between items-center cursor-pointer hover:opacity-80
          ${selected ? "bg-gray-800 rounded-2xl" : ""}`}
    >
      <span>{chatbot.name}</span>
      <span onClick={onOpenSettings} className="cursor-pointer">
        ⋮
      </span>
    </div>
  );
};

export default ChatbotCard;
