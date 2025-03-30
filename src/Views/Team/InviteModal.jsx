import React, { useState, useRef, useEffect } from "react";

import Cookies from "js-cookie";

const SERVER_IP = import.meta.env.VITE_APP_BACKEND_URL;;
// const SERVER_IP = "http://127.0.0.1:5000";

const InviteModal = ({ onClose, teamID }) => {
  const [role, setRole] = useState("Editor");
  const [availableEmails, setAvailableEmails] = useState([]);
  const emailRef = useRef(null);

  useEffect(() => {
    const fetchAvailableEmails = async () => {
      try {
        const response = await fetch(`${SERVER_IP}/GetAllChatbots`);
        const data = await response.json();

        const emails = data.ALL_AVATARS.map(avatar => avatar.EMAIL);
        setAvailableEmails(emails);
        console.log("Available emails fetched:", emails);
      } catch (error) {
        console.error("Error fetching available emails:", error);
      }
    };

    fetchAvailableEmails();
  }, []);

  const handleSendInvite = async () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    if (!availableEmails.includes(email)) {
      alert("Email address not found in available emails.");
      return;
    }

    try {

      const payload = {
        "EMAIL" : email,
        "TEAM_ID" : teamID
      }
      
      const response = await fetch(`${SERVER_IP}/AddUserToTeam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log("Invite response:", result);
      alert("Invite sent successfully!");
    } catch (error) {
      console.error("Error sending invite:", error);
      alert("Failed to send invite.");
    }

    emailRef.current.value = ""; // Clear input after sending
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-5 w-[500px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Invite member</h2>
          <button className="text-gray-500 text-2xl hover:text-gray-700" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Team role</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Editor</option>
            <option>Viewer</option>
            <option>Admin</option>
          </select>
        </div>

        {/* Footer */}
        <div className="flex mt-2">
          <input
            type="email"
            className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
            placeholder="Type an email address..."
            ref={emailRef}
          />
          <button
            className="bg-black text-white px-4 py-2 rounded-md"
            onClick={handleSendInvite}
          >
            Send invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
