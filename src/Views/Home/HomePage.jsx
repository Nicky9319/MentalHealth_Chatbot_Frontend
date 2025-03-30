import { useEffect, useState } from "react";

const HomePage = () => {
  const [greeting, setGreeting] = useState("");
  const [recentCards, setRecentCards] = useState([]);
  const userName = localStorage.getItem("userName") || "User"; // Placeholder for user name

  useEffect(() => {
    // Update greeting based on the time of day
    const hours = new Date().getHours();
    let timeGreeting = "Good evening";
    if (hours < 12) {
      timeGreeting = "Good morning";
    } else if (hours < 18) {
      timeGreeting = "Good afternoon";
    }
    setGreeting(timeGreeting);

    // Load recent cards only if not already set
    const savedCards = JSON.parse(localStorage.getItem("recentCards")) || [];
    if (savedCards.length === 0) {
      const defaultCards = ["Project Update", "Meeting Notes", "Task List"];
      localStorage.setItem("recentCards", JSON.stringify(defaultCards));
      setRecentCards(defaultCards);
    } else {
      setRecentCards(savedCards);
    }
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-5xl font-bold">
        {greeting}, {userName}!  
      </h1>
      <p className="mt-4 text-lg text-gray-300">
        Welcome to <span className="text-blue-400 font-semibold">Convergence AI</span>,  
        your AI-powered assistant for streamlining cross-functional communication  
        and knowledge retention.
      </p>

     
    </div>
  );
};

export default HomePage;
