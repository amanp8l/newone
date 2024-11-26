import React, { useState, useEffect } from 'react';
import { FiPlus, FiChevronDown, FiFile, FiLink } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface CompanyDetailsProps {
  formData: {
    companyName: string;
    products: string;
    topic: string;
    resources?: Array<{ type: 'url' | 'file' | 'image'; content: string; name: string }>;
  };
  onInputChange: (field: string, value: any) => void;
  showValidation: boolean;
  onSelectBrand: () => void;
}

export const CompanyDetails: React.FC<CompanyDetailsProps> = ({
  formData,
  onInputChange,
  showValidation
}) => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<any[]>([]);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  useEffect(() => {
    const savedBrands = localStorage.getItem('brands');
    if (savedBrands) {
      setBrands(JSON.parse(savedBrands));
    }
  }, []);

  const handleBrandSelect = (brand: any) => {
    onInputChange('companyName', brand.name);
    onInputChange('products', brand.description);
    onInputChange('resources', brand.resources || []);
    setShowBrandDropdown(false);
  };

  const handleAddBrand = () => {
    navigate('/brands');
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-indigo-900 mb-2">Company Name *</label>
        <div className="relative">
          <button
            onClick={() => setShowBrandDropdown(!showBrandDropdown)}
            className={`w-full flex items-center justify-between rounded-lg border ${
              showValidation && !formData.companyName.trim() 
                ? 'border-pink-300 focus:ring-pink-500' 
                : 'border-indigo-200 focus:ring-indigo-500'
            } px-4 py-2 focus:outline-none focus:ring-2 bg-white`}
          >
            <span className={formData.companyName ? 'text-indigo-900' : 'text-indigo-400'}>
              {formData.companyName || 'Select a brand'}
            </span>
            <FiChevronDown className="w-5 h-5 text-indigo-400" />
          </button>

          {showBrandDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-indigo-100">
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => handleBrandSelect(brand)}
                    className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-colors"
                  >
                    <span className="font-medium text-indigo-900">{brand.name}</span>
                    <p className="text-sm text-indigo-600/80 truncate">{brand.industry}</p>
                  </button>
                ))
              ) : (
                <button
                  onClick={handleAddBrand}
                  className="w-full flex items-center space-x-2 px-4 py-3 text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-colors"
                >
                  <FiPlus className="w-5 h-5" />
                  <span>Add Brand First</span>
                </button>
              )}
            </div>
          )}
        </div>
        {showValidation && !formData.companyName.trim() && (
          <p className="mt-1 text-sm text-pink-500">Please select a brand</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-indigo-900 mb-2">Description *</label>
        <textarea
          value={formData.products}
          onChange={(e) => onInputChange('products', e.target.value)}
          className={`w-full rounded-lg border ${
            showValidation && !formData.products.trim() 
              ? 'border-pink-300 focus:ring-pink-500' 
              : 'border-indigo-200 focus:ring-indigo-500'
          } px-4 py-2 focus:outline-none focus:ring-2`}
          placeholder="Brand description"
          rows={4}
        />
        {showValidation && !formData.products.trim() && (
          <p className="mt-1 text-sm text-pink-500">Description is required</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-indigo-900 mb-2">Topic *</label>
        <input
          type="text"
          value={formData.topic}
          onChange={(e) => onInputChange('topic', e.target.value)}
          className={`w-full rounded-lg border ${
            showValidation && !formData.topic?.trim() 
              ? 'border-pink-300 focus:ring-pink-500' 
              : 'border-indigo-200 focus:ring-indigo-500'
          } px-4 py-2 focus:outline-none focus:ring-2`}
          placeholder="Enter the topic for your content"
        />
        {showValidation && !formData.topic?.trim() && (
          <p className="mt-1 text-sm text-pink-500">Topic is required</p>
        )}
      </div>

      {formData.resources && formData.resources.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-indigo-900 mb-2">Brand Resources</label>
          <div className="space-y-2">
            {formData.resources.map((resource, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-3 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-lg"
              >
                {resource.type === 'file' ? (
                  <FiFile className="w-5 h-5 text-indigo-600" />
                ) : (
                  <FiLink className="w-5 h-5 text-indigo-600" />
                )}
                <span className="text-sm text-indigo-900 truncate">{resource.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};