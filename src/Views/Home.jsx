import Sidebar from "../Components/Sidebar/Sidebar1";
import ProfilePage from "../Views/Profile/ProfilePage";
import TeamsPage from "../Views/Teams/TeamsPage";
import HomePage from "../Views/Home/HomePage";
import { useState } from "react";
import SearchInput from "../Components/SearchInput";
// import MyLoc from "../Components/MyLoc";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("home");

  // Mapping activeComponent to a readable title
  const pageTitles = {
    home: "Home",
    teams: "Teams",
    profile: "Profile",
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "home":
        return <HomePage />;
      case "teams":
        return <TeamsPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="flex-1 flex flex-col p-4 pl-0 justify-evenly">
        {/* Header with title and search bar */}
        <div className="flex flex-row items-baseline justify-between h-fit align-middle gap-2">
          {/*
          <MyLoc pageTitles={pageTitles} activeComponent={activeComponent} />
          */}
          {/* <div className="w-full">
            <SearchInput />
          </div> */}
          {/*
          <div className=""></div>
          */}
        </div>
        {/* Render the selected component */}
        <div className="flex-1">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default Home;
