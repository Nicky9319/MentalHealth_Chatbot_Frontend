import React, { memo, useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";

const SERVER_IP = import.meta.env.VITE_APP_BACKEND_URL;;
// const SERVER_IP = "http://127.0.0.1:5000";

const CreateTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("ConvergeAI");
  const [templateName, setTemplateName] = useState("");
  // Now, selectedMemories holds an array of memory IDs (strings)
  const [selectedMemories, setSelectedMemories] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [teams, setTeams] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [longTermMemories, setLongTermMemories] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const [currentTemplateId, setCurrentTemplateId] = useState(null);


  const memories = [
    { name: "Sprint Planning", description: "Discussion on next sprint tasks." },
    { name: "Retrospective", description: "Reviewing past sprint performance." },
    { name: "Brainstorming", description: "Generating new project ideas." }
  ];

  useEffect(() => {
    const userData = Cookies.get("USER_DATA");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserEmail(parsedUserData.EMAIL);
    }

    const retrieveTeamName = async () => {
      console.log("Retrieving data from cookies");
      const data = Cookies.get("TEAMS_DATA");
      if (data) {
        console.log("Parsed DATA");
        let parsedData = JSON.parse(data);
        setTeams(parsedData);
        console.log("Teams Retrieved : ", parsedData);
      } else {
        console.log("No data in cookies, fetching from server");
        try {
          let data = Cookies.get("USER_DATA");
          data = JSON.parse(data);
          let email = data["EMAIL"];

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
      }
    };

    retrieveTeamName();
  }, []);

  // Updated to use IDs only
  const handleMemorySelection = (memory) => {
    const isSelected = selectedMemories.includes(memory.ID);
    if (isSelected) {
      setSelectedMemories(selectedMemories.filter((id) => id !== memory.ID));
    } else {
      setSelectedMemories([...selectedMemories, memory.ID]);
    }
  };

  const saveTemplate = async (teamId, userEmail) => {
    if (!teamId) {
      console.error("Team ID not found for the selected team");
      return;
    }
    const payload = {
      EMAIL: userEmail,
      TEAM_ID: teamId,
      TEMPLATE_NAME: templateName,
      // Pass selectedMemories (an array of IDs) directly
      LONG_TERM_MEMORY_ID_LIST: selectedMemories,
    };

    console.log("Payload:", payload);

    try {
      const response = await fetch(`${SERVER_IP}/CreateNewTemplate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        if (editingIndex !== null) {
          const updatedTemplates = [...templates];
          updatedTemplates[editingIndex] = { ID: result.TEMPLATE_ID, NAME: templateName, LONG_TERM_MEMORY_ID_LIST: selectedMemories };
          setTemplates(updatedTemplates);
          setEditingIndex(null);
        } else {
          setTemplates([...templates, { ID: result.TEMPLATE_ID, NAME: templateName, LONG_TERM_MEMORY_ID_LIST: selectedMemories }]);
        }
        setTemplateName("");
        setSelectedMemories([]);
        setIsOpen(false); // Close the dropdown after saving
        alert("New template has been added");
      } else {
        console.error("Failed to add template:", result);
        alert("Failed to add template");
      }
    } catch (error) {
      console.error("Error adding template:", error);
      alert("Error adding template");
    }
  };

  const openEditModal = async (index) => {
    console.log("Template Information : ", templates);
    console.log(templates[index]);
    setTemplateName(templates[index].NAME);
    // Now selectedMemories is an array of IDs from the server response
    setSelectedMemories(templates[index].LONG_TERM_MEMORY_ID_LIST);
    setEditingIndex(index);
    // Store the current template ID explicitly
    setCurrentTemplateId(templates[index].ID);
    setIsEditModalOpen(true);
    await fetchLongTermMemories();
  };


  const updateTemplate = async (teamID, userEmail, templateID) => {
    try {
      const payload = {
        TEAM_ID: teamID,
        EMAIL: JSON.parse(Cookies.get("USER_DATA")).EMAIL,
        TEMPLATE_ID: templateID,
        TEMPLATE_NAME: templateName,
        LONG_TERM_MEMORY_ID_LIST: selectedMemories,
      };

      console.log("Updating template memories with payload:", payload);

      const response = await fetch(`${SERVER_IP}/UpdateTemplate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to update template memories");
      }

      const result = await response.json();
      console.log("Template memories updated successfully:", result);

      // Update the local templates state with the new memories list
      if (editingIndex !== null) {
        const updatedTemplates = templates.map(template =>
          template.ID === templateID
            ? { ...template, NAME: templateName, LONG_TERM_MEMORY_ID_LIST: selectedMemories }
            : template
        );
        setTemplates(updatedTemplates);
      }

      alert("Template has been updated successfully");
    } catch (error) {
      console.error("Error updating template memories:", error);
      alert("Error updating template");
    }
  };



  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTemplateName("");
    setSelectedMemories([]);
    setEditingIndex(null);
  };

  const deleteTemplate = async (templateID, teamID) => {
    console.log(teamID, templateID);
    try {
      const payload = {
        EMAIL: userEmail,
        TEMPLATE_ID: templateID,
        TEAM_ID: teamID
      };

      const response = await fetch(`${SERVER_IP}/DeleteTemplate`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setTemplates(templates.filter((template) => template.ID !== templateID));
        alert("Template has been deleted");
      } else {
        console.error("Failed to delete template:", result);
        alert("Failed to delete template");
      }
    } catch (error) {
      console.error("Error deleting template:", error);
      alert("Error deleting template");
    }
  };

  const handleTeamSelection = async (teamName) => {
    setSelectedTeam(teamName);
    console.log(`Selected team: ${teamName}`);

    const selectedTeamObj = teams.find(team => team.TEAM_NAME === teamName);
    const teamId = selectedTeamObj ? selectedTeamObj.TEAM_ID : null;

    if (!teamId) {
      console.error("Team ID not found for the selected team");
      return;
    }

    const payload = { EMAIL: userEmail, TEAM_ID: teamId };

    try {
      const response = await fetch(`${SERVER_IP}/GetAllTemplates?data=${JSON.stringify(payload)}`);
      const data = await response.json();

      console.log(data);

      if (response.ok && data.TEMPLATES) {
        setTemplates(data.TEMPLATES);
        console.log("Templates retrieved:", data.TEMPLATES);
      } else {
        console.error("Failed to fetch templates or no templates found:", data);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const fetchLongTermMemories = async () => {
    try {
      let userData = Cookies.get("USER_DATA");
      userData = JSON.parse(userData);
      let userEmail = userData["EMAIL"];
      console.log("User Email:", userEmail);

      let messageToSend = { EMAIL: userEmail };
      let messageInJson = JSON.stringify(messageToSend);

      const response = await fetch(`${SERVER_IP}/GetAllLongTermMemory?data=${messageInJson}`);
      let data;
      if (response.ok) {
        data = await response.json();
        console.log("Long Term Memories Received :", data);
      } else {
        data = { LONG_TERM_MEMORY: [] };
      }

      const formattedMemories = data.LONG_TERM_MEMORY.map((item) => ({
        ID: item.ID,
        SUBJECT: item.SUBJECT,
        SUBJECT_INFORMATION: item.SUBJECT_INFORMATION,
      }));

      console.log(formattedMemories);

      setLongTermMemories(formattedMemories);
    } catch (error) {
      console.error("Error fetching memories:", error);
    }
  };

  const handleToggleCreateNewTemplate = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetchLongTermMemories();
    }
  };

  useEffect(() => {
    if (teams.length > 0) {
      handleTeamSelection(teams[0].TEAM_NAME);
    }
  }, [teams]);

  return (
    <div className="p-6 font-inter">
      <div className="mb-5">
        <label className="block text-gray-700 font-medium mb-2">Select Team</label>
        <select
          value={selectedTeam}
          onChange={(e) => handleTeamSelection(e.target.value)}
          className="px-3 py-2 border rounded-md w-full"
        >
          {teams.length > 0 ? (
            teams.map((team) => (
              <option key={team.TEAM_ID} value={team.TEAM_NAME}>{team.TEAM_NAME}</option>
            ))
          ) : (
            <option value="" disabled>No teams available</option>
          )}
        </select>
      </div>

      <div>
        <div
          className="flex justify-between items-center cursor-pointer p-3 border border-gray-200 rounded-md"
          onClick={handleToggleCreateNewTemplate}
        >
          <h2 className="text-lg font-bold">
            {editingIndex !== null ? "Edit Template" : "Create New Template"}
          </h2>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {isOpen && (
          <div className="mt-5">
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Template Name</label>
              <input
                type="text"
                placeholder="Enter template name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="border px-3 py-2 rounded-md w-full"
              />
            </div>

            <div className="mb-5">
              <h3 className="text-gray-700 font-medium mb-2">Select Memories</h3>
              <div className="flex flex-wrap gap-2">
                {longTermMemories.map((memory) => {
                  const isSelected = selectedMemories.includes(memory.ID);
                  return (
                    <div
                      key={memory.ID}
                      className={`cursor-pointer p-2 rounded-md ${isSelected ? 'border border-gray-200 text-black' : 'text-gray-500'}`}
                      onClick={() => handleMemorySelection(memory)}
                    >
                      {memory.SUBJECT}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              className="bg-black text-white px-4 py-2 rounded-md w-full"
              onClick={async () => {
                const selectedTeamObj = teams.find(team => team.TEAM_NAME === selectedTeam);
                if (selectedTeamObj) {
                  saveTemplate(selectedTeamObj.TEAM_ID, userEmail);
                } else {
                  console.error("Selected team object not found");
                }
              }}
            >
              {editingIndex !== null ? "Update Template" : "Save Template"}
            </button>

          </div>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold mb-3">All Templates</h2>
        {templates && templates.length === 0 ? (
          <p className="text-gray-500">No templates created yet.</p>
        ) : (
          templates.map((template, index) => {
            const selectedTeamObj = teams.find(team => team.TEAM_NAME === selectedTeam);
            const teamId = selectedTeamObj ? selectedTeamObj.TEAM_ID : null;
            return (
              <div key={template.ID} className="mb-4 p-4 border border-gray-200 rounded-md flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-md">{template.NAME}</h3>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-500" onClick={() => openEditModal(index)}>
                    <FaEdit />
                  </button>
                  <button className="text-red-500" onClick={() => deleteTemplate(template.ID, teamId)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/2">
            <h2 className="text-lg font-bold mb-4">Edit Template</h2>
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Template Name</label>
              <input
                type="text"
                placeholder="Enter template name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="border px-3 py-2 rounded-md w-full"
              />
            </div>

            <div className="mb-5">
              <h3 className="text-gray-700 font-medium mb-2">Select Memories</h3>
              <div className="flex flex-wrap gap-2">
                {longTermMemories.map((memory) => {
                  const isSelected = selectedMemories.includes(memory.ID);
                  return (
                    <div
                      key={memory.ID}
                      className={`cursor-pointer p-2 rounded-md ${isSelected ? 'border border-gray-200 text-black' : 'text-gray-500'}`}
                      onClick={() => handleMemorySelection(memory)}
                    >
                      {memory.SUBJECT}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={closeEditModal}>
                Cancel
              </button>

              <button
                className="bg-black text-white px-4 py-2 rounded-md"
                onClick={async () => {
                  const selectedTeamObj = teams.find(team => team.TEAM_NAME === selectedTeam);
                  if (selectedTeamObj) {
                    console.log(selectedTeamObj);
                    // Use currentTemplateId instead of templates[editingIndex].ID
                    updateTemplate(selectedTeamObj.TEAM_ID, userEmail, currentTemplateId);
                    closeEditModal();
                  } else {
                    console.error("Selected team object not found");
                  }
                }}
              >
                Save Changes
              </button>


            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTemplate;
