/* eslint-disable react/prop-types */
const ChatSettingsModal = ({ chatbot, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-[400px]">
        <h2 className="mb-4">Settings for {chatbot.name}</h2>
        {/* Add additional settings here as needed */}
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ChatSettingsModal;
