import React, { useState, useEffect } from 'react';
import { FiBriefcase, FiPlus, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { useThemeStore } from '../../../store/themeStore';
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
  const { isDark } = useThemeStore(); 

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
      description: '',
      industry: ''
    });
    setIsOpen(false);
  };

  return (
    <div>
<label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-indigo-900'} mb-2`}>
  <span className={`${isDark ? 'px-4 py-3 text-center text-indigo-600' : ''}`}>
    Select Brand *
  </span>
</label>


      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 transition-all hover:bg-opacity-50
          ${isDark ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 focus:ring-gray-500' : 'bg-white text-indigo-900 border-indigo-200 hover:bg-indigo-50 focus:ring-indigo-500'}`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gradient-to-br from-indigo-100 to-pink-100'}`}>
              <FiBriefcase className={`${isDark ? 'text-gray-300' : 'text-indigo-600'} w-4 h-4`} />
            </div>
            <span className={formData.brandName ? (isDark ? 'text-white' : 'text-indigo-900') : 'text-gray-400'}>
              {formData.brandName || 'Select a brand'}
            </span>
          </div>
          <FiChevronDown className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-indigo-400'} transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className={`absolute z-10 w-full mt-2 rounded-lg shadow-lg border py-2 animate-fadeIn ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-indigo-100'}`}>
            {isLoading ? (
              <div className="px-4 py-3 text-center text-indigo-600">
                <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                Loading brands...
              </div>
            ) : error ? (
              <div className="px-4 py-3 text-center text-pink-600">{error}</div>
            ) : brands.length > 0 ? (
              brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleBrandSelect(brand)}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50'}`}
                >
                  <FiBriefcase className="w-4 h-4 text-indigo-600" />
                  <div className="text-left text-indigo-900 font-medium">{brand}</div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-center text-indigo-600">No brands found</div>
            )}

            <button
              onClick={() => handleBrandSelect('add-new')}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50'}`}
            >
              <FiPlus className="w-4 h-4 text-indigo-600" />
              <span className="font-medium">Add New Brand</span>
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
