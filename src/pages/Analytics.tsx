import React from 'react';
import { FiTrendingUp, FiUsers, FiActivity } from 'react-icons/fi';

export const Analytics: React.FC = () => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-lg">
              <FiTrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-indigo-600">Engagement Rate</p>
              <p className="text-xl font-semibold text-indigo-900">4.5%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-lg">
              <FiUsers className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-indigo-600">Total Followers</p>
              <p className="text-xl font-semibold text-indigo-900">12.5K</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-lg">
              <FiActivity className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-indigo-600">Post Performance</p>
              <p className="text-xl font-semibold text-indigo-900">89%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">Performance Overview</h2>
          {/* Add chart component here */}
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">Audience Growth</h2>
          {/* Add chart component here */}
        </div>
      </div>
    </div>
  );
};