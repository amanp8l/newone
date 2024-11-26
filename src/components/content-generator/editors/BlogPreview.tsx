import React from 'react';
import { FiCalendar, FiUser, FiMessageCircle, FiShare2, FiHeart } from 'react-icons/fi';

interface BlogPreviewProps {
  content: string;
  image: string | null;
  companyName: string;
}

export const BlogPreview: React.FC<BlogPreviewProps> = ({
  content,
  image,
  companyName
}) => {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={image} 
            alt="Blog header" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-8">
        <div className="flex items-center space-x-4 mb-6 text-sm text-indigo-600">
          <div className="flex items-center space-x-2">
            <FiCalendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiUser className="w-4 h-4" />
            <span>{companyName}</span>
          </div>
        </div>

        <div 
          className="prose prose-indigo max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-indigo-100">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700">
              <FiHeart className="w-5 h-5" />
              <span>123 Likes</span>
            </button>
            <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700">
              <FiMessageCircle className="w-5 h-5" />
              <span>24 Comments</span>
            </button>
          </div>
          <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700">
            <FiShare2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};