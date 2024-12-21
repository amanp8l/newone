import React from 'react';
import { FiImage, FiZap, FiVideo, FiFile } from 'react-icons/fi';

interface EditorToolbarProps {
  onImageClick: () => void;
  onVideoClick: () => void;
  onPdfClick: () => void;
  onAIClick: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onImageClick,
  onVideoClick,
  onPdfClick,
  onAIClick
}) => {

  return (
    <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-indigo-100">
      <button
        onClick={onImageClick}
        className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors group flex items-center"
        title="Add Image"
      >
        <FiImage className="w-5 h-5 text-indigo-600 hover:text-indigo-700" />
        <span className="ml-2 text-indigo-600 hover:text-indigo-700 text-xs transition-colors">
          Add Image
        </span>
      </button>
      <button
        onClick={onVideoClick}
        className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors group flex items-center"
        title="Add Video"
      >
        <FiVideo className="w-5 h-5 text-indigo-600 hover:text-indigo-700" />
        <span className="ml-2 text-indigo-600 hover:text-indigo-700 text-xs transition-colors">
          Add Video
        </span>
      </button>
      <button
        onClick={onPdfClick}
        className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors group flex items-center"
        title="Add PDF"
      >
        <FiFile className="w-5 h-5 text-indigo-600 hover:text-indigo-700" />
        <span className="ml-2 text-indigo-600 hover:text-indigo-700 text-xs transition-colors">
          Add PDF
        </span>
      </button>
      <button
        onClick={onAIClick}
        className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors group flex items-center"
        title="AI Assistant"
      >
        <FiZap className="w-5 h-5 text-indigo-600 hover:text-indigo-700" />
        <span className="ml-2 text-indigo-600 hover:text-indigo-700 text-xs transition-colors">
          AI Assistant
        </span>
      </button>
    </div>
  );
};