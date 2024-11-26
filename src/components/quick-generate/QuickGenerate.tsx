import React, { useState } from 'react';
import { PlatformSelector } from './PlatformSelector';
import { ContentEditor } from './ContentEditor';
import { DraftEditor } from './DraftEditor';
import { generatePlatformContent } from './api';
import { GeneratedContent } from './types';

export const QuickGenerate: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [draftContent, setDraftContent] = useState('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDraftNext = async () => {
    if (!draftContent.trim()) return;

    setIsGenerating(true);
    try {
      const contentPromises = selectedPlatforms.map(platform => 
        generatePlatformContent(platform, draftContent)
      );
      
      const results = await Promise.all(contentPromises);
      const contentMap: GeneratedContent = {};
      
      selectedPlatforms.forEach((platform, index) => {
        contentMap[platform] = results[index];
      });

      setGeneratedContent(contentMap);
      setTimeout(() => {
        setIsGenerating(false);
        setStep(3);
      }, 1500); // Add a slight delay for smoother transition
    } catch (error) {
      console.error('Error generating content:', error);
      setIsGenerating(false);
    }
  };

  if (step === 1) {
    return (
      <PlatformSelector
        selectedPlatforms={selectedPlatforms}
        onPlatformsChange={setSelectedPlatforms}
        onNext={() => setStep(2)}
      />
    );
  }

  if (step === 2) {
    return (
      <div className="h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex flex-col">
        <div className="p-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-2">
              Draft Content
            </h1>
            <p className="text-indigo-600 mb-8">
              Write your content draft that will be optimized for each platform
            </p>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm">
              <DraftEditor
                content={draftContent}
                onChange={setDraftContent}
                onNext={handleDraftNext}
                isValid={draftContent.trim().length > 0}
                isLoading={isGenerating}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ContentEditor
      selectedPlatforms={selectedPlatforms}
      onBack={() => setStep(2)}
      generatedContent={generatedContent}
    />
  );
};