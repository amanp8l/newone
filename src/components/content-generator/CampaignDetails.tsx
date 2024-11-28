import React, { useState } from 'react';
import { BrandSelector } from './campaign/BrandSelector';
import { ObjectiveField } from './campaign/ObjectiveField';
import { AudienceField } from './campaign/AudienceField';

interface CampaignDetailsProps {
  formData: {
    companyName: string;
    products: string;
    objective: string;
    targetAudience: string;
    brandName?: string;
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

  const handleBrandSelect = (brand: any) => {
    onInputChange('companyName', brand.name);
    onInputChange('products', brand.description);
    onInputChange('brandName', brand.name); // Add this line to store brand name
  };

  return (
    <div className="space-y-6">
      <BrandSelector
        formData={formData}
        onInputChange={handleBrandSelect}
        showValidation={showValidation}
      />

      <ObjectiveField
        formData={{
          objective: formData.objective,
          brandName: formData.brandName || ''
        }}
        onInputChange={onInputChange}
        showValidation={showValidation}
        isGenerating={isGeneratingObjective}
        onGenerate={() => setIsGeneratingObjective(false)}
      />

      <AudienceField
        formData={{
          brandName: formData.brandName || '',
          objective: formData.objective,
          targetAudience: formData.targetAudience
        }}
        onInputChange={onInputChange}
        showValidation={showValidation}
        isGenerating={isGeneratingAudience}
        onGenerate={() => setIsGeneratingAudience(false)}
      />
    </div>
  );
};