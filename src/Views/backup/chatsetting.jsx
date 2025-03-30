import React, { useState, useEffect } from 'react';

const ChatSettings = () => {
  // ----- Sidebar View State -----
  const [view, setView] = useState('team-profile');

  // ----- Data for Teams and Templates -----
  // Teams list (could come from an API in a real app)
  const teams = ['Team A', 'Team B', 'Team C'];

  // Template groups – each group is linked to a member (or category)
  const templateData = [
    { member: 'Member 1', templates: ['Template 1', 'Template 2'] },
    { member: 'Member 2', templates: ['Template 3', 'Template 4'] }
  ];

  // ----- Overarching Chats Array -----
  // Each chat object holds its id, name, associated team, and an array of selected templates.
  const [chats, setChats] = useState([
    { id: 1, name: 'Chat 1', team: '', templates: [] },
    { id: 2, name: 'Chat 2', team: '', templates: [] },
    { id: 3, name: 'Chat 3', team: '', templates: [] }
  ]);

  // ----- Current Chat State -----
  const [currentChatId, setCurrentChatId] = useState(chats[0]?.id || null);
  // For editing the chat name
  const [isEditingChatName, setIsEditingChatName] = useState(false);
  const [tempChatName, setTempChatName] = useState('');

  // Find the current chat object from the chats array
  const currentChat = chats.find((chat) => chat.id === currentChatId) || {};

  // Update the temporary chat name whenever the current chat changes (unless in edit mode)
  useEffect(() => {
    if (!isEditingChatName && currentChat.name) {
      setTempChatName(currentChat.name);
    }
  }, [currentChat, isEditingChatName]);

  // ----- Handlers -----

  // Handle chat selection changes:
  // If the "New Chat" option is selected, add a new chat object to the array.
  const handleChatSelectChange = (e) => {
    const value = e.target.value;
    if (value === 'new') {
      const newId = chats.length ? Math.max(...chats.map((c) => c.id)) + 1 : 1;
      const newChat = { id: newId, name: 'New Chat', team: '', templates: [] };
      setChats([...chats, newChat]);
      setCurrentChatId(newId);
    } else {
      setCurrentChatId(parseInt(value));
    }
  };

  // Update the chat name in the chats array when the user presses Enter
  const handleChatNameKeyPress = (e) => {
    if (e.key === 'Enter') {
      setChats(
        chats.map((chat) =>
          chat.id === currentChatId ? { ...chat, name: tempChatName } : chat
        )
      );
      setIsEditingChatName(false);
    }
  };

  // Update the team for the current chat
  const handleTeamSelect = (team) => {
    setChats(
      chats.map((chat) =>
        chat.id === currentChatId ? { ...chat, team } : chat
      )
    );
  };

  // Toggle a template for the current chat
  const toggleTemplate = (template) => {
    setChats(
      chats.map((chat) => {
        if (chat.id === currentChatId) {
          // Add template if not present; remove if already selected
          const newTemplates = chat.templates.includes(template)
            ? chat.templates.filter((t) => t !== template)
            : [...chat.templates, template];
          return { ...chat, templates: newTemplates };
        }
        return chat;
      })
    );
  };

  return (
    <div className="flex min-h-[87.6vh]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Chat Settings</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <button
                onClick={() => setView('team-profile')}
                className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <i className="fas fa-user-circle mr-2"></i> Team Profile
              </button>
            </li>
            <li>
              <h3 className="text-sm font-semibold text-gray-500 mt-4">Team</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <button
                    onClick={() => setView('select-team')}
                    className={`w-full flex items-center hover:text-gray-900 p-2 rounded-md focus:outline-none ${
                      view === 'select-team'
                        ? 'border border-gray-200 text-black'
                        : 'text-gray-700'
                    }`}
                  >
                    <i className="fas fa-users mr-2"></i> Select team
                  </button>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="text-sm font-semibold text-gray-500 mt-4">
                Memory Management
              </h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <button
                    onClick={() => setView('templates')}
                    className={`w-full flex items-center hover:text-gray-900 p-2 rounded-md focus:outline-none ${
                      view === 'templates'
                        ? 'border border-gray-200 text-black'
                        : 'text-gray-700'
                    }`}
                  >
                    <i className="fas fa-file-alt mr-2"></i> Templates
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="p-4">
          <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
            Save changes
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white relative">
        {/* Close button */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none">
          <i className="fas fa-times"></i>
        </button>

        {/* Chat Select and Chat Name Editing */}
        

        <div id="content">
          {/* Team Profile View: Shows current chat info */}
          {view === 'team-profile' && (
            
            <div>
                <div className="mb-8">
          <div className="flex items-center mb-4">
            <label
              htmlFor="chat-select"
              className="block text-sm font-medium text-gray-700 mr-2"
            >
              Select Chat:
            </label>
            <select
              id="chat-select"
              value={currentChatId ? currentChatId.toString() : ''}
              onChange={handleChatSelectChange}
              className="block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {chats.map((chat) => (
                <option key={chat.id} value={chat.id}>
                  {chat.name}
                </option>
              ))}
              <option value="new">New Chat</option>
            </select>
          </div>
          <div className="flex items-center">
            {!isEditingChatName ? (
              <>
                <span className="text-lg font-medium text-gray-700">
                  {currentChat.name}
                </span>
                <button
                  onClick={() => {
                    setIsEditingChatName(true);
                    setTempChatName(currentChat.name);
                  }}
                  className="ml-2 text-sm text-blue-500 hover:underline focus:outline-none"
                >
                  Edit
                </button>
              </>
            ) : (
              <input
                type="text"
                value={tempChatName}
                onChange={(e) => setTempChatName(e.target.value)}
                onKeyPress={handleChatNameKeyPress}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          </div>
        </div>
               <h1 className="text-2xl font-semibold">Current Chat Info</h1>
              <p className="mt-4 text-gray-700">
                Chat Name: <strong>{currentChat.name}</strong>
              </p>
              <br/>
        
            <div>
              <h1 className="text-2xl font-semibold">Current Team</h1>
              <p className="mt-4 text-gray-700">
                Team: <strong>{currentChat.team || 'No team selected'}</strong>
              </p>
              <h1 className="text-2xl font-semibold mt-8">Current Templates</h1>
              <p className="mt-4 text-gray-700">
                Templates:{' '}
                <strong>
                  {currentChat.templates && currentChat.templates.length > 0
                    ? currentChat.templates.join(', ')
                    : 'No templates selected'}
                </strong>
              </p>
            </div>
       

             
              
              
            </div>
          )}

          {/* Select Team View: Choose a team for the current chat */}
          {view === 'select-team' && (
            <div>
              <h1 className="text-2xl font-semibold">
                Select Team for Current Chat
              </h1>
              <p className="mt-4 text-gray-700">
                Select a team from the list below:
              </p>
              <ul className="mt-4 space-y-2">
                {teams.map((team) => (
                  <li key={team}>
                    <button
                      onClick={() => handleTeamSelect(team)}
                      className={`w-full flex items-center text-gray-700 hover:text-gray-900 p-2 rounded-md focus:outline-none ${
                        currentChat.team === team ? 'border border-gray-200' : ''
                      }`}
                    >
                      {team}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Templates View: Toggle templates for the current chat */}
          {view === 'templates' && (
            <div>
              <h1 className="text-2xl font-semibold">
                Templates for Current Chat
              </h1>
              <p className="mt-4 text-gray-700">
                Select or deselect templates for the current chat:
              </p>
              {templateData.map((memberData) => (
                <div key={memberData.member} className="mt-4">
                  <h2 className="text-xl font-semibold">
                    {memberData.member}
                  </h2>
                  <ul className="mt-2 space-y-2">
                    {memberData.templates.map((template) => (
                      <li key={template}>
                        <button
                          onClick={() => toggleTemplate(template)}
                          className={`w-full flex items-center text-gray-700 hover:text-gray-900 p-2 rounded-md focus:outline-none ${
                            currentChat.templates.includes(template)
                              ? 'border border-gray-200'
                              : ''
                          }`}
                        >
                          {template}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSettings;
