import LinkedInPdfUploader from "./components/LinkedInPdfUploader";
import UserProfileCard from "./components/UserProfileCard";
import LongTermHistory from "./LongTermHistory/LongTermHistroyPage";

const ProfilePage = () => {
  // Example static user information (could also come from an API or context)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  const handlePDFUpload = (file) => {
    console.log("Uploaded PDF:", file);
    // Implement your file upload logic here
  };

  return (
    <div className="p-4 h-[600px] scrollbar-thin overflow-y-auto">
      <UserProfileCard user={user} />
      <LongTermHistory />
      <br />
      <LinkedInPdfUploader onFileUpload={handlePDFUpload} />
    </div>
  );
};

export default ProfilePage;
