import React, { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";
import Chatbar from "./ChatBar";
import Cookies from "js-cookie";

const ChatApp = ({ selectedTeamId, selectedChatbotId }) => {
  const [messages, setMessages] = useState([]);
  // const SERVER_IP = import.meta.env.VITE_APP_BACKEND_URL;;
  const SERVER_IP = import.meta.env.VITE_APP_BACKEND_URL;

  // Retrieve the email from the "USER_DATA" cookie.
  const userData = Cookies.get("USER_DATA");
  const userEmail = userData ? JSON.parse(userData).EMAIL : "";

  // Fetch historical messages from the API.
  useEffect(() => {
    if (selectedTeamId && selectedChatbotId) {
      // Construct the payload.
      const payload = {
        CHATBOT_ID: selectedChatbotId,
        TEAM_ID: selectedTeamId,
        EMAIL: userEmail,
      };
      console.log(selectedChatbotId);
      console.log(selectedTeamId);

      // Construct the GET URL with the payload encoded in the query string.
      const url = `${SERVER_IP}/GetTeamChatbotIDMessages?data=${encodeURIComponent(
        JSON.stringify(payload)
      )}`;

      console.log("Fetching messages from:", url);

      // Fetch the messages and transform the API response.
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log("Response from GET endpoint:", data);
          // Extract the INTERACTIONS array from the API response.
          const interactions = data.INTERACTIONS || [];
          // Transform each interaction to the format expected by ChatWindow.
          const transformedMessages = interactions.map((interaction, index) => ({
            id: index, // Unique ID for each message.
            triggeredBy: "User", // Or update based on your logic.
            time: interaction.TIMESTAMP,
            title: "User Query",
            body: interaction.USER_MESSAGE,
            teamName: "Example Team", // Replace with an actual team name if available.
            pending: false, // Historical messages are not pending.
            chat: interaction.BOT_RESPONSE,
          }));
          // Update the messages state.
          setMessages(transformedMessages);
        })
        .catch((error) => console.error("Error fetching messages:", error));
    }
  }, [selectedTeamId, selectedChatbotId, userEmail]);

  // Function to handle sending a new message.
  const handleSend = async (messageText) => {
    const id = Date.now();

    // Create a new message object for the user's query.
    const userMessage = {
      id,
      triggeredBy: "You",
      time: new Date().toLocaleTimeString(),
      title: "Your Query",
      body: messageText,
      teamName: "Team Name", // Replace with the actual team name if available.
      pending: true,
    };

    // Append the new user message to the messages state.
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch(`${SERVER_IP}/GetTeamChatResponse`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        CHATBOT_ID: selectedChatbotId,
        USER_MESSAGE: messageText,
        EMAIL: userEmail,
        TEAM_ID: selectedTeamId,
      }),
      });
      if (response.status === 404) {
        alert("No Relevant Information Was Found To Answer your Query, The Respective Question have been added to the Question Board for the Team to Answer");
        // Remove the message from the state
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
      }

      if (!response.ok) {
      throw new Error("Failed to fetch response");
      }

      const responseData = await response.json();

      // Update the sent message with the bot's response.
      setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id
        ? {
          ...msg,
          pending: false,
          chat: responseData.GENERATED_MESSAGE || "No response received.",
          }
        : msg
      )
      );
    } catch (error) {
      console.error("Error fetching chat response:", error);
      // In case of error, update the message to reflect the failure.
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
    <div className="flex flex-col max-h-[92vh]">
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
