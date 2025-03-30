import React, { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";
import Chatbar from "./ChatBar"; // Assumes you have a ChatBar component for message input.
import Cookies from "js-cookie";

const ChatApp = ({ selectedTeamId, selectedChatbotId }) => {
  // Original historical interactions array.
  const INTERACTIONS = [
    {
      USER_MESSAGE: "yoo",
      BOT_RESPONSE:
        "Hey! What’s up? Just let me know if you want to chat about something!",
      TIMESTAMP: "2025-02-13_23:56:06",
    },
    {
      USER_MESSAGE: "hey",
      BOT_RESPONSE: "Hey! Just hanging out. What’s up with you?",
      TIMESTAMP: "2025-02-13_23:56:36",
    },
  ];

  // Transform the interactions into the format expected by ChatWindow.
  const historyMessages = INTERACTIONS.map((interaction, index) => ({
    id: index, // Unique id for each historical message.
    triggeredBy: "User",
    time: interaction.TIMESTAMP,
    title: "User Query",
    body: interaction.USER_MESSAGE,
    teamName: "Example Team", // Replace with the actual team name if available.
    pending: false, // Historical messages are not pending.
    chat: interaction.BOT_RESPONSE,
  }));

  // Initialize the messages state with the historical messages.
  const [messages, setMessages] = useState(historyMessages);
  const SERVER_IP = import.meta.env.VITE_APP_BACKEND_URL;;

  // Retrieve the email from the "USER_DATA" cookie.
  const userData = Cookies.get("USER_DATA");
  const userEmail = userData ? JSON.parse(userData).EMAIL : "";

  // Log the current team and chatbot IDs for debugging.
  useEffect(() => {
    console.log("Selected Team ID in ChatApp:", selectedTeamId);
    console.log("Selected Chatbot ID in ChatApp:", selectedChatbotId);
  }, [selectedTeamId, selectedChatbotId]);

  // Handle sending a new message.
  const handleSend = async (messageText) => {
    const id = Date.now();

    const userMessage = {
      id,
      triggeredBy: "You",
      time: new Date().toLocaleTimeString(),
      title: "Your Query",
      body: messageText,
      teamName: "Team Name", // Replace with the actual team name if available.
      pending: true,
    };

    // Append the new user message to the state.
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch(`${SERVER_IP}/GetTeamChatResponse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CHATBOT_ID: selectedChatbotId,
          USER_MESSAGE: messageText,
          EMAIL: userEmail, // Use the email from the cookie.
          TEAM_ID: selectedTeamId,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const responseData = await response.json();

      // Update the message with the bot's response.
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === id
            ? {
                ...msg,
                pending: false,
                chat:
                  responseData.GENERATED_MESSAGE ||
                  "No response received.",
              }
            : msg
        )
      );
    } catch (error) {
      console.error("Error fetching chat response:", error);
      // Update the message in case of an error.
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === id
            ? { ...msg, pending: false, chat: "Failed to get a response." }
            : msg
        )
      );
    }
  };

  return (
    <div className="flex flex-col min-h-[70vh]">
      <div className="flex-grow overflow-y-auto">
        <ChatWindow
          messages={messages}
          selectedTeamId={selectedTeamId}
          selectedChatbotId={selectedChatbotId}
        />
      </div>
      <Chatbar onSend={handleSend} />
    </div>
  );
};

export default ChatApp;
