import React from 'react';
import { FiInstagram, FiLinkedin, FiFacebook } from 'react-icons/fi';
import { FaXTwitter } from "react-icons/fa6";


interface ScheduledPostProps {
  content: string;
  platform: string;
}

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return <FiInstagram className="w-4 h-4" />;
    case 'twitter':
      return <FaXTwitter className="w-4 h-4" />;
    case 'linkedin':
      return <FiLinkedin className="w-4 h-4" />;
    case 'facebook':
      return <FiFacebook className="w-4 h-4" />;
    default:
      return null;
  }
};

const getPlatformColor = (platform: string) => {
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

export const ScheduledPost: React.FC<ScheduledPostProps> = ({ content, platform }) => {
  // Extract first 50 characters as title
  const title = content.replace(/<[^>]*>/g, '').slice(0, 50) + '...';

  return (
    <div className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`p-1.5 rounded-lg text-white ${getPlatformColor(platform)}`}>
            {getPlatformIcon(platform)}
          </div>
          <span className="text-sm font-medium text-indigo-900 capitalize">{platform}</span>
        </div>
      </div>
      <p className="text-sm text-indigo-600 line-clamp-2">{title}</p>
    </div>
  );
};