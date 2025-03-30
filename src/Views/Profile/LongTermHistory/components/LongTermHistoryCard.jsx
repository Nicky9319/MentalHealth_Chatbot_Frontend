/* eslint-disable react/prop-types */
// LongTermHistoryCard.jsx

import { FaEdit, FaTrash } from "react-icons/fa";

const LongTermHistoryCard = ({
  memory,
  isEditing,
  editingData,
  onEdit,
  onDelete,
  onTitleChange,
  onDescriptionChange,
  onCancelEdit,
  onSaveEdit,
}) => {
  if (isEditing) {
    // Editing mode for new or existing memories (no extra delete button)
    return (
      <div className="bg-gray-800 text-gray-100 p-4 rounded-lg mb-2 border-b">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Title"
            value={editingData.title}
            onChange={onTitleChange}
            className="w-full p-2 bg-gray-700 text-gray-100 outline-none"
          />
          <textarea
            placeholder="Description"
            value={editingData.description}
            onChange={onDescriptionChange}
            className="w-full p-2 mt-2 bg-gray-700 text-gray-100 outline-none"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={onCancelEdit}
              className="px-2 py-1 bg-gray-600 rounded hover:bg-gray-500"
              title="Cancel"
            >
              Cancel
            </button>
            <button
              onClick={onSaveEdit}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              title="Save"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    // Normal (read-only) mode with a consistent dark color scheme
    return (
      <div className="bg-gray-800 text-gray-100 p-4 rounded-lg mb-2 border-b flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">{memory.title}</h3>
          <p className="mt-1 text-gray-600">{memory.description}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(memory)}
            className="text-blue-400 hover:text-blue-300"
            title="Edit"
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={() => onDelete(memory.id)}
            className="text-red-400 hover:text-red-300"
            title="Delete"
          >
            <FaTrash size={18} />
          </button>
        </div>
      </div>
    );
  }
};

export default LongTermHistoryCard;
