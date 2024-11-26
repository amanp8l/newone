import React, { useState } from 'react';
import axios from 'axios';
import { FiImage, FiEdit, FiLoader } from 'react-icons/fi';

interface ImageGeneratorProps {
  currentContent: string;
  onImageSelect: (url: string) => void;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  currentContent,
  onImageSelect
}) => {
  const [mode, setMode] = useState<'select' | 'fromContent' | 'fromPrompt'>('select');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateFromContent = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const response = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/generate_blog_images', {
        blog: currentContent,
        size: '1024x1024'
      });
      
      if (response.data) {
        onImageSelect(response.data);
      }
    } catch (err: any) {
      console.error('Error generating image:', err);
      setError(err.response?.data?.message || 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFromPrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    try {
      const response = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/generate_images_by_user', {
        prompt: prompt.trim(),
        size: '1024x1024'
      });
      
      if (response.data) {
        onImageSelect(response.data);
      }
    } catch (err: any) {
      console.error('Error generating image:', err);
      setError(err.response?.data?.message || 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  if (mode === 'select') {
    return (
      <div className="p-6 space-y-4">
        <button
          onClick={() => setMode('fromContent')}
          className="w-full flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-pink-50 hover:from-indigo-100 hover:to-pink-100 transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
            <FiImage className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="text-left">
            <span className="block text-indigo-900 font-medium text-lg">Generate from Content</span>
            <span className="text-sm text-indigo-600">Create an image based on your existing content</span>
          </div>
        </button>

        <button
          onClick={() => setMode('fromPrompt')}
          className="w-full flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-pink-50 hover:from-indigo-100 hover:to-pink-100 transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
            <FiEdit className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="text-left">
            <span className="block text-indigo-900 font-medium text-lg">Generate from Prompt</span>
            <span className="text-sm text-indigo-600">Create an image using your custom prompt</span>
          </div>
        </button>
      </div>
    );
  }

  if (mode === 'fromContent') {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-lg font-medium text-indigo-900 mb-2">Generate Image from Content</h4>
          <p className="text-indigo-600">We'll analyze your content and generate a relevant image.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-pink-50 border border-pink-200 rounded-lg text-pink-600">
            {error}
          </div>
        )}

        <button
          onClick={generateFromContent}
          disabled={isGenerating}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <FiLoader className="w-5 h-5 animate-spin" />
              <span>Generating Image...</span>
            </>
          ) : (
            <>
              <FiImage className="w-5 h-5" />
              <span>Generate Image</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h4 className="text-lg font-medium text-indigo-900 mb-2">Generate Image from Prompt</h4>
        <p className="text-indigo-600">Describe the image you want to generate.</p>
      </div>

      <div className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50"
          rows={4}
        />

        {error && (
          <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg text-pink-600">
            {error}
          </div>
        )}

        <button
          onClick={generateFromPrompt}
          disabled={isGenerating || !prompt.trim()}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <FiLoader className="w-5 h-5 animate-spin" />
              <span>Generating Image...</span>
            </>
          ) : (
            <>
              <FiImage className="w-5 h-5" />
              <span>Generate Image</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};