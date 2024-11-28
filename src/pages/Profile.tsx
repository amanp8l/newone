import React, { useState, useRef } from 'react';
import { FiUser, FiMail, FiBriefcase, FiPhone, FiMapPin, FiGlobe, FiUpload, FiSave, FiCheck } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    email: user?.email || '',
    company: user?.company || '',
    phone: user?.phone || '',
    website: user?.website || '',
    address: user?.address || '',
    bio: user?.bio || '',
    logo: user?.logo || null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {showSuccess && (
          <div className="fixed top-6 right-6 bg-white rounded-xl shadow-lg p-4 animate-fadeIn z-50 flex items-center space-x-3 border border-indigo-100">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center">
              <FiCheck className="w-5 h-5 text-white" />
            </div>
            <p className="text-indigo-900">Changes saved successfully!</p>
          </div>
        )}

        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm">
          <div className="p-6 border-b border-indigo-100">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Profile Settings
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                {formData.logo ? (
                  <img 
                    src={formData.logo} 
                    alt="Company Logo" 
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center">
                    <FiUser className="w-8 h-8 text-indigo-600" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-lg shadow-sm border border-indigo-200 hover:bg-indigo-50 transition-colors"
                >
                  <FiUpload className="w-4 h-4 text-indigo-600" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-indigo-900">{formData.company}</h3>
                <p className="text-indigo-600">{formData.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-indigo-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full pl-10 pr-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-900 mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
                  <input
                    type="text"
                    value={formData.company}
                    disabled
                    className="w-full pl-10 pr-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-900 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-900 mb-2">
                  Website
                </label>
                <div className="relative">
                  <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter website URL"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-900 mb-2">
                Address
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-3 text-indigo-400" />
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter company address"
                  rows={2}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-900 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Tell us about your company"
                rows={4}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors shadow-lg shadow-indigo-500/25 flex items-center space-x-2"
              >
                <FiSave className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};