import React, { useState } from 'react';
import { FiArrowLeft, FiBold, FiItalic, FiImage, FiZap, FiSave, FiSend, FiEye, FiX } from 'react-icons/fi';
import { PlatformTabs } from './PlatformTabs';
import { AIChat } from './AIChat';
import { ImagePicker } from './ImagePicker';
import { PreviewScreen } from './PreviewScreen';
import { GeneratedContent } from './types';
import { useAuthStore } from '../../store/authStore';
import { formatPlatformContent } from '../../utils/platformFormatter';

interface ContentEditorProps {
  selectedPlatforms: string[];
  onBack: () => void;
  generatedContent: GeneratedContent;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  selectedPlatforms,
  onBack,
  generatedContent
}) => {
  const { user } = useAuthStore();
  const [activePlatform, setActivePlatform] = useState(selectedPlatforms[0]);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [platformContent, setPlatformContent] = useState<GeneratedContent>(
    Object.fromEntries(
      Object.entries(generatedContent).map(([platform, content]) => [
        platform,
        formatPlatformContent(content)
      ])
    )
  );
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleTextEdit = (command: string) => {
    document.execCommand(command, false);
  };

  const handleContentUpdate = (platform: string, content: string) => {
    setPlatformContent(prev => ({
      ...prev,
      [platform]: content
    }));
  };

  const handleImageSelect = (url: string) => {
    setSelectedImages(prev => [...prev, url]);
    setShowImagePicker(false);
  };

  const handleImageDelete = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  if (showPreview) {
    return (
      <PreviewScreen
        content={platformContent[activePlatform]}
        image={selectedImages[0]} // For now, using first image as main image
        platform={activePlatform}
        companyName={user?.company || 'Your Company'}
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
            onClick={() => setShowPreview(true)}
            className="px-6 py-2 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center space-x-2"
          >
            <FiEye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => {}}
            className="px-6 py-2 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center space-x-2"
          >
            <FiSave className="w-4 h-4" />
            <span>Save Draft</span>
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

      <div className="flex-1 p-6 flex gap-6">
        <div className={`flex-1 transition-all duration-300 ${showAIChat ? 'w-2/3' : 'w-full'}`}>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6 h-full flex flex-col">
            <PlatformTabs
              platforms={selectedPlatforms}
              activePlatform={activePlatform}
              onPlatformChange={setActivePlatform}
              isEnabled={true}
            />

            <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-indigo-100">
              <button
                onClick={() => handleTextEdit('bold')}
                className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group relative"
                title="Bold"
              >
                <FiBold className="w-5 h-5 text-indigo-600" />
              </button>
              <button
                onClick={() => handleTextEdit('italic')}
                className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group relative"
                title="Italic"
              >
                <FiItalic className="w-5 h-5 text-indigo-600" />
              </button>
              <button
                onClick={() => setShowImagePicker(true)}
                className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group relative"
                title="Add Image"
              >
                <FiImage className="w-5 h-5 text-indigo-600" />
              </button>
              <button
                onClick={() => setShowAIChat(!showAIChat)}
                className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group relative ml-auto"
                title="AI Assistant"
              >
                <FiZap className="w-5 h-5 text-indigo-600" />
              </button>
            </div>

            <div className="flex-1 flex flex-col">
              <div
                className="flex-1 w-full focus:outline-none overflow-auto mb-4"
                contentEditable
                dangerouslySetInnerHTML={{ __html: platformContent[activePlatform] || '' }}
                onInput={(e) => handleContentUpdate(activePlatform, e.currentTarget.innerHTML)}
              />

              {selectedImages.length > 0 && (
                <div className="border-t border-indigo-100 pt-4">
                  <h3 className="text-sm font-medium text-indigo-900 mb-3">Attached Images</h3>
                  <div className="grid grid-cols-6 gap-4">
                    {selectedImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative group aspect-square rounded-lg overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`Attached ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => handleImageDelete(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showAIChat && (
          <div className="w-1/3 animate-fadeIn">
            <AIChat
              onClose={() => setShowAIChat(false)}
              activePlatform={activePlatform}
              currentContent={platformContent[activePlatform]}
              onContentUpdate={(content) => handleContentUpdate(activePlatform, content)}
            />
          </div>
        )}
      </div>

      {showImagePicker && (
        <ImagePicker
          onClose={() => setShowImagePicker(false)}
          onImageSelect={handleImageSelect}
          allowMultiple={true}
        />
      )}
    </div>
  );
};