import React, { useState } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiEdit2, FiTrash2, FiArrowUp } from 'react-icons/fi';
import { Brand } from './BrandManager';

interface BrandListProps {
  brands: Brand[];
  isLoading: boolean;
  error: string | null;
  onAddNew: () => void;
  onEdit: (brand: Brand) => void;
  onDelete: (brandId: string) => void;
}

export const BrandList: React.FC<BrandListProps> = ({
  brands = [], // Provide default empty array
  isLoading,
  error,
  onAddNew,
  onEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBrands = brands.filter(brand => {
    if (!brand?.name || !brand?.industry) return false;
    const searchLower = searchTerm.toLowerCase();
    return (
      brand.name.toLowerCase().includes(searchLower) ||
      brand.industry.toLowerCase().includes(searchLower)
    );
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-16">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-600">Loading brands...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-16">
          <p className="text-pink-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (!Array.isArray(brands) || brands.length === 0) {
      return (
        <div className="text-center py-16">
          <p className="text-indigo-600 text-lg mb-4">No brand voices created yet</p>
          <button
            onClick={onAddNew}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors shadow-lg shadow-indigo-500/25"
          >
            Create Your First Brand
          </button>
        </div>
      );
    }

    if (filteredBrands.length === 0) {
      return (
        <div className="text-center py-16">
          <p className="text-indigo-600">No brands found matching your search</p>
        </div>
      );
    }

    return (
      <>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-indigo-100">
                <th className="text-left py-3 px-4 text-indigo-900 font-medium">
                  <div className="flex items-center space-x-1">
                    <span>Brand Name</span>
                    <FiArrowUp className="w-4 h-4 text-indigo-400" />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-indigo-900 font-medium">
                  <div className="flex items-center space-x-1">
                    <span>Industry</span>
                    <FiArrowUp className="w-4 h-4 text-indigo-400" />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-indigo-900 font-medium">
                  <div className="flex items-center space-x-1">
                    <span>Description</span>
                    <FiArrowUp className="w-4 h-4 text-indigo-400" />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-indigo-900 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.map((brand) => (
                <tr key={brand.id} className="border-b border-indigo-100">
                  <td className="py-4 px-4 text-indigo-900 font-medium">{brand.name}</td>
                  <td className="py-4 px-4 text-indigo-600">{brand.industry}</td>
                  <td className="py-4 px-4 text-indigo-600 truncate max-w-md">{brand.description}</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(brand)}
                        className="p-2 hover:bg-indigo-50 rounded-lg transition-colors text-indigo-600"
                        title="Edit brand"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(brand.id)}
                        className="p-2 hover:bg-pink-50 rounded-lg transition-colors text-pink-500"
                        title="Delete brand"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-indigo-600">
            Showing {filteredBrands.length} of {brands.length} brands
          </p>
          <div className="flex items-center space-x-2">
            <button className="p-2 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
              <FiChevronsLeft className="w-4 h-4 text-indigo-600" />
            </button>
            <button className="p-2 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
              <FiChevronLeft className="w-4 h-4 text-indigo-600" />
            </button>
            <button className="p-2 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
              <FiChevronRight className="w-4 h-4 text-indigo-600" />
            </button>
            <button className="p-2 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
              <FiChevronsRight className="w-4 h-4 text-indigo-600" />
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-2">
            Brand Voice
          </h1>
          <p className="text-indigo-600">
            Create unique AI-generated content tailored specifically for your brand, eliminating the need for repetitive company introductions.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm">
          <div className="p-6 border-b border-indigo-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-indigo-900">My Brand Voices</h2>
              </div>
              <button
                onClick={onAddNew}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors shadow-lg shadow-indigo-500/25"
              >
                ADD NEW BRAND
              </button>
            </div>
          </div>

          <div className="p-6">
            {Array.isArray(brands) && brands.length > 0 && (
              <div className="flex justify-between items-center mb-6">
                <select className="px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search brands..."
                    className="pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
                </div>
              </div>
            )}

            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};