import React, { useState } from 'react';
import { FiSend, FiCheck } from 'react-icons/fi';

interface AIChatProps {
  onSuggestion: (suggestion: string) => void;
  context: {
    company: string;
    description: string;
    topic: string;
    tone: string;
  };
}

interface Message {
  type: 'user' | 'ai';
  content: string;
  showApplyButton?: boolean;
}

export const AIChat: React.FC<AIChatProps> = ({ onSuggestion, context }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const generateDummyResponse = () => {
    const responses = [
      `Here's a ${context.tone} post about ${context.topic} for ${context.company}:\n\n🚀 Exciting news! We're revolutionizing the industry with innovative solutions that drive real results.\n\nOur latest approach combines cutting-edge technology with proven strategies to help businesses thrive in today's dynamic market.\n\n#Innovation #Business #Growth`,
      `Check out how ${context.company} is transforming the way businesses operate:\n\n💡 Streamlined processes\n📈 Improved efficiency\n🤝 Enhanced customer satisfaction\n\nLet's connect and explore how we can help your business reach new heights!\n\n#BusinessGrowth #Success`,
      `Ready to take your business to the next level? ${context.company} has got you covered!\n\n🎯 Targeted solutions\n⚡ Quick implementation\n📊 Measurable results\n\nDM us to learn more about our game-changing approach.\n\n#BusinessSolutions #Innovation`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user' as const, content: input };
    const aiResponse = { 
      type: 'ai' as const, 
      content: generateDummyResponse(),
      showApplyButton: true 
    };
    
    setMessages([...messages, userMessage, aiResponse]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-indigo-100 bg-white/70 flex-shrink-0">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          AI Assistant
        </h3>
        <p className="text-sm text-indigo-600">Ask me to help improve your content</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="max-w-[80%] space-y-2">
              <div
                className={`rounded-xl p-4 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white'
                    : 'bg-white shadow-sm text-indigo-900'
                }`}
              >
                {message.content}
              </div>
              {message.showApplyButton && (
                <button
                  onClick={() => onSuggestion(message.content)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors text-sm shadow-sm"
                >
                  <FiCheck className="w-4 h-4" />
                  <span>Apply this content</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white/70 border-t border-indigo-100 flex-shrink-0">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI to help with your content..."
            className="flex-1 rounded-lg border border-indigo-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};