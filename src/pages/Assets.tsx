import React from 'react';
import { FiImage, FiFileText, FiVideo } from 'react-icons/fi';

export const Assets: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <button className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors shadow-lg shadow-indigo-500/25">
          Upload New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-lg">
              <FiImage className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-indigo-600">Images</p>
              <p className="text-xl font-semibold text-indigo-900">234</p>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-lg">
              <FiVideo className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-indigo-600">Videos</p>
              <p className="text-xl font-semibold text-indigo-900">45</p>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-lg">
              <FiFileText className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-indigo-600">Documents</p>
              <p className="text-xl font-semibold text-indigo-900">126</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm">
        <div className="p-6 border-b border-indigo-100">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">Recent Assets</h2>
        </div>
        <div className="p-6">
          {/* Add asset grid/list here */}
        </div>
      </div>
    </div>
  );
};