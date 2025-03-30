import { LayoutDashboard, Users, Folder, FileText, LogOut, Settings, HelpCircle, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import Cookies from "js-cookie";

const TeamSideBar = ({ setSelectedTab, selectedTab }) => {
  const menuItems = [
    { name: "PlanBilling", label: "Plan & Billing", icon: LayoutDashboard },
    { name: "Teams", label: "Teams", icon: Folder },
    { name: "Create Template", label: "Create Template", icon: FileText },
    { name: "Memories", label: "Memories", icon: Users },
    { name: "Interact", label: "Interact", icon: MessageSquare }, // New Interact Button
    { name: "Question Board", label: "Question Board", icon: HelpCircle }, // New Question Board Button
    // { name: "Chat Settings", label: "Chat Settings", icon: Settings }, 
  ];
  const handleLogout = () => {
    Cookies.remove("USER_DATA");
    Cookies.remove("TEAMS_DATA");

    window.location.href = "/login";
  };

  return (
    <div className="w-52 min-h-[91.6vh] bg-white shadow-md p-5 flex flex-col fixed">
      {/* Main Menu Items */}
      {menuItems.map((item) => (
        <button
          key={item.name}
          onClick={() => setSelectedTab(item.name)}
          className={`flex items-center p-2 rounded-md text-sm font-medium transition-all ${
            selectedTab === item.name ? "text-black" : "text-gray-600 grayscale"
          } hover:bg-gray-100`}
        >
          <item.icon className="w-5 h-5 mr-3" />
          {item.label}
        </button>
      ))}

      {/* Bottom Section */}
      <div className="mt-auto flex flex-col gap-2">
       
        <button
          onClick={() => setSelectedTab("Chat Settings")}
          className="flex items-center p-2 rounded-md text-sm font-medium transition-all text-gray-600 grayscale hover:bg-gray-100"
        >
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </button>
        
        <button
          onClick={() => setSelectedTab("Suggestion")}
          className="flex items-center p-2 rounded-md text-sm font-medium transition-all text-gray-600 grayscale hover:bg-gray-100"
        >
          <MessageSquare className="w-5 h-5 mr-3" />
          Suggestion
        </button>
        <button
          onClick={() => setSelectedTab("Help")}
          className="flex items-center p-2 rounded-md text-sm font-medium transition-all text-gray-600 grayscale hover:bg-gray-100"
        >
          <HelpCircle className="w-5 h-5 mr-3" />
          Help
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center p-2 rounded-md text-sm font-medium transition-all text-gray-600 grayscale hover:bg-gray-100"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Log Out
        </button>
        
      </div>
    </div>
  );
};

export default TeamSideBar;
