import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Brand {
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

interface User {
  email: string;
  company?: string;
  phone?: string;
  website?: string;
  address?: string;
  bio?: string;
  logo?: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  brands: Brand[];
  setAuth: (isAuth: boolean, userData?: User) => void;
  updateUser: (userData: Partial<User>) => void;
  logout: () => void;
  addBrand: (brand: Brand) => void;
  updateBrand: (brandId: string, brand: Brand) => void;
  deleteBrand: (brandId: string) => void;
  setBrands: (brands: Brand[]) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      brands: [],
      setAuth: (isAuth, userData) => {
        if (userData) {
          const user = {
            ...userData,
            email: userData.email || '',
            company: userData.company || ''
          };
          set({ isAuthenticated: isAuth, user });
        } else {
          set({ isAuthenticated: isAuth, user: null });
        }
      },
      updateUser: (userData) => set((state) => {
        if (!state.user) return state;

        const updatedUser = {
          ...state.user,
          ...userData,
          email: state.user.email,
          company: state.user.company
        };

        return { user: updatedUser };
      }),
      logout: () => set({ isAuthenticated: false, user: null, brands: [] }),
      addBrand: (brand) => set((state) => ({
        brands: [...state.brands, brand]
      })),
      updateBrand: (brandId, brand) => set((state) => ({
        brands: state.brands.map(b => b.id === brandId ? brand : b)
      })),
      deleteBrand: (brandId) => set((state) => ({
        brands: state.brands.filter(b => b.id !== brandId)
      })),
      setBrands: (brands) => set({ brands })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        brands: state.brands
      })
    }
  )
);