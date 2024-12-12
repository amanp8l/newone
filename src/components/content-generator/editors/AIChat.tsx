import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiLoader } from 'react-icons/fi';
import axios from 'axios';

interface Message {
  type: 'user' | 'ai';
  content: string;
}

interface AIChatProps {
  activePlatform: string;
  currentContent: string;
  onContentUpdate: (content: string) => void;
}

export const AIChat: React.FC<AIChatProps> = ({
  activePlatform,
  currentContent,
  onContentUpdate
}) => {
  const [messages, setMessages] = useState<Message[]>([{
    type: 'ai',
    content: 'How can I help you improve your content?'
  }]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      let endpoint = '';
      let payload = {};

      switch (activePlatform) {
        case 'blog':
          endpoint = '/api/rewrite_blog';
          payload = { feedback: prompt, blog: currentContent };
          break;
        case 'linkedin':
          endpoint = '/api/rewrite_linkedin_post';
          payload = { feedback: prompt, post: currentContent };
          break;
        case 'twitter':
          endpoint = '/api/rewrite_twitter_post';
          payload = { feedback: prompt, post: currentContent };
          break;
        case 'facebook':
          endpoint = '/api/rewrite_facebook_post';
          payload = { feedback: prompt, post: currentContent };
          break;
        default:
          endpoint = '/api/rewrite_blog';
          payload = { feedback: prompt, blog: currentContent };
      }

      const response = await axios.post(`https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io${endpoint}`, payload);
      
      onContentUpdate(response.data);
      setMessages(prev => [...prev, {
        type: 'ai',
        content: 'I\'ve updated your content based on your feedback. Is there anything else you\'d like me to help you with?'
      }]);
    } catch (error) {
      console.error('Error generating content:', error);
      setMessages(prev => [...prev, {
        type: 'ai',
        content: 'Sorry, I encountered an error while generating content. Please try again.'
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage = { type: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setMessages(prev => [...prev, {
      type: 'ai',
      content: 'Generating new content based on your feedback...'
    }]);

    await generateContent(input);
  };

  return (
    <div className="flex flex-col h-full">
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
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-indigo-100">
        <div className="flex space-x-4">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your instructions..."
            className="flex-1 px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none min-h-[50px] max-h-[150px] overflow-y-auto"
            disabled={isGenerating}
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={isGenerating || !input.trim()}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {isGenerating ? (
              <>
                <FiLoader className="w-5 h-5 animate-spin" />
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