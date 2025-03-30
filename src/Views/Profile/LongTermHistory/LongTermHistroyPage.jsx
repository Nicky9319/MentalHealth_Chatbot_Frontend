import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import LongTermHistoryCard from "./components/LongTermHistoryCard";

const LongTermHistory = () => {
  const [memories, setMemories] = useState([
    {
      id: 1,
      title: "Graduation Day",
      description: "Graduated with honors from University XYZ in 2010.",
    },
    {
      id: 2,
      title: "First Job",
      description: "Started my career at Company ABC in 2011.",
    },
    {
      id: 3,
      title: "Wedding Day",
      description: "Married my best friend in a beautiful ceremony in 2015.",
    },
    // Add more sample memories as needed to test pagination
    {
      id: 4,
      title: "First House",
      description: "Bought my first house in 2018.",
    },
    {
      id: 5,
      title: "Travel Adventure",
      description: "Explored Europe during summer 2019.",
    },
    {
      id: 6,
      title: "New Career",
      description: "Started a new role at Company XYZ in 2020.",
    },
  ]);

  // Holds the memory currently being edited (or a new one with id=null)
  const [editingMemory, setEditingMemory] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const memoriesPerPage = 3;
  const totalPages = Math.ceil(memories.length / memoriesPerPage);

  // Ensure current page is valid if memories change (eg. deletion)
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [memories, currentPage, totalPages]);

  // Calculate which memories to show on the current page
  const startIndex = (currentPage - 1) * memoriesPerPage;
  const currentMemories = memories.slice(
    startIndex,
    startIndex + memoriesPerPage
  );

  // --- Handlers for Memory Actions ---

  // Add a new memory (opens a blank editing card)
  const handleAddNewMemory = () => {
    if (editingMemory) return; // one editing at a time
    setEditingMemory({ id: null, title: "", description: "" });
  };

  // Start editing an existing memory
  const handleEdit = (memory) => {
    if (editingMemory) return;
    setEditingMemory({ ...memory });
  };

  const handleDelete = (id) => {
    setMemories(memories.filter((mem) => mem.id !== id));
    if (editingMemory && editingMemory.id === id) {
      setEditingMemory(null);
    }
  };

  const handleDeleteAll = () => {
    setMemories([]);
    setEditingMemory(null);
  };

  const handleTitleChange = (e) => {
    setEditingMemory({ ...editingMemory, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setEditingMemory({ ...editingMemory, description: e.target.value });
  };

  const handleCancelEdit = () => {
    setEditingMemory(null);
  };

  const handleSaveEdit = () => {
    if (!editingMemory) return;
    if (editingMemory.id === null) {
      // New memory: assign a unique id (using Date.now() here)
      const newMemory = { ...editingMemory, id: Date.now() };
      setMemories([...memories, newMemory]);
    } else {
      // Update existing memory
      setMemories(
        memories.map((mem) =>
          mem.id === editingMemory.id ? editingMemory : mem
        )
      );
    }
    setEditingMemory(null);
  };

  return (
    <div className="bg-gray-800 shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-100">Long Term Memories</h2>
        <div className="flex space-x-4">
          <button
            onClick={handleAddNewMemory}
            className="text-gray-300 hover:text-gray-200"
            title="Add New Memory"
          >
            <FaPlus size={18} />
          </button>
          <button
            onClick={handleDeleteAll}
            className="text-gray-300 hover:text-gray-200"
            title="Delete All Memories"
          >
            <FaTrash size={18} />
          </button>
        </div>
      </div>
      <ul className="space-y-4">
        {/* Render a card for a new memory if it's being added */}
        {editingMemory && editingMemory.id === null && (
          <LongTermHistoryCard
            key="new"
            memory={editingMemory}
            isEditing={true}
            editingData={editingMemory}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
            onCancelEdit={handleCancelEdit}
            onSaveEdit={handleSaveEdit}
          />
        )}
        {currentMemories.map((memory) => (
          <LongTermHistoryCard
            key={memory.id}
            memory={memory}
            isEditing={editingMemory && editingMemory.id === memory.id}
            editingData={
              editingMemory && editingMemory.id === memory.id
                ? editingMemory
                : null
            }
            onEdit={handleEdit}
            onDelete={handleDelete}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
            onCancelEdit={handleCancelEdit}
            onSaveEdit={handleSaveEdit}
          />
        ))}
      </ul>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1 ? "bg-gray-700 text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default LongTermHistory;
