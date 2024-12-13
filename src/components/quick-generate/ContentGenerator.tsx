import React, { useState } from 'react';
import { PlatformSelector } from './PlatformSelector';
import { ContentEditor } from './ContentEditor';
import { DraftEditor } from './DraftEditor';
import { generatePlatformContent } from './api';
import { GeneratedContent } from './types';
import { ImagePicker } from './ImagePicker';

type Step = 1 | 2 | 3;

interface QuickGenerateState {
  step: Step;
  selectedPlatforms: string[];
  draftContent: string;
  generatedContent: GeneratedContent;
  isGenerating: boolean;
  showImagePicker: boolean;
  selectedImage: string | null;
}

export const QuickGenerate: React.FC = () => {
  const [state, setState] = useState<QuickGenerateState>({
    step: 1,
    selectedPlatforms: [],
    draftContent: '',
    generatedContent: {},
    isGenerating: false,
    showImagePicker: false,
    selectedImage: null
  });

  const setPartialState = (newState: Partial<QuickGenerateState>) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  const handlePlatformsChange = (platforms: string[]) => {
    setPartialState({ selectedPlatforms: platforms });
  };

  const handleNextStep = () => {
    setPartialState({ step: (state.step + 1) as Step });
  };

  const handlePreviousStep = () => {
    setPartialState({ step: (state.step - 1) as Step });
  };

  const handleDraftNext = async () => {
    if (!state.draftContent.trim()) return;

    setPartialState({ isGenerating: true });
    try {
      const contentPromises = state.selectedPlatforms.map(platform => 
        generatePlatformContent(platform, state.draftContent)
      );
      
      const results = await Promise.all(contentPromises);
      const contentMap: GeneratedContent = {};
      
      state.selectedPlatforms.forEach((platform, index) => {
        contentMap[platform] = results[index];
      });

      setPartialState({
        generatedContent: contentMap,
        isGenerating: false,
        step: 3
      });
    } catch (error) {
      console.error('Error generating content:', error);
      setPartialState({ isGenerating: false });
    }
  };

  const handleImageSelect = (url: string) => {
    setPartialState({ 
      selectedImage: url, 
      showImagePicker: false 
    });
  };

  const renderStep = () => {
    switch(state.step) {
      case 1:
        return (
          <PlatformSelector
            selectedPlatforms={state.selectedPlatforms}
            onPlatformsChange={handlePlatformsChange}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
            isGenerating={state.isGenerating}
          />
        );
      
      case 2:
        return (
          <>
            <DraftEditor
              content={state.draftContent}
              onChange={(content) => setPartialState({ draftContent: content })}
              onNext={handleDraftNext}
              onBack={handlePreviousStep}
              isValid={state.draftContent.trim().length > 0}
              isLoading={state.isGenerating}
              selectedPlatforms={state.selectedPlatforms}
              selectedImage={state.selectedImage}
              onImageClick={() => setPartialState({ showImagePicker: true })}
            />
            {state.showImagePicker && (
              <ImagePicker
                onClose={() => setPartialState({ showImagePicker: false })}
                onImageSelect={handleImageSelect}
              />
            )}
          </>
        );
      
      case 3:
        return (
          <ContentEditor
            selectedPlatforms={state.selectedPlatforms}
            onBack={handlePreviousStep}
            generatedContent={state.generatedContent}
          />
        );
      
      default:
        return null;
    }
  };

  return renderStep();
};