import React from 'react';
import { EditorToolbar } from './EditorToolbar';
import { TextSelectionToolbar } from './TextSelectionToolbar';

interface PlatformEditorProps {
  platform: string;
  content: string;
  onContentChange: (content: string) => void;
  isGenerating: boolean;
  onImageClick: () => void;
  onVideoClick: () => void;
  onPdfClick: () => void;
  onAIClick: () => void;
  selectedImage: string[] | null;
  selectedVideos: string[] | null;
  selectedPdfs: string[] | null;
}

export const PlatformEditor: React.FC<PlatformEditorProps> = ({
  content,
  onContentChange,
  isGenerating,
  onImageClick,
  onVideoClick,
  onPdfClick,
  onAIClick,
}) => {
  const handleBoldClick = () => {
    document.execCommand('bold', false);
  };

  const handleItalicClick = () => {
    document.execCommand('italic', false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <EditorToolbar 
        onImageClick={onImageClick} 
        onVideoClick={onVideoClick} 
        onPdfClick={onPdfClick} 
        onAIClick={onAIClick}
      />

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
                Optimizing your content...
              </p>
            </div>
          </div>
        ) : (
          <>
            <TextSelectionToolbar
              onBold={handleBoldClick}
              onItalic={handleItalicClick}
              onAIEdit={onAIClick}
            />
            <textarea
              className="flex-1 w-full h-full p-4 rounded-xl border-2 border-indigo-100 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none font-sans text-base resize-none"
              placeholder="Write your content here..."
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
            />
          </>
        )}
      </div>
    </div>
  );
};
