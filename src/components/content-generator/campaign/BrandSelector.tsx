import React, { useState, useEffect } from 'react';
import { FiBriefcase, FiPlus, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import axios from 'axios';
import Cookies from 'js-cookie';

interface BrandSelectorProps {
  formData: {
    companyName: string;
    products: string;
    brandName?: string;
  };
  onInputChange: (brand: any) => void;
  showValidation: boolean;
}


export const BrandSelector: React.FC<BrandSelectorProps> = ({
  formData,
  onInputChange,
  showValidation,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchBrands = async () => {
      if (!user?.email) return;

      const jwtToken = Cookies.get('jwt_token');
      if (!jwtToken) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          'https://kimchi-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api/fetch_connected_accounts', 
          {},
          {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data?.result) {
          const brandNames = Object.keys(response.data.result).filter(key => 
            Array.isArray(response.data.result[key])
          );
          setBrands(brandNames);
        }
      } catch (err) {
        console.error('Error fetching brands:', err);
        setError('Failed to load brands');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, [user?.email]);

  const handleBrandSelect = (brand: string | 'add-new') => {
    if (brand === 'add-new') {
      navigate('/brands');
      return;
    }

    onInputChange({
      name: brand,
      description: '', // Add appropriate description retrieval if needed
      industry: '' // Add appropriate industry retrieval if needed
    });
    setIsOpen(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-indigo-900 mb-2">Select Brand *</label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between rounded-lg border ${
            showValidation && !formData.brandName
              ? 'border-pink-300 focus:ring-pink-500'
              : 'border-indigo-200 focus:ring-indigo-500'
          } px-4 py-3 focus:outline-none focus:ring-2 bg-white text-left transition-all hover:bg-indigo-50/50`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center">
              <FiBriefcase className="w-4 h-4 text-indigo-600" />
            </div>
            <span className={formData.brandName ? 'text-indigo-900' : 'text-indigo-400'}>
              {formData.brandName || 'Select a brand'}
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
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => handleBrandSelect(brand)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center">
                      <FiBriefcase className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-indigo-900 font-medium">{brand}</div>
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
      {showValidation && !formData.brandName && (
        <p className="mt-1 text-sm text-pink-500">Please select a brand</p>
      )}
    </div>
  );
};