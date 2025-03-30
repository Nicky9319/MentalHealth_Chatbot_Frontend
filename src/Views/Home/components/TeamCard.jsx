import { MoreHorizontal, Users } from "lucide-react";

export default function TeamCard({ id, teamName, memberCount, onSelect }) {
  return (
    <div
      onClick={() => onSelect(id)}
      className="relative w-64 h-40 p-4 bg-gray-700 shadow-md rounded-2xl border cursor-pointer hover:shadow-lg transition"
    >
      {/* Menu Ellipsis */}
      <button
        onClick={(e) => e.stopPropagation()} // Prevent card click if button is clicked
        className="absolute top-2 right-2 text-gray-500"
      >
        <MoreHorizontal size={20} />
      </button>

      {/* Team Name & Member Count */}
      <div className="absolute bottom-6 left-4">
        <p className="text-lg font-semibold text-white">{teamName}</p>
        <div className="flex items-center text-gray-600 text-sm mt-1">
          <Users size={16} className="mr-1" />
          <span>{memberCount} Members</span>
        </div>
      </div>
    </div>
  );
}
