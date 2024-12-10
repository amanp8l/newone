import React from 'react';
import { FiPlus } from 'react-icons/fi';

interface PlatformCardProps {
  name?: string;
  image?: string;
  isAddNew?: boolean;
  isFirstPlatform?: boolean;
  onClick: () => void;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({
  name,
  image,
  isAddNew,
  isFirstPlatform,
  onClick
}) => {
  if (isAddNew) {
    return (
      <button
        onClick={onClick}
        className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group h-[300px] flex flex-col items-center justify-center"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <FiPlus className="w-8 h-8 text-indigo-600" />
        </div>
        <h3 className="text-xl font-semibold text-indigo-900 text-center">
          {isFirstPlatform ? 'Connect First Platform' : 'Add New Platform'}
        </h3>
        <p className="text-indigo-600 text-center mt-2">
          {isFirstPlatform 
            ? 'Start managing your social media presence'
            : 'Connect additional social media accounts'
          }
        </p>
      </button>
    );
  }

  return (
    <div className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-2xl overflow-hidden mb-6">
          <img 
            src={image} 
            alt={`${name} logo`}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-indigo-900 mb-2">{name}</h3>
        <span className="px-4 py-1 bg-gradient-to-r from-indigo-100 to-pink-100 text-indigo-600 rounded-full text-sm">
          Connected
        </span>
      </div>
    </div>
  );
};