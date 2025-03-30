/* eslint-disable react/prop-types */
import { useState } from "react";
import ChatbotCard from "./components/ChatbotCard";
import ChatBox from "./components/ChatBox";
import ChatSettingsModal from "./components/ChatSettingsModal";
import SearchInput from "../../../../../Components/SearchInput";
import CreateChatbotModal from "./components/CreateChatbotModal";

const ChatPage = () => {
  const [selectedChatbot, setSelectedChatbot] = useState(null);
  const [openSettingsChatbot, setOpenSettingsChatbot] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");

  const chatbots = [
    { id: 1, name: "Chatbot One" },
    { id: 2, name: "Chatbot Two" },
    { id: 3, name: "Chatbot Three" },
  ];

  const users = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Davis" },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredChatbots = chatbots.filter((bot) =>
    bot.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSend = () => {
    console.log(`Sending message: ${message}`);
    setMessage("");
  };

  return (
    <div className="grid grid-cols-[300px_1fr] h-full min-h-[550px]">
      {/* Left Column: Chatbot List */}
      <div className="border-r border-gray-300 p-4 overflow-y-auto">
        <div className="mb-4 flex items-center gap-2 w-full">
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
          <button
            className="text-xs text-white px-4 py-2 min-w-[100px] rounded-full border bg-gray-400 hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            Create New
          </button>
        </div>

        <div>
          {filteredChatbots.map((bot) => (
            <ChatbotCard
              key={bot.id}
              chatbot={bot}
              onSelect={() => setSelectedChatbot(bot)}
              selected={selectedChatbot?.id === bot.id}
              onOpenSettings={(e) => {
                e.stopPropagation();
                setOpenSettingsChatbot(bot);
              }}
            />
          ))}
        </div>
      </div>

      {/* Right Column: Chatbox (full height) */}
      <div className="p-4 flex flex-col h-full">
        {selectedChatbot ? (
          <ChatBox
            chatbot={selectedChatbot}
            message={message}
            setMessage={setMessage}
            onSend={handleSend}
            className="flex-grow"
          />
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <h2>Select a chatbot to start chatting</h2>
          </div>
        )}
      </div>

      {openSettingsChatbot && (
        <ChatSettingsModal
          chatbot={openSettingsChatbot}
          onClose={() => setOpenSettingsChatbot(null)}
        />
      )}

      {isModalOpen && (
        <CreateChatbotModal
          onClose={() => setIsModalOpen(false)}
          title="Create New Chatbot"
        >
          <SearchInput
            value={userSearch}
            onChange={setUserSearch}
            placeholder="Search user..."
          />
          <div className="mt-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center border-b py-2 cursor-pointer hover:bg-gray-100"
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <span className="ml-4">{user.name}</span>
              </div>
            ))}
          </div>
        </CreateChatbotModal>
      )}
    </div>
  );
};

export default ChatPage;
