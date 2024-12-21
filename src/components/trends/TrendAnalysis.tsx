import React from 'react';
import { FiArrowLeft, FiThumbsUp, FiThumbsDown, FiEye, FiTrendingUp } from 'react-icons/fi';
import { LuBrain } from "react-icons/lu";
import { Trend } from '../../types/trends';

interface TrendAnalysisProps {
  trend: Trend;
  onBack: () => void;
}

export const TrendAnalysis: React.FC<TrendAnalysisProps> = ({ trend, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-8 group"
        >
          <FiArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Trends</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Video Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm">
              <div className="aspect-video relative">
                {trend.videoUrl ? (
                  <iframe
                    src={trend.videoUrl.replace('watch?v=', 'embed/')}
                    title={trend.title}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                  />
                ) : (
                  <img 
                    src={trend.thumbnail || `https://source.unsplash.com/800x450/?advertising,${trend.keyTheme}`}
                    alt={trend.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Campaign Info */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-4">
                {trend.title}
              </h1>
              <p className="text-indigo-600 mb-6">{trend.description}</p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-pink-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 text-indigo-600 mb-1">
                    <FiEye className="w-4 h-4" />
                    <span className="text-sm font-medium">Views</span>
                  </div>
                  <span className="text-xl font-bold text-indigo-900">{trend.views}M</span>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-pink-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 text-indigo-600 mb-1">
                    <FiThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">Engagement</span>
                  </div>
                  <span className="text-xl font-bold text-indigo-900">{trend.engagement}K</span>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-pink-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 text-emerald-500 mb-1">
                    <FiTrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">Trending</span>
                  </div>
                  <span className="text-xl font-bold text-emerald-600">#1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Analysis */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center">
                  <LuBrain className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                  AI Smart Analysis
                </h2>
              </div>
              
              <div className="space-y-8">
                {/* What's Good */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-6">
                  <div className="flex items-center space-x-2 text-emerald-600 mb-4">
                    <FiThumbsUp className="w-5 h-5" />
                    <h3 className="font-medium">What's Good</h3>
                  </div>
                  <ul className="space-y-3">
                    {trend.goodPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2 text-emerald-900">
                        <span className="text-emerald-500 font-medium">{index + 1}.</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What's Not */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-xl p-6">
                  <div className="flex items-center space-x-2 text-pink-600 mb-4">
                    <FiThumbsDown className="w-5 h-5" />
                    <h3 className="font-medium">What's Not</h3>
                  </div>
                  <ul className="space-y-3">
                    {trend.badPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2 text-pink-900">
                        <span className="text-pink-500 font-medium">{index + 1}.</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm space-y-6">
              <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-indigo-900 mb-2">Key Theme</h3>
                <p className="text-indigo-600">{trend.keyTheme}</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-indigo-900 mb-2">Selling Point</h3>
                <p className="text-indigo-600">{trend.sellingPoint}</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-indigo-900 mb-2">Visual Appeal</h3>
                <p className="text-indigo-600">{trend.visualAppeal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};