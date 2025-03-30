/* eslint-disable react/prop-types */
import { useState } from "react";
import { CiSettings } from "react-icons/ci";
import EditTeamModal from "./EditTeamModal";

const TeamsSidebarCard = ({ team, onSelectTeam, isSelected, onTeamUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSelect = () => {
    onSelectTeam(team);
  };

  const handleEditClick = (e) => {
    // Prevent the parent onClick from firing
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleUpdateTeam = (updatedTeam) => {
    // Optionally notify the parent component of the update
    if (onTeamUpdate) {
      onTeamUpdate(updatedTeam);
    }
    setShowEditModal(false);
  };

  return (
    <>
      <div
        onClick={handleSelect}
        className={`p-2 rounded cursor-pointer flex items-center justify-between gap-2 hover:bg-gray-700 text-sm ${
          isSelected ? "bg-gray-700" : "border border-transparent"
        }`}
      >
        <div className="text-sm font-medium">{team.teamName}</div>
        <button
          onClick={handleEditClick}
          className="p-1 hover:text-blue-400"
          aria-label="Edit team"
        >
          <CiSettings size={20} />
        </button>
      </div>

      {showEditModal && (
        <EditTeamModal
          team={team}
          onClose={handleCloseEditModal}
          onEditTeam={handleUpdateTeam}
        />
      )}
    </>
  );
};

export default TeamsSidebarCard;
