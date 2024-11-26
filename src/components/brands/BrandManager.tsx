import React, { useState, useEffect } from 'react';
import { BrandList } from './BrandList';
import { BrandForm } from './BrandForm';
import { useAuthStore } from '../../store/authStore';
import axios from 'axios';

export interface Brand {
  id: string;
  name: string;
  description: string;
  website?: string;
  industry: string;
  tagline?: string;
  targetAudience: string;
  toneOfVoice: string;
  documents?: Array<{
    type: 'file' | 'url';
    content: string;
    name: string;
  }>;
}

export const BrandManager: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const { user } = useAuthStore();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      if (!user?.email) {
        setIsLoading(false);
        return;
      }

      // First check localStorage
      const storedBrands = localStorage.getItem(`brands_${user.email}`);
      if (storedBrands) {
        setBrands(JSON.parse(storedBrands));
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/db/get_products', {
          user_email: user.email,
          company_name: user.company || ''
        });

        if (response.data) {
          const transformedBrands = Array.isArray(response.data) ? response.data.map((brand: any) => ({
            id: brand.product_name,
            name: brand.product_name,
            industry: brand.industry,
            description: brand.description,
            website: brand.website,
            tagline: brand.tagline,
            targetAudience: brand.target_audience,
            toneOfVoice: brand.tone,
            documents: []
          })) : [];

          setBrands(transformedBrands);
          // Store in localStorage
          localStorage.setItem(`brands_${user.email}`, JSON.stringify(transformedBrands));
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

  const handleSaveBrand = async (brand: Omit<Brand, 'id'>) => {
    if (!user?.email) return;

    if (editingBrand) {
      const updatedBrands = brands.map(b => b.id === editingBrand.id ? { ...brand, id: editingBrand.id } : b);
      setBrands(updatedBrands);
      localStorage.setItem(`brands_${user.email}`, JSON.stringify(updatedBrands));
    } else {
      const newBrand = { ...brand, id: brand.name };
      const updatedBrands = [...brands, newBrand];
      setBrands(updatedBrands);
      localStorage.setItem(`brands_${user.email}`, JSON.stringify(updatedBrands));
    }

    setShowAddForm(false);
    setEditingBrand(null);
  };

  const handleEditBrand = (brand: Brand) => {
    setEditingBrand(brand);
    setShowAddForm(true);
  };

  const handleDeleteBrand = (brandId: string) => {
    if (!user?.email) return;
    
    const updatedBrands = brands.filter(b => b.id !== brandId);
    setBrands(updatedBrands);
    localStorage.setItem(`brands_${user.email}`, JSON.stringify(updatedBrands));
  };

  if (showAddForm) {
    return (
      <BrandForm
        onSubmit={handleSaveBrand}
        onCancel={() => {
          setShowAddForm(false);
          setEditingBrand(null);
        }}
        initialData={editingBrand}
      />
    );
  }

  return (
    <BrandList
      brands={brands}
      isLoading={isLoading}
      error={error}
      onAddNew={() => setShowAddForm(true)}
      onEdit={handleEditBrand}
      onDelete={handleDeleteBrand}
    />
  );
};