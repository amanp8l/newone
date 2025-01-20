import React from 'react';
import { FiChevronDown, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface ReelSettingsProps {
  language: string;
  reelLength: string;
  addSubtitles: boolean;
  addHeadline: boolean;
  numberOfClips: number;
  keywords: string;
  onLanguageChange: (lang: string) => void;
  onReelLengthChange: (length: string) => void;
  onSubtitlesToggle: () => void;
  onHeadlineToggle: () => void;
  onNumberOfClipsChange: (num: number) => void;
  onKeywordsChange: (keywords: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const languages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
  'Russian', 'Japanese', 'Korean', 'Chinese', 'Hindi', 'Arabic'
];

const reelLengths = [
  'Auto',
  'Less than 30 seconds',
  '30 to 60 seconds',
  '60 to 90 seconds',
  '90 seconds to 3 minutes'
];

const ToggleButton: React.FC<{ isOn: boolean; onToggle: () => void; label: string }> = ({ isOn, onToggle, label }) => (
  <motion.div 
    className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-xl group hover:shadow-md transition-all duration-300"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <span className="text-indigo-900 font-medium">{label}</span>
    <motion.button
      onClick={onToggle}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
        isOn ? 'bg-gradient-to-r from-indigo-500 to-pink-500' : 'bg-gray-200'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute w-5 h-5 bg-white rounded-full top-1"
        initial={false}
        animate={{ left: isOn ? '1.75rem' : '0.25rem' }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.button>
  </motion.div>
);

export const ReelSettings: React.FC<ReelSettingsProps> = ({
  language,
  reelLength,
  addSubtitles,
  addHeadline,
  numberOfClips,
  keywords,
  onLanguageChange,
  onReelLengthChange,
  onSubtitlesToggle,
  onHeadlineToggle,
  onNumberOfClipsChange,
  onKeywordsChange,
  onBack,
  onNext,
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div 
        className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-8">
          Reel Settings
        </h2>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-indigo-900 mb-2">
              Language
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all"></div>
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="relative w-full px-4 py-3 bg-white rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-indigo-900 mb-2">
              Reel Length
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all"></div>
              <select
                value={reelLength}
                onChange={(e) => onReelLengthChange(e.target.value)}
                className="relative w-full px-4 py-3 bg-white rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
              >
                {reelLengths.map((length) => (
                  <option key={length} value={length}>{length}</option>
                ))}
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <ToggleButton
              isOn={addSubtitles}
              onToggle={onSubtitlesToggle}
              label="Add Subtitles"
            />
            <ToggleButton
              isOn={addHeadline}
              onToggle={onHeadlineToggle}
              label="Add Headline"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-indigo-900 mb-2">
              Number of Clips
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all"></div>
              <input
                type="number"
                min="0"
                max="100"
                value={numberOfClips}
                onChange={(e) => onNumberOfClipsChange(parseInt(e.target.value))}
                className="relative w-full px-4 py-3 bg-white rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-indigo-900 mb-2">
              Keywords (Optional)
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all"></div>
              <input
                type="text"
                value={keywords}
                onChange={(e) => onKeywordsChange(e.target.value)}
                className="relative w-full px-4 py-3 bg-white rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter keywords separated by commas"
              />
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-8 flex justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={onBack}
            className="flex items-center space-x-2 px-6 py-2 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </motion.button>
          <motion.button
            onClick={onNext}
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors shadow-lg shadow-indigo-500/25"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Next</span>
            <FiArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};