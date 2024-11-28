import React, { useState } from 'react';
import { FiArrowUpRight, FiZap } from 'react-icons/fi';
import { AIChat } from '../components/AIChat';
import ContentGenerator from '../components/content-generator/ContentGenerator';
import { QuickGenerate } from '../components/quick-generate/QuickGenerate';

export const Home: React.FC = () => {
  const [showContentGenerator, setShowContentGenerator] = useState(false);
  const [showQuickGenerate, setShowQuickGenerate] = useState(false);

  if (showContentGenerator) {
    return <ContentGenerator onBack={() => setShowContentGenerator(false)} />;
  }

  if (showQuickGenerate) {
    return <QuickGenerate />;
  }

  return (
    <div className="h-[calc(100vh-4rem)] p-8">
      <div className="flex justify-end items-center mb-4 space-x-4">
        <button
          onClick={() => setShowQuickGenerate(true)}
          className="px-6 py-2.5 bg-white/80 border-2 border-transparent bg-gradient-to-r from-indigo-500/20 to-pink-500/20 hover:from-indigo-500/30 hover:to-pink-500/30 text-indigo-600 rounded-xl transition-all duration-300 flex items-center space-x-2 relative before:absolute before:inset-0 before:p-[2px] before:bg-gradient-to-r before:from-indigo-500 before:to-pink-500 before:rounded-xl before:-z-10 before:content-['']"
        >
          <FiZap className="w-5 h-5" />
          <span>Quick Post</span>
        </button>
        <button
          onClick={() => setShowContentGenerator(true)}
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-colors shadow-lg shadow-indigo-500/25 flex items-center space-x-2"
        >
          <span>Create from Scratch</span>
          <FiArrowUpRight className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm h-[calc(100vh-10rem)]">
        <AIChat />
      </div>
    </div>
  );
};