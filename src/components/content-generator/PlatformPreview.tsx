import React from 'react';
import { FiHeart, FiMessageCircle, FiRepeat, FiShare2, FiThumbsUp, FiBookmark } from 'react-icons/fi';

interface PlatformPreviewProps {
  platform: string;
  content: string;
  companyName: string;
  image: string | null;
}

export const PlatformPreview: React.FC<PlatformPreviewProps> = ({ platform, content, companyName, image }) => {
  const renderInstagramPreview = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 flex items-center space-x-3 border-b border-gray-100">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full"></div>
        <span className="font-medium">{companyName}</span>
      </div>
      {image && (
        <div className="aspect-square bg-gray-100">
          <img src={image} alt="Post" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <FiHeart className="w-6 h-6" />
            <FiMessageCircle className="w-6 h-6" />
            <FiShare2 className="w-6 h-6" />
          </div>
          <FiBookmark className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <div className="font-medium">{companyName}</div>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );

  const renderTwitterPreview = () => (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full"></div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{companyName}</span>
            <span className="text-gray-500">@{companyName.toLowerCase().replace(/\s/g, '')}</span>
          </div>
          <div className="mt-2" dangerouslySetInnerHTML={{ __html: content }} />
          {image && (
            <div className="mt-3 rounded-xl overflow-hidden">
              <img src={image} alt="Post" className="w-full h-auto" />
            </div>
          )}
          <div className="flex items-center justify-between mt-4 text-gray-500">
            <FiMessageCircle className="w-5 h-5" />
            <FiRepeat className="w-5 h-5" />
            <FiHeart className="w-5 h-5" />
            <FiShare2 className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderFacebookPreview = () => (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full"></div>
          <div>
            <span className="font-medium">{companyName}</span>
            <div className="text-xs text-gray-500">Just now · 🌎</div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {image && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img src={image} alt="Post" className="w-full h-auto" />
          </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FiThumbsUp className="w-6 h-6" />
            <FiMessageCircle className="w-6 h-6" />
            <FiShare2 className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderLinkedInPreview = () => (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex-shrink-0"></div>
          <div>
            <span className="font-medium">{companyName}</span>
            <div className="text-xs text-gray-500">Company · Just now</div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {image && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img src={image} alt="Post" className="w-full h-auto" />
          </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-4 overflow-x-auto">
          <button className="flex items-center space-x-1 min-w-fit">
            <FiThumbsUp className="w-4 h-4" />
            <span className="text-sm">Like</span>
          </button>
          <button className="flex items-center space-x-1 min-w-fit">
            <FiMessageCircle className="w-4 h-4" />
            <span className="text-sm">Comment</span>
          </button>
          <button className="flex items-center space-x-1 min-w-fit">
            <FiRepeat className="w-4 h-4" />
            <span className="text-sm">Repost</span>
          </button>
          <button className="flex items-center space-x-1 min-w-fit">
            <FiShare2 className="w-4 h-4" />
            <span className="text-sm">Send</span>
          </button>
        </div>
      </div>
    </div>
  );

  switch (platform) {
    case 'instagram':
      return renderInstagramPreview();
    case 'twitter':
      return renderTwitterPreview();
    case 'facebook':
      return renderFacebookPreview();
    case 'linkedin':
      return renderLinkedInPreview();
    default:
      return null;
  }
};