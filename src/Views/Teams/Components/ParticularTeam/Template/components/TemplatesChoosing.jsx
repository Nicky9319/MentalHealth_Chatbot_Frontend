/* eslint-disable react/prop-types */
import UserAccordion from "./userAccordion";

const TemplatesChoosing = ({
  users,
  selectedTemplates,
  onTemplateSelect,
  onSave,
  chatbots,
  selectedChatbot,
  onChatbotChange,
}) => {
  return (
    <div className="relative h-full max-h-[500px] srollbar-thin border-r border-gray-300">
      {/* Dropdown for Chatbot selection at the top */}
      <div className="p-4 border-b border-gray-300 mr-2 scrollbar-thin ">
        <select
          value={selectedChatbot.id}
          onChange={onChatbotChange}
          className="w-full border border-gray-300 p-2 rounded"
        >
          {chatbots.map((chatbot) => (
            <option
              key={chatbot.id}
              className="bg-gray-400 focus:bg-gray-800"
              value={chatbot.id}
            >
              <option
                key={chatbot.id}
                value={chatbot.id}
                className={
                  selectedChatbot === String(chatbot.id)
                    ? "bg-gray-800 text-white"
                    : "bg-gray-400"
                }
              ></option>
              {chatbot.name}
            </option>
          ))}
        </select>
      </div>

      {/* Scrollable list of user accordions */}
      <div className="p-4 overflow-y-auto h-full scrollbar-thin">
        {users.map((user) => (
          <UserAccordion
            key={user.id}
            user={user}
            selectedTemplates={selectedTemplates[user.id] || []}
            onTemplateSelect={onTemplateSelect}
          />
        ))}
      </div>

      {/* Fixed Save Button at the bottom right of this section */}
      <button
        onClick={onSave}
        className="absolute scrollbar-thin bottom-[-2rem] right-0 bg-white text-black px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default TemplatesChoosing;
