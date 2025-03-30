import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const SERVER_IP = import.meta.env.VITE_APP_BACKEND_URL;

const QuestionBoard = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // Holds answer text for each question by id
  const [loading, setLoading] = useState({}); // Tracks loading state for each question

  // Fetch all teams when component mounts
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        let userData = Cookies.get("USER_DATA");
        userData = JSON.parse(userData);
        const email = userData["EMAIL"];

        // Use cached teams data if available
        const teamsData = Cookies.get("TEAMS_DATA");
        if (teamsData) {
          setTeams(JSON.parse(teamsData));
          return;
        }

        const response = await fetch(
          `${SERVER_IP}/GetAllTeams?data={"EMAIL": "${email}"}`
        );
        const serverResponse = await response.json();
        if (response.ok) {
          // Adjusting to the server's key names: TEAM_ID and TEAM_NAME
          const fetchedTeams = serverResponse["TEAMS"];
          setTeams(fetchedTeams);
          Cookies.set("TEAMS_DATA", JSON.stringify(fetchedTeams));
        } else {
          console.error("Failed to fetch teams:", serverResponse);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  // Fetch questions for the selected team whenever it changes
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!selectedTeam) {
        setQuestions([]);
        return;
      }

      let payload = {
        TEAM_ID: selectedTeam,
      };

      try {
        const response = await fetch(
          `${SERVER_IP}/GetQuestionBoardFromTeamID?data=${JSON.stringify(payload)}`
        );
        const data = await response.json();
        if (data.STATUS === "QUESTIONS_RETRIEVED") {
          // Normalize the API response
          const normalizedQuestions = data.QUESTIONS_REMAINING.map((q) => ({
            id: q.QUESTION_ID,
            text: q.QUESTION,
          }));
          setQuestions(normalizedQuestions);
        } else {
          console.error("Unexpected API response:", data);
        }
      } catch (error) {
        console.error("Error fetching questions for team:", error);
      }
    };

    fetchQuestions();
  }, [selectedTeam]);

  // Update the answer state when a textarea changes
  const handleAnswerChange = (questionId, text) => {
    setAnswers((prev) => ({ ...prev, [questionId]: text }));
  };

  // Handle submission of an answer for a given question
  const handleSubmit = async (questionId) => {
    // Retrieve the answer text for the question and trim it
    const answerText = (answers[questionId] || "").trim();
    if (!answerText) {
      alert("The answer block is empty. Please provide an answer.");
      return;
    }

    // Set loading state for this question
    setLoading((prev) => ({ ...prev, [questionId]: true }));

    try {
      // Build payload with keys expected by the backend
      const payload = {
        TEAM_ID: selectedTeam,
        QUESTION_ID: questionId,
        QUESTION_ANSWER: answerText,
      };

      // API call to submit the answer
      const response = await fetch(
        `${SERVER_IP}/SubmitAnswerToQuestionBoard`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();

      // Check if the API returned a positive response
      if (response.ok) {
        alert("Your answer has been submitted successfully.");
        // Remove the question from the board
        setQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q.id !== questionId)
        );
        // Optionally, remove the answer entry for the question
        setAnswers((prev) => {
          const updated = { ...prev };
          delete updated[questionId];
          return updated;
        });
        // Remove loading state for the question
        setLoading((prev) => {
          const updated = { ...prev };
          delete updated[questionId];
          return updated;
        });
      } else {
        alert("There was an error submitting your answer. Please try again.");
        setLoading((prev) => ({ ...prev, [questionId]: false }));
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("An error occurred. Please try again later.");
      setLoading((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  return (
    <div className="p-6">
      {/* Header with title and dropdown */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Question Board</h1>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select a team
          </option>
          {teams.map((team) => (
            <option key={team.TEAM_ID} value={team.TEAM_ID}>
              {team.TEAM_NAME}
            </option>
          ))}
        </select>
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div
              key={question.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Answer a Random Question
                </h2>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                  <span className="text-sm text-gray-500">{question.text}</span>
                  <span className="text-sm text-gray-400">Required</span>
                </div>
                <div className="mt-4 flex items-center">
                  <textarea
                    className="flex-grow p-2 border border-gray-300 rounded-lg mr-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your answer here..."
                    value={answers[question.id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                  ></textarea>
                  <button
                    onClick={() => handleSubmit(question.id)}
                    disabled={loading[question.id]}
                    className="text-sm text-gray-700 bg-gray-200 px-4 py-2 rounded-lg whitespace-nowrap hover:bg-gray-300 flex items-center justify-center"
                  >
                    {loading[question.id] ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin h-5 w-5 text-gray-700 mr-2"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      "Submit Answer"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-6">
            {selectedTeam
              ? "No questions for the selected team"
              : "Please select a team to see its questions"}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionBoard;
