import React, { useState } from 'react';
import { FiSend, FiBook, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showPrompts, setShowPrompts] = useState(true);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);

  const prompts: Prompt[] = [
    {
      title: "Create Social Media Content",
      description: "Learn how to create engaging posts for your platforms",
      query: "How do I create engaging social media content?"
    },
    {
      title: "Brand Management",
      description: "Set up and manage your brand identity",
      query: "How do I set up my brand on SocialHub?"
    },
    {
      title: "Content Strategy",
      description: "Develop an effective content strategy",
      query: "Help me create a content strategy"
    },
    {
      title: "Analytics Understanding",
      description: "Learn to interpret your performance metrics",
      query: "How do I understand my analytics?"
    },
    {
      title: "Platform Integration",
      description: "Connect and manage multiple social platforms",
      query: "How do I connect my social media accounts?"
    },
    {
      title: "Content Calendar",
      description: "Plan and schedule your content effectively",
      query: "How do I create a content calendar?"
    },
    {
      title: "Audience Growth",
      description: "Strategies to grow your social media following",
      query: "How can I grow my audience?"
    },
    {
      title: "Campaign Creation",
      description: "Create and manage social media campaigns",
      query: "Guide me through creating a campaign"
    },
    {
      title: "Performance Tracking",
      description: "Monitor and improve your content performance",
      query: "How do I track content performance?"
    },
    {
      title: "AI Tools Usage",
      description: "Make the most of SocialHub's AI features",
      query: "How do I use AI tools effectively?"
    }
  ];

  const getRoadmap = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();

    if (lowercaseQuery.includes("content") && lowercaseQuery.includes("create")) {
      return `Here's your roadmap to create engaging social media content:

1. Set Up Your Brand Profile
   → Go to the "Brands" tab in the sidebar
   → Click "Add Brand" and fill in your company details
   → Upload brand assets and guidelines

2. Plan Your Content
   → Click "Create from Scratch" in the top-right corner
   → Fill in your company and campaign details
   → Select your target platforms

3. Generate and Customize
   → Use the AI-powered content generator
   → Edit and refine the generated content
   → Preview how it will look on different platforms

4. Schedule or Publish
   → Choose between immediate posting or scheduling
   → Set your preferred date and time if scheduling
   → Monitor performance in the Analytics dashboard`;
    }

    if (lowercaseQuery.includes("brand")) {
      return `Follow these steps to set up your brand on SocialHub:

1. Access Brand Management
   → Click on "Brands" in the sidebar
   → Select "Add Brand" button

2. Enter Brand Details
   → Fill in your company name
   → Add product/service descriptions
   → Upload brand assets and guidelines

3. Add Training Resources
   → Upload documents about your brand
   → Add URLs to important brand resources
   → Include brand images and style guides

4. Connect Platforms
   → Go to "Platforms" in the sidebar
   → Connect your social media accounts
   → Configure posting preferences

5. Start Creating Content
   → Use "Create from Scratch" button
   → Select your brand from the list
   → Let AI generate on-brand content`;
    }

    if (lowercaseQuery.includes("strategy")) {
      return `Let's develop your content strategy:

1. Define Your Goals
   → Go to "Analytics" to review current performance
   → Set measurable objectives
   → Identify target audience metrics

2. Set Up Brand Guidelines
   → Navigate to "Brands" tab
   → Create detailed brand profile
   → Upload style guides and resources

3. Plan Content Mix
   → Use "Create from Scratch"
   → Experiment with different content types
   → Set up content calendar

4. Implement and Monitor
   → Schedule posts across platforms
   → Track performance in Analytics
   → Adjust strategy based on insights`;
    }

    if (lowercaseQuery.includes("analytics")) {
      return `Here's how to understand your analytics:

1. Access Analytics Dashboard
   → Click "Analytics" in the sidebar
   → View overall performance metrics
   → Check platform-specific stats

2. Understand Key Metrics
   → Engagement rates
   → Audience growth
   → Content performance
   → Best posting times

3. Generate Reports
   → Filter by date range
   → Compare platform performance
   → Export data for presentations

4. Take Action
   → Identify top-performing content
   → Optimize posting schedule
   → Refine content strategy`;
    }

    // Default response for other queries
    return `I can help you with that! Here's a general guide:

1. Navigate to the relevant section in the sidebar
2. Use the "Create from Scratch" button for new content
3. Follow the step-by-step wizard
4. Preview and publish your content

Would you like more specific guidance about any particular feature?`;
  };

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    setMessages([...messages, { type: 'user', content: text }]);
    setInput('');
    setShowPrompts(false);
    setShowPromptLibrary(false);

    setTimeout(() => {
      const response = getRoadmap(text);
      setMessages(prev => [...prev, { type: 'ai', content: response }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && showPrompts ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-3">
                How can I help you today?
              </h2>
              <p className="text-indigo-600/80 text-lg">
                Choose a prompt below or write your own question
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[calc(100vh-20rem)] overflow-y-auto">
              {prompts.slice(0, 6).map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(prompt.query)}
                  className="text-left p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-pink-50 hover:from-indigo-100 hover:to-pink-100 transition-colors group border border-transparent hover:border-indigo-200"
                >
                  <h3 className="font-semibold text-indigo-900 mb-1 flex items-center justify-between">
                    {prompt.title}
                    <FiArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-sm text-indigo-600/80">{prompt.description}</p>
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
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-4"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
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

      <div className="border-t border-indigo-100 p-6">
        <div className="relative">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about SocialHub..."
                className="w-full rounded-xl border border-indigo-200 pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => setShowPromptLibrary(!showPromptLibrary)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-indigo-50 rounded-lg transition-colors text-indigo-600"
                title="Select Prompt"
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
            <div className="absolute bottom-full mb-2 left-0 w-full bg-white rounded-xl shadow-lg border border-indigo-100 max-h-60 overflow-y-auto">
              {prompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(prompt.query)}
                  className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-colors border-b border-indigo-50 last:border-0"
                >
                  <h4 className="font-medium text-indigo-900">{prompt.title}</h4>
                  <p className="text-sm text-indigo-600/80">{prompt.description}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};