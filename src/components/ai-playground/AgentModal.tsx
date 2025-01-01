import React, { useState } from 'react';
import { FiX, FiLoader } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { InputField } from './InputField';
import { PlatformPreview } from './PlatformPreview';
import { formatPlatformContent } from '../../utils/platformFormatter';
import axios from 'axios';

interface AgentModalProps {
  agentType: 'ask-ai' | 'youtube-video' | 'linkedin-style' | 'image-upload';
  onClose: () => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({ agentType, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [linkedinUsername, setLinkedinUsername] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<{[key: string]: string}>({});
  const [showPreviews, setShowPreviews] = useState(false);

  const supportedPlatforms = {
    'ask-ai': ['linkedin', 'facebook', 'twitter'],
    'youtube-video': ['linkedin'],
    'linkedin-style': ['linkedin'],
    'image-upload': ['linkedin', 'facebook', 'twitter']
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
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString() || '';
        setBase64Image(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractContent = (response: any, platform: string) => {
    const contentKey = `${platform}_post`;
    return response[contentKey] || response.data?.[contentKey] || '';
  };

  const processImageUpload = async (file: File): Promise<{[key: string]: string}> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Image = reader.result?.toString().split(',')[1];
          if (!base64Image) {
            throw new Error('Failed to process image');
          }

          const platforms = ['linkedin', 'facebook', 'twitter'];
          const promises = platforms.map(async platform => {
            const response = await axios.post(`https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/${platform}_post_by_image`, {
              base64_image: base64Image,
              prompt
            });
            return formatPlatformContent(extractContent(response.data, platform));
          });
          
          const results = await Promise.all(promises);
          const responses: {[key: string]: string} = {};
          platforms.forEach((platform, index) => {
            responses[platform] = results[index];
          });
          resolve(responses);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });
  };

  const generateContent = async () => {
    setIsGenerating(true);
    setError(null);
    setShowPreviews(false);
    
    try {
      let responses: { [key: string]: string } = {};

      switch (agentType) {
        case 'ask-ai':
          const platforms = supportedPlatforms['ask-ai'];
          const promises = platforms.map(async platform => {
            const response = await axios.post(`https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/${platform}_post_raw`, {
              raw_content: prompt
            });
            return response.data;
          });
          
          const results = await Promise.all(promises);
          platforms.forEach((platform, index) => {
            responses[platform] = results[index];
          });
          break;

        case 'youtube-video':
          const ytResponse = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/linkedin_post_by_youtube', {
            yt_url: youtubeUrl,
            prompt
          });
          responses['linkedin'] = formatPlatformContent(extractContent(ytResponse.data, 'linkedin'));
          break;

        case 'linkedin-style':
          const linkedinResponse = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/linkedin_post_by_others', {
            username: linkedinUsername,
            prompt
          });
          responses['linkedin'] = formatPlatformContent(extractContent(linkedinResponse.data, 'linkedin'));
          break;

        case 'image-upload':
          if (!selectedImage) {
            throw new Error('No image selected');
          }
          responses = await processImageUpload(selectedImage);
          break;
      }

      setGeneratedContent(responses);
      setShowPreviews(true);
    } catch (err: any) {
      console.error('Error generating content:', err);
      setError(err.response?.data?.message || 'Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="flex h-[80vh] max-w-[90vw]"
      >
        {/* Left Panel - Input */}
        <div className="w-[500px] bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-indigo-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                {getTitle()}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                <FiX className="w-5 h-5 text-indigo-400" />
              </button>
            </div>

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

            {error && (
              <div className="mt-4 p-4 bg-pink-50 border border-pink-200 rounded-lg text-pink-600">
                {error}
              </div>
            )}

            <button
              onClick={generateContent}
              disabled={isGenerating}
              className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <span>Generate Content</span>
              )}
            </button>
          </div>
        </div>

        {/* Right Panel - Previews */}
        {showPreviews && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-[500px] bg-white rounded-2xl overflow-hidden shadow-2xl ml-6"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-indigo-900 mb-6">Platform Previews</h3>
              <div className="space-y-6 max-h-[calc(80vh-120px)] overflow-y-auto">
                {supportedPlatforms[agentType].map((platform) => (
                  <div key={platform} className="space-y-2">
                    <h4 className="text-sm font-medium text-indigo-900 capitalize">{platform}</h4>
                    <PlatformPreview
                      platform={platform}
                      content={generatedContent[platform] || ''}
                      companyName="Your Company"
                      image={base64Image}
                      video={null}
                      pdf={null}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};