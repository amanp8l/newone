import React, { useState } from 'react';
import { FiMic, FiPhoneCall, FiPhoneOff, FiMessageSquare } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const InboundCall: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [messages, setMessages] = useState<{ type: 'user' | 'agent'; text: string }[]>([]);
  const [isListening, setIsListening] = useState(false);

  const handleStartCall = () => {
    setIsCallActive(true);
    setMessages([
      {
        type: 'agent',
        text: "Hello! I'm your AI assistant. How can I help you today?"
      }
    ]);
  };

  const simulateAgentResponse = () => {
    const responses = [
      "I understand your concern. Let me help you with that.",
      "Could you please provide more details about your request?",
      "I'm checking our system for that information.",
      "Is there anything else you'd like to know?",
      "Thank you for your patience. I'm processing your request."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'agent', text: randomResponse }]);
    }, 1000);
  };

  const handleMicClick = () => {
    setIsListening(true);
    // Simulate user speaking
    setTimeout(() => {
      setIsListening(false);
      setMessages(prev => [...prev, { type: 'user', text: "I need help with my account settings." }]);
      simulateAgentResponse();
    }, 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {!isCallActive ? (
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-32 h-32 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <img
                src="https://avatars.githubusercontent.com/u/1?v=4"
                alt="AI Assistant"
                className="w-24 h-24 rounded-full object-cover"
              />
            </motion.div>
            
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-4">
              AI Voice Assistant
            </h2>
            
            <p className="text-indigo-600 mb-8 max-w-md mx-auto">
              Start a conversation with our AI voice assistant. Ask questions, get help, or just chat!
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartCall}
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl flex items-center space-x-3 mx-auto"
            >
              <FiPhoneCall className="w-6 h-6" />
              <span className="font-medium">Start Conversation</span>
            </motion.button>
          </div>
        ) : (
          <div className="h-[600px] flex flex-col">
            {/* Call Header */}
            <div className="p-6 bg-gradient-to-r from-indigo-500 to-pink-500 text-white flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src="https://avatars.githubusercontent.com/u/1?v=4"
                  alt="AI Assistant"
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div>
                  <h3 className="font-medium">AI Assistant</h3>
                  <p className="text-sm opacity-90">Active Call</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCallActive(false)}
                className="p-2 bg-pink-500 rounded-full"
              >
                <FiPhoneOff className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-4 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white'
                        : 'bg-gradient-to-r from-indigo-50 to-pink-50 text-indigo-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <FiMessageSquare className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {message.type === 'user' ? 'You' : 'AI Assistant'}
                      </span>
                    </div>
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-indigo-100">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMicClick}
                className={`w-full py-4 rounded-xl flex items-center justify-center space-x-3 ${
                  isListening
                    ? 'bg-pink-500 text-white'
                    : 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white'
                }`}
              >
                <FiMic className={`w-6 h-6 ${isListening ? 'animate-pulse' : ''}`} />
                <span className="font-medium">
                  {isListening ? 'Listening...' : 'Hold to Speak'}
                </span>
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};