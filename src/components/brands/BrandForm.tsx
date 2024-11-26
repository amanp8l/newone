import React, { useState, useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Brand } from './BrandManager';
import { useAuthStore } from '../../store/authStore';
import axios from 'axios';
import { BrandDetails } from './BrandDetails';
import { BrandDocuments } from './BrandDocuments';

interface BrandFormProps {
  onSubmit: (brand: Omit<Brand, 'id'>) => void;
  onCancel: () => void;
  initialData?: Brand | null;
}

export const BrandForm: React.FC<BrandFormProps> = ({
  onSubmit,
  onCancel,
  initialData
}) => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState<Omit<Brand, 'id'>>({
    name: initialData?.name || '',
    industry: initialData?.industry || '',
    description: initialData?.description || '',
    website: initialData?.website || '',
    tagline: initialData?.tagline || '',
    targetAudience: initialData?.targetAudience || '',
    toneOfVoice: initialData?.toneOfVoice || 'Professional',
    documents: initialData?.documents || []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const requiredFields = ['name', 'website', 'industry', 'tagline', 'targetAudience', 'toneOfVoice', 'description'];

    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]?.trim()) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (!user?.email) {
      setError('User email not found');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/db/add_product', {
        user_email: user.email,
        product_name: formData.name,
        company_name: user.company || '',
        website: formData.website,
        industry: formData.industry,
        tagline: formData.tagline,
        target_audience: formData.targetAudience,
        tone: formData.toneOfVoice,
        description: formData.description
      });

      if (response.status !== 200) {
        throw new Error('Failed to create brand');
      }

      onSubmit(formData);
    } catch (err: any) {
      console.error('Error creating brand:', err);
      setError(err.response?.data?.message || 'Error creating brand. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50">
      <div className="max-w-4xl mx-auto pt-8 px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-2">
              {initialData ? 'Edit Brand' : 'Add New Brand'}
            </h1>
            <p className="text-indigo-600">
              Create a brand profile to generate tailored content
            </p>
          </div>
          <button
            onClick={onCancel}
            className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Brands</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-pink-50 border border-pink-200 rounded-xl text-pink-600">
            {error}
          </div>
        )}

        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm mb-8">
          <BrandDetails
            formData={formData}
            setFormData={setFormData}
            validationErrors={validationErrors}
          />
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm mb-8">
          <BrandDocuments
            formData={formData}
            setFormData={setFormData}
            brandName={formData.name}
          />
        </div>

        <div className="flex justify-center pb-8">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-12 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-colors shadow-lg shadow-indigo-500/25 disabled:opacity-50 flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating Brand...</span>
              </>
            ) : (
              <span>{initialData ? 'Update Brand' : 'Create Brand'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};