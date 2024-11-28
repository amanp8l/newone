import React, { useRef, useEffect } from 'react';
import { FiArrowRight, FiBold, FiItalic, FiImage, FiSend, FiArrowLeft } from 'react-icons/fi';

interface DraftEditorProps {
  content: string;
  onChange: (content: string) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
  isLoading?: boolean;
  selectedPlatforms: string[];
  selectedImage: string | null;
  onImageClick: () => void;
}

export const DraftEditor: React.FC<DraftEditorProps> = ({
  content,
  onChange,
  onNext,
  onBack,
  isValid,
  isLoading = false,
  selectedPlatforms,
  selectedImage,
  onImageClick
}) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const handleTextFormat = (command: string) => {
    document.execCommand(command, false);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return 'X';
      case 'facebook':
        return 'fb';
      case 'linkedin':
        return 'in';
      default:
        return platform.charAt(0);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex flex-col">
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back to Platform Selection</span>
            </button>
            <div className="flex items-center space-x-2">
              {selectedPlatforms.map((platform) => (
                <div
                  key={platform}
                  className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center text-indigo-600 font-medium"
                >
                  {getPlatformIcon(platform)}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm">
            <div className="flex items-center space-x-4 p-4 border-b border-indigo-100">
              <button
                onClick={() => handleTextFormat('bold')}
                className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group relative"
              >
                <FiBold className="w-5 h-5 text-indigo-600" />
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-indigo-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Make text bold
                </span>
              </button>
              <button
                onClick={() => handleTextFormat('italic')}
                className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group relative"
              >
                <FiItalic className="w-5 h-5 text-indigo-600" />
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-indigo-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Make text italic
                </span>
              </button>
              <button
                onClick={onImageClick}
                className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group relative"
              >
                <FiImage className="w-5 h-5 text-indigo-600" />
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-indigo-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Add an image
                </span>
              </button>
            </div>

            <div className="p-6">
              <textarea
                ref={editorRef}
                value={content}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Write your content here..."
                className="w-full min-h-[400px] p-6 rounded-xl border-2 border-indigo-100 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none resize-none font-sans text-base"
              />
            </div>

            {selectedImage && (
              <div className="px-6 pb-6">
                <div className="relative">
                  <img 
                    src={selectedImage} 
                    alt="Selected" 
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <button
                    onClick={() => onChange('')}
                    className="absolute top-2 right-2 px-3 py-1 bg-pink-500 text-white rounded-lg text-sm hover:bg-pink-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            <div className="p-6 border-t border-indigo-100 flex space-x-4">
              <button
                onClick={onNext}
                disabled={!isValid || isLoading}
                className="flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 font-medium text-lg shadow-xl shadow-indigo-500/25"
              >
                <span>Optimize with AI</span>
                <FiArrowRight className="w-5 h-5" />
              </button>
              <button
                disabled={!isValid || isLoading}
                className="px-8 py-4 border-2 border-indigo-200 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors flex items-center space-x-2"
              >
                <FiSend className="w-5 h-5" />
                <span>Publish</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/70 rounded-2xl p-8 flex flex-col items-center space-y-4 max-w-md w-full mx-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-pink-200 border-b-pink-500 rounded-full animate-spin-reverse"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Optimizing Content
            </h3>
            <p className="text-indigo-600 text-center">
              We're optimizing your content using AI...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};