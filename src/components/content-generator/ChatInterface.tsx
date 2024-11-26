import React, { useState } from 'react';
import { FiSend, FiX } from 'react-icons/fi';

interface Message {
  type: 'user' | 'ai';
  content: string;
}

interface ChatInterfaceProps {
  onClose: () => void;
  onContentGenerated: (content: string) => void;
  context: {
    companyName: string;
    topic: string;
    tone: string;
  };
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onClose,
  onContentGenerated,
  context
}) => {
  const [messages, setMessages] = useState<Message[]>([{
    type: 'ai',
    content: `Hi! I'll help you create content for ${context.companyName} about ${context.topic}. What kind of content would you like to generate?`
  }]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = async (prompt: string) => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const generatedContent = `🚀 Exciting update from ${context.companyName}!

We're thrilled to share our latest insights about ${context.topic}. Our team has been working hard to bring you valuable information that matters.

Key highlights:
✨ Industry-leading solutions
💡 Expert insights
🎯 Proven results

#Innovation #Growth #Success`;

    setIsGenerating(false);
    return generatedContent;
  };

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage = { type: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const generatedContent = await generateContent(input);
    
    const aiMessage = { 
      type: 'ai' as const, 
      content: generatedContent
    };
    
    setMessages(prev => [...prev, aiMessage]);
    onContentGenerated(generatedContent);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white/70 backdrop-blur-sm rounded-xl w-full max-w-2xl h-[600px] flex flex-col">
        <div className="p-4 border-b border-indigo-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">Generate Content</h3>
          <button
            onClick={onClose}
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
                <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
              </div>
            </div>
          ))}
          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-indigo-50 to-pink-50 rounded-xl p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-indigo-100">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your instructions for content generation..."
              className="flex-1 px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isGenerating}
            />
            <button
              onClick={handleSend}
              disabled={isGenerating || !input.trim()}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSend className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};