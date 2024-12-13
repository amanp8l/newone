import React, { useState } from 'react';
import { FiBell, FiSun, FiUser, FiChevronDown, FiLogOut, FiSettings } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Welcome to Kimmchi';
      case '/ai-playground':
        return 'AI Agents';
      case '/brands':
        return 'Brand Management';
      case '/analytics':
        return 'Analytics Dashboard';
      case '/assets':
        return 'My Assets';
      case '/platforms':
        return 'Connected Platforms';
      case '/settings':
        return 'Settings';
      case '/profile':
        return 'My Profile';
      case '/calendar':
        return 'Post Calendar';
      case '/help':
        return 'Ask for Help';
      default:
        return 'Kimmchi';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <header className="bg-white/70 backdrop-blur-sm border-b border-indigo-100/50 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
            {getPageTitle()}
          </h1>
        </div>

        <div className="flex items-center space-x-6">
          <button className="p-2 hover:bg-indigo-50 rounded-xl transition-colors">
            <FiSun className="w-5 h-5 text-indigo-600" />
          </button>
          <button className="p-2 hover:bg-indigo-50 rounded-xl transition-colors">
            <FiBell className="w-5 h-5 text-indigo-600" />
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 pl-6 border-l border-indigo-100 group"
            >
              {user?.logo ? (
                <img 
                  src={user.logo} 
                  alt="Company Logo"
                  className="w-8 h-8 rounded-xl object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center">
                  <FiUser className="w-4 h-4 text-indigo-600" />
                </div>
              )}
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-indigo-900">{user?.company || 'Company Name'}</span>
                <span className="text-xs text-indigo-500">{user?.email || 'user@example.com'}</span>
              </div>
              <FiChevronDown className={`w-4 h-4 text-indigo-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-indigo-100 py-2 z-50">
                <button
                  onClick={() => {
                    navigate('/profile');
                    setShowDropdown(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-colors"
                >
                  <FiSettings className="w-4 h-4" />
                  <span>Profile Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-pink-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-colors"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};