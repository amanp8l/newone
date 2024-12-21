import React from 'react';
import { FiTrendingUp, FiEye, FiThumbsUp, FiAward, FiBarChart2 } from 'react-icons/fi';
import { Trend } from '../../types/trends';

interface TrendCardProps {
  trend: Trend;
  onClick: () => void;
  index: number;
}

export const TrendCard: React.FC<TrendCardProps> = ({ trend, onClick, index }) => {
  const getYoutubeEmbedUrl = (url: string) => {
    // Convert YouTube URL to embed URL
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
    >
      {/* Rank Badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className="flex items-center space-x-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
          <FiAward className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-semibold text-indigo-900">#{index + 1}</span>
        </div>
      </div>

      <div className="relative aspect-video">
        {trend.videoUrl ? (
          <iframe
            src={getYoutubeEmbedUrl(trend.videoUrl)}
            title={trend.title}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <img 
            src={trend.thumbnail || `https://source.unsplash.com/800x450/?advertising,${trend.keyTheme}`}
            alt={trend.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <div className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-full">
            <span className="text-xs font-medium bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
              {trend.keyTheme}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-indigo-900 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-pink-500 transition-all">
          {trend.title}
        </h3>
        
        <p className="text-indigo-600/80 mb-4 line-clamp-2">
          {trend.sellingPoint}
        </p>

        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-indigo-500">
              <FiEye className="w-4 h-4" />
              <span>{trend.views}M</span>
            </div>
            <div className="flex items-center space-x-1 text-indigo-500">
              <FiThumbsUp className="w-4 h-4" />
              <span>{trend.engagement}K</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-emerald-500">
            <FiTrendingUp className="w-4 h-4" />
            <span>Trending</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-100 to-pink-100 hover:from-indigo-200 hover:to-pink-200 text-transparent bg-clip-text font-medium rounded-lg transition-all flex items-center justify-center space-x-2 group/button border-2 border-transparent hover:border-indigo-200"
        >
          <FiBarChart2 className="w-4 h-4 text-indigo-500 group-hover/button:text-indigo-600" />
          <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text">View Insights</span>
        </button>
      </div>
    </div>
  );
};

export default TrendCard;