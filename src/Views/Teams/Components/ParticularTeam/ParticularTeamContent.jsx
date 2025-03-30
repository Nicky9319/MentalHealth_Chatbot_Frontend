/* eslint-disable react/prop-types */
import { useState } from "react";
import ChatPage from "./Chat/ChatPage";
import TemplatePage from "./Template/TemplatePage";

// eslint-disable-next-line no-unused-vars
const ParticularTeamContent = ({ teamName, teamId }) => {
  const [activeTab, setActiveTab] = useState("CHAT");

  return (
    <div className="pl-2 text-white  w-full">
      {/* Horizontal Tab Bar */}
      <div className="flex justify-evenly w-full gap-2 p-2 rounded">
        <button
          className={`px-2 py-1  ${
            activeTab === "CHAT" ? "border-b-2 border-white" : ""
          }`}
          onClick={() => setActiveTab("CHAT")}
        >
          CHAT
        </button>
        <button
          className={`px-2 py-1 ${
            activeTab === "TEMPLATE" ? "border-b-2 border-white" : ""
          }`}
          onClick={() => setActiveTab("TEMPLATE")}
        >
          TEMPLATE
        </button>
      </div>

      {/* Render Active Tab Content */}
      <div className="mt-4">
        {activeTab === "CHAT" ? <ChatPage /> : <TemplatePage />}
      </div>
    </div>
  );
};

export default ParticularTeamContent;
