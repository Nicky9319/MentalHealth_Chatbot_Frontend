import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaSyncAlt } from "react-icons/fa";
import CreateTeamModal from "./CreateTeamModal"; // Importing the modal
import InviteModal from "./InviteModal"; // Importing InviteModal
import Cookies from "js-cookie";

const SERVER_IP = import.meta.env.VITE_APP_BACKEND_URL;;

const CreateTeam = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false); // State for Invite Modal
  const [inviteTeamID, setInviteTeamID] = useState(null); // State for the team ID to invite users to
  const [teams, setTeams] = useState([]); // State for teams
  const [openTeams, setOpenTeams] = useState({}); // State for open/close status of each team
  const [teamMembers, setTeamMembers] = useState({}); // State for team members
  const [refreshTeams, setRefreshTeams] = useState(false); // State to trigger re-fetch

  // Function to toggle the visibility of team details
  const toggleProjectContent = (teamId) => {
    setOpenTeams((prevOpenTeams) => {
      const isOpen = !prevOpenTeams[teamId];
      if (isOpen && !teamMembers[teamId]) {
        fetchTeamMembers(teamId);
        setTeams((prevTeams) =>
          prevTeams.map((team) =>
            team.TEAM_ID === teamId ? { ...team, isOpen: true } : team
          )
        );
      }
      return {
        ...prevOpenTeams,
        [teamId]: isOpen,
      };
    });
  };

  // Fetch teams from the server when the component is rendered or refreshTeams changes
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        let data = Cookies.get("USER_DATA");
        data = JSON.parse(data);
        let email = data["EMAIL"];
  
        // Only use the cookie cache if not refreshing (or on initial mount)
        if (!refreshTeams) {
          const teamsData = Cookies.get("TEAMS_DATA");
          if (teamsData) {
            setTeams(JSON.parse(teamsData));
            return;
          }
        }
  
        const response = await fetch(`${SERVER_IP}/GetAllTeams?data={"EMAIL": "${email}"}`);
        const serverResponse = await response.json();
        if (response.ok) {
          setTeams(serverResponse["TEAMS"]);
          Cookies.set("TEAMS_DATA", JSON.stringify(serverResponse["TEAMS"]));
        } else {
          console.error("Failed to fetch teams:", serverResponse);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
  
    fetchTeams();
  }, [refreshTeams]);
  

  useEffect(() => {
    console.log("Getting All Teams")

    const fetchTeams = async () => {
      try {
        let data = Cookies.get("USER_DATA");
        data = JSON.parse(data);
        const teamsData = Cookies.get("TEAMS_DATA");

        console.log(data)

        if (teamsData) {
          setTeams(JSON.parse(teamsData));
          return;
        }
        let email = data["EMAIL"];


        console.log("User Email : ", email)

        const response = await fetch(`${SERVER_IP}/GetAllTeams?data={"EMAIL": "${email}"}`);
        const serverResponse = await response.json();
        console.log("Server response:", serverResponse);


        if (response.ok) {
          setTeams(serverResponse["TEAMS"]);
          Cookies.set("TEAMS_DATA", JSON.stringify(serverResponse["TEAMS"]));
        } else {
          console.error("Failed to fetch teams:", serverResponse);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);


  // Function to fetch team members
  const fetchTeamMembers = async (teamId) => {
    try {
      const teamMembersResponse = await fetch(
        `${SERVER_IP}/GetAllTeamMembers?data={"TEAM_ID" : "${teamId}"}`
      );
      const teamMembersData = await teamMembersResponse.json();
      console.log(`Team members for team ${teamId}:`, teamMembersData);

      const members = teamMembersData.MEMBERS || [];
      setTeamMembers((prevTeamMembers) => ({
        ...prevTeamMembers,
        [teamId]: members,
      }));
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  // Function to handle opening the invite modal
  const handleInviteUser = (teamId) => {
    setInviteTeamID(teamId);
    setIsInviteOpen(true);
  };

  // Callback function to handle closing the invite modal and updating team members
  const handleInviteModalClose = () => {
    setIsInviteOpen(false);
    if (inviteTeamID) {
      fetchTeamMembers(inviteTeamID);
    }
  };

  // Callback function to handle closing the create team modal and refreshing teams
  const handleCreateTeamModalClose = () => {
    setIsModalOpen(false);
    setRefreshTeams((prev) => !prev); // Toggle refreshTeams to trigger re-fetch
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Teams</h1>
        <button 
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)} // Open CreateTeamModal
        >
          Create Team
        </button>
      </div>

      {teams.map((team) => (
        <div key={team.TEAM_ID} className="bg-white shadow rounded-lg p-5 mb-5">
          <div 
            className={`flex justify-between items-center cursor-pointer p-3 border ${openTeams[team.TEAM_ID] ? "border-none border-b" : "border-gray-200"} rounded-md`}
            onClick={() => toggleProjectContent(team.TEAM_ID)}
          >
            <h2 className="text-lg font-bold">{team.TEAM_NAME}</h2>
            {openTeams[team.TEAM_ID] ? <FaChevronUp /> : <FaChevronDown />}
          </div>

          {openTeams[team.TEAM_ID] && (
            <div className="mt-5">
              {/* Members Section */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg">Members</h3>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center cursor-pointer text-gray-500 hover:bg-gray-100 p-2 rounded-md" onClick={() => fetchTeamMembers(team.TEAM_ID)}>
                      <FaSyncAlt className="mr-2" />
                      <span>Refresh</span>
                    </div>

                    <button
                      className="bg-black text-white px-4 py-2 rounded-md"
                      onClick={() => handleInviteUser(team.TEAM_ID)} // Open InviteModal
                    >
                      Add User
                    </button>
                  </div>
                </div>

                {/* Members Table */}
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">User account</th>
                      <th className="text-left py-2">Role</th>
                    </tr>
                  </thead>

                  <tbody>
                    {teamMembers[team.TEAM_ID] && teamMembers[team.TEAM_ID].map((member) => (
                      <tr key={member.id} className="border-b border-gray-200">
                        <td className="py-3">{member.NAME}</td>
                        <td className="py-3 flex items-center">
                          {member.EMAIL}
                        </td>
                        <td className="py-3">{member.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Modals */}
      {isModalOpen && <CreateTeamModal onClose={handleCreateTeamModalClose} />}
      {isInviteOpen && <InviteModal onClose={handleInviteModalClose} teamID={inviteTeamID} />}
    </>
  );
};

export default CreateTeam;
