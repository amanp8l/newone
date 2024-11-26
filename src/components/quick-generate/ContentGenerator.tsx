import React, { useState } from 'react';
import { FiArrowLeft, FiBold, FiItalic, FiList, FiImage, FiSave, FiSend, FiEye } from 'react-icons/fi';
import { PlatformTabs } from './PlatformTabs';
import { ImagePicker } from '../content-generator/ImagePicker';
import { AIAssistant } from '../content-generator/AIAssistant';
import { PreviewScreen } from '../content-generator/PreviewScreen';

interface ContentGeneratorProps {
  selectedPlatforms: string[];
  onBack: () => void;
}

export const ContentGenerator: React.FC<ContentGeneratorProps> = ({
  selectedPlatforms,
  onBack,
}) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activePlatform, setActivePlatform] = useState(selectedPlatforms[0]);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiMessage, setAIMessage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleTextEdit = (command: string) => {
    document.execCommand(command, false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setShowImagePicker(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateContent = async () => {
    setIsGenerating(true);
    setAIMessage("Creating engaging content for your audience...");
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newContent = `🚀 Check out our latest update!

We're excited to share something amazing with you. Our team has been working hard to bring innovation to everything we do.

Key highlights:
✨ Cutting-edge solutions
💡 Expert insights
🎯 Proven results

#Innovation #Growth #Success`;
    
    setContent(newContent);
    setIsGenerating(false);
    setAIMessage("Content generated! Feel free to edit or try another option.");
  };

  const generateDummyImage = async () => {
    setIsGenerating(true);
    setAIMessage("Generating the perfect image for your content...");
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const dummyImages = [
      'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1661956602868-6ae368943878?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1657299156261-4ce1d0a2cf9c?w=800&auto=format&fit=crop'
    ];
    setSelectedImage(dummyImages[Math.floor(Math.random() * dummyImages.length)]);
    setIsGenerating(false);
    setAIMessage("Here's your generated image! Let me know if you'd like to try another one.");
  };

  if (showPreview) {
    return (
      <PreviewScreen
        content={content}
        image={selectedImage}
        platforms={selectedPlatforms}
        companyName="Your Company"
        onBack={() => setShowPreview(false)}
      />
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm border-b border-indigo-100">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <div className="flex space-x-4">
          <button
            onClick={() => {}}
            className="px-6 py-2 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center space-x-2"
          >
            <FiSave className="w-4 h-4" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className="px-6 py-2 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center space-x-2"
          >
            <FiEye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => {}}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors flex items-center space-x-2"
          >
            <FiSend className="w-4 h-4" />
            <span>Publish</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-6 flex gap-6">
          <div className="w-2/3">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6 h-full flex flex-col">
              <PlatformTabs
                platforms={selectedPlatforms}
                activePlatform={activePlatform}
                onPlatformChange={setActivePlatform} isEnabled={false}              />

              <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-indigo-100">
                <button
                  onClick={() => handleTextEdit('bold')}
                  className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Bold"
                >
                  <FiBold className="w-5 h-5 text-indigo-600" />
                </button>
                <button
                  onClick={() => handleTextEdit('italic')}
                  className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Italic"
                >
                  <FiItalic className="w-5 h-5 text-indigo-600" />
                </button>
                <button
                  onClick={() => handleTextEdit('insertUnorderedList')}
                  className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Bullet List"
                >
                  <FiList className="w-5 h-5 text-indigo-600" />
                </button>
                <button
                  onClick={() => setShowImagePicker(true)}
                  className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Add Image"
                >
                  <FiImage className="w-5 h-5 text-indigo-600" />
                </button>
              </div>

              {aiMessage && (
                <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-xl animate-fadeIn">
                  <p className="text-indigo-600">{aiMessage}</p>
                </div>
              )}

              <div className="flex-1 flex flex-col min-h-0">
                {selectedImage && (
                  <div className="mb-4">
                    <img src={selectedImage} alt="Upload preview" className="h-32 rounded-lg object-cover w-full" />
                    <button 
                      onClick={() => setSelectedImage(null)}
                      className="mt-2 text-sm text-pink-500 hover:text-pink-600"
                    >
                      Remove image
                    </button>
                  </div>
                )}
                
                <div
                  className="flex-1 overflow-y-auto focus:outline-none"
                  contentEditable
                  dangerouslySetInnerHTML={{ __html: content }}
                  onInput={(e) => setContent(e.currentTarget.innerHTML)}
                />
              </div>
            </div>
          </div>

          <div className="w-1/3">
            <AIAssistant
              onClose={() => {}}
              onGenerate={generateContent}
              onGenerateImage={generateDummyImage}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>

      {showImagePicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <ImagePicker
            onClose={() => setShowImagePicker(false)}
            onUpload={handleImageUpload}
            onPexelsSelect={() => {
              setShowImagePicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
};