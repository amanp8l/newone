import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { PlatformPreview } from './PlatformPreview';

interface PreviewScreenProps {
  content: string;
  image: string | null;
  platform: string;
  companyName: string;
  onBack: () => void;
}

export const PreviewScreen: React.FC<PreviewScreenProps> = ({
  content,
  image,
  platform,
  companyName,
  onBack
}) => {
  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex flex-col">
      <div className="flex items-center p-4 bg-white/70 backdrop-blur-sm border-b border-indigo-100">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Editor</span>
        </button>
      </div>

      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="w-full max-w-xl">
          <h2 className="text-xl font-semibold text-indigo-900 mb-6 capitalize">
            {platform} Preview
          </h2>
          <PlatformPreview
            platform={platform}
            content={content}
            companyName={companyName}
            image={image}
          />
        </div>
      </div>
    </div>
  );
};