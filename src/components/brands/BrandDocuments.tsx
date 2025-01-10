import React, { useState, useCallback } from 'react';
import { FiPlus, FiTrash2, FiUpload, FiLink, FiFile } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import { Brand } from './BrandManager';
import { useAuthStore } from '../../store/authStore';
import axios from 'axios';

interface BrandDocumentsProps {
  formData: Omit<Brand, 'id'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Brand, 'id'>>>;
  brandName: string;
}

export const BrandDocuments: React.FC<BrandDocumentsProps> = ({
  formData,
  setFormData,
  brandName
}) => {
  const { user } = useAuthStore();
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user?.email) {
      setError('User email not found');
      return;
    }

    if (!brandName) {
      setError('Please enter brand name first');
      return;
    }

    for (const file of acceptedFiles) {
      if (!file.type.includes('pdf')) {
        setError('Please upload PDF files only');
        continue;
      }

      try {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            setUploadStatus(`Uploading ${file.name}...`);
            
            // Get base64 string without the data URL prefix
            const base64String = reader.result?.toString().split(',')[1];
            if (!base64String) {
              throw new Error('Failed to process file');
            }

            // Make API call to create vector
            const response = await axios.post('https://marketing-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api/create_vector', {
              base64_string: base64String,
              index_name: brandName,
              user_email: user.email
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            });

            if (response.status !== 200) {
              throw new Error('Upload failed');
            }

            // Update form data with new document
            setFormData(prev => ({
              ...prev,
              documents: [
                ...prev.documents || [],
                {
                  type: 'file',
                  content: base64String,
                  name: file.name
                }
              ]
            }));

            setUploadStatus(`Successfully uploaded ${file.name}`);
            setTimeout(() => setUploadStatus(null), 3000);
            setError(null);
          } catch (error: any) {
            console.error('Upload error:', error);
            setError(error.response?.data?.message || 'Error uploading document');
            setUploadStatus(null);
          }
        };

        reader.onerror = () => {
          setError('Error reading file');
          setUploadStatus(null);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        setError('Error processing file');
        setUploadStatus(null);
      }
    }
  }, [brandName, user?.email, setFormData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true,
    maxSize: 10485760 // 10MB max file size
  });

  const handleUrlSubmit = async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!user?.email) {
      setError('User email not found');
      return;
    }

    if (!brandName) {
      setError('Please enter brand name first');
      return;
    }

    try {
      new URL(url); // Validate URL format
      setUploadStatus('Adding URL...');
      
      const response = await axios.post('https://marketing-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api/create_vector_url', {
        index_name: brandName,
        url: url,
        user_email: user.email
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status !== 200) {
        throw new Error('Failed to add URL');
      }

      setFormData(prev => ({
        ...prev,
        documents: [
          ...prev.documents || [],
          {
            type: 'url',
            content: url,
            name: new URL(url).hostname
          }
        ]
      }));

      setUrl('');
      setUploadStatus('Successfully added URL');
      setTimeout(() => setUploadStatus(null), 3000);
      setError(null);
    } catch (err: any) {
      console.error('URL error:', err);
      setError(err.response?.data?.message || 'Error adding URL');
      setUploadStatus(null);
    }
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents?.filter((_, i) => i !== index) || []
    }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg"></div>
        <h3 className="text-lg font-semibold text-indigo-900">Documents</h3>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-pink-50 border border-pink-200 rounded-lg text-pink-600">
          {error}
        </div>
      )}

      {uploadStatus && (
        <div className="mb-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-600">
          {uploadStatus}
        </div>
      )}

      <div className="space-y-6">
        <div {...getRootProps()} className="cursor-pointer">
          <div className="border-2 border-dashed border-indigo-200 rounded-xl p-8 transition-colors hover:border-indigo-400">
            <input {...getInputProps()} />
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-xl flex items-center justify-center mb-4">
                <FiUpload className="w-6 h-6 text-indigo-600" />
              </div>
              <p className="text-indigo-900 font-medium mb-1">
                {isDragActive ? 'Drop your files here' : 'Drag & drop files here'}
              </p>
              <p className="text-indigo-600 text-sm">or click to browse</p>
              <p className="text-indigo-400 text-xs mt-2">Supports PDF files (max 10MB)</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to add"
              className="flex-1 px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleUrlSubmit}
              className="p-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors"
            >
              <FiPlus className="w-5 h-5" />
            </button>
          </div>

          {formData.documents && formData.documents.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-indigo-900">Added Documents</h4>
              <div className="space-y-2">
                {formData.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-lg group"
                  >
                    <div className="flex items-center space-x-3">
                      {doc.type === 'file' ? (
                        <FiFile className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <FiLink className="w-5 h-5 text-indigo-600" />
                      )}
                      <span className="text-indigo-900">{doc.name}</span>
                    </div>
                    <button
                      onClick={() => removeDocument(index)}
                      className="p-1.5 text-pink-500 opacity-0 group-hover:opacity-100 hover:bg-white rounded-lg transition-all"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};