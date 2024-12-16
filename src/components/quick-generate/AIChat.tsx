import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiX } from 'react-icons/fi';
import axios from 'axios';
import { formatPlatformContent } from '../../utils/platformFormatter';

// Define Message type more explicitly
interface Message {
  type: 'user' | 'ai';
  content: string;
}

interface AIChatProps {
  onClose: () => void;
  activePlatform: string;
  currentContent: string;
  onContentUpdate: (content: string) => void;
}

export const AIChat: React.FC<AIChatProps> = ({
  onClose,
  activePlatform,
  currentContent,
  onContentUpdate
}) => {
  const [messages, setMessages] = useState<Message[]>([{
    type: 'ai',
    content: 'How can I assist you with your content today?'
  }]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [input]);

  const generateContent = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const endpoint = `/api/rewrite_${activePlatform}_post`;
      const response = await axios.post(
        `https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io${endpoint}`, 
        {
          feedback: prompt,
          post: currentContent
        }
      );
      
      // Format the generated content
      const formattedContent = formatPlatformContent(response.data);
      
      // Update content and add success message
      onContentUpdate(formattedContent);
      setMessages(prev => [
        ...prev, 
        {
          type: 'ai',
          content: 'I\'ve updated your content based on your feedback. Is there anything else you\'d like me to help you with?'
        }
      ]);
    } catch (error) {
      console.error('Error generating content:', error);
      setMessages(prev => [
        ...prev, 
        {
          type: 'ai',
          content: 'Sorry, I encountered an error while generating content. Please try again.'
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async () => {
    // Prevent sending empty or generating messages
    if (!input.trim() || isGenerating) return;

    // Add user message
    const userMessage: Message = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    setInput('');

    // Add processing message
    setMessages(prev => [
      ...prev, 
      {
        type: 'ai',
        content: 'Generating new content based on your feedback...'
      }
    ]);

    // Generate content
    await generateContent(input);
  };

  // Handle Enter key for sending message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/70 backdrop-blur-sm rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-indigo-100">
        <h3 className="font-semibold text-indigo-900">AI Assistant</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
          aria-label="Close AI Chat"
        >
          <FiX className="w-5 h-5 text-indigo-400 hover:text-indigo-600" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
              dangerouslySetInnerHTML={{ __html: message.content }}
            />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-indigo-100">
        <div className="flex space-x-4">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your instructions..."
            className="flex-1 px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none min-h-[50px] max-h-[150px] overflow-y-auto"
            disabled={isGenerating}
            rows={1}
            aria-label="AI Chat Input"
          />
          <button
            onClick={handleSend}
            disabled={isGenerating || !input.trim()}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
            aria-label="Send Message"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <FiSend className="w-5 h-5" />
                <span>Send</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};