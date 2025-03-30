/* eslint-disable react/prop-types */
import { useState } from "react";
import TemplatesChoosing from "./components/TemplatesChoosing";
import ChatBox from "../Chat/components/ChatBox";

const TemplatePage = () => {
  // Example team members with templates
  const users = [
    {
      id: 1,
      name: "Alice",
      templates: [
        { id: "cycling", label: "Cycling" },
        { id: "github", label: "GitHub" },
        { id: "coding", label: "Coding" },
      ],
    },
    {
      id: 2,
      name: "Bob",
      templates: [
        { id: "cycling", label: "Cycling" },
        { id: "github", label: "GitHub" },
        { id: "music", label: "Music" },
      ],
    },
    {
      id: 3,
      name: "Charlie",
      templates: [
        { id: "travel", label: "Travel" },
        { id: "blog", label: "Blog" },
        { id: "design", label: "Design" },
      ],
    },
    {
      id: 4,
      name: "Dana",
      templates: [
        { id: "travel", label: "Travel" },
        { id: "blog", label: "Blog" },
        { id: "design", label: "Design" },
      ],
    },
    {
      id: 5,
      name: "Evan",
      templates: [
        { id: "travel", label: "Travel" },
        { id: "blog", label: "Blog" },
        { id: "design", label: "Design" },
      ],
    },
    {
      id: 6,
      name: "Fiona",
      templates: [
        { id: "travel", label: "Travel" },
        { id: "blog", label: "Blog" },
        { id: "design", label: "Design" },
      ],
    },
    {
      id: 7,
      name: "Fiona",
      templates: [
        { id: "travel", label: "Travel" },
        { id: "blog", label: "Blog" },
        { id: "design", label: "Design" },
      ],
    },
    {
      id: 8,
      name: "Fiona",
      templates: [
        { id: "travel", label: "Travel" },
        { id: "blog", label: "Blog" },
        { id: "design", label: "Design" },
      ],
    },
    {
      id: 9,
      name: "Fiona",
      templates: [
        { id: "travel", label: "Travel" },
        { id: "blog", label: "Blog" },
        { id: "design", label: "Design" },
      ],
    },
  ];

  // List of chatbots for the dropdown
  const chatbots = [
    { id: 1, name: "Chatbot One" },
    { id: 2, name: "Chatbot Two" },
    { id: 3, name: "Chatbot Three" },
  ];

  // State: selected templates per user, selected chatbot, and message for ChatBox
  const [selectedTemplates, setSelectedTemplates] = useState({});
  const [selectedChatbot, setSelectedChatbot] = useState(chatbots[0]);
  const [message, setMessage] = useState("");

  // Toggle a template selection for a given user
  const handleTemplateSelect = (userId, templateId) => {
    setSelectedTemplates((prev) => {
      const prevSelected = prev[userId] || [];
      if (prevSelected.includes(templateId)) {
        return {
          ...prev,
          [userId]: prevSelected.filter((id) => id !== templateId),
        };
      } else {
        return {
          ...prev,
          [userId]: [...prevSelected, templateId],
        };
      }
    });
  };

  // Save logic (for example, send the selected templates to an API)
  const handleSave = () => {
    console.log("Saving selected templates:", selectedTemplates);
    // Add your save logic here.
  };

  // Handle chatbot selection from the dropdown
  const handleChatbotChange = (e) => {
    const chatbotId = Number(e.target.value);
    const chatbot = chatbots.find((c) => c.id === chatbotId);
    setSelectedChatbot(chatbot);
  };

  // Handle sending a message in the ChatBox
  const handleSend = () => {
    console.log(`Sending message: ${message}`);
    setMessage("");
  };

  return (
    <div className="grid grid-cols-[300px_1fr] h-full min-h-[550px] no-scroll">
      {/* Left Column: TemplatesChoosing component */}
      <TemplatesChoosing
        users={users}
        selectedTemplates={selectedTemplates}
        onTemplateSelect={handleTemplateSelect}
        onSave={handleSave}
        chatbots={chatbots}
        selectedChatbot={selectedChatbot}
        onChatbotChange={handleChatbotChange}
      />

      {/* Right Column: ChatBox (center aligned) */}
      <div className="p-4 flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-2xl mb-4">PLAYGROUD</h1>
        <ChatBox
          chatbot={selectedChatbot}
          message={message}
          setMessage={setMessage}
          onSend={handleSend}
        />
      </div>
    </div>
  );
};

export default TemplatePage;
