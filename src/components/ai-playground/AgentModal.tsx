import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { PlatformPreview } from './PlatformPreview';
import { InputField } from './InputField';

interface AgentModalProps {
  agentType: 'ask-ai' | 'youtube-video' | 'linkedin-style' | 'image-upload';
  onClose: () => void;
}

const platformLogos = {
  linkedin: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png',
  facebook: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png',
  twitter: 'https://about.twitter.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png'
};

export const AgentModal: React.FC<AgentModalProps> = ({ agentType, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [linkedinUsername, setLinkedinUsername] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const getSupportedPlatforms = () => {
    switch (agentType) {
      case 'youtube-video':
      case 'linkedin-style':
        return ['linkedin'];
      default:
        return ['linkedin', 'facebook', 'twitter'];
    }
  };

  const getTitle = () => {
    switch (agentType) {
      case 'ask-ai':
        return 'Ask AI to Write';
      case 'youtube-video':
        return 'Create from YouTube Video';
      case 'linkedin-style':
        return 'Copy LinkedIn Style';
      case 'image-upload':
        return 'Create from Image';
      default:
        return '';
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleGenerate = () => {
    setShowPreview(true);
  };

  const supportedPlatforms = getSupportedPlatforms();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl w-full max-w-6xl overflow-hidden shadow-2xl flex"
      >
        {/* Left Panel - Input Form */}
        <div className="flex-1 max-w-2xl border-r border-indigo-100">
          {/* Header */}
          <div className="p-6 border-b border-indigo-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                {getTitle()}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5 text-indigo-400" />
              </button>
            </div>

            {/* Supported Platforms */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-indigo-900">Supported Platforms:</span>
              <div className="flex items-center -space-x-2">
                {supportedPlatforms.map((platform) => (
                  <div
                    key={platform}
                    className="w-8 h-8 rounded-full bg-white p-1.5 shadow-sm border border-indigo-100 relative hover:z-10 transition-transform hover:-translate-y-1"
                  >
                    <img 
                      src={platformLogos[platform as keyof typeof platformLogos]} 
                      alt={platform}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Form */}
          <div className="p-6">
            <InputField
              agentType={agentType}
              prompt={prompt}
              youtubeUrl={youtubeUrl}
              linkedinUsername={linkedinUsername}
              onPromptChange={setPrompt}
              onYoutubeUrlChange={setYoutubeUrl}
              onLinkedinUsernameChange={setLinkedinUsername}
              onImageUpload={handleImageUpload}
              selectedImage={selectedImage}
            />

            <button
              onClick={handleGenerate}
              className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-medium"
            >
              Generate Post
            </button>
          </div>
        </div>

        {/* Right Panel - Preview */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 bg-indigo-50/30 p-6 overflow-y-auto"
          >
            <h3 className="text-xl font-semibold text-indigo-900 mb-6">Generated Content</h3>
            <div className="space-y-4">
              {supportedPlatforms.map((platform) => (
                <PlatformPreview
                  key={platform}
                  platform={platform}
                  logo={platformLogos[platform as keyof typeof platformLogos]}
                />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};