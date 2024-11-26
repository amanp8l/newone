import React, { useState } from 'react';
import { FiX, FiEdit, FiImage } from 'react-icons/fi';
import { AIChat } from './AIChat';
import { ImageGenerator } from './ImageGenerator';

interface AIAssistantProps {
  onClose: () => void;
  activePlatform: string;
  currentContent: string;
  onContentUpdate: (content: string) => void;
  onImageSelect: (url: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  onClose,
  activePlatform,
  currentContent,
  onContentUpdate,
  onImageSelect
}) => {
  const [mode, setMode] = useState<'select' | 'chat' | 'image'>('select');

  const renderSelectMode = () => (
    <div className="space-y-4 p-6">
      <button
        onClick={() => setMode('chat')}
        className="w-full flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-pink-50 hover:from-indigo-100 hover:to-pink-100 transition-colors group"
      >
        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
          <FiEdit className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="text-left">
          <span className="block text-indigo-900 font-medium text-lg">Edit Content using AI</span>
          <span className="text-sm text-indigo-600">Refine and improve your content with AI assistance</span>
        </div>
      </button>

      <button
        onClick={() => setMode('image')}
        className="w-full flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-pink-50 hover:from-indigo-100 hover:to-pink-100 transition-colors group"
      >
        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
          <FiImage className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="text-left">
          <span className="block text-indigo-900 font-medium text-lg">Generate Images using AI</span>
          <span className="text-sm text-indigo-600">Create images from content or custom prompts</span>
        </div>
      </button>
    </div>
  );

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-indigo-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-lg">
            {mode === 'chat' ? (
              <FiEdit className="w-5 h-5 text-indigo-600" />
            ) : mode === 'image' ? (
              <FiImage className="w-5 h-5 text-indigo-600" />
            ) : (
              <div className="w-5 h-5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg" />
            )}
          </div>
          <h3 className="font-semibold text-indigo-900">
            {mode === 'chat' ? 'AI Content Editor' : mode === 'image' ? 'AI Image Generator' : 'AI Assistant'}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {mode !== 'select' && (
            <button
              onClick={() => setMode('select')}
              className="p-2 hover:bg-indigo-50 rounded-lg transition-colors text-indigo-400 hover:text-indigo-600"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 hover:bg-indigo-50 rounded-lg transition-colors text-indigo-400 hover:text-indigo-600"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {mode === 'select' && renderSelectMode()}
        {mode === 'chat' && (
          <AIChat
            activePlatform={activePlatform}
            currentContent={currentContent}
            onContentUpdate={onContentUpdate}
          />
        )}
        {mode === 'image' && (
          <ImageGenerator
            currentContent={currentContent}
            onImageSelect={onImageSelect}
          />
        )}
      </div>
    </div>
  );
};