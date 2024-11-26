import React from 'react';
import { EditorToolbar } from './EditorToolbar';

interface PlatformEditorProps {
  platform: string;
  content: string;
  onContentChange: (content: string) => void;
  isGenerating: boolean;
  onImageClick: () => void;
  onAIClick: () => void;
}

export const PlatformEditor: React.FC<PlatformEditorProps> = ({
  platform,
  content,
  onContentChange,
  isGenerating,
  onImageClick,
  onAIClick
}) => {
  return (
    <div className="flex-1 flex flex-col">
      <EditorToolbar onImageClick={onImageClick} onAIClick={onAIClick} />

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
                Generating {platform} Content
              </h3>
              <p className="text-indigo-600 text-center">
                Optimizing your content for {platform}...
              </p>
            </div>
          </div>
        ) : (
          <div
            className="w-full h-full p-4 focus:outline-none overflow-auto"
            contentEditable
            dangerouslySetInnerHTML={{ __html: content }}
            onInput={(e) => onContentChange(e.currentTarget.innerHTML)}
          />
        )}
      </div>
    </div>
  );
};