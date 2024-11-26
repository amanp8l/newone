import React from 'react';
import { FiBold, FiItalic, FiImage, FiZap } from 'react-icons/fi';

interface EditorToolbarProps {
  onImageClick: () => void;
  onAIClick: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onImageClick,
  onAIClick
}) => {
  const handleTextEdit = (command: string) => {
    document.execCommand(command, false);
  };

  return (
    <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-indigo-100">
      <button
        onClick={() => handleTextEdit('bold')}
        className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group relative"
        title="Bold"
      >
        <FiBold className="w-5 h-5 text-indigo-600" />
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-indigo-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Bold
        </span>
      </button>
      <button
        onClick={() => handleTextEdit('italic')}
        className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group relative"
        title="Italic"
      >
        <FiItalic className="w-5 h-5 text-indigo-600" />
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-indigo-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Italic
        </span>
      </button>
      <button
        onClick={onImageClick}
        className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group relative"
        title="Add Image"
      >
        <FiImage className="w-5 h-5 text-indigo-600" />
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-indigo-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Add Image
        </span>
      </button>
      <button
        onClick={onAIClick}
        className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group relative ml-auto"
        title="AI Assistant"
      >
        <FiZap className="w-5 h-5 text-indigo-600" />
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-indigo-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Generate using AI
        </span>
      </button>
    </div>
  );
};