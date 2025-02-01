    import React from 'react';
    import { FiSun, FiMoon } from 'react-icons/fi';
    import { useThemeStore } from '../store/themeStore';

    export const ThemeToggle: React.FC = () => {
    const { isDark, toggleTheme } = useThemeStore();

    return (
        <button
        onClick={toggleTheme}
        className={`p-2 rounded-lg transition-colors ${
            isDark 
            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
            : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
        }`}
        aria-label="Toggle theme"
        >
        {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </button>
    );
    };