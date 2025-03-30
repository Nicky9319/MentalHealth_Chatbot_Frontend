import React, { useState, useEffect } from 'react';
import LeftPanel from './Components/leftPanel';
import ChatWindow from './Components/chatWindow';

const MainPage = () => {
    // =========== State Management ===========
    const [sessions, setSessions] = useState([]);
    const [activeSession, setActiveSession] = useState(null);
    const [sessionData, setSessionData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Fetch sessions on initial load
    useEffect(() => {
        fetchAllSessions();
    }, []);

    // =========== API Functions ===========
    
    /**
     * Makes an API request to the specified endpoint
     * @param {string} endpoint - API endpoint
     * @param {string} method - HTTP method (GET, POST, etc.)
     * @param {object} data - Request data
     * @returns {Promise} - API response promise
     */
    const makeApiRequest = async (endpoint, method, data) => {
        console.log(`API ${method} to ${endpoint}:`, data);
        
        // Simulated API call - replace with actual implementation in production
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, data: "Simulated response" });
            }, 1000);
        });
        
        /* 
        // Actual API implementation:
        try {
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            
            if (method.toUpperCase() !== 'GET' && data) {
                options.body = JSON.stringify(data);
            }
            
            const response = await fetch(endpoint, options);
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error(`Error making ${method} request to ${endpoint}:`, error);
            throw error;
        }
        */
    };

    /**
     * Fetches all available sessions from the API
     */
    const fetchAllSessions = async () => {
        setIsLoading(true);
        try {
            console.log("Fetching all sessions...");
            
            // Simulated API response
            setTimeout(() => {
                const simulatedResponse = []; // Replace with actual response data
                
                if (simulatedResponse.length > 0) {
                    setSessions(simulatedResponse);
                }
                setIsLoading(false);
            }, 1000);

            /* 
            // Actual API call:
            const response = await makeApiRequest('/api/sessions', 'GET');
            if (response && Array.isArray(response)) {
                setSessions(response);
            }
            */
        } catch (error) {
            console.error("Error fetching sessions:", error);
            setIsLoading(false);
        }
    };

    /**
     * Fetches all messages for a specific session
     * @param {string} sessionId - ID of the session to fetch messages for
     */
    const fetchSessionMessages = async (sessionId) => {
        try {
            console.log("Fetching messages for session:", sessionId);
            const queryParam = encodeURIComponent(JSON.stringify({"SESSION_ID": sessionId}));
            
            // Simulated API call
            console.log(`GET /api/messages?data=${queryParam}`);
            
            // Simulate API response
            setTimeout(() => {
                setSessionData(prev => ({
                    ...prev,
                    [sessionId]: {
                        ...prev[sessionId],
                        messages: []
                    }
                }));
            }, 500);
            
            /* 
            // Actual API call:
            const response = await makeApiRequest(`/api/messages?data=${queryParam}`, 'GET');
            
            setSessionData(prev => ({
                ...prev,
                [sessionId]: {
                    ...prev[sessionId],
                    messages: response.messages || []
                }
            }));
            */
        } catch (error) {
            console.error("Error fetching session messages:", error);
        }
    };
    
    /**
     * Creates a new chat session
     */
    const createNewSession = async () => {
        // Generate new session name and ID
        const newSessionName = `Session ${sessions.length + 1}`;
        const newSessionId = Date.now().toString();

        // Update local state
        const updatedSessions = [...sessions, { id: newSessionId, name: newSessionName }];
        setSessions(updatedSessions);
        setActiveSession(newSessionId);
        setSessionData(prev => ({
            ...prev,
            [newSessionId]: {
                messages: [],
                created: new Date().toISOString()
            }
        }));

        // Make API request to create session on server
        try {
            const requestBody = {
                "SESSION_ID": newSessionId,
                "name": newSessionName
            };
            
            console.log("Creating new session...");
            console.log("POST /api/sessions", requestBody);
            
            // Actual implementation:
            // await makeApiRequest('/api/sessions', 'POST', requestBody);
        } catch (error) {
            console.error("Error creating session:", error);
        }
    };

    // =========== UI Event Handlers ===========
    
    /**
     * Handles selecting a session from the list
     * @param {string} sessionId - ID of the selected session
     */
    const handleSessionSelect = async (sessionId) => {
        setActiveSession(sessionId);
        
        // If we don't have the session data loaded yet, fetch it
        if (!sessionData[sessionId] || !sessionData[sessionId].messages) {
            await fetchSessionMessages(sessionId);
        }
    };

    /**
     * Updates messages for a specific session
     * @param {string} sessionId - ID of the session to update
     * @param {Array} messages - Updated message array
     */
    const updateSessionMessages = (sessionId, messages) => {
        setSessionData(prev => ({
            ...prev,
            [sessionId]: {
                ...prev[sessionId],
                messages: messages
            }
        }));
    };

    return (
        <div className="flex w-screen h-screen p-4 bg-gray-100">
            <div className="w-1/4 pr-4 h-full">
                <LeftPanel 
                    sessions={sessions} 
                    onAddSession={createNewSession} 
                    onSelectSession={handleSessionSelect}
                    activeSession={activeSession}
                    isLoading={isLoading}
                />
            </div>
            <div className="w-3/4 pl-4 h-full">
                {activeSession ? (
                    <ChatWindow 
                        sessionId={activeSession}
                        messages={sessionData[activeSession]?.messages || []}
                        onMessagesUpdate={(messages) => updateSessionMessages(activeSession, messages)}
                        makeApiRequest={makeApiRequest}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg shadow-lg">
                        <div className="text-center p-8">
                            <div className="mb-6 text-indigo-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Active Conversation</h3>
                            <p className="text-gray-600 mb-6">Click the "Add Session" button to start a new conversation.</p>
                            <button 
                                onClick={createNewSession}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Create New Session
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainPage;