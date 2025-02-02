import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { CampaignDetails } from './CampaignDetails';
import { ContentSettings } from './ContentSettings';
import { ContentEditor } from './ContentEditor';
import { StepIndicator } from './StepIndicator';
import { FormData } from './types';
import { TopicSelector } from './TopicSelector';
import { useThemeStore } from '../../store/themeStore'; 

const steps = ['Campaign Details', 'Topic', 'Content Settings'];

interface ContentGeneratorProps {
  onBack: () => void;
}

const ContentGenerator: React.FC<ContentGeneratorProps> = ({ onBack }) => {
  const { isDark } = useThemeStore(); // Assuming isDark comes from the store
  const [currentStep, setCurrentStep] = useState(0);
  const [showValidation, setShowValidation] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    products: '',
    objective: '',
    targetAudience: '',
    contentLength: '6000',
    contentTone: 'professional',
    selectedPlatforms: [],
    topic: '',
    resources: []
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.companyName.trim() !== '' && 
               formData.objective.trim() !== '' && 
               formData.targetAudience.trim() !== '';
      case 1:
        return formData.topic.trim() !== '';
      case 2:
        return formData.selectedPlatforms.length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!canProceed()) {
      setShowValidation(true);
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setShowValidation(false);
    } else {
      setShowEditor(true);
    }
  };

  if (showEditor) {
    return <ContentEditor formData={formData} onBack={() => setShowEditor(false)} />;
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <CampaignDetails
            formData={formData}
            onInputChange={handleInputChange}
            showValidation={showValidation}
          />
        );
      case 1:
        return (
          <TopicSelector
            formData={formData}
            onInputChange={handleInputChange}
            showValidation={showValidation}
          />
        );
      case 2:
        return (
          <ContentSettings
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`h-screen flex flex-col ${isDark ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-900'}`}>
      <div className={`p-6 ${isDark ? 'bg-gray-800' : 'bg-white/70'} backdrop-blur-sm border-b ${isDark ? 'border-gray-700' : 'border-indigo-100'}`}>
        <div className="max-w-3xl mx-auto flex items-center">
          <button
            onClick={onBack}
            className={`mr-4 p-2 hover:bg-indigo-50 rounded-lg transition-colors ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-indigo-600'}`}
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className={`text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent ${isDark ? 'text-gray-100' : ''}`}>
            Create Content
          </h1>
        </div>
      </div>

      <div className={`flex-1 overflow-auto p-6 ${isDark ? 'bg-gray-800' : 'bg-white/70'} backdrop-blur-sm`}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>

          <div className={`rounded-xl p-6 shadow-sm ${isDark ? 'bg-gray-700' : 'bg-white/70'} backdrop-blur-sm`}>
            {renderStepContent()}
            
            <div className="mt-8 flex justify-end space-x-4">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className={`px-6 py-2 border ${isDark ? 'border-gray-600' : 'border-indigo-200'} rounded-lg hover:bg-indigo-50 transition-colors ${isDark ? 'text-gray-300' : 'text-indigo-600'}`}
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className={`px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors shadow-lg shadow-indigo-500/25 ${isDark ? 'text-gray-300' : 'text-white'}`}
              >
                {currentStep === steps.length - 1 ? 'Generate Content' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentGenerator;
