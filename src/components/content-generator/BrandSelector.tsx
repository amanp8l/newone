import React, { useState, useEffect } from 'react';
import { FiX, FiSearch } from 'react-icons/fi';

interface BrandSelectorProps {
  onSelect: (brand: any) => void;
  onClose: () => void;
}

export const BrandSelector: React.FC<BrandSelectorProps> = ({ onSelect, onClose }) => {
  const [brands, setBrands] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedBrands = localStorage.getItem('brands');
    if (savedBrands) {
      setBrands(JSON.parse(savedBrands));
    }
  }, []);

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-indigo-900">Select a Brand</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <FiX className="w-5 h-5 text-indigo-500" />
        </button>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search brands..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
        {filteredBrands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => onSelect(brand)}
            className="cursor-pointer group bg-white rounded-xl p-4 hover:shadow-md transition-all duration-300"
          >
            <h4 className="text-lg font-semibold text-indigo-900 mb-2">{brand.name}</h4>
            <div className="mb-2">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-full text-sm font-medium text-indigo-600">
                {brand.industry}
              </span>
            </div>
            <p className="text-sm text-indigo-600/80 line-clamp-2">{brand.description}</p>
          </div>
        ))}

        {filteredBrands.length === 0 && (
          <div className="col-span-2 text-center py-8 text-indigo-500">
            No brands found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};