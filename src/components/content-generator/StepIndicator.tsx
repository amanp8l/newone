import React from 'react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between relative">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index <= currentStep 
                ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {index + 1}
            </div>
            <span className="mt-2 text-sm font-medium text-indigo-900">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-1 ${
              index < currentStep ? 'bg-gradient-to-r from-indigo-500 to-pink-500' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};