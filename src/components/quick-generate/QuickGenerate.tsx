import React, { useState } from 'react';
import { ContentEditor } from './ContentEditor';
import { DraftEditor } from './DraftEditor';
import { PlatformSelector } from './PlatformSelector';
import { generatePlatformContent } from './api';
import { GeneratedContent } from './types';

export const QuickGenerate: React.FC = () => {
  const [step, setStep] = useState<'draft' | 'platforms' | 'editor'>('draft');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [draftContent, setDraftContent] = useState('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDraftNext = () => {
    if (!draftContent.trim()) return;
    setStep('platforms');
  };

  const handlePlatformNext = async () => {
    if (selectedPlatforms.length === 0) return;

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
        setStep('editor');
      }, 1500);
    } catch (error) {
      console.error('Error generating content:', error);
      setIsGenerating(false);
    }
  };

  switch (step) {
    case 'platforms':
      return (
        <PlatformSelector
          selectedPlatforms={selectedPlatforms}
          onPlatformsChange={setSelectedPlatforms}
          onNext={handlePlatformNext}
          onBack={() => setStep('draft')}
          isGenerating={isGenerating}
        />
      );
    case 'editor':
      return (
        <ContentEditor
          selectedPlatforms={selectedPlatforms}
          onBack={() => setStep('platforms')}
          generatedContent={generatedContent}
        />
      );
    default:
      return (
        <DraftEditor
          content={draftContent}
          onChange={setDraftContent}
          onNext={handleDraftNext}
          isValid={draftContent.trim().length > 0}
          selectedImage={null}
          onImageClick={() => { } }
          selectedPlatforms={[]} onBack={function (): void {
            throw new Error('Function not implemented.');
          } }        />
      );
  }
};