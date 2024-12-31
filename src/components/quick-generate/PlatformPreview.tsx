
import React from 'react';
import { FiHeart, FiMessageCircle, FiRepeat, FiShare2, FiThumbsUp, FiFile, FiArrowUp, FiArrowDown, FiBookmark } from 'react-icons/fi';
import { PreviewPlatformContent } from '../../utils/previewFormatter';

interface PlatformPreviewProps {
  platform: string;
  content: string;
  companyName: string;
  image: string | null;
  video: string | null;
  pdf: string | null;
}

export const PlatformPreview: React.FC<PlatformPreviewProps> = ({
  platform,
  content,
  companyName,
  image,
  video,
  pdf
}) => {
  // Format content for the specific platform, ensure content is string
  const safeContent = typeof content === 'string' ? content : '';
  const formattedContent = PreviewPlatformContent(safeContent);

  // Helper function to truncate content
  const truncateContent = (text: string, wordLimit: number) => {
    if (!text || typeof text !== 'string') return '';
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return `${words.slice(0, wordLimit).join(' ')} ...more`;
  };

  const renderTwitterPreview = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4">
        <div className="flex space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {companyName.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-900">{companyName}</span>
              <span className="text-gray-500">@{companyName.toLowerCase().replace(/\s/g, '')}</span>
            </div>
            <div
              className="mt-2 text-gray-900"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
            {image && (
              <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
                <img src={image} alt="Post" className="w-full h-auto" />
              </div>
            )}
            {video && (
              <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
                <video src={video} controls className="w-full h-auto" />
              </div>
            )}
            {pdf && (
              <div className="mt-3 p-4 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center space-x-3">
                <FiFile className="w-6 h-6 text-indigo-600" />
                <div>
                  <span className="text-sm font-medium text-indigo-900">Attached PDF</span>
                  <p className="text-xs text-indigo-600">Click to view document</p>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between mt-4 text-gray-500">
              <button className="flex items-center space-x-2 group">
                <div className="p-2 group-hover:bg-blue-50 rounded-full transition-colors">
                  <FiMessageCircle className="w-5 h-5 group-hover:text-blue-500" />
                </div>
                <span className="group-hover:text-blue-500">24</span>
              </button>
              <button className="flex items-center space-x-2 group">
                <div className="p-2 group-hover:bg-green-50 rounded-full transition-colors">
                  <FiRepeat className="w-5 h-5 group-hover:text-green-500" />
                </div>
                <span className="group-hover:text-green-500">12</span>
              </button>
              <button className="flex items-center space-x-2 group">
                <div className="p-2 group-hover:bg-pink-50 rounded-full transition-colors">
                  <FiHeart className="w-5 h-5 group-hover:text-pink-500" />
                </div>
                <span className="group-hover:text-pink-500">148</span>
              </button>
              <button className="p-2 group-hover:bg-blue-50 rounded-full transition-colors">
                <FiShare2 className="w-5 h-5 group-hover:text-blue-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFacebookPreview = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
            {companyName.charAt(0)}
          </div>
          <div>
            <span className="font-bold text-gray-900">{companyName}</span>
            <div className="text-xs text-gray-500 flex items-center space-x-1">
              <span>Just now</span>
              <span>·</span>
              <span>🌎</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div
          className="text-gray-900"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
        {image && (
          <div className="mt-3 -mx-4 border-t border-b border-gray-100">
            <img src={image} alt="Post" className="w-full h-auto" />
          </div>
        )}
      </div>
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-gray-500">
          <button className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <FiThumbsUp className="w-5 h-5" />
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <FiMessageCircle className="w-5 h-5" />
            <span>Comment</span>
          </button>
          <button className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <FiShare2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderLinkedInPreview = () => {
    const truncatedContent = truncateContent(content, 15);

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {companyName.charAt(0)}
            </div>
            <div>
              <span className="font-bold text-gray-900">{companyName}</span>
              <div className="text-xs text-gray-500">Company · Just now</div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="text-gray-900">{truncatedContent}</div>
          {image && (
            <div className="mt-3 -mx-4 border-t border-b border-gray-100">
              <img src={image} alt="Post" className="w-full h-auto" />
            </div>
          )}
          {video && (
            <div className="mt-3 -mx-4 border-t border-b border-gray-100">
              <video src={video} controls className="w-full h-auto" />
            </div>
          )}
          {pdf && (
            <div className="mt-3 p-4 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center space-x-3">
              <FiFile className="w-6 h-6 text-indigo-600" />
              <div>
                <span className="text-sm font-medium text-indigo-900">Attached PDF</span>
                <p className="text-xs text-indigo-600">Click to view document</p>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-6 text-gray-500">
            <button className="flex items-center space-x-2 group">
              <div className="p-1 group-hover:bg-blue-50 rounded transition-colors">
                <FiThumbsUp className="w-5 h-5 group-hover:text-blue-500" />
              </div>
              <span className="group-hover:text-blue-500">Like</span>
            </button>
            <button className="flex items-center space-x-2 group">
              <div className="p-1 group-hover:bg-blue-50 rounded transition-colors">
                <FiMessageCircle className="w-5 h-5 group-hover:text-blue-500" />
              </div>
              <span className="group-hover:text-blue-500">Comment</span>
            </button>
            <button className="flex items-center space-x-2 group">
              <div className="p-1 group-hover:bg-blue-50 rounded transition-colors">
                <FiRepeat className="w-5 h-5 group-hover:text-blue-500" />
              </div>
              <span className="group-hover:text-blue-500">Repost</span>
            </button>
            <button className="flex items-center space-x-2 group">
              <div className="p-1 group-hover:bg-blue-50 rounded transition-colors">
                <FiShare2 className="w-5 h-5 group-hover:text-blue-500" />
              </div>
              <span className="group-hover:text-blue-500">Send</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderYouTubePreview = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl">
      <div className="relative">
        {video ? (
          <video src={video} className="w-full aspect-video object-cover" controls />
        ) : (
          <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">Video Preview</span>
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-sm px-2 py-1 rounded">
        3:45
      </div>
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-900 line-clamp-2">{content}</h2>
        <div className="mt-3 flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold">
            {companyName.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900">{companyName}</div>
            <div className="text-sm text-gray-500">
              {'100K'} subscribers
            </div>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 font-medium">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );

  const renderRedditPreview = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl">
      <div className="p-2 bg-gray-50 border-b flex items-center text-xs text-gray-500">
        <span>Posted by u/{companyName.toLowerCase().replace(/\s/g, '')} • 2h</span>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg">{truncateContent(content, 10)}</h3>
        <div className="mt-3">
          {image && <img src={image} alt="Post" className="w-full rounded-lg" />}
          {video && <video src={video} controls className="w-full rounded-lg" />}
        </div>
        <div className="mt-4 flex items-center space-x-4 text-gray-400">
          <button className="flex items-center space-x-2 hover:bg-gray-100 rounded p-2">
            <FiArrowUp className="w-5 h-5" />
            <span>3.2k</span>
            <FiArrowDown className="w-5 h-5" />
          </button>
          <button className="flex items-center space-x-2 hover:bg-gray-100 rounded p-2">
            <FiMessageCircle className="w-5 h-5" />
            <span>142 comments</span>
          </button>
          <button className="flex items-center space-x-2 hover:bg-gray-100 rounded p-2">
            <FiShare2 className="w-5 h-5" />
            <span>Share</span>
          </button>
          <button className="flex items-center space-x-2 hover:bg-gray-100 rounded p-2">
            <FiBookmark className="w-5 h-5" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderPinterestPreview = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm">
      <div className="relative">
        {image && (
          <div className="relative">
            <img src={image} alt="Pin" className="w-full rounded-t-xl" />
            <button className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700">
              Save
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-900 font-medium">{truncateContent(content, 12)}</p>
        <div className="mt-3 flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {companyName.charAt(0)}
          </div>
          <span className="text-sm text-gray-700">{companyName}</span>
        </div>
      </div>
    </div>
  );

  const renderTikTokPreview = () => (
    <div className="bg-black text-white rounded-xl shadow-lg overflow-hidden w-[340px]">
      <div className="relative">
        {video ? (
          <video 
            src={video} 
            className="w-full h-[600px] object-cover" 
            controls
            loop
            autoPlay
            muted
          />
        ) : (
          <div className="w-full h-[600px] bg-gray-900 flex items-center justify-center">
            <span className="text-gray-400">Video Preview</span>
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-12">
          <div className="text-sm">{truncateContent(content, 8)}</div>
          <div className="mt-2 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              {companyName.charAt(0)}
            </div>
            <span className="font-medium">{companyName}</span>
          </div>
        </div>
        <div className="absolute right-4 bottom-4 flex flex-col items-center space-y-4">
          <button className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <FiHeart className="w-6 h-6" />
          </button>
          <span className="text-sm">234.5K</span>
          <button className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <FiMessageCircle className="w-6 h-6" />
          </button>
          <span className="text-sm">1.2K</span>
          <button className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <FiShare2 className="w-6 h-6" />
          </button>
          <span className="text-sm">2.3K</span>
        </div>
      </div>
    </div>
  );

  const renderTelegramPreview = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-xl">
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {companyName.charAt(0)}
          </div>
          <div>
            <span className="font-bold text-gray-900">{companyName}</span>
            <div className="text-xs text-gray-500">Channel • {'1.2K'} views</div>
          </div>
        </div>
        <div className="mt-3 text-gray-900">{content}</div>
        {image && (
          <div className="mt-3">
            <img src={image} alt="Post" className="w-full rounded-lg" />
          </div>
        )}
        {video && (
          <div className="mt-3">
            <video src={video} controls className="w-full rounded-lg" />
          </div>
        )}
        <div className="mt-4 flex items-center justify-between text-blue-500">
          <div className="flex items-center space-x-2">
            <FiHeart className="w-5 h-5" />
            <span>2.1K</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiShare2 className="w-5 h-5" />
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );

  switch (platform.toLowerCase()) {
    case 'twitter':
      return renderTwitterPreview();
    case 'facebook':
      return renderFacebookPreview();
    case 'linkedin':
      return renderLinkedInPreview();
    case 'youtube':
      return renderYouTubePreview();
    case 'reddit':
      return renderRedditPreview();
    case 'pinterest':
      return renderPinterestPreview();
    case 'tiktok':
      return renderTikTokPreview();
    case 'telegram':
      return renderTelegramPreview();
    default:
      return null;
  }
};