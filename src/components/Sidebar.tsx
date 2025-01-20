import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiZap, FiPieChart, FiCalendar, FiBriefcase, FiHelpCircle, FiShare2, FiTrendingUp, FiVideo } from 'react-icons/fi';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <FiHome />, text: "Home", path: "/" },
    { icon: <FiBriefcase />, text: "Brands", path: "/brands" },
    { icon: <FiTrendingUp />, text: "Trends", path: "/trends" },
    { icon: <FiZap />, text: "AI Agents", path: "/ai-playground" },
    { icon: <FiShare2 />, text: "Platforms", path: "/platforms" },
    { icon: <FiVideo />, text: "Video to Reel", path: "/video-to-reel" },
    { icon: <FiPieChart />, text: "Analytics", path: "/analytics" },
    { icon: <FiCalendar />, text: "Calendar", path: "/calendar" },
    { icon: <FiHelpCircle />, text: "Help", path: "/help" }
  ];

  const handleNavigation = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      window.location.href = '/';
    } else {
      navigate(path);
    }
  };

  return (
    <div className="w-64 bg-white shadow-xl flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">Kimmchi</span>
        </div>
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center space-x-3 w-full px-4 py-3 transition-colors ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-indigo-500/10 to-pink-500/10 text-indigo-600'
                  : 'hover:bg-gradient-to-r hover:from-indigo-500/5 hover:to-pink-500/5 text-indigo-600/80 hover:text-indigo-600'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.text}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};