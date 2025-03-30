import React, { useEffect, useRef } from "react";
import Cookies from "js-cookie";



const SERVER_IP = import.meta.env.VITE_APP_BACKEND_URL;
const ChatWindow = ({ messages, selectedTeamId, selectedChatbotId }) => {
  const containerRef = useRef(null);

  // Auto-scroll to the bottom whenever the messages array changes.
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch messages from the endpoint and log the result.
  useEffect(() => {
    if (selectedTeamId && selectedChatbotId) {
      // Get the email from the cookie
      const userData = Cookies.get("USER_DATA");
      const userEmail = userData ? JSON.parse(userData).EMAIL : "";
      
      // Construct the payload
      const payload = {
        CHATBOT_ID: selectedChatbotId,
        TEAM_ID: selectedTeamId,
        EMAIL: userEmail,
      };

      // Construct the GET URL with the payload encoded in the query string.
      const url = `${SERVER_IP}/GetTeamChatbotIDMessages?data=${encodeURIComponent(
        JSON.stringify(payload)
      )}`;
      
      // Log the URL so you can see the full request.
      console.log("Fetching messages from:", url);

      // Fetch the messages and log the response.
      fetch(url)
        .then((response) => response.json())
        .then((data) => console.log("Response from GET endpoint:", data))
        .catch((error) => console.error("Error fetching messages:", error));
    }
  }, [selectedTeamId, selectedChatbotId]);

  // When there are no messages, display an initial window.
  const InitialChatWindow = () => (
    <div className="flex justify-center items-center min-h-[80vh] bg-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mt-2">
          Team Name (ID: {selectedTeamId || "None"})
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Chatbot ID: {selectedChatbotId || "None"}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="mt-6 p-4 border border-gray-300 rounded-md inline-block text-left">
          <h3 className="text-lg font-semibold">Get started</h3>
          <p className="mt-2 text-gray-700">
            Start with a query to get the best responses.
          </p>
        </div>
      </div>
    </div>
  );

  // Single Message component to handle both pending and completed messages.
  const Message = ({ message }) => (
    <div className="flex flex-col items-center bg-white p-4">
      {/* Notification Card */}
      <div className="w-4/5 max-w-lg border border-gray-300 rounded-lg bg-white shadow-md">
        {/* Card Header */}
        <div className="flex justify-between items-center px-5 py-3 bg-gray-100 border-b border-gray-300 rounded-t-lg">
          <span className="text-sm text-gray-600">{message.triggeredBy}</span>
          <span className="text-xs text-gray-500">{message.time}</span>
        </div>
        {/* Card Body */}
        <div className="p-5">
          <h2 className="text-lg font-semibold text-gray-800">
            {message.title}
          </h2>
          <p className="text-gray-700 text-md mt-1">{message.body}</p>
        </div>
      </div>

      {/* Team Name */}
      <div className="mt-10 w-4/5 max-w-lg text-left font-bold text-gray-800 text-md">
        {message.teamName}
      </div>

      {/* Chat Bubble or Sending Indicator */}
      <div className="mt-3 ml-50 p-4 border border-gray-300 rounded-md bg-white w-3/5 max-w-lg text-left text-gray-800 text-md">
        {message.pending ? "Sending..." : message.chat}
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-[80vh]">
      {messages.length === 0 ? (
        <InitialChatWindow />
      ) : (
        <div ref={containerRef} className="overflow-y-auto max-h-[80vh]">
          {messages.map((msg) => (
            <Message key={msg.id} message={msg} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
