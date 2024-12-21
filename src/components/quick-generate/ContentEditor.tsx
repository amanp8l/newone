import React, { useState, useRef } from 'react';
import { FiArrowLeft, FiImage, FiZap, FiEye, FiX, FiVideo, FiFile } from 'react-icons/fi';
import { PlatformTabs } from './PlatformTabs';
import { AIChat } from './AIChat';
import { ImagePicker } from './ImagePicker';
import { VideoPicker } from './VideoPicker';
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
  const [showVideoPicker, setShowVideoPicker] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [selectedPdfs, setSelectedPdfs] = useState<string[]>([]);
  const [platformContent, setPlatformContent] = useState<GeneratedContent>(
    Object.fromEntries(
      Object.entries(generatedContent).map(([platform, content]) => [
        platform,
        formatPlatformContent(content)
      ])
    )
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handleContentUpdate = (platform: string, content: string) => {
    const formattedContent = formatPlatformContent(content);
    setPlatformContent((prev) => ({
      ...prev,
      [platform]: formattedContent
    }));
  };

  const handleImageSelect = (url: string) => {
    setSelectedImages((prev) => [...prev, url]);
    setShowImagePicker(false);
  };

  const handleVideoSelect = (url: string) => {
    setSelectedVideos((prev) => [...prev, url]);
    setShowVideoPicker(false);
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedPdfs(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageDelete = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVideoDelete = (index: number) => {
    setSelectedVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePdfDelete = (index: number) => {
    setSelectedPdfs((prev) => prev.filter((_, i) => i !== index));
  };

  if (showPreview) {
    return (
      <PreviewScreen
        content={platformContent[activePlatform]}
        image={selectedImages[0]}
        platform={activePlatform}
        companyName={user?.company || 'Your Company'}
        onBack={() => setShowPreview(false)}
      />
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm border-b border-indigo-100">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className="px-6 py-2 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center space-x-2"
        >
          <FiEye className="w-4 h-4" />
          <span>Preview</span>
        </button>
      </div>

      <div className="flex-1 p-6 flex gap-6 overflow-hidden">
        <div className={`flex-1 transition-all duration-300 flex flex-col ${showAIChat ? 'w-2/3' : 'w-full'}`}>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6 flex flex-col overflow-hidden h-full">
            <PlatformTabs
              platforms={selectedPlatforms}
              activePlatform={activePlatform}
              onPlatformChange={setActivePlatform}
              isEnabled={true}
            />

            <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-indigo-100">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowImagePicker(true)}
                  className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors group flex items-center"
                >
                  <FiImage className="w-5 h-5 text-indigo-600 hover:text-indigo-700" />
                  <span className="ml-2 text-indigo-600 hover:text-indigo-700 text-xs transition-colors">
                    Add image
                  </span>
                </button>
                <button
                  onClick={() => setShowVideoPicker(true)}
                  className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors group flex items-center"
                >
                  <FiVideo className="w-5 h-5 text-indigo-600 hover:text-indigo-700" />
                  <span className="ml-2 text-indigo-600 hover:text-indigo-700 text-xs transition-colors">
                    Add video
                  </span>
                </button>
                <button
                  onClick={() => pdfInputRef.current?.click()}
                  className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors group flex items-center"
                >
                  <FiFile className="w-5 h-5 text-indigo-600 hover:text-indigo-700" />
                  <span className="ml-2 text-indigo-600 hover:text-indigo-700 text-xs transition-colors">
                    Add PDF
                  </span>
                </button>
                <input
                  ref={pdfInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                  multiple
                />
              </div>
              <button
                onClick={() => setShowAIChat(!showAIChat)}
                className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors group flex items-center"
              >
                <FiZap className="w-5 h-5 text-indigo-600 hover:text-indigo-700" />
                <span className="ml-2 text-indigo-600 hover:text-indigo-700 text-xs transition-colors">
                  AI Assistant
                </span>
              </button>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              <textarea
                ref={textareaRef}
                value={platformContent[activePlatform] || ''}
                onChange={(e) => handleContentUpdate(activePlatform, e.target.value)}
                className="flex-1 w-full h-full p-4 rounded-xl border-2 border-indigo-100 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none font-sans text-base resize-none"
                placeholder="Write your content here..."
              />

              {selectedImages.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-indigo-900">Attached Images</h4>
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
                          className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedVideos.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-indigo-900">Attached Videos</h4>
                  <div className="grid grid-cols-6 gap-4">
                    {selectedVideos.map((video, index) => (
                      <div
                        key={index}
                        className="relative group aspect-video rounded-lg overflow-hidden"
                      >
                        <video
                          src={video}
                          className="w-full h-full object-cover"
                          controls
                        />
                        <button
                          onClick={() => handleVideoDelete(index)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedPdfs.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-indigo-900">Attached PDFs</h4>
                  <div className="grid grid-cols-6 gap-4">
                    {selectedPdfs.map((_pdf, index) => (
                      <div
                        key={index}
                        className="relative group bg-indigo-50 rounded-lg p-4"
                      >
                        <FiFile className="w-8 h-8 text-indigo-600 mb-2" />
                        <span className="text-sm text-indigo-900">PDF Document {index + 1}</span>
                        <button
                          onClick={() => handlePdfDelete(index)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
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
          <div className="w-1/3">
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

      {showVideoPicker && (
        <VideoPicker
          onClose={() => setShowVideoPicker(false)}
          onVideoSelect={handleVideoSelect}
          allowMultiple={true}
        />
      )}
    </div>
  );
};