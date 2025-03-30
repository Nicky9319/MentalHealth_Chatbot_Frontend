/* eslint-disable react/prop-types */

const MembersList = ({ members, selectedMembers, toggleMember }) => {
  return (
    <div className="mt-4 max-h-64 overflow-y-auto text-left rounded-sm scrollbar-thin ">
      {members.map((member) => (
        <div
          key={member.id}
          onClick={() => toggleMember(member.id)}
          className={`flex items-center py-2 border-b cursor-pointer ${
            selectedMembers.includes(member.id) ? "bg-gray-700" : "bg-gray-800"
          }`}
        >
          {/* <img
            src={member.avatar || "https://via.placeholder.com/40"}
            alt={member.name}
            className="w-10 h-10 rounded-full"
          /> */}
          <span className="ml-4 text-gray-100">{member.name}</span>
        </div>
      ))}
    </div>
  );
};

export default MembersList;
