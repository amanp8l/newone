import React, { useState } from 'react';
import { EditorToolbar } from './EditorToolbar';
import { TextSelectionToolbar } from './TextSelectionToolbar';

interface BlogEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onNext: () => void;
  isGenerating: boolean;
  onImageClick: () => void;
  onAIClick: () => void;
  selectedImage: string | null;
  companyName: string;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({
  content,
  onContentChange,
  onNext,
  isGenerating,
  onImageClick,
  onAIClick,
}) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <EditorToolbar onImageClick={onImageClick} onAIClick={onAIClick} />
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          
        </button>
      </div>

      <div className="flex-1 relative">
        {isGenerating ? (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-pink-200 border-b-pink-500 rounded-full animate-spin-reverse"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                Generating Content
              </h3>
              <p className="text-indigo-600 text-center">
                We're crafting your content using AI...
              </p>
            </div>
          </div>
        ) : showPreview ? (
          <div className="overflow-auto h-full">

          </div>
        ) : (
          <>
            <TextSelectionToolbar
              onBold={() => document.execCommand('bold', false)}
              onItalic={() => document.execCommand('italic', false)}
              onAIEdit={onAIClick}
            />
            <textarea
              className="flex-1 w-full h-full p-4 rounded-xl border-2 border-indigo-100 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none font-sans text-base resize-none"
              placeholder="Write your content here..."
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
            />
            <div className="p-4 border-t border-indigo-100">
              <button
                onClick={onNext}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-colors shadow-lg shadow-indigo-500/25"
              >
                Next: Generate Platform Content
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
