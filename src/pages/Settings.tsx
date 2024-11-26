import React from 'react';
import { FiUser, FiBell, FiLock, FiCreditCard } from 'react-icons/fi';

export const Settings: React.FC = () => {
  return (
    <div className="p-8">
      <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="p-6 border-r border-indigo-100">
            <nav className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500/10 to-pink-500/10 text-indigo-600">
                <FiUser />
                <span>Profile</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-500/5 hover:to-pink-500/5">
                <FiBell />
                <span>Notifications</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-500/5 hover:to-pink-500/5">
                <FiLock />
                <span>Security</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-500/5 hover:to-pink-500/5">
                <FiCreditCard />
                <span>Billing</span>
              </button>
            </nav>
          </div>
          
          <div className="p-6 col-span-3">
            <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-indigo-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-indigo-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-indigo-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-900 mb-2">
                  Bio
                </label>
                <textarea
                  className="w-full rounded-lg border border-indigo-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                  placeholder="Tell us about yourself"
                />
              </div>
              <div className="pt-4">
                <button className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors shadow-lg shadow-indigo-500/25">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};