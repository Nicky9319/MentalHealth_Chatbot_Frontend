import { useState } from "react";
import TeamNav from "./TeamNav";
import TeamSideBar from "./TeamSideBar";
import PlanBilling from "./PlanBilling";
import CreateTeam from "./CreateTeam";
import CreateMemory from "./CreateMemory";
import CreateTemplate from "./CreateTemplate";
import TeamChat from "./TeamChat";
import Chatbar from "./ChatBar";
import InitialChatWindow from "./InitialChatWindow";
import LaterChat from "./LaterChat";
import ChatInfoPanel from "./ChatInfoPanel";
import ChatSettings from "./ChatSettings";
import ChatWindow from "./ChatWindow";
import ChatApp from "./ChatApp";
import QuestionBoard from "./QuestionBoard";

const Team = () => {
  const [selectedTab, setSelectedTab] = useState("PlanBilling");
  const [chatStarted, setChatStarted] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedChatbotId, setSelectedChatbotId] = useState(null);

  return (
    <div className="flex flex-col">
      <TeamNav />
      {/* Add padding-top to offset the fixed TeamNav height */}
      <div className="pt-16 flex flex-grow">
        <TeamSideBar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        <div className="flex-grow p-5 flex ml-54">
          <div className="flex-grow">
            {selectedTab === "PlanBilling" && <PlanBilling />}
            {selectedTab === "Teams" && <CreateTeam />}
            {selectedTab === "Memories" && <CreateMemory />}
            {selectedTab === "Chat Settings" && (
              <ChatSettings
                initialTeamId={selectedTeamId}
                initialChatId={selectedChatbotId}
                onSaveSuccess={(teamId, chatId) => {
                  setSelectedTeamId(teamId);
                  setSelectedChatbotId(chatId);
                  setSelectedTab("Interact");
                }}
              />
            )}
            {selectedTab === "Create Template" && <CreateTemplate />}
            {selectedTab === "Question Board" && <QuestionBoard />}
            {selectedTab === "Interact" && (
              <div className="flex w-full">
                <div className="flex-grow">
                  <ChatApp
                    selectedTeamId={selectedTeamId}
                    selectedChatbotId={selectedChatbotId}
                  />
                </div>
                <div className="min-h-[80.6vh] bg-white">
                  <ChatInfoPanel
                    onChatSelect={(teamId, chatbotId) => {
                      setSelectedTeamId(teamId);
                      setSelectedChatbotId(chatbotId);
                    }}
                    onEditChatSettings={() => setSelectedTab("Chat Settings")}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
