import React from 'react';
import { FiUpload } from 'react-icons/fi';

interface InputFieldProps {
  agentType: string;
  prompt: string;
  youtubeUrl: string;
  linkedinUsername: string;
  selectedImage: File | null;
  onPromptChange: (value: string) => void;
  onYoutubeUrlChange: (value: string) => void;
  onLinkedinUsernameChange: (value: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  agentType,
  prompt,
  youtubeUrl,
  linkedinUsername,
  selectedImage,
  onPromptChange,
  onYoutubeUrlChange,
  onLinkedinUsernameChange,
  onImageUpload,
}) => {
  return (
    <div className="space-y-6">
      {agentType === 'youtube-video' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-indigo-900">
            YouTube Video URL
          </label>
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => onYoutubeUrlChange(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            placeholder="Enter YouTube video URL"
          />
        </div>
      )}

      {agentType === 'linkedin-style' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-indigo-900">
            LinkedIn Username
          </label>
          <input
            type="text"
            value={linkedinUsername}
            onChange={(e) => onLinkedinUsernameChange(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            placeholder="Enter LinkedIn username"
          />
        </div>
      )}

      {agentType === 'image-upload' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-indigo-900">
            Upload Image
          </label>
          <div className="border-2 border-dashed border-indigo-200 rounded-xl p-8 transition-all duration-300 hover:border-indigo-400 bg-white">
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-xl flex items-center justify-center mb-4">
                <FiUpload className="w-8 h-8 text-indigo-600" />
              </div>
              <span className="text-indigo-600 font-medium">
                {selectedImage ? selectedImage.name : 'Click to upload or drag and drop'}
              </span>
              <span className="text-indigo-400 text-sm mt-2">
                Supports: JPG, PNG, GIF (Max 5MB)
              </span>
            </label>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-indigo-900">
          Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 min-h-[120px] resize-none"
          placeholder="Enter your prompt..."
        />
      </div>
    </div>
  );
};