import React, { useRef, useState } from 'react';
import { FiUpload, FiYoutube, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoSettingsProps {
  projectName: string;
  videoUrl: string;
  onProjectNameChange: (name: string) => void;
  onVideoUrlChange: (url: string) => void;
  onVideoUpload: (file: File) => void;
  onNext: () => void;
}

export const VideoSettings: React.FC<VideoSettingsProps> = ({
  projectName,
  videoUrl,
  onProjectNameChange,
  onVideoUrlChange,
  onVideoUpload,
  onNext
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeInput, setActiveInput] = useState<'youtube' | 'drive' | null>(null);
  const [tempUrl, setTempUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsLoading(true);
        setError('');
        
        const fileUrl = URL.createObjectURL(file);
        onVideoUrlChange(fileUrl);
        onVideoUpload(file);
      } catch (err) {
        setError('Failed to process video. Please try again.');
        console.error('Error processing video:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const isGoogleDriveUrl = (url: string) => {
    return url.includes('drive.google.com');
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.includes('youtube.com/watch?v=') 
      ? url.split('v=')[1]
      : url.includes('youtu.be/') 
        ? url.split('youtu.be/')[1]
        : '';
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const getGoogleDriveEmbedUrl = (url: string) => {
    const fileIdMatch = url.match(/\/d\/([^/]+)/);
    const fileId = fileIdMatch ? fileIdMatch[1] : null;
    
    if (!fileId) {
      setError('Invalid Google Drive URL');
      return null;
    }

    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  const handleUrlSubmit = () => {
    if (tempUrl) {
      try {
        let processedUrl: string | null = null;
        
        if (isYouTubeUrl(tempUrl)) {
          processedUrl = getYouTubeEmbedUrl(tempUrl);
        } else if (isGoogleDriveUrl(tempUrl)) {
          processedUrl = getGoogleDriveEmbedUrl(tempUrl);
        }

        if (processedUrl) {
          onVideoUrlChange(processedUrl);
          setTempUrl('');
          setActiveInput(null);
          setError('');
        }
      } catch (err) {
        setError('Failed to process video URL');
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-sm"
      >
        <div className="space-y-8">
          <AnimatePresence>
            {videoUrl && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-xl overflow-hidden shadow-lg bg-gradient-to-r from-indigo-50 to-pink-50 p-4"
              >
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                  {isYouTubeUrl(videoUrl) ? (
                    <iframe
                      src={videoUrl}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : isGoogleDriveUrl(videoUrl) ? (
                    <iframe
                      src={videoUrl}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={videoUrl}
                      controls
                      className="w-full h-full object-contain"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-indigo-900 mb-2">
              Project Name <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl blur group-hover:blur-md transition-all"></div>
              <input
                type="text"
                value={projectName}
                onChange={(e) => onProjectNameChange(e.target.value)}
                className="relative bg-white w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Enter your project name"
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <label className="block text-sm font-medium text-indigo-900 mb-4">
              Video Source
            </label>
            
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveInput('youtube')}
                className="p-6 rounded-xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FiYoutube className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-indigo-900 font-medium">YouTube Video</span>
                  <span className="text-sm text-indigo-500 mt-1">Paste video URL</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveInput('drive')}
                className="p-6 rounded-xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FiUpload className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-indigo-900 font-medium">Google Drive</span>
                  <span className="text-sm text-indigo-500 mt-1">Paste video URL</span>
                </div>
              </motion.button>
            </div>

            <AnimatePresence>
              {activeInput && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4"
                >
                  <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-indigo-900">
                        {activeInput === 'youtube' ? 'YouTube Video URL' : 'Google Drive URL'}
                      </h3>
                      <button
                        onClick={() => setActiveInput(null)}
                        className="p-1.5 hover:bg-white rounded-lg transition-colors"
                      >
                        <FiX className="w-5 h-5 text-indigo-500" />
                      </button>
                    </div>
                    <div className="flex space-x-4">
                      <input
                        type="url"
                        value={tempUrl}
                        onChange={(e) => setTempUrl(e.target.value)}
                        placeholder={`Paste your ${activeInput === 'youtube' ? 'YouTube' : 'Drive'} video URL here`}
                        className="flex-1 px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        onClick={handleUrlSubmit}
                        className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-8 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600 transition-colors group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="flex flex-col items-center relative z-10">
                <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FiUpload className="w-8 h-8" />
                </div>
                <span className="text-xl font-medium mb-2">Upload from Computer</span>
                <span className="text-white/80">Drag and drop or click to browse</span>
              </div>
            </motion.button>
          </motion.div>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-4"
            >
              <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-indigo-900 mt-2">Processing video...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 text-red-600 p-4 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {videoUrl && projectName && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-end"
            >
              <button
                onClick={onNext}
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-colors shadow-lg shadow-indigo-500/25"
              >
                Next
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VideoSettings;