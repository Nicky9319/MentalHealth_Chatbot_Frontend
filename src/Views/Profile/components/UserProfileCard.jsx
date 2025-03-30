/* eslint-disable react/prop-types */
// UserProfileCard.jsx

const UserProfileCard = ({ user }) => {
  return (
    <div className="bg-gray-400 shadow rounded-lg p-6 mb-6">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">{user.name}</h1>
      <p className="text-gray-600">{user.email}</p>
      {/* LinkedIn PDF Input */}
    </div>
  );
};

export default UserProfileCard;
