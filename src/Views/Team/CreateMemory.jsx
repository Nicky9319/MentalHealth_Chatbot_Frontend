import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";

const SERVER_IP = import.meta.env.VITE_APP_BACKEND_URL;;
// const SERVER_IP = "http://127.0.0.1:5000";

const CreateMemory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [memoryName, setMemoryName] = useState("");
  const [memoryDescription, setMemoryDescription] = useState("");
  const [memories, setMemories] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const fetchMemories = async () => {
    try {
      let userData = Cookies.get("USER_DATA");
      userData = JSON.parse(userData);
      let userEmail = userData["EMAIL"];
      console.log("User Email:", userEmail);

      let messageToSend = { EMAIL: userEmail };
      let messageInJson = JSON.stringify(messageToSend);

      const response = await fetch(`${SERVER_IP}/GetAllLongTermMemory?data=${messageInJson}`);
      let data;
      if (response.ok) {
        data = await response.json();
        console.log("Long Term Memories Received :", data);
      } else {
        data = {
          LONG_TERM_MEMORY: []
        };
      }

      const formattedMemories = data.LONG_TERM_MEMORY.map((item) => ({
        ID: item.ID,
        SUBJECT: item.SUBJECT,
        SUBJECT_INFORMATION: item.SUBJECT_INFORMATION,
      }));

      setMemories(formattedMemories);
    } catch (error) {
      console.error("Error fetching memories:", error);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const toggleMemoryContent = () => {
    setIsOpen(!isOpen);
  };

  const editMemory = (index) => {
    setMemoryName(memories[index].SUBJECT);
    setMemoryDescription(memories[index].SUBJECT_INFORMATION);
    setEditingIndex(index);
    setIsOpen(true);
  };

  const createMemory = async () => {
    let userData = Cookies.get("USER_DATA");
    userData = JSON.parse(userData);
    let userEmail = userData["EMAIL"];

    const payload = {
      "SUBJECT": memoryName,
      "SUBJECT_INFORMATION": memoryDescription,
      "EMAIL": userEmail,
    };

    try {
      const response = await fetch(`${SERVER_IP}/AddLongTermMemory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log("Create Memory Response:", responseData);

      if (response.ok) {
        console.log("Memory created successfully");
        alert("Memory created successfully");
        fetchMemories(); // Refetch memories after creation
        setMemoryName(""); // Reset memory name input
        setMemoryDescription(""); // Reset memory description input
        setIsOpen(false); // Close the component
      } else {
        console.error("Failed to create memory");
      }
    } catch (error) {
      console.error("Error creating memory:", error);
    }
  };
  
  const deleteMemory = async (index) => {
    const memoryToDelete = memories[index];
    let userData = Cookies.get("USER_DATA");
    userData = JSON.parse(userData);
    let userEmail = userData["EMAIL"];

    const payload = {
      "MEMORY_ID": memoryToDelete.ID,
      "EMAIL": userEmail,
    };

    try {
      const response = await fetch(`${SERVER_IP}/DeleteLongTermMemory`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log("Delete Memory Response:", responseData);

      if (response.ok) {
        console.log("Memory deleted successfully");
        alert("Memory deleted successfully");
        fetchMemories(); // Refetch memories after delete
        setMemories(memories.filter((_, i) => i !== index));
      } else {
        console.error("Failed to delete memory");
      }
    } catch (error) {
      console.error("Error deleting memory:", error);
    }
  };

  const updateMemory = async (id, title, description) => {
    let userData = Cookies.get("USER_DATA");
    userData = JSON.parse(userData);
    let userEmail = userData["EMAIL"];

    const payload = {
      "MEMORY_ID": id,
      "SUBJECT": title,
      "SUBJECT_INFORMATION": description,
      "EMAIL": userEmail,
    };

    console.log("Payload to update memory:", payload);

    try {
      const response = await fetch(`${SERVER_IP}/UpdateLongTermMemory`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Memory updated successfully:", responseData);
        fetchMemories(); // Refetch memories after update
        setMemoryName(""); // Reset memory name input
        setMemoryDescription(""); // Reset memory description input
        setEditingIndex(null); // Reset editing index
        setIsOpen(false); // Close the component
      } else {
        console.error("Failed to update memory");
      }
    } catch (error) {
      console.error("Error updating memory:", error);
    }
  };

  return (
    <div className="p-6 font-inter">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Memories</h1>
      </div>

      <div className="">
        <div
          className="flex justify-between items-center cursor-pointer p-3 border border-gray-200 rounded-md"
          onClick={toggleMemoryContent}
        >
          <h2 className="text-lg font-bold">{editingIndex !== null ? "Edit Memory" : "Create New Memory"}</h2>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {isOpen && (
          <div className="mt-5">
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Memory Name</label>
              <input
                type="text"
                placeholder="Enter memory name"
                value={memoryName}
                onChange={(e) => setMemoryName(e.target.value)}
                className="border border-gray-200 px-3 py-2 rounded-md w-full"
              />
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Memory Description</label>
              <textarea
                placeholder="Enter memory description"
                value={memoryDescription}
                onChange={(e) => setMemoryDescription(e.target.value)}
                className="border border-gray-200 px-3 py-2 rounded-md w-full h-24"
              />
            </div>
            <button
              className="bg-black text-white px-4 py-2 rounded-md w-full"
              onClick={() => {
                if (editingIndex !== null) {
                  updateMemory(memories[editingIndex].ID, memoryName, memoryDescription).then(() => {
                    alert("Memory updated successfully");
                    fetchMemories();
                  });
                } else {
                  createMemory();
                }
              }}
            >
              {editingIndex !== null ? "Update Memory" : "Save Memory"}
            </button>
          </div>
        )}
      </div>
      <br />
      <br />

      {/* Display Memories */}
      <div>
        <h2 className="text-lg font-bold mb-3">All Memories</h2>
        {memories.length === 0 ? (
          <p className="text-gray-500">No memories saved yet.</p>
        ) : (
          memories.map((memory, index) => (
            <div key={memory.ID} className="bg-white shadow rounded-lg p-4 mb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-md">{memory.SUBJECT}</h3>
                <p className="text-gray-600">{memory.SUBJECT_INFORMATION}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-500" onClick={() => editMemory(index)}>
                  <FaEdit />
                </button>
                <button className="text-red-500" onClick={() => deleteMemory(index)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CreateMemory;