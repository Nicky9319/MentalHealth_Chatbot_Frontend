import React, { useState, useRef, useEffect } from 'react';

const ChatWindow = ({ sessionId, messages: initialMessages, onMessagesUpdate, makeApiRequest, generateResponse }) => {
  const [messages, setMessages] = useState(initialMessages || []);
  const [inputText, setInputText] = useState('');
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const messagesEndRef = useRef(null);

  // Update local messages when session changes
  useEffect(() => {
    setMessages(initialMessages || []);
  }, [initialMessages, sessionId]);

  // Remove the useEffect that was adding an initial greeting

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim() === '' || isWaitingForResponse) return;

    // Add user message
    const userMessage = { text: inputText, isUser: true };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    onMessagesUpdate(updatedMessages);
    
    const userMessageText = inputText;
    setInputText('');
    
    // Set waiting state to true
    setIsWaitingForResponse(true);

    try {
      // Generate AI response using the passed in generateResponse function
      const response = await generateResponse(sessionId, userMessageText);
      
      if (response) {
        if (response.messages) {
          // New format: Find the AI's response (should be the last message with type='ai')
          const aiMessageObj = response.messages.find(msg => msg.type === 'ai');
          
          if (aiMessageObj) {
            const aiResponse = { 
              text: aiMessageObj.content, 
              isUser: false 
            };
            const newMessages = [...updatedMessages, aiResponse];
            setMessages(newMessages);
            onMessagesUpdate(newMessages);
          }
        } else if (response.response) {
          // Fallback for old format where response is directly in response.response
          const aiResponse = { 
            text: response.response, 
            isUser: false 
          };
          const newMessages = [...updatedMessages, aiResponse];
          setMessages(newMessages);
          onMessagesUpdate(newMessages);
        }
      }
      
      setIsWaitingForResponse(false);
    } catch (error) {
      console.error("Error in chat exchange:", error);
      setIsWaitingForResponse(false);
      
      // Add error message
      const errorMessage = { 
        text: "Sorry, there was an error processing your request. Please try again.", 
        isUser: false 
      };
      const newMessages = [...updatedMessages, errorMessage];
      setMessages(newMessages);
      onMessagesUpdate(newMessages);
    }
  };

  const handleKeyDown = (e) => {
    // If Enter is pressed without Shift, submit the form
    if (e.key === 'Enter' && !e.shiftKey && !isWaitingForResponse) {
      e.preventDefault(); // Prevent default to avoid creating a new line
      handleSubmit(e);
    }
    // If Shift+Enter is pressed, let the default behavior (new line) happen
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg overflow-hidden shadow-lg">
      {/* Chat header */}
      <div className="bg-indigo-600 text-white px-4 py-3 flex items-center">
        <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
          </svg>
        </div>
        <div>
          <h2 className="font-semibold text-lg">AI Assistant</h2>
          <p className="text-xs text-indigo-200">Active Session</p>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                  message.isUser 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Start a new conversation</p>
          </div>
        )}
        {isWaitingForResponse && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center">
              <span className="typing-indicator">AI is typing</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t border-gray-300 p-4 bg-white">
        <div className="flex">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isWaitingForResponse ? "Waiting for response..." : "Type your message here... (Shift+Enter for new line)"}
            className={`flex-1 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[40px] max-h-[120px] resize-y ${
              isWaitingForResponse ? 'bg-gray-200 text-gray-500' : 'bg-gray-100'
            }`}
            rows={1}
            disabled={isWaitingForResponse}
          />
          <button 
            type="submit"
            className={`text-white px-4 py-2 rounded-r-lg transition-colors ${
              isWaitingForResponse ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            disabled={isWaitingForResponse}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
