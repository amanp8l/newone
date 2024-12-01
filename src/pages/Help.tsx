import React from 'react';
import { AIChat } from '../components/help/AIChat';

export const Help: React.FC = () => {
  return (
    <div className="h-[calc(100vh-4rem)] p-8">
      <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm h-full">
        <AIChat />
      </div>
    </div>
  );
};