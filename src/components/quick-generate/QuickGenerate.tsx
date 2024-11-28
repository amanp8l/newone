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
      }, 1500);
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
      <DraftEditor
        content={draftContent}
        onChange={setDraftContent}
        onNext={handleDraftNext}
        onBack={() => setStep(1)}
        isValid={draftContent.trim().length > 0}
        isLoading={isGenerating}
        selectedPlatforms={selectedPlatforms} selectedImage={null} onImageClick={function (): void {
          throw new Error('Function not implemented.');
        } }      />
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