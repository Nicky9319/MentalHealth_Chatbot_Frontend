/* eslint-disable react/prop-types */
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import TeamSideBar from "../TeamSideBar/TeamSideBar";
import ParticularTeamContent from "./ParticularTeamContent";

const ParticularTeamPage = ({
  teamId,
  teamName,
  setSelectedTeam,
  selectedTeam,
}) => {
  return (
    <div className="flex h-full ">
      {/* Sidebar */}
      <TeamSideBar
        setSelectedTeam={setSelectedTeam}
        selectedTeam={selectedTeam}
      />

      {/* Main Content */}
      <ParticularTeamContent
        teamName={teamName}
        teamId={teamId}
      ></ParticularTeamContent>
    </div>
  );
};

export default ParticularTeamPage;
