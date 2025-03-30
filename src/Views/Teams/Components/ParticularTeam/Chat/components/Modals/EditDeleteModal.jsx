/* eslint-disable react/prop-types */
import { FiEdit, FiTrash2 } from "react-icons/fi";

const EditDeleteModal = ({ onEdit, onDelete, onClose, className = "" }) => {
  return (
    <div className={`absolute ${className} bg-gray-900 rounded-md shadow-lg`}>
      <button
        onClick={() => {
          onEdit();
          onClose && onClose();
        }}
        className="flex items-center w-full px-4 py-2 hover:bg-gray-800 focus:outline-none"
      >
        <FiEdit className="text-white mr-2" />
        <span className="text-white text-sm">Edit</span>
      </button>
      <button
        onClick={() => {
          onDelete();
          onClose && onClose();
        }}
        className="flex items-center w-full px-4 py-2 hover:bg-gray-800 focus:outline-none"
      >
        <FiTrash2 className="text-white mr-2" />
        <span className="text-white text-sm">Delete</span>
      </button>
    </div>
  );
};

export default EditDeleteModal;
