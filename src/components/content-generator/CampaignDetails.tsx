import React, { useState } from 'react';
import { BrandSelector } from './campaign/BrandSelector';
import { ObjectiveField } from './campaign/ObjectiveField';
import { AudienceField } from './campaign/AudienceField';
import { generateCampaignObjective, generateTargetAudience } from './api';

interface CampaignDetailsProps {
  formData: {
    companyName: string;
    products: string;
    objective: string;
    targetAudience: string;
  };
  onInputChange: (field: string, value: any) => void;
  showValidation: boolean;
}

export const CampaignDetails: React.FC<CampaignDetailsProps> = ({
  formData,
  onInputChange,
  showValidation,
}) => {
  const [isGeneratingObjective, setIsGeneratingObjective] = useState(false);
  const [isGeneratingAudience, setIsGeneratingAudience] = useState(false);

  const handleGenerateObjective = async () => {
    if (!formData.companyName) {
      alert("Please select a brand first");
      return;
    }

    setIsGeneratingObjective(true);
    try {
      const objective = await generateCampaignObjective("default", formData.companyName);
      onInputChange('objective', objective);
    } catch (error) {
      console.error('Error generating objective:', error);
      alert('Failed to generate campaign objective');
    } finally {
      setIsGeneratingObjective(false);
    }
  };

  const handleGenerateAudience = async () => {
    if (!formData.companyName) {
      alert("Please select a brand first");
      return;
    }
    if (!formData.objective) {
      alert("Please add campaign objective first");
      return;
    }

    setIsGeneratingAudience(true);
    try {
      const audience = await generateTargetAudience(
        "default",
        formData.companyName,
        formData.objective
      );
      onInputChange('targetAudience', audience);
    } catch (error) {
      console.error('Error generating audience:', error);
      alert('Failed to generate target audience');
    } finally {
      setIsGeneratingAudience(false);
    }
  };

  return (
    <div className="space-y-6">
      <BrandSelector
        formData={formData}
        onInputChange={onInputChange}
        showValidation={showValidation}
      />

      <ObjectiveField
        formData={formData}
        onInputChange={onInputChange}
        showValidation={showValidation}
        isGenerating={isGeneratingObjective}
        onGenerate={handleGenerateObjective}
      />

      <AudienceField
        formData={formData}
        onInputChange={onInputChange}
        showValidation={showValidation}
        isGenerating={isGeneratingAudience}
        onGenerate={handleGenerateAudience}
      />
    </div>
  );
};