import React from 'react';
import { FiInstagram, FiTwitter, FiLinkedin, FiFacebook } from 'react-icons/fi';

interface ScheduledPostProps {
  platform: string;
  time: string;
  content: string;
  image?: string;
}

export const ScheduledPost: React.FC<ScheduledPostProps> = ({
  platform,
  time,
  content,
  image
}) => {
  const getPlatformIcon = () => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <FiInstagram className="w-4 h-4" />;
      case 'twitter':
        return <FiTwitter className="w-4 h-4" />;
      case 'linkedin':
        return <FiLinkedin className="w-4 h-4" />;
      case 'facebook':
        return <FiFacebook className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getPlatformColor = () => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'twitter':
        return 'bg-blue-400';
      case 'linkedin':
        return 'bg-blue-600';
      case 'facebook':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`p-1.5 rounded-lg text-white ${getPlatformColor()}`}>
            {getPlatformIcon()}
          </div>
          <span className="text-sm font-medium text-indigo-900">{time}</span>
        </div>
      </div>
      <p className="text-sm text-indigo-600 line-clamp-2">{content}</p>
      {image && (
        <div className="mt-2 rounded-lg overflow-hidden h-12">
          <img src={image} alt="Post preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};