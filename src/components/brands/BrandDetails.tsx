import React, { useState } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { Brand } from './BrandManager';

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'E-commerce',
  'Manufacturing',
  'Real Estate',
  'Entertainment',
  'Food & Beverage',
  'Travel & Tourism',
  'Fashion & Apparel',
  'Automotive',
  'Media & Publishing',
  'Professional Services',
  'Non-Profit',
  'Other'
];

const tones = [
  { id: 'professional', name: 'Professional', description: 'Formal and business-like tone' },
  { id: 'casual', name: 'Casual', description: 'Relaxed and informal tone' },
  { id: 'friendly', name: 'Friendly', description: 'Warm and approachable tone' },
  { id: 'formal', name: 'Formal', description: 'Traditional and serious tone' },
  { id: 'humorous', name: 'Humorous', description: 'Light-hearted and funny tone' },
  { id: 'authoritative', name: 'Authoritative', description: 'Expert and confident tone' },
  { id: 'conversational', name: 'Conversational', description: 'Natural and engaging tone' },
  { id: 'inspirational', name: 'Inspirational', description: 'Motivating and uplifting tone' }
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
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showToneDropdown, setShowToneDropdown] = useState(false);
  const [industryInput, setIndustryInput] = useState(formData.industry);

  const filteredIndustries = industries.filter(industry =>
    industry.toLowerCase().includes(industryInput.toLowerCase())
  );

  const handleIndustrySelect = (industry: string) => {
    setFormData({ ...formData, industry });
    setIndustryInput(industry);
    setShowIndustryDropdown(false);
  };

  const handleIndustryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIndustryInput(value);
    setFormData({ ...formData, industry: value });
    setShowIndustryDropdown(true);
  };

  const handleToneSelect = (tone: typeof tones[0]) => {
    setFormData({ ...formData, toneOfVoice: tone.name });
    setShowToneDropdown(false);
  };

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
        <div className="relative">
          <label className="block text-sm font-medium text-indigo-900 mb-2">
            Industry <span className="text-pink-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={industryInput}
              onChange={handleIndustryInputChange}
              onFocus={() => setShowIndustryDropdown(true)}
              placeholder="Select or enter industry"
              className={`w-full pl-4 pr-10 py-2 rounded-lg border ${
                validationErrors.industry ? 'border-pink-300' : 'border-indigo-200'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            <button
              type="button"
              onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400"
            >
              <FiChevronDown className={`w-5 h-5 transition-transform ${showIndustryDropdown ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {showIndustryDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-indigo-100 max-h-48 overflow-y-auto">
              {filteredIndustries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => handleIndustrySelect(industry)}
                  className="w-full text-left px-4 py-2 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-colors flex items-center justify-between"
                >
                  <span className="text-indigo-900">{industry}</span>
                  {formData.industry === industry && (
                    <FiCheck className="w-4 h-4 text-indigo-600" />
                  )}
                </button>
              ))}
            </div>
          )}
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
        <div className="relative">
          <label className="block text-sm font-medium text-indigo-900 mb-2">
            Tone of Voice <span className="text-pink-500">*</span>
          </label>
          <button
            onClick={() => setShowToneDropdown(!showToneDropdown)}
            className={`w-full px-4 py-2 rounded-lg border ${
              validationErrors.toneOfVoice ? 'border-pink-300' : 'border-indigo-200'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-left flex items-center justify-between`}
          >
            <span className={formData.toneOfVoice ? 'text-indigo-900' : 'text-indigo-400'}>
              {formData.toneOfVoice || 'Select tone of voice'}
            </span>
            <FiChevronDown className={`w-5 h-5 text-indigo-400 transition-transform ${showToneDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showToneDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-indigo-100 max-h-48 overflow-y-auto">
              {tones.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => handleToneSelect(tone)}
                  className="w-full text-left px-4 py-2 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-indigo-900">{tone.name}</div>
                      <div className="text-sm text-indigo-600">{tone.description}</div>
                    </div>
                    {formData.toneOfVoice === tone.name && (
                      <FiCheck className="w-4 h-4 text-indigo-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
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