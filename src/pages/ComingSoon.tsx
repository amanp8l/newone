import React from 'react';
import { FiClock } from 'react-icons/fi';

interface ComingSoonProps {
  title: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-8">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 text-center max-w-lg w-full shadow-xl">
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-100 to-pink-100 rounded-xl flex items-center justify-center">
            <FiClock className="w-10 h-10 text-indigo-600" />
          </div>
          <div className="absolute -top-2 -right-2">
            <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full animate-ping" />
            <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full absolute inset-0" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-4">
          {title} Coming Soon
        </h1>
        
        <p className="text-indigo-600 text-lg mb-8">
          We're working hard to bring you an amazing experience. Stay tuned for updates!
        </p>
        
        <div className="inline-flex items-center justify-center space-x-2 text-sm text-indigo-500 bg-gradient-to-r from-indigo-50 to-pink-50 px-4 py-2 rounded-full">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
          <span>In Development</span>
        </div>
      </div>
    </div>
  );
};