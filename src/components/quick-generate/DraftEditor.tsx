import React, { useRef, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';

interface DraftEditorProps {
  content: string;
  onChange: (content: string) => void;
  onNext: () => void;
  isValid: boolean;
  isLoading?: boolean;
}

export const DraftEditor: React.FC<DraftEditorProps> = ({
  content,
  onChange,
  onNext,
  isValid,
  isLoading = false
}) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  return (
    <>
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
              Generating Content
            </h3>
            <p className="text-indigo-600 text-center">
              We're crafting optimized content for each of your selected platforms...
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col min-h-[600px]">
        <div className="flex-1 p-6">
          <textarea
            ref={editorRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your content here..."
            className="w-full h-full min-h-[400px] p-6 rounded-xl border-2 border-indigo-100 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none resize-none font-sans text-base"
          />
        </div>
        <div className="p-6 border-t border-indigo-100">
          <button
            onClick={onNext}
            disabled={!isValid || isLoading}
            className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 font-medium text-lg shadow-xl shadow-indigo-500/25"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating Content...</span>
              </>
            ) : (
              <>
                <span>Generate Content</span>
                <FiArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};