import React from 'react';
import {  FiFacebook, FiLinkedin, FiArrowRight, FiCheck, FiArrowLeft, FiLoader } from 'react-icons/fi';
import { FaXTwitter } from "react-icons/fa6";

import { Platform } from './types';

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onPlatformsChange: (platforms: string[]) => void;
  onNext: () => void;
  onBack: () => void;
  isGenerating: boolean;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatforms,
  onPlatformsChange,
  onNext,
  onBack,
  isGenerating
}) => {
  const platforms: Platform[] = [
    { id: 'twitter', name: 'X (Twitter)', icon: FaXTwitter, connected: true },
    { id: 'facebook', name: 'Facebook', icon: FiFacebook, connected: true },
    { id: 'linkedin', name: 'LinkedIn', icon: FiLinkedin, connected: true },
  ];

  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      onPlatformsChange(selectedPlatforms.filter(id => id !== platformId));
    } else {
      onPlatformsChange([...selectedPlatforms, platformId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Editor</span>
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-4">
            Choose Your Platforms
          </h1>
          <p className="text-lg text-indigo-600">
            Select the social media platforms where you want to share your content
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-3 gap-6 mb-12">
            {platforms.map((platform) => {
              const isSelected = selectedPlatforms.includes(platform.id);
              const Icon = platform.icon;
              return (
                <button
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={`group relative flex flex-col items-center p-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 ${
                    isSelected
                      ? 'bg-gradient-to-br from-indigo-500/10 to-pink-500/10 border-2 border-indigo-500 shadow-lg'
                      : 'border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-md'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
                    isSelected
                      ? 'bg-gradient-to-br from-indigo-500 to-pink-500 text-white'
                      : 'bg-gradient-to-br from-indigo-100 to-pink-100 text-indigo-600 group-hover:from-indigo-200 group-hover:to-pink-200'
                  }`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className={`text-xl font-semibold ${
                    isSelected ? 'text-indigo-600' : 'text-indigo-900'
                  }`}>
                    {platform.name}
                  </span>
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                      <FiCheck className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex justify-center">
            <button
              onClick={onNext}
              disabled={selectedPlatforms.length === 0 || isGenerating}
              className="px-12 py-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center space-x-3 font-medium text-lg shadow-xl shadow-indigo-500/25"
            >
              {isGenerating ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  <span>Generating Content...</span>
                </>
              ) : (
                <>
                  <span>Generate Content</span>
                  <FiArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};