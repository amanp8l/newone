import React, { useState, useEffect } from 'react';
import { FiBriefcase, FiPlus, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import axios from 'axios';

interface BrandSelectorProps {
  formData: {
    companyName: string;
    products: string;
  };
  onInputChange: (field: string, value: any) => void;
  showValidation: boolean;
}

interface Brand {
  product_name: string;
  description: string;
  industry: string;
}

export const BrandSelector: React.FC<BrandSelectorProps> = ({
  formData,
  onInputChange,
  showValidation,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchBrands = async () => {
      if (!user?.email) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/db/get_products', {
          user_email: user.email,
          company_name: user.company || ''
        });

        if (response.data) {
          setBrands(response.data);
        }
      } catch (err) {
        console.error('Error fetching brands:', err);
        setError('Failed to load brands');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, [user?.email, user?.company]);

  const handleBrandSelect = (brand: Brand | 'add-new') => {
    if (brand === 'add-new') {
      navigate('/brands');
      return;
    }

    onInputChange('companyName', brand.product_name);
    onInputChange('products', brand.description);
    setIsOpen(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-indigo-900 mb-2">Select Brand *</label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between rounded-lg border ${
            showValidation && !formData.companyName
              ? 'border-pink-300 focus:ring-pink-500'
              : 'border-indigo-200 focus:ring-indigo-500'
          } px-4 py-3 focus:outline-none focus:ring-2 bg-white text-left transition-all hover:bg-indigo-50/50`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center">
              <FiBriefcase className="w-4 h-4 text-indigo-600" />
            </div>
            <span className={formData.companyName ? 'text-indigo-900' : 'text-indigo-400'}>
              {formData.companyName || 'Select a brand'}
            </span>
          </div>
          <FiChevronDown className={`w-5 h-5 text-indigo-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-indigo-100 py-2 animate-fadeIn">
            {isLoading ? (
              <div className="px-4 py-3 text-center text-indigo-600">
                <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                Loading brands...
              </div>
            ) : error ? (
              <div className="px-4 py-3 text-center text-pink-600">
                {error}
              </div>
            ) : brands.length > 0 ? (
              <>
                {brands.map((brand, index) => (
                  <button
                    key={`${brand.product_name}-${index}`}
                    onClick={() => handleBrandSelect(brand)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center">
                      <FiBriefcase className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-indigo-900 font-medium">{brand.product_name}</div>
                      <div className="text-xs text-indigo-500">{brand.industry}</div>
                    </div>
                  </button>
                ))}
                <div className="h-px bg-gradient-to-r from-indigo-100 to-pink-100 my-2" />
              </>
            ) : (
              <div className="px-4 py-3 text-center text-indigo-600">
                No brands found
              </div>
            )}
            <button
              onClick={() => handleBrandSelect('add-new')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center">
                <FiPlus className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-indigo-600 font-medium">Add New Brand</span>
            </button>
          </div>
        )}
      </div>
      {showValidation && !formData.companyName && (
        <p className="mt-1 text-sm text-pink-500">Please select a brand</p>
      )}
    </div>
  );
};