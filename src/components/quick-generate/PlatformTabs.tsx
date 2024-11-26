import React from 'react';
import { FiTwitter, FiFacebook, FiLinkedin } from 'react-icons/fi';

interface PlatformTabsProps {
  platforms: string[];
  activePlatform: string;
  onPlatformChange: (platform: string) => void;
  isEnabled: boolean;
}

export const PlatformTabs: React.FC<PlatformTabsProps> = ({
  platforms,
  activePlatform,
  onPlatformChange,
  isEnabled
}) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return FiTwitter;
      case 'facebook':
        return FiFacebook;
      case 'linkedin':
        return FiLinkedin;
      default:
        return FiTwitter;
    }
  };

  return (
    <div className="flex space-x-2 mb-4">
      {platforms.map((platform) => {
        const Icon = getPlatformIcon(platform);
        const isActive = platform === activePlatform;
        return (
          <button
            key={platform}
            onClick={() => onPlatformChange(platform)}
            disabled={!isEnabled}
            className={`p-2 rounded-lg transition-colors flex items-center space-x-2 ${
              isActive
                ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white'
                : 'hover:bg-indigo-50 text-indigo-600'
            } ${!isEnabled && 'opacity-50 cursor-not-allowed'}`}
          >
            <Icon className="w-5 h-5" />
            <span className="capitalize">{platform}</span>
          </button>
        );
      })}
    </div>
  );
};