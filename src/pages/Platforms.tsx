import React from 'react';
import { FiInstagram, FiTwitter, FiFacebook, FiLinkedin } from 'react-icons/fi';

export const Platforms: React.FC = () => {
  const platforms = [
    { 
      name: 'Instagram',
      icon: <FiInstagram className="w-6 h-6" />,
      connected: true,
      color: 'pink'
    },
    { 
      name: 'Twitter',
      icon: <FiTwitter className="w-6 h-6" />,
      connected: false,
      color: 'blue'
    },
    { 
      name: 'Facebook',
      icon: <FiFacebook className="w-6 h-6" />,
      connected: true,
      color: 'indigo'
    },
    { 
      name: 'LinkedIn',
      icon: <FiLinkedin className="w-6 h-6" />,
      connected: false,
      color: 'blue'
    }
  ];

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platforms.map((platform) => (
          <div key={platform.name} className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-lg">
                {platform.icon}
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                platform.connected 
                  ? 'bg-gradient-to-r from-indigo-100 to-pink-100 text-indigo-600'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {platform.connected ? 'Connected' : 'Not Connected'}
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-indigo-900">{platform.name}</h3>
            <button className={`w-full py-2 rounded-lg ${
              platform.connected
                ? 'border border-pink-300 text-pink-600 hover:bg-pink-50'
                : 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600 shadow-lg shadow-indigo-500/25'
            } transition-colors`}>
              {platform.connected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};