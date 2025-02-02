import React, { useState } from 'react';
import { FiSend, FiBook, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useThemeStore } from '../../store/themeStore';

interface Message {
  type: 'user' | 'ai';
  content: string;
}

interface Prompt {
  title: string;
  description: string;
  query: string;
}

export const AIChat: React.FC = () => {
  const { isDark } = useThemeStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showPrompts, setShowPrompts] = useState(true);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);

  const prompts: Prompt[] = [
    {
      title: "Getting Started",
      description: "Learn the basics of using SocialHub",
      query: "How do I get started with SocialHub?"
    },
     {
      title: "Content Creation",
      description: "Learn about content creation features",
      query: "How do I create content using SocialHub?"
    },
    {
      title: "Brand Management",
      description: "Managing your brands effectively",
      query: "How do I manage my brands in SocialHub?"
    },
    {
      title: "AI Features",
      description: "Understanding AI capabilities",
      query: "What AI features are available in SocialHub?"
    },
    {
      title: "Analytics",
      description: "Understanding your performance metrics",
      query: "How do I use analytics in SocialHub?"
    },
    {
      title: "Account Settings",
      description: "Managing your account and preferences",
      query: "How do I manage my account settings?"
    }
  ];

  const getHelpResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();

    if (lowercaseQuery.includes("get started")) {
      return `Welcome to SocialHub! Here's how to get started:

1. Set Up Your Account
   → Complete your profile information
   → Add your company details
   → Connect your social media accounts

2. Create Your First Brand
   → Go to the "Brands" tab
   → Click "Add New Brand"
   → Fill in your brand details

3. Start Creating Content
   → Use AI-powered content generation
   → Schedule and publish posts
   → Monitor performance

Need help with any specific step?`;
    }

    if (lowercaseQuery.includes("content")) {
      return `Here's how to create content with SocialHub:

1. Choose Your Method
   → Quick Post: For rapid content creation
   → Create from Scratch: For detailed content planning
   → AI Agents: For specialized content generation

2. Select Platforms
   → Choose your target social media platforms
   → Customize content for each platform
   → Preview before publishing

3. Use AI Features
   → Generate content ideas
   → Optimize existing content
   → Create platform-specific variations

Would you like more details about any of these features?`;
    }

    // Default response
    return `I can help you with that! Here are some general tips:

1. Navigate using the sidebar menu
2. Explore different features one by one
3. Use the AI assistant for guidance

Would you like specific information about any particular feature?`;
  };

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    setMessages([...messages, { type: 'user', content: text }]);
    setInput('');
    setShowPrompts(false);
    setShowPromptLibrary(false);

    setTimeout(() => {
      const response = getHelpResponse(text);
      setMessages(prev => [...prev, { type: 'ai', content: response }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className={`flex-1 overflow-y-auto p-6 space-y-4 ${isDark ? 'text-gray-300' : ''}`}>
        {messages.length === 0 && showPrompts ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-3">
                How can I help you today?
              </h2>
              <p className={`text-lg ${isDark ? 'text-indigo-600/80' : 'text-indigo-600/80'}`}>
                Choose a topic below or ask your own question
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(prompt.query)}
                  className={`text-left p-4 rounded-xl ${
                    isDark 
                      ? 'bg-gray-700 hover:bg-gray-600 border-gray-600'
                      : 'bg-gradient-to-r from-indigo-50 to-pink-50 hover:from-indigo-100 hover:to-pink-100 border-transparent hover:border-indigo-200'
                  } transition-colors group border`}
                >
                  <h3 className={`font-semibold mb-1 flex items-center justify-between ${isDark ? 'text-gray-100' : 'text-indigo-900'}`}>
                    {prompt.title}
                    <FiArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-indigo-600/80'}`}>{prompt.description}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.length > 0 && (
              <button
                onClick={() => {
                  setMessages([]);
                  setShowPrompts(true);
                }}
                className={`flex items-center space-x-2 ${isDark ? 'text-indigo-600 hover:text-indigo-700' : 'text-indigo-600 hover:text-indigo-700'} mb-4`}
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>Back to Topics</span>
              </button>
            )}
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-4 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white'
                        : isDark 
                          ? 'bg-gray-700 text-gray-100'
                          : 'bg-gradient-to-r from-indigo-50 to-pink-50 text-indigo-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className={`border-t ${isDark ? 'border-gray-700' : 'border-indigo-100'} p-6`}>
        <div className="relative">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about SocialHub..."
                className={`w-full rounded-xl border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                    : 'border-indigo-200 focus:ring-indigo-500'
                } pl-4 pr-12 py-3 focus:outline-none focus:ring-2`}
              />
              <button
                onClick={() => setShowPromptLibrary(!showPromptLibrary)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 ${
                  isDark 
                    ? 'hover:bg-gray-600'
                    : 'hover:bg-indigo-50'
                } rounded-lg transition-colors ${isDark ? 'text-gray-300' : 'text-indigo-600'}`}
                title="Select Topic"
              >
                <FiBook className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => handleSend()}
              className="p-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-colors"
            >
              <FiSend className="w-5 h-5" />
            </button>
          </div>

          {showPromptLibrary && (
            <div className={`absolute bottom-full mb-2 left-0 w-full ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } rounded-xl shadow-lg border ${
              isDark ? 'border-gray-700' : 'border-indigo-100'
            } max-h-60 overflow-y-auto`}>
              {prompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(prompt.query)}
                  className={`w-full text-left px-4 py-3 ${
                    isDark 
                      ? 'hover:bg-gray-700 border-gray-700'
                      : 'hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 border-indigo-50'
                  } transition-colors border-b last:border-0`}
                >
                  <h4 className={`font-medium ${isDark ? 'text-gray-100' : 'text-indigo-900'}`}>{prompt.title}</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-indigo-600/80'}`}>{prompt.description}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};