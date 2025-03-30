/* eslint-disable react/prop-types */
import { useState } from "react";
import SearchInput from "../../../../../../../Components/SearchInput";

const CreateChatbotModal = ({ onClose, onCreateChat, teamMembers = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Filter team members based on search input
  const filteredMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle selection of a team member
  const toggleMember = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  // Handler when creating the chat
  const handleCreateChat = () => {
    onCreateChat(selectedMembers);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Modal Container */}
      <div className="relative bg-gray-900 p-6 rounded-2xl z-10 w-96">
        <h2 className="text-xl font-semibold mb-4">Create New Chat</h2>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search team member..."
        />
        <div className="mt-4 max-h-64 overflow-y-auto">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => toggleMember(member.id)}
              className={`flex items-center py-2 border-b cursor-pointer ${
                selectedMembers.includes(member.id) ? "bg-gray-200" : "bg-white"
              }`}
            >
              <img
                src={member.avatar || "https://via.placeholder.com/40"}
                alt={member.name}
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-4">{member.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 border rounded-full hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateChat}
            className="px-4 py-2 border rounded-full bg-gray-700 text-white hover"
          >
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChatbotModal;
