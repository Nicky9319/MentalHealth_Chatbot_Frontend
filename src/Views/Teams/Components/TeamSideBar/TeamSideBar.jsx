/* eslint-disable react/prop-types */
import TeamsSidebarCard from "./components/TeamSidebarTeamCard";

const TeamSideBar = ({ setSelectedTeam, selectedTeam }) => {
  const teams = [
    { TEAM_ID: 1, teamName: "Development" },
    { TEAM_ID: 2, teamName: "Marketing" },
    { TEAM_ID: 3, teamName: "Design" },
    { TEAM_ID: 4, teamName: "Sales" },
    { TEAM_ID: 5, teamName: "HR" },
  ];

  // Function to handle team selection
  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    localStorage.setItem("selectedTeam", JSON.stringify(team));
  };

  return (
    <div className="h-full overflow-hidden w-fit pr-3 rounded-r-lg min-w-[150px] bg-gray-800 text-white p-4">
      <h2 className="text-lg font-bold">Teams</h2>
      <div className="space-y-2 text-sm mt-4">
        {teams.map((team) => (
          <TeamsSidebarCard
            key={team.TEAM_ID}
            team={team}
            onSelectTeam={handleSelectTeam}
            isSelected={selectedTeam?.TEAM_ID === team.TEAM_ID} // Check if this team is selected
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSideBar;
