import React, { useState } from 'react';
import { FiUpload, FiImage, FiX, FiSearch, FiLoader } from 'react-icons/fi';
import axios from 'axios';

interface ImagePickerProps {
  onClose: () => void;
  onImageSelect: (url: string) => void;
  allowMultiple?: boolean;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  onClose,
  onImageSelect,
  allowMultiple = false
}) => {
  const [view, setView] = useState<'options' | 'pexels'>('options');
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageSelect(result);
      };
      reader.readAsDataURL(file);
    });

    if (!allowMultiple) {
      onClose();
    }
  };

  const searchImages = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://marketing-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api/get_images', {
        query: searchQuery,
        number_of_pics: 10
      });
      
      if (response.data?.result) {
        setImages(response.data.result);
      } else {
        setError('No images found');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to fetch images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (url: string) => {
    onImageSelect(url);
    if (!allowMultiple) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl">
        <div className="p-4 border-b border-indigo-100 flex justify-between items-center">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
            {view === 'options' ? 'Add Image' : 'Select from Pexels'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-indigo-400" />
          </button>
        </div>

        {view === 'options' ? (
          <div className="p-8 grid grid-cols-2 gap-6">
            <label className="cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                multiple={allowMultiple}
                className="hidden"
              />
              <div className="aspect-square rounded-2xl border-2 border-dashed border-indigo-200 flex flex-col items-center justify-center p-8 transition-all group-hover:border-indigo-400 group-hover:bg-indigo-50">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center mb-4 group-hover:from-indigo-200 group-hover:to-pink-200">
                  <FiUpload className="w-8 h-8 text-indigo-600" />
                </div>
                <h4 className="text-lg font-medium text-indigo-900 mb-2">Upload from Computer</h4>
                <p className="text-sm text-indigo-600 text-center">
                  {allowMultiple ? 'Select multiple images' : 'Select an image'}
                </p>
              </div>
            </label>

            <button
              onClick={() => setView('pexels')}
              className="aspect-square rounded-2xl border-2 border-indigo-200 flex flex-col items-center justify-center p-8 transition-all hover:border-indigo-400 hover:bg-indigo-50"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center mb-4">
                <FiImage className="w-8 h-8 text-indigo-600" />
              </div>
              <h4 className="text-lg font-medium text-indigo-900 mb-2">Select from Pexels</h4>
              <p className="text-sm text-indigo-600 text-center">
                Browse professional photos
              </p>
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex space-x-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchImages()}
                  placeholder="Search for images..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
              </div>
              <button
                onClick={searchImages}
                disabled={isLoading || !searchQuery.trim()}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <FiLoader className="w-5 h-5 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <FiSearch className="w-5 h-5" />
                    <span>Search</span>
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-pink-50 border border-pink-200 rounded-lg text-pink-600">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {images.map((url, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(url)}
                  className="group relative aspect-video rounded-lg overflow-hidden hover:ring-2 hover:ring-indigo-500 transition-all"
                >
                  <img 
                    src={url} 
                    alt={`Search result ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <span className="text-white text-sm">Click to select</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};