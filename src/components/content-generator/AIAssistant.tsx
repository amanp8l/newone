import React, { useState } from 'react';
import { FiZap, FiRefreshCw, FiSun, FiCamera, FiX, FiSend, FiLoader } from 'react-icons/fi';

interface Message {
  type: 'user' | 'ai';
  content: string;
}

interface AIAssistantProps {
  onClose: () => void;
  onGenerate: (type: 'new' | 'rephrase' | 'professional' | 'casual') => void;
  onGenerateImage: () => void;
  isGenerating: boolean;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  onClose,
  onGenerate,
  onGenerateImage,
  isGenerating
}) => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user' as const, content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000));

    const aiResponses = [
      "I'll help you create engaging content based on that! Let me work on it...",
      "Great idea! Let me craft something special for you...",
      "I understand what you're looking for. Here's what I suggest..."
    ];

    const aiMessage = { 
      type: 'ai' as const, 
      content: aiResponses[Math.floor(Math.random() * aiResponses.length)]
    };
    setMessages(prev => [...prev, aiMessage]);

    // Generate content after AI response
    onGenerate('new');
  };

  if (showChat) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm h-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-indigo-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-lg">
              <FiZap className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-indigo-900">AI Chat</h3>
          </div>
          <button
            onClick={() => setShowChat(false)}
            className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-indigo-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-4 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white'
                    : 'bg-gradient-to-r from-indigo-50 to-pink-50 text-indigo-900'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-indigo-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tell me what kind of content you need..."
              className="flex-1 rounded-lg border border-indigo-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSend}
              disabled={isGenerating}
              className="p-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <FiLoader className="w-5 h-5 animate-spin" />
              ) : (
                <FiSend className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-indigo-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-lg">
            <FiZap className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-indigo-900">AI Assistant</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <FiX className="w-5 h-5 text-indigo-400" />
        </button>
      </div>

      <div className="flex-1 space-y-4">
        <button
          onClick={() => setShowChat(true)}
          className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-pink-50 hover:from-indigo-100 hover:to-pink-100 transition-colors"
        >
          <FiZap className="w-5 h-5 text-indigo-600" />
          <div className="text-left">
            <span className="block text-indigo-900 font-medium">Generate with Chat</span>
            <span className="text-sm text-indigo-600">Describe what content you need</span>
          </div>
        </button>

        <div className="space-y-3">
          <button
            onClick={() => onGenerate('rephrase')}
            disabled={isGenerating}
            className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-colors disabled:opacity-50"
          >
            <FiRefreshCw className="w-5 h-5 text-indigo-600" />
            <div className="text-left">
              <span className="block text-indigo-900 font-medium">Rephrase Content</span>
              <span className="text-sm text-indigo-600">Rewrite the existing content</span>
            </div>
          </button>

          <button
            onClick={() => onGenerate('professional')}
            disabled={isGenerating}
            className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-colors disabled:opacity-50"
          >
            <FiSun className="w-5 h-5 text-indigo-600" />
            <div className="text-left">
              <span className="block text-indigo-900 font-medium">Make Professional</span>
              <span className="text-sm text-indigo-600">Convert to formal business tone</span>
            </div>
          </button>

          <button
            onClick={() => onGenerate('casual')}
            disabled={isGenerating}
            className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-colors disabled:opacity-50"
          >
            <FiSun className="w-5 h-5 text-indigo-600" />
            <div className="text-left">
              <span className="block text-indigo-900 font-medium">Make Casual</span>
              <span className="text-sm text-indigo-600">Convert to friendly, informal tone</span>
            </div>
          </button>

          <button
            onClick={onGenerateImage}
            disabled={isGenerating}
            className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-colors disabled:opacity-50"
          >
            <FiCamera className="w-5 h-5 text-indigo-600" />
            <div className="text-left">
              <span className="block text-indigo-900 font-medium">Generate Image</span>
              <span className="text-sm text-indigo-600">Create AI-generated image</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};