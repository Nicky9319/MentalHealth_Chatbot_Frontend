/* eslint-disable react/prop-types */
import { useState } from "react";
import SearchInput from "../../../Components/SearchInput";
import MembersList from "./MembersList";
// Dummy data for team members (used if none is provided)
const dummyTeamMembers = [
  { id: 1, name: "Alice Smith", avatar: "https://via.placeholder.com/40" },
  { id: 2, name: "Bob Johnson", avatar: "https://via.placeholder.com/40" },
  { id: 3, name: "Charlie Brown", avatar: "https://via.placeholder.com/40" },
  { id: 4, name: "Diana Prince", avatar: "https://via.placeholder.com/40" },
  { id: 5, name: "Diana Prince", avatar: "https://via.placeholder.com/40" },
  { id: 6, name: "Diana Prince", avatar: "https://via.placeholder.com/40" },
  { id: 7, name: "Diana Prince", avatar: "https://via.placeholder.com/40" },
];

const CreateNewTeamModal = ({
  onClose,
  onCreateTeam,
  teamMembers = dummyTeamMembers,
}) => {
  const [teamName, setTeamName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Filter team members based on the search input (shows all when searchTerm is empty)
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

  // Handler when creating the team
  const handleCreateTeam = () => {
    onCreateTeam({ teamName, members: selectedMembers });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50r">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Modal Container */}
      <div className="relative  bg-gray-900 p-6 rounded-2xl z-10 w-96">
        <h2 className="text-xl text-white font-semibold mb-4">
          Create New Team
        </h2>

        {/* Team Name Input */}
        <div className="mb-4">
          <label className="block text-gray-200 mb-1">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name..."
            className="w-full p-2 bg-gray-800 text-gray-100 border rounded-2xl border-gray-700 focus:outline-none"
          />
        </div>

        {/* Search Input for Team Members */}
        <h2 className="text-xl text-white font-semibold mb-4">Members</h2>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search team member..."
        />

        {/* Members List (shows filtered members, or all if search is empty) */}
        <MembersList
          members={filteredMembers}
          selectedMembers={selectedMembers}
          toggleMember={toggleMember}
        />

        {/* Action Buttons */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 border rounded-full text-gray-100 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateTeam}
            className="px-4 py-2 border rounded-full bg-gray-700 text-white hover:bg-gray-600"
          >
            Create Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewTeamModal;
