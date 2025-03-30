import React, { useState, useEffect } from "react";
import { Pause, Check, Bolt, Users, Cog, Plus } from "lucide-react";
import Cookies from "js-cookie";

const SERVER_IP = import.meta.env.VITE_APP_BACKEND_URL;

const ChatInfoPanel = ({ onChatSelect, onEditChatSettings }) => {
  // State to hold teams and their chats.
  const [teamsChats, setTeamChats] = useState([]);
  // State for the currently selected team.
  const [currentTeam, setCurrentTeam] = useState("");
  // State for the selected chat's ID.
  const [selectedChat, setSelectedChat] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        let data = Cookies.get("USER_DATA");
        data = JSON.parse(data);
        const teamsData = Cookies.get("TEAMS_DATA");

        console.log("User Data:", data);

        if (teamsData) {
          return JSON.parse(teamsData);
        }
        let email = data["EMAIL"];
        console.log("User Email:", email);
        setEmail(email);

        const response = await fetch(
          `${SERVER_IP}/GetAllTeams?data={"EMAIL": "${email}"}`
        );
        const serverResponse = await response.json();
        console.log("Server response:", serverResponse);

        if (response.ok) {
          // Store teams data in cookies for later use.
          Cookies.set("TEAMS_DATA", JSON.stringify(serverResponse["TEAMS"]));
          return serverResponse["TEAMS"];
        } else {
          console.error("Failed to fetch teams:", serverResponse);
          return [];
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
        return [];
      }
    };

    const fetchChatsFromTeamsData = async (teams) => {
      let data = Cookies.get("USER_DATA");
      data = JSON.parse(data);
      let userEmail = data["EMAIL"];

      const allChats = await Promise.all(
        teams.map(async (team) => {
          const payload = {
            EMAIL: userEmail,
            TEAM_ID: team.TEAM_ID,
          };

          const response = await fetch(
            `${SERVER_IP}/GetAllTeamChatsForUser?data=${encodeURIComponent(
              JSON.stringify(payload)
            )}`
          );
          const serverResponse = await response.json();

          return {
            teamName: team.TEAM_NAME,
            teamID: team.TEAM_ID,
            chats: serverResponse["CHATBOTS"] || [],
          };
        })
      );
      return allChats;
    };

    const fetchAndLogData = async () => {
      const teams = await fetchTeams();
      console.log("Teams Data:", teams);
      const finalTeamsData = await fetchChatsFromTeamsData(teams);
      console.log("Final Teams Data:", finalTeamsData);

      setTeamChats(finalTeamsData);
      // Set the current team to the first team (if available).
      if (finalTeamsData.length > 0) {
        setCurrentTeam(finalTeamsData[0].teamName);
        // Optionally, set the selected chat to the first chat in the first team.
        if (finalTeamsData[0].chats.length > 0) {
          setSelectedChat(finalTeamsData[0].chats[0].CHATBOT_ID);
          // Pass the team id and chat id upward
          onChatSelect &&
            onChatSelect(
              finalTeamsData[0].teamID,
              finalTeamsData[0].chats[0].CHATBOT_ID
            );
        } else {
          onChatSelect && onChatSelect(finalTeamsData[0].teamID, null);
        }
      }
    };

    fetchAndLogData();
  }, []);

  // Whenever currentTeam or teamsChats change, update the selected chat and pass the data up.
  useEffect(() => {
    const team = teamsChats.find((team) => team.teamName === currentTeam);
    if (team) {
      if (team.chats && team.chats.length > 0) {
        setSelectedChat(team.chats[0].CHATBOT_ID);
        onChatSelect && onChatSelect(team.teamID, team.chats[0].CHATBOT_ID);
      } else {
        setSelectedChat(null);
        onChatSelect && onChatSelect(team.teamID, null);
      }
    }
  }, [currentTeam, teamsChats]);

  // New useEffect to log the team ID and chat ID whenever they change.
  useEffect(() => {
    const team = teamsChats.find((team) => team.teamName === currentTeam);
    if (team) {
      console.log("Selected Team ID:", team.teamID);
      console.log("Selected Chat ID:", selectedChat);
    }
  }, [currentTeam, selectedChat, teamsChats]);

  const handleSelectChat = (id) => {
    setSelectedChat(id);
    const team = teamsChats.find((team) => team.teamName === currentTeam);
    if (team && onChatSelect) {
      // Log the team and chat IDs when a chat is selected.
      console.log("Selected Team ID:", team.teamID, "Chat ID:", id);
      onChatSelect(team.teamID, id);
    }
  };

  const handleTeamChange = (e) => {
    setCurrentTeam(e.target.value);
  };

  // Updated handleEditChatSettings to trigger the parent callback.
  const handleEditChatSettings = () => {
    console.log("Edit chat settings");
    if (onEditChatSettings) {
      onEditChatSettings();
    }
  };

  // Function to handle the "Create new chat" button click.
  const handleCreateNewChat = async () => {
    // Find the team object corresponding to the current team.
    const team = teamsChats.find((t) => t.teamName === currentTeam);
    if (!team) {
      console.error("No team selected");
      return;
    }
    let data = Cookies.get("USER_DATA");
    data = JSON.parse(data);
    let userEmail = data["EMAIL"];

    const payload = {
      TEAM_ID: team.teamID,
      EMAIL: userEmail,
      CHATBOT_NAME: "New Chat",
      TEMPLATE_LIST: [],
    };

    try {
      const response = await fetch(`${SERVER_IP}/CreateNewTeamChat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log("New chat created:", result);

      if (response.ok) {
        // Assuming the API returns the new chat's details (with a CHATBOT_ID)
        const newChat = result.CHATBOT || {
          CHATBOT_ID: result.CHATBOT_ID || Date.now().toString(), // fallback id if not provided
          CHATBOT_NAME: payload.CHATBOT_NAME,
        };

        // Update the teamsChats state by appending the new chat to the correct team.
        setTeamChats((prevTeams) =>
          prevTeams.map((t) =>
            t.teamID === team.teamID ? { ...t, chats: [...t.chats, newChat] } : t
          )
        );
        // Optionally, select the newly created chat.
        setSelectedChat(newChat.CHATBOT_ID);
        onChatSelect && onChatSelect(team.teamID, newChat.CHATBOT_ID);
      } else {
        console.error("Failed to create new chat:", result);
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  // Get chats for the currently selected team.
  const currentTeamChats =
    teamsChats.find((team) => team.teamName === currentTeam)?.chats || [];

  return (
    <div className="bg-white p-6 rounded-lg max-w-sm mx-auto min-h-[80.6vh]">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>

      <div className="flex justify-between items-center mb-6 space-x-2">
        <button className="border border-gray-200 text-red-600 px-3 py-1 rounded-md flex items-center text-sm">
          <Pause size={14} className="mr-2" /> Pause Task
        </button>
        <button className="border border-gray-200 text-green-600 px-3 py-1 rounded-md flex items-center text-sm">
          <Check size={14} className="mr-2" /> Mark as complete
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Bolt size={16} className="text-gray-500 mr-2" />
          <span className="text-gray-700 text-sm">Triggered by</span>
        </div>
        <div className="ml-6 text-gray-900 text-sm">Raghav Mittal</div>
      </div>

      {/* Team Dropdown Section */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Users size={16} className="text-gray-500 mr-2" />
          <span className="text-gray-700 text-sm">The Team</span>
          <Cog size={14} className="text-gray-500 ml-2" />
        </div>
        <div className="ml-6 text-gray-900 text-sm flex items-center">
          <select
            id="team-select"
            value={currentTeam}
            onChange={handleTeamChange}
            className="block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {teamsChats.map((team) => (
              <option key={team.teamName} value={team.teamName}>
                {team.teamName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-gray-700 mb-2">Chats</div>
        <div className="ml-6">
          <button
            onClick={handleCreateNewChat}
            className="border border-gray-200 text-blue-600 px-3 py-1 rounded-md flex items-center text-sm"
          >
            <Plus size={14} className="mr-2" /> Create new chat
          </button>
        </div>
      </div>

      <div className="mb-16">
        <div className="text-gray-700 mb-2">Chat History</div>
        <div className="ml-6">
          <button
            onClick={handleEditChatSettings}
            className="mt-3 border border-gray-200 text-blue-600 px-3 py-1 rounded-md flex items-center text-sm"
          >
            <Cog size={14} className="mr-2" /> Edit Chat Settings
          </button>
        </div>
        <br/>

        <div className="ml-6 text-gray-900">
          {currentTeamChats.map((chat) => (
            <div
              key={chat.CHATBOT_ID}
              onClick={() => handleSelectChat(chat.CHATBOT_ID)}
              className={`mb-2 p-2 rounded-md cursor-pointer transition-colors duration-200 ${
                selectedChat === chat.CHATBOT_ID
                  ? "bg-gray-200 border border-gray-200 text-black"
                  : "hover:bg-gray-100"
              }`}
            >
              {chat.CHATBOT_NAME}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 text-gray-500">
        <span>96 left</span>
        <span>Help</span>
      </div>
    </div>
  );
};

export default ChatInfoPanel;
