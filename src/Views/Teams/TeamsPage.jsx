import { useState } from "react";
import TeamCard from "./Components/TeamCard";
import ParticularTeamPage from "./Components/ParticularTeam/ParticularTeamPage";
import CreateNewTeamModal from "./Components/CreateNewTeamModal";
const TeamsPage = () => {
  const storedTeam = JSON.parse(localStorage.getItem("selectedTeam"));
  const [selectedTeam, setSelectedTeam] = useState(storedTeam || null);
  const [showModal, setShowModal] = useState(false);

  const teams = [
    { TEAM_ID: 1, teamName: "Development", memberCount: 12 },
    { TEAM_ID: 2, teamName: "Marketing", memberCount: 8 },
    { TEAM_ID: 3, teamName: "Design", memberCount: 5 },
    { TEAM_ID: 4, teamName: "Sales", memberCount: 10 },
    { TEAM_ID: 5, teamName: "HR", memberCount: 6 },
  ];

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    localStorage.setItem("selectedTeam", JSON.stringify(team));
  };

  return (
    <div className="relative min-h-screen">
      {selectedTeam ? (
        <ParticularTeamPage
          teamId={selectedTeam.TEAM_ID}
          teamName={selectedTeam.teamName}
          setSelectedTeam={setSelectedTeam}
          selectedTeam={selectedTeam}
        />
      ) : (
        <div className="p-4">
          <div className="flex flex-wrap w-full flex-row gap-2">
            {teams.map((team) => (
              <TeamCard
                key={team.TEAM_ID}
                id={team.TEAM_ID}
                teamName={team.teamName}
                memberCount={team.memberCount}
                onSelect={() => handleSelectTeam(team)}
              />
            ))}
            {/* Plus Option Card */}
            <div
              onClick={() => setShowModal(true)}
              className="flex items-center rounded-2xl mt-4 justify-center w-48 h-32 border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50"
            >
              <span className="text-4xl text-gray-500">+</span>
            </div>
          </div>
        </div>
      )}

      {/* Modal for creating a new team using the imported modal */}
      {showModal && (
        <CreateNewTeamModal
          onClose={() => setShowModal(false)}
          title="Create New Team"
        >
          <p>CreateNewteam</p>
        </CreateNewTeamModal>
      )}
    </div>
  );
};

export default TeamsPage;
