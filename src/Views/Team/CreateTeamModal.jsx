import React, { useRef } from "react";
import Cookies from "js-cookie";

const SERVER_IP = import.meta.env.VITE_APP_BACKEND_URL;;
// const SERVER_IP = "http://127.0.0.1:5000";

const CreateTeamModal = ({ onClose }) => {
  const nameRef = useRef();
  const descriptionRef = useRef();

  const handleCreateTeam = async () => {
    let userData = Cookies.get("USER_DATA");
    userData = JSON.parse(userData);
    let email = userData["EMAIL"];

    let teamName = nameRef.current.value;

    console.log("Creating team with email:", email, "and team name:", teamName);

    try {
      const response = await fetch(`${SERVER_IP}/CreateNewTeam`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          TEAM_NAME: teamName,
          EMAIL: email,
          // Include any additional fields if required by your API
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create team");
      }
      const data = await response.json();
      console.log("Server response:", data);
      // Assume the server returns a TEAM_ID on success
      onClose(); // Close the modal after successful team creation
      return data.TEAM_ID;
    } catch (error) {
      console.error("Error creating team:", error);
      return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm ">
      <div className="bg-white rounded-lg shadow-lg w-[600px] p-5">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold text-gray-900">Create a new team</h2>
          <button className="text-gray-400 text-2xl hover:text-gray-600" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Team name</label>
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="e.g. Design Team"
            ref={nameRef}
          />

          <label className="text-sm text-gray-700 mb-1">Team description</label>
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Type description..."
            ref={descriptionRef}
          />
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md cursor-pointer"
            onClick={handleCreateTeam}
          >
            Create team
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamModal;
