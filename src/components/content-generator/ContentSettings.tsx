import React from 'react';
import { Listbox } from '@headlessui/react';
import { FiCheck, FiChevronDown, FiFacebook, FiLinkedin, FiTwitter } from 'react-icons/fi';

interface ContentSettingsProps {
  formData: {
    contentLength: string;
    contentTone: string;
    selectedPlatforms: string[];
  };
  onInputChange: (field: string, value: any) => void;
}

const tones = [
  { id: 'professional', name: 'Professional', description: 'Formal and business-like tone' },
  { id: 'casual', name: 'Casual', description: 'Relaxed and informal tone' },
  { id: 'friendly', name: 'Friendly', description: 'Warm and approachable tone' },
  { id: 'formal', name: 'Formal', description: 'Traditional and serious tone' },
  { id: 'humorous', name: 'Humorous', description: 'Light-hearted and funny tone' },
];

const platforms = [
  { id: 'twitter', name: 'Twitter', icon: FiTwitter, color: 'blue' },
  { id: 'facebook', name: 'Facebook', icon: FiFacebook, color: 'indigo' },
  { id: 'linkedin', name: 'LinkedIn', icon: FiLinkedin, color: 'blue' },
];

export const ContentSettings: React.FC<ContentSettingsProps> = ({
  formData,
  onInputChange,
}) => {
  const togglePlatform = (platformId: string) => {
    const platforms = [...formData.selectedPlatforms];
    const index = platforms.indexOf(platformId);
    if (index === -1) {
      platforms.push(platformId);
    } else {
      platforms.splice(index, 1);
    }
    onInputChange('selectedPlatforms', platforms);
  };

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-indigo-900 mb-2">Content Length (words)</label>
        <input
          type="number"
          value={formData.contentLength}
          onChange={(e) => onInputChange('contentLength', e.target.value)}
          className="w-full rounded-lg border border-indigo-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          min="100"
          max="10000"
          step="100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-indigo-900 mb-2">Content Tone</label>
        <Listbox value={formData.contentTone} onChange={(value) => onInputChange('contentTone', value)}>
          <div className="relative">
            <Listbox.Button className="relative w-full py-2 pl-4 pr-10 text-left bg-white rounded-lg border border-indigo-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <span className="block truncate text-indigo-900">
                {tones.find(tone => tone.id === formData.contentTone)?.name}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FiChevronDown className="w-5 h-5 text-indigo-400" />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-60 ring-1 ring-indigo-100 focus:outline-none">
              {tones.map((tone) => (
                <Listbox.Option
                  key={tone.id}
                  value={tone.id}
                  className={({ active }) =>
                    `${active ? 'bg-gradient-to-r from-indigo-50 to-pink-50 text-indigo-900' : 'text-indigo-900'}
                    cursor-pointer select-none relative py-2 pl-10 pr-4`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex flex-col">
                        <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                          {tone.name}
                        </span>
                        <span className={`${active ? 'text-indigo-600' : 'text-indigo-500'} text-sm`}>
                          {tone.description}
                        </span>
                      </div>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <FiCheck className="w-5 h-5" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      <div>
        <label className="block text-sm font-medium text-indigo-900 mb-4">Select Platforms</label>
        <div className="grid grid-cols-3 gap-4">
          {platforms.map((platform) => {
            const isSelected = formData.selectedPlatforms.includes(platform.id);
            const Icon = platform.icon;
            return (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`group relative flex flex-col items-center p-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isSelected
                    ? 'bg-gradient-to-br from-indigo-500/10 to-pink-500/10 border-2 border-indigo-500 shadow-lg'
                    : 'border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                  isSelected
                    ? 'bg-gradient-to-br from-indigo-500 to-pink-500 text-white'
                    : 'bg-gradient-to-br from-indigo-100 to-pink-100 text-indigo-600 group-hover:from-indigo-200 group-hover:to-pink-200'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-semibold ${
                  isSelected ? 'text-indigo-600' : 'text-indigo-900'
                }`}>
                  {platform.name}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                    <FiCheck className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};