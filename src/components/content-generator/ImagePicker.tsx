import React from 'react';
import { FiUpload, FiSearch, FiX } from 'react-icons/fi';

interface ImagePickerProps {
  onClose: () => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPexelsSelect: () => void;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  onClose,
  onUpload,
  onPexelsSelect
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-indigo-100 p-6 w-[400px] animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-indigo-900">Add Image</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <FiX className="w-5 h-5 text-indigo-400" />
        </button>
      </div>

      <div className="space-y-4">
        <label className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-indigo-200 rounded-xl hover:border-indigo-400 transition-colors cursor-pointer group">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center mx-auto mb-3 group-hover:from-indigo-200 group-hover:to-pink-200 transition-colors">
              <FiUpload className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="block text-indigo-900 font-medium">Upload from Computer</span>
            <span className="text-sm text-indigo-600">Drag and drop or click to browse</span>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onUpload}
          />
        </label>

        <button
          onClick={onPexelsSelect}
          className="w-full flex items-center justify-center gap-3 p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-pink-50 hover:from-indigo-100 hover:to-pink-100 transition-colors group"
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:shadow transition-shadow">
              <FiSearch className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="block text-indigo-900 font-medium">Select from Pexels</span>
            <span className="text-sm text-indigo-600">Browse professional stock photos</span>
          </div>
        </button>
      </div>
    </div>
  );
};