import React from 'react';

interface PlatformPreviewProps {
  platform: string;
  logo: string;
}

export const PlatformPreview: React.FC<PlatformPreviewProps> = ({ platform, logo }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-50 to-pink-50 p-2">
            <img src={logo} alt={platform} className="w-full h-full object-contain" />
          </div>
          <div>
            <h4 className="font-medium text-indigo-900 capitalize">{platform}</h4>
            <p className="text-xs text-indigo-500">Preview your content</p>
          </div>
        </div>
        <button className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors text-sm font-medium">
          Preview Post
        </button>
      </div>
      <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-lg p-3">
        <p className="text-sm text-indigo-900">
          Your generated content will appear in Preview!
        </p>
      </div>
    </div>
  );
};