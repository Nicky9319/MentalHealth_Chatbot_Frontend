import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";

const SERVER_IP = import.meta.env.VITE_APP_BACKEND_URL;

const ChatSettings = ({ initialTeamId, initialChatId, onSaveSuccess }) => {
  // API data states
  const [teams, setTeams] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [templateData, setTemplateData] = useState([]);

  // UI states
  const [activeTab, setActiveTab] = useState("details"); // "details" or "templates"
  const [isEditingChatName, setIsEditingChatName] = useState(false);
  const [tempChatName, setTempChatName] = useState("");

  // On mount, fetch team information using the user’s cookie
  useEffect(() => {
    const userDataCookie = Cookies.get("USER_DATA");
    if (userDataCookie) {
      const userData = JSON.parse(userDataCookie);
      fetchTeamInformation(userData.EMAIL);
    }
  }, []);

  // Fetch team info from the API
  const fetchTeamInformation = async (userEmail) => {
    try {
      const url = `${SERVER_IP}/GetAllTeamInformation?data=${encodeURIComponent(
        JSON.stringify({ EMAIL: userEmail })
      )}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.STATUS === "ALL_TEAM_INFORMATION_RETRIEVED") {
        const apiTeams = data.TEAMS;
        setTeams(apiTeams);

        // Auto-select a team (using initialTeamId if available)
        const defaultTeam = initialTeamId
          ? apiTeams.find(team => team.TEAM_ID === initialTeamId)
          : apiTeams[0];
        setSelectedTeam(defaultTeam);

        // Build the chats list
        buildChats(apiTeams, userEmail);
      } else {
        console.error("Error fetching team information", data);
      }
    } catch (error) {
      console.error("Error fetching team information:", error);
    }
  };

  // Build chats array by iterating over each team’s chatbot interactions
  const buildChats = (teamsData, userEmail) => {
    const allChats = [];
    teamsData.forEach(team => {
      if (team.TEAM_CHATBOT_INTERACTIONS && team.TEAM_CHATBOT_INTERACTIONS.length > 0) {
        team.TEAM_CHATBOT_INTERACTIONS.forEach(chatbot => {
          allChats.push({
            id: chatbot.CHATBOT_ID,
            name: chatbot.CHATBOT_NAME,
            team, // full team object for easy reference later
            templates: extractChatTemplates(chatbot, userEmail)
          });
        });
      } else {
        // If no chatbot interaction exists, add a placeholder chat.
        allChats.push({
          id: team.TEAM_ID, // fallback id
          name: 'No Chat Assigned',
          team,
          templates: []
        });
      }
    });
    setChats(allChats);
  };

  // Helper to extract template names from a chatbot object
  const extractChatTemplates = (chatbot, userEmail) => {
    if (!chatbot.TEMPLATE_LIST || chatbot.TEMPLATE_LIST.length === 0) return [];
    if (typeof chatbot.TEMPLATE_LIST[0] === 'string') {
      return chatbot.TEMPLATE_LIST;
    } else if (typeof chatbot.TEMPLATE_LIST[0] === 'object') {
      const match = chatbot.TEMPLATE_LIST.find(item => item.EMAIL === userEmail);
      if (match && match.TEMPLATES) {
        return match.TEMPLATES.map(t => (typeof t === "object" ? t.NAME : t));
      }
    }
    return [];
  };

  // Update template data and select a default chat when a team is chosen
  useEffect(() => {
    if (!selectedTeam) return;

    // Build template data from team members
    if (selectedTeam.MEMBERS) {
      const teamTemplateData = selectedTeam.MEMBERS.map(member => ({
        member: member.EMAIL,
        templates: member.TEMPLATES
          ? member.TEMPLATES.map(t => (typeof t === "object" ? t.NAME : t))
          : []
      }));
      setTemplateData(teamTemplateData);
    } else {
      setTemplateData([]);
    }

    // Select a default chat for the team
    const teamChats = chats.filter(chat => chat.team.TEAM_ID === selectedTeam.TEAM_ID);
    const defaultChat = initialChatId
      ? teamChats.find(chat => chat.id.toString() === initialChatId.toString()) || teamChats[0]
      : teamChats[0];
    setSelectedChat(defaultChat);
    setTempChatName(defaultChat ? defaultChat.name : "");
    setActiveTab("details");
  }, [selectedTeam, chats, initialChatId]);

  // Handler for team selection change (via dropdown)
  const handleTeamChange = (e) => {
    const teamId = e.target.value;
    const team = teams.find(t => t.TEAM_ID === teamId);
    setSelectedTeam(team);
  };

  // Handler for selecting a chat (for existing chats)
  const handleChatSelect = (chatId) => {
    const chat = chats.find(c => c.id.toString() === chatId.toString());
    if (chat) {
      setSelectedChat(chat);
      setTempChatName(chat.name);
    }
  };

  // New function to handle creating a new chat via the API
  const handleCreateNewChat = async () => {
    if (!selectedTeam) {
      console.error("No team selected");
      return;
    }
    let data = Cookies.get("USER_DATA");
    data = JSON.parse(data);
    const userEmail = data["EMAIL"];

    const payload = {
      TEAM_ID: selectedTeam.TEAM_ID,
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
        // Use API-returned chat details or fallback values.
        const newChat = result.CHATBOT || {
          id: result.CHATBOT_ID || Date.now().toString(),
          name: payload.CHATBOT_NAME,
          team: selectedTeam,
          templates: [],
        };

        // Update the chats list
        setChats(prevChats => [...prevChats, newChat]);
        // Select the newly created chat
        setSelectedChat(newChat);
        setTempChatName(newChat.name);
      } else {
        console.error("Failed to create new chat:", result);
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  // Begin editing the chat name
  const handleChatNameEdit = () => {
    setIsEditingChatName(true);
  };

  // Save the updated chat name
  const handleChatNameSave = () => {
    if (selectedChat) {
      const updatedChats = chats.map(chat =>
        chat.id === selectedChat.id ? { ...chat, name: tempChatName } : chat
      );
      setChats(updatedChats);
      setSelectedChat({ ...selectedChat, name: tempChatName });
      setIsEditingChatName(false);
    }
  };

  // Toggle a template for the currently selected chat
  const toggleTemplate = (template) => {
    if (!selectedChat) return;
    const updatedTemplates = selectedChat.templates.includes(template)
      ? selectedChat.templates.filter(t => t !== template)
      : [...selectedChat.templates, template];
    const updatedChats = chats.map(chat =>
      chat.id === selectedChat.id ? { ...chat, templates: updatedTemplates } : chat
    );
    setChats(updatedChats);
    setSelectedChat({ ...selectedChat, templates: updatedTemplates });
  };

  // Save changes to the server
  const handleSaveChanges = async () => {
    if (!selectedTeam || !selectedChat) {
      alert("Please select a team and a chat.");
      return;
    }
    const userDataCookie = Cookies.get("USER_DATA");
    const userData = userDataCookie ? JSON.parse(userDataCookie) : { EMAIL: '' };

    // Build payload for templates per team member
    const templatesPayload = (selectedTeam.MEMBERS || []).map(member => {
      let memberTemplates = [];
      if (member.TEMPLATES && member.TEMPLATES.length > 0) {
        memberTemplates = member.TEMPLATES.filter(t => {
          if (typeof t === 'object') {
            return selectedChat.templates.includes(t.NAME);
          } else {
            return selectedChat.templates.includes(t);
          }
        }).map(t => (typeof t === 'object' ? t : { NAME: t }));
      }
      return {
        EMAIL: member.EMAIL,
        TEMPLATES: memberTemplates
      };
    });

    const payload = {
      CHATBOT_ID: selectedChat.id,
      TEAM_ID: selectedTeam.TEAM_ID,
      CHAT_NAME: selectedChat.name,
      EMAIL: userData.EMAIL,
      TEMPLATES: templatesPayload
    };

    try {
      const response = await fetch(`${SERVER_IP}/UpdateChatInformation`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.STATUS === "SUCCESS" || data.STATUS === "CHAT_INFORMATION_UPDATED") {
        alert("Chat information updated successfully!");
        if (onSaveSuccess) {
          onSaveSuccess(selectedTeam.TEAM_ID, selectedChat.id);
        }
      } else {
        alert("Failed to update chat information: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error updating chat information:", error);
      alert("Error updating chat information: " + error.message);
    }
  };

  return (
    <div className="flex min-h-[87.6vh]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-4">
        <div>
          <h2 className="text-lg font-semibold mb-4">Chat Settings</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Team
            </label>
            <select
              value={selectedTeam ? selectedTeam.TEAM_ID : ""}
              onChange={handleTeamChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {teams.map(team => (
                <option key={team.TEAM_ID} value={team.TEAM_ID}>
                  {team.NAME}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-2">Chats</h3>
            <ul className="space-y-2">
              {chats
                .filter(chat => selectedTeam && chat.team.TEAM_ID === selectedTeam.TEAM_ID)
                .map(chat => (
                  <li key={chat.id}>
                    <button
                      onClick={() => handleChatSelect(chat.id)}
                      className={`w-full text-left p-2 rounded-md transition-colors ${
                        selectedChat && chat.id === selectedChat.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-blue-100'
                      }`}
                    >
                      {chat.name}
                    </button>
                  </li>
                ))}
              <li>
                <button
                  onClick={handleCreateNewChat}
                  className="w-full text-left p-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200"
                >
                  + New Chat
                </button>
              </li>
            </ul>
          </div>
        </div>
        {/* (Optional) Add a "Change Team" button here if desired */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white overflow-auto">
        {selectedChat ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {isEditingChatName ? (
                  <input
                    type="text"
                    value={tempChatName}
                    onChange={(e) => setTempChatName(e.target.value)}
                    onBlur={handleChatNameSave}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleChatNameSave();
                    }}
                    className="text-2xl font-semibold border-b border-blue-500 focus:outline-none"
                    autoFocus
                  />
                ) : (
                  <h1 className="text-2xl font-semibold">{selectedChat.name}</h1>
                )}
                {!isEditingChatName && (
                  <button
                    onClick={handleChatNameEdit}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                )}
              </div>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Save Changes
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6 border-b border-gray-300">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-2 transition-colors ${
                    activeTab === "details"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-600 hover:text-blue-500"
                  }`}
                >
                  Chat Details
                </button>
                <button
                  onClick={() => setActiveTab("templates")}
                  className={`pb-2 transition-colors ${
                    activeTab === "templates"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-600 hover:text-blue-500"
                  }`}
                >
                  Manage Templates
                </button>
              </nav>
            </div>

            {activeTab === "details" ? (
              <div>
                <p className="mb-2">
                  <strong>Team:</strong> {selectedTeam.NAME}
                </p>
                
                <p className="mb-2">
                  <strong>Linked Templates:</strong>{" "}
                  {selectedChat.templates.length > 0
                    ? selectedChat.templates.join(", ")
                    : "None"}
                </p>
              </div>
            ) : (
              <div>
                {templateData.map(memberData => (
                  <div key={memberData.member} className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">{memberData.member}</h3>
                    <div className="flex flex-wrap gap-2">
                      {memberData.templates.map(template => (
                        <button
                          key={template}
                          onClick={() => toggleTemplate(template)}
                          className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                            selectedChat.templates.includes(template)
                              ? "bg-blue-500 text-white border-blue-500"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {template}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p>Please select a chat to view its details.</p>
        )}
      </main>
    </div>
  );
};

export default ChatSettings;
