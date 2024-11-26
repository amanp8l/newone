import React, { useState } from 'react';
import { FiArrowLeft, FiCalendar, FiSend } from 'react-icons/fi';
import { PlatformPreview } from './PlatformPreview';

interface PreviewScreenProps {
  content: string;
  image: string | null;
  platforms: string[];
  companyName: string;
  onBack: () => void;
}

export const PreviewScreen: React.FC<PreviewScreenProps> = ({
  content,
  image,
  platforms,
  companyName,
  onBack
}) => {
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 to-pink-50 overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm border-b border-indigo-100">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Editor</span>
        </button>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowScheduler(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <FiCalendar className="w-4 h-4" />
            <span>Schedule</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors">
            <FiSend className="w-4 h-4" />
            <span>Publish</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 h-[calc(100vh-4rem)] overflow-auto">
        {platforms.map((platform) => (
          <div key={platform} className="h-fit">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4 capitalize">{platform}</h3>
            <PlatformPreview
              platform={platform}
              content={content}
              companyName={companyName}
              image={image}
            />
          </div>
        ))}
      </div>

      {showScheduler && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-indigo-900">Schedule Post</h3>
              <button
                onClick={() => setShowScheduler(false)}
                className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <FiArrowLeft className="w-5 h-5 text-indigo-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-indigo-900 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full rounded-lg border border-indigo-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-900 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full rounded-lg border border-indigo-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                onClick={() => setShowScheduler(false)}
                className="w-full py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors"
              >
                Schedule Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};