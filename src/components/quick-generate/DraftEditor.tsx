
import React, { useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiImage, FiX, FiVideo, FiFile } from 'react-icons/fi';
import { useAuthStore } from '../../store/authStore';
import { ImagePicker } from './ImagePicker';
import { VideoPicker } from './VideoPicker';
import { PreviewScreen } from './PreviewScreen';

interface DraftEditorProps {
  content: string;
  onChange: (content: string) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
  isLoading?: boolean;
  selectedPlatforms: string[];
  selectedImage: string | null;
  onImageClick: () => void;
}

interface Platform {
  id: string;
  name: string;
  image: string;
}

export const DraftEditor: React.FC<DraftEditorProps> = ({
  content,
  onChange,
  onNext,
  onBack,
  isValid,
  isLoading = false,
}) => {
  const { user } = useAuthStore();
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showVideoPicker, setShowVideoPicker] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [selectedPdfs, setSelectedPdfs] = useState<string[]>([]);
  const [showPlatformSelect, setShowPlatformSelect] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const platforms: Platform[] = [
    { 
      id: 'twitter', 
      name: 'X (Twitter)', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg'
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png'
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png'
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png'
    },
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Ionicons_logo-tiktok.svg'
    },
    { 
      id: 'pinterest', 
      name: 'Pinterest', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png'
    }
  ];

  const handleImageSelect = (url: string) => {
    setSelectedImages(prev => [...prev, url]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
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

  const handleVideoSelect = (url: string) => {
    setSelectedVideos(prev => [...prev, url]);
  };

  const removeVideo = (index: number) => {
    setSelectedVideos(prev => prev.filter((_, i) => i !== index));
  };

  const removePdf = (index: number) => {
    setSelectedPdfs(prev => prev.filter((_, i) => i !== index));
  };

  if (showPreview) {
    return (
      <PreviewScreen
        content={content}
        image={selectedImages[0]}
        video={selectedVideos[0]}
        pdf={selectedPdfs[0]}
        platform={selectedPlatform}
        companyName={user?.company || 'Your Company'}
        onBack={() => setShowPreview(false)}
      />
    );
  }

  if (showPlatformSelect) {
    return (
      <div className="h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex flex-col">
        <div className="p-6">
          <button
            onClick={() => setShowPlatformSelect(false)}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-6"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Editor</span>
          </button>

          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-6">
              Select Platform to Preview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className="bg-white rounded-xl p-6 shadow-sm relative group"
                >
                  <div className="h-20 flex items-center justify-center mb-4">
                    <img 
                      src={platform.image} 
                      alt={platform.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-indigo-900 text-center mb-4">
                    {platform.name}
                  </h3>

                  <button
                    onClick={() => {
                      setSelectedPlatform(platform.id);
                      setShowPreview(true);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors"
                  >
                    Preview
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex flex-col">
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm">
            <div className="flex items-center space-x-4 p-4 border-b border-indigo-100">
              <button
                onClick={() => setShowImagePicker(true)}
                className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center"
              >
                <FiImage className="w-5 h-5 text-indigo-600 hover:text-indigo-700" />
                <span className="ml-2 text-indigo-600 hover:text-indigo-700 text-l transition-colors">
                  Add images
                </span>
              </button>
              <button
                onClick={() => setShowVideoPicker(true)}
                className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center"
              >
                <FiVideo className="w-5 h-5 text-indigo-600 hover:text-indigo-700" />
                <span className="ml-2 text-indigo-600 hover:text-indigo-700 text-l transition-colors">
                  Add videos
                </span>
              </button>
              <button
                onClick={() => pdfInputRef.current?.click()}
                className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center"
              >
                <FiFile className="w-5 h-5 text-indigo-600 hover:text-indigo-700" />
                <span className="ml-2 text-indigo-600 hover:text-indigo-700 text-l transition-colors">
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

            <div className="p-6">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => onChange(e.target.value)}
                className="w-full min-h-[400px] p-4 rounded-xl border-2 border-indigo-100 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none font-sans text-base resize-none"
                placeholder="Write your content here..."
              />

              {selectedImages.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-indigo-900">Attached Images</h4>
                  <div className="grid grid-cols-4 gap-4">
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
                          onClick={() => removeImage(index)}
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
                  <div className="grid grid-cols-4 gap-4">
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
                          onClick={() => removeVideo(index)}
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
                  <div className="grid grid-cols-4 gap-4">
                    {selectedPdfs.map((_pdf, index) => (
                      <div
                        key={index}
                        className="relative group bg-indigo-50 rounded-lg p-4"
                      >
                        <FiFile className="w-8 h-8 text-indigo-600 mb-2" />
                        <span className="text-sm text-indigo-900">PDF Document {index + 1}</span>
                        <button
                          onClick={() => removePdf(index)}
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

            <div className="p-6 border-t border-indigo-100 flex space-x-4">
              <button
                onClick={onNext}
                disabled={!isValid || isLoading}
                className="flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 font-medium text-lg shadow-xl shadow-indigo-500/25"
              >
                <span>Optimize with AI</span>
                <FiArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowPlatformSelect(true)}
                disabled={!isValid}
                className="px-8 py-4 border-2 border-indigo-200 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors flex items-center space-x-2"
              >
                <span>Preview & Publish</span>
              </button>
            </div>
          </div>
        </div>
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

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/70 rounded-2xl p-8 flex flex-col items-center space-y-4 max-w-md w-full mx-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-pink-200 border-b-pink-500 rounded-full animate-spin-reverse"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Optimizing Content
            </h3>
            <p className="text-indigo-600 text-center">
              We're optimizing your content using AI...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};