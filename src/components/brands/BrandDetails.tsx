import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Brand } from './BrandManager';

const tones = [
  { id: 'professional', name: 'Professional', description: 'Formal and business-like tone' },
  { id: 'casual', name: 'Casual', description: 'Relaxed and informal tone' },
  { id: 'friendly', name: 'Friendly', description: 'Warm and approachable tone' },
  { id: 'formal', name: 'Formal', description: 'Traditional and serious tone' },
  { id: 'humorous', name: 'Humorous', description: 'Light-hearted and funny tone' },
];

interface BrandDetailsProps {
  formData: Omit<Brand, 'id'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Brand, 'id'>>>;
  validationErrors: Record<string, string>;
}

export const BrandDetails: React.FC<BrandDetailsProps> = ({
  formData,
  setFormData,
  validationErrors,
}) => {
  const [showToneDropdown, setShowToneDropdown] = useState(false);

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-indigo-900 mb-2">
            Brand Name <span className="text-pink-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter brand name"
            className={`w-full px-4 py-2 rounded-lg border ${
              validationErrors.name ? 'border-pink-300' : 'border-indigo-200'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {validationErrors.name && (
            <p className="mt-1 text-sm text-pink-500">{validationErrors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-900 mb-2">
            Website <span className="text-pink-500">*</span>
          </label>
          <input
            type="text"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            placeholder="Enter website URL"
            className={`w-full px-4 py-2 rounded-lg border ${
              validationErrors.website ? 'border-pink-300' : 'border-indigo-200'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {validationErrors.website && (
            <p className="mt-1 text-sm text-pink-500">{validationErrors.website}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-indigo-900 mb-2">
            Industry <span className="text-pink-500">*</span>
          </label>
          <input
            type="text"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            placeholder="Enter industry"
            className={`w-full px-4 py-2 rounded-lg border ${
              validationErrors.industry ? 'border-pink-300' : 'border-indigo-200'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {validationErrors.industry && (
            <p className="mt-1 text-sm text-pink-500">{validationErrors.industry}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-900 mb-2">
            Tagline <span className="text-pink-500">*</span>
          </label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            placeholder="Enter tagline"
            className={`w-full px-4 py-2 rounded-lg border ${
              validationErrors.tagline ? 'border-pink-300' : 'border-indigo-200'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {validationErrors.tagline && (
            <p className="mt-1 text-sm text-pink-500">{validationErrors.tagline}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-indigo-900 mb-2">
            Target Audience <span className="text-pink-500">*</span>
          </label>
          <input
            type="text"
            value={formData.targetAudience}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
            placeholder="Describe target audience"
            className={`w-full px-4 py-2 rounded-lg border ${
              validationErrors.targetAudience ? 'border-pink-300' : 'border-indigo-200'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {validationErrors.targetAudience && (
            <p className="mt-1 text-sm text-pink-500">{validationErrors.targetAudience}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-900 mb-2">
            Tone of Voice <span className="text-pink-500">*</span>
          </label>
          <div className="relative">
            <button
              onClick={() => setShowToneDropdown(!showToneDropdown)}
              className={`w-full px-4 py-2 rounded-lg border ${
                validationErrors.toneOfVoice ? 'border-pink-300' : 'border-indigo-200'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-left flex items-center justify-between`}
            >
              <span>{formData.toneOfVoice}</span>
              <FiChevronDown className={`w-5 h-5 transition-transform ${showToneDropdown ? 'transform rotate-180' : ''}`} />
            </button>
            
            {showToneDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-indigo-100">
                {tones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => {
                      setFormData({ ...formData, toneOfVoice: tone.name });
                      setShowToneDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-colors"
                  >
                    <div className="font-medium text-indigo-900">{tone.name}</div>
                    <div className="text-sm text-indigo-600">{tone.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          {validationErrors.toneOfVoice && (
            <p className="mt-1 text-sm text-pink-500">{validationErrors.toneOfVoice}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-indigo-900 mb-2">
          Description <span className="text-pink-500">*</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter brand description"
          rows={4}
          className={`w-full px-4 py-2 rounded-lg border ${
            validationErrors.description ? 'border-pink-300' : 'border-indigo-200'
          } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {validationErrors.description && (
          <p className="mt-1 text-sm text-pink-500">{validationErrors.description}</p>
        )}
      </div>
    </div>
  );
};