import React, { useState } from 'react';
import { FiZap, FiArrowRight, FiClock, FiLayout, FiTarget, FiTrendingUp, FiCalendar, FiEdit } from 'react-icons/fi';
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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-2">
          Create Content
        </h1>
        <p className="text-indigo-600 mb-8">Choose how you want to create your content</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Post Card */}
          <div className="group relative rounded-2xl transition-all duration-300 hover:scale-[1.02] min-h-[500px]">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-white rounded-2xl p-8 h-full flex flex-col">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center mb-6">
                <FiZap className="w-8 h-8 text-indigo-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">Quick Post</h2>
              <p className="text-lg text-indigo-600 mb-6">
                Create and publish content quickly across multiple platforms with AI assistance.
              </p>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center space-x-3 text-indigo-600">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center flex-shrink-0">
                    <FiClock className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span>Publish in minutes</span>
                </div>
                <div className="flex items-center space-x-3 text-indigo-600">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center flex-shrink-0">
                    <FiLayout className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span>Multi-platform optimization</span>
                </div>
                <div className="flex items-center space-x-3 text-indigo-600">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center flex-shrink-0">
                    <FiEdit className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span>AI-powered content suggestions</span>
                </div>
              </div>

              <button
                onClick={() => setShowQuickGenerate(true)}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-colors group text-base font-medium"
              >
                <span>Get Started</span>
                <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Create Campaign Card */}
          <div className="group relative rounded-2xl transition-all duration-300 hover:scale-[1.02] min-h-[500px]">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-white rounded-2xl p-8 h-full flex flex-col">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center mb-6">
                <FiTarget className="w-8 h-8 text-indigo-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">Create Campaign</h2>
              <p className="text-lg text-indigo-600 mb-6">
                Plan and execute comprehensive content campaigns with advanced features.
              </p>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center space-x-3 text-indigo-600">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center flex-shrink-0">
                    <FiTrendingUp className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span>Campaign objectives</span>
                </div>
                <div className="flex items-center space-x-3 text-indigo-600">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center flex-shrink-0">
                    <FiCalendar className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span>Content calendar integration</span>
                </div>
                <div className="flex items-center space-x-3 text-indigo-600">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center flex-shrink-0">
                    <FiTarget className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span>Audience targeting</span>
                </div>
              </div>

              <button
                onClick={() => setShowContentGenerator(true)}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-colors group text-base font-medium"
              >
                <span>Get Started</span>
                <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};